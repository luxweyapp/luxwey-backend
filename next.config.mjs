/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com', 
          port: '',
          pathname: '/**', 
        },
      ],
    },
    
    async headers() {
      return [
        {
          source: "/api/:path*",
          headers: [
            { key: "Access-Control-Allow-Origin", value: "*" },
            { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, PATCH, DELETE" },
            { key: "Access-Control-Allow-Headers", value: "X-Requested-With, X-Requested-Without, Content-Type, content-type" },
            { key: "Access-Control-Allow-Credentials", value: "true" },
          ]
        },
      ];
    }
  };
  
export default nextConfig;