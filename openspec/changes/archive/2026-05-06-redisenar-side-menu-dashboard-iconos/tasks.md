# Tasks: Rediseñar el side menu del dashboard

1. Update `src/app/pages/dashboard/dashboard.html`
   - replace the current menu icon SVGs with descriptive icons for each section
   - add `aria-label="Main dashboard navigation"` to the sidebar `<nav>`
   - mark decorative icons with `aria-hidden="true"`
   - keep the existing `routerLink` structure and active link handling

2. Update `src/app/pages/dashboard/dashboard.css`
   - add or refine styles for `.sidebar-link`, `.sidebar-link:hover`, and `.active-link`
   - ensure icon spacing, padding, and text contrast are consistent
   - confirm the sidebar remains responsive and usable on mobile

3. Review `src/app/pages/dashboard/dashboard.ts`
   - verify the mobile sidebar toggle behavior still works after the markup update
   - adjust the component only if the responsive sidebar behavior is broken

4. Validate the final design
   - test the sidebar in desktop and mobile layouts
   - confirm each section icon clearly matches its label
   - ensure the menu remains accessible for keyboard and screen reader users
