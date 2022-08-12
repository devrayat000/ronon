/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  serverBuildTarget:
    process.env.NETLIFY || process.env.NETLIFY_LOCAL
      ? "netlify"
      : process.env.VERCEL || process.env.VERCEL_URL
      ? "vercel"
      : "node-cjs",
  server:
    process.env.NETLIFY || process.env.NETLIFY_LOCAL
      ? "./server.netlify.js"
      :process.env.VERCEL || process.env.VERCEL_URL
      ? "./server.vercel.js"
      : undefined,
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
};
