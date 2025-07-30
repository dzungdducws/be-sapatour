/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("location_rate", function (table) {
    table.string("id").primary();
    table.string("id_location").references("id").inTable("location");
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
  return knex.schema.dropTableIfExists("location_rate");
};
