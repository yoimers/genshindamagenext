import React, { useContext, useEffect } from 'react';
import { AllFormContext, ChartContext, StateButtonContext, StructureContext } from '../Main';
import Chartbutton from './Chartbutton';

export default function StatusButton() {
  // const { types, dispatch } = useContext(StructureContext);
  // const { status, statusdispatch } = useContext(AllFormContext);
  const { statbuttons, setButton } = useContext(StateButtonContext);
  const { chart, setChart } = useContext(ChartContext);

  return (
    Object.keys(statbuttons).length !== 0 && (
      <div className="mr-2 border border-gray-800 rounded-lg shadow-sm p-1 ">
        <div className="grid grid-cols-6 gap-x-4 gap-y-2">
          {Object.entries(statbuttons).map(([id, statbutton]) => {
            if (statbutton.culctype === 'compare') {
              return (
                <Chartbutton
                  key={id}
                  id={id}
                  statbutton={statbutton}
                  onClick={() =>
                    setChart((previd) => {
                      return { id: previd.id === id ? false : id };
                    })
                  }
                  chart={chart}
                />
              );
            } else {
              return;
            }
          })}
        </div>
        {Object.keys(statbuttons).length !== 3 && (
          <div className="grid grid-cols-6 gap-x-4 gap-y-2 mt-2">
            {Object.entries(statbuttons).map(([id, statbutton]) => {
              if (statbutton.culctype === 'opt') {
                return (
                  <Chartbutton
                    key={id}
                    id={id}
                    statbutton={statbutton}
                    onClick={() =>
                      setChart((previd) => {
                        return { id: previd.id === id ? false : id };
                      })
                    }
                    chart={chart}
                  />
                );
              } else {
                return;
              }
            })}
          </div>
        )}
      </div>
    )
  );
}
