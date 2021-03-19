import Head from "next/head";

export type PageMetadata = {
  title: string;
  description: string;
  tags: string[];
  hideMeta?: boolean;
};

export const SiteMetadata = (props: PageMetadata) => (
  <Head>
    <title>{props.title}</title>
    <meta name="description" content={props.description} />
    <meta name="author" content="Eric Dahlgren" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="keywords" content={["projekt", ...props.tags].join(", ")} />
  </Head>
);
