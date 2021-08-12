import { cloneDeep } from "lodash";
import structurecheck from "./Structurecheck";
import getmaximalId from "./GetmaximalId";
import { Equip, TypeTree } from "../../Statuslist/type";
import { st } from "../../Statuslist/status";

export const createNode = (
  prev: TypeTree[],
  id: String,
  type: Equip
): TypeTree[] => {
  let prevTree = cloneDeep(prev);
  const newNode = {
    id: (getmaximalId(prevTree) + 1).toString(),
    type,
    status: st,
    children: [],
  };
  if(type==="char"){
    prevTree.push(newNode);
    return prevTree;
  }
  prevTree.forEach((type0) => {
    if (type0.id === id) {
      type0.children.push(newNode);
    }
    type0.children.forEach((type1) => {
      if (type1.id === id) {
        type1.children.push(newNode);
      }
      type1.children.forEach((type2) => {});
    });
  });
  const isCorrect = structurecheck(prevTree);
  if (isCorrect) {
    return prevTree;
  } else {
    return prev;
  }
};
