import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { MenuList } from "@/components/menu/MenuList";
import { getMenu } from "@/lib/content";
import type { MenuSectionBlock } from "@/lib/types";

/**
 * Resolves a structured menu and renders it, plus the secondary PDF download.
 *
 * The PDF is deliberately an afterthought in the layout: the brief is explicit
 * that the HTML menu is the customer-facing one and the upload is only a
 * fallback copy.
 */
export async function MenuBlock({ menuSlug }: MenuSectionBlock) {
  const menu = await getMenu(menuSlug);

  if (!menu) {
    return (
      <Container>
        <p className="py-24 text-center text-sm text-white/60">
          This menu has not been published yet.
        </p>
      </Container>
    );
  }

  return (
    <>
      {menu.intro ? (
        <Container width="narrow" className="pt-16 text-center sm:pt-20">
          <p className="text-pretty leading-[1.9] text-body-muted">
            {menu.intro}
          </p>
        </Container>
      ) : null}

      <MenuList menu={menu} />

      {menu.pdf ? (
        <div className="bg-ink pb-20 pt-4 text-center sm:pb-24">
          <Button
            cta={{
              label: "Download PDF",
              href: menu.pdf.url,
              external: true,
            }}
          />
          <p className="mt-4 text-xs text-white/45">
            PDF menu, updated{" "}
            <time dateTime={menu.updatedAt}>
              {new Date(menu.updatedAt).toLocaleDateString("en-NZ", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </p>
        </div>
      ) : null}
    </>
  );
}
