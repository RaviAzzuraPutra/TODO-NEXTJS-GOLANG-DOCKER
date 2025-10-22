import withPWA from "next-pwa";

const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["res.cloudinary.com"],
    },
    experimental: {
        optimizeCss: true,
    },
};

export default withPWA({
    dest: "public",
    disable: process.env.NODE_ENV === "development",
})(nextConfig);
