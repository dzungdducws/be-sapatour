const db = require("../db");

exports.getRestaurant = async (req, res) => {
  try {
    const restaurant = await db("restaurant").select("*");
    const rates = await db("restaurant_rate").select("*");
    restaurant.forEach((restaurant) => {
      const { total_rate, count } = rates.reduce(
        ({ total_rate, count }, item) => {
          if (restaurant.id === item.id_restaurant) {
            count++;
            total_rate += item.rating;
          }
          return { total_rate, count };
        },
        { total_rate: 0, count: 0 }
      );
      restaurant.rate = total_rate / count;
    });
    res.json({
      status: "200",
      data: restaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await db("restaurant").where("id", req.params.id).first();
    const rate = await db("restaurant_rate")
      .where("id_restaurant", req.params.id)
      .select("*");

    const total_rate = rate.reduce((rate, item) => {
      rate += item.rating;
      return rate;
    }, 0);

    restaurant.rate = total_rate / rate.length;

    res.json({
      status: "200",
      data: restaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
