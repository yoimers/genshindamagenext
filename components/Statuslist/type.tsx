import { Status } from "./status";

export type TypeTree = {
  id: String;
  type: Equip;
  state: Status;
  children: {
    id: String;
    type: Equip;
    state: Status;
    children: TypeSubTree[];
  }[];
};

interface TypeSubTree {
  id: String;
  type: Equip;
  state: Status;
}
export type Equip = "char" | "wep" | "art";

interface CreateNode {
  action: "createNode";
  id: String;
  type: Equip;
}
interface DeleteNode {
  action: "deleteNode";
  id: String;
}
export type Action = CreateNode | DeleteNode;
