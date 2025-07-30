/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("status_hotel_booking").del();
  await knex("status_hotel_booking").insert([
    {
      id: 1,
      name: "Chờ xác nhận",
      color: "#FFBF00",
      bgcolor: "#FFF7CD",
      description:
        "Đơn đặt phòng của bạn đang chờ xác nhận. Chúng tôi sẽ thông báo cho bạn ngay khi có phản hồi từ cơ sở lưu trú. ",
    },
    {
      id: 2,
      name: "Đã xác nhận",
      color: "#2CD9C5",
      bgcolor: "#D5F6E8",
      description:
        "Đơn đặt phòng của bạn đã được xác nhận. Vui lòng đến check-in đúng ngày để đảm bảo phòng luôn sẵn sàng cho bạn.",
    },
    {
      id: 3,
      name: "Đã cọc",
      color: "#826AF9",
      bgcolor: "#FBEBFF",
      description:
        "Địa điểm lưu trú đã nhận được tiền cọc của bạn. Vui lòng đến check-in đúng ngày để đảm bảo phòng luôn sẵn sàng cho bạn.",
    },
    {
      id: 4,
      name: "Đã nhận phòng",
      color: "#4A98E2",
      bgcolor: "#D0F2FF",
      description:
        "Bạn đã nhận phòng thành công. Chúc bạn có một kỳ nghỉ thật tuyệt vời! Nếu cần hỗ trợ, hãy liên hệ lễ tân ngay nhé.",
    },
    {
      id: 5,
      name: "Đã thanh toán",
      color: "#54D62C",
      bgcolor: "#E9FCD4",
      description:
        "Bạn cảm thấy thế nào về trải nghiệm tại cơ sở lưu trú này? Hãy chia sẻ cảm nhận với SaPa Tour nhé!",
    },
    {
      id: 6,
      name: "Đã hủy",
      color: "#FF4842",
      bgcolor: "#FFE7D9",
      description: "Đã huỷ đặt phòng vào",
    },
  ]);
};
