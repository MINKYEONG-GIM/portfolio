import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // 예전 주소로 들어와도 새 주소로 이동
  async redirects() {
    return [{ source: "/projects/ontology-agent-platform", destination: "/projects/agent-platform", permanent: true }];
  }
};

export default nextConfig;
