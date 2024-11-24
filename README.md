# Car Store Backend

## Project Overview
The **Car Store Backend** is a comprehensive RESTful API designed to manage car inventory. Built with **Node.js**, **Express**, and **Mongoose**.

---

## Features

### Car Management
- Add, update, delete, and retrieve car information.
- Handle car details like brand, model, price, stock quantity, and category.

### Order Processing
- Place customer orders by selecting cars and specifying quantities.
- Validate the correctness of total price (price × quantity).
- Prevent orders for out-of-stock cars.

### Revenue Calculation
- Calculate the total revenue generated from completed orders.

### Data Validation
- Zod schema ensures that all incoming data are valid datatype.
---

## Technologies Used

- **Node.js**
- **Express**
- **Mongoose**
- **Zod**
- **TypeScript**

---

## API Endpoints

### Cars

| Method | Endpoint       | Description                          |
|--------|----------------|--------------------------------------|
| GET    | `/api/cars`    | Get all cars in the inventory   |
| POST   | `/api/cars`    | Add a new car to the inventory       |
| GET    | `/api/cars/:id`| Get details of a specific car   |
| PUT    | `/api/cars/:id`| Update car details                   |
| DELETE | `/api/cars/:id`| Delete a car from the inventory      |

---

### Orders

| Method | Endpoint              | Description                          |
|--------|------------------------|--------------------------------------|
| POST   | `/api/orders`          | Place a new order                    |
| GET    | `/api/orders/revenue`  | Get total revenue from orders   |

