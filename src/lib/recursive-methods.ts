/* eslint-disable functional/immutable-data */
/* eslint-disable functional/no-let */
/* eslint-disable functional/no-loop-statement */
/*
 * cherche dans un arbre les noeuds qui correspondent au predicat et les renvoie avec leur parents en leurs enfants
 */
export function filterTree<T>(
  // eslint-disable-next-line functional/prefer-readonly-type
  listeComplete: T[],
  predicat: (el: T) => boolean,
  getId: (el: T) => number,
  getParentId: (el: T) => number
  // eslint-disable-next-line functional/prefer-readonly-type
): T[] {
  const res = listeComplete.filter(predicat);
  const resInitial = [...res];

  //On supprime les résultats de la liste
  listeComplete = listeComplete.filter(
    (o) => !res.some((r) => getId(r) === getId(o))
  );

  let parents = resInitial;
  while (parents.length > 0) {
    const nouveauxParents = listeComplete.filter((o) =>
      parents.some((r) => getParentId(r) === getId(o))
    );
    //B+A
    if (nouveauxParents.length > 0) {
      res.push(...nouveauxParents);
      listeComplete = listeComplete.filter(
        (o) => !nouveauxParents.some((r) => getId(r) === getId(o))
      );
    }
    parents = nouveauxParents;
  }

  let enfants = resInitial;
  while (enfants.length > 0) {
    const nouveauxEnfants = listeComplete.filter((o) =>
      enfants.some((r) => getId(r) === getParentId(o))
    );
    //B+A
    if (nouveauxEnfants.length > 0) {
      res.push(...nouveauxEnfants);
      listeComplete = listeComplete.filter(
        (o) => !nouveauxEnfants.some((r) => getId(r) === getId(o))
      );
    }
    enfants = nouveauxEnfants;
  }

  return res; //ABCDG
}
