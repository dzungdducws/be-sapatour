/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("location").del();
  await knex("location").insert([
    {
      id: 1,
      name: "Phan Si Păng",
      location: "SaPa, Lào Cai",
      image:
        "https://res.cloudinary.com/dmkgsuq2n/image/upload/v1753407107/sapatour/img-sptour/location/1_jiy1uo.png"
    },

    {
      id: 2,
      name: "Đồi chè trái tim",
      location: "Bản Ôn, thị trấn Nông Trường Mộc Châu, H. Mộc Châu, Sơn La",
      image:
        "https://res.cloudinary.com/dmkgsuq2n/image/upload/v1753407107/sapatour/img-sptour/location/2_wgnr56.png"
    },
    {
      id: 3,
      name: "Rừng thông bản Áng",
      location: "Doi Quan 6, Group 10, Sapa, Lao Cai, Sa Pa",
      image:
        "https://res.cloudinary.com/dmkgsuq2n/image/upload/v1753407107/sapatour/img-sptour/location/3_jbppky.png"
    },
    {
      id: 4,
      name: "Thác Tạt Nàng",
      location: "6 Cũ, Chiềng Iêng, Mộc Châu, Sơn La",
      image:
        "https://res.cloudinary.com/dmkgsuq2n/image/upload/v1753407108/sapatour/img-sptour/location/4_nzpfug.png"
    },
    {
      id: 5,
      name: "Cầu kính tình yêu",
      location: "Mường Sang, Mộc Châu, Sơn La",
      image:
        "https://res.cloudinary.com/dmkgsuq2n/image/upload/v1753407108/sapatour/img-sptour/location/5_qdj1kw.png"
    },
  ]);
};
