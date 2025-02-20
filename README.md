# RetroPulse
<!--
![RetroPulse Logo](https://i.ibb.co.com/0pCDJGwH/logo.png)
-->
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-blue.svg)](https://retropulse.vercel.app)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

RetroPulse is a web-based platform that allows users to play classic retro games directly from their browsers. The platform supports games from various retro consoles like Nintendo, Sega, and PS1, bringing nostalgic gaming experiences back to life.

## 🚀 Live Demo
Check out the live version here: [RetroPulse](https://retropulse.vercel.app)

## 📌 Features
- 🎮 Play classic retro games online
- 🔍 Search and filter games by console
- 📂 Save and load game states
- 🌐 Responsive and user-friendly UI
- 🔐 Authentication with Auth.js
- ⚡ Optimized performance with Next.js

## 🛠 Tech Stack
- **Frontend:** Next.js 15, Tailwind CSS
- **Backend:** Prisma, NeonDB
- **Storage:** Filebase S3
- **Authentication:** Auth.js
- **Deployment:** Vercel

## 📦 Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/retropulse.git
   cd retropulse
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables (create a `.env.local` file):
   ```env
   ### Database
   DATABASE_URL=your-db-url
   DIRECT_URL=your-directdb-url

   ### Authentication
   WEBSITE_URL=your-host-url
   NEXTAUTH_SECRET=your-secret-key
   AUTH_SECRET=your-generated-auth-secret-from-authjs
   AUTH_GITHUB_ID=
   AUTH_GITHUB_SECRET=

   ### FILEBASE S3
   S3_ENDPOINT=
   S3_BUCKET_NAME=
   S3_SECRET_ACCESS_KEY=
   S3_ACCESS_KEY_ID=
   S3_REGION=
   S3_API_VERSION=
   ```
4. Run the development server:
   ```sh
   npm run dev
   ```
   The app will be available at `http://localhost:3000`

<!--
## 📸 Screenshots
![Game Page](https://your-screenshot-url.com)
-->

## 🤝 Contributing
Contributions are welcome! Feel free to open issues or create pull requests.

## 📜 License
This project is licensed under the [MIT License](LICENSE).

## 📬 Contact
For any inquiries, reach out via:
- GitHub: [@rizkyakbar1511](https://github.com/rizkyakbar1511)
- Email: rizkyakbar1511@gmail.com

