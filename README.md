# Chirp - A Full-Stack Social Media Application

Chirp is a modern, full-stack social media application inspired by platforms like X (formerly Twitter). It enables users to sign up, create posts with text and images, view a dynamic feed, interact with content from other users, and follow them. This project is built with a powerful stack of modern web technologies to ensure a scalable, responsive, and interactive experience.

## ✨ Features

- **User Authentication**: Secure and easy sign-up and sign-in functionality powered by Clerk.
- **Create & Share Posts**: Users can compose posts with descriptive text and upload images.
- **Infinite Scrolling Feed**: A performant, infinite-scrolling feed that dynamically loads more posts as the user scrolls down.
- **User Profiles**: Dedicated pages for each user, showcasing their profile information and a timeline of their posts.
- **Post Interactions**: Engage with posts by liking, commenting, and reposting.
- **Real-time Capabilities**: Built with Socket.IO for future real-time features like notifications and live updates.
- **Responsive Design**: Fully responsive and mobile-first design using Tailwind CSS, providing a seamless experience on any device.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (using the App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Authentication**: [Clerk](https://clerk.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: [Neon](https://neon.tech/) (PostgreSQL)
- **Image Hosting**: [ImageKit](https://imagekit.io/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Data Fetching & State Management**: [React Query (TanStack Query)](https://tanstack.com/query/latest) for robust server state management.
- **Real-time Communication**: [Socket.IO](https://socket.io/)

## 🚀 Getting Started

Follow these instructions to set up and run a local instance of the project for development and testing.

### Prerequisites

- Node.js (version 18 or later is recommended)
- npm (or another package manager like Yarn or pnpm)
- A Neon account for the database and an ImageKit account for image storage.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <YOUR_REPOSITORY_URL>
    cd <project-folder>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a file named `.env` in the root of your project and populate it with the necessary keys. 

    ```env
    # ImageKit for image hosting
    # Find these in your ImageKit dashboard
    NEXT_PUBLIC_PUBLIC_KEY=public_your_imagekit_public_key
    PRIVATE_KEY=private_your_imagekit_private_key
    NEXT_PUBLIC_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_url_endpoint

    # Neon Database Connection
    # This is the connection string for your Neon PostgreSQL database
    DATABASE_URL="postgresql://user:password@host:port/dbname?sslmode=require"

    # Clerk Authentication
    # Get these from your Clerk project settings
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key
    CLERK_SECRET_KEY=sk_test_your_clerk_secret_key

    # Clerk Webhook for syncing users to your database
    # This is required for creating user records in your DB upon sign-up
    SIGNING_SECRET=whsec_your_webhook_signing_secret

    # Ngrok (if using for local webhook testing)
    # Get this from your Ngrok dashboard
    NGROK_AUTHTOKEN=your_ngrok_auth_token
    ```

4.  **Run database migrations:**

    This command will sync your database schema with the Prisma schema file (`prisma/schema.prisma`).
    ```bash
    npx prisma migrate dev
    ```

5.  **Seed the database (Optional):**

    If you want to populate your database with initial data for testing, run the seed script.
    ```bash
    npx prisma db seed
    ```

6.  **Run the development server:**
    ```bash
    npm run dev
    ```

7.  Open [http://localhost:3000](http://localhost:3000) in your browser to see the application in action!

## 📜 Available Scripts

-   `npm run dev`: Starts the Next.js development server.
-   `npm run build`: Creates a production-ready build of the application.
-   `npm run start`: Starts the production server.
-   `npm run lint`: Lints the codebase using ESLint.
-   `npx prisma studio`: Opens the Prisma Studio, a GUI for your database.
