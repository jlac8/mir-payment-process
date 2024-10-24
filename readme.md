# Stripe Payment Process using React, Node.js, TypeScript, and Prisma 💳

## Project Description

This project implements a simple payment process using **Stripe** to handle payments, **React** for the frontend, **Node.js** for the backend, **TypeScript** for data validation, and **Prisma** as the ORM for database management.

The goal is to allow users to select a product on a web page and securely process the payment, with validation and transaction data persistence in the database.

## Technologies Used

- **Frontend**: React + TypeScript
- **Backend**: Node.js + Express + TypeScript
- **Database**: Prisma (PostgreSQL, MySQL, or any compatible database)
- **Payment API**: Stripe
- **Validation**: Zod (Bonus)

## Project Structure

```lua
/client   --> Contains the frontend code
/server   --> Contains the backend code
```

## Functional Requirements

### Frontend (React + TypeScript)

1. Create a simple React page where users can select a product (hardcoded details) and proceed with the payment.
2. Implement **Stripe.js** to handle payment input.
3. Capture card details and send the payment intent to the backend (Node.js).

### Backend (Node.js + TypeScript)

1. Set up an API endpoint `/create-payment-intent` using Express:
    - Receives payment information from the frontend.
    - Uses Stripe's API to create a payment intent.
    - Returns the "client secret" to the frontend to confirm the payment.

    Example:

```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/create-payment-intent', async (req, res) => {
  const { amount, currency } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
```

### Database (Prisma)

1. Create two tables: `User` and `Transaction` to store user details and transaction data.
2. After payment confirmation, store the transaction in the `Transaction` table using Prisma.

**Bonus**

- Include validation and error handling in both frontend and backend using Zod.
- Extend the app to handle subscription payments with Stripe.

## Installation Instructions

1. Clone the repository:

```bash
git clone https://github.com/jlac8/mir-payment-process.git
```

2. Install dependencies in both directories (`client/` and `server/`):

```bash
cd client
npm install

cd ../server
npm install
```

3. Set up environment variables:

    Create a `.env` file in the `server/` directory with your Stripe secret key:

```makefile
STRIPE_SECRET_KEY=your_stripe_secret_key
DATABASE_URL=your_database_url
```

4. Run the frontend and backend:

- Frontend:

```bash
cd client
npm start
```

- Backend:

```bash
cd server
npm run dev
```
