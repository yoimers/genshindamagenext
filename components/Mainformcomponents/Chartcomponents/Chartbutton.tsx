import React from 'react';

export default function Chartbutton({ id, statbutton, onClick }) {
  return (
    <button
      className="border h-12 rounded-lg text-blue-100 hover:bg-red-700 hover:text-red-100"
      onClick={() => onClick(id.toString())}
    >
      {statbutton.culcname.toString()}
    </button>
  );
}
