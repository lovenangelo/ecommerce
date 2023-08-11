import { screen } from "@testing-library/react";
import Search from "../src/components/Search";
import { rest } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";
import { render } from "../utils/test-utils";
import userEvent from "@testing-library/user-event";
const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

/* The code is testing the behavior of the `Search` component when there are no search results. */
test("renders no data results", async () => {
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

  render(<Search />);

  const searchInputElement = screen.getByRole("textbox");

  await userEvent.type(searchInputElement, "xxxxx");

  await screen.findByRole("heading");

  expect(screen.getByRole("heading")).toHaveText(/no results/i);
});

/* The code is testing the behavior of the `Search` component when there are 5 search results and a
"see more" button is displayed. */
test("renders 5 search results and shows 'see more' button", async () => {
  server.use(
    rest.get("http://localhost:8000/api/search", (req, res, ctx) => {
      req.url.searchParams.get("handbags");

      const data = [
        {
          image: {
            url: "/item1.jpg",
          },
          name: "Item 1",
          subtitle: "Subtitle for Item 1",
          category: "Category A",
          id: 1,
        },
        {
          image: {
            url: "/item2.jpg",
          },
          name: "Item 2",
          subtitle: "Subtitle for Item 2",
          category: "Category B",
          id: 2,
        },
        {
          image: {
            url: "/item3.jpg",
          },
          name: "Item 3",
          subtitle: "Subtitle for Item 3",
          category: "Category A",
          id: 3,
        },
        {
          image: {
            url: "/item4.jpg",
          },
          name: "Item 4",
          subtitle: "Subtitle for Item 4",
          category: "Category C",
          id: 4,
        },
        {
          image: {
            url: "/item5.jpg",
          },
          name: "Item 5",
          subtitle: "Subtitle for Item 5",
          category: "Category B",
          id: 5,
        },
      ];

      return res(
        ctx.json({
          data: {
            next_page_url: "/",
            data: data,
          },
        })
      );
    })
  );

  render(<Search />);

  const searchInputElement = screen.getByRole("textbox");

  await userEvent.type(searchInputElement, "handbags");

  await screen.findAllByRole("button");

  const buttonSeeMoreElement = screen.getByText(/see more/i);

  expect(screen.getAllByRole("button")).toHaveLength(6);
  expect(buttonSeeMoreElement).toBeInTheDocument();
});
