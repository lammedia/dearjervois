# Sanity

Schemas only — the Studio and client are not installed yet, deliberately: the
app runs entirely on `src/content` until a dataset exists, so there is no
half-wired integration to maintain in the meantime.

## Wiring it up

1. `npm install sanity next-sanity @sanity/image-url`
2. Copy `.env.example` to `.env.local` and fill in the project ID and dataset.
3. Delete `sanity/schemas/types.ts` and point the `SchemaTypeDefinition` /
   `Rule` imports at the `sanity` package. Create `sanity.config.ts` at the repo root importing `schemaTypes` from
   `sanity/schemas`.
4. Replace the three function bodies in `src/lib/content.ts` with GROQ fetches.
   Field names in these schemas match `src/lib/types.ts` exactly, so the
   projections are close to passthrough:

   ```groq
   *[_type == "page" && slug.current == $slug][0]{
     "slug": slug.current, title, description, sections
   }
   ```

   Images need one mapping step — `urlFor(image).url()` into `ImageRef.src`,
   and the `alt` field off the asset — which is the only place the two shapes
   diverge.

Nothing in `src/app` or `src/components` changes. That is the point of the
`src/lib/content.ts` seam.
