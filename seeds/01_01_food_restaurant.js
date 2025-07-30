/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("food_restaurant").del();
  await knex("food_restaurant").insert([
    { id: 1, name: "Vịt om chuối đậu", price: 100000 },
    { id: 2, name: "Vịt om bò", price: 100000 },
    { id: 3, name: "Vịt om gà", price: 100000 },
    { id: 4, name: "Gà hầm thuốc bắc", price: 100000 },
    { id: 5, name: "Gà quay lá mắc mật nguyên con 3 cân", price: 100000 },
    { id: 6, name: "Khâu nhục", price: 200000 },
    { id: 7, name: "Vịt quay", price: 100000 },
    { id: 8, name: "Heo quay", price: 200000 },
  ]);
};
