/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // 使用的图片来源域名
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '*.cos.ap-nanjing.myqcloud.com'
          }
        ],
        unoptimized: true
    },
};

export default nextConfig;
