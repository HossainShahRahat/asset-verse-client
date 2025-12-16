# AssetVerse — Client Application

A comprehensive frontend interface for the **AssetVerse Asset Management System**.  
This application enables organizations to streamline asset tracking, facilitate employee requests, and visualize administrative insights through an intuitive dashboard.

---

## Project Overview

AssetVerse is designed to bridge the gap between HR administrators and employees in managing company resources.  
The client-side application provides **distinct experiences based on user roles**:

- **HR Managers**
  - Maintain asset inventories
  - Handle asset requests
  - View analytical dashboards
  - Manage subscriptions and upgrades

- **Employees**
  - Browse available assets
  - Submit asset requests
  - Track approval statuses
  - Manage asset returns

This repository contains **only the frontend (client-side)** codebase, built with **React (Vite)** and styled using **Tailwind CSS**.

---

## Live Demo

🔗 **https://asset-verse-project.netlify.app/**

---

## Key Features

### Human Resources (Admin) Module
- **Analytical Dashboard**  
  Real-time visualizations of asset distribution and request statistics using interactive charts.
- **Asset Inventory Management**  
  Add, edit, and categorize assets (Returnable vs Non-returnable).
- **Request Handling**  
  Centralized interface to approve or reject employee requests with search and filtering.
- **Employee Management**  
  Monitor team members and track asset allocations.
- **Subscription Integration**  
  Stripe-powered payment interface for upgrading company plans.

### Employee Module
- **Asset Catalog**  
  Searchable and filterable list of available company assets.
- **Request Lifecycle Management**  
  Submit requests and track their status (Pending, Approved, Rejected).
- **Asset Return System**  
  Return assigned assets or cancel pending requests.
- **Team View**  
  View team members and organizational affiliations.

### General Features
- **Authentication**  
  Secure login and registration using Email/Password and Google OAuth.
- **Responsive Design**  
  Optimized for desktop, tablet, and mobile devices.
- **Interactive UI**  
  Modal confirmations, toast notifications, and smooth UI feedback.
- **PDF Generation**  
  Generate and print asset detail reports.

---

## Tech Stack

This project uses a modern React ecosystem:

- **Core:** React.js (Vite)
- **Styling:** Tailwind CSS, DaisyUI
- **Routing:** React Router DOM
- **State & Auth:** Context API, Firebase Authentication
- **Data Fetching:** Axios
- **Charts:** Recharts
- **Payments:** Stripe Elements / React Stripe.js
- **UI Utilities:** SweetAlert2, React Icons

---

## Folder Structure

```

src/
├── components/        # Reusable UI components
├── hooks/             # Custom hooks (useAuth, useAxiosSecure, etc.)
├── layout/            # Layout wrappers
├── pages/
│   ├── Home/          # Landing page
│   ├── Dashboard/     # HR & Employee dashboards
│   ├── Login/         # Authentication pages
│   └── Shared/        # Error pages, loaders
├── providers/         # Context providers
├── routes/            # Route definitions & guards
└── assets/            # Static assets

````

---

## Local Setup Instructions

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/your-username/asset-verse-client.git
cd asset-verse-client
````

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**
   Create a `.env.local` file in the root directory.

4. **Run the development server**

```bash
npm run dev
```

---

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Firebase Configuration
VITE_APIKEY=your_firebase_api_key
VITE_AUTHDOMAIN=your_firebase_auth_domain
VITE_PROJECTID=your_firebase_project_id
VITE_STORAGEBUCKET=your_firebase_storage_bucket
VITE_MESSAGINGSENDERID=your_firebase_messaging_sender_id
VITE_APPID=your_firebase_app_id

# Backend API
VITE_API_URL=http://localhost:5000

# Payment Gateway
VITE_Payment_Gateway_PK=your_stripe_publishable_key
```

> ⚠️ Never commit `.env` files to GitHub.

---

## Available Scripts

* `npm run dev` — Runs the app in development mode
* `npm run build` — Builds the app for production
* `npm run preview` — Previews the production build
* `npm run lint` — Runs ESLint for code quality checks

---

## Deployment Notes

This project is optimized for **Netlify** and **Vercel**.

### Netlify

* **Build Command:** `npm run build`
* **Publish Directory:** `dist`
* Add a `_redirects` file:

```
/* /index.html 200
```

### Vercel

* Auto-detects Vite configuration
* Ensure environment variables are added in the dashboard

---

## Known Limitations

* **Server Dependency**
  This frontend requires a running backend server for authentication, asset management, and payment processing.
* **Browser Support**
  Optimized for modern browsers (Chrome, Firefox, Edge, Safari).

---

## License

This project is licensed under the **MIT License**.

---

