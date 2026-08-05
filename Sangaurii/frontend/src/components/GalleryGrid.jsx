import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, motionSafe } from "../utils/gsapUtils";

function GalleryGrid({ images }) {
  const ref = useRef();
  useGSAP(() => {
    if (!motionSafe()) return;
    const tiles = ref.current.querySelectorAll("[data-gallery-tile]");
    gsap.from(tiles, { opacity: 0, y: 32, scale: 0.96, duration: 0.65, stagger: 0.09, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 84%", once: true } });
    tiles.forEach((tile) => {
      const image = tile.querySelector("img");
      gsap.to(image, { yPercent: -10, ease: "none", scrollTrigger: { trigger: tile, start: "top bottom", end: "bottom top", scrub: 0.8 } });
    });
  }, { scope: ref });
  return <div ref={ref} className="grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[190px] md:grid-cols-4">
    {images.map((image, index) => <figure key={image.src} data-gallery-tile className={`group relative overflow-hidden rounded-[1.35rem] ${index === 0 ? "col-span-2 row-span-2" : index === 3 ? "md:col-span-2" : ""}`}>
      <img src={image.src} alt={image.alt} className="h-[115%] w-full object-cover transition duration-700 group-hover:scale-105" />
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-4 pb-3 pt-10 text-sm font-semibold text-white opacity-0 transition group-hover:opacity-100">{image.alt}</figcaption>
    </figure>)}
  </div>;
}

export default GalleryGrid;
