import {
  useEffect,
  useState,
  useRef,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  checkHealth,
} from "../api";

import "./Dashboard.css";

export default function Dashboard() {

  const navigate = useNavigate();

  const [user, setUser] =
    useState(null);

  const [apiStatus, setApiStatus] =
    useState("checking");

  const [activeTab, setActiveTab] =
    useState("dashboard");

  const [avatar, setAvatar] =
    useState(null);

  const fileInputRef =
    useRef(null);

  /* LOAD USER */

  useEffect(() => {

    const stored =
      localStorage.getItem(
        "auth_user"
      );

    if (!stored) {

      navigate("/login");

      return;
    }

    const parsedUser =
      JSON.parse(stored);

    setUser(parsedUser);

    /* LOAD AVATAR */

    const savedAvatar =
      localStorage.getItem(
        `profile_avatar_${parsedUser.username}`
      );

    if (savedAvatar) {

      setAvatar(savedAvatar);
    }

    /* CHECK BACKEND */

    checkHealth()
      .then(() =>
        setApiStatus("online")
      )
      .catch(() =>
        setApiStatus("offline")
      );

  }, [navigate]);

  /* LOGOUT */

  const handleLogout = () => {

    localStorage.removeItem(
      "auth_user"
    );

    navigate("/login");
  };

  /* CHANGE AVATAR */

  const handleAvatarChange =
    (e) => {

      const file =
        e.target.files[0];

      if (!file) return;

      const reader =
        new FileReader();

      reader.onloadend = () => {

        setAvatar(
          reader.result
        );

        localStorage.setItem(
          `profile_avatar_${user.username}`,
          reader.result
        );
      };

      reader.readAsDataURL(file);
    };

  return (

    <div className="dashboard">

      {/* SIDEBAR */}

      <aside className="sidebar">

        <div>

          <h1 className="logo">
            SecureAuth
          </h1>

          <div className="sidebar-menu">

            {/* HOME */}

            <button
              className="menu-item"
              onClick={() =>
                navigate("/")
              }
            >

              Home

            </button>

            {/* DASHBOARD */}

            <button
              className={
                activeTab === "dashboard"
                  ? "menu-item active"
                  : "menu-item"
              }
              onClick={() =>
                setActiveTab("dashboard")
              }
            >

              Dashboard

            </button>

            {/* PROFILE */}

            <button
              className={
                activeTab === "profile"
                  ? "menu-item active"
                  : "menu-item"
              }
              onClick={() =>
                setActiveTab("profile")
              }
            >

              Profile

            </button>

            {/* SECURITY */}

            <button
              className={
                activeTab === "security"
                  ? "menu-item active"
                  : "menu-item"
              }
              onClick={() =>
                setActiveTab("security")
              }
            >

              Security

            </button>

          </div>

        </div>

        {/* LOGOUT */}

        <button
          className="logout-btn"
          onClick={handleLogout}
        >

          Logout

        </button>

      </aside>

      {/* MAIN */}

      <main className="main-content">

        {/* DASHBOARD TAB */}

        {activeTab === "dashboard" && (

          <>

            <div className="dashboard-header">

              <div>

                <p className="welcome-text">
                  Welcome Back 👋
                </p>

                <h1>
                  {user?.username}
                </h1>

              </div>

              <div className="online-status">

                <span
                  className={
                    apiStatus === "online"
                      ? "dot online"
                      : "dot offline"
                  }
                ></span>

                {apiStatus}

              </div>

            </div>

            {/* STATS */}

            <div className="stats-grid">

              <div className="stats-card">

                <h2>
                  99%
                </h2>

                <p>
                  Security Score
                </p>

              </div>

              <div className="stats-card">

                <h2>
                  24/7
                </h2>

                <p>
                  Monitoring
                </p>

              </div>

              <div className="stats-card">

                <h2>
                  Active
                </h2>

                <p>
                  Session Status
                </p>

              </div>

            </div>

          </>

        )}

        {/* PROFILE TAB */}

        {activeTab === "profile" && (

          <div className="profile-page">

            <h1 className="page-title">
              User Profile
            </h1>

            <div className="profile-card">

              {/* AVATAR */}

              <div
                className="avatar"
                onClick={() =>
                  fileInputRef.current.click()
                }
              >

                {avatar ? (

                  <img
                    src={avatar}
                    alt="avatar"
                    className="avatar-image"
                  />

                ) : (

                  user?.username
                    ?.charAt(0)
                    .toUpperCase()

                )}

              </div>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{
                  display: "none",
                }}
                onChange={
                  handleAvatarChange
                }
              />

              <h2>
                {user?.username}
              </h2>

              <p className="profile-role">
                Authenticated User
              </p>

              <div className="profile-info">

                <div>

                  <span>
                    Username
                  </span>

                  <strong>
                    {user?.username}
                  </strong>

                </div>

                <div>

                  <span>
                    Last Login
                  </span>

                  <strong>

                    {user?.loginAt
                      ? new Date(
                          user.loginAt
                        ).toLocaleString()
                      : "-"}

                  </strong>

                </div>

                <div>

                  <span>
                    Backend
                  </span>

                  <strong
                    className={
                      apiStatus === "online"
                        ? "status-online"
                        : "status-offline"
                    }
                  >

                    {apiStatus}

                  </strong>

                </div>

              </div>

            </div>

          </div>

        )}

        {/* SECURITY TAB */}

        {activeTab === "security" && (

          <div className="security-page">

            <h1 className="page-title">
              Security Overview
            </h1>

            <div className="security-panel">

              <div className="security-item">

                <span>
                  API Protection
                </span>

                <strong>
                  Enabled
                </strong>

              </div>

              <div className="security-item">

                <span>
                  Authentication
                </span>

                <strong>
                  Active
                </strong>

              </div>

              <div className="security-item">

                <span>
                  Session Encryption
                </span>

                <strong>
                  Secured
                </strong>

              </div>

              <div className="security-item">

                <span>
                  Database Status
                </span>

                <strong>
                  Connected
                </strong>

              </div>

            </div>

          </div>

        )}

      </main>

    </div>
  );
}