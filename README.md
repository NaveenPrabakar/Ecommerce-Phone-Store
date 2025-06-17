
## 319 Final Project

### Project Overview

This project is a full-stack MERN web application developed for COM S 319 at Iowa State University. It leverages React.js for the frontend, Node.js and Express for the backend, MongoDB for data storage, and Tailwind CSS for modern, utility-first styling. The application demonstrates end-to-end development with a focus on clean UI, responsive design, and robust CRUD functionality.

---

### What Does the Project Do?

- **User Authentication:** Secure registration and login system.
- **CRUD Operations:** Users can create, read, update, and delete data entries.
- **Responsive UI:** Built with React.js and styled exclusively with Tailwind CSS for a modern, mobile-friendly experience[^1][^2].
- **REST API:** Express and Node.js power the backend, exposing endpoints for all data operations.
- **Database Integration:** MongoDB stores all application data, ensuring persistence and flexibility.

---

### Tech Stack

| Layer | Technology |
| :-- | :-- |
| Frontend | React.js, Tailwind CSS |
| Backend | Node.js, Express |
| Database | MongoDB |


---

### Key Features

- **Modern UI:** All components styled with Tailwind CSS for a sleek, consistent appearance.
- **Single-Page Application:** Fast and interactive user experience with React.
- **API-Driven:** RESTful endpoints for all data interactions.
- **Authentication:** User sessions are managed securely.
- **Mobile-First:** Fully responsive layouts using Tailwind’s utility classes

---

### Typical User Flow

1. **Register or Log In:** Users create an account or sign in.
2. **Dashboard:** Access personalized content and manage data.
3. **CRUD Actions:** Add, edit, or remove entries with instant feedback.

---

### Getting Started

1. **Clone the repository:**

```bash
git clone https://github.com/NaveenPrabakar/319-Final-Project.git
cd 319-Final-Project
```

2. **Install backend dependencies:**

```bash
cd backend
npm install
```

3. **Install frontend dependencies:**

```bash
cd ../frontend
npm install
```

4. **Set up environment variables in `backend/.env`:**

```
MONGODB_URI=your-mongodb-connection-string
PORT=5000
```

5. **Start the backend:**

```bash
cd backend
npm run dev
```

6. **Start the frontend:**

```bash
cd frontend
npm start
```



