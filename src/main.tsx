import { createRoot } from "react-dom/client";
import "./index.css";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import ConfigProvider from "antd/es/config-provider/index";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router/index.tsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider>
        <Toaster position="top-right" richColors closeButton={false} />
        <RouterProvider router={router} />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
);
