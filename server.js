const express = require('express');
const app = express();

app.use(express.json());

// ----------------------
// Dummy Database
// ----------------------
let users = [
  { id: 1, email: "test@gmail.com", password: "123456" }
];

let products = [
  { id: 1, name: "Phone", price: 20000, stock: 100 },
  { id: 2, name: "Laptop", price: 60000, stock: 3 }
];

let cart = [];
let orders = [];

// ----------------------
// 1. LOGIN API
// ----------------------
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password required"
    });
  }

  // Check user
  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials"
    });
  }

  return res.status(200).json({
    success: true,
    message: "Login successful",
    token: "abc123"
  });
});

// ----------------------
// 2. GET PRODUCTS
// ----------------------
app.get('/products', (req, res) => {
  return res.status(200).json({
    success: true,
    data: products
  });
});

// ----------------------
// 3. ADD TO CART
// ----------------------
app.post('/cart', (req, res) => {
  const { productId, quantity } = req.body;

  // Validation
  if (productId === undefined || quantity === undefined) {
    return res.status(400).json({
      success: false,
      message: "ProductId and quantity required"
    });
  }

  if (!Number.isInteger(productId) || !Number.isInteger(quantity)) {
    return res.status(400).json({
      success: false,
      message: "ProductId and quantity must be integers"
    });
  }

  if (quantity <= 0) {
    return res.status(400).json({
      success: false,
      message: "Quantity must be greater than 0"
    });
  }

  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found"
    });
  }

  if (product.stock < quantity) {
    return res.status(400).json({
      success: false,
      message: "Out of stock"
    });
  }

  // Check if product already exists in cart
  const existingItem = cart.find(item => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }

  console.log("Cart after add:", cart);

  return res.status(200).json({
    success: true,
    message: "Added to cart",
    cart
  });
});

// ----------------------
// 4. GET CART
// ----------------------
app.get('/cart', (req, res) => {
  const detailedCart = cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    return {
      productId: item.productId,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
      subtotal: product.price * item.quantity
    };
  });

  return res.status(200).json({
    success: true,
    data: detailedCart
  });
});

// ----------------------
// 5. PLACE ORDER
// ----------------------
app.post('/order', (req, res) => {
  console.log("Cart before order:", cart);

  if (cart.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Cart is empty"
    });
  }

  let total = 0;

  // First validate everything
  for (let item of cart) {
    const product = products.find(p => p.id === item.productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product with ID ${item.productId} not found`
      });
    }

    if (product.stock < item.quantity) {
      return res.status(400).json({
        success: false,
        message: `${product.name} is out of stock`
      });
    }

    total += product.price * item.quantity;
  }

  // Then reduce stock
  for (let item of cart) {
    const product = products.find(p => p.id === item.productId);
    product.stock -= item.quantity;
  }

  const order = {
    id: orders.length + 1,
    items: [...cart],
    total,
    status: "Placed",
    createdAt: new Date().toISOString()
  };

  orders.push(order);
  cart = [];

  console.log("Order placed:", order);
  console.log("Products after order:", products);

  return res.status(200).json({
    success: true,
    message: "Order placed",
    order
  });
});

// ----------------------
// 6. GET ORDERS
// ----------------------
app.get('/orders', (req, res) => {
  return res.status(200).json({
    success: true,
    data: orders
  });
});

// ----------------------
// 7. RESET DATA (Very useful for JMeter testing)
// ----------------------
app.post('/reset', (req, res) => {
  products = [
    { id: 1, name: "Phone", price: 20000, stock: 100 },
    { id: 2, name: "Laptop", price: 60000, stock: 3 }
  ];

  cart = [];
  orders = [];

  console.log("System reset complete");

  return res.status(200).json({
    success: true,
    message: "System reset successful"
  });
});

// ----------------------
// 8. SERVER
// ----------------------
app.listen(3000, () => {
  console.log('Server running on port 3000');
});