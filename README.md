# Attic

**A lightweight, keyboard-first Notion alternative.**

Built for speed and simplicity — focused on delightful note-taking with a powerful block editor and seamless export/sync options.

![Attic Banner](https://placehold.co/1200x400/1F242F/7C5CFF?text=Attic&font=montserrat)
*(Replace with actual screenshot once deployed)*

## ✨ Features

- ⚡ **Lightning-fast block editor** (Notion-like experience)
- ⌨️ **Keyboard-first** — everything accessible via shortcuts
- 📝 **Full Markdown support**
- 🖼️ **File & image attachments** with drag & drop
- 🔍 **Global search** (Cmd/Ctrl + K)
- 📤 **Export & Sync** to Google Drive, Notion, and GitHub
- 🎨 **Beautiful dark UI** with glassmorphism touch
- 📱 **Responsive design** (desktop-first)

## Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Editor**: BlockNote (Notion-style blocks)
- **State**: Zustand + TanStack Query
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL + Prisma
- **Auth**: JWT + bcrypt
- **Storage**: Local → Cloudflare R2 / AWS S3 (planned)

## Screenshots

*(Add screenshots here — especially the editor and dashboard)*

## Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL database

### Setup

```bash
# Clone the repo
git clone https://github.com/chemitha/attic.git
cd attic

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

Then fill in your `.env.local`:

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET=...
# Add your OAuth credentials for Google, Notion, GitHub
```

```bash
# Run migrations
npx prisma migrate dev

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start using Attic.

## Project Status

**MVP Complete** — Built in one day (May 2026)

**Currently Working:**
- Full authentication (email/password)
- Dashboard with sidebar
- Block-based editor with slash commands
- File uploads & attachments
- Basic integrations UI

**In Progress / Planned:**
- Full OAuth integrations (Google Drive, Notion, GitHub)
- Mobile responsiveness
- Advanced search & tagging
- Block drag & drop improvements

## Roadmap

- [ ] Polish editor experience
- [ ] Complete OAuth integrations
- [ ] Export notes as clean Markdown + assets
- [ ] Command palette enhancements
- [ ] Dark/light mode toggle
- [ ] Public sharing

## Contributing

This is currently a personal project. Feel free to open issues or PRs if you have suggestions!

## License

MIT © [Chemitha](https://github.com/chemitha)