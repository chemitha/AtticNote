# <p align="center"> <img width="32" src="https://github.com/chemitha/AtticNote/blob/main/public/logo_curved.svg"> <a href="https://atticnote.vercel.app">AtticNote</a> </p>

> <p align="center"> Your personal digital backpack. A lightweight, keyboard-first markdown workspace built for speed, multi-device access, and seamless deployment. </p>
> 
<br>

<p align="center">
  <img src="https://img.shields.io/badge/Framework-Next.js-000000?style=flat-square&logo=next.js" alt="Framework: Next.js" />
  <img src="https://img.shields.io/badge/Language-TypeScript-3178C6?style=flat-square&logo=typescript" alt="Language: TypeScript" />
  <img src="https://img.shields.io/badge/Editor-Block--Based-7C3AED?style=flat-square" alt="Editor: Block-Based" />
  <img src="https://img.shields.io/badge/License-MIT-green.svg?style=flat-square" alt="License: MIT" />
</p>

---

## 📌 Why AtticNote?

<p align="center">
Most powerful workspace tools feel like a trap when strict security policies, heavy desktop clients, or aggressive 2FA loops block your flow on public or restrictive machines. </p>

**AtticNote** was built to solve a simple problem: **Accessing your personal knowledge base anywhere, instantly.** It is a fast, web-native note-keeper designed to get out of your way, keep your database ultra-lightweight, and give you complete data ownership.

---

## ✨ Features

### 🛠️ Developer-First Editor

- **Block-Based Architecture:** Every line is a distinct block. Rearrange, transform, and structure content naturally.
- **Keyboard-Driven Navigation:** Designed entirely for speed. Format, structure, and navigate your thoughts without touching a mouse.
    - `/` to open command palettes.
    - `Ctrl + K` to trigger global search.
    - `Tab` / `Shift + Tab` to nest and indent blocks.
- **Native Markdown:** Writing shortcuts map instantly to clean markdown styling.

### 🌐 Light, Frictionless & Connected

- **Rich Embeds over Bloat:** Keep your storage footprint tiny. Embed PDFs, Figma prototypes, YouTube videos, and rich links inline automatically instead of uploading heavy assets.
- **Multi-Device Availability:** Zero friction, zero complex login loops. Open any browser and pick up exactly where you left off.

### 🔓 Complete Ownership (Export Freely)

Your notes are never trapped in a proprietary ecosystem. Push your data exactly where it needs to go with single-click integrations:

- **GitHub Sync:** Commit and back up your workspace files straight into your custom repositories as markdown files.
- **Google Drive:** Pack up notes and assets into clean ZIP archives directly to your cloud.
- **Notion Integration:** Instantly map and generate live pages inside your Notion workspaces.

---

## 🚀 Tech Stack

AtticNote is built using a modern, scalable web stack optimized for performance and snappy UI responsiveness:

- **Frontend:** [Next.js](https://nextjs.org/) (React), [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Database & Auth:** Structured minimal configuration for lightning-fast cross-device synchronization.

---

## 🗺️ Product Roadmap

- [x]  Dashboard MVP & Workspace Layout
- [x]  Block-based editor & layout core
- [x]  Rich Embed components (Figma, YouTube, PDFs)
- [ ]  Direct GitHub Markdown sync pipeline
- [ ]  Automated Google Drive ZIP export engine
- [ ]  Notion workspace page generator api

---

## 💻 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18+ recommended) and **npm/pnpm/yarn** installed.

### Installation

1. **Clone the repository:**
    
    ```bash
    git clone [<https://github.com/your-username/atticnote.git>](<https://github.com/your-username/atticnote.git>)
    cd atticnote
    ```
    
2. **Install dependencies:**

```bash
npm install
# or
pnpm install
# or
yarn install
```

1. **Set up environment variables:**
Create a `.env.local` file in the root directory and add your integration credentials:

```
NEXT_PUBLIC_APP_URL=http://localhost:3000
# Add your GitHub, Google, and Notion OAuth/API keys below
```

1. **Run the development server:**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000/) in your browser to view your workspace.

---

## 🤝 Contributing

Contributions, bug reports, and feature requests are completely welcome! If you notice an issue or want to expand the integration ecosystem, feel free to drop a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
