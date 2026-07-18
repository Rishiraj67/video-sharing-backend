# 🎬 YouTube Backend API

A production-inspired RESTful backend API for a YouTube-like video sharing platform built using **Node.js**, **Express.js**, **MongoDB**, and **Mongoose**. This project provides secure authentication, video management, playlists, comments, likes, subscriptions, dashboard analytics, and file uploads using Cloudinary.

It follows a clean MVC architecture and demonstrates industry-standard backend development practices.

---

# 📖 Table of Contents

* Project Overview
* Features
* Tech Stack
* Project Structure
* Installation
* Environment Variables
* Running the Project
* API Modules
* Authentication
* Database Models
* File Upload Flow
* Dashboard Analytics
* Error Handling
* Future Improvements
* Learning Outcomes
* Contributing
* License

---

# 📌 Project Overview

This backend powers a YouTube-inspired application where users can:

* Register and login securely
* Upload and manage videos
* Create and manage playlists
* Comment on videos
* Like videos, comments, and tweets
* Subscribe to channels
* View dashboard statistics
* Manage user profiles
* Upload avatars and cover images

The project is built with scalability and maintainability in mind by following REST API principles and the MVC architecture.

---

# 🚀 Features

## 👤 User Authentication

* User Registration
* User Login
* User Logout
* JWT Authentication
* Refresh Token Authentication
* Password Hashing using bcrypt
* Secure Cookie Authentication

---

## 👥 User Management

* Get Current User
* Update Account Details
* Change Password
* Update Avatar
* Update Cover Image
* Watch History

---

## 🎥 Video Management

* Upload Video
* Get All Videos
* Get Video by ID
* Update Video
* Delete Video
* Publish / Unpublish Video

---

## 💬 Comments

* Add Comment
* Update Comment
* Delete Comment
* Get Video Comments

---

## ❤️ Likes

* Like / Unlike Videos
* Like / Unlike Comments
* Like / Unlike Tweets
* Get Liked Videos

---

## 📃 Playlists

* Create Playlist
* Update Playlist
* Delete Playlist
* Get Playlist by ID
* Get User Playlists
* Add Video to Playlist
* Remove Video from Playlist

---

## 🔔 Subscriptions

* Subscribe / Unsubscribe Channel
* Get Channel Subscribers
* Get Subscribed Channels

---

## 📊 Dashboard

* Total Videos
* Total Views
* Total Subscribers
* Total Likes
* Channel Videos

---

## 📝 Tweets

* Create Tweet
* Update Tweet
* Delete Tweet
* Get User Tweets

---

# 🛠 Tech Stack

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* Mongoose

## Authentication

* JWT (JSON Web Tokens)
* bcrypt

## File Upload

* Multer
* Cloudinary

## Utilities

* dotenv
* Cookie Parser
* CORS

## Development Tools

* Nodemon
* Postman
* Git
* GitHub

---

# 📂 Project Structure

```text
src
│
├── controllers
│
├── models
│
├── routes
│
├── middlewares
│
├── db
│
├── utils
│
├── constants
│
├── app.js
│
└── index.js

public/
│
└── temp/

package.json

.env
```

---

# ⚙️ Installation

## Clone the Repository

```bash
git clone https://github.com/yourusername/youtube-backend.git
```

---

## Navigate to Project

```bash
cd youtube-backend
```

---

## Install Dependencies

```bash
npm install
```

---

## Create Environment Variables

Create a `.env` file in the project root.

```env
PORT=8000

MONGODB_URI=

ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=

REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

CORS_ORIGIN=http://localhost:3000
```

---

# ▶️ Running the Project

Development Mode

```bash
npm run dev
```

Production Mode

```bash
npm start
```

---

# 🔌 API Modules

| Module         | Description             |
| -------------- | ----------------------- |
| Authentication | Register, Login, Logout |
| Users          | Profile Management      |
| Videos         | CRUD Operations         |
| Comments       | Video Comments          |
| Likes          | Like System             |
| Playlists      | Playlist Management     |
| Tweets         | Tweet CRUD              |
| Dashboard      | Channel Analytics       |
| Subscriptions  | Channel Subscription    |
| Health Check   | API Health              |

---

# 📚 Sample API Endpoints

## Authentication

| Method | Endpoint                      |
| ------ | ----------------------------- |
| POST   | `/api/v1/users/register`      |
| POST   | `/api/v1/users/login`         |
| POST   | `/api/v1/users/logout`        |
| POST   | `/api/v1/users/refresh-token` |

---

## Users

| Method | Endpoint                        |
| ------ | ------------------------------- |
| GET    | `/api/v1/users/current-user`    |
| PATCH  | `/api/v1/users/update-account`  |
| PATCH  | `/api/v1/users/change-password` |
| PATCH  | `/api/v1/users/avatar`          |
| PATCH  | `/api/v1/users/cover-image`     |

---

## Videos

| Method | Endpoint                  |
| ------ | ------------------------- |
| GET    | `/api/v1/videos`          |
| POST   | `/api/v1/videos`          |
| GET    | `/api/v1/videos/:videoId` |
| PATCH  | `/api/v1/videos/:videoId` |
| DELETE | `/api/v1/videos/:videoId` |

---

## Comments

| Method | Endpoint                        |
| ------ | ------------------------------- |
| GET    | `/api/v1/comments/:videoId`     |
| POST   | `/api/v1/comments/:videoId`     |
| PATCH  | `/api/v1/comments/c/:commentId` |
| DELETE | `/api/v1/comments/c/:commentId` |

---

## Likes

| Method | Endpoint                            |
| ------ | ----------------------------------- |
| POST   | `/api/v1/likes/toggle/v/:videoId`   |
| POST   | `/api/v1/likes/toggle/c/:commentId` |
| POST   | `/api/v1/likes/toggle/t/:tweetId`   |

---

## Playlists

| Method | Endpoint                                        |
| ------ | ----------------------------------------------- |
| POST   | `/api/v1/playlists`                             |
| GET    | `/api/v1/playlists/:playlistId`                 |
| PATCH  | `/api/v1/playlists/:playlistId`                 |
| DELETE | `/api/v1/playlists/:playlistId`                 |
| PATCH  | `/api/v1/playlists/add/:videoId/:playlistId`    |
| PATCH  | `/api/v1/playlists/remove/:videoId/:playlistId` |

---

## Dashboard

| Method | Endpoint                   |
| ------ | -------------------------- |
| GET    | `/api/v1/dashboard/stats`  |
| GET    | `/api/v1/dashboard/videos` |

---

# 🔐 Authentication

This project uses **JWT Authentication**.

After successful login:

* Access Token is generated.
* Refresh Token is generated.
* Protected routes require authentication.
* Authentication middleware verifies the JWT before allowing access.

---

# 🗄 Database Models

The project contains the following MongoDB collections:

* User
* Video
* Comment
* Like
* Playlist
* Subscription
* Tweet

These models are connected using MongoDB references (`ObjectId`) to maintain relationships between users and resources.

---

# 📤 File Upload Flow

The project uses **Multer** for handling multipart/form-data uploads and **Cloudinary** for cloud storage.

Workflow:

```text
Client
   │
   ▼
Express Route
   │
   ▼
Multer Middleware
   │
   ▼
Temporary Local Storage
   │
   ▼
Cloudinary Upload
   │
   ▼
MongoDB Stores Cloudinary URL
```

Uploaded files include:

* User Avatar
* Cover Image
* Video Files
* Video Thumbnails

---

# 📊 Dashboard Analytics

The dashboard provides useful statistics for channel owners, including:

* Total Videos
* Total Views
* Total Subscribers
* Total Likes
* Uploaded Videos

MongoDB Aggregation Framework is used for analytics and statistics.

---

# ⚠️ Error Handling

The project includes centralized error handling with:

* Custom API Error class
* Custom API Response class
* Async Handler
* Proper HTTP Status Codes

Common status codes:

* 200 – Success
* 201 – Resource Created
* 400 – Bad Request
* 401 – Unauthorized
* 404 – Resource Not Found
* 500 – Internal Server Error

---

# 🔮 Future Improvements

Some features planned for future versions:

* Video Search
* Video Recommendations
* Notifications
* Real-time Chat
* Redis Caching
* Docker Support
* CI/CD Pipeline
* Swagger/OpenAPI Documentation
* Unit & Integration Testing
* Email Verification
* Password Reset via Email

---

# 🎯 Learning Outcomes

This project helped me gain practical experience with:

* REST API Development
* MVC Architecture
* Express.js
* MongoDB & Mongoose
* JWT Authentication
* Authorization
* Password Hashing
* Multer File Uploads
* Cloudinary Integration
* MongoDB Aggregation
* CRUD Operations
* Express Middleware
* API Design
* Error Handling
* Backend Project Structure

---

# 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository.
2. Create a new branch.
3. Commit your changes.
4. Push to your branch.
5. Open a Pull Request.

---

# 👨‍💻 Author

**Rishi Raj**

Backend Developer | Computer Science Student

---

# 📜 License

This project is intended for educational and portfolio purposes. Feel free to use and modify it for learning.
