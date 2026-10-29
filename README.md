Wanderlust 🌍

Discover, Explore & Share Amazing Places to Stay

Wanderlust is a full-stack web application that allows users to explore, create, manage, and review property listings. Inspired by travel and accommodation booking platforms, it provides an interactive platform where users can discover places to stay and share their experiences through reviews.

The application is built using Node.js, Express.js, MongoDB, and EJS, following the MVC architecture for organized and maintainable code.

🚀 Live Demo

Live Application: https://wanderlust-340b.onrender.com/

✨ Features

1. Property Listings

Browse available property listings.

View detailed information about each property.

Display property title, description, images, price, location, and country.

Create new property listings.

Edit existing listings.

Delete property listings.

2. User Authentication

User registration and login.

Secure password hashing.

Session-based authentication using Passport.js.

User authentication and authorization.

Protected routes for authorized actions.

3. Reviews and Ratings

Add reviews to property listings.

Display reviews associated with each listing.

Delete reviews.

Maintain relationships between listings and reviews.

Automatically delete associated reviews when a listing is deleted.

4. Server-Side Validation

Validate incoming listing and review data using Joi.

Handle invalid requests.

Provide meaningful error messages.

5. Error Handling

Centralized error-handling middleware.

Custom Express error class.

Asynchronous error handling using reusable wrapper functions.

Handles invalid routes and application errors.

🛠️ Technology Stack

Category

Technology

Frontend

HTML, CSS, JavaScript

Templating Engine

EJS

Styling

Bootstrap

Backend

Node.js

Backend Framework

Express.js

Database

MongoDB Atlas

ODM

Mongoose

Authentication

Passport.js

Password Management

passport-local-mongoose

Validation

Joi

Session Management

Express Session

API Testing

Postman

Deployment

Render

Version Control

Git & GitHub

🏗️ Application Architecture

Wanderlust follows the Model-View-Controller (MVC) architecture.

Model: Handles database schemas and data operations using Mongoose.

View: Renders dynamic pages using EJS templates.

Controller: Handles application logic and processes incoming requests.

Routes: Define application endpoints and connect them to controllers.

Middleware: Handles authentication, authorization, validation, and error management.

Project Architecture

             User
               |
               v
          Express Routes
               |
               v
           Middleware
               |
               v
           Controllers
               |
          +----+----+
          |         |
          v         v
        Models    Views
          |         |
          v         v
       MongoDB    EJS Pages
          |
          v
      Database

📂 Project Structure

Wanderlust/
│
├── controllers/
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes/
│
├── middleware/
│
├── views/
│   ├── listings/
│   ├── includes/
│   └── users/
│
├── public/
│   ├── css/
│   └── js/
│
├── utils/
│
├── init/
│
├── app.js
├── middleware.js
├── schema.js
├── cloudConfig.js
├── package.json
├── .gitignore
└── README.md

The structure above represents the main application modules; your actual repository may contain additional files.
