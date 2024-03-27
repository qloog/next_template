const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      // NextJS <Image> component needs to whitelist domains for src={}
      'i.pinimg.com',
      "lh3.googleusercontent.com",
      "pbs.twimg.com",
      "images.unsplash.com",
      "logos-world.net",
      "toppng.com",
    ],
  },
  images: {
    minimumCacheTTL: 31536000,
}
};

module.exports = nextConfig;
