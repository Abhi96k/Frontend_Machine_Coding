# React Virtualization — How to calculate virtualization height

This project includes a simple fixed-height virtualized list component (`src/Componets/FixedVirtualList.tsx`).

This README explains how to compute the sizes and indices used for fixed-height virtualization so you can configure the component or implement your own.

## Key concepts and formulas

Assume:

- itemHeight: fixed height of each list item (in pixels)
- itemCount: total number of items in the list
- viewportHeight: visible height of the scrolling container (in pixels)
- scrollTop: current vertical scroll offset of the container (in pixels)
- overscan: extra items to render before/after the visible window to reduce visible blanking during fast scrolls (integer >= 0)

Formulas:

- Total content height (for the inner spacer element):

  totalHeight = itemHeight \* itemCount

- Number of fully visible items in viewport (floor):

  visibleCount = Math.ceil(viewportHeight / itemHeight)

  We use ceil so that partial items are included and the viewport is fully covered.

- Start index (first item to render) based on scrollTop:

  startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)

- End index (exclusive index after the last item to render):

  endIndex = Math.min(itemCount, startIndex + visibleCount + overscan \* 2)

- Offset (translateY / top padding for the rendered block):

  offset = startIndex \* itemHeight

Render the items in the range [startIndex, endIndex) and place them inside an inner element that has height equal to totalHeight. Shift the inner content down by offset (for example with transform: translateY(offset) or padding-top).

## Example (concrete numbers)

- itemHeight = 40px
- itemCount = 1000
- viewportHeight = 600px
- overscan = 2

Calculations:

- totalHeight = 40 \* 1000 = 40000px
- visibleCount = Math.ceil(600 / 40) = 15
- If scrollTop = 0:

  - startIndex = max(0, floor(0 / 40) - 2) = 0
  - endIndex = min(1000, 0 + 15 + 4) = 19
  - offset = 0

- If scrollTop = 1234px:
  - startIndex = max(0, floor(1234 / 40) - 2) = max(0, 30 - 2) = 28
  - endIndex = min(1000, 28 + 15 + 4) = 47
  - offset = 28 \* 40 = 1120px

So you render items 28..46 and place them inside a container translated down by 1120px. The inner spacer keeps the scroll bar sized to 40000px.

## Small TypeScript helper

Here's a tiny helper you can drop into your project (or use to check calculations). It uses the same formulas above.

```ts
export function calculateVirtualRange(
  itemHeight: number,
  itemCount: number,
  viewportHeight: number,
  scrollTop: number,
  overscan = 0
) {
  const totalHeight = itemHeight * itemCount;
  const visibleCount = Math.ceil(viewportHeight / itemHeight);
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    itemCount,
    startIndex + visibleCount + overscan * 2
  );
  const offset = startIndex * itemHeight;

  return { totalHeight, visibleCount, startIndex, endIndex, offset };
}
```

Usage example:

```ts
const res = calculateVirtualRange(40, 1000, 600, 1234, 2);
// res -> { totalHeight: 40000, visibleCount: 15, startIndex: 28, endIndex: 47, offset: 1120 }
```

## Edge cases & notes

- Fractional heights: If your itemHeight or viewportHeight can be fractional (sub-pixel), the same math applies but watch rounding. Using Math.floor for startIndex and Math.ceil for visibleCount is a practical choice.
- Variable-height items: This README covers fixed-height virtualization. For variable heights you need either an item measurement cache or a windowing algorithm that tracks cumulative heights (more complex).
- Measuring itemHeight: If you don't know the item height precisely, render one sample item off-screen or measure the first rendered item and derive itemHeight. Keep consistent unit (px).
- Overscan tuning: Increase overscan to avoid blank areas during fast scrolling at the cost of rendering more DOM nodes. Typical values: 1–5 depending on item complexity and scroll speed.
- Accessibility: Keep focus-able items in the DOM as needed; virtualization moves DOM nodes — ensure keyboard users still have a usable experience.

## Try it with `FixedVirtualList`

Open `src/Componets/FixedVirtualList.tsx` and verify it uses the same calculations above. You can log the output of the helper to confirm indices while scrolling.

## Completion

This README explains the formulas, shows examples, and provides a reusable helper. If you'd like, I can also open `FixedVirtualList.tsx`, verify its implementation, and optionally add the helper or tests directly into the repo.
