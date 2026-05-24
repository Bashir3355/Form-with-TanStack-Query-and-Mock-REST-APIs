// Import useEffect to run code when server data changes.
import { useEffect } from "react";

// Import React Hook Form tools.
import { useForm } from "react-hook-form";

// Import TanStack Query tools for fetching, mutation, and cache control.
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Import API helper functions.
import { fetchProfile, updateProfile } from "../api/profileApi";

// Create the ProfileForm component.
function ProfileForm() {
  // queryClient lets us invalidate cached data after a successful save.
  const queryClient = useQueryClient();

  // useForm manages form state, validation, errors, dirty state, and reset.
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isDirty },
  } = useForm({
    // Default values prevent uncontrolled input issues.
    defaultValues: {
      username: "",
      email: "",
      bio: "",
      notifications: false,
    },
  });

  // useQuery fetches profile data from JSON Server.
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    // Required query key from the assignment.
    queryKey: ["userProfile"],

    // Function that performs GET request.
    queryFn: fetchProfile,
  });

  // This effect runs when the server data finishes loading.
  useEffect(() => {
    // If data exists, fill the form with server values.
    if (data) {
      // reset(data) hydrates the form and clears dirty state.
      reset(data);
    }
  }, [data, reset]);

  // useMutation handles updating profile data.
  const mutation = useMutation({
    // mutationFn runs the PUT request.
    mutationFn: updateProfile,

    // onSuccess runs when the server update succeeds.
    onSuccess: (updatedData) => {
      // Force React Query to refetch fresh profile data.
      queryClient.invalidateQueries({
        queryKey: ["userProfile"],
      });

      // Reset form with updated data and clear dirty flags.
      reset(updatedData);
    },

    // onError runs when updateProfile rejects or fails.
    onError: (serverError) => {
      // Check if the server error belongs to the email field.
      if (serverError.field === "email") {
        // Show server validation error under the email input.
        setError("email", {
          type: "server",
          message: serverError.message,
        });
      }
    },
  });

  // This function runs when the form is submitted.
  function onSubmit(formData) {
    // Send form data to the mutation.
    mutation.mutate(formData);
  }

  // Show loading block while useQuery is loading.
  if (isLoading) {
    return (
      <section className="card loading-box">
        Loading profile data...
      </section>
    );
  }

  // Show error block if data loading fails.
  if (isError) {
    return (
      <section className="card error-box">
        {error.message}
      </section>
    );
  }

  return (
    <section className="card">
      <h1>User Profile Form</h1>

      <p className="subtitle">
        React Hook Form handles form state. TanStack Query handles server state.
      </p>

      {/* Semantic form required by the assignment. */}
      {/* handleSubmit validates first, then runs onSubmit. */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Username label connected to input by htmlFor and id. */}
        {/* register connects username to React Hook Form validation. */}
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Enter username"
          {...register("username", {
            required: "Username is required.",
          })}
        />

        {/* Username error message layer. */}
        {/* Shows only when username has a validation error. */}
        {errors.username && (
          <p className="error">{errors.username.message}</p>
        )}

        {/* Email label connected to email input. */}
        {/* Email uses required and regex validation. */}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter email"
          {...register("email", {
            required: "Email is required.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
              message: "Please enter a valid email address.",
            },
          })}
        />

        {/* Email error message layer. */}
        {/* Also displays server conflict error from setError. */}
        {errors.email && (
          <p className="error">{errors.email.message}</p>
        )}

        {/* Bio label connected to textarea. */}
        {/* Bio is long text, so textarea is used. */}
        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          rows="5"
          placeholder="Write your bio"
          {...register("bio")}
        />

        {/* Notifications checkbox label. */}
        {/* Checkbox stores true or false value. */}
        <label className="checkbox-row">
          <input
            type="checkbox"
            {...register("notifications")}
          />
          Receive notifications
        </label>

        {/* Save button is disabled when form has no changes. */}
        {/* It is also disabled while mutation is pending. */}
        <button
          type="submit"
          disabled={!isDirty || mutation.isPending}
        >
          {mutation.isPending ? "Saving..." : "Save Profile"}
        </button>

        {/* This message explains why the button is disabled. */}
        {/* isDirty becomes true only after user changes a field. */}
        {!isDirty && (
          <p className="hint">
            Make a change to enable the Save button.
          </p>
        )}

        {/* Success message after mutation succeeds. */}
        {/* Shows user that the profile was saved. */}
        {mutation.isSuccess && (
          <p className="success">
            Profile saved successfully.
          </p>
        )}
      </form>
    </section>
  );
}

// Export component so App.jsx can use it.
export default ProfileForm;