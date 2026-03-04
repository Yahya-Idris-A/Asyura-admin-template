# Asyua Admin Template

A clean, professional, and modern admin dashboard template built for high-performance web applications. Designed with a focus on a minimalist aesthetic and optimal user experience across all devices.

## Tech Stack

* **Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS v4
* **State Management:** Zustand
* **Animations:** Framer Motion
* **Rich Text Editor:** TipTap (Headless WYSIWYG)
* **Charts:** Recharts

## Key Features

* **Smart Data Tables:** Client-side sorting, filtering, and pagination with nested object support.
* **Advanced Form Controls:** Custom switches, sliders, tag inputs, custom datepickers, and a fully featured WYSIWYG editor.
* **Global Overlays:** Centralized state management for Toast notifications, confirmation Modals, and non-dismissible data-transfer loading screens.
* **Responsive Navigation:** Adaptive sidebar for desktop and a native-feeling bottom navigation with a drawer for mobile.
* **Security:** Middleware-protected routing with a robust whitelist approach.

## Getting Started

## Demo Access

This template uses a simulated authentication system for demonstration purposes. To explore the dashboard, you can bypass the Sign-In page by entering any validly formatted email address and any password.

**Example:**
* **Email:** admin@gmail.com
* **Password:** anything

### Prerequisites

* Node.js 18.x or later
* npm or pnpm

### Installation

1.  Clone the repository:
    ```bash
    git clone [https://github.com/Yahya-Idris-A/Asyura-admin-template.git](https://github.com/Yahya-Idris-A/Asyura-admin-template.git)
    ```
2.  Navigate to the project directory:
    ```bash
    cd asyura-admin-dashboard
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```
5.  Open `http://localhost:3000` in your browser.

## Project Structure

* `src/app`: Next.js App Router pages, layouts, and API routes.
* `src/components/atoms`: Smallest UI elements (Buttons, Badges, Inputs).
* `src/components/molecules`: Combinations of atoms (Form Fields, Action Menus, Accordions).
* `src/components/organisms`: Complex sections (Sidebar, Header, Data Tables, WYSIWYG).
* `src/store`: Zustand global state slices for UI and overlays.
* `src/constants`: Static configurations and navigation arrays.

## Development Status

This template is actively maintained and serves as a foundational architecture for scalable enterprise applications.