/**
 * @file Login.tsx
 * @description Login page component for PopFix. Handles user authentication,
 * form validation, error display, and success feedback through a popup.
 *
 * This component allows users to log in using their email and password,
 * validates inputs, and provides visual feedback during the process.
 */

import React, { useState } from "react";
import "../styles/Login.scss";
import { Link } from "react-router-dom";
import { validateLoginForm } from "../utils/validators";
import { loginUser } from "../utils/authApi";
import logo from "../assets/logo.png";
import facebook from "../assets/facebook.webp";
import github from "../assets/github.png";
import google from "../assets/google.png";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: undefined });
    setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const { isValid, errors: validationErrors } = validateLoginForm(formData);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await loginUser(formData);
      showSuccess("Login successful! Redirecting...");
      setTimeout(() => {
        window.location.href = "/home";
      }, 1500);
    } catch (error: any) {
      setFormError(error.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  const showSuccess = (message: string) => {
    let popup = document.getElementById("popup-message");
    if (!popup) {
      popup = document.createElement("div");
      popup.id = "popup-message";
      document.body.appendChild(popup);
    }

    popup.className = "popup-message popup-success popup-show";
    popup.textContent = message;

    clearTimeout((popup as any)._timeout);
    (popup as any)._timeout = setTimeout(() => {
      popup?.classList.remove("popup-show");
    }, 3000);
  };

  return (
    <>
      <div className="hero-topbar">
        <a href="/">
          <img src={logo} className="topbar-logo" alt="Nexmeet Logo" />
          <span id="topbar-logo-text" className="topbar-logo-text">
            Nexmeet
          </span>
        </a>
      </div>
      <div className="app-container">
        <div className="login-wrapper">
          <Link
            to="/"
            className="back-arrow-login"
            aria-label="Volver a la página principal"
          >
            <span aria-hidden="true">←</span>
          </Link>

          <div className="login-box">
            <h2>Inicia Sesión</h2>

            <form className="form" onSubmit={handleSubmit} noValidate>
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                id="email"
                placeholder="tu@email.com"
                className="input"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                aria-label="Ingresa tu correo electrónico"
                aria-required="true"
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && (
                <span className="error-message" role="alert">
                  {errors.email}
                </span>
              )}

              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                placeholder="********"
                className="input"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                aria-label="Ingresa tu contraseña"
                aria-required="true"
                aria-invalid={errors.password ? "true" : "false"}
              />
              {errors.password && (
                <span className="error-message" role="alert">
                  {errors.password}
                </span>
              )}

              <button
                type="submit"
                className="button"
                disabled={loading}
                aria-label={loading ? "Iniciando sesión" : "Iniciar sesión"}
              >
                {loading ? "Loading..." : "Iniciar sesión"}
              </button>
              {formError && (
                <div
                  className="error-message"
                  style={{ marginTop: 8 }}
                  role="alert"
                  aria-live="polite"
                >
                  {formError}
                </div>
              )}
            </form>

            <a href="/forgot-password" className="forgot">
              ¿Olvidaste tu contraseña?
            </a>

            <p className="register-text">
              ¿No tienes cuenta?{" "}
              <span className="register-link-wrapper">
                <a href="/register" className="register-link">
                  Regístrate aquí
                </a>
              </span>
            </p>

            {/* Redes sociales */}
            <div className="social-media-container">
              <a href="#" className="social-link">
                <img src={google} className="social-logo" alt="Google Logo" />
              </a>
              <a href="#" className="social-link">
                <img
                  src={facebook}
                  className="social-logo"
                  alt="Facebook Logo"
                />
              </a>
              <a href="#" className="social-link">
                <img src={github} className="social-logo" alt="Github Logo" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
