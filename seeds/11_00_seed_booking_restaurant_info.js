const { faker } = require("@faker-js/faker");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const res = [];
  const user = await knex("users")
    .select("*")
    .where({ email: "user@gmail.com" })
    .first();

  const status = await knex("status_restaurant_booking").select("*");

  status.forEach((status) => {
    if (status.id !== 3) {
      const check_in_date = faker.date.soon({
        days: faker.number.int({ min: 1, max: 5 }),
      });
      const h = faker.number.int({ min: 7, max: 20 });
      const m = faker.number.int({ min: 0, max: 5 }) * 10;
      const check_in_time =
        (h < 10 ? "0" + h : h) + ":" + (m < 10 ? (m == 0 ? "00" : "0" + m) : m);

      res.push({
        id: faker.number.int({ min: 1000000, max: 9999999 }),
        id_restaurant: faker.helpers.arrayElement(["1", "2", "3", "4"]),
        id_user: user.id,
        note: faker.lorem.sentence(),
        status: status.id,
        number_people: faker.number.int({ min: 1, max: 5 }),
        check_in_date,
        check_in_time,
      });
    }
  });

  const users = await knex("users").select("id");
  const id_users = users.map((user) => user.id);

  const restaurants = await knex("restaurant").select("id");
  const id_restaurants = restaurants.map((restaurant) => restaurant.id);

  id_restaurants.forEach((id_restaurant) => {
    const soLanLap = faker.number.int({ min: 1, max: 5 });
    for (let i = 0; i < soLanLap; i++) {
      const check_in_date = faker.date.soon({
        days: faker.number.int({ min: 1, max: 5 }),
      });
      const h = faker.number.int({ min: 7, max: 20 });
      const m = faker.number.int({ min: 0, max: 5 }) * 10;
      const check_in_time =
        (h < 10 ? "0" + h : h) + ":" + (m < 10 ? (m == 0 ? "00" : "0" + m) : m);

      res.push({
        id: faker.number.int({ min: 1000000, max: 9999999 }),
        id_restaurant,
        id_user: faker.helpers.arrayElement(id_users),
        note: faker.lorem.sentence(),

        status: faker.helpers.arrayElement(status.map((status) => status.id)),
        number_people: faker.number.int({ min: 1, max: 5 }),

        check_in_date,
        check_in_time,
      });
    }
  });

  await knex("booking_restaurant_info").del();
  await knex("booking_restaurant_info").insert(res);
};
