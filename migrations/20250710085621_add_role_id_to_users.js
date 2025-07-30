// migrations/xxxx_add_role_id_to_users.js
exports.up = function (knex) {
  return knex.schema.alterTable("users", function (table) {
    table
      .integer("role_id")
      .unsigned()
      .defaultTo(1)
      .references("id")
      .inTable("roles")
      .onDelete("SET NULL");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("users", function (table) {
    table.dropColumn("role_id");
  });
};
