import React, { createContext, useContext, useEffect, useReducer } from 'react';
import typestructure from './Statecontrols/Typestructure';
import { createNode } from './Statecontrols/CreateNode';
import { deleteNode } from './Statecontrols/DeleteNode';
import Sidebar from './Sidebarcomponents/Sidebar';
import { TypeTree, Action } from '../Statuslist/type';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { initNode } from './Statecontrols/InitNode';
import { siblingNode } from './Statecontrols/SiblingNode';

export const StateContext = createContext({} as { types: TypeTree[]; dispatch: React.Dispatch<Action> });
const reducer = (typetree: TypeTree[], action: Action): TypeTree[] => {
  switch (action.action) {
    case 'createNode':
      return createNode(typetree, action.id, action.type);
    case 'deleteNode':
      return deleteNode(typetree, action.id);
    case 'initNode':
      return initNode(action.tree);
    case 'siblingNode':
      return siblingNode(typetree, action.id, action.type);
  }
};

export default function Main() {
  const [types, dispatch] = useReducer(reducer, [] as TypeTree[]);
  const typeelement = typestructure(types, dispatch);
  useEffect(() => {
    const typestree: TypeTree[] = JSON.parse(localStorage.getItem('StateTree'));
    dispatch({ action: 'initNode', tree: typestree });
  }, []);
  useEffect(() => {
    localStorage.setItem('StateTree', JSON.stringify(types));
  }, [types]);
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
