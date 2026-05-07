# Design: Side menu redesign with descriptive icons

## Sidebar structure
Use the existing `aside#sidebar` and preserve the responsive toggle behavior.

- Keep the sidebar fixed on desktop and collapsible on mobile.
- Add `aria-label="Main dashboard navigation"` to the `<nav>` element.
- Keep the link text visible and pair each label with a distinctive icon.
- Use `aria-hidden="true"` on decorative SVG icons so screen readers read only the link label.

## Icons and labels
Replace the current placeholder SVGs with descriptive icons for each route:
- `Inicio` → home icon
- `Usuarios` → user/group icon
- `Chats` → chat/message icon
- `Categorías` → tags/category icon
- `Transacciones` → transaction/history icon
- `Bancos` → bank/building icon
- `Cuentas` → wallet/account icon
- `Legal` → document/shield icon
- `Planes y paquetes` → plan/chart icon

Use simple `svg` markup for each icon so the design remains framework-agnostic.

## Visual styling
- Standardize link styles with a shared utility class such as `.sidebar-link`.
- Use a distinct `.active-link` background and text color to show the current route.
- Ensure text and icon contrast passes accessibility requirements on the dark sidebar background.
- Use consistent spacing between icon and label, and a uniform padding pattern across all links.

## Responsive behavior
- Preserve the existing mobile toggle button.
- Keep clickable areas large enough for touch devices.
- Ensure the sidebar overlay and hide/show animation remains smooth.

## Implementation details
- Update only the dashboard sidebar markup and styles; keep `dashboard.ts` as-is unless toggling behavior needs adjustment.
- Verify the sidebar still renders correctly when `routerLinkActive` is applied.
- Prefer semantic markup and avoid broken SVG path data or malformed attributes.
