/* eslint-disable react-refresh/only-export-components */
import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "../src/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "react-query";
import { store, persistor } from "../src/redux/store";
export const queryClient = new QueryClient();

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </QueryClientProvider>{" "}
      <Toaster />
    </Provider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
