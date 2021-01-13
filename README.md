# HiConnect API

# Conhecimento Geral

API criada para projeto HiConnect, algumas informações na API são válidas para o sistema inteiro, portanto você deve ter o conhecimento prévio destes dados.

## Request Headers

1.  Authorization

    token recebido no login

        Authorization: Bearer <token-exemplo>
    
## Erros

Todas as respostas desta API com o HTTP Status Code diferente da categoria 2xx (200, 201 etc...) e 3xx são consideradas um erro. Todos os erros, com exceção de validações, possuem dentro do corpo da resposta o atributo `message` que indica a mensagem de erro. Exemplo:

        {
            "message": "Esse recurso não existe, verifique a rota"
        }

1. Erro 4xx -> erro de requisição
2. Erro 5xx -> erro interno

## Problemas no JSON enviado

Quando existe um problema na validação do JSON a API retorna:

1. HTTP Status Code 422 (Unprocessable Entity)
2. Content-Type: application/json
3. Array de mensagens por atributo errado

    Exemplo

        [
           {
             "message": "Email não inserido.",
             "field": "email",
             "validation": "required"
           }
        ]
            
## Campos de Formulários

Cada atributo dentro de um JSON nesta documentação possui seu schema para mais informações. Após cada descrição de atributo,
existe uma informação contida dentro de chaves. Ex.: `[Código da Empresa]`. Esta informação significa o campo no layout (front-end)
correspondente ao devido campo.            


# Group Auth
### Login [POST /auth]
+ Request

    + Attributes
    
        - email: foo@bar.com (string, required) - E-mail de login do usuário 
        - password: 123abc (string, required) - Senha de acesso ao sistema 
        
        
+ Response 200 (application/json)

            {
                  "token": {
                    "type": "bearer",
                    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUsImlhdCI6MTU5Nzg4OTA2MH0.ocgP2fWgsYzj6iEg1IFfppMPgTCRgJYd0Q23dVhJw5U",
                  },
                  "user": [
                    {
                      "id": 5,
                      "email": "physio@teste.com",
                      "role": 3
                    }
                  ]
            }
        
# Group Paciente
### Listagem [GET /patient]

+ Request
    + Headers

            Authorization: Bearer <token-exemplo>


+ Response  200 (application/json)

        [
          {
            "id": 1,
            "created_at": "2020-10-03T19:25:55.000Z",
            "updated_at": "2020-10-03T19:25:55.000Z",
            "email": "teste3@email.com",
            "firs_name": "Mario",
            "last_name": "Celso",
            "phone_1": "12991684350",
            "document_cpf": "1234567890-",
            "health_insurance": "A",
            "health_insurance_number": "123",
            "age": 21
          },
          {
              "id": 2,
              "created_at": "2020-10-03T19:25:55.000Z",
              "updated_at": "2020-10-03T19:25:55.000Z",
              "email": "teste3@email.com",
              "firs_name": "Mario",
              "last_name": "Celso",
              "phone_1": "12991684350",
              "document_cpf": "1234567890-",
              "health_insurance": "A",
              "health_insurance_number": "123",
              "age": 21
           }
        ]

### Detalhes [GET /patient/{id}]
+ Parameters
    + id: `1` (number, required) - ID do paciente

+ Request
    + Headers

            Authorization: Bearer <token-exemplo>


+ Response 200 (application/json)
    + Attributes (array[Patient])

# Group Form
### Listagem [GET /forms]    

Rota para pegar questões cadastradas no DB
+ Request
    + Headers

            Authorization: Bearer <token-exemplo>


+ Response  200 (application/json)

        [
            {
                "id": 8,
                "division": 2,
                "graphic": 0,
                "type": "string",
                "question": "Duração da queixa principal atual"
              },
              {
                "id": 9,
                "division": 2,
                "graphic": 0,
                "type": "string",
                "question": "O que mais te incomoda hoje?"
              }
        ]

### Post [POST /forms]    
+ Response  200 (application/json)

            {
                "email": "teste3@email.com",
                "firs_name": "Mario",
                "last_name": "Celso",
                "phone_1": "12991684350",
                "document_cpf": "1234567890-",
                "health_insurance": "A",
                "health_insurance_number": "123",
                "age": "21",
                	"answers": [
                		[{ 
                			"question":12,
                			"answer": true
                		}],
                		[{ 
                			"question": 12,
                			"answer": true
                		}]
                	]
            }


## Data Structures
### Patient
+ email: paciente@outlook.com  (string, required) - E-mail do paciente
+ first_name: Mario Celso  (string, required) -  Primeiro Nome
+ last_name: Almeida  (string, required) -  Segundo nome
+ phone_1:12991456789  (string, required) - Telefone para contato 
+ document_cpf: 123456789  (string, required) - CPF
+ health_insurance: Unimed  (string, required) - Empresa do convenio
+ health_insurance_number: 123456789  (string, required) - Numero do convenio
+ age: 21 (number) - Idade
+ message: "Paciente encontrado com sucesso!" (string) - Mensagem de retorno do get
+ success: true (boolean) - Status do get
+ answers:  (array) - Array das respostas







