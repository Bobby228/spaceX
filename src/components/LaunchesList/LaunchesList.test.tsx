import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, waitFor, fireEvent, within } from "@testing-library/react";
import LaunchesList from "./LaunchesList";
import { renderWithProviders } from "../../tests/test-utils.tsx";

const mockLaunches = [
  {
    flight_number: 1,
    mission_name: "Test Mission 1",
    launch_year: "2020",
    launch_date_utc: "2020-01-01T00:00:00Z",
    rocket: {
      rocket_id: "falcon1",
      rocket_name: "Falcon 1",
      rocket_type: "type",
    },
    links: {
      mission_patch: "https://image.com/1.png",
      article_link: null,
      video_link: null,
    },
    details: "Some details 1",
    launch_success: true,
  },
];

const mockFetch = () =>
  vi.spyOn(global, "fetch").mockResolvedValue({
    json: async () => mockLaunches,
  } as any);

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("LaunchesList", () => {
  it("renders launches after fetch", async () => {
    mockFetch();

    renderWithProviders(<LaunchesList />);

    expect(await screen.findByText("Test Mission 1")).toBeInTheDocument();
    expect(screen.getByText("Falcon 1")).toBeInTheDocument();
  });

  it("opens modal when clicking See more", async () => {
    mockFetch();

    renderWithProviders(<LaunchesList />);

    await screen.findByText("Test Mission 1");

    fireEvent.click((await screen.findAllByText(/see more/i))[0]);

    const modal = document.querySelector(".modal");
    expect(modal).toBeInTheDocument();

    const missionTexts = within(modal as HTMLElement)
      .getAllByText("Test Mission 1");

    expect(missionTexts.length).toBeGreaterThan(0);

    expect(within(modal as HTMLElement).getByText("Falcon 1")).toBeInTheDocument();
    expect(within(modal as HTMLElement).getByText("Some details 1")).toBeInTheDocument();
  });

  it("closes modal when clicking close button", async () => {
    mockFetch();

    renderWithProviders(<LaunchesList />);

    await screen.findByText("Test Mission 1");

    fireEvent.click((await screen.findAllByText(/see more/i))[0]);

    const closeBtn = await screen.findByText("✖");
    fireEvent.click(closeBtn);

    await waitFor(() => {
      expect(screen.queryByText(/mission name:/i)).not.toBeInTheDocument();
    });
  });

  it("closes modal when clicking overlay", async () => {
    mockFetch();

    renderWithProviders(<LaunchesList />);

    await screen.findByText("Test Mission 1");

    fireEvent.click((await screen.findAllByText(/see more/i))[0]);

    const overlay = document.querySelector(".overlay");

    expect(overlay).toBeTruthy();

    fireEvent.click(overlay as HTMLElement);

    await waitFor(() => {
      expect(screen.queryByText(/mission name:/i)).not.toBeInTheDocument();
    });
  });

  it("does not crash on empty response", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      json: async () => [],
    } as any);

    renderWithProviders(<LaunchesList />);

    await waitFor(() => {
      expect(screen.queryByText("Test Mission 1")).not.toBeInTheDocument();
    });
  });
});