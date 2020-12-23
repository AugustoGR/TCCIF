
exports.up = function(knex) {
    return knex.schema.createTable('turmas', function (table){
        table.string('nome');
        table.integer('id').primary();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('turmas');
};
