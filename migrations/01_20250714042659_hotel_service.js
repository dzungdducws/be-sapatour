exports.up = function (knex) {
  return knex.schema.createTable("hotel_service", function (table) {
    table.string("id").primary();
    table.string("name").notNullable().unique(); 
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("hotel_service");
};
