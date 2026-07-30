
<h1 >LNNK</h1>

<p align="center">
  <img src="./app/apple-touch-icon.png" alt="lnnk logo" width="96" height="96" />
</p>



<p align="center">
  A minimal website for short links, QR codes, and lightweight CDN-style file sharing.
</p>

## Live Demo

- [lnnk Official Site](https://lnnk.click/)
- [Main Instance](https://lnnk.pxxl.click/)
- [Vercel Mirror](https://lnnkkk.vercel.app/)

## What It Does

lnnk started as a URL shortener, but it now also includes a mini CDN flow. You can shorten normal links, upload small files, generate shareable public URLs, and create QR codes for the links you make.

## Features

- **Short Links**: Create clean short URLs with generated or custom aliases.
- **Mini CDN**: Upload files through UploadThing and share them through lnnk CDN routes.
- **QR Codes**: Generate QR codes for shortened links and CDN assets.
- **Public Dashboard**: View public links and CDN assets without exposing destination details.
- **Expiration Support**: CDN assets can expire, with a Vercel Cron cleanup route for deleting expired UploadThing files and MongoDB records.
- **Validation & Safety**: Uses Zod validation, Nano ID generation, and server-side MongoDB persistence.
- **Modern UI**: Built with Tailwind CSS, Motion, and a focused App Router experience.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) App Router
- **Database**: [MongoDB](https://www.mongodb.com/) with Mongoose
- **File Storage**: [UploadThing](https://uploadthing.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Motion](https://motion.dev/)
- **Validation**: [Zod](https://zod.dev/)
- **QR Codes**: [qrcode.react](https://www.npmjs.com/package/qrcode.react)

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance, local or Atlas
- UploadThing app/token for CDN uploads

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jaimzh/lnnk-url-shortener.git
   cd lnnk-url-shortener
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   BASE_URL=http://localhost:3000
   UPLOADTHING_TOKEN=your_uploadthing_token
   CRON_SECRET=your_long_random_cron_secret
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## CDN Cleanup

Expired CDN assets are cleaned by a scheduled Vercel Cron route:

```txt
/api/cron/cleanup-cdn
```

For safe testing, use dry run mode:

```txt
/api/cron/cleanup-cdn?dryRun=true
```

In production, add `CRON_SECRET` to your Vercel environment variables. Vercel sends it as a bearer token when it invokes the cron job.

## Documentation

For a deeper dive into the project thinking, check out:

- [My Thoughts & Brain Dump](MY_THOUGHTS.md)
- [How It Works](HOW_IT_WORKS.md)
<!-- - [Cache and Security Notes](CACHE_AND_SECURITY.md) -->

## License

MIT
