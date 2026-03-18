# Advanced Countdown App Specification

Build a React Native application using Expo and TypeScript.

## Features

### Navigation

* Bottom tab navigation
* 2 tabs:

  * Configure
  * Active Countdowns

### Configure Screen

Components:

* Date + Time picker
* Start button

When the user presses "Start":

1. Simulate an API request using the selected date.
2. The API returns the provided date + 2 minutes.
3. When the response is received, start a countdown to that date.
4. Add the countdown to the global state.

### Active Countdowns Screen

Displays a list of active countdowns.

Each row:

* shows remaining time
* updates every second

When a countdown reaches 0:

* remove it automatically from the list.

### Global Countdown View

A component visible on all screens showing:

"The countdown closest to expiring"

### Requirements

* All views must always reflect the latest data
* Countdown updates every second
* Countdown automatically removed when expired
* Use clean architecture and separation of concerns

### Architecture Requirements

Use the following structure:

src
app
navigation

features
countdown
components
screens
hooks
countdownStore.ts
countdownService.ts

components
services
utils
types
tests

### Technologies

React Native
Expo
TypeScript
React Navigation
Zustand (state management)
Jest (unit tests)

### Business Logic

Implement pure functions for:

calculateRemainingTime
isExpired
getClosestCountdown

These must have unit tests.

### Simulated API

Function:

createCountdown(date)

Behavior:

wait 1 second
return date + 2 minutes

### Timer

Global timer updating countdown state every second.

### Tests

Write unit tests for:

countdownUtils
countdownStore
