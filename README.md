# 📄 MyDocs

MyDocs is a real-time collaborative document editing application built with **Next.js, Liveblocks, and Tailwind CSS**. It replicates core features of Google Docs, enabling multiple users to collaborate in real-time on shared documents. This project demonstrates expertise in real-time applications and modern web development.

## 🚀 Live Demo
https://my-word-docs.vercel.app/

## ⚙️ Tech Stack
- **Next.js** – React framework for server-side rendering and routing
- **TypeScript** – Strongly typed JavaScript for better code reliability
- **Liveblocks** – Real-time collaboration and presence handling
- **Lexical Editor** – A modern WYSIWYG editor for rich-text editing
- **ShadCN** – UI components for styling and functionality
- **Tailwind CSS** – Utility-first CSS framework for responsive design
- **Gemini** - enhances the qualtiy of your writing through suggestions

## 🔋 Features

### 🔑 Authentication
- Secure sign-in with **Clerk authentication** (GitHub login integration)
- Session management with **NextAuth.js**

### 📝 Collaborative Text Editing
- Real-time document editing with multiple users
- Presence indicators to show active collaborators

### 📂 Document Management
- **Create Documents** – Users can create and save new documents
- **Delete Documents** – Owners can delete documents they created
- **Share Documents** – Share via email or link with customizable permissions
- **List Documents** – View owned and shared documents with search & sorting

### 💬 Comments & Notifications
- Add **inline comments** for discussions
- Threaded replies for better conversation flow
- **Notifications** for document shares, new comments, and collaboration updates

### 📱 Responsive Design
- Optimized for **desktop, tablet, and mobile** devices
- **Dark mode support** (coming soon)

---

## 🤸 Quick Start
Follow these steps to set up **My WordDocs** locally.

### ✅ Prerequisites
Ensure you have the following installed:
- **Git**
- **Node.js** (Latest LTS version recommended)
- **npm** (Node Package Manager)

### 📥 Clone the Repository
```sh
 git clone https://github.com/Mustafaahmed00/My_WordDocs.git
 cd My_WordDocs
```

### 📦 Install Dependencies
```sh
npm install
```

### 🔑 Set Up Environment Variables
Create a `.env` file in the root of your project and add:
```ini
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up


# Liveblocks API Keys
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=
LIVEBLOCKS_SECRET_KEY=

# Sentry API Key
SENTRY_AUTH_TOKEN=

# Gemini API Key
GEMINI_API_KEY=
```
Replace the placeholder values with your **Clerk** and **Liveblocks** credentials.

### ▶️ Run the Development Server
```sh
npm run dev
```
Your app should now be running at `http://localhost:3000` 🎉

## 🛠️ Future Enhancements
- **Document version history**
- **Real-time voice collaboration**
- **Offline mode**

## 🤝 Contributing
Pull requests are welcome! Feel free to fork the repo and submit PRs for any enhancements or bug fixes.

## 📜 License
This project is licensed under the **MIT License**.

## 🔗 Connect
- GitHub: [@Mustafaahmed00](https://github.com/Mustafaahmed00)
- LinkedIn: [Mohammad Mustafa Ahmed](https://www.linkedin.com/in/mustafa-ahmed002/)

---
Made with ❤️ by **Mohammad Mustafa Shiraz Ahmed**
