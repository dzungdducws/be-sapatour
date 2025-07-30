/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("hotel_service").del();
  await knex("hotel_service").insert([
    { id: "1", name: "Giặt là" },
    { id: "2", name: "Bữa sáng" },
    { id: "3", name: "Bữa trưa" },
    { id: "4", name: "Bữa tối" },
    { id: "5", name: "Nước lọc" },
    { id: "6", name: "Nước ngọt" },
    { id: "7", name: "Cafe" },
  ]);
};
