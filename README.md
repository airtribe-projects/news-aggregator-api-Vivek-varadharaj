# News Aggregator API

A RESTful API for aggregating personalized news articles based on user preferences. Built with Node.js, Express, and MongoDB.

## Features

- **User Authentication**: Secure user registration and login with JWT tokens
- **User Preferences**: Manage personalized news preferences
- **Personalized News**: Fetch news articles based on user preferences
- **Caching**: Efficient caching mechanism for news articles
- **Error Handling**: Comprehensive error handling middleware
- **Validation**: Input validation for all endpoints

## Prerequisites

- Node.js >= 18.0.0
- MongoDB database (local or cloud)
- News API key from [NewsAPI](https://newsapi.org/)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd news-aggregator-api-Vivek-varadharaj
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/news_aggregator
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=1d
API_KEY=your-news-api-key
NEWS_API_BASE_URL=https://newsapi.org/v2
BCRYPT_SALT_ROUNDS=12
```

4. Update the environment variables with your own values.

## Running the Application

### Development Mode
```bash
npm run dev
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

### Production Mode
```bash
node src/server.js
```

## API Endpoints

### Authentication

#### POST `/users/signup`
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123",
  "preferences": ["technology", "science"]
}
```

**Response:** `200 OK`
```json
{}
```

#### POST `/users/login`
Login with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

**Response:** `200 OK`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Preferences

#### GET `/users/preferences`
Get user preferences (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "preferences": ["technology", "science"]
}
```

#### PUT `/users/preferences`
Update user preferences (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "preferences": ["technology", "science", "sports"]
}
```

**Response:** `200 OK`
```json
{}
```

### News

#### GET `/news`
Get personalized news articles (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "news": [
    {
      "title": "Article Title",
      "description": "Article description",
      "url": "https://example.com/article",
      "source": "Source Name",
      "publishedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

## Error Responses

### 400 Bad Request
```json
{
  "status": "error",
  "message": "Email and password are required"
}
```

### 401 Unauthorized
```json
{
  "status": "error",
  "message": "Invalid email or password"
}
```

### 409 Conflict
```json
{
  "status": "error",
  "message": "User already exists"
}
```

### 500 Internal Server Error
```json
{
  "status": "error",
  "message": "Internal Server Error"
}
```

## Testing

Run the test suite:
```bash
npm test
```

The tests cover:
- User signup and login
- Preference management
- News fetching
- Error handling
- Authentication middleware

## Project Structure

```
news-aggregator-api-Vivek-varadharaj/
├── src/
│   ├── app.js                 # Express app configuration
│   ├── server.js              # Server entry point
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   ├── env.js             # Environment configuration
│   │   └── jwt.js             # JWT configuration
│   ├── middlewares/
│   │   ├── auth.middleware.js # JWT authentication
│   │   └── error.middleware.js # Error handling
│   ├── models/
│   │   ├── user_model.js      # User schema
│   │   └── preferences.model.js # Preferences schema
│   ├── modules/
│   │   ├── auth/              # Authentication module
│   │   ├── preferences/       # Preferences module
│   │   ├── news/              # News module
│   │   └── user/              # User module
│   ├── router/
│   │   └── index.js           # Route configuration
│   └── utils/
│       ├── apiClient.js       # HTTP client for external APIs
│       └── cache.js           # Caching utility
├── test/
│   └── server.test.js         # Test suite
├── postman_collection.json    # Postman collection
├── package.json
└── README.md
```

## Technologies Used

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Axios** - HTTP client
- **dotenv** - Environment variables
- **TAP** - Testing framework
- **Supertest** - HTTP assertions

## Postman Collection

A Postman collection is included in the repository (`postman_collection.json`). Import it into Postman to easily test all endpoints.

To use the collection:
1. Import `postman_collection.json` into Postman
2. Set the `base_url` variable to `http://localhost:3000`
3. Start testing!

The collection includes:
- All API endpoints
- Authentication examples
- Error case examples
- Automatic token saving on login

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port | No | 3000 |
| `NODE_ENV` | Environment mode | No | development |
| `MONGODB_URI` | MongoDB connection string | Yes | - |
| `JWT_SECRET` | Secret key for JWT | Yes | - |
| `JWT_EXPIRES_IN` | JWT expiration time | No | 1d |
| `API_KEY` | NewsAPI key | Yes | - |
| `NEWS_API_BASE_URL` | NewsAPI base URL | No | https://newsapi.org/v2 |
| `BCRYPT_SALT_ROUNDS` | bcrypt salt rounds | No | 12 |

## Security Features

- Password hashing using bcrypt
- JWT-based authentication
- Input validation
- Error handling to prevent information leakage
- Secure HTTP headers

## Caching

The API implements caching for news articles to improve performance and reduce external API calls. News articles are cached based on user preferences for 5 minutes (300 seconds).

## License

ISC

## Author

Airtribe
