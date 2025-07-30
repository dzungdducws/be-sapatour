const { simpleFaker, faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const user = [];

  for (let i = 0; i < 5; i++) {
    user.push({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email:
        "user" + i + faker.helpers.arrayElement(["@gmail.com", "@yahoo.com"]),
      password: bcrypt.hashSync("12345678", 10),
      role_id: 1,
      country: faker.location.country(),
      address: faker.location.streetAddress(),
      phone: faker.phone.number({ style: "international" }),
      avt: `https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/${faker.helpers.arrayElement(
        ["male", "female"]
      )}/512/${faker.number.int({ min: 1, max: 100 })}.jpg`,
      birthday: faker.date.birthdate(),
    });
  }

  for (let i = 0; i < 5; i++) {
    user.push({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email:
        "company" +
        i +
        faker.helpers.arrayElement(["@gmail.com", "@yahoo.com"]),
      password: bcrypt.hashSync("12345678", 10),
      role_id: 2,
      country: faker.location.country(),
      address: faker.location.streetAddress(),
      phone: faker.phone.number({ style: "international" }),
      avt: `https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/${faker.helpers.arrayElement(
        ["male", "female"]
      )}/512/${faker.number.int({ min: 1, max: 100 })}.jpg`,
      birthday: faker.date.birthdate(),
    });
  }

  // Xoá dữ liệu cũ
  await knex("users").del();

  // Thêm user cố định + random
  await knex("users").insert([
    {
      id: faker.string.uuid(),

      name: "User",
      email: "user@gmail.com",
      password: bcrypt.hashSync("12345678", 10),
      role_id: 1,
      country: faker.location.country(),
      address: faker.location.streetAddress(),
      phone: faker.phone.number(),
      avt: `https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/${faker.helpers.arrayElement(
        ["male", "female"]
      )}/512/${faker.number.int({ min: 1, max: 100 })}.jpg`,
      birthday: faker.date.birthdate(),
    },
    {
      id: faker.string.uuid(),

      name: "Admin",
      email: "admin@gmail.com",
      password: bcrypt.hashSync("12345678", 10),
      role_id: 2,
      country: faker.location.country(),
      address: faker.location.streetAddress(),
      phone: faker.phone.number(),
      avt: `https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/${faker.helpers.arrayElement(
        ["male", "female"]
      )}/512/${faker.number.int({ min: 1, max: 100 })}.jpg`,
      birthday: faker.date.birthdate(),
    },
    ...user,
  ]);
};
