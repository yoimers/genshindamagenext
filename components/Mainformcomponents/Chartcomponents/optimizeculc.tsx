import { CulcResult, CulcResults, Status, StatusName } from '../../Statuslist/type';
import { nelderMead } from 'fmin';
import { cloneDeep } from 'lodash';
//最適ステ計算
//20→a,c,d = 55,5,58.2,78.1
//60→a,c,d = 83.5,59.3,118.6
//120→a,c,d = 85.6,88.6,177.2
export default function optimizeculc(id: string, allcase: Status[]): CulcResults {
  const status: Status = allcase[id];
  const results: CulcResults = [];
  for (let t = 0; t <= 160; t += 2) {
    const result = damage_t(status, t);
    results.push(result);
  }

  return results;
}

function damage_t(status: Status, t: number): CulcResult {
  const loss = (stat: [number, number, number, number]) => expecteddamage_t(status, stat, t);
  const param = {
    maxIterations: 100000,
    minErrorDelta: 1e-9,
    zeroDelta: 1e-8,
  };
  const solution = nelderMead(loss, [30, 0, 30, 100], param);
  const h =
    1.5 * (t - solution.x[0] / 1.5 - solution.x[1] / 1.8 - solution.x[2] / 1 - solution.x[3] / 2) +
    status.h;
  const newstatus = cloneDeep(status);
  newstatus.a += solution.x[0];
  newstatus.b += solution.x[1] >= 0 ? solution.x[1] : 0;
  newstatus.h += h >= 0 ? h : 0;
  newstatus.c += solution.x[2];
  newstatus.d += solution.x[3];

  const result: CulcResult = {
    t,
    a: Number(newstatus.a.toFixed(0)),
    b: Number(newstatus.b.toFixed(0)),
    h: Number(newstatus.h.toFixed(0)),
    c: Number(newstatus.d.toFixed(0)),
    d: Number(newstatus.c.toFixed(0)),
    expecteddamage: Number(expected_damage(newstatus).toFixed(0)),
    expected_max_damage: Number(expected_max_damage(newstatus).toFixed(0)),
    maxdamage: Number(max_damage(newstatus).toFixed(0)),
    mindamage: Number(min_damage(newstatus).toFixed(0)),
    status,
  };
  return result;
}

//a,b,c,dの順
function expecteddamage_t(
  status: Status,
  stat: [number, number, number, number],
  t: number
): number {
  const newstatus: Status = cloneDeep(status);
  newstatus.a += stat[0];
  newstatus.b += stat[1];
  newstatus.h += 1.5 * (t - stat[0] / 1.5 - stat[1] / 1.8 - stat[2] / 1 - stat[3] / 2);
  newstatus.c += stat[2];
  newstatus.d += stat[3];
  const c = newstatus.c <= 100 ? 0 : (newstatus.c - 100 + 1) ** 2;
  const n0 = stat[0] >= 0 ? 0 : (stat[0] - 0) ** 2;
  const n1 = stat[1] >= 0 ? 0 : (stat[1] - 0) ** 2;
  const n2 = stat[2] >= 0 ? 0 : (stat[2] - 0) ** 2;
  const n3 = stat[3] >= 0 ? 0 : (stat[3] - 0) ** 2;
  let n4 = 1.5 * (t - stat[0] / 1.5 - stat[1] / 1.8 - stat[2] / 1 - stat[3] / 2);
  n4 = n4 >= 0 ? 0 : (n4 - 0) ** 2;
  //20→a,c,d = 55,5,58.2,78.1
  //60→a,c,d = 83.5,59.3,118.6
  //120→a,c,d = 85.6,88.6,177.2
  const lam2 = 10 + t;
  return -expected_max_damage(newstatus) + lam2 * (c + n0 + n1 + n2 + n3 + n4);
}

function expected_max_damage(status: Status): number {
  const A = status.ab * (1 + status.a / 100) + status.ac;
  const B = status.bb * (1 + status.b / 100) + status.bc;
  const HP = status.hb * (1 + status.h / 100) + status.hc;
  const ABHP =
    (A * status.ar) / 100 + (B * status.br) / 100 + (HP * (status.hr + status.ahs)) / 100;
  let critical: number;
  if (status.c >= 100) {
    critical = 1 + status.d / 100;
  } else {
    critical = 1 + (status.d / 100) * (((1 - status.r / 100) * status.c) / 100 + status.r / 100);
  }
  const element = 1 + status.e / 100;
  const el = ((25 / 9) * status.em) / (status.em + 1400) + status.ea / 100;

  let emselect: number;
  if (Math.abs(status.ema - 1) <= 0.05) {
    emselect = 1;
  } else {
    emselect = 1 + (status.select / 100) * ((1 + el) * status.ema - 1);
  }

  const TOTAL = ABHP * critical * element * emselect;
  return TOTAL;
}

function max_damage(status: Status): number {
  const A = status.ab * (1 + status.a / 100) + status.ac;
  const B = status.bb * (1 + status.b / 100) + status.bc;
  const HP = status.hb * (1 + status.h / 100) + status.hc;
  const ABHP =
    (A * status.ar) / 100 + (B * status.br) / 100 + (HP * (status.hr + status.ahs)) / 100;
  const critical = 1 + status.d / 100;
  const element = 1 + status.e / 100;
  const el = ((25 / 9) * status.em) / (status.em + 1400) + status.ea / 100;

  let emselect: number;
  if (Math.abs(status.ema - 1) <= 0.05) {
    emselect = 1;
  } else {
    emselect = 1 + (status.select / 100) * ((1 + el) * status.ema - 1);
  }

  const TOTAL = ABHP * critical * element * emselect;
  return TOTAL;
}

function min_damage(status: Status): number {
  const A = status.ab * (1 + status.a / 100) + status.ac;
  const B = status.bb * (1 + status.b / 100) + status.bc;
  const HP = status.hb * (1 + status.h / 100) + status.hc;
  const ABHP =
    (A * status.ar) / 100 + (B * status.br) / 100 + (HP * (status.hr + status.ahs)) / 100;
  const critical = 1;
  const element = 1 + status.e / 100;
  const el = ((25 / 9) * status.em) / (status.em + 1400) + status.ea / 100;

  let emselect: number;
  if (Math.abs(status.ema - 1) <= 0.05) {
    emselect = 1;
  } else {
    emselect = 1 + (status.select / 100) * ((1 + el) * status.ema - 1);
  }

  const TOTAL = ABHP * critical * element * emselect;
  return TOTAL;
}

function expected_damage(status: Status): number {
  const A = status.ab * (1 + status.a / 100) + status.ac;
  const B = status.bb * (1 + status.b / 100) + status.bc;
  const HP = status.hb * (1 + status.h / 100) + status.hc;
  const ABHP =
    (A * status.ar) / 100 + (B * status.br) / 100 + (HP * (status.hr + status.ahs)) / 100;
  let critical: number;
  if (status.c >= 100) {
    critical = 1 + status.d / 100;
  } else {
    critical = 1 + ((status.d / 100) * status.c) / 100;
  }
  const element = 1 + status.e / 100;
  const el = ((25 / 9) * status.em) / (status.em + 1400) + status.ea / 100;

  let emselect: number;
  if (Math.abs(status.ema - 1) <= 0.05) {
    emselect = 1;
  } else {
    emselect = 1 + (status.select / 100) * ((1 + el) * status.ema - 1);
  }

  const TOTAL = ABHP * critical * element * emselect;
  return TOTAL;
}
