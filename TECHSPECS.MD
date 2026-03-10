# Technical Specifications for Aequitas Index Website

## Overview

The Aequitas Index website is a multi-page platform designed to provide corrected Global Innovation Index (GII) data and insights for institutional investors, development finance institutions, and emerging market governments. The site emphasizes data-driven hooks, including efficiency scores, peer comparisons, trend analysis, geospatial clusters, and predictive peers. It features interactive dashboards, reports, and subscription-based access.

**Key Requirements:**
- Mobile-first responsive design
- Data visualization components (charts, maps, scatter plots)
- User authentication for paid tiers
- API access for institutional users
- SEO-optimized static pages where possible
- Secure data handling

## Technology Stack

### Frontend
- **Framework:** React (as specified)
- **Build Tool:** Next.js (recommended for React-based full-stack apps, static generation, and API routes; integrates well with Vercel hosting)
- **Styling:** Tailwind CSS (for rapid, responsive, mobile-first development)
- **State Management:** React Context or Zustand (for user auth and data state)
- **Routing:** Next.js built-in routing

### Backend
- **Runtime:** Node.js (via Next.js API routes for serverless functions)
- **Database:** Supabase (PostgreSQL-based; provides real-time subscriptions, auth, and API out of the box)
- **Authentication:** Supabase Auth (integrates seamlessly with Supabase database; supports email/password, OAuth providers like Google)
- **API:** Supabase REST API for data access; Stripe API for subscription payments (recommended for handling Explorer/Analyst/Professional tiers)

### Data Visualization
- **Charts and Plots:** D3.js (for custom, advanced visualizations like scatter plots and trend lines; highly flexible for data hooks)
- **Maps:** Leaflet (open-source mapping library for geospatial clusters and choropleth maps)
- **Simple Charts:** Chart.js (as a lighter alternative for basic bar/line charts if needed)

### Hosting and Deployment
- **Platform:** Vercel (as specified; optimized for Next.js, provides automatic HTTPS, CDN, and serverless functions)
- **CI/CD:** GitHub Actions or Vercel auto-deploy on push to main branch
- **Domain:** Custom domain (e.g., aequitasindex.com) configured in Vercel

### Additional Tools and Libraries
- **Forms:** React Hook Form (for contact/demo request forms)
- **Icons:** Lucide React (for UI icons)
- **Email:** Resend or SendGrid (for transactional emails like demo requests)
- **Analytics:** Vercel Analytics or Google Analytics (for tracking user engagement)
- **Testing:** Jest and React Testing Library (for unit/integration tests)
- **Linting:** ESLint with Next.js config

## Architecture

### Site Structure
- **Static Pages:** Home, Product, Methodology, Pricing, Reports, About, Contact (generated statically for SEO)
- **Dynamic Pages:** Dashboard (authenticated), Country Profiles (data-driven)
- **API Routes:** /api/auth (for login/signup), /api/data (for fetching GII-adjusted data), /api/reports (for generating PDFs)

### Data Flow
1. Raw GII data ingested from WIPO APIs or CSV files, processed via scripts to compute efficiency scores, peers, trends, etc.
2. Stored in Supabase database with tables for countries, scores, historical data, users, subscriptions.
3. Frontend fetches data via Supabase client or API routes; visualizations rendered client-side with D3.js/Leaflet.
4. Paid features gated by Supabase auth and subscription status (checked via Stripe webhooks).

### Authentication and Authorization
- Users sign up via Supabase Auth; roles: Free (Explorer), Paid (Analyst/Professional/Enterprise).
- JWT tokens managed by Supabase; protected routes check user tier.
- Subscription management via Stripe: webhooks update user status in Supabase.

### Security
- **HTTPS:** Enforced by Vercel.
- **Data Encryption:** Supabase handles encryption at rest and in transit.
- **Input Validation:** Sanitize all user inputs (e.g., via Zod in API routes).
- **Rate Limiting:** Vercel/serverless function limits to prevent abuse.
- **GDPR Compliance:** Minimal user data collection; provide data export/deletion options.
- **API Security:** Use Supabase RLS (Row Level Security) for data access control.

## Development Workflow

1. **Setup:** Clone repo, install dependencies with npm/yarn, set up Supabase project and Vercel account.
2. **Local Development:** Run `npm run dev` for Next.js dev server; connect to local Supabase instance if needed.
3. **Data Processing:** Scripts to import/clean GII data and compute adjustments (Python or Node.js).
4. **Testing:** Run tests with `npm test`; manual QA for visualizations on mobile/desktop.
5. **Deployment:** Push to main branch triggers Vercel build; preview deployments for PRs.
6. **Monitoring:** Use Vercel dashboard for performance; Supabase for database metrics.

## Performance and SEO
- **Static Generation:** Use Next.js ISR (Incremental Static Regeneration) for data-heavy pages to balance freshness and speed.
- **Lazy Loading:** Images and components loaded on demand.
- **CDN:** Vercel global CDN for fast loading worldwide.
- **SEO:** Meta tags, structured data for reports; sitemap generation.
- **Accessibility:** WCAG 2.1 compliance; alt text for visualizations.

## Risks and Considerations
- **Data Accuracy:** Ensure GII data processing scripts are thoroughly tested; version control for methodologies.
- **Scalability:** Supabase scales with usage; monitor costs for large datasets.
- **Cost:** Vercel free tier sufficient for start; Supabase has generous free plan.
- **Maintenance:** Regular updates for dependencies; monitor for breaking changes in D3.js/Leaflet.

## Next Steps
- Set up Supabase project and connect to database.
- Implement basic Next.js structure with pages for each route.
- Develop data processing pipeline for GII adjustments.
- Build authentication flow and protected routes.
- Create visualization components for each data hook.

*Document version 1.0 — March 2026. Based on user requirements and recommended best practices.*