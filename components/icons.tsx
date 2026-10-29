import React from "react";

export function SearchIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export function HeartIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export function BagIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

export function ArrowRightIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export function StarIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="#DFC07A"
      stroke="#DFC07A"
      strokeWidth="1"
      aria-hidden="true"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export function LeafIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      stroke="#DFC07A"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Outer elegant stylized leaf outline matching reference */}
      <path d="M6 26C6 26 7 17 14 10C21 3 26 6 26 6C26 6 29 15 22 22C15 29 6 26 6 26Z" />
      <path d="M6 26C11 21 16 16 22 10" />
      <path d="M14 18L18 20" />
      <path d="M17 14L21 15" />
    </svg>
  );
}

export function CommunityIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      stroke="#DFC07A"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Main user silhouette */}
      <circle cx="16" cy="11" r="4.5" />
      <path d="M8 25C8 20.5 11.5 18 16 18C20.5 18 24 20.5 24 25" />
      {/* Secondary companion silhouette */}
      <circle cx="23.5" cy="10" r="3.5" />
      <path d="M24 18C26 18.5 28 20 28 23" />
      <circle cx="8.5" cy="10" r="3.5" />
      <path d="M8 18C6 18.5 4 20 4 23" />
    </svg>
  );
}

export function ClockIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      stroke="#DFC07A"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="12" />
      {/* Clock hands at 10:10 */}
      <polyline points="16 16 11 11" strokeWidth="2" strokeLinecap="round" />
      <polyline points="16 16 16 9" strokeWidth="1.75" strokeLinecap="round" />
      {/* Hour tick marks */}
      <line x1="16" y1="5.5" x2="16" y2="7" />
      <line x1="16" y1="25" x2="16" y2="26.5" />
      <line x1="5.5" y1="16" x2="7" y2="16" />
      <line x1="25" y1="16" x2="26.5" y2="16" />
    </svg>
  );
}
