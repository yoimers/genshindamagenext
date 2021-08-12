export default function getmaximalId(types: TypeTree[]): number {
  let maxid = 0;
  types.forEach((type0) => {
    if (maxid < Number(type0.id)) {
      maxid = Number(type0.id);
    }
    type0.children.forEach((type1) => {
      if (maxid < Number(type1.id)) {
        maxid = Number(type1.id);
      }
      type1.children.forEach((type2) => {
        if (maxid < Number(type2.id)) {
          maxid = Number(type2.id);
        }
      });
    });
  });
  return maxid;
};

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

