import React, { useContext } from 'react';
import { StructureContext } from '../Main';

export default function Delete({ id, toggle }) {
  const { dispatch } = useContext(StructureContext);
  const onDelete = () => {
    toggle((prev) => !prev);
    setTimeout(() => {
      dispatch({ action: 'deleteNode', id });
    }, 400);
  };
  return (
    <button onClick={onDelete} className="m-2 mb-0 w-20 h-7 border border-red-800 text-red-800 text-center hover:text-red-50 hover:bg-red-600 transition duration-200">
      削除
    </button>
  );
}
