Here’s a clean **README.md** for your Mail Service backend based on your schema and features:

---

# 📧 Mail Service Backend

A GraphQL-based backend for sending, receiving, and managing emails between registered users.
Includes authentication, authorization, filtering, and real-time updates via subscriptions.

---

## 🚀 Features

* **User Management**

  * Register and log in users
  * Secure password hashing (bcrypt)
  * JWT-based authentication
  * Role-based authorization

* **Email Management**

  * Send and receive emails
  * Mark emails as read
  * Filter by subject, sender/receiver, or read status
  * Pagination support for inbox and sent emails

* **Real-Time Updates**

  * WebSocket subscriptions for new incoming emails
  * In-memory PubSub (development mode)

* **Security**

  * CSRF prevention for HTTP requests
  * Token validation for queries, mutations, and subscriptions

---

## 🛠 Tech Stack

* **Runtime:** Node.js + TypeScript
* **API:** GraphQL Yoga
* **Database:** PostgreSQL + Prisma ORM
* **Real-time:** `graphql-ws` + `ws`
* **Auth:** JWT + bcrypt
* **PubSub:** In-memory (development)

---

## 📜 GraphQL API

### **Queries**

```graphql
me: User!
inbox(take: Int = 10, skip: Int = 0, filters: EmailFilters): [Email!]!
sentEmail(take: Int = 10, skip: Int = 0, filters: EmailFilters): [Email]!
```

### **Mutations**

```graphql
registerUser(input: RegisterUserInput!): AuthPayload!
loginUser(email: String!, password: String!): AuthPayload!
sendEmail(input: SendEmail): Email!
markAsRead(input: MarkAsReadInput!): MarkAsReadPayload!
```

### **Subscriptions**

```graphql
newEmail(userId: ID!): Email!
```

---

## 📦 Installation

```bash
git clone <repo-url>
cd mail-service
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file with:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/maildb
JWT_SECRET=your_jwt_secret
```

---

## ▶️ Running the Server

```bash
npm run dev
```

Server will start on:
**HTTP:** `http://localhost:4000/graphql`
**WebSocket:** `ws://localhost:4000/graphql`

---
Got it — you basically want a **GraphQL API documentation** for your Mail Service based on the queries, mutations, and subscriptions you’ve written.

Here’s a clean **`API_DOCUMENTATION.md`** style draft:

---

## 📝 Mutations

### **1. Register User**

Registers a new user.

```graphql
mutation registerUser {
  registerUser(
    input: { email: "new@email.com", password: "123", firstName: "bar" }
  ) {
    token
    user {
      id
      email
      firstName
      lastName
    }
  }
}
```

**Response Example:**

```json
{
  "data": {
    "registerUser": {
      "token": "JWT_TOKEN",
      "user": {
        "id": "USER_ID",
        "email": "new@email.com",
        "firstName": "bar",
        "lastName": null
      }
    }
  }
}
```

---

### **2. Login User**

Logs in an existing user.

```graphql
mutation loginUser {
  loginUser(email: "new@email1.com", password: "123") {
    token
    user {
      id
      email
      firstName
      lastName
    }
  }
}
```

---

### **3. Send Email**

Sends an email to a registered user.

```graphql
mutation sendEmail {
  sendEmail(
    input: {
      to: "new@email1.com",
      subject: "test email 1",
      body: "this is some dummy text for the text"
    }
  ) {
    id
    body
    subject
    createdAt
  }
}
```

---

### **4. Mark Emails as Read**

Marks selected or all emails as read.
If `ids` is empty → **mark all as read**.

```graphql
mutation markAsRead {
  markAsRead(
    input: { ids: ["0a49c20e-2065-42ca-b280-266f92200139"] }
  ) {
    count
  }
}
```

---

## 🔍 Queries

### **1. Get Current User**

```graphql
query me {
  me {
    id
    email
    firstName
    lastName
  }
}
```

---

### **2. Sent Emails**

Retrieves sent emails with pagination and filters.

```graphql
query sentEmails {
  sentEmail(skip: 0, take: 5, filters: { read: false }) {
    id
    subject
    body
    createdAt
    read
    receiver {
      email
    }
  }
}
```

---

### **3. Inbox**

Retrieves received emails with pagination and filters.

```graphql
query inbox {
  inbox(take: 5, skip: 0, filters: { email: "new@email.com" }) {
    subject
    body
    createdAt
    read
    sender {
      email
    }
  }
}
```

---

## 📡 Subscriptions

### **1. New Email Notification**

Listens for new incoming emails for a given user.

```graphql
subscription subscription {
  newEmail(userId: "cf6c2a0b-0926-4e80-8465-9fb36d11d654") {
    subject
    body
    createdAt
    read
    sender {
      email
    }
  }
}
```

**Note:** Requires WebSocket connection via `graphql-ws`.

---

## 📌 Filters Reference

**`EmailFilters` input:**

```graphql
input EmailFilters {
  read: Boolean       # Filter by read/unread status
  subject: String     # Filter by subject (contains match)
  email: String       # For inbox: filter by sender email
                      # For sentEmail: filter by receiver email
}
```

---

