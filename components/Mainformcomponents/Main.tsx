import React, { createContext, useContext, useEffect, useReducer } from 'react';
import typestructure from './Statecontrols/Typestructure';
import { createNode } from './Statecontrols/CreateNode';
import { deleteNode } from './Statecontrols/DeleteNode';
import Sidebar from './Sidebarcomponents/Sidebar';
import { TypeTree, Action } from '../Statuslist/type';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

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
  {
    id: '3',
    type: 'char',
    children: [
      {
        id: '4',
        type: 'wep',
        children: [
          {
            id: '5',
            type: 'art',
          },
        ],
      },
    ],
  },
];
export const StateContext = createContext({} as { types: TypeTree[]; dispatch: React.Dispatch<Action> });
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

  return (
    <StateContext.Provider value={{ types, dispatch }}>
      <DndProvider backend={HTML5Backend}>
        <div className="flex flex-nowrap bg-transparent min-h-full">
          <main className="flex flex-col flex-grow w-mainwidth mr-2 border border-gray-800 rounded-lg shadow-sm">{typeelement}</main>
          <Sidebar />
        </div>
      </DndProvider>
    </StateContext.Provider>
  );
}
