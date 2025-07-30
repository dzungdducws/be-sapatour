/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("room", function (table) {
    table.string("id").primary();
    table.string("id_hotel").references("id").inTable("hotel");
    table.string("name").notNullable();
    table.string("numberOfRoom").notNullable();
    table.integer("price").notNullable();
    table.text("image", "longtext").nullable();

    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("room");
};
