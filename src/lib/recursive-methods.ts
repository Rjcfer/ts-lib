/* eslint-disable functional/immutable-data */
/* eslint-disable functional/no-let */
/* eslint-disable functional/no-loop-statement */
/*
 * cherche dans un arbre les noeuds qui correspondent au predicat et les renvoie avec leurs parents en leurs enfants
 */
//A
// - B
// - C
// - - D
//E
// - F
// - G
// - - H
// - - J

export function filterTree<T>(
  options: {
    // eslint-disable-next-line functional/prefer-readonly-type
    readonly nodes: T[];
    readonly predicate: (el: T) => boolean;
    readonly getId: (el: T) => number;
    readonly getParentId: (el: T) => number;
    readonly withParents: boolean;
    readonly withChildren: boolean;
  }
  // eslint-disable-next-line functional/prefer-readonly-type
): T[] {
  options = Object.assign({ withParents: true, withChildren: true }, options);
  const res = options.nodes.filter(options.predicate);
  const resInitial = [...res];

  //On supprime les résultats de la liste
  let nodesFiltered = options.nodes.filter(
    (o) => !res.some((r) => options.getId(r) === options.getId(o))
  );

  if (options.withParents) {
    let parents = resInitial;
    while (parents.length > 0) {
      const nouveauxParents = nodesFiltered.filter((o) =>
        parents.some((r) => options.getParentId(r) === options.getId(o))
      );
      //B+A
      if (nouveauxParents.length > 0) {
        res.push(...nouveauxParents);
        nodesFiltered = nodesFiltered.filter(
          (o) =>
            !nouveauxParents.some((r) => options.getId(r) === options.getId(o))
        );
      }
      parents = nouveauxParents;
    }
  }
  if (options.withChildren) {
    let enfants = resInitial;
    while (enfants.length > 0) {
      const nouveauxEnfants = nodesFiltered.filter((o) =>
        enfants.some((r) => options.getId(r) === options.getParentId(o))
      );
      //B+A
      if (nouveauxEnfants.length > 0) {
        res.push(...nouveauxEnfants);
        nodesFiltered = nodesFiltered.filter(
          (o) =>
            !nouveauxEnfants.some((r) => options.getId(r) === options.getId(o))
        );
      }
      enfants = nouveauxEnfants;
    }
  }
  return res; //ABCDG
}
