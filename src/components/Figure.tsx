import Image from "next/image";
import type { ImageRef } from "@/lib/types";

/**
 * Renders an image, or an honest placeholder when the asset is missing.
 *
 * No Dear Jervois photography was supplied — the theme ZIP contains only theme
 * chrome, and the brand images live on the WordPress install. Rather than
 * substituting unrelated stock (which would misrepresent the design) this
 * reserves the exact aspect ratio the layout needs and names the missing asset,
 * so the composition is right and the gap stays visible.
 *
 * Drop the real file into /public and set `src` on the content object; nothing
 * else changes.
 */
export function Figure({
  image,
  aspect = "aspect-[4/5]",
  sizes,
  priority = false,
  fill = false,
  quiet = false,
  className = "",
}: {
  image?: ImageRef;
  /** Tailwind aspect class. Pass responsive variants for deliberate crops. */
  aspect?: string;
  sizes: string;
  priority?: boolean;
  /** Fills its positioned parent instead of holding an aspect ratio. */
  fill?: boolean;
  /** Suppresses the placeholder caption, for images used as a backdrop. */
  quiet?: boolean;
  className?: string;
}) {
  const box = fill ? "size-full" : aspect;

  if (!image?.src) {
    return (
      <div
        className={`flex items-center justify-center bg-linear-135 from-white/6 to-white/2 p-6 ${
          quiet ? "" : "border border-gold/20"
        } ${box} ${className}`}
      >
        {quiet ? null : (
          <p className="max-w-56 text-center text-[0.7rem] leading-relaxed tracking-wide text-gold/55">
            Image pending
            {image?.alt ? (
              <span className="mt-1 block text-white/35">{image.alt}</span>
            ) : null}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${box} ${className}`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
        style={
          image.focal
            ? {
                objectPosition: `${image.focal.x * 100}% ${image.focal.y * 100}%`,
              }
            : undefined
        }
      />
    </div>
  );
}
