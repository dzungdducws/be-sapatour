/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("restaurant", function (table) {
    table.string("id").primary();
    table.string("name").notNullable();
    table.string("location").notNullable();
    table.text("image", "longtext").nullable();
    table.string("time_open").notNullable();
    table.string("time_close").notNullable();

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("restaurant");
};
