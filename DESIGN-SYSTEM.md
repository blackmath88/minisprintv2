# Design System Specification: The Tactile Editorial

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Curated Canvas."** 

This system rejects the "SaaS-dashboard" aesthetic of dense grids and heavy borders. Instead, it draws inspiration from high-end editorial design and architectural minimalism. It is designed to feel like a premium physical workshop space—expansive, quiet, and intentional. By utilizing aggressive whitespace, sophisticated tonal layering, and an "Indigo-on-Cream" palette, we move away from generic utility toward a tool that feels like a strategic partner. 

The goal is to provide a "warm-sharp" experience: sharp in its precision and layout, but warm in its materiality and color temperature.

---

## 2. Colors & Materiality
The palette is rooted in a "Warm White" foundation to prevent the "cold blue" clinical feel of traditional tech tools.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections. Boundaries must be established through background color shifts. A `surface-container-low` section sitting on a `background` provides all the definition needed. If you feel the need for a line, increase your whitespace instead.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of fine paper. 
- **Base Layer:** `background` (#faf9f5) – The infinite table.
- **Sectional Layer:** `surface-container-low` (#f5f4f0) – Defines work areas.
- **Actionable Layer:** `surface-container-lowest` (#ffffff) – The "Active Sheet" or Card.
- **Elevated Layer:** `surface-bright` (#faf9f5) – For floating menus or critical overlays.

### The Glass & Gradient Rule
To ensure the "Indigo" accent feels integrated and premium, use `surface-tint` (#5148d7) with a 60% opacity and a `20px` backdrop-blur for floating navigation or modal backdrops. For main CTAs, use a subtle linear gradient from `primary` (#2a14b4) to `primary_container` (#4338ca) at a 135-degree angle to add depth and "soul."

---

## 3. Typography: The Editorial Voice
We use a dual-typeface system to balance character with extreme legibility.

- **The Voice (Display & Headlines):** **Plus Jakarta Sans**. Used for all `display` and `headline` tokens. Its wider apertures and modern geometric feel provide a "strategic" tone.
- **The Engine (Title, Body, Labels):** **Inter**. Used for all functional text. Inter’s tall x-height ensures that workshop notes and technical data remain legible even at small sizes.

### Hierarchy Highlights
- **Display-LG (3.5rem):** Set with `-0.04em` letter spacing. Use sparingly for hero moments.
- **Headline-SM (1.5rem):** The workhorse for section titles. 
- **Body-MD (0.875rem):** The standard for all user-generated content.
- **Label-SM (0.6875rem):** Always uppercase with `+0.05em` tracking for a "metadata" look.

---

## 4. Elevation & Depth: Tonal Layering
Traditional shadows are often a crutch for poor layout. In this system, depth is achieved through **Tonal Layering.**

- **The Layering Principle:** Place a card of `surface-container-lowest` (#ffffff) onto a background of `surface-container-low` (#f5f4f0). The contrast is enough to define the object without a single pixel of shadow.
- **Ambient Shadows:** When a "floating" effect is required (e.g., a dragging card), use an extra-diffused shadow: `0px 12px 32px rgba(27, 28, 26, 0.06)`. The shadow color is a tinted version of `on-surface`, never pure black.
- **The "Ghost Border" Fallback:** If a border is required for accessibility, use `outline-variant` (#c7c4d7) at **15% opacity**. It should be felt, not seen.
- **Glassmorphism:** Use `surface_container_lowest` at 80% opacity with a `12px` blur for utility bars to allow workshop content to peak through the interface.

---

## 5. Components & Primitive Styling

### Cards (The Workshop Unit)
Cards are the primary container. 
- **Style:** No borders. Background `surface-container-lowest`. 
- **Corner Radius:** `lg` (1rem) for main containers; `md` (0.75rem) for nested items.
- **Spacing:** Minimum `24px` internal padding. Never use dividers between card items; use `16px` of vertical whitespace.

### Buttons
- **Primary:** Gradient (`primary` to `primary_container`), white text, `full` (9999px) roundness. 
- **Secondary:** `surface-container-high` background with `on-surface` text.
- **Tertiary:** No background. `primary` text. `label-md` typography.

### Input Fields
- **Style:** Understated. Use `surface-container-highest` as a subtle background fill with a bottom-only `outline-variant` (20% opacity). 
- **Focus:** Transition the bottom border to `primary` (#2a14b4) at 2px thickness.

### Chips & Tags
- **Workshop Chips:** Use `secondary_container` with `on_secondary_container` text. 
- **Selection:** `lg` (1rem) roundedness to distinguish from buttons.

### Interactive "Canvas" Elements
- **Draggable Items:** When active, apply the **Ambient Shadow** and a subtle scale-up (1.02x).
- **Empty States:** Use `surface-dim` for illustrative icons to keep the focus on active content.

---

## 6. Do’s and Don’ts

### Do
- **Do** embrace asymmetrical layouts. A left-aligned headline with a wide right margin creates an editorial "breathing" space.
- **Do** use `primary_fixed` (#e3dfff) for highlighting text selections or "active" workshop regions.
- **Do** use the `full` (9999px) roundedness for elements that are meant to be touched/clicked (Buttons, Chips).

### Don't
- **Don't** use 1px dividers to separate list items. Use an `8px` gap and a subtle background hover state.
- **Don't** use high-contrast blacks (#000). Always use `on_surface` (#1b1c1a) for text to maintain the "warm" personality.
- **Don't** cram content. If a screen feels full, it is likely over-designed. Remove a container or increase the padding scale.
- **Don't** use standard "Drop Shadows." If the object isn't floating in the z-axis (like a modal), it shouldn't have a shadow. Use Tonal Layering instead.