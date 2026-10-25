import { describe, expect, it } from "vitest";
import { cn, isActivePath, unsplash } from "@/lib/utils";
import { absoluteUrl, navLinks, siteConfig, whatsappLink } from "@/lib/config";

describe("utils", () => {
  it("cn joins truthy classes only", () => {
    expect(cn("a", false, null, undefined, "b")).toBe("a b");
  });
  it("isActivePath handles root, exact and nested", () => {
    expect(isActivePath("/", "/")).toBe(true);
    expect(isActivePath("/about", "/")).toBe(false);
    expect(isActivePath("/adventures", "/adventures")).toBe(true);
    expect(isActivePath("/adventures/mountain-trekking", "/adventures")).toBe(true);
    expect(isActivePath("/adventuresX", "/adventures")).toBe(false);
  });
  it("unsplash builds an images.unsplash.com URL with width", () => {
    const u = new URL(unsplash("abc", 800));
    expect(u.hostname).toBe("images.unsplash.com");
    expect(u.pathname).toBe("/photo-abc");
    expect(u.searchParams.get("w")).toBe("800");
  });
});

describe("config", () => {
  it("has no invented contact details or social profiles", () => {
    expect(siteConfig.contact.email).toBe("");
    expect(siteConfig.contact.phone).toBe("");
    expect(siteConfig.contact.whatsappNumber).toBe("");
    Object.values(siteConfig.socials).forEach((v) => expect(v).toBe(""));
  });
  it("whatsappLink returns null when number missing", () => {
    expect(whatsappLink("hi")).toBeNull();
  });
  it("whatsappLink builds a wa.me link when configured", () => {
    const original = siteConfig.contact.whatsappNumber;
    (siteConfig.contact as { whatsappNumber: string }).whatsappNumber = "+92 300 1234567";
    expect(whatsappLink("Hello there")).toBe("https://wa.me/923001234567?text=Hello%20there");
    expect(whatsappLink()).toBe("https://wa.me/923001234567");
    (siteConfig.contact as { whatsappNumber: string }).whatsappNumber = original;
  });
  it("absoluteUrl returns the path when no site URL is set", () => {
    expect(absoluteUrl("/about")).toBe("/about");
  });
  it("nav links are unique and start at home", () => {
    expect(navLinks[0].href).toBe("/");
    expect(new Set(navLinks.map((l) => l.href)).size).toBe(navLinks.length);
  });
});
