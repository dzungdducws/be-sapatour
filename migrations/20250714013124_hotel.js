/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("hotel", function (table) {
    table.string("id").primary();
    table.string("name").notNullable();
    table.string("location").notNullable();
    table.text("image", "longtext").nullable();
    table.string("phone").notNullable().defaultTo("0987654321");
    table.integer("star").notNullable().defaultTo(3);

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("hotel");
};
