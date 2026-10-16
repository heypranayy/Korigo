# Korigo Snacks — Design System & Visual Specification

This document defines the exact visual system, design tokens, typography, color palette, component geometries, and responsive breakpoints extracted directly from the live Korigo Snacks website ([https://korigosnacks.com/](https://korigosnacks.com/)).

Per **Rule 1 (Absolute Source-of-Truth Rule)** and **Rule 32 (Visual Fidelity)**:
> *"The new frontend should visually resemble the existing website as closely as practical. Do not use arbitrary Tailwind defaults. Do not choose random colors. Extract the actual visual system from the current website."*

---

## 1. Color Palette

### Brand Core Colors
| Token | Hex Value | RGB | Usage / Semantics |
| :--- | :--- | :--- | :--- |
| `--accent-color` | `#148f2c` | `rgb(20, 143, 44)` | Primary Brand Green; Accent highlights, active tabs, icon accents |
| `--accent-color-darken` | `#0b4c17` | `rgb(11, 76, 23)` | Brand Green Hover State |
| `--heading-color` | `#000000` | `rgb(0, 0, 0)` | Primary Headings (H1–H6), bold editorial titles |
| `--text-color` | `#868686` | `rgb(134, 134, 134)` | Primary Body Text, muted descriptions, secondary navigation |
| `--primary-price-color` | `#010101` | `rgb(1, 1, 1)` | Active Product Price |
| `--sale-price-color` | `#fa0000` | `rgb(250, 0, 0)` | Discounted / Sale Price Highlight |
| `--secondary-price-color` | `#868686` | `rgb(134, 134, 134)` | Compare-at / Strikethrough Regular Price |
| `--t4s-body-background` | `#ffffff` | `rgb(255, 255, 255)` | Page Background |
| `--border-color` | `#e6e6e6` | `rgb(230, 230, 230)` | Card borders, dividers, tab borders |

### Functional & Interactive Colors
| Token | Hex Value | Usage |
| :--- | :--- | :--- |
| `--button-background` | `#000000` | Primary Button Fill (Add to Cart, Subscribe, Submit) |
| `--button-color` | `#ffffff` | Primary Button Text |
| `--button-background-hover` | `#148f2c` | Primary Button Hover Fill (Korigo Green) |
| `--button-color-hover` | `#ffffff` | Primary Button Hover Text |
| `--link-color` | `#868686` | Default Link Color |
| `--link-color-hover` | `#0ec1ae` | Link Hover Teal Accent |
| `--product-title-color-hover` | `#56cfe1` | Product Card Title Hover Cyan Accent |

### Badges & Status Indicators
| Badge | Background | Text Color | Usage |
| :--- | :--- | :--- | :--- |
| **Sale Badge** | `#e33131` | `#ffffff` | Discounted combo products (e.g., "Save ₹40") |
| **New Badge** | `#109533` | `#ffffff` | Recently launched flavours |
| **Sold Out Badge** | `#999999` | `#ffffff` | Out of stock items (Coco Island) |
| **Preorder Badge** | `#0774d7` | `#ffffff` | Pre-order reservations |
| **Custom / Special** | `#ec7501` | `#ffffff` | Exclusive bundles & seasonal promos |

---

## 2. Typography

### Primary Font Family: **Andada Pro** (Serif)
The live Korigo Snacks brand uses **Andada Pro**, an organic, modern serif typeface designed by Carolina Giovagnoli with sturdy proportions, warmth, and excellent legibility across packaging and screens.

```css
:root {
  --font-heading-family: "Andada Pro", serif;
  --font-body-family: "Andada Pro", serif;
  --font-button-family: "Andada Pro", serif;
}
```

### Type Scale & Hierarchy
| Level | Font Size (Desktop) | Font Size (Mobile) | Font Weight | Line Height | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display H1** | `42px` (2.625rem) | `30px` (1.875rem) | 700 / 800 | 1.15 | `-0.02em` |
| **Section H2** | `32px` (2.000rem) | `24px` (1.500rem) | 600 / 700 | 1.25 | `-0.01em` |
| **Card / Item H3** | `20px` (1.250rem) | `18px` (1.125rem) | 600 | 1.35 | `0` |
| **Subheading H4** | `16px` (1.000rem) | `15px` (0.938rem) | 600 | 1.4 | `0` |
| **Body (Default)** | `14px` (0.875rem) | `14px` (0.875rem) | 400 | 1.7 | `0` |
| **Body Large / Lead**| `16px` (1.000rem) | `15px` (0.938rem) | 400 / 500 | 1.65 | `0` |
| **Caption / Meta** | `12px` (0.750rem) | `12px` (0.750rem) | 500 | 1.5 | `0.02em` |
| **Button Text** | `14px` (0.875rem) | `13px` (0.813rem) | 600 | 1.0 | `0.05em` |

---

## 3. Spatial System & Layout

### Containers & Wrappers
```css
:root {
  --wrapper-mw: 1440px;
  --width-nt-stretch: 1200px;
  --padding-nt-stretch: 1.5rem;
}
```
- **Max Width (Outer Container)**: `1440px`
- **Standard Content Width**: `1200px` centered with auto margins
- **Gutters (Desktop)**: `30px` padding left/right
- **Gutters (Mobile)**: `16px` padding left/right

### Breakpoint Scale
```javascript
screens: {
  'xs': '375px',
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  '2xl': '1440px',
}
```

---

## 4. Components & Interactive Elements

### 1. Buttons
- **Primary Button (`.btn-primary`)**:
  - Background: `#000000`
  - Color: `#ffffff`
  - Border: `none`
  - Border Radius: `0px` (Default rectangular) / `40px` (Pill variant on special CTAs)
  - Padding: `14px 28px`
  - Hover: Background `#148f2c` (Korigo Green), Text `#ffffff`, transition `0.25s ease`
- **Secondary Button (`.btn-secondary`)**:
  - Background: `transparent`
  - Border: `1px solid #000000`
  - Color: `#000000`
  - Hover: Background `#000000`, Text `#ffffff`
- **Add to Cart / Buy Now (`.btn-atc`)**:
  - Full width on mobile, inline-block on desktop
  - Height: `48px`
  - Font weight: `600`

### 2. Product Cards
- **Dimensions**: Aspect ratio `1:1` or `4:5` for packshots
- **Border**: `1px solid #f0f0f0` on hover, subtle hover lift
- **Image Gallery**: Secondary hover image swap (swaps to lifestyle/moodshot on hover)
- **Badges**: Positioned absolute top-left (`10px, 10px`)
- **Wishlist / Quick View**: Positioned absolute top-right

### 3. Accordions (FAQs & Recipes)
- **Container**: Border bottom `1px solid #e6e6e6`
- **Trigger**: Flex row between title and chevron; font weight 600, padding `18px 0`
- **Content**: Padding `0 0 18px 0`, text color `#666666`, line-height `1.7`

### 4. Header & Navigation
- **Height**: Desktop `80px`, Mobile `64px`
- **Background**: `#ffffff`, sticky position with subtle bottom shadow on scroll
- **Logo Dimensions**: Height `45px` desktop, `36px` mobile
- **Nav Links**: Spacing `24px` horizontal, color `#222222`, weight `500`, hover color `#148f2c`
- **Cart Badge**: Round red/green pill displaying active cart item count

### 5. Footer
- **Background**: `#000000` or `#111111` dark contrast section
- **Text Color**: `#868686`
- **Heading Color**: `#ffffff`
- **Newsletter Input**: Inverted dark input with white placeholder and green submit button
- **Legal Row**: Flex wrap, centered copyright and policy links
