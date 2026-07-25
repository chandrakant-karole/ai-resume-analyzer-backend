# 🤖 AI Resume Analyzer

An AI-powered Resume Analyzer built with the **MERN Stack**, **TypeScript**, and **Google Gemini AI**. The application allows users to upload resumes, extract text from PDF files, analyze resumes using AI, and receive ATS scores, strengths, weaknesses, and actionable improvement suggestions.

This project follows a **production-inspired feature-based architecture** with a focus on scalability, maintainability, and clean code practices.

---

## ✨ Features

### Authentication

* User Registration
* User Login
* Secure Logout
* Get Current User
* JWT Authentication
* HTTP-only Cookie Authentication

### Resume Management

* Upload PDF Resume
* Extract Resume Text
* Store Resume Metadata
* List Uploaded Resumes
* View Resume Details
* Delete Resume
* Automatic cleanup of associated AI analysis and uploaded PDF

### AI Resume Analysis

* Google Gemini AI Integration
* ATS Compatibility Score
* Overall Resume Score
* Content Analysis
* Skills Analysis
* Experience Analysis
* Formatting Analysis
* Resume Strengths
* Resume Weaknesses
* Actionable Improvement Suggestions

### Backend Features

* Feature-Based Architecture
* TypeScript
* Zod Validation
* Global Error Handling
* Centralized Response Handler
* Winston Logging
* Multer File Upload
* PDF Text Extraction
* Environment Validation
* Secure Cookie Configuration

---

## 🛠 Tech Stack

### Backend

* Node.js
* Express.js
* TypeScript

### Database

* MongoDB
* Mongoose

### Authentication

* JWT
* HTTP-only Cookies
* bcrypt

### AI

* Google Gemini API

### Validation

* Zod

### File Upload

* Multer
* pdf-parse

### Logging

* Winston

---

## 📁 Project Structure

```text
src
├── config
├── middlewares
├── modules
│   ├── auth
│   ├── resume
│   └── analysis
├── prompts
├── utils
├── app.ts
└── server.ts
```

---

## 🏗 Architecture

```text
Client
   │
   ▼
Express Routes
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Models
   │
   ▼
MongoDB
```

---

## 🤖 AI Resume Analysis Flow

```text
Upload Resume (PDF)
        │
        ▼
Extract Text
        │
        ▼
Store Resume
        │
        ▼
Generate AI Prompt
        │
        ▼
Google Gemini AI
        │
        ▼
Validate JSON Response (Zod)
        │
        ▼
Store Analysis
        │
        ▼
Return Result
```

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint                |
| ------ | ----------------------- |
| POST   | `/api/v1/auth/register` |
| POST   | `/api/v1/auth/login`    |
| POST   | `/api/v1/auth/logout`   |
| GET    | `/api/v1/auth/me`       |

### Resume

| Method | Endpoint                |
| ------ | ----------------------- |
| POST   | `/api/v1/resume/upload` |
| GET    | `/api/v1/resume`        |
| GET    | `/api/v1/resume/:id`    |
| DELETE | `/api/v1/resume/:id`    |

### Analysis

| Method | Endpoint                     |
| ------ | ---------------------------- |
| POST   | `/api/v1/analysis/:resumeId` |
| GET    | `/api/v1/analysis/:resumeId` |
| DELETE | `/api/v1/analysis/:resumeId` |

---

## 🚀 Installation

```bash
git clone <repository-url>

cd backend

npm install
```

Create a `.env` file and add the required environment variables.

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

## 🔐 Environment Variables

```env
PORT=

MONGODB_URI=

JWT_SECRET=

JWT_EXPIRES_IN=

COOKIE_EXPIRES_IN=

GEMINI_API_KEY=

CLIENT_URL=
```

---

## 🚧 Future Improvements

* Job Description Matching
* AI Cover Letter Generator
* AI Interview Question Generator
* Resume Versioning
* AWS S3 File Storage
* Docker Support
* CI/CD Pipeline
* Redis Caching

---

## 📚 Learning Outcomes

This project demonstrates:

* Feature-Based Backend Architecture
* REST API Design
* Authentication using JWT & HTTP-only Cookies
* Secure File Uploads
* PDF Parsing
* AI Integration with Google Gemini
* JSON Schema Validation using Zod
* MongoDB & Mongoose
* Error Handling
* Logging
* Clean Code Principles
* Production-inspired Backend Development

---

## 📄 License

This project is licensed under the MIT License.
