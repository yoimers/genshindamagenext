import React from "react";
import SideButton from "./SideButton";

interface ButtonData {
  text: string;
  img: string;
  type: "character" | "artifact" | "weapon" | "culc";
}

const Buttondata: ButtonData[] = [
  {
    text: "キャラ追加",
    img: "/images/klee1.png",
    type: "character",
  },
  {
    text: "聖遺物追加",
    img: "/images/klee2.png",
    type: "artifact",
  },
  {
    text: "武器追加",
    img: "/images/klee3.png",
    type: "weapon",
  },
  {
    text: "計算",
    img: "/images/klee4.png",
    type: "culc",
  },
];
export default function Sidebar() {
  return (
    <aside className="w-48 h-side border border-gray-800 rounded-lg shadow-sm sticky top-8">
        {Buttondata.map((data) => {
          return (
            <SideButton
              key={data.text}
              text={data.text}
              img={data.img}
              type={data.type}
            />
          );
        })}
    </aside>
  );
}
