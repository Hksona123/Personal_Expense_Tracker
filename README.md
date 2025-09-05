# **Expense Tracker**

A personal finance tracking web application that allows users to securely log in, manage income and expense transactions, filter them by date or category, and view a summary using a dynamic pie chart. The application provides full CRUD operations and real-time financial insights.

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
- **User Authentication**: Secure signup and login to protect personal data.  
- **Transaction Management**: Add, edit, and delete transactions with amount, description, date, and category.  
- **Sorting & Filtering**: View transactions sorted by newest first and filter by category or date range.  
- **Dynamic Pie Chart**: Visualize income/expense breakdown by category.  
- **Running Totals**: Track current balance, total income, and total expenses.  
- **Responsive UI**: Fully responsive design for desktop and mobile.  
- **Validations**: Frontend and backend validations prevent incorrect or empty data submissions.  

---

## **Project Setup & Installation**

### **Backend**
1. Navigate to the backend folder:

cd backend

2. Install dependencies: npm install 

3. Configure environment variables:
Create a .env file (based on .env.example) with the following:
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=expense_tracker
JWT_SECRET=your_jwt_secret

4. Run migrations & seed database:
npx sequelize db:migrate
npx sequelize db:seed:all

5. Start the backend server:
npm run dev

The backend API will run at http://localhost:5000

### Frontend

1. Navigate to the frontend folder:

cd frontend


2. Install dependencies:

npm install


3. Start the frontend:

npm start


The frontend will run at http://localhost:3000

## Technologies Used
### Technology	Purpose
React.js	Frontend library for building interactive UIs and SPA.
Tailwind CSS	Utility-first CSS framework for styling and responsiveness.
Axios	HTTP client for frontend-backend communication.
React Router DOM	Routing between pages (Login, Signup, Transactions).
Node.js & Express.js	Backend server and REST API creation.
Sequelize ORM	ORM for MySQL database operations and migrations.
MySQL	Relational database for secure storage of users & transactions.
JWT (JSON Web Tokens)	Secure user authentication and session management.
Recharts	Dynamic pie charts for income/expense visualization.

## Database & ER Diagram
### Entities

### User

id (PK)

fullName

email (unique)

password (hashed)

createdAt, updatedAt

### Transaction

id (PK)

userId (FK → User.id)

amount (positive: income, negative: expense)

description

date

category (Salary, Business, Food, etc.)

createdAt, updatedAt

ER Diagram (Text-Based)

### User

+----------------+
| id (PK)        |
| fullName       |
| email (unique) |
| password       |
| createdAt      |
| updatedAt      |
+----------------+

### Transaction

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

## API Endpoints
### Auth
Method	Route	Purpose
POST	/api/user/register	Signup a new user
POST	/api/user/login	Login user & return JWT
POST	/api/user/logout	Logout user (clear cookies)
### Transactions
Method	Route	Purpose
GET	/api/transactions	Fetch all transactions for logged-in user
POST	/api/transactions	Add a new transaction
PUT	/api/transactions/:id	Update an existing transaction
DELETE	/api/transactions/:id	Delete a transaction

All transaction routes require authentication via JWT token/cookie.

### Deployment

Frontend: https://personal-expense-tracker-phi.vercel.app/

### Demo Video

Watch the demo showcasing signup/login, add/edit/delete transactions, filters, pie chart, and updated totals:
Watch Demo: https://drive.google.com/file/d/1Sc_D05v6CfnIKLCKIBnyeb6jJ9DBw3ZD/view?usp=sharing