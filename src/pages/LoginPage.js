import {
  useState,
  useEffect,
} from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  loginUser,
} from "../api";

import "./AuthPage.css";

export default function LoginPage() {

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

  /* AUTO LOGIN */

  useEffect(() => {

    const auth =
      localStorage.getItem(
        "auth_user"
      );

    if (auth) {

      navigate("/dashboard");
    }

  }, [navigate]);

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

        await loginUser(
          form.username,
          form.password
        );

        localStorage.setItem(
          "auth_user",
          JSON.stringify({
            username:
              form.username,

            loginAt:
              Date.now(),
          })
        );

        setStatus({
          type: "success",
          msg:
            "Login berhasil",
        });

        setTimeout(() => {

          navigate("/dashboard");

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
          Login
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
            : "Login"}

        </button>

        {/* SWITCH */}

        <span className="switch-auth">

          Belum punya akun?

          <Link to="/register">
            Register
          </Link>

        </span>

      </form>

    </div>
  );
}