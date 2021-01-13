'use strict'
const User = use('App/Models/User')
const Database = use('Database')

class AuthController {

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
