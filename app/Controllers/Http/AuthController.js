'use strict'
const User = use('App/Models/User')
const Database = use('Database')

class AuthController {

 /**
 * @swagger
 * definitions:
 *   User:
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 */
/**
 * @swagger
 * /register:
 *   post:
 *     tags:
 *       - Users
 *     description: Criar novo usuário
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: Json
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Cadastro Efetuado com sucesso
 */
  async register( { response,request } ){
    //create user by request
    const data = request.only(['username', 'password']);
    data.role = 2;
    try {
      let user = await Database.from('users').select('username').where('username', data.username).first();
      if (user){
        return "Ja sexiste um usuario com esse username";
      }
    
      if (User.create(data))
        return 'Cadastro Efetuado com sucesso';
      }catch(error){
          console.log(error)
          return response.status(401).send(error);
      }
  }

  /**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Users
 *     description: Login
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: Json
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description:  
 */
  async authenticate( { request, auth } ){
    const {username, password } = request.all();

    const token = await auth.attempt(username, password);
    const user = await Database.from('users').where('username', username);

    return  {
      'token': token,
      'user': user
    }
  }
}

module.exports = AuthController
