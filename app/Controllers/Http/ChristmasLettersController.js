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

    /**
 * @swagger
 * definitions:
 *   ChristmasLetters:
 *     properties:
 *       title:
 *         type: string
 *       text:
 *         type: string
 */
/**
 * @swagger
 * /christmasLetter:
 *   get:
 *     tags:
 *       - ChristmasLetters
 *     description: Get das cartas
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Lista de cartas se for o papai noel aparecem todas, se for um usuario comum aparece apenas as que ele enviou
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
 * @swagger
 * /christmasLetter:
 *   post:
 *     tags:
 *       - ChristmasLetters
 *     description: Criar carta se for usuario comum, papai noel apenas le cartas
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: christmas_letters
 *         description: Json
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/ChristmasLetters'
 *     responses:
 *       200:
 *         description: Carta enviada com sucesso!
 */
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
 * @swagger
 * /christmasLetter/{id}:
 *   get:
 *     tags:
 *       - ChristmasLetters
 *     description: Detalhes de uma carta pelo id
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Detalhes de uma carta especifica
 *         schema:
 *           $ref: '#/definitions/ChristmasLetters'
 */
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
 * @swagger
 * /christmasLetter/{id}:
 *   patch:
 *     tags:
 *       - ChristmasLetters
 *     description: Apenas usuarios atualizam a carta, e apenas suas cartas
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: christmas_letters
 *         description: Json
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/ChristmasLetters'
 *     responses:
 *       200:
 *         description: Carta atualizada com sucesso!
 */
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
