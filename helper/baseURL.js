const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://flmsservices-2021.vercel.app"
    : "http://localhost:3000";

export default baseUrl;
