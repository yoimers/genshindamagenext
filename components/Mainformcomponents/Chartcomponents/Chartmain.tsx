import React, { useContext } from 'react';
import { ChartContext, StateButtonContext } from '../Main';

export default function Chartmain() {
  const { statbuttons, setButton } = useContext(StateButtonContext);
  const { chart, setChart } = useContext(ChartContext);
  console.log(chart);
  return (
    <div className="flex flex-col flex-grow  mt-2 mr-2 border border-gray-800 rounded-lg shadow-sm p-1">
      {chart.id}
    </div>
  );
}
