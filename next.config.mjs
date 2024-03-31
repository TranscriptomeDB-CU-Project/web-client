/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  output: 'standalone',
  async rewrites() {
    if (process.env.NODE_ENV === 'development')
      return [
        {
          source: '/_api/:path*',
          destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*` || '',
        },
      ]
    return []
  },
}

export default nextConfig
