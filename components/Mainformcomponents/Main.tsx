import React, { createContext, useEffect, useReducer, useState } from 'react';
import { createNode } from './Statecontrols/CreateNode';
import { deleteNode } from './Statecontrols/DeleteNode';
import Sidebar from './Sidebarcomponents/Sidebar';
import {
  TypeTree,
  Action,
  AllFormState,
  CharArtWepAction,
  StatButtons,
  Chart,
} from '../Statuslist/type';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { initNode } from './Statecontrols/InitNode';
import { siblingNode } from './Statecontrols/SiblingNode';
import createchangecharartwepaction from './Statuscontrols/createchangecharartwepaction';
import deletechangecharartwepaction from './Statuscontrols/deletechangecharartwepaction';
import { initchangecharartwepaction } from './Statuscontrols/initchangecharartwepaction';
import copycharartwepaction from './Statuscontrols/copycharartwepaction';
import StatusButton from './Chartcomponents/StatusButton';
import Chartmain from './Chartcomponents/Chartmain';
import Typestructure from './Statecontrols/Typestructure';

export const StructureContext = createContext(
  {} as { types: TypeTree[]; dispatch: React.Dispatch<Action> }
);
export const AllFormContext = createContext(
  {} as { status: AllFormState; statusdispatch: React.Dispatch<CharArtWepAction> }
);
export const StateButtonContext = createContext(
  {} as { statbuttons: StatButtons; setButton: React.Dispatch<React.SetStateAction<StatButtons>> }
);
export const ChartContext = createContext(
  {} as { chart: Chart; setChart: React.Dispatch<React.SetStateAction<Chart>> }
);
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

const statreducer = (prevState: AllFormState, action: CharArtWepAction): AllFormState => {
  switch (action.action) {
    case 'createchangecharartwepaction':
      return createchangecharartwepaction(prevState, action);
    case 'initchangecharartwepaction':
      return createchangecharartwepaction(prevState, action);
    case 'deletecharartwepaction':
      return deletechangecharartwepaction(prevState, action);
    case 'loadsetcharartwepaction':
      return initchangecharartwepaction(action.status);
    case 'copycharartwepaction':
      return copycharartwepaction(prevState, action);
  }
};
const inittree: TypeTree[] = [
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
export default function Main() {
  const [types, dispatch] = useReducer(reducer, [] as TypeTree[]);
  const [status, statusdispatch] = useReducer(statreducer, {} as AllFormState);
  const [statbuttons, setButton] = useState({} as StatButtons);
  const [chart, setChart] = useState({ id: false } as Chart);

  useEffect(() => {
    const typestree: TypeTree[] = JSON.parse(localStorage.getItem('StateTree'));
    if (typestree) {
      dispatch({ action: 'initNode', tree: typestree });
    } else {
      dispatch({ action: 'initNode', tree: inittree });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('StateTree', JSON.stringify(types));
  }, [types]);

  useEffect(() => {
    if (Object.keys(status).length) {
      localStorage.setItem('Statuslist', JSON.stringify(status));
    }
  }, [status]);

  return (
    <StructureContext.Provider value={{ types, dispatch }}>
      <AllFormContext.Provider value={{ status, statusdispatch }}>
        <StateButtonContext.Provider value={{ statbuttons, setButton }}>
          <ChartContext.Provider value={{ chart, setChart }}>
            <DndProvider backend={HTML5Backend}>
              <div className="flex flex-nowrap bg-transparent min-h-full">
                <main className="w-mainwidth">
                  <Typestructure />
                  <StatusButton />
                  <Chartmain />
                </main>
                <Sidebar />
              </div>
            </DndProvider>
          </ChartContext.Provider>
        </StateButtonContext.Provider>
      </AllFormContext.Provider>
    </StructureContext.Provider>
  );
}
