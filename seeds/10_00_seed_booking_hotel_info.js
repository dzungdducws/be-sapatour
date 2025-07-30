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

  const status = await knex("status_hotel_booking").select("*");

  status.forEach((status) => {
    const checkInDate = faker.date.soon({
      days: faker.number.int({ min: 1, max: 5 }),
    });
    const checkOutDate = new Date(
      checkInDate.getTime() +
        faker.number.int({ min: 3, max: 5 }) * 24 * 60 * 60 * 1000
    );
    res.push({
      id: faker.number.int({ min: 1000000, max: 9999999 }),
      id_hotel: faker.helpers.arrayElement(["1", "2", "3", "4"]),
      id_user: user.id,
      note: faker.lorem.sentence(),
      status: status.id,

      check_in_date: checkInDate,
      check_out_date: checkOutDate,
    });
  });

  const users = await knex("users").select("id");
  const id_users = users.map((user) => user.id);

  const hotels = await knex("hotel").select("id");
  const id_hotels = hotels.map((hotel) => hotel.id);

  id_hotels.forEach((id_hotel) => {
    const soLanLap = faker.number.int({ min: 1, max: 5 });
    for (let i = 0; i < soLanLap; i++) {
      const checkInDate = faker.date.soon({
        days: faker.number.int({ min: 1, max: 5 }),
      });
      const checkOutDate = new Date(
        checkInDate.getTime() +
          faker.number.int({ min: 3, max: 5 }) * 24 * 60 * 60 * 1000
      );

      res.push({
        id: faker.number.int({ min: 1000000, max: 9999999 }),
        id_hotel,
        id_user: faker.helpers.arrayElement(id_users),
        note: faker.lorem.sentence(),

        status: faker.helpers.arrayElement(status.map((status) => status.id)),

        check_in_date: checkInDate,
        check_out_date: checkOutDate,
      });
    }
  });

  await knex("booking_hotel_info").del();
  await knex("booking_hotel_info").insert(res);
};
