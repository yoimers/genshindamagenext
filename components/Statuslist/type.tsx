import { Status } from "./status";

export type TypeTree = {
  id: String;
  type: String;
  state: Status;
  children: {
    id: String;
    type: String;
    state: Status;
    children: TypeSubTree[];
  }[];
};

interface TypeSubTree {
  id: String;
  type: String;
  state: Status;
}
interface CreateNode {
  action: "createNode";
  id: String;
  type: "char" | "art" | "wap";
}
interface DeleteNode {
  action: "deleteNode";
  id: String;
}
export type Action = CreateNode | DeleteNode;
