import { TypeTree } from "../../Statuslist/type";


//stateTreeが正常か判断
export default function structurecheck(types: TypeTree[]): boolean {
  // charはtop層のみ, wepとartは2,3層にそれぞれ有る
  const judge1 = types.filter((type0) => {
    if (type0.type !== "char") {
      return true;
    }
  });
  if (judge1.length !== 0) return false;
  const judge2 = types.filter((type0) => {
    const d = type0.children.filter((type1) => {
      const judge = type1.children.filter((type2) => {
        if (
          type1.type === type2.type ||
          type2.type === "char" ||
          type1.type === "char"
        )
          return true;
      });
      if (judge.length !== 0) return true;
    });
    if (d.length !== 0) return true;
  });
  if (judge2.length !== 0) return false;
  return true;
}