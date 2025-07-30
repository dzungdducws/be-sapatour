const { faker } = require("@faker-js/faker");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const res = [];
  const id_restaurant_bookings = await knex("booking_restaurant_info").select(
    "id"
  );
  const id_restaurant_bookings_id = id_restaurant_bookings.map(
    (restaurant_booking) => restaurant_booking.id
  );

  const id_food = await knex("food_restaurant").select("id");
  const id_food_id = id_food.map((food) => food.id);

  id_restaurant_bookings_id.forEach((id_booking_restaurant) => {
    const soLanLap = faker.number.int({ min: 1, max: 3 });
    for (let i = 0; i < soLanLap; i++) {
      res.push({
        id: faker.number.int({ min: 1000000, max: 9999999 }),
        id_booking_restaurant,
        id_food: faker.helpers.arrayElement(id_food_id),
        quantity: faker.number.int({ min: 1, max: 2 }),
      });
    }
  });

  // Deletes ALL existing entries
  await knex("booking_restaurant_bill").del();
  await knex("booking_restaurant_bill").insert(res);
};
