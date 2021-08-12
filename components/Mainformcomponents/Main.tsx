import React, { ReactElement, useEffect, useReducer, useState } from "react";
import typestructure from "./Statecontrols/Typestructure";
import { createNode } from "./Statecontrols/CreateNode";
import { deleteNode } from "./Statecontrols/DeleteNode";

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
            id: "3",
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
const a=2;
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
    <main className="flex flex-col flex-grow mr-3 border border-gray-800 rounded-lg shadow-sm">
      {typeelement}
    </main>
  );
}

