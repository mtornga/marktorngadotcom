# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website repository for Mark Tornga (marktornga.com). The project is in early setup phase - currently a placeholder with salvaged content from a previous Jekyll-based site that used the Minimal Mistakes theme.

**Primary purposes:**
- Personal branding and professional landing page
- Project showcase (including `/repos/deeraitrackingresponse` and historical projects)
- Blog (planned post topics include Steve Zissou/Percy Fawcett connection)

## Repository Structure

- `marktorngadotcom-salvage/` - Archived content from the previous Jekyll/Minimal Mistakes site
  - `config/_config.yml` - Site metadata, author profile, social links, analytics (UA-156510873-1), teaser image references
  - `data/navigation.yml`, `data/ui-text.yml` - Navigation and UI text from old theme
  - `content/posts/` - Markdown posts with front matter (dates: 2020-01-20, 2020-07-05)
  - `assets/images/` - Hero images, avatars, and post media (`teaser.JPG`, `Lakeself.JPG`, `avatar.PNG`, `amaryllis.gif`, etc.)
  - `scripts/_main.js` - Custom frontend interactions (sticky sidebar, search toggle, smooth scroll, lightbox, heading anchors)
- `inspiration/` - Design references for neo-brutalist aesthetic and interactive elements
- `WebsiteGoals.txt` - Project goals and content planning

## Important Context from Salvaged Site

**Author/Site Info:**
- Name: Mark Tornga
- Bio: "Highly extensible human"
- Location: St. Louis, Missouri
- GitHub: https://github.com/mtornga
- LinkedIn: https://linkedin.com/in/marktornga
- Site title was "MarkTube"
- Domain: marktornga.com

**Previous Tech Stack:**
- Jekyll static site generator with Minimal Mistakes theme
- "air" skin aesthetic
- Lunr search provider
- Google Analytics (UA tracking - consider migrating to GA4)

**Content to Preserve:**
- Post permalinks and dates from `content/posts/`
- Image asset references
- Navigation structure and social links

## Design Direction

The `/inspiration/` folder contains references for a neo-brutalist design approach:
- Creative, boundary-pushing aesthetic
- Smooth scroll animations
- Fancy colors and responsive design (Tailwind CSS mentioned)
- Interactive elements like cursor-following face animations
- Reference sites and tools: lite-tracker, face-looker

## Development Notes

- This is a fresh repository with no build system currently configured
- When implementing the new site, consider modern frameworks over Jekyll
- Preserve content dates and permalinks from salvaged posts
- Update analytics from UA to GA4
- Maintain author profile and social links from config
