---
name: Enterprise Precision
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#434655'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#525657'
  on-tertiary: '#ffffff'
  tertiary-container: '#6b6e70'
  on-tertiary-container: '#eff1f3'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#e0e3e5'
  tertiary-fixed-dim: '#c4c7c9'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#444749'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  h1:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.02em
  h2:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.02em
  h3:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: '0'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: '0'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style
The design system is engineered for the modern enterprise workforce, prioritizing clarity, efficiency, and professional trust. It adopts a **Modern Corporate** aesthetic with a heavy emphasis on **Minimalism**. The brand personality is authoritative yet approachable, functioning as a silent facilitator for complex HR workflows.

The visual language is characterized by:
- **Purposeful Whitespace:** Utilizing negative space to reduce cognitive load in data-heavy environments.
- **Precision Engineering:** Sharp alignment and consistent rhythmic spacing that mirrors the reliability of the underlying data.
- **Subtle Sophistication:** Eschewing loud gradients for refined micro-interactions and high-fidelity typography.

## Colors
The palette is rooted in a high-contrast foundation of Slate Grays and a vibrant Primary Blue. 

- **Primary Blue (#2563EB):** Reserved for primary actions, active states, and critical progress indicators.
- **Slate Scale:** Used to establish hierarchy. Slate-900 is reserved for primary headings; Slate-500/600 for body and secondary text; Slate-100/200 for borders and subtle backgrounds.
- **Functional Colors:** Success (Emerald), Warning (Amber), and Error (Rose) should be used sparingly, following the same saturation levels as the primary blue to ensure a cohesive look.

## Typography
Inter is the sole typeface for this design system, chosen for its exceptional legibility in digital interfaces and technical neutrality.

- **Tracking:** Use slight negative letter-spacing for headlines (h1-h3) to create a "tighter" premium feel.
- **Weights:** Use Semi-Bold (600) for titles and Medium (500) for interactive labels. Regular (400) is the standard for all body copy.
- **Hierarchy:** Rely on color shifts (Slate-900 to Slate-500) rather than drastic size changes to indicate importance.

## Layout & Spacing
The layout system follows a **Fixed-Fluid Hybrid Grid**. Dashboards use a 12-column system with a maximum container width of 1280px to maintain readability on ultra-wide monitors.

- **The 4px Rule:** All spacing increments must be multiples of 4px to ensure a consistent vertical rhythm.
- **Density:** Provide "Comfortable" (24px) padding for standard views and "Compact" (12px) padding for data-heavy tables or sidebars.
- **Margins:** Page headers and primary content blocks should maintain a 24px or 32px margin to reinforce the feeling of "premium" white space.

## Elevation & Depth
This design system uses **Ambient Shadows** and **Tonal Layers** to create a sense of depth without looking dated.

- **Layering:** Use Slate-50 for the primary background and Pure White (#FFFFFF) for cards and interactive containers. This subtle contrast defines the workspace.
- **Shadows:** Shadows should be highly diffused and low-opacity.
  - *Level 1 (Cards):* `0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)`
  - *Level 2 (Dropdowns/Modals):* `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)`
- **Borders:** Use soft 1px borders in Slate-200 for most containers. For active states, transition the border to Primary Blue.

## Shapes
The shape language is defined as **Soft**, utilizing moderate rounding to balance professional rigidity with a modern SaaS feel.

- **Standard Elements:** Buttons, input fields, and small cards use a 0.25rem (4px) radius.
- **Large Containers:** Dashboard widgets and modals use a 0.5rem (8px) radius.
- **Strictness:** Avoid full pills or circles unless used for avatars or status "dots." The intention is to feel structured and architectural.

## Components
Consistent implementation of components ensures the "Linear-style" premium finish.

- **Buttons:** 
  - *Primary:* Solid Primary Blue, white text, subtle inner top shadow for a "pressed" feel.
  - *Secondary:* White background, Slate-200 border, Slate-700 text.
- **Input Fields:** Use Slate-50 for background color when inactive to make them feel "recessed," switching to white with a Blue border on focus.
- **Cards:** White background, Level 1 shadow, and a subtle Slate-200 border. No header backgrounds; use typography (h3) to define sections.
- **Chips/Badges:** Use a light tint of the status color (e.g., Blue-50) with high-contrast text (Blue-700). Keep corners slightly more rounded than buttons.
- **Data Tables:** Remove vertical borders. Use 1px Slate-100 horizontal dividers only. Header row should be Slate-50 with Medium weight Slate-500 labels.
- **Additional Components:** Include a "Global Command Bar" (CMD+K) and "Contextual Side Panels" for rapid employee profile edits, maintaining the focus on high-speed HR productivity.