import React from 'react';
import { TreeIcon } from "./TreeIcon";
import { LatticeIcon } from "./LatticeIcon";

export const Logo = () => (
  <div className="flex items-center gap-2 select-none cursor-default">
    <div className="flex -space-x-1">
        <TreeIcon />
        <LatticeIcon />
    </div>
    <span className="text-lg tracking-tight font-semibold text-neutral-200">
      OswegoLabs
    </span>
  </div>
);