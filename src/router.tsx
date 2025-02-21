import { HashRouter, Routes, Route } from "react-router";
import { MainLayout } from "./layouts/MainLayout";
import App from "./App";

export default function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<App />} />
          <Route
            path="/media/:id"
            element={<p className="text-5xl text-white">Coming Soon!</p>}
          ></Route>
          <Route
            path="*"
            element={
              <p className="text-5xl text-white">
                NotFoundPage Better Style Coming Soon!
              </p>
            }
          />
        </Route>
      </Routes>
    </HashRouter>
  );
}
