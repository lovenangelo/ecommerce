import { render, screen } from "@testing-library/react";
import Search from "../src/components/Search";
import { rest } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
const server = setupServer();
import userEvent from "@testing-library/user-event";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("handles no data results", async () => {
  server.use(
    rest.get("http://localhost:8000/api/search", (_, res, ctx) => {
      return res(
        ctx.json({
          data: {
            data: [],
          },
        })
      );
    })
  );

  render(
    <QueryClientProvider client={queryClient}>
      <Search />
    </QueryClientProvider>
  );

  const searchInputElement = screen.getByRole("textbox");

  await userEvent.type(searchInputElement, "xxxxx");

  await screen.findByRole("heading");

  expect(screen.getByRole("heading")).toHaveTextContent(/no results/i);
});
