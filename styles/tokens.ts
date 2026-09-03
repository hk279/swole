/**
 * Design tokens for use from TypeScript (inline styles, component props).
 *
 * These previously lived in `spaces.module.scss` / `colors.module.scss` and were
 * read through the ICSS `:export` convention. Turbopack's CSS pipeline does not
 * support `:export`, so those imports silently resolved to `undefined`.
 *
 * Keep these values in sync with `styles/variables.scss`, which remains the
 * source of truth for stylesheets.
 */

export const spaces = {
  small: "4px",
  medium: "8px",
  large: "12px",
  xlarge: "16px",
  xxlarge: "24px",
} as const;

export const colors = {
  colorPrimary: "#096dd9",
  colorWarning: "#d4b106",
  colorError: "#cf1322",
  colorSuccess: "#389e0d",
  colorGray: "#cacaca",
  colorLightGray: "#EFEFEF",
  colorLightBlue: "#E8F0FE",
} as const;

export const breakpoints = {
  medium: 800,
  large: 1200,
} as const;
