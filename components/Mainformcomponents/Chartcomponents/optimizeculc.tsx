import { CulcResult, CulcResults, Status, StatusName } from '../../Statuslist/type';
import { nelderMead } from 'fmin';
import { cloneDeep } from 'lodash';
import { STATUS_CODES } from 'http';
//最適ステ計算
//20→a,c,d = 55,5,58.2,78.1
//60→a,c,d = 83.5,59.3,118.6
//120→a,c,d = 85.6,88.6,177.2
export default function optimizeculc(id: string, allcase: Status[]): CulcResults {
  const status: Status = allcase[id];
  const results: CulcResults = [];
  status.el = ((25 / 9) * status.em) / (status.em + 1400) + status.ea / 100;
  status.ectoa_upper = status.ectoa_upper === 0 ? 80 : status.ectoa_upper;
  let prevresult = { a: 1, b: 1, c: 1, d: 1, ec: 1 };
  for (let t = 0; t <= 160; t += 2) {
    const result = damage_t(status, t, prevresult);
    prevresult = { a: result.a, b: result.b, c: result.c, d: result.d, ec: result.ec };
    results.push(result);
  }
  return results;
}

function damage_t(status: Status, t: number, { a, b, c, d, ec }): CulcResult {
  const loss = (stat: [number, number, number, number, number]) =>
    expecteddamage_t(status, stat, t, { a, b, c, d, ec });

  const param = {
    maxIterations: 10000,
    minErrorDelta: 1e-9,
    zeroDelta: t === 0 ? 1e-2 : 1e-13,
    nonZeroDelta: 1.05,
  };
  const solution = nelderMead(loss, [a, b, c, d, ec], param);
  const h1 =
    1.5 *
    (t -
      solution.x[0] / 1.5 -
      solution.x[1] / 1.8 -
      solution.x[2] / 1 -
      solution.x[3] / 2 -
      solution.x[4] / 1.665);

  const newstatus = cloneDeep(status);
  newstatus.a += solution.x[0] >= 0 ? solution.x[0] : 0;
  newstatus.b += solution.x[1] >= 0 ? solution.x[1] : 0;
  newstatus.h += h1 >= 0 ? h1 : 0;
  newstatus.c += solution.x[2] >= 0 ? solution.x[2] : 0;
  newstatus.d += solution.x[3] >= 0 ? solution.x[3] : 0;
  newstatus.ec += solution.x[4] >= 0 ? solution.x[4] : 0;

  const result: CulcResult = {
    t,
    a: Number(newstatus.a.toFixed(1)),
    b: Number(newstatus.b.toFixed(1)),
    h: Number(newstatus.h.toFixed(1)),
    c: Number(newstatus.c.toFixed(1)),
    d: Number(newstatus.d.toFixed(1)),
    ec: Number(newstatus.ec.toFixed(1)),
    expecteddamage: Number(expected_damage(newstatus).toFixed(1)),
    expected_max_damage: Number(expected_max_damage(newstatus).toFixed(1)),
    maxdamage: Number(max_damage(newstatus).toFixed(1)),
    mindamage: Number(min_damage(newstatus).toFixed(1)),
  };
  return result;
}

//a,b,c,dの順
function expecteddamage_t(
  status: Status,
  stat: [number, number, number, number, number],
  t: number,
  { a, b, c: cc, d, ec }
): number {
  const newstatus: Status = cloneDeep(status);
  newstatus.a += stat[0];
  newstatus.b += stat[1];
  newstatus.h +=
    1.5 * (t - stat[0] / 1.5 - stat[1] / 1.8 - stat[2] / 1 - stat[3] / 2 - stat[4] / 1.665);
  newstatus.c += stat[2];
  newstatus.d += stat[3];
  newstatus.ec += stat[4];
  let n5 = 1.5 * (t - stat[0] / 1.5 - stat[1] / 1.8 - stat[2] / 1 - stat[3] / 2 - stat[4] / 1.665);
  const c = newstatus.c <= 100 ? 0 : (newstatus.c - 100 + 0) ** 2;
  const n0 = stat[0] >= 0 ? 0 : (stat[0] / 1.5 - 0) ** 2;
  const n1 = stat[1] >= 0 ? 0 : (stat[1] / 1.8 - 0) ** 2;
  const n2 = stat[2] >= 0 ? 0 : (stat[2] / 1 - 0) ** 2;
  const n3 = stat[3] >= 0 ? 0 : (stat[3] / 2 - 0) ** 2;
  const n4 = stat[4] >= 0 ? 0 : (stat[4] / 1.665 - 0) ** 2;
  n5 = n5 >= 0 ? 0 : (n5 / 1.5 - 0) ** 2;

  //20→a,c,d = 55,5,58.2,78.1
  //60→a,c,d = 83.5,59.3,118.6
  //120→a,c,d = 85.6,88.6,177.2
  const diff =
    ((stat[0] - a) / 1.5) ** 2 +
    ((stat[1] - b) / 1.8) ** 2 +
    (stat[2] - cc) ** 2 +
    ((stat[3] - d) / 2) ** 2 +
    ((stat[4] - ec) / 1.665) ** 2;
  const score =
    status.a / 1.5 + status.b / 1.8 + status.h / 1.5 + status.c + status.d / 2 + status.ec / 1.665;
  // const lam2 = 4 + t / 40;
  //125.9 33.8 76.2
  const lam2 = 5 + (score + t) / 30;
  const lam1 = 1e-4; //4~5
  return (
    -1 * expected_max_damage_opt(newstatus) + lam2 * (c + n0 + n1 + n2 + n3 + n4 + n5) + diff * lam1
  );
}

function expected_max_damage_opt(status: Status): number {
  const ABHP = ABHPculc(status);
  const element = Edamageculc(status);
  const critical = CRITICALculc(status);
  return ABHP * critical * element;
}

function expected_max_damage(status: Status): number {
  const EcToA = status.ec > 100 ? (status.ec - 100) * (1 + status.ectoa / 100) : 0;
  const EcToA_Upper = EcToA > status.ectoa_upper * 100 ? status.ectoa_upper : EcToA;

  const A = status.ab * (1 + status.a / 100 + EcToA_Upper / 100) + status.ac;
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
  const EcToE = status.ectoe * status.ec;
  const EcToE_Upper = EcToE >= 75 ? 75 : EcToE;
  const element = 1 + status.e / 100 + EcToE_Upper / 100;

  let emselect: number;
  if (Math.abs(status.ema - 1) <= 0.01) {
    emselect = 1;
  } else {
    emselect = 1 + (status.select / 100) * ((1 + status.el) * status.ema - 1);
  }
  return ABHP * critical * element * emselect;
}

function max_damage(status: Status): number {
  const ABHP = ABHPculc(status);
  const critical = 1 + status.d / 100;
  const element = Edamageculc(status);

  let emselect: number;
  if (Math.abs(status.ema - 1) <= 0.01) {
    emselect = 1;
  } else {
    emselect = 1 + (status.select / 100) * ((1 + status.el) * status.ema - 1);
  }

  const TOTAL = ABHP * critical * element * emselect;
  return TOTAL;
}

function min_damage(status: Status): number {
  const ABHP = ABHPculc(status);
  const critical = 1;
  const element = Edamageculc(status);

  let emselect: number;
  if (Math.abs(status.ema - 1) <= 0.01) {
    emselect = 1;
  } else {
    emselect = 1 + (status.select / 100) * ((1 + status.el) * status.ema - 1);
  }

  const TOTAL = ABHP * critical * element * emselect;
  return TOTAL;
}

function expected_damage(status: Status): number {
  const ABHP = ABHPculc(status);
  const critical = CRITICALculc(status);
  const element = Edamageculc(status);

  let emselect: number;
  if (Math.abs(status.ema - 1) <= 0.01) {
    emselect = 1;
  } else {
    emselect = 1 + (status.select / 100) * ((1 + status.el) * status.ema - 1);
  }

  const TOTAL = ABHP * critical * element * emselect;
  return TOTAL;
}

function ABHPculc(status: Status) {
  const EcToA = status.ec > 100 ? (status.ec - 100) * (status.ectoa / 100) : 0;
  const EcToA_Upper = EcToA > status.ectoa_upper ? status.ectoa_upper : EcToA;

  const A = status.ab * (1 + status.a / 100 + EcToA_Upper / 100) + status.ac;
  const B = status.bb * (1 + status.b / 100) + status.bc;
  const HP = status.hb * (1 + status.h / 100) + status.hc;
  const ABHP =
    (A * status.ar) / 100 + (B * status.br) / 100 + (HP * (status.hr + status.ahs)) / 100;
  return ABHP;
}

function CRITICALculc(status: Status) {
  let critical: number;
  if (status.c >= 100) {
    critical = 1 + status.d / 100;
  } else {
    critical = 1 + (status.d / 100) * (((1 - status.r / 100) * status.c) / 100 + status.r / 100);
  }
  return critical;
}
function Edamageculc(status: Status) {
  const EcToE = (status.ectoe / 100) * status.ec;
  const EcToE_Upper = EcToE >= 75 ? 75 : EcToE;
  const element = 1 + status.e / 100 + EcToE_Upper / 100;
  return element;
}