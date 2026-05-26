import {
  useEffect,
  useState,
  useRef,
} from "react";

import {
  Link,
} from "react-router-dom";

import "./LandingPage.css";

/* COUNTER */

function Counter({
  target,
  suffix = "",
}) {

  const [count, setCount] =
    useState(0);

  useEffect(() => {

    let start = 0;

    const step = target / 80;

    const timer = setInterval(() => {

      start += step;

      if (start >= target) {

        setCount(target);

        clearInterval(timer);

      } else {

        setCount(
          Math.floor(start)
        );
      }

    }, 16);

    return () =>
      clearInterval(timer);

  }, [target]);

  return (

    <span>
      {count}{suffix}
    </span>

  );
}

/* LANDING PAGE */

export default function LandingPage() {

  const videoRef =
    useRef(null);

  /* FORCE LOOP VIDEO */

  useEffect(() => {

    const video =
      videoRef.current;

    if (!video) return;

    const handleEnded = () => {

      video.currentTime = 0;

      video.play();
    };

    video.addEventListener(
      "ended",
      handleEnded
    );

    return () => {

      video.removeEventListener(
        "ended",
        handleEnded
      );
    };

  }, []);

  return (

    <main className="landing">

      {/* VIDEO BACKGROUND */}

      <video
        ref={videoRef}
        className="background-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
      >

        <source
          src="/videos/cyber-bg.mp4"
          type="video/mp4"
        />

      </video>

      {/* OVERLAY */}

      <div className="video-overlay"></div>

      {/* NAVBAR */}

      <nav className="navbar">

        <Link
          to="/"
          className="logo-link"
        >

          <div className="logo">
            SecureAuth
          </div>

        </Link>

        <div className="nav-buttons">

          <Link to="/login">

            <button className="nav-btn">
              Login
            </button>

          </Link>

          <Link to="/register">

            <button className="register-btn">
              Register
            </button>

          </Link>

        </div>

      </nav>

      {/* HERO */}

      <section className="hero">

        <div className="hero-badge">
          CYBER SECURITY
        </div>

        <h1>
          Welcome
        </h1>

        <p>
          Simple structure, but high
          security architecture for
          modern authentication systems.
        </p>

        <div className="hero-buttons">

          <Link to="/register">

            <button className="primary-btn">
              Get Started
            </button>

          </Link>

        </div>

        {/* STATS */}

        <div className="stats">

          <div className="card">

            <h2>

              <Counter
                target={1000}
                suffix="+"
              />

            </h2>

            <p>
              Users
            </p>

          </div>

          <div className="card">

            <h2>

              <Counter
                target={99}
                suffix="%"
              />

            </h2>

            <p>
              Security
            </p>

          </div>

          <div className="card">

            <h2>

              <Counter
                target={24}
                suffix="/7"
              />

            </h2>

            <p>
              Monitoring
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}