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
export type Label = 'name' | 'a' | 'ab' | 'ac' | 'b' | 'bc' | 'bb' | 'c' | 'd' | 'e' | 'h' | 'hc' | 'hb' | 'em' | 'ema' | 'ea' | 'el' | 'ar' | 'hr' | 'br' | 'ahs' | 's' | 'r' | 'select' | 'n';

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

export type TypeTree = {
  id: String;
  type: Equip;
  children: {
    id: String;
    type: Equip;
    children: TypeSubTree[];
  }[];
};

interface TypeSubTree {
  id: String;
  type: Equip;
}
export type Equip = 'char' | 'wep' | 'art';

interface CreateNode {
  action: 'createNode';
  id: String;
  type: Equip;
}
interface DeleteNode {
  action: 'deleteNode';
  id: String;
}
interface ChangeNodeButton {
  action: 'changeNode_button';
  id: String;
  add: number;
  name: Label;
}
interface ChangeNodeInput {
  action: 'changeNode_input';
  id: String;
  value: number;
  name: Label;
}
export type Action = CreateNode | DeleteNode | ChangeNodeButton | ChangeNodeInput;

interface Button {
  type: 'plus' | 'minus';
  onClick: () => void;
}

interface InputForm {
  label: Label[];
  id: String;
}
