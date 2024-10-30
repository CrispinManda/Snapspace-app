
.
# Snapspace App

Snapspace is a web application that enables users to explore albums and photos, view user profiles, and manage personal photo collections. Built with React and Vite, Snapspace offers a smooth and responsive user experience, leveraging Google OAuth for secure authentication.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Live Demo](#live-demo)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [Deployment](#deployment)

---

## Features

- **Landing Page**: Overview of the app with a sign-in option.
- **Authentication**: Login with Google OAuth.
- **User Management**: List all users, view details, and view their albums.
- **Albums and Photos**: View album details, photos, and edit photo titles.
- **Responsive Design**: Optimized for mobile, tablet, and desktop.
- **Data Persistence**: Session management for authenticated users.

---

## Technologies Used

- **Frontend**: React, Vite, Bootstrap
- **Authentication**: Google OAuth
- **HTTP Client**: Axios
- **Testing**: Cypress,
- **Deployment**: Vercel 

---

## Live Demo

The live version of the application is hosted on Vercel. You can access it here:

**[Snapspace Live Demo](https://snapspace-app.vercel.app/)**

---

## Getting Started

### Prerequisites

To run this project, ensure you have the following installed:

- **Node.js** (>= 14.0)
- **npm** (>= 7.0) or **pnpm** (>= 6.0)

### Installation

1. **Clone the repository**:

   ```.
   git clone https://github.com/CrispinManda/Snapspace-app.git
   
   cd snapspace-app
Install dependencies:

.
.
npm install
Set up environment variables:

Create a .env file in the root directory and add your environment variables:

.
.
VITE_GOOGLE_CLIENT_ID=1009789889151-fclkfodpu8b196uvii57o0k6jim1a5m7.apps.googleusercontent.com
Run the app:

.
.
npm run start
The application will start on http://localhost:5173.

Project Structure
.
.
snapspace-app/
├── public/           # Public assets
├── src/
│   ├── components/   # Reusable components
│   ├── context/      # Context API for auth
│   ├── pages/        # Main app pages
│   ├── App.jsx       # App entry
│   └── main.jsx      # Vite entry
└── .env      # Environment variable 
Available Scripts
Start the application (Development):

.
.
npm run start
Build the application (Production):

.
.
npm run build
Run Tests:

.
.
npm test
Run Cypress Tests:

.
.
npm run cypress:open
Lint the Code:

.
.
npm run lint
Testing
The application includes end-to-end tests.

.
.

Run Cypress tests:

.
.
npm run cypress:open
Deployment
To deploy this project:

Vercel Deployment:

Sign up for Vercel.
Link the GitHub repository to Vercel and select the main branch for production.
Add environment variables (VITE_GOOGLE_CLIENT_ID) in the Vercel dashboard.
GitHub Actions:

This repository includes a GitHub Actions workflow to run tests and deploy on new commits to the main branch.
Contributing
Contributions are welcome! Please follow these steps:

Fork the project.
Create a new feature branch (git checkout -b feature/AmazingFeature).
Commit changes (git commit -m 'Add amazing feature').
Push to the branch (git push origin feature/AmazingFeature).
Open a pull request.
License
Distributed under the MIT License. See LICENSE for more information.

Contact
Your Name - crispinmanda06"gmail.com

Project Link: https://snapspace-app.vercel.app/