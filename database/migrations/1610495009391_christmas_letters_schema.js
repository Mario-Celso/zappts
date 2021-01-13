'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChristmasLettersSchema extends Schema {
  up () {
    this.create('christmas_letters', (table) => {
      table.increments()
      table.timestamps()
      table.string('title', 254).notNullable()
      table.text('text').notNullable()
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')

    })
  }

  down () {
    this.drop('christmas_letters')
  }
}

module.exports = ChristmasLettersSchema
