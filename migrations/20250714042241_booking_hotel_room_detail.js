/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("booking_hotel_room_detail", function (table) {
    table.string("id").primary();
    table.string("id_booking").references("id").inTable("booking_hotel_info");
    table.string("id_room").references("id").inTable("room");

    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("booking_hotel_detail");
};
