import React, { useContext } from 'react';
import { CulcResults } from '../../Statuslist/type';
import { ChartContext, StateButtonContext } from '../Main';
import Compstatus from './Compstatus';
import Optstatus from './Optstatus';
import StatusButton from './StatusButton';

type Culc = {
  culcname: string;
  culctype: 'opt' | 'compare';
  culcresult: false | CulcResults; //false
};
export default function Chartmain() {
  const { statbuttons, setButton } = useContext(StateButtonContext);
  const { chart, setChart } = useContext(ChartContext);
  const id = chart.id || 'expected_compare';
  const culc: Culc = statbuttons[id] || { culcname: '', culctype: 'opt', culcresult: false };
  if (culc.culcresult === false) {
    return (
      <div className="flex flex-col flex-grow  mt-2 mr-2 border border-gray-800 rounded-lg shadow-sm p-1">
        LOADING NOW
      </div>
    );
  } else {
    return culc.culctype === 'opt' ? (
      <Optstatus culc={culc} />
    ) : (
      <Compstatus culc={culc} statusbuttons={statbuttons} />
    );
  }
}
