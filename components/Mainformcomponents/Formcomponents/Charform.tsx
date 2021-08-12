import React, { useState } from "react";
import Delete from "./Delete";
import Inputform from "./Inputform";
import Inputname from "./Inputname";

export default function Charform({ children, g, onDelete, dispatch}: any) {
  return (
    <div className={`ml-${2*g}`}>
      <div className="h-40 border border-red-400 rounded-md">
        <div className="flex justify-between">
          <Inputname />
          <Delete onDelete={onDelete}/>
        </div>
        <div className="m-2 grid grid-cols-6 h-30">
          <Inputform label={["a"]}/>
          <Inputform label={["a", "b"]}/>
          <Inputform label={["a", "b"]}/>
          <Inputform label={["a", "b"]}/>
          <Inputform label={["a", "b"]}/>
          <Inputform label={["a", "b"]}/>
          <Inputform label={["a", "b"]}/>
          <Inputform label={["a", "b"]}/>
          <Inputform label={["a", "b"]}/>
          <Inputform label={["a", "b"]}/>
          <Inputform label={["a", "b"]}/>
          <Inputform label={["a", "b"]}/>
        </div>
      </div>
      {children}
    </div>
  );
}
