// Import the ProfileForm component.
import ProfileForm from "./components/ProfileForm";

// App is the main layout component.
function App() {
  return (
    // Main page wrapper centers the form.
    <main className="page">
      {/* ProfileForm contains all form and API logic. */}
      <ProfileForm />
    </main>
  );
}

// Export App so main.jsx can render it.
export default App;