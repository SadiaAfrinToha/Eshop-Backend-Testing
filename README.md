# Eshop-Backend-Testing

## Overview
A complete **E-Commerce REST API Testing Project** built and tested using **Postman** and **Apache JMeter**.

This project demonstrates:

- API testing using **Postman**
- Performance testing using **Apache JMeter**
- Authentication and login validation
- Product API testing
- Cart API validation
- Order placement testing
- Error handling and validation
- Load testing with **10, 30, and 50 users**

---

## Features Tested

### 1. Login API Testing
Tested multiple login scenarios:
- Valid login
- Invalid login
- Empty login fields

### 2. Product API Testing
- View / show products
- Validate product response

### 3. Cart API Testing
Tested cart-related scenarios:
- Valid add to cart
- Invalid cart request
- Out of stock product handling

### 4. Order API Testing
- Place order successfully
- Validate order placement response

---

## API Endpoints

| Endpoint       | Method | Description              |
|----------------|--------|--------------------------|
| `/login`       | POST   | User login               |
| `/products`    | GET    | Get all products         |
| `/cart`        | POST   | Add product to cart      |
| `/order`       | POST   | Place an order           |

---

## Postman Testing Included

This project contains a Postman collection with test cases for:

- Login API
- Product API
- Cart API
- Order API

### Scenarios Covered in Postman
- Positive test cases
- Negative test cases
- Empty field validation
- Invalid request validation
- Out of stock handling
- Response validation
- Status code validation

---
## JMeter Performance Testing Included

This project also contains **Apache JMeter performance testing** for:

- Login API
- Product API
- Add to Cart API
- Place Order API
### Load Testing Scenarios
JMeter tests were performed with:
- **10 Users**
- **30 Users**
- **50 Users**

### Performance Metrics Observed
- Response Time
- Throughput
- Error %
- Average Latency

---

## How to Run

### 1. Create Project Folder
- Open terminal / command prompt  
- Run:
```bash
mkdir eshop-backend-testing
cd eshop-backend-testing
npm init -y
npm install express
notepad server.js
node server.js
```

### **2. Check server is running in browser:**
```
http://localhost:3000/users
```

### 3. Run in postman
Use "eshop-backend-testing.postman_collection.json" file

### 4. Run in newman (optional)
```
npm install -g newman
newman run <your-collection-file>.json
```
### 5. Run in Apache JMeter
Use "eshop-backend-testing.jmix" file


## Testing
- Test scripts included in Postman collection
- Automated ID chaining using environment variables
- Validation for required fields
- Response time check

## Tech Stack
- Node.js
- Express.js
- Postman

