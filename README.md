# 📝 Blog App (Appwrite + React)

A full-stack **blog application** built with **React**, **Redux Toolkit**, and **Appwrite**.  
This project demonstrates authentication, protected routes, CRUD operations, image uploads, and rich text editing — all following clean architecture and best practices.

> ⚠️ **Note:** This project is **not hosted**. It is intended for learning, practice, and local development.

---

## 🚀 Features

- 🔐 Authentication (Signup / Login / Logout)
- 🛡️ Protected routes (only logged-in users can create/edit posts)
- ✍️ Create, edit, delete blog posts
- 🖼️ Image upload & preview using Appwrite Storage
- 📝 Rich Text Editor (TinyMCE)
- 🧭 Slug-based routing for posts
- 🗂️ Global state management with Redux Toolkit
- 🎨 Styled using Tailwind CSS
- ⚡ Built with Vite for fast development

---

## 🛠️ Tech Stack

**Frontend**
- React
- React Router
- Redux Toolkit
- React Hook Form
- TinyMCE
- Tailwind CSS
- Vite

**Backend / BaaS**
- Appwrite (Auth, Database, Storage)

---

## 📁 Project Structure
src/
├── appwrite/ # Appwrite services (auth, database, storage)
├── components/ # Reusable UI components
├── pages/ # Route-level pages
├── features/ # Redux slices
├── store/ # Redux store config
├── conf/ # Environment config
└── main.jsx # App entry point

▶️ Run Locally
# Install dependencies
npm install

# Start development server
npm run dev

Open: http://localhost:5173


🧠 Architecture Highlights

Service Layer Pattern
Appwrite logic is isolated inside service classes to avoid vendor lock-in.

Redux for Auth State
Authentication status is globally managed for predictable UI behavior.

Reusable PostForm
Single form handles both create & edit operations.

Protected Routing
Pages are guarded based on authentication state.


📌 Known Limitations

No deployment / hosting
No role-based authorization (admin/editor)
No comments or likes feature

🎯 Purpose of This Project

Learn Appwrite integration
Practice React + Redux architecture
Build a real-world CRUD application
Prepare for frontend interviews


🙌 Author
Ritam Sahu
Developer | React | Redux | Appwrite



---
⭐ If you like this project
Give it a ⭐ on GitHub — it helps a lot!
