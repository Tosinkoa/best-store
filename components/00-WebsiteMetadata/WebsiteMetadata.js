import Head from "next/head";

const WebsiteMetadata = ({
  title,
  keywords,
  description,
  children,
  OG_Title_Key,
  OG_Title_Content,
}) => {
  return (
    <div>
      <Head>
        {/* <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#5bbad5"
        /> */}
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        <title>{title}</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:title"
          content={OG_Title_Content}
          key={OG_Title_Key}
        />
        <meta
          property="og:description"
          content="Archware Facility for Everyone"
        />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>
      {children}
    </div>
  );
};

export default WebsiteMetadata;

WebsiteMetadata.defaultProps = {
  title: "Best Store",
  description: "Best store to buy your goods",
  keywords: "Best store, Best Store, best Store, best, store, Best, Store",
  OG_Title_Content: "Best store to buy your goods",
  OG_Title_Key: "Best Store",
};
