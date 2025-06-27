# backend-soumic

This is the backend of the **Soumic project**, built with **Node.js**, **Express**, and **MySQL**.

---

## Requirements

- Node.js (v18 or newer)
- MySQL or MariaDB
- `.env` file with database credentials (see below)

---

## Setup

1. Install dependencies:

```bash
npm install
```

2. Environment configuration:

The project uses `.env` files for each environment:

- `.env.development` → used when running `npm run dev`
- `.env.production` → used in production or Railway

Each file defines values like:

````env
DB_HOST=...
DB_USER=...
DB_PASSWORD=...
DB_NAME=...

The correct `.env` file is loaded automatically based on the value of NODE_ENV.

3. Start the backend server:

```bash
npm run dev
````

The server will run at: [http://localhost:3001](http://localhost:3001)

---

## Generate a password hash (for admin login)

Use this script to generate a bcrypt hash:

```bash
node src/generateHash.js yourPassword
```

Copy the output into the `password_hash` column of the `admin` table.

---

## API Routes

### Artists

- `GET /artists`
- `POST /artists`
- `PUT /artists/:id`
- `DELETE /artists/:id`

### POIs (stages and amenities)

- `GET /poi`

### Admin

- `POST /admin/login`

---

## Conventions

- No `console.log` or `console.error` in final code
- All comments are written in **English**
- Async logic uses `async/await` only

---

## About

This backend is part of a full-stack project.  
It exposes a REST API for use with a compatible frontend (React, Vue, etc.).

---

## License

MIT
