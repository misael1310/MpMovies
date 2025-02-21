import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store.tsx";
import "./index.css";
import App from "./App.tsx";
import { MainLayout } from "./layouts/MainLayout/index.tsx";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Provider store={store}>
        <MainLayout>
          <App />
        </MainLayout>
      </Provider>
    </StrictMode>,
  );
} else {
  throw new Error("Root element not found!");
}
