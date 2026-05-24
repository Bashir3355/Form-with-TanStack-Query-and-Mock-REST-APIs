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


today I will demonstrate my React Hook Form and TanStack Query assignment.

In this project, I created a User Profile Form using React, React Hook Form, TanStack Query, and JSON Server. The form loads user profile data from a mock REST API using useQuery and automatically fills the form using reset(data).

The form includes username, email, bio, and notifications fields with validation and error handling. I also used useMutation to update the profile using a PUT request.

After a successful update, the app automatically invalidates the cache using invalidateQueries and resets the form state. The Save button stays disabled until changes are made using formState.isDirty.

I also simulated a server-side email conflict using conflict@example.com and displayed the error directly under the email field using setError().

To run the project, I used npm install and npm run start:all which starts both the React app and JSON Server.
