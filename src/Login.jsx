import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
} from "firebase/auth";
import { auth } from "./Firebase";

function Login({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");

 async function handleSubmit(event) {
  event.preventDefault();
  setError("");

  try {
    if (isRegistering) {
      await createUserWithEmailAndPassword(auth, email, password);
    } else {
      await signInWithEmailAndPassword(auth, email, password);
    }

    if (onClose) {
      onClose();
    }
  } catch (err) {
    setError(err.message);
  }
}

async function handleGuestLogin() {
  setError("");

  try {
    await signInAnonymously(auth);

    if (onClose) {
      onClose();
    }
  } catch (err) {
    setError(err.message);
  }
}

  return (
    <div className="auth__overlay">
      <div className="auth__modal">
        <button
          className="auth__close"
          onClick={onClose}
          type="button"
        >
          ×
        </button>

        <h2 className="auth__title">
          {isRegistering ? "Create your account" : "Log in to Summarist"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            className="auth__input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <input
            className="auth__input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {error && (
            <div className="auth__error">
              {error}
            </div>
          )}

          <button className="btn auth__button" type="submit">
            {isRegistering ? "Sign up" : "Login"}
          </button>

          <button
            className="btn auth__button"
            type="button"
            onClick={handleGuestLogin}
          >
            Continue as Guest
          </button>
        </form>

        <button
          className="auth__switch"
          type="button"
          onClick={() => {
            setIsRegistering(!isRegistering);
            setError("");
          }}
        >
          {isRegistering
            ? "Already have an account? Login"
            : "Don't have an account? Sign up"}
        </button>
      </div>
    </div>
  );
}

export default Login;