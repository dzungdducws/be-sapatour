/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("status_hotel_booking", function (table) {
    table.integer("id").primary();
    table.string("name").notNullable();
    table.string("description").notNullable();

    table.string("color").notNullable();
    table.string("bgcolor").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
