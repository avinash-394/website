import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from './App.tsx'
import './index.css'
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';

<React.StrictMode>
  <BrowserRouter>
    <HelmetProvider>
    <App />
    </HelmetProvider>
  </BrowserRouter>
</React.StrictMode>
createRoot(document.getElementById("root")!).render(<App />);
