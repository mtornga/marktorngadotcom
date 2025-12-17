# marktornga.com - Session Handoff

## Current Status: DEPLOYED TO PRODUCTION ✓

**Date:** 2025-12-17
**Production URL:** https://marktornga.com
**Vercel URL:** https://marktorngadotcom.vercel.app
**GitHub Repo:** https://github.com/mtornga/marktorngadotcom

---

## What We Accomplished This Session

### Phase 1: Foundation - COMPLETE ✓
*(Completed in previous session - see below for details)*

### Phase 2: Design System Components - COMPLETE ✓
*(Completed in previous session - see below for details)*

### Phase 3: Portfolio Section - COMPLETE ✓

1. **Content Management Infrastructure**
   - Created `lib/content.ts` with functions to read and parse MDX project files
     - `getProjectBySlug()` - Fetch single project by slug
     - `getAllProjects()` - Get all projects
     - `getFeaturedProjects()` - Get featured projects only
   - Created `lib/mdx.ts` with `compileMDX()` function using next-mdx-remote/rsc
   - Created `types/project.ts` with ProjectFrontMatter and Project interfaces

2. **Portfolio Components** (`components/portfolio/`)
   - **ProjectCard.tsx** - Card component for project grid
     - Displays hero image, title, description, tags, status badge
     - Hover effects with scale transform
     - Links to project detail page
   - **ProjectGrid.tsx** - Responsive grid layout for project cards
     - 1 column mobile, 2 columns tablet, 3 columns desktop
   - **ProjectHero.tsx** - Large hero section for project detail pages
     - Hero image with chunky border
     - Status badge, title, description
     - Tech stack tags
     - GitHub/Demo links with buttons

3. **Portfolio Pages**
   - **app/portfolio/page.tsx** - Portfolio listing page
     - Grid of all projects
     - Bold heading with neo-brutalist styling
   - **app/portfolio/[slug]/page.tsx** - Dynamic project detail page
     - MDX content rendering with prose styling
     - ProjectHero component
     - generateStaticParams for SSG
     - Fixed Next.js 16 async params (must await params)

4. **DeerAI Tracking Response Project**
   - Created `content/projects/deeraitrackingresponse.mdx` with full project description
   - Added hero image at `public/images/projects/deer-ai-tracking-hero.png`
   - Comprehensive content: overview, technical architecture, key features, challenges
   - Featured project with status "Active Development"
   - Tags: Computer Vision, PyTorch, YOLO, Robotics, Real-time Tracking, AWS

5. **Homepage Integration**
   - Added featured projects section to homepage
   - Displays featured project (DeerAI) with hero styling
   - "View All Projects" button linking to portfolio page

6. **Image Display Fixes**
   - Discovered Next.js Image optimization issue with quarantine attributes
   - Switched from Next.js Image component to standard HTML `<img>` tags
   - Fixed in ProjectHero.tsx and ProjectCard.tsx

7. **Tailwind Typography**
   - Added `@tailwindcss/typography` plugin
   - Configured prose styles with neo-brutalist theme
     - Pink headings and links
     - Chunky 4px underlines on links
     - Custom code block styling
     - Reduced paragraph spacing for tighter layout

### Phase 4: Resume/About Page - COMPLETE ✓

1. **Interactive Resume Dial Component** (`components/resume/ResumeDial.tsx`)
   - Semicircle dial design (like speedometer)
   - 4 levels: Minimal, Short, Medium, Long
   - Interactive features:
     - Click colored dots around arc to select level
     - Click/drag pink pointer arm
     - Click cyan center knob to cycle through levels
     - Click button labels below dial
   - Neo-brutalist styling with thick borders and hard shadows
   - Smooth transitions between levels
   - Proper positioning math for screen coordinates

2. **About Page** (`app/about/page.tsx`)
   - Progressive disclosure resume with 4 detail levels:
     - **Minimal**: Just "Highly extensible human" tagline
     - **Short**: Quick intro, key skills, social links
     - **Medium**: Full profile with featured projects, skills sections
     - **Long**: Complete resume with experience, projects, skills, education
   - ~~Resume content based on salvaged config and placeholder structure~~ **(Now populated with real content - see Phase 4.5)**
   - Smooth fadeIn animations when switching levels
   - All content styled with neo-brutalist aesthetic

3. **Dial Iterations** (5+ iterations to get right)
   - Fixed circle positioning with proper trigonometry
   - Corrected Y-axis calculations for screen coordinates (Y goes down)
   - Adjusted angles from full circle to semicircle (0° to 180°)
   - Fine-tuned spacing between dial and controls
   - Fixed pointer rotation for CSS transforms

4. **Navigation Integration**
   - About link already in Header navigation
   - Ready to use at `/about`

### Phase 4.5: About Page Content Population - COMPLETE ✓

*Session Date: 2025-12-16/17*

Replaced all placeholder content in the About page with real resume data from `ResumeDocs/` folder.

1. **Work Experience Added** (3 positions)
   - **Core & Main** (2023–2025): Senior Manager, Data Analytics
     - Led Microsoft Fabric data estate modernization
     - D365 Finance & Operations integration (200+ tables)
     - AI initiatives: LLM training games, GPT-4 product descriptions, lead categorization
     - Partnered with C-suite on data strategy
   - **Slalom, Inc** (2018–2023): Senior Consultant
     - 8 clients, 18 engagements across financial services, energy, healthcare
     - 2020 Slalom-Tableau Rockstar designation
     - Cybersecurity risk dashboard for $16B insurance company
     - Reduced claims backlog from 23,000 to 8,000 in 90 days
     - 1st place 2023 D&A Hackathon
   - **Unyson Logistics** (2016–2018): Manager, Business Intelligence
     - Led 11-person analyst team
     - Oracle TMS migration

2. **Featured Projects Added** (3 projects)
   - **DeerAI Tracking Response**: Computer vision + robotics pipeline
   - **LLM Interaction Learning Games**: Enterprise AI training games
   - **Fire Protection Lead Intelligence**: LLM-based lead categorization (85% cost reduction)

3. **Education & Certifications**
   - B.A. Supply Chain Management, Michigan State University
   - Data Analytics Certification, Saint Louis University
   - AWS Solutions Architect, Tableau Certified, Astronomer Airflow, Azure Fundamentals

4. **Testimonials Section**
   - Added quotes from two Slalom principals highlighting project impact and problem-solving ability

5. **Skills Updated**
   - Data Platforms: Microsoft Fabric, Power BI, Snowflake, dbt, Airflow, Synapse
   - Languages: Python, SQL, PySpark, TypeScript, React, Next.js
   - AI & CV: Azure AI Foundry, PyTorch, YOLO, OpenCV, LLMs/GPT
   - Cloud: AWS, Azure, GCP, Docker, Terraform, Git

6. **Source Material**
   - Added `ResumeDocs/` folder with 19 markdown files containing resume content
   - Key files used: `Mark Tornga Resume H Oct 25.md`, `AI and LLM Projects.md`, `Wildlife UGV Independent Research Project.md`

### Phase 5: Deployment to Vercel - COMPLETE ✓

1. **Git Repository**
   - Committed all code with proper commit messages
   - Pushed to GitHub: https://github.com/mtornga/marktorngadotcom
   - Clean .gitignore excluding node_modules, .next, .env, .mcp.json

2. **Vercel Setup**
   - Installed Vercel CLI globally
   - Authenticated with Vercel account
   - Created project: mark-torngas-projects/marktorngadotcom
   - Connected to GitHub repository

3. **Build Fixes**
   - Fixed TypeScript error: Link component doesn't support `variant` prop
   - Replaced styled Link components with Button components in About page
   - Successful production build with Next.js 16 + Turbopack

4. **Custom Domain Configuration**
   - Added domains to Vercel:
     - marktornga.com (root)
     - www.marktornga.com (www subdomain)
   - Configured DNS in Route 53:
     - A record: marktornga.com → 76.76.21.21
     - A record: www.marktornga.com → 76.76.21.21
   - Switched nameservers from NSOne to Route 53
   - DNS propagated successfully

5. **Live URLs**
   - **Production**: https://marktornga.com
   - **WWW**: https://www.marktornga.com
   - **Vercel**: https://marktorngadotcom.vercel.app

### Phase 6: User Feedback Implementation - COMPLETE ✓ (NEW)

*Session Date: 2025-12-17*

Implemented comprehensive feedback addressing UX, content, and SEO issues.

1. **Blog Section Created** (`app/blog/`)
   - Blog listing page at `/blog` with post grid
   - Dynamic post detail pages at `/blog/[slug]`
   - Migrated 2 posts from salvage folder:
     - `amaryllis.mdx` - Timelapse of flower blooming
     - `skytimelapse.mdx` - Raspberry Pi + Ansible automation project
   - Added blog content functions to `lib/content.ts`
   - Copied post images to `public/images/posts/`
   - Navigation updated: "Blog" → "Writing"

2. **Homepage Hero Redesign** (`app/page.tsx`)
   - New positioning: "Data + AI Leader"
   - Career-focused copy: "Enterprise data architecture. Analytics platforms. Computer vision + robotics."
   - Availability statement: "Currently doing data architecture consulting. Open to full-time roles or consulting engagements."
   - Primary CTA changed to "Work With Me" → `/contact`

3. **Portfolio Expansion** - Added 4 new project pages:
   - `microsoft-fabric-data-estate.mdx` - Fortune 500 data modernization
   - `llm-learning-games.mdx` - Enterprise AI training games
   - `fire-protection-lead-intelligence.mdx` - LLM lead categorization system
   - `cybersecurity-risk-dashboard.mdx` - Board-level security metrics

4. **Contact Page Created** (`app/contact/page.tsx`)
   - Email CTA: mtornga@gmail.com
   - LinkedIn connection link
   - "What I Can Help With" section detailing services:
     - Data Architecture & Strategy
     - Analytics & BI
     - AI/ML Implementation
     - Team Building
   - GitHub profile link
   - Added "Contact" to navigation

5. **About Page Fallback Fix** (`app/about/page.tsx`)
   - Changed default dial level from 0 (Minimal) to 2 (Medium)
   - Now shows meaningful content on initial render before JS hydrates

6. **Custom 404 Page** (`app/not-found.tsx`)
   - Neo-brutalist styled 404 page
   - Navigation options: Home, Portfolio, Contact

7. **SEO & Metadata Updates** (`app/layout.tsx`)
   - Updated title: "Mark Tornga | Data + AI Leader"
   - Career-focused description
   - Added keywords meta tag
   - Added metadataBase for proper OG URL resolution
   - OG image placeholder (needs proper design)
   - Twitter card configuration

---

## Tech Stack

- **Framework:** Next.js 16 (App Router) with TypeScript
- **Styling:** Tailwind CSS 4 + custom neo-brutalist design system + @tailwindcss/typography
- **Content:** MDX via next-mdx-remote/rsc + gray-matter
- **Fonts:** next/font/google (Space Grotesk + Inter)
- **Images:** Standard HTML img tags (bypassed Next.js Image for compatibility)
- **SEO:** next-seo package
- **Hosting:** Vercel (LIVE)
- **Domain:** Route 53 DNS → Vercel hosting

---

## Key Files Created/Modified

### Configuration
- `package.json` - All dependencies including MDX, typography plugin
- `next.config.js` - Configured for MDX and image optimization
- `tailwind.config.ts` - Custom neo-brutalist colors, shadows, borders, typography
- `postcss.config.js` - @tailwindcss/postcss + autoprefixer
- `tsconfig.json` - TypeScript config for Next.js

### App Structure
- `app/layout.tsx` - Root layout with fonts, metadata, Header, Footer
- `app/page.tsx` - Homepage with hero section and featured projects
- `app/globals.css` - Tailwind imports + neo-brutalist CSS + fadeIn animation
- `app/portfolio/page.tsx` - Portfolio listing page
- `app/portfolio/[slug]/page.tsx` - Dynamic project detail page (with async params fix)
- `app/about/page.tsx` - About/Resume page with dial control

### Content
- `content/projects/deeraitrackingresponse.mdx` - Full DeerAI project content
- `public/images/projects/deer-ai-tracking-hero.png` - Project hero image

### Types
- `types/project.ts` - Project data structures with MDX support
- `types/post.ts` - Blog post data structures

### Components

**UI Components** (`components/ui/`)
- `Button.tsx` - Reusable button with variants and sizes
- `Card.tsx` - Neo-brutalist card component
- `Badge.tsx` - Tech stack badges
- `Link.tsx` - Custom link wrapper (no variant prop)
- `index.ts` - Barrel export

**Layout Components** (`components/layout/`)
- `Container.tsx` - Max-width container
- `Header.tsx` - Site header with navigation
- `Footer.tsx` - Site footer with social links
- `index.ts` - Barrel export

**Portfolio Components** (`components/portfolio/`)
- `ProjectCard.tsx` - Project card for grid (uses standard img)
- `ProjectGrid.tsx` - Asymmetric grid layout
- `ProjectHero.tsx` - Large hero section (uses standard img)
- `index.ts` - Barrel export

**Resume Components** (`components/resume/`)
- `ResumeDial.tsx` - Interactive semicircle dial with drag support

### Libraries
- `lib/content.ts` - MDX project content fetching utilities
- `lib/mdx.ts` - MDX compilation with next-mdx-remote
- `lib/utils.ts` - className merging utility (cn function)

### Documentation
- `CLAUDE.md` - Project context for Claude Code
- `HANDOFF.md` - This file (comprehensive session history)

---

## Design System Reference

### Neo-Brutalist Aesthetic
- **Bold and chunky:** Oversized elements, thick borders, hard shadows
- **High contrast:** Bright colors on light backgrounds, black borders everywhere
- **Asymmetric layouts:** Rotated headings, offset elements
- **Interactive elements:** Hover states with shadow shifts and transforms

### Color Palette
```css
--color-bg: #FAFAFA          /* Off-white background */
--color-surface: #FFFFFF      /* Pure white cards */
--color-primary: #FF006E      /* Hot pink */
--color-secondary: #FFD60A    /* Bright yellow */
--color-accent: #00F5FF       /* Cyan */
--color-text: #1A1A1A         /* Near-black text */
--color-border: #1A1A1A       /* Thick black borders */
```

### Typography
- **Headings:** Space Grotesk, weight 700 (900 not available)
- **Body:** Inter, regular weight
- **Links:** 4px thick underlines with 4px offset
- **Prose:** Custom styling via @tailwindcss/typography

### Component Patterns
- **Borders:** 4px thick black borders on everything
- **Shadows:** 8px offset, no blur, shifts to 4px on hover
- **Transforms:** Slight rotation (-1deg to 1deg) for visual interest
- **Transitions:** 0.2s ease for smooth interactions

---

## Important Technical Details

### Next.js 16 Async Params
- **Breaking Change:** Dynamic route params are now Promises
- **Fix Applied:** Changed `params: { slug: string }` to `params: Promise<{ slug: string }>`
- **Usage:** Must `await params` before accessing properties
- **Location:** `app/portfolio/[slug]/page.tsx`

### Image Handling
- **Issue:** Next.js Image component had quarantine attribute problems
- **Solution:** Use standard HTML `<img>` tags instead
- **Benefits:** Direct file access, no optimization pipeline issues
- **Locations:** ProjectHero.tsx, ProjectCard.tsx

### Link vs Button Components
- **Link Component:** No `variant` prop, used for navigation
- **Button Component:** Supports `variant` prop for styled buttons/links
- **Usage:** Use Button for styled external/internal links that need variants

### MDX Configuration
- **Package:** next-mdx-remote/rsc (React Server Components)
- **Parser:** gray-matter for frontmatter
- **Rendering:** Server-side compilation in async components
- **Styling:** @tailwindcss/typography prose classes

---

## Current Site Structure

```
marktornga.com/
├── / (Homepage)
│   ├── Hero section with career positioning
│   ├── "Work With Me" CTA
│   └── Featured Projects (DeerAI)
│
├── /portfolio (Portfolio Listing)
│   └── Grid of 5 projects
│
├── /portfolio/[slug] (Project Details)
│   ├── deeraitrackingresponse
│   ├── microsoft-fabric-data-estate
│   ├── llm-learning-games
│   ├── fire-protection-lead-intelligence
│   └── cybersecurity-risk-dashboard
│
├── /blog (Writing)
│   └── Grid of blog posts
│
├── /blog/[slug] (Post Details)
│   ├── amaryllis
│   └── skytimelapse
│
├── /about (Resume with Dial)
│   ├── Interactive semicircle dial
│   ├── 4 resume detail levels (defaults to Medium)
│   └── Social links
│
├── /contact (Contact Page)
│   ├── Email CTA
│   ├── LinkedIn link
│   ├── Services offered
│   └── GitHub link
│
└── /not-found (Custom 404)
```

---

## What's Next: Remaining Phases

### Phase 7: Polish & Optimization (Next Priority)
1. **OG Image**: Create proper 1200x630 OG image (currently using avatar placeholder)
2. Performance audit (Lighthouse)
3. Analytics setup (Google Analytics 4)
4. Loading states and skeleton components
5. Accessibility audit
6. Add more blog posts
7. Add reading time estimates to blog posts
8. Add tags/categories filtering to blog

---

## How to Continue Development

### Local Development
```bash
# Install dependencies (if needed)
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Start production server locally
npm start
```

### Deployment
```bash
# Deploy to Vercel production
vercel --prod

# Or just push to GitHub
git add .
git commit -m "Your commit message"
git push origin main
# Vercel auto-deploys from main branch
```

### Domain Management
- **DNS:** Managed in AWS Route 53
- **Vercel:** Custom domains configured
- **SSL:** Automatically provisioned by Vercel

---

## Known Issues / Technical Debt

1. ~~**Resume Content:** Placeholder content in About page needs real experience/education details~~ ✓ RESOLVED (Phase 4.5)
2. ~~**Blog Section:** Not yet implemented (Phase 6)~~ ✓ RESOLVED (Phase 6)
3. ~~**SEO:** No metadata for portfolio pages yet~~ ✓ RESOLVED (Phase 6)
4. **Analytics:** Not configured
5. ~~**Error Pages:** Using default Next.js error pages~~ ✓ RESOLVED (Phase 6)
6. ~~**More Projects:** Only one project (DeerAI) in portfolio as MDX page~~ ✓ RESOLVED (Phase 6 - now 5 projects)
7. **OG Image:** Using avatar as placeholder - needs proper 1200x630 designed image
8. **Project Hero Images:** Most projects don't have hero images yet

---

## Content to Add

### Portfolio
- ~~Add LLM Interaction Learning Games as full MDX project page~~ ✓ DONE
- ~~Add Fire Protection Lead Intelligence as full MDX project page~~ ✓ DONE
- Add Reporting Strategy Catalog Platform as project
- Add hero images/screenshots for projects (currently only DeerAI has one)

### Blog
- ~~Migrate 2 posts from salvage folder~~ ✓ DONE
- Write new posts (Steve Zissou/Percy Fawcett connection mentioned in goals)
- Add more maker/technical posts

### Design Assets
- Create proper OG image (1200x630) for social sharing
- Create project thumbnail images

---

## Important URLs

- **Production Site:** https://marktornga.com
- **Vercel Dashboard:** https://vercel.com/mark-torngas-projects/marktorngadotcom
- **GitHub Repo:** https://github.com/mtornga/marktorngadotcom
- **LinkedIn:** https://linkedin.com/in/marktornga
- **Domain Registrar:** (Check Route 53)

---

## Environment & Accounts

### Vercel
- **Account:** Logged in via CLI
- **Project:** mark-torngas-projects/marktorngadotcom
- **CLI:** Installed globally (`npm install -g vercel`)

### AWS
- **Route 53:** DNS configured
- **Nameservers:** Route 53 (ns-798.awsdns-35.net, etc.)
- **A Records:** Both root and www pointing to 76.76.21.21

### GitHub
- **Repo:** mtornga/marktorngadotcom
- **Branch:** main
- **Auto-deploy:** Enabled via Vercel integration

---

## Quick Reference Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# Vercel
vercel                   # Deploy to preview
vercel --prod            # Deploy to production
vercel domains ls        # List domains
vercel logs              # View deployment logs

# Git
git add .
git commit -m "message"
git push origin main     # Triggers Vercel auto-deploy
```

---

## Session Summary

This session was highly productive! We went from Phase 2 completion to a fully deployed production site with real content. Key achievements:

1. ✅ Built complete portfolio section with MDX support
2. ✅ Created comprehensive DeerAI project content
3. ✅ Designed and implemented interactive resume dial
4. ✅ Built About page with progressive disclosure
5. ✅ Deployed to Vercel production
6. ✅ Configured custom domain with DNS
7. ✅ Site is LIVE at marktornga.com
8. ✅ **Populated About page with real resume content** (Phase 4.5 - December 17)
9. ✅ **Implemented user feedback** (Phase 6 - December 17)
   - Fixed blog 404 - created full blog section with 2 migrated posts
   - Updated homepage hero with career-focused positioning
   - Added 4 more portfolio projects (now 5 total)
   - Created contact page with services and CTAs
   - Fixed About page to default to Medium content
   - Created custom 404 page
   - Updated SEO metadata

The site now has a complete foundation with portfolio, blog, about, and contact pages. Career positioning emphasizes data architecture consulting availability.

---

**Status:** 🚀 LIVE IN PRODUCTION (ready to deploy changes)
**Next Steps:** Create proper OG image, add project hero images, GA4 setup
**Ready for:** More blog posts, additional projects, performance optimization

---

*Last Updated: December 17, 2025*
*Latest Session: Phase 6 - User Feedback Implementation*
*Developer: Claude Code*

