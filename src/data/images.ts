import { unsplash } from "@/lib/utils";

/** Central image registry (Unsplash, free to use under the Unsplash License). Swap IDs/paths to change imagery. */
export const IMG = {
  hero: unsplash("1464822759023-fed622ff2c3b", 2400),
  heroAbout: unsplash("1506905925346-21bda4d32df4", 2400),
  heroAdventures: unsplash("1486870591958-9b9d0d1dda99", 2400),
  heroDestinations: unsplash("1439853949127-fa647821eba0", 2400),
  heroGallery: unsplash("1454496522488-7a8e488e8606", 2400),
  heroContact: unsplash("1469474968028-56623f02e42e", 2400),
  heroFaq: unsplash("1445307806294-bff7f67ff225", 2400),
  cta: unsplash("1478131143081-80f7f84ca84d", 2200),
  aboutMain: unsplash("1519904981063-b0cf448d479e", 1400),
  aboutSecondary: unsplash("1504280390367-361c6d9f38f4", 900),
  aboutStory: unsplash("1551632811-561732d1e306", 1400),
  community: unsplash("1491555103944-7c647fd857e6", 1400),
  fallback: unsplash("1464278533981-50106e6176b1", 1200),
} as const;
