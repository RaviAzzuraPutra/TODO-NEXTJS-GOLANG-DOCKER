import withPWA from 'next-pwa';

const nextConfig = withPWA({
    dest: 'public',
    reactStrictMode: true,
});

export default nextConfig;
