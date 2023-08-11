import { screen } from "@testing-library/react";
import Search from "../src/components/Search";
import { rest } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";
import { fireEvent, render } from "../utils/test-utils";
import userEvent from "@testing-library/user-event";
const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

/* The code is testing the behavior of the `Search` component when there are no search results. */
test("renders no data results", async () => {
  server.use(
    rest.get("http://localhost:8000/api/search", (req, res, ctx) => {
      req.url.searchParams.get("asdfasdf");
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

  expect(screen.getByRole("heading")).toHaveTextContent(/no results/i);
});

/* The code is testing the behavior of the `Search` component when there are search results. */
test("renders 5 items max if there are results", async () => {
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

  expect(screen.getAllByRole("button")).toHaveLength(5);
});

/* The code is testing the behavior of the `Search` component when the user scrolls to the bottom of
the page. */
test("renders 5 more items and adds to current list when scrolled to bottom", async () => {
  const initialData = [
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

  const additionalData = [
    {
      image: {
        url: "/item1.jpg",
      },
      name: "Item 1",
      subtitle: "Subtitle for Item 1",
      category: "Category A",
      id: 6,
    },
    {
      image: {
        url: "/item2.jpg",
      },
      name: "Item 2",
      subtitle: "Subtitle for Item 2",
      category: "Category B",
      id: 7,
    },
    {
      image: {
        url: "/item3.jpg",
      },
      name: "Item 3",
      subtitle: "Subtitle for Item 3",
      category: "Category A",
      id: 8,
    },
    {
      image: {
        url: "/item4.jpg",
      },
      name: "Item 4",
      subtitle: "Subtitle for Item 4",
      category: "Category C",
      id: 9,
    },
    {
      image: {
        url: "/item5.jpg",
      },
      name: "Item 5",
      subtitle: "Subtitle for Item 5",
      category: "Category B",
      id: 10,
    },
  ];

  server.use(
    rest.get("http://localhost:8000/api/search", (req, res, ctx) => {
      // Simulate the request for the initial data
      if (!req.url.searchParams.has("page")) {
        return res(
          ctx.json({
            data: { next_page_url: "/api/search?page=2", data: initialData },
          })
        );
      }

      // Simulate the request for additional data
      return res(
        ctx.json({ data: { next_page_url: null, data: additionalData } })
      );
    })
  );

  render(<Search />);

  const searchInputElement = screen.getByRole("textbox");
  await userEvent.type(searchInputElement, "handbags");
  await screen.findAllByRole("button");

  // Scroll the container to the bottom
  const scrollContainer = screen.getByTestId("search-scroll-container");
  fireEvent.scroll(scrollContainer, { target: { scrollY: 10000 } });

  // Wait for the additional items to appear
  await screen.findAllByRole("button");

  // Check that the total number of items is now 10
  const allItems = screen.getAllByRole("button");
  expect(allItems).toHaveLength(10);
});
