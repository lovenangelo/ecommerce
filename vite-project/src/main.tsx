import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "./components/ui/toaster";
import { QueryClient, QueryClientProvider } from "react-query";
export const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </QueryClientProvider>
    </Provider>
    <Toaster />
  </React.StrictMode>
);
