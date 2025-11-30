import React from 'react';

export const Section = ({ children, className = "" }: { children?: React.ReactNode; className?: string }) => (
  <section className={`w-full max-w-5xl mx-auto px-6 py-12 md:py-20 ${className}`}>
    {children}
  </section>
);