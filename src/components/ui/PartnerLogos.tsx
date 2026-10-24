import React from "react";

export function MicrosoftLogo({ className = "h-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 180 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Microsoft Logo"
    >
      <g transform="translate(10, 11)">
        <rect x="0" y="0" width="13" height="13" fill="#F25022" />
        <rect x="15" y="0" width="13" height="13" fill="#7FBA00" />
        <rect x="0" y="15" width="13" height="13" fill="#00A4EF" />
        <rect x="15" y="15" width="13" height="13" fill="#FFB900" />
      </g>
      <text
        x="48"
        y="32"
        fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
        fontSize="21"
        fontWeight="600"
        fill="#FFFFFF"
        letterSpacing="-0.3"
      >
        Microsoft
      </text>
    </svg>
  );
}

export function AppleLogo({ className = "h-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 160 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Apple Logo"
    >
      <g transform="translate(10, 8)">
        <path
          fill="#FFFFFF"
          d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.77 1.06-1.85.94-2.93-.93.04-2.03.62-2.68 1.39-.58.67-1.09 1.77-.95 2.82 1.03.08 2.07-.53 2.69-1.28z"
          transform="scale(1.25)"
        />
      </g>
      <text
        x="48"
        y="32"
        fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
        fontSize="22"
        fontWeight="500"
        fill="#FFFFFF"
        letterSpacing="-0.2"
      >
        Apple
      </text>
    </svg>
  );
}

export function SedusLogo({ className = "h-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 170 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Sedus Logo"
    >
      <g transform="translate(10, 9)">
        <circle cx="16" cy="16" r="14" fill="none" stroke="#FFFFFF" strokeWidth="3" />
        <circle cx="16" cy="16" r="6" fill="#00A4EF" />
        <text
          x="42"
          y="24"
          fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
          fontSize="23"
          fontWeight="700"
          fill="#FFFFFF"
          letterSpacing="2"
        >
          sedus
        </text>
      </g>
    </svg>
  );
}

export function IkeaLogo({ className = "h-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 160 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="IKEA Logo"
    >
      <g transform="translate(15, 6)">
        <rect width="130" height="38" fill="#0058A3" rx="4" />
        <ellipse cx="65" cy="19" rx="58" ry="16" fill="#FFDA1A" />
        <text
          x="65"
          y="26"
          fontFamily="Arial Black, Impact, 'Trebuchet MS', sans-serif"
          fontSize="20"
          fontWeight="900"
          fill="#0058A3"
          textAnchor="middle"
          letterSpacing="1"
        >
          IKEA
        </text>
      </g>
    </svg>
  );
}
