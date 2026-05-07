# Design: Fixed sidebar with scrolling dashboard content

## Layout behavior
Use the existing dashboard page structure and keep the sidebar fixed on desktop by preserving the `aside` with fixed positioning. The main dashboard content container should be the scrollable area.

### Desktop
- `aside` remains fixed on the left with `inset-y-0 left-0` and a fixed width.
- the sibling wrapper for the header and main content occupies the remaining space and uses internal overflow on `main`.
- the `main` element should scroll vertically independently of the sidebar.

### Mobile
- keep the existing off-canvas sidebar experience for small screens.
- retain the `lg:hidden` toggle button and overlay behavior.
- ensure the off-canvas sidebar does not interfere with the scroll behavior of the main content when closed.

## Styling
- keep `div.min-h-screen.bg-gray-100.flex` as the root wrapper.
- wrap the header and `main` area in a `flex-1 flex flex-col min-w-0 overflow-hidden` container.
- set `main` to `overflow-x-hidden overflow-y-auto` and ensure it can expand to fill the available vertical space.
- verify `main` uses `min-h-0` if needed so the flex container can properly constrain vertical sizing.

## Accessibility
- preserve button accessible labels and aria-expanded states.
- maintain `aria-hidden` on the mobile overlay when the sidebar is closed.
- avoid trapping focus incorrectly when the sidebar closes.

## Implementation details
- move any page-level `overflow` from the root container to the `main` container.
- if needed, add `min-h-0` to the flex column parent to allow the `main` overflow container to work correctly in CSS flex layout.
- do not change the sidebar navigation structure or text content.
