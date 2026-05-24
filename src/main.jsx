// Import StrictMode to help find problems during development.
import { StrictMode } from "react";

// Import createRoot to render React into the HTML page.
import { createRoot } from "react-dom/client";

// Import QueryClient to create the TanStack Query cache system.
import { QueryClient } from "@tanstack/react-query";

// Import QueryClientProvider to give React Query access to the app.
import { QueryClientProvider } from "@tanstack/react-query";

// Import the main App component.
import App from "./App.jsx";

// Import the CSS file.
import "./App.css";

// Create one query client for the whole application.
const queryClient = new QueryClient();

// Render the React app inside the root div from index.html.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* QueryClientProvider allows useQuery and useMutation to work. */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);