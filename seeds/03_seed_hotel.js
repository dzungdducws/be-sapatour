/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("hotel").del();
  await knex("hotel").insert([
    {
      id: 1,
      name: "Silk Path Grand Sapa Resort & Spa",
      location: "Doi Quan 6, Group 10, Sapa, Lao Cai, Sa Pa",
      image: 'https://res.cloudinary.com/dmkgsuq2n/image/upload/v1753407087/sapatour/img-sptour/hotel/1_qghybe.png',
      star: 5,
    },
    {
      id: 2,
      name: "Silk Path Grand Sapa Resort & Spa 2",
      location: "Doi Quan 6, Group 10, Sapa, Lao Cai, Sa Pa",
      image: 'https://res.cloudinary.com/dmkgsuq2n/image/upload/v1753407087/sapatour/img-sptour/hotel/1_qghybe.png',
      star: 4,
    },
    {
      id: 3,
      name: "Silk Path Grand Sapa Resort & Spa 3",
      location: "Doi Quan 6, Group 10, Sapa, Lao Cai, Sa Pa",
      image: 'https://res.cloudinary.com/dmkgsuq2n/image/upload/v1753407087/sapatour/img-sptour/hotel/1_qghybe.png',
      star: 3,
    },
    {
      id: 4,
      name: "Silk Path Grand Sapa Resort & Spa 4",
      location: "Doi Quan 6, Group 10, Sapa, Lao Cai, Sa Pa",
      image: 'https://res.cloudinary.com/dmkgsuq2n/image/upload/v1753407087/sapatour/img-sptour/hotel/1_qghybe.png',
      star: 2,
    },
  ]);
};
