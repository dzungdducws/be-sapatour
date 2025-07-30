const db = require("../db");
exports.getHotel = async (req, res) => {
  try {
    const hotels = await db("hotel").select("*");
    const rates = await db("hotel_rate").select("id_hotel", "rating");

    const enrichedHotels = await Promise.all(
      hotels.map(async (hotel) => {
        const price = await db("room")
          .where("id_hotel", hotel.id)
          .min("price as min_price")
          .first();
        hotel.price = price?.min_price ?? 0;

        const { total_rate, count } = rates.reduce(
          (acc, item) => {
            if (item.id_hotel === hotel.id) {
              acc.count++;
              acc.total_rate += item.rating;
            }
            return acc;
          },
          { total_rate: 0, count: 0 }
        );

        hotel.rate = total_rate / count;

        return hotel;
      })
    );

    res.json({
      status: "200",
      data: enrichedHotels,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getHotelById = async (req, res) => {
  try {
    const hotel = await db("hotel").where("id", req.params.id).first();
    const rate = await db("hotel_rate")
      .where("id_hotel", req.params.id)
      .select("*");

    const price = await db("room")
      .where("id_hotel", hotel.id)
      .min("price as min_price")
      .first();
    hotel.price = price.min_price;

    const total_rate = rate.reduce((rate, item) => {
      rate += item.rating;
      return rate;
    }, 0);

    hotel.rate = total_rate / rate.length;

    res.json({
      status: "200",
      data: hotel,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
