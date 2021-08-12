export type StatusName = {
  name: String;
  a: String;
  ab: String;
  ac: String;
  b: String;
  bc: String;
  bb: String;
  c: String;
  d: String;
  e: String;
  h: String;
  hc: String;
  hb: String;
  em: String;
  ema: String;
  ea: String;
  el: String; //熟知倍率
  ar: String;
  hr: String; //A変換比率
  br: String;
  ahs: String; //スキル
  s: String;
  r: String;
  select: String;
};
export type Status = {
  name: String;
  a: number;
  ab: number;
  ac: number;
  b: number;
  bc: number;
  bb: number;
  c: number;
  d: number;
  e: number;
  h: number;
  hc: number;
  hb: number;
  em: number;
  ema: number;
  ea: number;
  el: number; //熟知倍率
  ar: number;
  hr: number; //A変換比率
  br: number;
  ahs: number; //スキル
  s: number;
  r: number;
  select: number;
};
export const stat = {
  name: "名前",
  a: "A%",
  ab: "基礎A",
  ac: "固定A",
  b: "B%",
  bc: "固定B",
  bb: "基礎B",
  c: "会心率%",
  d: "会心ダメ%",
  e: "元素ダメ%",
  h: "HP%",
  hc: "固定HP",
  hb: "基礎HP",

  em: "熟知",
  ema: "反応倍率",
  ea: "反応倍率加算%",
  el: "熟知倍率", //熟知倍率
  ar: "レートA",
  hr: "HPのy%をAに変換", //A変換比率
  br: "レートB",
  ahs: "HPのx%をAに変換", //スキル
  s: "",
  r: "期待値-最大値比",
  select: "反応率",
  n: undefined,
};
export const st = {
  name: "init",
  a: 0,
  ab: 0,
  ac: 0,
  b: 0,
  bc: 0,
  bb: 0,
  c: 0,
  d: 0,
  e: 0,
  h: 0,
  hc: 0,
  hb: 0,
  em: 0,
  ema: 0,
  ea: 0,
  el: 0, //熟知倍率
  ar: 0,
  hr: 0, //A変換比率
  br: 0,
  ahs: 0, //スキル
  s: 0,
  r: 0,
  select: 0,
};
