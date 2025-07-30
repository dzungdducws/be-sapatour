/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("hotel_rate", function (table) {
    table.string("id").primary();
    table.string("id_hotel").references("id").inTable("hotel");
    table.string("id_user").references("id").inTable("users");
    table.integer("rating").notNullable();
    table.string("comment").nullable();

    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("hotel_rate");
};
