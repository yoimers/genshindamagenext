import React from 'react';

export default function Chartbutton({ id, statbutton, onClick, chart }) {
  let m = 'border-green-700';
  if (chart.id === id) {
    m = 'border-green-200';
  }
  return (
    <button
      className={`border h-12 ${m} text-textcolor rounded-md shadow hover:opacity-60 transition duration-100`}
      onClick={() => onClick(id.toString())}
    >
      {statbutton.culcname || 'NoName'}
    </button>
  );
}
