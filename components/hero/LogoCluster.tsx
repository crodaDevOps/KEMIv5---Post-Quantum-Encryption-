import React from 'react';
import { motion } from "framer-motion";

export default function LogoCluster() {
  const svgProps = {
    width: 52,
    height: 52,
  };

  const treeSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#1E4D38" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
<circle cx="9" cy="9" r="3" fill="#2F6D4F" opacity="0.2"/>
<circle cx="15" cy="9" r="3" fill="#2F6D4F" opacity="0.2"/>
<circle cx="12" cy="6" r="3" fill="#2F6D4F" opacity="0.2"/>
<path d="M12 12v6" />
<path d="M10 18h4" stroke="#9A6232"/>
<circle cx="9" cy="9" r="0.7" fill="#fff"/>
<circle cx="15" cy="9" r="0.7" fill="#fff"/>
<circle cx="12" cy="6" r="0.7" fill="#fff"/>
</svg>
`;

  const flaskSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0E1A2E" stroke-width="1.5">
<path d="M9 3h6" />
<path d="M10 3v4l-4 7a5 5 0 0 0 4.4 7h3.2A5 5 0 0 0 18 14l-4-7V3" />
<g stroke="#2D6B9F">
<circle cx="12" cy="13" r="3.5"/>
<path d="M8.5 13h7M12 9.5v7" />
<circle cx="12" cy="9.5" r="0.6" fill="#3CC9DD"/>
<circle cx="8.5" cy="13" r="0.6" fill="#3CC9DD"/>
<circle cx="15.5" cy="13" r="0.6" fill="#3CC9DD"/>
<circle cx="12" cy="16.5" r="0.6" fill="#3CC9DD"/>
</g>
</svg>
`;

  const latticeSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0E1A2E" stroke-width="1.5">
<circle cx="12" cy="12" r="8" />
<g stroke="#2D6B9F">
<path d="M6 12h12M12 6v12M8 8l8 8M16 8l-8 8"/>
</g>
<g>
<circle cx="12" cy="12" r="0.7" fill="#3CC9DD"/>
<circle cx="8" cy="8" r="0.7" fill="#3CC9DD"/>
<circle cx="16" cy="8" r="0.7" fill="#3CC9DD"/>
<circle cx="8" cy="16" r="0.7" fill="#3CC9DD"/>
<circle cx="16" cy="16" r="0.7" fill="#3CC9DD"/>
</g>
</svg>
`;

  return (
    <div className="relative w-[180px] h-[140px]">
      {/* Tree */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="absolute left-0 top-[30%]"
        dangerouslySetInnerHTML={{ __html: treeSvg }}
        {...svgProps}
      />

      {/* Flask */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1.2 }}
        className="absolute left-[40%] top-0"
        dangerouslySetInnerHTML={{ __html: flaskSvg }}
        {...svgProps}
      />

      {/* Lattice */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1.2 }}
        className="absolute left-[65%] top-[40%]"
        dangerouslySetInnerHTML={{ __html: latticeSvg }}
        {...svgProps}
      />
    </div>
  );
}