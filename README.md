# React Hook Form + TanStack Query Profile Form

This project is a User Profile Form built with React, React Hook Form, TanStack Query, and JSON Server. The application loads profile data from a mock REST API and allows users to update their profile information.

The form includes username, email, bio, and notifications fields with validation and loading states. React Hook Form manages form validation, dirty state, reset functionality, and error handling. TanStack Query handles server data fetching, caching, mutations, and cache invalidation.

The project also simulates a server-side email conflict using `conflict@example.com` and displays the error directly under the email field using `setError()`.

Technologies used:
- React
- Vite
- React Hook Form
- TanStack Query
- JSON Server
- JavaScript
- CSS

How to run the project:

```bash
npm install
npm run start:all
```

Open:
```txt
http://localhost:5173
```

Mock API:
```txt
http://localhost:3001/profile
```


