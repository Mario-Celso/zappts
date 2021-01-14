# TEST ZAPPTS API

# Conhecimento Geral
A api foi desenvolvida utilizando o framework Adonis js, possui uma pequena doc sobre as rotas em localhost/docs, com sqlite como DB.


# Como utilizar a api
```
git clone git@github.com:Mario-Celso/zappts.git
npm install
npm start
```
# Como funciona a api
 - Criei uma rota de registro, para a pessoa poder se cadastrar e enviar suas cartas
 - Rota de login para autenticaçao de usuario, podendo ser o papai_noel que possui permissão apenas de leitura das cartinhas, ou o usuario que se registrou que pode criar/editar/ler suas cartas
 - E as rotas de cartas, que todas precisam do Bearer token que será retornado com o login, para acessar as funcionalidades das cartas.
 
# Dificuldades
Eu tive certa dificuldade em realizar a documentação utilizando o Swagger, porem consegue fazer o que eu precisava.
Quanto ao desenvolvimento da api, nao tive muita dificuldade pois eu ja fiz api em node e ja sabia como prosseguir.
Tive dificuldades em subir a aplicação em algum servidor, tive problemas com o Heroku e a AWS não liberou minha conta a tempo da entrega, com a aplicação não se encontra em um servidor para teste.

# Agradecimento
Agradeço pela oportunidade, percebi alguns pontos em que preciso dar um foco maior em relação a servidores, tive poucas oportunidades para mexer com tal. Gostei do teste, api aparentemente simples porem é possivel desenvolver muitas coisas em cima dela.






