/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("restaurant_rate", function (table) {
    table.string("id").primary();
    table.string("id_restaurant").references("id").inTable("restaurant");
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
  return knex.schema.dropTableIfExists("restaurant_rate");
};
