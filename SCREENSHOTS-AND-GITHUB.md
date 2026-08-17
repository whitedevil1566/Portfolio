# Live screenshots + GitHub proof

This build now uses a lightweight live screenshot service for project previews so the portfolio can display current captures of the public project URLs without storing stale screenshots in the repository.

Screenshot sources:
- https://torukmaktoleague.com/
- https://coach.abdullahafsar.site/
- https://whitedevil1566.github.io/Z-Lane-Broast/

The screenshot URLs use Thum.io's public URL screenshot API. See https://www.thum.io/documentation/api/url for the supported URL modifiers.

GitHub proof uses the public profile `whitedevil1566` and attempts a live refresh from GitHub's public API. The UI ships with a verified fallback based on the current public profile so visitors never see a permanent `Loading…` state.
