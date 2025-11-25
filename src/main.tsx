import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Hide loading screen function
const hideLoadingScreen = () => {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    loadingScreen.style.transition = 'opacity 0.5s';
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }
};

// Ensure root element exists
const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Root element not found!");
  hideLoadingScreen();
  document.body.innerHTML = '<div style="text-align:center;padding:50px;font-family:sans-serif;"><h1>Error Loading App</h1><p>Please refresh the page.</p></div>';
} else {
  try {
    // Create root and render app
    const root = createRoot(rootElement);
    
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
    
    // Hide loading screen after React renders
    setTimeout(hideLoadingScreen, 100);
  } catch (error) {
    console.error("Error rendering app:", error);
    hideLoadingScreen();
    rootElement.innerHTML = '<div style="text-align:center;padding:50px;font-family:sans-serif;"><h1>Error Loading App</h1><p>Please refresh the page.</p><p style="color:#999;font-size:12px;">Error: ' + error + '</p></div>';
  }
}
