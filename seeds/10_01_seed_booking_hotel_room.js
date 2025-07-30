const { faker } = require("@faker-js/faker");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const res = [];
  const room = await knex("room").select("*");
  const id_rooms = room.map((room) => room.id);

  const id_hotel_bookings = await knex("booking_hotel_info").select("id");
  const id_hotel_bookings_id = id_hotel_bookings.map(
    (hotel_booking) => hotel_booking.id
  );

  id_hotel_bookings_id.forEach((id_booking) => {
    const soLanLap = faker.number.int({ min: 1, max: 3 });
    for (let i = 0; i < soLanLap; i++) {
      res.push({
        id: faker.string.uuid(),
        id_booking,
        id_room: faker.helpers.arrayElement(id_rooms),
        created_at: new Date(),
      });
    }
  });

  // Deletes ALL existing entries
  await knex("booking_hotel_room_detail").del();
  await knex("booking_hotel_room_detail").insert(res);
};
