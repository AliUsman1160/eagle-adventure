import { unsplash } from "@/lib/utils";
import type { GalleryImage } from "@/types";

const g = (
  id: string,
  photo: string,
  orientation: GalleryImage["orientation"],
  category: GalleryImage["category"],
  caption: string,
  alt: string,
): GalleryImage => ({ id, src: unsplash(photo, 1400), orientation, category, caption, alt });

/** Sample gallery — swap for real trip photography. */
export const galleryImages: GalleryImage[] = [
  g("g1", "1464822759023-fed622ff2c3b", "landscape", "Mountains", "First light on the high peaks", "Snow-covered mountain peaks at sunrise"),
  g("g2", "1504280390367-361c6d9f38f4", "portrait", "Camping", "A quiet campsite before dusk", "Tent pitched in a mountain setting"),
  g("g3", "1551632811-561732d1e306", "portrait", "Trekking", "Following the trail uphill", "Hiker on a mountain trail"),
  g("g4", "1469474968028-56623f02e42e", "landscape", "Nature", "A valley in full colour", "Green valley with mountains in the distance"),
  g("g5", "1519681393784-d120267933ba", "landscape", "Camping", "Night sky over the ridge", "Starry sky above mountains"),
  g("g6", "1433086966358-54859d0ed716", "portrait", "Nature", "Where the water meets the rock", "Waterfall in a green gorge"),
  g("g7", "1506905925346-21bda4d32df4", "landscape", "Mountains", "Layers of ridgeline", "Mountain range under a soft sky"),
  g("g8", "1486911278844-a81c5267e227", "portrait", "Trekking", "Summit views", "Snow-covered summit rising above the clouds"),
  g("g9", "1478131143081-80f7f84ca84d", "landscape", "Camping", "Evening fire, good company", "Camp by a fire in the wilderness"),
  g("g10", "1441974231531-c6227db76b6e", "portrait", "Nature", "Sunlight through the forest", "Tall forest with light filtering through trees"),
  g("g11", "1501785888041-af3ef285b470", "landscape", "Mountains", "Still water, high country", "Alpine lake surrounded by mountains"),
  g("g12", "1496080174650-637e3f22fa03", "landscape", "Camping", "Warm glow after dark", "Orange tent glowing in a dark forest"),
  g("g13", "1454496522488-7a8e488e8606", "portrait", "Mountains", "Above the clouds", "Snowy mountain peak against the sky"),
  g("g14", "1472214103451-9374bd1c798e", "landscape", "Nature", "Rolling green hills", "Green hills under a blue sky"),
];
