import React from 'react';

export default function optculc_new() {
  return <div></div>;
}

// import { CulcResult, CulcResults, Status } from '../../Statuslist/type';
// import { cloneDeep } from 'lodash';

// export default function optimizeculc_new(id: string, allcase: Status[]): CulcResults {
//   const status: Status = allcase[id];
//   const results: CulcResults = [];
//   status.el = ((25 / 9) * status.em) / (status.em + 1400) + status.ea / 100;
//   for (let t = 0; t <= 160; t += 1) {
//     const result = opt_t(status, t);
//     results.push(result);
//   }
//   console.log(cons(status, { a: 0, b: 0, h: 0, c: 60, d: 0 }, 60));
//   return results;
// }

// function opt_t(status: Status, t: number): CulcResult {
//   const epps = 1;
//   let epp = 1;
//   let da = 100;
//   let db = 50;
//   let di: OptSt = { a: 0, b: 0, h: 0, c: 0, d: 0 };
//   let x: OptSt = { a: 0, b: 0, h: 0, c: 0, d: 0 };
//   for (let i = 0; i < 1000; i++) {
//     //Math.abs((db - da) / da) > 1e-4
//     epp = epps;
//     di = diff(status, x);
//     x.a += epp * di.a;
//     x.b += epp * di.b;
//     x.h += epp * di.h;
//     x.c += epp * di.c;
//     x.d += epp * di.d;
//     x = cons(status, x, t);
//     db = da;
//     da = Math.abs(di.a) + Math.abs(di.b) + Math.abs(di.h) + Math.abs(di.c) + Math.abs(di.d);
//     if (i > 10000) break;
//   }
//   const newstatus = cloneDeep(status);
//   newstatus.a += x.a;
//   newstatus.b += x.b;
//   newstatus.h += x.h;
//   newstatus.c += x.c;
//   newstatus.d += x.d;
//   const result: CulcResult = {
//     t,
//     a: Math.round(10 * newstatus.a) / 10,
//     b: Math.round(10 * newstatus.b) / 10,
//     h: Math.round(10 * newstatus.h) / 10,
//     c: Math.round(10 * newstatus.c) / 10,
//     d: Math.round(10 * newstatus.d) / 10,
//     expecteddamage: Math.round(10 * expected_damage(newstatus)) / 10,
//     expected_max_damage: Math.round(10 * expected_max_damage(newstatus)) / 10,
//     maxdamage: Math.round(10 * max_damage(newstatus)) / 10,
//     mindamage: Math.round(10 * min_damage(newstatus)) / 10,
//   };
//   return result;
// }

// function diff(status: Status, x: OptSt): OptSt {
//   const diff = { a: 0, b: 0, h: 0, c: 0, d: 0 };
//   const h = 0.0001;
//   const newstatus = cloneDeep(status);
//   newstatus.a += x.a;
//   newstatus.b += x.b;
//   newstatus.h += x.h;
//   newstatus.c += x.c;
//   newstatus.d += x.d;
//   diff.a =
//     (expected_max_damage_opt({ ...newstatus, a: newstatus.a + h }) -
//       expected_max_damage_opt({ ...newstatus, a: newstatus.a - h })) /
//     (2 * h);
//   diff.b =
//     (expected_max_damage_opt({ ...newstatus, b: newstatus.b + h }) -
//       expected_max_damage_opt({ ...newstatus, b: newstatus.b - h })) /
//     (2 * h);
//   diff.h =
//     (expected_max_damage_opt({ ...newstatus, h: newstatus.h + h }) -
//       expected_max_damage_opt({ ...newstatus, h: newstatus.h - h })) /
//     (2 * h);
//   diff.c =
//     (expected_max_damage_opt({ ...newstatus, c: newstatus.c + h }) -
//       expected_max_damage_opt({ ...newstatus, c: newstatus.c - h })) /
//     (2 * h);
//   diff.d =
//     (expected_max_damage_opt({ ...newstatus, d: newstatus.d + h }) -
//       expected_max_damage_opt({ ...newstatus, d: newstatus.d - h })) /
//     (2 * h);
//   return diff;
// }

// function expected_max_damage_opt(status: Status): number {
//   const A = status.ab * (1 + status.a / 100) + status.ac;
//   const B = status.bb * (1 + status.b / 100) + status.bc;
//   const HP = status.hb * (1 + status.h / 100) + status.hc;
//   const ABHP =
//     (A * status.ar) / 100 + (B * status.br) / 100 + (HP * (status.hr + status.ahs)) / 100;
//   let critical: number;
//   if (status.c >= 100) {
//     critical = 1 + status.d / 100;
//   } else {
//     critical = 1 + (status.d / 100) * (((1 - status.r / 100) * status.c) / 100 + status.r / 100);
//   }

//   return ABHP * critical;
// }

// function expected_max_damage(status: Status): number {
//   const A = status.ab * (1 + status.a / 100) + status.ac;
//   const B = status.bb * (1 + status.b / 100) + status.bc;
//   const HP = status.hb * (1 + status.h / 100) + status.hc;
//   const ABHP =
//     (A * status.ar) / 100 + (B * status.br) / 100 + (HP * (status.hr + status.ahs)) / 100;
//   let critical: number;
//   if (status.c >= 100) {
//     critical = 1 + status.d / 100;
//   } else {
//     critical = 1 + (status.d / 100) * (((1 - status.r / 100) * status.c) / 100 + status.r / 100);
//   }
//   const element = 1 + status.e / 100;

//   let emselect: number;
//   if (Math.abs(status.ema - 1) <= 0.05) {
//     emselect = 1;
//   } else {
//     emselect = 1 + (status.select / 100) * ((1 + status.el) * status.ema - 1);
//   }

//   return ABHP * critical * element * emselect;
// }

// function max_damage(status: Status): number {
//   const A = status.ab * (1 + status.a / 100) + status.ac;
//   const B = status.bb * (1 + status.b / 100) + status.bc;
//   const HP = status.hb * (1 + status.h / 100) + status.hc;
//   const ABHP =
//     (A * status.ar) / 100 + (B * status.br) / 100 + (HP * (status.hr + status.ahs)) / 100;
//   const critical = 1 + status.d / 100;
//   const element = 1 + status.e / 100;

//   let emselect: number;
//   if (Math.abs(status.ema - 1) <= 0.05) {
//     emselect = 1;
//   } else {
//     emselect = 1 + (status.select / 100) * ((1 + status.el) * status.ema - 1);
//   }

//   const TOTAL = ABHP * critical * element * emselect;
//   return TOTAL;
// }

// function min_damage(status: Status): number {
//   const A = status.ab * (1 + status.a / 100) + status.ac;
//   const B = status.bb * (1 + status.b / 100) + status.bc;
//   const HP = status.hb * (1 + status.h / 100) + status.hc;
//   const ABHP =
//     (A * status.ar) / 100 + (B * status.br) / 100 + (HP * (status.hr + status.ahs)) / 100;
//   const critical = 1;
//   const element = 1 + status.e / 100;

//   let emselect: number;
//   if (Math.abs(status.ema - 1) <= 0.05) {
//     emselect = 1;
//   } else {
//     emselect = 1 + (status.select / 100) * ((1 + status.el) * status.ema - 1);
//   }

//   const TOTAL = ABHP * critical * element * emselect;
//   return TOTAL;
// }

// function expected_damage(status: Status): number {
//   const A = status.ab * (1 + status.a / 100) + status.ac;
//   const B = status.bb * (1 + status.b / 100) + status.bc;
//   const HP = status.hb * (1 + status.h / 100) + status.hc;
//   const ABHP =
//     (A * status.ar) / 100 + (B * status.br) / 100 + (HP * (status.hr + status.ahs)) / 100;
//   let critical: number;
//   if (status.c >= 100) {
//     critical = 1 + status.d / 100;
//   } else {
//     critical = 1 + ((status.d / 100) * status.c) / 100;
//   }
//   const element = 1 + status.e / 100;

//   let emselect: number;
//   if (Math.abs(status.ema - 1) <= 0.05) {
//     emselect = 1;
//   } else {
//     emselect = 1 + (status.select / 100) * ((1 + status.el) * status.ema - 1);
//   }

//   const TOTAL = ABHP * critical * element * emselect;
//   return TOTAL;
// }

// function cons(status: Status, x: OptSt, t: number): OptSt {
//   const y = cloneDeep(x);
//   const tproj = (): void => {
//     const p =
//       (t - y.a / 1.5 - y.b / 1.8 - y.h / 1.5 - y.c - y.d / 2) /
//       (1 / (1.5 * 1.5) + 1 / (1.8 * 1.8) + 1 / (1.5 * 1.5) + 1 + 1 / 4);
//     y.a += p / 1.5;
//     y.b += p / 1.8;
//     y.h += p / 1.5;
//     y.c += p;
//     y.d += p / 2;
//   };
//   const nproj = () => {
//     if (y.a < 0) y.a = 0;
//     if (y.b < 0) y.b = 0;
//     if (y.h < 0) y.h = 0;
//     if (y.c < 0) y.c = 0;
//     if (y.c + status.c > 100) {
//       y.c = 100 - status.c;
//     }
//     if (y.d < 0) y.d = 0;
//   };
//   for (let i = 0; i < 50; i++) {
//     tproj();
//     nproj();
//   }
//   return y;
// }

// type OptSt = {
//   a: number;
//   b: number;
//   h: number;
//   c: number;
//   d: number;
// };
