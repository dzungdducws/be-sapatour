const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const knexLib = require("knex");

require("dotenv").config();

const routes = require("./routes/index");
const knexConfig = require("./knexfile");

const app = express();
const port = process.env.PORT || 3000;

async function startServer() {
  // KHÔNG dùng mysql2 nữa - kết nối trực tiếp với PostgreSQL
  const environment = process.env.NODE_ENV || 'development';
  console.log('🔗 Connecting to database with config:', {
    client: knexConfig[environment].client,
    host: knexConfig[environment].connection.host,
    port: knexConfig[environment].connection.port
  });

  const knex = knexLib(knexConfig[environment]);
  app.locals.db = knex;

  // Kiểm tra kết nối
  try {
    const result = await knex.raw('SELECT version()');
    console.log('✅ Kết nối Supabase thành công!');
    console.log('📊 PostgreSQL version:', result.rows[0].version);
  } catch (error) {
    console.error('❌ Lỗi kết nối Supabase:\n', error);
    process.exit(1);
  }

  // Middleware
  app.use(cors());
  app.use(bodyParser.json());
  
  app.use("/api", routes);

  app.get("/", (req, res) => {
    res.status(200).json({ mes: "Oke" });
  });

  app.listen(port, () => {
    console.log(`🚀 Server chạy tại http://localhost:${port}`);
  });
}

startServer().catch((err) => {
  console.error("❌ Lỗi khởi động server:", err);
});