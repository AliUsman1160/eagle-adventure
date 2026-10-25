/* eslint-disable @typescript-eslint/no-unused-vars */
import "@testing-library/jest-dom/vitest";
import React from "react";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => cleanup());

// next/image -> plain img (no loader/remotePatterns needed in jsdom)
vi.mock("next/image", () => ({
  default: ({ src, alt, fill: _fill, priority: _priority, sizes: _sizes, ...rest }: Record<string, unknown>) =>
    React.createElement("img", { src: src as string, alt: alt as string, ...(rest as object) }),
}));

let mockPath = "/";
let mockSearch = "";
export const __setRoute = (path: string, search = "") => {
  mockPath = path;
  mockSearch = search;
};
vi.mock("next/navigation", () => ({
  usePathname: () => mockPath,
  useSearchParams: () => new URLSearchParams(mockSearch),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));
(globalThis as Record<string, unknown>).__setRoute = __setRoute;

// framer-motion reads these in jsdom
class IO {
  constructor(private cb: IntersectionObserverCallback) {}
  observe(el: Element) {
    this.cb([{ isIntersecting: true, target: el, intersectionRatio: 1 } as IntersectionObserverEntry], this as unknown as IntersectionObserver);
  }
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
}
(globalThis as Record<string, unknown>).IntersectionObserver = IO;
window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
