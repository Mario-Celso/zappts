'use strict'
const ChristmasLetters = use('App/Models/ChristmasLetter')
const Database = use('Database')


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with christmasLetters
 */
class ChristmasLettersController {
  /**
   * Show a list of all christmasLetters.
   * GET christmasLetters
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */

  async index ({ request, response, auth }) {
   
    //admin role = 1
    if(auth.user.role == 1){
        return await Database.from('christmas_letters').select('title', 'id')
    } else {
        return await Database.from('christmas_letters').select('title', 'id').where('user_id', auth.user.id)
    }

  }

  /**
   * Create/save a new christmasLetters.
   * POST christmasLetters
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {   
    if(auth.user.role == 1){
        return response.status(403).send("Não autorizado")
    }

    const data = request.only(['title', 'text'])
    data.user_id = auth.user.id
    try{
        if (ChristmasLetters.create(data)){
            const json = {
                message: "Carta enviada com sucesso!",
                success: true,
            }

            return response.status(200).send(json);
        }
    }catch(error){
        console.log(error)
        return response.status(500).send();
    }
  }



  /**
   * Display a single christmasLetters.
   * GET christmasLetters/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show ({ params, request, response, auth }) {
    let letter = "";
    try {
        letter = await ChristmasLetters.findOrFail(params.id)
        if(auth.user.role == 1){
            const json = {
                message: "Carta encontrada com sucesso!",
                success: true,
                user: auth.user.username,
                letter: letter,
              }

              return json;
        }     
        
        if (auth.user.id == letter.user_id){
            const json = {
                message: "Carta encontrada com sucesso!",
                success: true,
                letter: letter,
            }
        
            return json;
        }

        return response.status(203).send("Essa carta pertence a outro usuário");
    } catch (error) {

      return {
        message: "Carta não encontrada!",
        success: false
      }
    }
  }



  /**
   * Update christmasLetters details.
   * PUT or PATCH christmasLetters/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {
    if(auth.user.role == 1){
        return response.status(403).send("Não autorizado")
    }

    try {
      const letter = await ChristmasLetters.findOrFail(params.id)
      if (auth.user.id == letter.user_id){
            const data = request.only(['title', 'text'])
            letter.merge(data)
            await letter.save();

            const json = {
                message: "Carta atualizada com sucesso!",
                success: true,
                letter: letter,
            }
    
            return response.status(203).send(json);
        }
        return response.status(203).send("Essa carta pertence a outro usuário");

    } catch (error) {
        console.log(error)

      return 'Carta não cadastrada com esse id ou não pertence a seu usuário.'
    }
  }
}

module.exports = ChristmasLettersController
