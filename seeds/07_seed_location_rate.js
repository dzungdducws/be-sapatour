const { faker } = require("@faker-js/faker");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const rate = [];

  const users = await knex("users").select("id");
  const user_uuid = users.map((user) => user.id);

  user_uuid.forEach((id_user) => {
    const soLanDanhGia = faker.number.int({ min: 1, max: 10 });

    for (let i = 0; i < soLanDanhGia; i++) {
      const id_location = faker.helpers.arrayElement([1, 2, 3, 4, 5]);
      const rating = faker.helpers.arrayElement([1, 2, 3, 4, 4, 4, 5, 5, 5, 5]);
      const comment = faker.lorem.sentence();

      rate.push({
        id: faker.string.uuid(),
        id_user,
        id_location,
        rating,
        comment,
      });
    }
  });

  // Deletes ALL existing entries
  await knex("location_rate").del();

  await knex("location_rate").insert(rate);
};
