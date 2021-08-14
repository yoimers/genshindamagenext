import React, { useContext } from 'react';
import { ChartContext, StateButtonContext } from '../Main';

export default function StatusButton() {
  const { statbuttons, setButton } = useContext(StateButtonContext);
  const { chart, setChart } = useContext(ChartContext);

  const onClick = (id: string): void => {
    setChart({ id });
  };
  if (Object.keys(statbuttons).length >= 1) {
    return (
      <div className="mr-2 mt-2 border border-gray-800 rounded-lg shadow-sm p-1">
        <div className="grid grid-cols-6 gap-x-4 gap-y-2">
          {Object.entries(statbuttons).map(([id, statbutton]) => {
            return (
              <button
                key={id}
                className={`border h-10 rounded-lg text-blue-100 hover:bg-red-700 hover:text-red-100 ${
                  statbutton.culcresult ? 'border-red-200' : 'border-blue-200'
                }`}
                onClick={() => onClick(id)}
              >
                {statbutton.culcname.toString()}
              </button>
            );
          })}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
