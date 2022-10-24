import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { URL } from "url";

beforeEach(() => {
  jest.spyOn(global, "fetch").mockImplementation(((url: string) =>
    Promise.resolve({
      json: jest.fn().mockResolvedValue(
        Promise.resolve(
          url.includes("/movie/")
            ? {
                results: [
                  {
                    poster_path: "",
                    title: "Spider-Man",
                    release_date: "2016-08-03",
                  },
                ],
              }
            : {
                results: [
                  {
                    poster_path: "",
                    name: "Vikings",
                    first_air_date: "2020-10-03",
                  },
                ],
              }
        )
      ),
    })) as any);
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("app test", () => {
  // beforeEach(() => {});

  it("should render the date", () => {
    render(<App />);
    const options = { weekday: "long", month: "long", day: "numeric" };
    const date = new Date();
    const day = date.toLocaleDateString("fr-FR", options as any);

    const time = date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    expect(screen.getByText(`${day}, ${time}`)).toBeInTheDocument();
  });

  it.only("should render titles popular movies and popular tv shows", () => {
    render(<App />);
    expect(screen.getByText("Derniers Films Populaires")).toBeInTheDocument();
    expect(screen.getByText("Dernières Séries Populaires")).toBeInTheDocument();
  });

  it("should display spider man movie", async () => {
    render(<App />);
      

    expect(await screen.findByText("Spider-Man")).toBeInTheDocument();
    expect(await screen.findByAltText("Spider-Man")).toBeInTheDocument();
    expect(await screen.findByText("3 août 2016")).toBeInTheDocument();

    expect(await screen.findByText("Vikings")).toBeInTheDocument();
    expect(await screen.findByAltText("Vikings")).toBeInTheDocument();
    expect(await screen.findByText("3 oct. 2020")).toBeInTheDocument();
  });
});
