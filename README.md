#Calendar-Application-for-Communication-Tracking
This project is a communication tracking application designed to help administrators manage companies, define communication methods, and schedule communications effectively.
The application consists of a React.js frontend and a Django backend with a MySQL database.
Features

Admin Module
Company Management
Add, edit, and delete company entries.
Fields include:
Name
Location
LinkedIn Profile
Emails
Phone Numbers
Comments
Communication Periodicity
Communication Method Management
Define available communication methods.
Fields include:
Name (e.g., LinkedIn Post, Phone Call)
Description
Sequence (order of communication)
Mandatory Flag
Default Communication Sequence
LinkedIn Post
LinkedIn Message
Email
Phone Call
Other

Tech Stack
Frontend
React.js
Axios for API requests
React Router for navigation
Backend
Django
Django Rest Framework (DRF) for APIs
Database
MySQL

Installation and Setup
Prerequisites
Node.js
Python 3.x
MySQL
Backend Setup
Clone the repository and navigate to the backend directory:
git clone <repository_url>
cd backend
Configure the database in settings.py:
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': '<database_name>',
        'USER': '<database_user>',
        'PASSWORD': '<database_password>',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
Run migrations and start the server:
python manage.py migrate
python manage.py runserver

Frontend Setup

Navigate to the frontend directory:
cd frontend
npm install
npm start
API Endpoints

Companies
GET /api/companies/ - List all companies
POST /api/companies/ - Add a new company
PUT /api/companies/:id/ - Update a company
DELETE /api/companies/:id/ - Delete a company
Communication Methods
GET /api/communication-methods/ - List all communication methods
POST /api/communication-methods/ - Add a new method
PUT /api/communication-methods/:id/ - Update a method
DELETE /api/communication-methods/:id/ - Delete a method
