/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("logger", function (table) {
    table.increments("id").primary();
    table.string("method");
    table.string("url");
    table.integer("status");
    table.float("response_time");
    table.string("ip");
    table.string("user_agent");
    table.timestamp("created_at").defaultTo(knex.fn.now());

    table.index(['created_at']);
    table.index(['method']);
    table.index(['status']);

  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
