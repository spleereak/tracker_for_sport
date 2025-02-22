import React from 'react';
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  path: string;
  className?: string;
}

export const LinkButton: React.FC<Props> = ({ path }) => {
  return (
    <Link
      to={path}
    >
      <button
        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:bg-gradient-r hover:from-blue-600 hover:to-purple-700 text-white px-2 py-2 rounded-xl flex items-center transition-colors cursor-pointer"
      >
        <Plus size={20} /> Добавить
      </button>
    </Link>
  );
}