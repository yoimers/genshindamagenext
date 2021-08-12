import React, { useReducer } from "react";
import typestructure from "./Statecontrols/Typestructure";
import { createNode } from "./Statecontrols/CreateNode";
import { deleteNode } from "./Statecontrols/DeleteNode";
import Sidebar from "./Sidebarcomponents/Sidebar";
import { TypeTree, Action } from "../Statuslist/type";

const st = {
  name: "init",
  a: 0,
  ab: 0,
  ac: 0,
  b: 0,
  bc: 0,
  bb: 0,
  c: 0,
  d: 0,
  e: 0,
  h: 0,
  hc: 0,
  hb: 0,
  em: 0,
  ema: 0,
  ea: 0,
  el: 0, //熟知倍率
  ar: 0,
  hr: 0, //A変換比率
  br: 0,
  ahs: 0, //スキル
  s: 0,
  r: 0,
  select: 0,
};

const typetree = [
  {
    id: "0",
    type: "cha",
    state: st,
    children: [
      {
        id: "1",
        type: "art",
        state: st,
        children: [
          {
            id: "2",
            state: st,
            type: "wep",
          },
        ],
      },
    ],
  },
];

const reducer = (typetree: TypeTree[], action: Action): TypeTree[] => {
  switch (action.action) {
    case "createNode":
      return createNode(typetree, action.id, action.type);
    case "deleteNode":
      return deleteNode(typetree, action.id);
  }
};

export default function Main() {
  const [types, dispatch] = useReducer(reducer, typetree);
  const typeelement = typestructure(types, dispatch);

  return (
    <div className="flex flex-nowrap bg-transparent min-h-full">
      <main className="flex flex-col flex-grow mr-3 border border-gray-800 rounded-lg shadow-sm">
        {typeelement}
      </main>
      <Sidebar />
    </div>
  );
}
