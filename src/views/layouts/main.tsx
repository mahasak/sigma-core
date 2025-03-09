import { Html } from '@elysiajs/html';

import CustomMetaTag from '../components/custom-meta-tag';

export default function MainLayout({
  title,
  description,
  image,
  children,
}: {
  title?: string;
  description?: string;
  image?: string;
  children: JSX.Element;
}) {
  const isProduction = process.env.NODE_ENV === 'production';

  return (
    <html>
      <head>
        <title>I don't have spotify</title>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000000" />

        <CustomMetaTag property="og:type" content="website" />
        <CustomMetaTag property="og:url" content="https://femto.sh/" />
        <CustomMetaTag property="og:site_name" content="FEMTO.SH" />
        <CustomMetaTag property="og:title" content={title ?? "FEMTO.SH"} />
        
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css"
        />
        <link href="https://fonts.cdnfonts.com/css/poppins" rel="stylesheet" />
        <script src="https://unpkg.com/htmx.org@1.9.12"></script>

        <link href="/assets/index.min.css" rel="stylesheet" />
      </head>

      <body class="h-screen bg-black font-light text-white">{children}</body>

      {isProduction && (
        <script defer src="https://cloud.umami.is/script.js" data-website-id="09f4c462-0247-48e4-bd68-ba2adf5c0403"></script>
      )}

      <script src="assets/app.js" />
    </html>
  );
}
