import React, { useEffect, useReducer } from "react";
import typestructure from "./Statecontrols/Typestructure";
import { createNode } from "./Statecontrols/CreateNode";
import { deleteNode } from "./Statecontrols/DeleteNode";
import Sidebar from "./Sidebarcomponents/Sidebar";
import { TypeTree, Action } from "../Statuslist/type";
import { st } from "../Statuslist/status";

const typetree: TypeTree[] = [
  {
    id: "0",
    type: "char",
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
  useEffect(() => {
    dispatch({ action: "createNode", id: "0", type: "char" });
  }, []);
  return (
    <div className="flex flex-nowrap bg-transparent min-h-full">
      <main className="flex flex-col flex-grow mr-3 border border-gray-800 rounded-lg shadow-sm">
        {typeelement}
      </main>
      <Sidebar />
    </div>
  );
}
