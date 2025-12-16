#AssetVerse - Client ApplicationA comprehensive frontend interface for the AssetVerse Asset Management System. This application enables organizations to streamline asset tracking, facilitate employee requests, and visualize administrative insights through an intuitive dashboard.

##Project OverviewAssetVerse is designed to bridge the gap between HR administrators and employees regarding company resource management. The client-side application provides distinct experiences based on user roles:

* **HR Managers** can maintain asset inventories, handle requests, view analytical dashboards, and manage subscriptions.
* **Employees** can browse available assets, submit requests, track approval statuses, and manage returns.

This repository contains the source code for the frontend user interface, built with React and styled with Tailwind CSS.

##Live Demo[https://asset-verse-project.netlify.app/]

##Key Features###Human Resources (Admin) Module* **Analytical Dashboard**: Real-time visualization of asset distribution and request statistics using interactive charts.
* **Asset Inventory Management**: Interface for adding and updating company assets with categorization (Returnable vs. Non-returnable).
* **Request Handling**: Centralized view to approve or reject asset requests with search and filtering capabilities.
* **Employee Management**: Tools to oversee team members and monitor asset allocations.
* **Subscription Integration**: Payment processing interface for upgrading company plans via Stripe.

###Employee Module* **Asset Catalog**: Searchable and filterable list of available company assets.
* **Request Lifecycle**: Ability to submit requests and track their status (Pending, Approved, Rejected).
* **Asset Management**: Functionality to return assets once usage is complete or cancel pending requests.
* **Team View**: Visibility into team structure and affiliations.

###General Features* **Authentication**: Secure login and registration using email/password and social providers (Google).
* **Responsive Design**: Fully adaptive layout optimized for desktop, tablet, and mobile devices.
* **Interactive UI**: Modal-based confirmations, toast notifications for user feedback, and dynamic theme support.
* **PDF Generation**: Capability to generate and print asset detail reports.

##Tech StackThis project utilizes a modern React ecosystem:

* **Core**: React.js (Vite)
* **Styling**: Tailwind CSS, DaisyUI
* **Routing**: React Router DOM
* **State Management & Auth**: Context API, Firebase Authentication
* **Data Fetching**: Axios
* **Visualization**: Recharts
* **Payments**: Stripe Elements / React Stripe.js
* **UI Components**: SweetAlert2 (Notifications), React Icons

##Folder Structure```
src/
├── components/        # Reusable UI components (Navbar, Footer, etc.)
├── hooks/             # Custom hooks (useAxiosSecure, useAuth, etc.)
├── layout/            # Layout wrappers (MainLayout, DashboardLayout)
├── pages/
│   ├── Home/          # Landing page components
│   ├── Dashboard/     # HR and Employee dashboard views
│   ├── Login/         # Authentication pages
│   └── Shared/        # Shared views (Error pages, Loaders)
├── providers/         # Context providers (AuthProvider)
├── routes/            # Route definitions and private route guards
└── assets/            # Static images and global styles

```

##Local Setup InstructionsPrerequisites: Node.js (v16+) and npm/yarn installed.

1. **Clone the repository**
```bash
git clone https://github.com/your-username/](https://github.com/HossainShahRahat/asset-verse-client/asset-verse-client.git
cd asset-verse-client

```


2. **Install dependencies**
```bash
npm install

```


3. **Configure Environment Variables**
Create a `.env.local` file in the root directory (see example below).
4. **Run the development server**
```bash
npm run dev

```



##Environment VariablesThis application requires the following environment variables to function correctly. Create a `.env.local` file in the project root:

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

##Available Scripts* `npm run dev`: Runs the app in development mode.
* `npm run build`: Builds the app for production to the `dist` folder.
* `npm run lint`: Runs ESLint to check for code quality issues.
* `npm run preview`: Locally previews the production build.

##Deployment NotesThis project is optimized for deployment on platforms like Netlify or Vercel.

**For Netlify:**
Ensure the build command is set to `npm run build` and the publish directory is set to `dist`. If using client-side routing (React Router), ensure a `_redirects` file exists in the `public` folder containing `/* /index.html 200` or configure rewrites in `netlify.toml`.

**For Vercel:**
The platform typically auto-detects Vite settings. Ensure environment variables are added to the deployment settings dashboard.

##Known Limitations* **Server Dependency**: This frontend application relies on a running backend server (AssetVerse Server) to function. Authentication tokens, asset data, and payment processing will not work without a valid API connection.
* **Browser Compatibility**: Optimized for modern evergreen browsers (Chrome, Firefox, Safari, Edge).

##LicenseThis project is licensed under the MIT License.

##Contact**Shah Rahat Hossain**
