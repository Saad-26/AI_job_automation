# DevReview.ai - Frontend

[![Deploy static content to Pages](https://github.com/Saad-26/AI_job_automation/actions/workflows/deploy.yml/badge.status.svg)](https://github.com/Saad-26/AI_job_automation/actions/workflows/deploy.yml)

**DevReview.ai** is a premium, AI-powered platform designed to automate code reviews and optimize developer profiles. It helps developers quantification their impact, bypass ATS filters, and ship faster with high-quality architectural patterns.

🚀 **Live Demo:** [https://saad-26.github.io/AI_job_automation/](https://saad-26.github.io/AI_job_automation/)

---

## ✨ Features

-   **High-Impact Hero Section**: A stunning, modern landing page with vibrant gradients and smooth animations.
-   **AI Strategy Engine**: A dynamic, terminal-style transition that simulates codebase vectorization and role mapping via Gemini AI.
-   **Intelligent Codebase Upload**: Drag-and-drop your archive for instant AI analysis and profile structuring.
-   **Scroll-Linked UI**: Interactive feature showcases that respond to your scroll progress using Framer Motion.
-   **Bento Grid Catalog**: A sleek categorization of key tools including a Visual Job Tracker and AI Tailoring.
-   **Real-time Optimization**: Instant rewriting of technical bullet points to highlight enterprise-grade impact.

## 🛠️ Tech Stack

-   **Framework**: [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Smooth Scrolling**: [Lenis](https://github.com/darkroomengineering/lenis)
-   **Particle Effects**: [TSParticles](https://particles.js.org/)
-   **Type Safety**: [TypeScript](https://www.typescriptlang.org/)

## 🚀 Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or higher)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Saad-26/AI_job_automation.git
    cd AI_job_automation/frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

### Building for Production

To create an optimized production build:

```bash
npm run build
```

The output will be in the `dist` directory.

## 📦 Project Structure

```text
frontend/
├── src/
│   ├── components/
│   │   ├── dashboard/   # Jobs tracker and apply modals
│   │   ├── landing/     # Hero, Bento Grid, Scroll showcases
│   │   └── onboarding/  # Resume upload and AI engine transitions
│   ├── App.tsx          # Main application routing & state
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles & Tailwind directives
├── .github/workflows/   # CI/CD Deployment (GitHub Actions)
├── public/              # Static assets
├── vite.config.ts       # Vite configuration
└── tsconfig.json        # TypeScript configuration
```

## 🌐 Deployment

The project is automatically deployed to **GitHub Pages** via GitHub Actions on every push to the `main` branch. 

Check the configuration in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

---

## 📄 License

This project is private and intended for promotional demonstration. All rights reserved.

---
Built with ❤️ for high-performance developers.
