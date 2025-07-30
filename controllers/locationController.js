const db = require("../db");

exports.getLocation = async (req, res) => {
  try {
    const location = await db("location").select("*");
    const rates = await db("location_rate").select("*");
    location.forEach((location) => {
      const { total_rate, count } = rates.reduce(
        ({ total_rate, count }, item) => {
          if (location.id === item.id_location) {
            count++;
            total_rate += item.rating;
          }
          return { total_rate, count };
        },
        { total_rate: 0, count: 0 }
      );
      location.rate = total_rate / count;
    });
    res.json({
      status: "200",
      data: location,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getLocationById = async (req, res) => {
  try {
    const location = await db("location").where("id", req.params.id).first();
    const rate = await db("location_rate")
      .where("id_location", req.params.id)
      .select("*");

    const total_rate = rate.reduce((rate, item) => {
      rate += item.rating;
      return rate;
    }, 0);

    location.rate = total_rate / rate.length;

    res.json({
      status: "200",
      data: location,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
