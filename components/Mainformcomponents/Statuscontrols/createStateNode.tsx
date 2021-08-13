import React from 'react';
import { Status } from '../../Statuslist/type';

export default function createStateNode(prevStatus: { id: String; status: Status }[], id: String, status?: Status) {
  return prevStatus;
}
