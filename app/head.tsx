/* eslint-disable @next/next/no-page-custom-font */
export default function Head() {
  const title = "Crew Sounds";
  const description =
    "This is a Next.js built Spotify app for compatibility in real time";
  const image = "https://nextjs-mysql-auth.vercel.app/thumbnail.png";
  return (
    <>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
