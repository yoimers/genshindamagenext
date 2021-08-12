import React from "react";
import Image from "next/image";

interface ButtonData {
  text: string;
  img: string;
  type: "character" | "artifact" | "weapon" | "culc";
}

export default function SideButton({ text, img, type }: ButtonData) {
  let c: string;
  let m: string = "mt-1";
  switch (type) {
    case "character":
      c = "border-red-400";
      break;
    case "artifact":
      c = "border-yellow-500";
      break;
    case "weapon":
      c = "border-blue-300";
      break;
    case "culc":
      c = "border-green-400";
      m = "mt-6";
      break;
  }
  return (
    <div
      className={`m-1 ${m} border ${c} relative rounded-md shadow hover:opacity-50 transition duration-100`}
    >
      <div className="flex flex-row-reverse opacity-20">
        <Image src={img} width={100} height={100} alt="Picture of the author" />
      </div>
      <p className="block h-full w-full text-center absolute top-1/3 left-0 self-center text-3xl text-textcolor">
        {text}
      </p>
    </div>
  );
}
