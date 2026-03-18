# Architecture Overview – Advanced Countdown App

## Purpose

This document describes the architecture and design decisions behind the **Advanced Countdown App**.
The goal of this architecture is to produce code that is:

* Scalable
* Testable
* Easy to understand
* Easy to extend
* Clearly separated by responsibility

The application follows a **feature-based modular architecture** combined with a **layered separation of concerns**.

---

# High-Level Architecture

The application is divided into the following logical layers:

1. **Presentation Layer**
2. **State Management Layer**
3. **Business Logic Layer**
4. **Service Layer**
5. **Utility Layer**
6. **Testing Layer**

This separation ensures that business logic remains independent from UI components, allowing logic to be tested in isolation.

---

# Technology Stack

The project uses the following technologies:

* **React Native (Expo)** – mobile framework
* **TypeScript** – type safety and maintainability
* **React Navigation** – navigation and tab structure
* **Zustand** – global state management
* **Jest** – unit testing
* **date-fns** – date manipulation utilities

The stack was chosen to minimize complexity while maintaining strong scalability and testability.

---

# Project Structure

The project follows a **feature-oriented structure** to keep related code together and support future growth.

```
src
│
├── app
│   ├── App.tsx
│   └── navigation
│       ├── RootNavigator.tsx
│       └── TabNavigator.tsx
│
├── features
│   └── countdown
│       ├── components
│       │   ├── CountdownRow.tsx
│       │   └── GlobalCountdownBanner.tsx
│       │
│       ├── screens
│       │   ├── ConfigScreen.tsx
│       │   └── CountdownListScreen.tsx
│       │
│       ├── hooks
│       │   └── useCountdownTimer.ts
│       │
│       ├── countdownStore.ts
│       └── countdownService.ts
│
├── components
│   ├── Button.tsx
│   ├── DateTimePicker.tsx
│   └── ScreenContainer.tsx
│
├── services
│   └── api.ts
│
├── utils
│   ├── countdownUtils.ts
│   └── dateUtils.ts
│
├── types
│   └── countdown.ts
│
└── tests
    ├── countdownUtils.test.ts
    └── countdownStore.test.ts
```

---

# Navigation Architecture

The application uses **bottom tab navigation** with two primary screens.

```
BottomTabs
 ├── Configure Screen
 └── Active Countdowns Screen
```

A **global countdown banner** is rendered above the navigator to ensure it remains visible across all screens.

```
App
 ├── GlobalCountdownBanner
 └── TabNavigator
```

This guarantees that the closest expiring countdown is always visible regardless of navigation state.

---

# Feature Module: Countdown

The application centers around a single feature module: **Countdown**.

This module contains:

* UI components
* Screens
* State management
* Business logic
* API simulation

Organizing by feature keeps the codebase scalable as new features are added.

---

# State Management

Global state is handled using **Zustand**.

The store maintains the list of active countdowns.

Example state structure:

```
countdowns: Countdown[]
```

Store responsibilities:

* Add a countdown
* Remove a countdown
* Update countdown timers
* Determine the closest expiring countdown

Keeping state centralized ensures all views stay synchronized with the latest data.

---

# Countdown Data Model

Countdowns are represented using the following structure:

```
Countdown {
  id: string
  startDate: Date
  targetDate: Date
}
```

Fields:

| Field      | Purpose                        |
| ---------- | ------------------------------ |
| id         | Unique identifier              |
| startDate  | Original date chosen by user   |
| targetDate | Date returned by simulated API |

---

# Simulated API Layer

The assignment requires simulating an API request.

This logic is isolated in a **service layer**:

```
countdownService.ts
```

Behavior:

1. Accept a date parameter
2. Simulate network latency
3. Return a new date equal to the provided date plus two minutes

Separating API logic from UI ensures that networking behavior can be replaced easily if a real backend is introduced.

---

# Timer System

Countdown updates are driven by a **global timer hook**.

```
useCountdownTimer.ts
```

Responsibilities:

* Run an interval every second
* Update remaining countdown times
* Remove expired countdowns automatically

This hook ensures the UI always reflects the most current countdown state.

---

# Business Logic Layer

Business logic is implemented as **pure utility functions** inside:

```
utils/countdownUtils.ts
```

Examples include:

* Calculating remaining time
* Determining if a countdown has expired
* Finding the closest expiring countdown

Keeping this logic pure ensures it can be tested independently from UI or state.

---

# UI Components

UI components are divided into two groups.

## Shared Components

Reusable UI elements:

* Button
* DateTimePicker
* ScreenContainer

These help standardize UI behavior across screens.

## Feature Components

Countdown-specific components:

* CountdownRow
* GlobalCountdownBanner

These components consume state and render countdown data.

---

# Data Flow

The data flow of the application is as follows:

```
User selects date
      ↓
User presses Start
      ↓
Simulated API request
      ↓
API returns date + 2 minutes
      ↓
Countdown added to global store
      ↓
Timer updates countdown every second
      ↓
Expired countdown removed automatically
      ↓
UI re-renders based on store state
```

This predictable flow simplifies debugging and testing.

---

# Global Countdown View

The application requires a global indicator showing the countdown closest to expiration.

This is implemented via:

```
GlobalCountdownBanner
```

The component:

* subscribes to the countdown store
* calculates the closest countdown
* displays the remaining time

Placing this component at the root of the app ensures visibility across all navigation states.

---

# Testing Strategy

The application focuses on **testing business logic rather than UI components**.

Tests are implemented using **Jest**.

Tested areas include:

* countdown calculations
* expiration logic
* closest countdown detection
* store behavior

Example tests:

```
calculateRemainingTime
isExpired
getClosestCountdown
addCountdown
removeCountdown
```

By isolating business logic from UI, these tests remain fast and reliable.

---

# Scalability Considerations

The architecture supports future expansion through:

* Feature-based modules
* Independent services
* Centralized state
* Pure business logic utilities

Potential future extensions:

* persistent storage
* background timers
* push notifications
* real API integration
* additional countdown categories

---

# Key Design Principles

The architecture follows several important principles:

### Separation of Concerns

UI, logic, and services are separated to avoid tight coupling.

### Testability

All business logic is implemented as pure functions and tested independently.

### Modularity

Features are grouped together to simplify scaling.

### Maintainability

Clear folder structure and responsibility boundaries improve long-term maintainability.

---

# Summary

The Advanced Countdown App architecture focuses on:

* clear separation of responsibilities
* predictable data flow
* centralized state management
* easily testable business logic

This structure allows the application to remain simple for the current requirements while also supporting future growth and maintainability.
