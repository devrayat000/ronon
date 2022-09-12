import { SitemapStream, streamToPromise } from "sitemap";
import type { LoaderArgs } from "@remix-run/node";

export const loader = async (_: LoaderArgs) => {
  const LAST_MOD = "2022-09-12T13:33:13.389Z";

  const smStream = new SitemapStream({
    hostname: `https://${process.env.VERCEL_URL || "www.rononbd.com"}/`,
  });

  smStream.write({
    url: "/",
    changefreq: "daily",
    lastmod: LAST_MOD,
    priority: 1.0,
  });
  smStream.write({
    url: "/about",
    changefreq: "daily",
    lastmod: LAST_MOD,
    priority: 0.9,
  });
  smStream.write({
    url: "/pricing",
    changefreq: "daily",
    lastmod: LAST_MOD,
    priority: 0.9,
  });
  smStream.write({
    url: "/contact",
    changefreq: "daily",
    lastmod: LAST_MOD,
    priority: 0.9,
  });
  smStream.write({
    url: "/privacy-policy",
    changefreq: "monthly",
    lastmod: LAST_MOD,
    priority: 0.6,
  });
  smStream.write({
    url: "/terms-conditions",
    changefreq: "monthly",
    lastmod: LAST_MOD,
    priority: 0.6,
  });
  smStream.write({
    url: "/questions",
    changefreq: "daily",
    lastmod: LAST_MOD,
    priority: 0.9,
  });
  smStream.end();

  return new Response(await streamToPromise(smStream), {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "xml-version": "1.0",
      //   encoding: "gzip",
      encoding: "UTF-8",
      "Cache-Control": `public, max-age=0, s-maxage=${60 * 60}`,
    },
  });
};
