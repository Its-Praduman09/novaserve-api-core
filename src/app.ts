import Fastify from "fastify";
import dotenv from "dotenv";
import { db } from "./config/db";
dotenv.config();

const app = Fastify({ logger: true });
const port = Number(process.env.PORT) || 4000;

// Professional Health Check

app.get("/health", async (request, reply) => {
  try {
    await db.execute("SELECT 1");
    return {
      success: true,
      message: " 🚀 Database connected established successfully",
    };
  } catch (error) {
    return reply.status(500).send({
      success: false,
      message: "Database connection failed",
    });
  }
});

const start = async () => {
  try {
    await app.listen({ port, host: "0.0.0.0" });
    console.log("-----------------------------------------");
    console.log(`✅ SERVER RUNNING ON PORT: ${port}`);
    console.log(`🔗 CHECK DB: http://localhost:${port}/health`);
    console.log("-----------------------------------------");
  } catch (err) {
    console.error("❌ Startup Error:", err);
    process.exit(1);
  }
};

start();
