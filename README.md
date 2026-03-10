# Inventa B2B Inventory & Billing System

A professional B2B platform for inventory management and billing.

## Project Structure

- `src/`: React frontend source code.
- `backend/`: Express.js backend API.
- `db/`: Local MongoDB data (ignored by git).
- `public/`: Static assets.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (Local or Atlas)

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/akhila-220207/B2B--inventory-billing-system.git
   cd B2B--inventory-billing-system
   ```

2. **Install Dependencies:**
   Install both frontend and backend dependencies.
   ```bash
   npm install
   cd backend && npm install
   cd ..
   ```

3. **Environment Configuration:**
   Create a `.env` file in the `backend` directory based on `.env.example`.
   ```bash
   cp backend/.env.example backend/.env
   ```
   Edit `backend/.env` with your actual MongoDB URI and JWT Secret.

4. **Running the Application:**
   You can start both frontend and backend using the root-level script:
   ```bash
   npm run dev
   ```
   Alternatively, run the `start.bat` file on Windows.

## Scripts

- `npm run dev`: Starts frontend (3000) and backend (5000) concurrently.
- `npm start`: Starts only the React frontend.
- `cd backend && npm start`: Starts only the Express backend.

## Deployment

The frontend is ready for build using `npm run build`. The backend is designed to work with MongoDB Atlas for easy cloud deployment.
