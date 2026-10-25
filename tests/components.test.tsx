import { describe, expect, it } from "vitest";
import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Accordion from "@/components/ui/Accordion";
import AdventureFilters from "@/components/adventures/AdventureFilters";
import AdventureCard from "@/components/adventures/AdventureCard";
import DestinationsExplorer from "@/components/destinations/DestinationsExplorer";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import RelatedAdventures from "@/components/adventures/RelatedAdventures";
import AdventureDetails from "@/components/adventures/AdventureDetails";
import { adventures } from "@/data/adventures";

const setRoute = (p: string, s = "") =>
  (globalThis as unknown as { __setRoute: (p: string, s?: string) => void }).__setRoute(p, s);
const wait = (ms: number) => act(async () => { await new Promise((r) => setTimeout(r, ms)); });

describe("Accordion", () => {
  const items = [
    { question: "Q1?", answer: "A1" },
    { question: "Q2?", answer: "A2" },
  ];
  it("opens first item, toggles, and exposes aria state", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);
    const b1 = screen.getByRole("button", { name: /Q1/ });
    const b2 = screen.getByRole("button", { name: /Q2/ });
    expect(b1).toHaveAttribute("aria-expanded", "true");
    expect(b2).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("A1")).toBeInTheDocument();
    await user.click(b2);
    expect(b2).toHaveAttribute("aria-expanded", "true");
    expect(b1).toHaveAttribute("aria-expanded", "false");
    expect(b2).toHaveAttribute("aria-controls");
    await user.click(b2);
    expect(b2).toHaveAttribute("aria-expanded", "false");
  });
});

describe("AdventureCard", () => {
  it("shows placeholder price or 'Contact for pricing' and links to the detail page", () => {
    const withPrice = adventures.find((a) => a.price)!;
    const noPrice = adventures.find((a) => !a.price)!;
    const { unmount } = render(<AdventureCard adventure={withPrice} />);
    expect(screen.getByText(withPrice.price!)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: withPrice.title })).toHaveAttribute("href", `/adventures/${withPrice.slug}`);
    unmount();
    render(<AdventureCard adventure={noPrice} />);
    expect(screen.getByText("Contact for pricing")).toBeInTheDocument();
  });
});

describe("AdventureFilters", () => {
  it("filters by search, difficulty, duration, category; shows empty state and clears", async () => {
    const user = userEvent.setup();
    render(<AdventureFilters />);
    const count = () => screen.getByRole("status").textContent;
    expect(count()).toContain("6 adventures");

    const search = screen.getByLabelText("Search adventures");
    await user.type(search, "waterfall");
    expect(count()).toContain("1 adventure found");
    await user.clear(search);

    await user.type(search, "zzzz");
    expect(screen.getByText(/No adventures match/)).toBeInTheDocument();
    await user.click(screen.getAllByRole("button", { name: /clear filters/i })[0]);
    expect(count()).toContain("6 adventures");

    const diff = screen.getByRole("group", { name: "Difficulty" });
    await user.click(within(diff).getByRole("button", { name: "Easy" }));
    expect(count()).toContain("3 adventures");
    expect(within(diff).getByRole("button", { name: "Easy" })).toHaveAttribute("aria-pressed", "true");

    const dur = screen.getByRole("group", { name: "Duration" });
    await user.click(within(dur).getByRole("button", { name: "Day trip" }));
    expect(count()).toContain("1 adventure found");

    const cat = screen.getByRole("group", { name: "Category" });
    await user.click(within(cat).getByRole("button", { name: "Camping" }));
    expect(screen.getByText(/No adventures match/)).toBeInTheDocument();
  });
});

describe("DestinationsExplorer", () => {
  it("searches destinations and shows related adventures", async () => {
    const user = userEvent.setup();
    render(<DestinationsExplorer />);
    expect(screen.getByRole("status")).toHaveTextContent("6 destinations");
    const search = screen.getByLabelText("Search destinations");
    await user.type(search, "skardu");
    expect(screen.getByRole("status")).toHaveTextContent("1 destination");
    expect(screen.getByRole("link", { name: /Camping Under the Stars/ })).toBeInTheDocument();
    await user.clear(search);
    await user.type(search, "xxxx");
    expect(screen.getByText("No destinations found")).toBeInTheDocument();
  });
});

describe("Gallery + Lightbox", () => {
  it("filters, opens dialog, navigates by keyboard, closes with Escape and restores scroll", async () => {
    const user = userEvent.setup();
    render(<GalleryGrid />);
    await user.click(screen.getByRole("button", { name: "Camping" }));
    expect(screen.getByRole("status")).toHaveTextContent("Showing 4 photos");

    await user.click(screen.getAllByRole("button", { name: /Open image/ })[0]);
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(document.body.style.overflow).toBe("hidden");
    expect(within(dialog).getByText("1 / 4")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Close image viewer" })).toHaveFocus();

    await user.keyboard("{ArrowRight}");
    expect(within(dialog).getByText("2 / 4")).toBeInTheDocument();
    await user.keyboard("{ArrowLeft}{ArrowLeft}");
    expect(within(dialog).getByText("4 / 4")).toBeInTheDocument(); // wraps

    await user.click(screen.getByRole("button", { name: "Next image" }));
    expect(within(dialog).getByText("1 / 4")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    await wait(500);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.body.style.overflow).not.toBe("hidden");
  });
});

describe("Header / mobile menu", () => {
  it("marks the active link, opens mobile menu, closes on link click", async () => {
    setRoute("/adventures/mountain-trekking");
    const user = userEvent.setup();
    render(<Header />);
    const primary = screen.getByRole("navigation", { name: "Primary" });
    expect(within(primary).getByRole("link", { name: "Adventures" })).toHaveAttribute("aria-current", "page");
    expect(within(primary).getByRole("link", { name: "Home" })).not.toHaveAttribute("aria-current");

    const toggle = screen.getByRole("button", { name: "Open menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await user.click(toggle);
    expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute("aria-expanded", "true");
    const mobile = screen.getByRole("navigation", { name: "Mobile" });
    expect(within(mobile).getAllByRole("link")).toHaveLength(7);

    await user.click(within(mobile).getByRole("link", { name: "Gallery" }));
    await wait(400);
    expect(screen.queryByRole("navigation", { name: "Mobile" })).not.toBeInTheDocument();
  });
  it("closes mobile menu with Escape", async () => {
    setRoute("/");
    const user = userEvent.setup();
    render(<Header />);
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await user.keyboard("{Escape}");
    await wait(400);
    expect(screen.queryByRole("navigation", { name: "Mobile" })).not.toBeInTheDocument();
  });
});

describe("Footer", () => {
  it("renders placeholders for missing contact details with no broken links", () => {
    render(<Footer />);
    expect(screen.getByText("Email: to be added")).toBeInTheDocument();
    expect(screen.getByText("Phone: to be added")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /facebook|instagram|youtube/i })).not.toBeInTheDocument();
    expect(screen.getByText(new RegExp(`© ${new Date().getFullYear()}`))).toBeInTheDocument();
    document.querySelectorAll("a").forEach((a) => expect(a.getAttribute("href")).toBeTruthy());
  });
});

describe("Breadcrumbs / Button", () => {
  it("marks last crumb as current page", () => {
    render(<Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Adventures" }]} />);
    expect(screen.getByText("Adventures")).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
  });
  it("external ButtonLink opens safely", () => {
    render(<ButtonLink href="https://example.com" external>Go</ButtonLink>);
    expect(screen.getByRole("link", { name: "Go" })).toHaveAttribute("rel", "noopener noreferrer");
  });
});

describe("Adventure details", () => {
  it("renders every required section and an inquiry link with the slug", () => {
    const a = adventures[0];
    render(<AdventureDetails adventure={a} />);
    expect(screen.getByRole("heading", { level: 1, name: a.title })).toBeInTheDocument();
    ["Overview", "Highlights", "Sample itinerary", "What's included", "Not included", "What to bring", "Trip questions"].forEach((h) =>
      expect(screen.getByRole("heading", { name: h })).toBeInTheDocument(),
    );
    expect(screen.getByRole("link", { name: /Inquire About This Trip/ })).toHaveAttribute("href", `/contact?adventure=${a.slug}`);
    expect(screen.getByText(/No booking or payment/)).toBeInTheDocument();
    expect(screen.queryByText(/WhatsApp/)).not.toBeInTheDocument();
  });
});

describe("RelatedAdventures", () => {
  it("excludes current adventure and returns three cards", () => {
    render(<RelatedAdventures currentSlug="mountain-trekking" destinationSlug="fairy-meadows" />);
    expect(screen.queryByRole("link", { name: "Mountain Trekking" })).not.toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(3);
  });
});
