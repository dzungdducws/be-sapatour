const knex = require("knex")(require("./knexfile").development);

// Custom stream cho Morgan
const knexStream = {
  write: async (message) => {
    try {
      const logData = parseMorganLog(message);

      await knex("logger").insert({
        method: logData.method,
        url: logData.url,
        status: logData.status,
        response_time: logData.responseTime,
        ip: logData.ip,
        user_agent: logData.userAgent,
      });
    } catch (error) {
      console.error("Lỗi khi lưu log vào MySQL:", error);
    }
  },
};

// Hàm phân tích log message
function parseMorganLog(message) {
  // Ví dụ cho format ':method :url :status :response-time ms - :res[content-length] :remote-addr :user-agent'
  const parts = message.split(" ");

  return {
    method: parts[0],
    url: parts[1],
    status: parseInt(parts[2]),
    responseTime: parseFloat(parts[3]),
    ip: parts[6] || "",
    userAgent: parts.slice(7).join(" ").trim() || "",
  };
}

module.exports = knexStream;
