import { render, screen } from "@testing-library/react";
import Search from "./Search";
import { rest } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";

const server = setupServer();
import userEvent from "@testing-library/user-event";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("handles no data results", async () => {
  // ARRANGE
  server.use(
    rest.get("/api/search", (req, res, ctx) => {
      console.log(req);

      const empty = {
        data: {
          data: {
            data: {
              data: [],
            },
          },
        },
      };
      return res(ctx.json(empty));
    })
  );

  const user = userEvent.setup();

  render(<Search />);

  const searchInputElement = screen.getByRole("textbox");

  await user.type(searchInputElement, "xxxxx");

  await screen.findByRole("heading");

  expect(screen.getByRole("heading")).toHaveTextContent(/no results/i);
});
