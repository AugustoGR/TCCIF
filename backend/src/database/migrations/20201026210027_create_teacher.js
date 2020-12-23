exports.up = function(knex) {
    return knex.schema.createTable('professores', function (table) {
      table.string('nome');
      table.integer('id').primary();
      table.string('foto');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('professores');
  };
  