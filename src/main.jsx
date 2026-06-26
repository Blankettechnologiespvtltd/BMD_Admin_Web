<<<<<<< HEAD
/**
 * ENTRY POINT
 * ─────────────────────────────────────────────────────────────────────────────
 * React application bootstrap.
 * Mounts the App component into the #root div in index.html.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
=======
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
>>>>>>> d54c5c1c1b7062fb7ba33beb50a3fe692b30a08e
