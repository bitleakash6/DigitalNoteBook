# DigitalNoteBook Web Application

This project involves developing a backend application for a digital notebook platform, facilitating user authentication, note creation, retrieval, updating, and deletion. Additionally, users can share their notes with others and perform keyword-based searches to find relevant notes. The API aims to be secure, scalable, and efficient, ensuring a seamless user experience for managing and accessing notes.

## Features
- User sign up and login with Email and password
- User can view the list of Notes
- User can manage Notes (add, update, delete. get)

## Technologies Used
- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT) for authentication

# Installations

To install and run the DigitalNoteBook application locally, follow these steps:

- Clone the repository:
    ```bash
    git clone https://github.com/bitleakash6/DigitalNoteBook/
    ```

- Navigate to the project directory:
    ```bash
    cd DigitalNoteBook
    ```

- Install dependencies using npm:
    ```bash
    npm install
    ```

- Start the application:
    ```bash
    npm start
    ```

Now, you should have the DigitalNoteBook application up and running on your local machine.


# API Endpoints
## Authentication Endpoints
### Sign Up
- POST `/api/auth/signup `: Sign up a user
### Login
- POST `/api/auth/login`: Login a user

