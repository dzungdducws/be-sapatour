/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("booking_restaurant_info", function (table) {
    table.string("id").primary();
    table.string("id_restaurant").references("id").inTable("restaurant");
    table.string("id_user").references("id").inTable("users");
    table.date("check_in_date").notNullable();
    table.string("check_in_time").notNullable();

    table.integer("number_people").notNullable();
    table.string("note").notNullable();
    table
      .integer("status")
      .references("id")
      .inTable("status_restaurant_booking");

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
