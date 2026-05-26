import {
  useState,
  useEffect,
} from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  registerUser,
} from "../api";

import "./AuthPage.css";

export default function RegisterPage() {

  const navigate = useNavigate();

  const [form, setForm] =
    useState({
      username: "",
      password: "",
    });

  const [status, setStatus] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  /* AUTO LOGIN REDIRECT */

  useEffect(() => {

    const auth =
      localStorage.getItem(
        "auth_user"
      );

    if (auth) {

      navigate("/dashboard");
    }

  }, [navigate]);

  /* PASSWORD STRENGTH */

  const passwordStrength = (password) => {

    let score = 0;

    if (password.length >= 8)
      score++;

    if (/[A-Z]/.test(password))
      score++;

    if (/[0-9]/.test(password))
      score++;

    if (/[^A-Za-z0-9]/.test(password))
      score++;

    if (password.length >= 12)
      score++;

    let label = "";
    let color = "";
    let width = "0%";

    if (!password) {

      label = "";
      color = "transparent";
      width = "0%";

    } else if (score <= 2) {

      label = "Lemah";
      color = "#ff3b5c";
      width = "33%";

    } else if (score <= 4) {

      label = "Sedang";
      color = "#ffb347";
      width = "66%";

    } else {

      label = "Kuat";
      color = "#3ecf8e";
      width = "100%";
    }

    return {
      label,
      color,
      width,
    };
  };

  const strength =
    passwordStrength(
      form.password
    );

  /* HANDLE INPUT */

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  /* HANDLE SUBMIT */

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (
        !form.username ||
        !form.password
      ) {

        setStatus({
          type: "error",
          msg:
            "Username dan password wajib diisi",
        });

        return;
      }

      setLoading(true);

      try {

        await registerUser(
          form.username,
          form.password
        );

        setStatus({
          type: "success",
          msg:
            "Register berhasil",
        });

        setTimeout(() => {

          navigate("/login");

        }, 1200);

      } catch (err) {

        setStatus({
          type: "error",
          msg:
            err.message,
        });

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="auth-page">

      <form
        className="auth-card"
        onSubmit={handleSubmit}
      >

        {/* BACK BUTTON */}

        <Link
          to="/"
          className="back-home"
        >

          ← Back to Home

        </Link>

        <h1>
          Register
        </h1>

        {/* USERNAME */}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />

        {/* PASSWORD */}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        {/* STRENGTH BAR */}

        <div className="strength-wrapper">

          <div className="strength-bar">

            <div
              className="strength-fill"
              style={{
                width:
                  strength.width,

                background:
                  strength.color,
              }}
            ></div>

          </div>

          <p
            className="strength-text"
            style={{
              color:
                strength.color,
            }}
          >

            {strength.label}

          </p>

        </div>

        {/* STATUS */}

        {status && (

          <p className={status.type}>
            {status.msg}
          </p>

        )}

        {/* BUTTON */}

        <button
          type="submit"
          disabled={loading}
        >

          {loading
            ? "Loading..."
            : "Register"}

        </button>

        {/* SWITCH */}

        <span className="switch-auth">

          Sudah punya akun?

          <Link to="/login">
            Login
          </Link>

        </span>

      </form>

    </div>
  );
}