Absolutely! Here’s a ready-to-use **README.md** file you can drop directly into your repository:

````markdown
# ISENTRY Dashboard Assessment

## 📌 Overview

This project is a dashboard implementation for the **ISENTRY Dashboard Assessment**. It includes:

* **Authentication-related settings** (Change Password, Delete Account).
* A **user-friendly dashboard layout** with a sidebar and responsive design.
* Built with **React + Next.js** using **TailwindCSS** and **ShadCN UI components** for styling.
* Deployment ready on **Vercel**.

The goal of this project is to demonstrate clean UI implementation, modular React component design, and modern frontend practices.

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Sifan23/isentry-assessment-dashboard.git
cd isentry-assessment-dashboard
````

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Your app will be running at: [http://localhost:3000](http://localhost:3000).

### 4. Build for production

```bash
npm run build
npm start
```

---

## 🚀 Deployment

The project is configured for **Vercel deployment**.

1. Push your repository to GitHub.
2. Import it into [Vercel](https://vercel.com).
3. Use the default **build command**:

   ```bash
   npm run build
   ```
4. Use the default **output directory**: `.next`

---

## 📂 Project Structure

```
.
├── app/ # Next.js App Directory
│ ├── settings/
│ │ └── page.tsx # Settings page (Change Password, Delete Account)
│ ├── users/
│ │ ├── columns.tsx # User table columns
│ │ ├── data-table.tsx # User table component
│ │ └── page.tsx # Users page
│ ├── components/ # Reusable UI components
│ │ ├── ActionCell.tsx
│ │ ├── AppSidebar.tsx
│ │ ├── Navbar.tsx
│ │ ├── TablePagination.tsx
│ │ ├── UserCreateModal.tsx
│ │ └── Welcome.tsx
│ ├── hooks/ # Custom hooks
│ │ ├── use-mobile.ts
│ │ ├── useDeleteUser.tsx
│ │ ├── userEditSheet.tsx
│ │ └── useUsers.ts
│ └── lib/ # API & helper files
│ └── api.ts
├── public/ # Static assets (logo, favicon)
├── styles/ # Global styles
├── package.json # Dependencies and scripts
└── README.md # Project documentation
```

---

## 🔑 Features Implemented

* **Sidebar Navigation** with Lucide icons.
* **Collapsible Sidebar** for better UX on smaller screens.
* **Light/Dark Mode** toggle for accessibility.
* **Dashboard Homepage**:
  * Added **metrics/cards** to display key data.
  * **Bar Graph** and **Pie Chart** for visual analytics.
* **Settings Page**:
  * Change Password (with validation: new & confirm password).
  * Delete Account (with confirmation dialog).
* **Users Management**:
  * Table to **show users** with **pagination, sorting, and search**.
  * **Create, update, and delete user rows** directly from the table.
* **Data Fetching** using **Axios** & **Tanstack Query** for efficient API calls.
* **Form Handling** with **React Hook Form** and **Yup** for validation.
* **Responsive Layout** (works on desktop & mobile).
* **Reusable Components** for dashboard, settings,ActionCell modules.


---

## 📎 Resources

* [Next.js Documentation](https://nextjs.org/docs)
* [TailwindCSS](https://tailwindcss.com)
* [ShadCN UI](https://ui.shadcn.com)
* [Lucide Icons](https://lucide.dev)


