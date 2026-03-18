# 🚀 Advanced Countdown App

A high-performance React Native application built with an **AI-augmented workflow**. This project demonstrates scalable state management, real-time UI synchronization, and clean architectural patterns tailored for a gaming startup environment.

---

## ⏱️ Task Timing
- **Start time:** 2026-03-17 10:00 (Europe/Brussels)
- **End time:** 2026-03-17 15:45 (Europe/Brussels)
- **Total Duration:** ~5.75 hours (including architecture, implementation, and testing)

## 🧠 AI-Augmented Workflow
To align with the "AI-optimized workflow" requirement, I utilized a multi-model approach to pressure-test the logic and ensure high code quality:
* **Strategy & Planning:** Collaborated with **ChatGPT** and **Gemini** to draft `SPEC.md` and `ARCHITECTURE.md`, identifying potential edge cases in the global ticker logic before writing code.
* **Implementation:** Used **Codex 5.2** for rapid scaffolding and implementing the core state container.
* **Review:** Conducted AI-assisted code reviews to ensure compliance with modern TypeScript standards and performance optimization for mobile.

## 🛠️ Features & Requirements
- [x] **State Container:** Clean, centralized store for countdowns (Add/Remove/Tick).
- [x] **Config Screen:** Full date/time selection flow with an asynchronous "start" trigger.
- [x] **API Mocking:** Integrated mock service returning `current_time + 2 minutes` for testing.
- [x] **Global Ticker:** Optimized 1s interval to update all active countdowns simultaneously.
- [x] **Dynamic List View:** Auto-sorting list that removes expired items in real-time.
- [x] **Urgency Banner:** Global UI component highlighting the countdown closest to expiring.
- [x] **Unit Testing:** Comprehensive tests for utility functions and store logic.

## 📦 Technical Stack
* **Framework:** React Native (Expo Go)
* **Language:** TypeScript
* **State Management:** Zustand
* **Logic:** Global 1-second synchronization ticker.

## 🚀 How to Run
1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Ian0035/advanced-countdown-app.git](https://github.com/Ian0035/advanced-countdown-app.git)
    cd advanced-countdown-app
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Launch via Expo:**
    ```bash
    npx expo start
    ```
4.  **View on Device:** Scan the QR code using the **Expo Go** app (iOS/Android).

---
*Developed as a technical showcase for Loofers ApS.*
