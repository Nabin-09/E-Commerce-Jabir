module.exports = [
  "strapi::errors",
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      origin: [
        "https://e-commerce-jabir.vercel.app",          // old (keep)
        "https://e-commerce-jabir-pptn7371o.vercel.app", // new
        "http://localhost:3000",                         // local dev
      ],
      headers: "*",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      credentials: true,
    },
  },
  "strapi::security",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
