import { cloneDeep } from "lodash";

interface TypeTree {
  id: String;
  type: String;
  children: {
    id: String;
    type: String;
    children: TypeSubTree[];
  }[];
}
interface TypeSubTree {
  id: String;
  type: String;
}

export const deleteNode = (prev: TypeTree[], id: String): TypeTree[] => {
  let prevTree = cloneDeep(prev);
  prevTree.some((type, i) => {
    if (type.id === id) {
      prevTree.splice(i, 1);
      return true;
    }
    type.children.some((type1, j) => {
      if (type1.id === id) {
        type.children.splice(j, 1);
        return true;
      }
      type1.children.some((type2, k) => {
        if (type2.id === id) {
          type1.children.splice(k, 1);
          return true;
        }
      });
    });
  });
  return prevTree;
};
