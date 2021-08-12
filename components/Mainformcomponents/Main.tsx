import React, { ReactElement, useState } from "react";
import Charform from "./Charform";
import Weaponform from "./Weaponform";
import Artifactform from "./Artifactform";
import { type } from "node:os";

const statestree = [
  {
    id: "1",
    stat: { a: "12", b: "43" },
  },
  {
    id: "2",
    stat: { d: "12" },
  },
];

const typetree = [
  {
    id: "1",
    type: "char",
    children: [
      {
        id: "2",
        type: "art",
        children: [
          {
            id: "4",
            type: "wep",
          },
        ],
      },
      {
        id: "3",
        type: "art",
        children: [
          {
            id: "5",
            type: "wep",
          },
        ],
      },
    ],
  },
  {
    id: "10",
    type: "char",
    children: [
      {
        id: "11",
        type: "art",
        children: [
          {
            id: "12",
            type: "wep",
          },
        ],
      },
    ],
  },
];
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
export default function Main() {
  const [types, setTypes] = useState<TypeTree[]>(typetree);
  const isCorrect = structurecheck(types);
  const typeelement = typestructure(types);

  const deleteNode = (id: String): void => {
    setTypes((prevTree) => {
      const x = prevTree.slice();
      x.some((type, i) => {
        if (type.id === id) {
          x.splice(i, 1);
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
      return x;
    });
  };
  const createNode = (id:String, type: String): void => {
    "aa";
  };
  const getmaximalId = (types: TypeTree[]): number => {
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
  console.log(getmaximalId(types));
  function typestructure(types: TypeTree[]): ReactElement[] {
    const typeelement = types.map((type0) => {
      const typeelement0 = type0.children.map((type1) => {
        const typeelement1 = type1.children.map((type2) => {
          if (type2.type === "wep") {
            return (
              <Weaponform
                g={2}
                key={type2.id}
                onDelete={() => deleteNode(type2.id)}
              />
            );
          } else {
            return (
              <Artifactform
                g={2}
                key={type2.id}
                onDelete={() => deleteNode(type2.id)}
              />
            );
          }
        });
        if (type1.type === "wep") {
          return (
            <Weaponform
              g={1}
              key={type1.id}
              onDelete={() => deleteNode(type1.id)}
            >
              {typeelement1}
            </Weaponform>
          );
        } else {
          return (
            <Artifactform
              g={1}
              key={type1.id}
              onDelete={() => deleteNode(type1.id)}
            >
              {typeelement1}
            </Artifactform>
          );
        }
      });
      if (type0.type === "char") {
        return (
          <Charform g={0} key={type0.id} onDelete={() => deleteNode(type0.id)}>
            {typeelement0}
          </Charform>
        );
      }
    });
    return typeelement;
  }
  return (
    <main className="flex flex-col flex-grow mr-3 border border-gray-800 rounded-lg shadow-sm">
      {typeelement}
    </main>
  );
}

function structurecheck(types: TypeTree[]): boolean {
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
