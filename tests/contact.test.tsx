import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "@/components/contact/ContactForm";
import { siteConfig } from "@/lib/config";

const setRoute = (p: string, s = "") =>
  (globalThis as unknown as { __setRoute: (p: string, s?: string) => void }).__setRoute(p, s);

async function fillValid(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("Full name"), "Ana Test");
  await user.type(screen.getByLabelText("Email"), "ana@example.com");
  await user.type(screen.getByLabelText("Message"), "Hello there, interested!");
  await user.click(screen.getByLabelText(/agree to be contacted/));
  await user.click(screen.getByRole("button", { name: "Prepare Inquiry" }));
}

describe("ContactForm", () => {
  it("prefills adventure from ?adventure=", () => {
    setRoute("/contact", "adventure=waterfall-exploration");
    render(<ContactForm />);
    expect(screen.getByLabelText(/Adventure/)).toHaveValue("waterfall-exploration");
  });

  it("ignores unknown adventure params", () => {
    setRoute("/contact", "adventure=<script>");
    render(<ContactForm />);
    expect(screen.getByLabelText(/Adventure/)).toHaveValue("");
  });

  it("shows accessible inline errors for empty submit", async () => {
    setRoute("/contact");
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.click(screen.getByRole("button", { name: "Prepare Inquiry" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Please fix");
    expect(screen.getByLabelText("Full name")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText("Full name")).toHaveAttribute("aria-describedby", "name-error");
    ["name", "email", "message", "consent"].forEach((k) => expect(document.getElementById(`${k}-error`)).toBeInTheDocument());
  });

  it("validates email, optional phone and group size", async () => {
    setRoute("/contact");
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.type(screen.getByLabelText("Full name"), "Ana");
    await user.type(screen.getByLabelText("Email"), "not-an-email");
    await user.type(screen.getByLabelText(/Phone/), "abc");
    await user.type(screen.getByLabelText(/Group size/), "0");
    await user.type(screen.getByLabelText("Message"), "Hello there, interested!");
    await user.click(screen.getByLabelText(/agree to be contacted/));
    await user.click(screen.getByRole("button", { name: "Prepare Inquiry" }));
    expect(document.getElementById("email-error")).toHaveTextContent("valid email");
    expect(document.getElementById("phone-error")).toBeInTheDocument();
    expect(document.getElementById("groupSize-error")).toBeInTheDocument();
    expect(document.getElementById("name-error")).not.toBeInTheDocument();
  });

  it("clears an error when the field is corrected", async () => {
    setRoute("/contact");
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.click(screen.getByRole("button", { name: "Prepare Inquiry" }));
    await user.type(screen.getByLabelText("Full name"), "Ana");
    expect(document.getElementById("name-error")).not.toBeInTheDocument();
  });

  it("valid submit shows honest demo state and sends nothing", async () => {
    setRoute("/contact", "adventure=scenic-road-trips");
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillValid(user);

    expect(screen.getByRole("heading", { name: /has not been sent/ })).toBeInTheDocument();
    expect(screen.getByText(/no message was sent/)).toBeInTheDocument();
    expect(screen.getByText(/Inquiry: Scenic Road Trips/)).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /WhatsApp/ })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /email app/ })).not.toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();

    await user.click(screen.getByRole("button", { name: "Edit inquiry" }));
    expect(screen.getByLabelText("Full name")).toHaveValue("Ana Test");
  });

  it("shows WhatsApp/email actions only when configured", async () => {
    setRoute("/contact");
    const c = siteConfig.contact as { whatsappNumber: string; email: string };
    c.whatsappNumber = "923001234567";
    c.email = "hi@example.com";
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillValid(user);
    expect(screen.getByRole("link", { name: /WhatsApp/ })).toHaveAttribute("href", expect.stringContaining("https://wa.me/923001234567"));
    expect(screen.getByRole("link", { name: /email app/ })).toHaveAttribute("href", expect.stringContaining("mailto:hi@example.com"));
    c.whatsappNumber = "";
    c.email = "";
  });
});
