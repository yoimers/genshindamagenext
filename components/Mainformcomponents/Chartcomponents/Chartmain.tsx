import React, { useContext } from 'react';
import { Culc, CulcResults } from '../../Statuslist/type';
import { ChartContext, StateButtonContext } from '../Main';
import Compstatus from './Compstatus';
import Optstatus from './Optstatus';
import StatusButton from './StatusButton';

export default function Chartmain() {
  const { statbuttons, setButton } = useContext(StateButtonContext);
  const { chart, setChart } = useContext(ChartContext);
  const id = chart.id || 'expected_compare';
  const culc: Culc = statbuttons[id] || { culcname: '', culctype: 'opt', culcresult: false };

  if (culc.culcresult !== false && chart.id !== false) {
    return culc.culctype === 'opt' ? (
      <Optstatus culc={culc} />
    ) : (
      <Compstatus culc={culc} statusbuttons={statbuttons} />
    );
  } else {
    return <></>;
  }
}
