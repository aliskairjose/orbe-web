# Tasks: Fix dashboard main view scroll with fixed sidebar

1. Update `src/app/pages/dashboard/dashboard.html`
   - keep the `aside` sidebar fixed and the mobile toggle behavior unchanged
   - ensure the wrapper around header and content is a flex column container
   - keep `main` as the scrollable region and render `<router-outlet />` inside it
   - preserve accessible labels and overlay behavior for the mobile sidebar
   - [x] Task complete

2. Update `src/app/pages/dashboard/dashboard.css`
   - ensure the sidebar styling remains unchanged except for any layout-specific overrides
   - add or update layout helpers for the `main` scroll container if needed
   - make sure the page-level structure does not force the entire page to scroll together with the sidebar
   - [x] Task complete

3. Verify the layout in the browser or local app
   - confirm that long dashboard content scrolls inside `main`
   - confirm the sidebar remains fixed on desktop
   - confirm the mobile sidebar still opens/closes and the overlay works correctly
   - [x] Task complete

4. Add or update any tests or manual verification notes
   - no new unit tests are required unless the fix affects component behavior
   - document the expected layout behavior clearly in the change artifacts
   - [x] Task complete
