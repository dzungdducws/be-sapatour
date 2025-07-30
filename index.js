const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const knexLib = require("knex");
const morgan = require('morgan');
const knexStream = require('./knexLogger');

require("dotenv").config();

const routes = require("./routes/index");
const knexConfig = require("./knexfile");

const app = express();
const port = process.env.PORT || 3000;

async function startServer() {
  // B1: Tạo kết nối tạm (chưa có database)
  const tempKnex = knexLib({
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
  });

  // B2: Kiểm tra và tạo database nếu chưa có
  const dbName = process.env.DB_NAME;
  const exists = await tempKnex.raw(`SHOW DATABASES LIKE ?`, [dbName]);
  if (exists[0].length === 0) {
    await tempKnex.raw(`CREATE DATABASE ??`, [dbName]);
    console.log(`✅ Created database '${dbName}'`);
  } else {
    console.log(`✅ Database '${dbName}' already exists`);
  }

  await tempKnex.destroy(); // đóng kết nối tạm

  // B3: Kết nối knex chính thức
  const knex = knexLib(knexConfig.development);
  app.locals.db = knex; // nếu bạn muốn truy cập db qua req.app.locals.db

  // B4: Cấu hình middleware
  app.use(cors());
  app.use(bodyParser.json());
  app.use(
    morgan(
      ":method :url :status :response-time ms - :res[content-length] :remote-addr :user-agent",
      { stream: knexStream }
    )
  );

  app.use("/api", routes);

  app.get("/", (req, res) => {
    res.status(200).json({ mes: "Oke" });
  });

  // B5: Start server
  app.listen(port, () => {
    console.log(`🚀 Server chạy tại http://localhost:${port}`);
  });
}

startServer().catch((err) => {
  console.error("❌ Lỗi khởi động server:", err);
});
