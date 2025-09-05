# Expense Tracker

A personal finance tracking web application that allows users to securely log in, add income and expense transactions, filter them by date or category, and view a summary using a pie chart. The application provides full CRUD operations and real-time financial insights.

---

## **Table of Contents**
- [Features](#features)
- [Project Setup & Installation](#project-setup--installation)
- [Technologies Used](#technologies-used)
- [Database & ER Diagram](#database--er-diagram)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Demo Video](#demo-video)
- [Folder Structure](#folder-structure)
- [License](#license)

---

## **Features**
- User authentication (signup/login) to protect personal data.
- Add, edit, delete transactions with amount, description, date, and category.
- View transactions sorted by newest first.
- Filter transactions by category or date range.
- Dynamic pie chart showing income/expense breakdown by category.
- Running totals: current balance, total income, total expenses.
- Fully responsive UI for desktop and mobile.
- Frontend and backend validations to prevent incorrect/empty data.

---

## **Project Setup & Installation**

### **Backend**
1. Navigate to the backend folder:

```bash
cd backend
Install dependencies:

bash
Copy code
npm install
Configure environment variables:

Create a .env file (based on .env.example) with the following variables:

env
Copy code
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=expense_tracker
JWT_SECRET=your_jwt_secret
Run migrations/seed database (if any):

bash
Copy code
npx sequelize db:migrate
npx sequelize db:seed:all
Start the server:

bash
Copy code
npm run dev
API backend will run on http://localhost:4000.

Frontend
Navigate to the frontend folder:

bash
Copy code
cd frontend
Install dependencies:

bash
Copy code
npm install
Start the frontend:

bash
Copy code
npm start
Frontend will run on http://localhost:3000.

Technologies Used
Technology	Purpose
React.js	Frontend library for building interactive UIs and single-page applications.
Tailwind CSS	Utility-first CSS framework for rapid styling and responsive design.
Axios	To make HTTP requests from frontend to backend.
React Router DOM	For routing between pages (Login, Signup, Transactions).
Node.js & Express.js	Backend server and API creation.
Sequelize ORM	Connects Node.js with MySQL database for easy queries and migrations.
MySQL	Relational database to store user and transaction data securely.
JWT (JSON Web Tokens)	For secure user authentication and session management.
Recharts	To display dynamic charts (pie chart for income/expense breakdown).

Database & ER Diagram
Entities:

User

id (PK)

fullName

email (unique)

password (hashed)

createdAt, updatedAt

Transaction

id (PK)

userId (FK → User.id)

amount (positive: income, negative: expense)

description

date

category (Salary, Business, Food, etc.)

createdAt, updatedAt

ER Diagram (Text-based):

pgsql
Copy code
User
+----------------+
| id (PK)        |
| fullName       |
| email (unique) |
| password       |
| createdAt      |
| updatedAt      |
+----------------+

Transaction
+------------------------+
| id (PK)                |
| userId (FK → User.id)  |
| amount                 |
| description            |
| date                   |
| category               |
| createdAt              |
| updatedAt              |
+------------------------+
API Endpoints
Auth
Method	Route	Purpose
POST	/api/user/register	Signup a new user
POST	/api/user/login	Login user and return JWT
POST	/api/user/logout	Logout user (clear cookies)

Transactions
Method	Route	Purpose
GET	/api/transactions	Fetch all transactions for logged-in user
POST	/api/transactions	Add a new transaction
PUT	/api/transactions/:id	Update an existing transaction
DELETE	/api/transactions/:id	Delete a transaction

All transaction routes require authentication (JWT token/cookie).

Deployment
Frontend deployed at: [YOUR_FRONTEND_DEPLOY_LINK]

Backend deployed at: [YOUR_BACKEND_DEPLOY_LINK]

Make sure backend URL is updated in frontend API calls when deploying.

Demo Video
Watch Demo
(3-5 minute video showing signup/login, add/edit/delete transactions, filters, pie chart, and updated totals.)