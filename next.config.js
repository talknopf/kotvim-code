/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  i18n: {
    locales: ['he'],
    defaultLocale: 'he',
    localeDetection: false,
  },
};

module.exports = nextConfig;
