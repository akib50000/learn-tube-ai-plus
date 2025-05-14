
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add Airbnb's Circular font as system-ui will provide a close approximation
// In a production app, you would use the actual Circular font with proper licensing
document.head.innerHTML += `
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
  </style>
`;

createRoot(document.getElementById("root")!).render(
  <App />
);
