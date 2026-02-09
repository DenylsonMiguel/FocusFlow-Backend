# FocusFlow-Backend

FocusFlow an app that lets you manage your tasks easily.

---

## Technologies Used

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
</p>

---

## Installation

Clone the repository:

```
git clone https://github.com/DenylsonMiguel/FocusFlow-Backend.git
```

Enter the project folder:

```
cd FocusFlow-Backend
```

Install dependencies:

```
npm install
```

---

## Configuration

Create a `.env` file in the project root:

Example:

```
PORT=3000
DB_URI=your_mongodb_url
```

---

## Running the Project

Development:

```
npm run dev
```

Production:

```
npm start
```

---

## API Endpoints

### Authentication

| Method | Endpoint              | Description         |
|--------|-----------------------|---------------------|
| POST   | /api/v0/auth/register | Register new user   |


---

## Request Example

### Register User

Request:

```
POST /api/v0/auth/register
{
  "name": "John Doe",
  "password": "123456"
}
```

Response:

```
{
  "id": "abc123",
  "name": "John Doe"
}
```

---

## Scripts

Available scripts:

```
{
  "start": "node index.js",
  "dev": "nodemon index.js",
  "test": "jest"
}
```

---

## Best Practices Used

- Separation of concerns
- Clean folder structure
- Input validation
- Standardized responses
- Environment variables
- Secure authentication

---

## Author

Denylson Miguel
<br>
[Github](https://github.com/DenylsonMiguel)
<br>
[Repository](https://github.com/DenylsonMiguel/FocusFlow-Backend.git)