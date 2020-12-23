    
exports.up = function(knex) {
  return knex.schema.createTable('substituicoes', function (table){
      table.increment();
      table.string('nome');
      table.date('data');
      table.string('horario');
      table.string('status');
      table.integer('id_prof');
      table.integer('id_profsub');
      table.integer('id_dis');
      table.integer('id_disub');

      table.foreign('id_prof').references('id').inTable('professores');
      table.foreign('id_profsub').references('id').inTable('professores');
      table.foreign('id_dis').references('id').inTable('disciplinas');
      table.foreign('id_disub').references('id').inTable('disciplinas');
      
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('substituicoes');
};
