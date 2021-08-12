import React, { createContext, useContext, useEffect, useReducer } from 'react';
import typestructure from './Statecontrols/Typestructure';
import { createNode } from './Statecontrols/CreateNode';
import { deleteNode } from './Statecontrols/DeleteNode';
import Sidebar from './Sidebarcomponents/Sidebar';
import { TypeTree, Action } from '../Statuslist/type';

const typetree: TypeTree[] = [
  {
    id: '0',
    type: 'char',
    children: [
      {
        id: '1',
        type: 'art',
        children: [
          {
            id: '2',
            type: 'wep',
          },
        ],
      },
    ],
  },
];

export const StatusContext = createContext(
  {} as {
    types: TypeTree[];
    dispatch: React.Dispatch<Action>;
  }
);

const reducer = (typetree: TypeTree[], action: Action): TypeTree[] => {
  switch (action.action) {
    case 'createNode':
      return createNode(typetree, action.id, action.type);
    case 'deleteNode':
      return deleteNode(typetree, action.id);
  }
};

export default function Main() {
  const [types, dispatch] = useReducer(reducer, typetree);
  const typeelement = typestructure(types, dispatch);
  useEffect(() => {
    console.log(types);
  });
  return (
    <div className="flex flex-nowrap bg-transparent min-h-full">
      <StatusContext.Provider value={{ types, dispatch }}>
        <main className="flex flex-col flex-grow mr-3 border border-gray-800 rounded-lg shadow-sm">{typeelement}</main>
        <Sidebar />
      </StatusContext.Provider>
    </div>
  );
}
