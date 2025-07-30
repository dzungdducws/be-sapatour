/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("booking_hotel_info", function (table) {
    table.string("id").primary();
    table.string("id_hotel").references("id").inTable("hotel");
    table.string("id_user").references("id").inTable("users");
    table.date("check_in_date").notNullable();
    table.date("check_out_date").notNullable();
    table.string("note").notNullable();
    table.integer("status").references("id").inTable("status_hotel_booking");

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("room");
};
