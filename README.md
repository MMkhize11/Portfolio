# Mpumelelo Mkhize Portfolio

## Environment Configuration

Create a `.env.local` file in the root directory with the following variables:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://www.mpumelelomkhize.com
NEXT_PUBLIC_SITE_NAME="Mpumelelo Mkhize Portfolio"
NEXT_PUBLIC_SITE_DESCRIPTION="Expert tech translator and full-stack developer specializing in Firebase, Flutter, Angular, and Python"

# Analytics
NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX  # Replace with your GA4 measurement ID

# Social Media
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/mpumelelohowardmkhize
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/mpumi_khabazela
# NEXT_PUBLIC_FACEBOOK_URL=  # Uncomment when you have a Facebook page
# NEXT_PUBLIC_TWITTER_URL=   # Uncomment when you have a Twitter profile

# Contact Information
# NEXT_PUBLIC_CONTACT_PHONE=  # Uncomment and add your phone number
# NEXT_PUBLIC_CONTACT_ADDRESS= # Uncomment and add your address

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_SOCIAL_SHARING=true
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## SEO Features

This portfolio includes:
- Optimized meta tags and OpenGraph data
- XML sitemap generation
- Robots.txt configuration
- Structured data (JSON-LD)
- Google Analytics 4 integration
- Social media integration
- Performance optimizations

## Performance Optimizations

The site is configured with:
- Image optimization
- HTTP/2 support
- Security headers
- Code splitting
- Tree shaking
- Modern JavaScript features
- CSS optimization

## Social Media Integration

Currently integrated:
- LinkedIn
- Instagram

Placeholder for future integration:
- Facebook
- Twitter

## Contact Information

The contact component supports:
- Email
- Phone (optional)
- Address (optional)
- Social media links

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
