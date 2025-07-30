/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("restaurant").del();
  await knex("restaurant").insert([
    {
      id: 1,
      name: "Nhà hàng Đỗ Quyên",
      location: "Doi Quan 6, Group 10, Sapa, Lao Cai, Sa Pa",
      image: "https://res.cloudinary.com/dmkgsuq2n/image/upload/v1753407088/sapatour/img-sptour/hotel/doquyen_matfno.png", time_open: "7:00",
      time_close: "23:00",
    },
    {
      id: 2,
      name: "Nhà hàng Đỗ Quyên 2",
      location: "Doi Quan 6, Group 10, Sapa, Lao Cai, Sa Pa",
      image: "https://res.cloudinary.com/dmkgsuq2n/image/upload/v1753407088/sapatour/img-sptour/hotel/doquyen_matfno.png", time_open: "7:00",
      time_close: "23:00",
    },
    {
      id: 3,
      name: "Nhà hàng Đỗ Quyên 3",
      location: "Doi Quan 6, Group 10, Sapa, Lao Cai, Sa Pa",
      image: "https://res.cloudinary.com/dmkgsuq2n/image/upload/v1753407088/sapatour/img-sptour/hotel/doquyen_matfno.png", time_open: "7:00",
      time_close: "23:00",
    },
    {
      id: 4,
      name: "Nhà hàng Đỗ Quyên 4",
      location: "Doi Quan 6, Group 10, Sapa, Lao Cai, Sa Pa",
      image: "https://res.cloudinary.com/dmkgsuq2n/image/upload/v1753407088/sapatour/img-sptour/hotel/doquyen_matfno.png", time_open: "7:00",
      time_close: "23:00",
    },
  ]);
};
