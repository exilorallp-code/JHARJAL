import { useState, type FormEvent } from "react";
import { supabase } from "../lib/supabase";

type Status = "idle" | "submitting" | "success" | "duplicate" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UNIQUE_VIOLATION = "23505";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [validationError, setValidationError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = email.trim().toLowerCase();

    if (!EMAIL_PATTERN.test(normalized)) {
      setValidationError("Please enter a valid email address.");
      return;
    }

    setValidationError(null);
    setStatus("submitting");

    const { error } = await supabase
      .from("waitlist_signups")
      .insert({ email: normalized });

    if (!error) {
      setStatus("success");
      setEmail("");
    } else if (error.code === UNIQUE_VIOLATION) {
      setStatus("duplicate");
    } else {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="waitlist-message waitlist-message--success" role="status">
        You're on the list. We'll be in touch soon.
      </p>
    );
  }

  return (
    <form className="waitlist-form" onSubmit={handleSubmit} noValidate>
      <div className="waitlist-form__row">
        <label className="visually-hidden" htmlFor="waitlist-email">
          Email address
        </label>
        <input
          id="waitlist-email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== "submitting") setStatus("idle");
          }}
          disabled={status === "submitting"}
          aria-invalid={validationError ? true : undefined}
          aria-describedby="waitlist-feedback"
        />
        <button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Joining..." : "Join the waitlist"}
        </button>
      </div>
      <div id="waitlist-feedback" className="waitlist-feedback" aria-live="polite">
        {validationError && <span className="waitlist-message--error">{validationError}</span>}
        {!validationError && status === "duplicate" && (
          <span className="waitlist-message--info">This email is already on the list.</span>
        )}
        {!validationError && status === "error" && (
          <span className="waitlist-message--error">
            Something went wrong. Please try again in a moment.
          </span>
        )}
      </div>
    </form>
  );
}
