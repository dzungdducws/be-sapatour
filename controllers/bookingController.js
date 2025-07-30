const db = require("../db");
exports.getBookingHotel = async (req, res) => {
  try {
    const list_booking_hotel = await db("booking_hotel_info")
      .select(
        "booking_hotel_info.id",
        "booking_hotel_info.check_in_date",
        "booking_hotel_info.check_out_date",
        "booking_hotel_info.note",
        "booking_hotel_info.status",
        "booking_hotel_info.created_at",
        "booking_hotel_info.updated_at",
        "hotel.name",
        "hotel.location"
      )
      .leftJoin("hotel", "booking_hotel_info.id_hotel", "=", "hotel.id")
      .where("booking_hotel_info.id_user", req.params.id);

    const bookingIds = list_booking_hotel.map((booking) => booking.id);
    const allRooms = await db("booking_hotel_room_detail")
      .select(
        "booking_hotel_room_detail.id_booking",
        "booking_hotel_room_detail.id_room",
        "room.name",
        "room.price",
        "room.numberOfRoom",
        "room.image"
      )
      .leftJoin("room", "booking_hotel_room_detail.id_room", "=", "room.id")
      .whereIn("id_booking", bookingIds);

    const roomsByBooking = allRooms.reduce((acc, room) => {
      if (!acc[room.id_booking]) {
        acc[room.id_booking] = {
          rooms: [],
          totalPrice: 0,
        };
      }

      acc[room.id_booking].rooms.push({
        id_room: room.id_room,
        name: room.name,
        price: room.price,
        numberOfRoom: room.numberOfRoom,
        image: room.image,
      });

      acc[room.id_booking].totalPrice += room.price;

      return acc;
    }, {});

    const allServices = await db("booking_hotel_service_detail")
      .select(
        "booking_hotel_service_detail.id_booking",
        "booking_hotel_service_detail.id_service",
        "hotel_service.name",
        "booking_hotel_service_detail.price",
        "booking_hotel_service_detail.quantity"
      )
      .leftJoin(
        "hotel_service",
        "booking_hotel_service_detail.id_service",
        "=",
        "hotel_service.id"
      )
      .whereIn("id_booking", bookingIds);

    const serviceByBooking = allServices.reduce((acc, service) => {
      if (!acc[service.id_booking]) {
        acc[service.id_booking] = {
          services: [],
          totalPrice: 0,
        };
      }

      acc[service.id_booking].services.push({
        id_service: service.id_service,
        name: service.name,
        price: service.price,
        quantity: service.quantity,
      });

      acc[service.id_booking].totalPrice += service.price * service.quantity;

      return acc;
    }, {});

    const result = list_booking_hotel.map((booking) => ({
      ...booking,
      rooms: roomsByBooking[booking.id]?.rooms || [],
      totalPriceRoom: roomsByBooking[booking.id]?.totalPrice || 0,
      services: serviceByBooking[booking.id]?.services || [],
      totalPriceService: serviceByBooking[booking.id]?.totalPrice || 0,
      totalPrice:
        (roomsByBooking[booking.id]?.totalPrice || 0) +
        (serviceByBooking[booking.id]?.totalPrice || 0),
      type: 1,
    }));
    res.status(200).json({
      status: "200",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      data: {
        message: "Lỗi server",
        error: err,
      },
    });
  }
};

exports.getBookingRestaurant = async (req, res) => {
  try {
    const list_booking_restaurant = await db("booking_restaurant_info")
      .select(
        "booking_restaurant_info.id",
        "booking_restaurant_info.check_in_date",
        "booking_restaurant_info.check_in_time",
        "booking_restaurant_info.note",
        "booking_restaurant_info.status",
        "booking_restaurant_info.created_at",
        "booking_restaurant_info.updated_at",
        "booking_restaurant_info.number_people",
        "restaurant.name",
        "restaurant.location",
        "restaurant.image"
      )
      .leftJoin(
        "restaurant",
        "booking_restaurant_info.id_restaurant",
        "=",
        "restaurant.id"
      )
      .where("booking_restaurant_info.id_user", req.params.id);

    const bookingIds = list_booking_restaurant.map((booking) => booking.id);
    const allOrder = await db("booking_restaurant_bill")
      .select(
        "booking_restaurant_bill.id_booking_restaurant",
        "booking_restaurant_bill.id_food",
        "booking_restaurant_bill.quantity",
        "food_restaurant.name",
        "food_restaurant.price"
      )
      .leftJoin(
        "food_restaurant",
        "booking_restaurant_bill.id_food",
        "=",
        "food_restaurant.id"
      )
      .whereIn("id_booking_restaurant", bookingIds);

    const bill = allOrder.reduce((acc, order) => {
      if (!acc[order.id_booking_restaurant]) {
        acc[order.id_booking_restaurant] = {
          order: [],
          totalPrice: 0,
        };
      }

      acc[order.id_booking_restaurant].order.push({
        id_food: order.id_food,
        name: order.name,
        price: order.price,
        quantity: order.quantity,
      });

      acc[order.id_booking_restaurant].totalPrice +=
        order.price * order.quantity;

      return acc;
    }, {});

    const result = list_booking_restaurant.map((booking) => ({
      ...booking,
      bill: bill[booking.id]?.order || [],
      totalPriceBill: bill[booking.id]?.totalPrice || 0,
      type: 2,
    }));

    res.status(200).json({
      status: "200",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      data: {
        message: "Lỗi server",
        error: err,
      },
    });
  }
};

exports.getStatus = async (req, res) => {
  try {
    if (req.params.type == 2) {
      const status = await db("status_restaurant_booking").select("*");
      res.status(200).json({
        status: "200",
        data: status,
      });
    } else if (req.params.type == 1) {
      const status = await db("status_hotel_booking").select("*");
      res.status(200).json({
        status: "200",
        data: status,
      });
    } else {
      res.status(400).json({
        status: 400,
        data: {
          message: "Lỗi request",
          error: "type is required",
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      data: {
        message: "Lỗi server",
        error: err,
      },
    });
  }
};
