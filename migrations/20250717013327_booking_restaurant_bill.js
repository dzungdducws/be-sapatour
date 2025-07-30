/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("booking_restaurant_bill", function (table) {
    table.string("id").primary();
    table
      .string("id_booking_restaurant")
      .references("id")
      .inTable("booking_restaurant_info");
    table.string("id_food").references("id").inTable("food_restaurant");
    table.integer("quantity").notNullable().defaultTo(0);

    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
