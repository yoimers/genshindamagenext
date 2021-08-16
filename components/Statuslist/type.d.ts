export type StatusName = {
  name: string;
  a: string;
  ab: string;
  ac: string;
  b: string;
  bc: string;
  bb: string;
  c: string;
  d: string;
  e: string;
  h: string;
  hc: string;
  hb: string;
  em: string;
  ema: string;
  ea: string;
  el: string; //熟知倍率
  ar: string;
  hr: string; //A変換比率
  br: string;
  ahs: string; //スキル
  s: string;
  r: string;
  select: string;
};
export type Label =
  | 'name'
  | 'a'
  | 'ab'
  | 'ac'
  | 'b'
  | 'bc'
  | 'bb'
  | 'c'
  | 'd'
  | 'e'
  | 'h'
  | 'hc'
  | 'hb'
  | 'em'
  | 'ema'
  | 'ea'
  | 'el'
  | 'ar'
  | 'hr'
  | 'br'
  | 'ahs'
  | 's'
  | 'r'
  | 'select'
  | 'n';
export type CharArtWepFormState = { [chilid: string]: { name: Label; value: string | number } };
export type AllFormState = { [id: string]: CharArtWepFormState };

interface CreateChangeCharArtWepAction {
  action: 'createchangecharartwepaction';
  id: string;
  childid: string;
  name?: Label;
  value?: string;
  add?: number;
}
interface InitChangeCharArtWepAction {
  action: 'initchangecharartwepaction';
  id: string;
  childid: string;
  name: Label;
  value: number | string;
}
interface DeleteChangeCharArtWepAction {
  action: 'deletecharartwepaction';
  id: string;
}
interface LoadSetCharArtWepAction {
  action: 'loadsetcharartwepaction';
  status: AllFormState;
}
interface CopyCharArtWepAction {
  action: 'copycharartwepaction';
  fromid: string;
  toid: string;
}
export type CharArtWepAction =
  | CreateChangeCharArtWepAction
  | InitChangeCharArtWepAction
  | DeleteChangeCharArtWepAction
  | LoadSetCharArtWepAction
  | CopyCharArtWepAction;

export type Status = {
  name: string;
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
  id: string;
  type: Equip;
  children: {
    id: string;
    type: Equip;
    children: TypeSubTree[];
  }[];
};

interface TypeSubTree {
  id: string;
  type: Equip;
}
export type Equip = 'char' | 'wep' | 'art';

interface CreateNode {
  action: 'createNode';
  id: string;
  type: Equip;
  status?: Status;
}
interface DeleteNode {
  action: 'deleteNode';
  id: string;
}
interface InitNode {
  action: 'initNode';
  tree: TypeTree[];
}
interface SiblingNode {
  action: 'siblingNode';
  id: string;
  type: Equip;
  status?: Status;
}
export type Action = CreateNode | DeleteNode | InitNode | SiblingNode;

interface CreateStateNode {
  action: 'createStatNode';
  id: string;
  status: Status;
}
interface DeleteStateNode {
  action: 'deleteStatNode';
  id: string;
}
export type StatAction = CreateStateNode | DeleteStateNode;

interface Button {
  type: 'plus' | 'minus';
  id: string;
  childid: string;
  add: number;
}

interface InputForm {
  label: {
    [key: Label]: number;
  };
  id: string;
  childid: string;
}
export type StatButtons = {
  [id: string]: Culc;
};
export type Culc = {
  culcname: string;
  culctype: 'opt' | 'compare';
  culcresult: false | CulcResults; //false
  status?: Status;
};
export type CulcResults = CulcResult[];

export type CulcResult = {
  t: number;
  a: number;
  c: number;
  d: number;
  b: number;
  h: number;
  expecteddamage: number;
  expected_max_damage: number;
  maxdamage: number;
  mindamage: number;
};

export type Chart = {
  id: string | false;
};
