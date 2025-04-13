# Coursify - Learning Management System (LMS)

Coursify is a web-based Learning Management System (LMS) built with **Node.js**, **Express.js**, **MongoDB**, and **React**. It enables users to create, consume, and rate educational content, such as courses, tutorials, and quizzes.

## 🚀 Features

- **User Authentication**: Secure login and registration system.
- **Course Creation & Management**: Admins and instructors can create and manage courses, lessons, and quizzes.
- **Course Enrollment**: Users can browse and enroll in available courses.
- **Interactive Learning**: Provides an interactive and engaging way for students to learn.
- **Course Rating & Feedback**: Students can rate and leave feedback on courses they have completed.
- **Admin Dashboard**: A powerful admin interface to manage users, courses, and content.

## ⚙️ Technologies Used

- **Frontend**: 
  - React.js
  - Tailwind CSS
  - Redux for state management
- **Backend**: 
  - Node.js
  - Express.js
  - MongoDB (Mongoose ODM)
  - JWT (JSON Web Tokens) for authentication
  - Razorpay for secure payment processing
- **Deployment**: 
  - Cloudinary for media management
  - Turborepo for faster builds
  - GitHub Actions for CI/CD pipeline

## 🖥️ Setup and Installation

### Prerequisites

Before getting started, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB** (local or cloud database)
- **npm** (or **yarn**)

### Steps

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/arpana2003/Coursify.git
Navigate to the project directory:

bash
Copy
Edit
cd Coursify
Install dependencies for both frontend and backend:

For the backend:

bash
Copy
Edit
cd server
npm install
For the frontend:

bash
Copy
Edit
cd ../lms-frontend
npm install
Set up environment variables (create .env files in both server/ and lms-frontend/):

Backend:

MONGO_URI (MongoDB connection string)

JWT_SECRET (Secret key for JWT)

Frontend:

REACT_APP_API_URL (API base URL for the backend)

Run the backend server:

bash
Copy
Edit
cd server
npm start
Run the frontend development server:

bash
Copy
Edit
cd lms-frontend
npm start
Visit http://localhost:3000 in your browser to view the application.

🎨 UI/UX Design
The application is designed with Tailwind CSS to provide a clean, modern, and responsive user interface. The UI is optimized for performance, providing a seamless user experience on both desktop and mobile devices.

🛠️ Contributing
We welcome contributions! If you would like to improve or add new features to this project, please follow these steps:

Fork the repository.

Create a new branch (git checkout -b feature-name).

Make your changes and commit them (git commit -m 'Add feature-name').

Push to your forked repository (git push origin feature-name).

Submit a pull request to the original repository.
