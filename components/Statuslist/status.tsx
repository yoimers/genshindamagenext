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
