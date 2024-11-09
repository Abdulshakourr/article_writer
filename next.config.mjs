// /** @type {import('next').NextConfig} */
// const removeImports = require("next-remove-imports")();
// const nextConfig = removeImports()({
//   // your Next.js config
// });
//
// export default nextConfig;

// next.config.mjs
import removeImports from "next-remove-imports";

/** @type {import('next').NextConfig} */
const nextConfig = removeImports()({
  // your Next.js config
});

export default nextConfig;
