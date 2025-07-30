const { faker } = require("@faker-js/faker");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const res = [];
  const id_hotel_bookings = await knex("booking_hotel_info").select("id");
  const id_hotel_bookings_id = id_hotel_bookings.map(
    (hotel_booking) => hotel_booking.id
  );

  const id_services = await knex("hotel_service").select("id");
  const id_services_id = id_services.map((service) => service.id);

  id_hotel_bookings_id.forEach((id_booking) => {
    const soLanLap = faker.number.int({ min: 1, max: 3 });
    for (let i = 0; i < soLanLap; i++) {
      res.push({
        id: faker.string.uuid(),
        id_booking,
        id_service: faker.helpers.arrayElement(id_services_id),
        quantity: faker.number.int({ min: 1, max: 3 }),
        price:
          faker.number.int({ min: 1, max: 5 }) *
          faker.helpers.arrayElement([10000, 50000]),
      });
    }
  });

  // Deletes ALL existing entries
  await knex("booking_hotel_service_detail").del();
  await knex("booking_hotel_service_detail").insert(res);
};
