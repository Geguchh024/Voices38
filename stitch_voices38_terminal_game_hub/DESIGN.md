---
name: Terminal Void
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1b1b1b'
  surface-container: '#1f1f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#c4c7c8'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#303030'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c6c6c7'
  primary: '#ffffff'
  on-primary: '#2f3131'
  primary-container: '#e2e2e2'
  on-primary-container: '#636565'
  inverse-primary: '#5d5f5f'
  secondary: '#c6c6c7'
  on-secondary: '#2f3131'
  secondary-container: '#454747'
  on-secondary-container: '#b4b5b5'
  tertiary: '#ffffff'
  on-tertiary: '#2f3131'
  tertiary-container: '#e2e2e2'
  on-tertiary-container: '#636565'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c7'
  on-primary-fixed: '#1a1c1c'
  on-primary-fixed-variant: '#454747'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#131313'
  on-background: '#e2e2e2'
  surface-variant: '#353535'
typography:
  display-xl:
    fontFamily: JetBrains Mono
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.05em
  headline-lg:
    fontFamily: JetBrains Mono
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: JetBrains Mono
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  body-lg:
    fontFamily: JetBrains Mono
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.1em
  headline-lg-mobile:
    fontFamily: JetBrains Mono
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
spacing:
  unit: 8px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 40px
  container-max: 1024px
---

## Brand & Style

This design system is rooted in the **Retro-Terminal / Cracktro** aesthetic. It evokes the raw, underground energy of 90s software subcultures—specifically the "warez" scene and BBS interfaces. The brand personality is unapologetically technical, functional, and minimalist, prioritizing information density and high-contrast legibility over modern flourishes.

The visual mood is defined by a "black-box" philosophy. It utilizes an intentionally "unrefined" brutalist structure where alignment is dictated by character-grid logic rather than fluid pixels. Expect heavy use of ASCII-inspired dividers, monospaced typography, and a deliberate lack of depth or softness. This is a digital-first environment that celebrates the beauty of raw data and command-line heritage.

## Colors

The palette is strictly **Monochrome binary**. There are no shades of gray, no gradients, and no accent colors. 

- **Primary Canvas:** Pure Black (#000000). This provides the "void" that defines the terminal experience.
- **Ink / Elements:** Pure White (#FFFFFF). Every line, character, and border is rendered at 100% opacity to ensure maximum contrast and "burn-in" intensity.
- **Logic:** Interactive states (hover, focus) are handled via color inversion (background becomes White, text becomes Black) rather than introducing new hues.

## Typography

The design system exclusively utilizes **JetBrains Mono** to maintain a consistent technical rhythm. The typography follows a strict grid-based vertical rhythm.

- **Headlines:** Large headers should mimic ASCII art style where possible, or use heavy weights with tight tracking to simulate blocky, low-resolution raster fonts.
- **Data Display:** Labels and metadata are always uppercase to create a "log file" feel.
- **System Text:** Body text uses standard weights with generous line height to maintain readability against the high-contrast background. 
- **Scanning:** Underline or highlight text sparingly to indicate links or critical status updates.

## Layout & Spacing

The layout philosophy follows a **Fixed-Grid Terminal** model. The interface is designed as if it exists within a fixed 80-character width container, centered on the screen.

- **The Grid:** A 12-column grid is used, but elements should ideally snap to 8px increments (the "char-block"). 
- **Margins:** Desktop views feature significant lateral "dead space" (black bars) to focus the eye on the central terminal window. Mobile views use a tight 16px margin.
- **Vertical Rhythm:** Content is separated by "block breaks" (doubled spacing units) or horizontal ASCII rules (e.g., `-------------------`). 
- **Adaptation:** On mobile, complex side-by-side terminal windows reflow into a single-column vertical feed.

## Elevation & Depth

There is zero Z-axis depth in this design system. Depth is communicated solely through **Visual Nesting** and **Borders**.

- **Flat Stack:** Everything exists on the same plane. To "elevate" a window, it is wrapped in a 1px or 2px white border.
- **Scanning Effects:** A global "scanline" overlay—a subtle pattern of horizontal lines—is applied to the entire viewport at 5-10% opacity to simulate a CRT monitor.
- **Focus:** No shadows are used. If an element is active or "on top," it uses a solid white background with black text to stand out from the black canvas.

## Shapes

The shape language is **Strictly Square (0px radius)**. 

- **Corners:** Every button, input, and container must have sharp 90-degree corners. 
- **Dividers:** Use character-based separators. Instead of a standard CSS border, consider using repeated characters like `=` or `+` at junction points to reinforce the CLI aesthetic.
- **Selection:** Use block-cursors (solid white squares) for text entry indicators.

## Components

- **Buttons:** Rendered as solid white blocks with black text. On hover, they invert to black background with a white 1px border.
- **Terminal Windows:** Containers featuring a top bar with a title (e.g., `[ FILE_MANAGER.EXE ]`) and a 1px white border.
- **Inputs:** Prefixed with a command prompt `>` followed by a blinking block cursor.
- **Chips / Tags:** Enclosed in brackets, like `[ STATUS: OK ]` or `< RELEASE >`.
- **Progress Bars:** Created using block characters, e.g., `[████████░░░░] 60%`.
- **ASCII Art:** Use for primary branding and section headers to replicate the "voices38" reference header.
- **Lists:** Unordered lists use hyphens `-` or arrows `->` as bullets.