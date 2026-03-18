# STYLEGUIDE.md – Loofers (Real UI Analysis)

## Design Identity

Loofers is a **playful, gamified rewards platform**.

The design language combines:

* Bright gradients (pink → orange)
* Soft rounded UI
* Game-like visuals (stars, progress bars, tickets)
* Clean mobile-first layout
* High contrast CTA elements

The feel should be:

* Fun 🎮
* Reward-driven 🎁
* Energetic ⚡
* Friendly 😊

---

# 1. Color System

## Primary Gradient (Core Brand Identity)

This is the MOST important part of the UI.

```ts
PRIMARY_GRADIENT = {
  start: "#FF2D8D",   // pink
  end: "#FF7A5C"      // orange
}
```

Used for:

* Hero backgrounds
* Buttons
* Highlights
* Selected states

---

## Base Colors

```ts
COLORS = {
  white: "#FFFFFF",
  backgroundLight: "#F5F5F7",
  textPrimary: "#1A1A1A",
  textSecondary: "#6B6B6B",
  border: "#E5E5EA"
}
```

---

## UI Accent Colors

```ts
ACCENTS = {
  yellow: "#FFC83D",   // star / rewards
  green: "#34C759",    // progress / success
  blueDark: "#0F2A3D"  // game screen background
}
```

---

# 2. Gradients

Gradients are **core to branding**.

## Main Gradient

```ts
linear-gradient(135deg, #FF2D8D 0%, #FF7A5C 100%)
```

## Button Gradient

```ts
linear-gradient(135deg, #FF2D8D 0%, #FF6A6A 100%)
```

## Usage Rules

* Always soft diagonal
* No harsh transitions
* Used for energy and focus

---

# 3. Typography

## Font Style

Modern rounded sans-serif.

Use:

```ts
FONT = {
  primary: "System / Inter / SF Pro"
}
```

---

## Typography Scale

```ts
TYPOGRAPHY = {
  h1: { fontSize: 34, fontWeight: "700" },
  h2: { fontSize: 24, fontWeight: "600" },
  h3: { fontSize: 18, fontWeight: "600" },
  body: { fontSize: 16, fontWeight: "400" },
  small: { fontSize: 13, fontWeight: "400" }
}
```

---

## Typography Style Rules

* Bold headlines
* Clean readable body
* High contrast on gradients (white text)
* Slightly rounded feel

---

# 4. Layout & Spacing

## Spacing System

```ts
SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32
}
```

---

## Layout Principles

* Centered hero sections
* Card-based UI
* Strong vertical stacking
* Lots of breathing space

---

# 5. Components

## Buttons

Primary CTA:

```ts
BUTTON_PRIMARY = {
  height: 52,
  borderRadius: 26,
  gradient: ["#FF2D8D", "#FF7A5C"],
  textColor: "#FFFFFF"
}
```

Secondary:

```ts
BUTTON_SECONDARY = {
  backgroundColor: "#FFFFFF",
  borderColor: "#E5E5EA",
  textColor: "#1A1A1A"
}
```

---

## Cards

```ts
CARD = {
  backgroundColor: "#FFFFFF",
  borderRadius: 16,
  padding: 16,
  shadow: {
    opacity: 0.05,
    radius: 10
  }
}
```

Used for:

* countdown rows
* tickets
* items

---

## Ticket / Selection UI

Observed in screenshot:

* Rounded pill shapes
* Gradient when selected
* Light grey when inactive

```ts
TICKET = {
  active: {
    gradient: ["#FF2D8D", "#FF7A5C"],
    textColor: "#FFFFFF"
  },
  inactive: {
    backgroundColor: "#F2F2F2",
    textColor: "#333"
  }
}
```

---

# 6. Progress Indicators

```ts
PROGRESS_BAR = {
  height: 6,
  borderRadius: 3,
  background: "#E5E5EA",
  fill: "#34C759"
}
```

---

# 7. Global Banner (Countdown)

```ts
GLOBAL_BANNER = {
  backgroundColor: "#111111",
  textColor: "#FFFFFF",
  accent: "#FFC83D"
}
```

---

# 8. Iconography

Icons are:

* Rounded
* Simple
* Playful

Common icons:

* ⭐ star (reward)
* ❤️ heart
* 🎟 ticket
* progress bars

---

# 9. Game Screen Style (Middle Phone)

This is a **separate visual mode**:

```ts
GAME_SCREEN = {
  background: "#0F2A3D",
  elements: "3D / playful shapes",
  highlight: "#FFC83D"
}
```

Characteristics:

* Dark background
* Floating objects
* Cartoon-like visuals
* High contrast

---

# 10. Shadows & Depth

Very soft shadows:

```ts
SHADOW = {
  shadowColor: "#000",
  shadowOpacity: 0.05,
  shadowRadius: 10,
  elevation: 2
}
```

No heavy or dramatic shadows.

---

# 11. Motion & Interaction

Animations should feel:

* Smooth
* Playful
* Fast

```ts
ANIMATION = {
  duration: 200,
  easing: "ease-in-out"
}
```

Examples:

* button press scale
* progress animation
* countdown updates

---

# 12. Logo

Logo characteristics:

* Lowercase "loofers"
* Pink/orange gradient
* Rounded, friendly type
* Icon includes playful shape

Rules:

* Always keep gradient
* Never distort
* Maintain padding around logo

---

# 13. Tone & Feel

The UI should feel:

* Like a game
* Rewarding
* Addictive (in a good way)
* Friendly and accessible

NOT:

* corporate
* minimal luxury
* boring

---

# 14. Summary for Codex

When building UI:

1. Use gradients everywhere for key actions
2. Keep shapes rounded (no sharp corners)
3. Use cards for structure
4. Prioritize playful visuals
5. Highlight rewards (stars, progress, wins)
6. Keep everything mobile-first and clean

This is a **gamified rewards platform UI**, not an e-commerce design.
