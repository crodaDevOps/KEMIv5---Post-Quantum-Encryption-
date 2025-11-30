import React from 'react';

export const Card = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="border border-charcoalAlt p-6 bg-charcoalAlt hover:border-neutral-700 transition-colors duration-300">
    <h4 className="text-base font-semibold mb-3 text-coral uppercase tracking-wide text-xs">{title}</h4>
    <p className="text-sm leading-relaxed text-neutral-300">{children}</p>
  </div>
);