import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./providers/theme-provider.tsx";
import { Toaster } from "sonner";
import ReactQueryProvider from "./providers/react-query-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQueryProvider>
      <ThemeProvider defaultTheme="light" storageKey="themeStorage">
        <Toaster richColors={true} />
        <App />
      </ThemeProvider>
    </ReactQueryProvider>
  </StrictMode>
);
