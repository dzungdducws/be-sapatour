const { faker } = require("@faker-js/faker");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const res = [];
  const hotel = await knex("hotel").select("id");
  const id_hotel = hotel.map((hotel) => hotel.id);

  id_hotel.forEach((id_hotel) => {
    const soLanDanhGia = faker.number.int({ min: 1, max: 10 });
    for (let i = 0; i < soLanDanhGia; i++) {
      const selectRoom = faker.helpers.arrayElement([
        {
          name: "Phòng đơn",
          numberOfRoom: 1,
        },
        {
          name: "Phòng đôi",
          numberOfRoom: 2,
        },
        {
          name: "Phòng tri",
          numberOfRoom: 3,
        },
      ]);
      const name = selectRoom.name;
      const numberOfRoom = selectRoom.numberOfRoom;
      const price = faker.number.int({ min: 5, max: 10 }) * 100000;
      const image =
        "https://res.cloudinary.com/dmkgsuq2n/image/upload/v1753407087/sapatour/img-sptour/hotel/deluxe_chebwv.png"
      res.push({
        id: faker.string.uuid(),
        id_hotel,
        name,
        numberOfRoom,
        price,
        image,
      });
    }
  });

  // Deletes ALL existing entries
  await knex("room").del();
  await knex("room").insert(res);
};
