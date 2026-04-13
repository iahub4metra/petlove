# 🐾 PetLove App

PetLove is a web application for exploring, managing, and interacting with pet-related listings. Users can browse notices, add favorites, manage their profile, and handle their own pets.

---

## 🚀 Features

- 🔐 Authentication (Sign In / Sign Up / Logout)
- 👤 User profile management
- 🐶 Add / remove user pets
- 📋 Browse pet notices
- ❤️ Add / remove favorites
- 🔍 Filtering and search
- 📄 View detailed pet information

---

## 🛠️ Tech Stack

- React
- Redux Toolkit
- TypeScript
- MUI (Material UI)
- Tailwind CSS
- Axios
- React Hook Form + Yup

---

## 📂 Project Structure

- `components/` — UI components
- `redux/` — state management (slices, thunks)
- `hooks/` — custom hooks
- `utils/` — helper functions
- `pages/` — application pages

---

## 🔗 Useful Links

- 📋 [Technical Specification (TS)](https://docs.google.com/spreadsheets/d/1DmQUeGZy_oaXN6yn69ORLzou1ZQRyTMlrAqPSit_clw/edit?pli=1&gid=1134921873#gid=1134921873)

- 📡 [API Documentation (Swagger)](https://petlove.b.goit.study/api-docs/#/)

- 🎨 [Design (Figma)](https://www.figma.com/design/FQcYflpIdWo2HyIDCcDOwp/Petl%F0%9F%92%9Bve--Copy-?node-id=55859-2245&m=dev&t=vnZiXdeYyQTHaebs-1)

---

## ⚙️ Getting Started

```bash
npm install
npm run dev
```

---

## 🔐 Authentication

The app uses JWT-based authentication.  
The token is stored in `localStorage` and automatically attached to API requests.

---

## ⚠️ Error Handling

- Global errors — handled via Snackbar / Toast
- API errors — managed through Redux (`status + error`)
- 401 — automatic logout
- 500 — user notification

---

## 📌 Highlights

- Data caching via Redux
- Granular loading & error states per operation
- Per-item loading handling using `currentId`
- Async selects (react-select)

---

## 👨‍💻 Author

Artem Buhai
[LinkedIn](https://www.linkedin.com/in/artem-buhai/)
