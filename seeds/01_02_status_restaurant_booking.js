/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("status_restaurant_booking").del();
  await knex("status_restaurant_booking").insert([
    {
      id: 1,
      name: "Chờ xác nhận",
      color: "#FFBF00",
      bgcolor: "#FFF7CD",
      description:
        "Đơn đặt bàn của bạn đang chờ xác nhận. Chúng tôi sẽ thông báo cho bạn ngay khi có phản hồi từ cơ sở ẩm thực.",
    },
    {
      id: 2,
      name: "Đã xác nhận",
      color: "#2CD9C5",
      bgcolor: "#D5F6E8",
      description:
        "Đơn đặt bàn của bạn đã được xác nhận. Vui lòng đến đúng giờ để đảm bảo bàn luôn sẵn sàng cho bạn.",
    },
    {
      id: 3,
      name: "Đã cọc",
      color: "#826AF9",
      bgcolor: "#FBEBFF",
      description:
        "Địa điểm ẩm thực đã nhận được tiền cọc của bạn. Vui lòng đến đúng giờ để đảm bảo bàn luôn sẵn sàng cho bạn.",
    },
    {
      id: 4,
      name: "Đã nhận bàn",
      color: "#4A98E2",
      bgcolor: "#D0F2FF",
      description:
        "Bạn đã nhận bàn thành công. Chúc bạn có một bữa ăn ngon miệng! Nếu cần hỗ trợ, vui lòng liên hệ nhân viên phục vụ.",
    },
    {
      id: 5,
      name: "Đã thanh toán",
      color: "#54D62C",
      bgcolor: "#E9FCD4",
      description:
        "Bạn cảm thấy thế nào về trải nghiệm tại cơ sở ẩm thực này? Hãy chia sẻ cảm nhận với SaPa Tour nhé!",
    },
    {
      id: 6,
      name: "Đã hủy",
      color: "#FF4842",
      bgcolor: "#FFE7D9",
      description: "Đã huỷ đặt bàn vào",
    },
  ]);
};
