import React, { ReactElement } from "react";
import Artifactform from "../Artifactform";
import Charform from "../Charform";
import Weaponform from "../Weaponform";

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
interface CreateNode {
  action: "createNode";
  id: String;
  type: "char" | "art" | "wap";
}
interface DeleteNode {
  action: "deleteNode";
  id: String;
}

type Action = CreateNode | DeleteNode;
export default function typestructure(types: TypeTree[], dispatch:React.Dispatch<Action>): ReactElement[] {
  const typeelement = types.map((type0) => {
    const typeelement0 = type0.children.map((type1) => {
      const typeelement1 = type1.children.map((type2) => {
        if (type2.type === "wep") {
          return (
            <Weaponform
              g={2}
              key={type2.id}
              onDelete={() => dispatch({action:"deleteNode",id:type2.id})}
            />
          );
        } else {
          return (
            <Artifactform
              g={2}
              key={type2.id}
              onDelete={() => dispatch({action:"deleteNode",id:type2.id})}
            />
          );
        }
      });
      if (type1.type === "wep") {
        return (
          <Weaponform
            g={1}
            key={type1.id}
            onDelete={() => dispatch({action:"deleteNode",id:type1.id})}
          >
            {typeelement1}
          </Weaponform>
        );
      } else {
        return (
          <Artifactform
            g={1}
            key={type1.id}
            onDelete={() => dispatch({action:"deleteNode",id:type1.id})}
          >
            {typeelement1}
          </Artifactform>
        );
      }
    });
    if (type0.type === "char") {
      return (
        <Charform g={0} key={type0.id} onDelete={() => dispatch({action:"deleteNode",id:type0.id})}>
          {typeelement0}
        </Charform>
      );
    }
  });
  return typeelement;
}