process.env.PORT ??= "3004";
process.env.HOSTNAME ??= "0.0.0.0";
await import("../.next/standalone/server.js");
