export type Action = {
  action: 'username' | 'content' | 'submit';
  value: string;
};
export type State = {
  username: string;
  content: string;
};
