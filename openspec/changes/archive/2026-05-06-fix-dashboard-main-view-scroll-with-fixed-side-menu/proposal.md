# Proposal: Fix dashboard main view scroll with fixed sidebar

## What
Update the dashboard layout so that the sidebar remains fixed while the main dashboard content scrolls independently. The main view should allow vertical scrolling without affecting the sidebar position.

Changes should ensure:
- the sidebar stays visible and fixed on desktop layouts
- the main content area scrolls vertically when page content exceeds the viewport height
- the layout preserves the current responsive mobile behavior where the sidebar can open and close
- the dashboard remains accessible with proper focus, keyboard usage, and screen reader semantics

## Why
At present, the dashboard’s overall page wrapper can cause the sidebar and main content to scroll together, which breaks the intended fixed navigation pattern and reduces usability on long dashboard pages. Fixing this improves navigation stability, makes content easier to scan, and aligns the UI with expected dashboard layouts.

## Scope
Includes:
- adjusting `src/app/pages/dashboard/dashboard.html` and `dashboard.css`
- ensuring the sidebar remains fixed while `main` scrolls
- keeping the mobile sidebar toggle behavior intact
- preserving accessible aria semantics and keyboard navigation

Does not include:
- redesigning the sidebar content or menu items
- changing route structure or dashboard page components
- altering the dashboard header content beyond layout adjustments
