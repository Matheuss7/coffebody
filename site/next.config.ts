import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
// Precisa bater com o nome do repositório no GitHub.
const repository = "coffebody";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: isGithubPages ? `/${repository}` : "",
  assetPrefix: isGithubPages ? `/${repository}/` : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? `/${repository}` : "",
  },
};

export default nextConfig;
