import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Compresión gzip automática para todos los assets
  compress: true,

  // Optimización de imágenes: formatos modernos por defecto
  images: {
    formats: ["image/avif", "image/webp"],
    // Tamaños de dispositivo para srcset responsivo
    deviceSizes: [640, 750, 828, 1080, 1200, 1400, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // Caché de imágenes optimizadas por 30 días
    minimumCacheTTL: 2592000,
  },

  // Headers de seguridad y performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        // Cache agresivo para assets estáticos
        source: "/(.*)\\.(webp|png|jpg|jpeg|svg|ico|woff2|woff)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
