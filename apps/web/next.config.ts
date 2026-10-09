import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
const appDirectory = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  outputFileTracingRoot: resolve(appDirectory, "../.."),
  transpilePackages: ["@manovaspace/ui", "@manovaspace/tokens", "@lighthouse/ui"],
};

export default withNextIntl(nextConfig);
