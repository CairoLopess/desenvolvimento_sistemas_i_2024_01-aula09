## Criando um projeto em [Next JS](https://nextjs.org/)

- Para criarmos um projeto em Next JS, devemos rodar o comando: `npx create-next-app atividadeavaliativa`

![alt text](image.png)

- Após a instalação dos pacotes e criação do projeto, no VSCode podemos rodar o comando **`npm run dev`** e ele irá iniciar na porta **3000** o nosso projeto

## JSON Server

JSON Server é uma biblioteca Node.js que permite criar rapidamente uma API REST completa a partir de um arquivo JSON. Isso pode ser útil para desenvolvimento frontend quando você precisa de um backend simples apenas para testar ou simular dados.

Para começar, você precisa ter o Node.js instalado em seu sistema. Depois, você pode instalar o JSON Server via npm usando o seguinte comando no terminal: **npm install json-server**

Uma vez instalado, você pode criar um arquivo JSON com os dados que deseja simular como seu "banco de dados". Por exemplo, você pode criar um arquivo chamado db.json com o seguinte conteúdo:

```json
{
  "posts": [
    { "id": 1, "title": "Post 1", "body": "Conteúdo do post 1" },
    { "id": 2, "title": "Post 2", "body": "Conteúdo do post 2" }
  ],
  "comments": [
    { "id": 1, "body": "Comentário 1", "postId": 1 },
    { "id": 2, "body": "Comentário 2", "postId": 1 },
    { "id": 3, "body": "Comentário 3", "postId": 2 }
  ]
}
```

Então, no terminal, navegue até o diretório onde está seu arquivo db.json e execute o seguinte comando para iniciar o servidor JSON: **npx json-server db.json**

Isso iniciará um servidor JSON na porta padrão 3000 (a menos que você especifique uma porta diferente). Agora você pode acessar sua API REST em http://localhost:3000. Por exemplo, http://localhost:3000/posts retornará todos os posts.

Lembre-se de que o JSON Server é adequado apenas para desenvolvimento e testes locais. Para um ambiente de produção real, você precisaria de uma solução de backend mais robusta.

## Atividade Avaliativa

A atividade avaliativa pode ser realizada de forma individual ou em dupla. O projeto final deve estar em um repositório do GitHub, com acesso público ou privado (aí precisa adicionar meu user nunesfb para ter acesso). A atividade vale 60 pontos.

Entregas serão aceitas somente a partir das 21:30h. E o deadline é 22:40.

### Gestão de Equipamentos de TI em uma IES

Este projeto se concentra na gestão de equipamentos de TI em uma Instituição de Ensino Superior, o que proporciona uma oportunidade valiosa para auxiliar o departamento a gerenciar seus ativos.

#### Funcionalidades Principais

**Cadastro de Equipamentos**

Os usuários podem cadastrar novos equipamentos de TI, fornecendo informações como tipo de equipamento (projetor, notebook, computador, etc.), marca, modelo, número de série, data de aquisição, status de disponibilidade, etc.

**Visualização de Equipamentos**

Os usuários podem visualizar todos os equipamentos cadastrados, com a possibilidade de filtrá-los por diferentes critérios, como tipo, marca, status, etc.

**Atualização de Equipamentos**

Os usuários podem editar as informações de um equipamento existente, como marca, modelo, número de série, status, etc.

**Remoção de Equipamentos**

Os usuários podem remover equipamentos que já não são mais utilizados ou foram substituídos.

**Detalhes de Equipamento**

Os usuários podem visualizar os detalhes completos de um equipamento específico, incluindo todas as informações fornecidas no momento do cadastro.

**Estrutura do Projeto**

**Layout Padrão**

Mantenha um layout padrão que inclua um cabeçalho (header) fixo, um menu lateral e um rodapé (footer) fixo. O conteúdo do body deve ser dinâmico e ser carregado de acordo com a rota atual.

**Rotas**

Defina rotas para cada uma das funcionalidades principais do sistema, como /equipamentos, /equipamentos/novo, /equipamentos/:id, etc.

**Página Principal (Lista de Equipamentos)**

Na página principal, liste todos os equipamentos cadastrados. Forneça opções de filtro para os usuários filtrarem os equipamentos por tipo, marca, status, etc.

**Página de Detalhes de Equipamento**

Ao clicar em um equipamento na lista, os usuários devem ser redirecionados para uma página de detalhes específica para aquele equipamento, onde podem visualizar todas as informações relacionadas a ele e realizar edições se necessário ou remover um equipamento.

**Formulários**

Crie formulários para permitir que os usuários cadastrem novos equipamentos e atualizem informações de equipamentos existentes.

**Tecnologias Utilizadas**

Next.js e TypeScript: Continue utilizando Next.js com TypeScript para desenvolver o frontend do projeto, aproveitando os benefícios de tipagem estática e roteamento eficiente.

JSON Server: Utilize o JSON Server para simular uma API REST simples para o backend, permitindo que os alunos implementem as operações CRUD (Create, Read, Update, Delete) de forma rápida e fácil.

### API

A API a ser usada é o JSON Server, que é uma biblioteca Node.js que permite criar rapidamente uma API REST completa a partir de um arquivo JSON. Os dados já existentes estão inseridos dentro de um arquivo chamado **db.json**.

Use a pasta já existente nesta branch com os dados do JSON Server para rodar sua API. No terminal, navegue até o diretório onde está seu arquivo db.json e execute o seguinte comando para iniciar o servidor JSON: **npx json-server db.json**

Isso iniciará um servidor JSON na porta padrão 3000 (a menos que você especifique uma porta diferente). Agora você pode acessar sua API REST em **http://localhost:3000**. Por exemplo, **http://localhost:3000/equipamentos** retornará todos os equipamentos.

### Funcionalidades Adicionais

Algumas funcionalidades adicionais são requeridas e podem ajudar a compor a pontuação ou ter uma pontuação extra, sendo elas:

- Adicionar tratamento de erros nas requisições para a API;
- Adicionar tratamento de erros em inputs errados nos cadastros e atualizações;
- Adicionar um aviso através de um modal, perguntando se o usuário tem certeza que quer deletar um registrou ou cancelar;
- Criar validações de campos usando a biblioteca [JOI](https://joi.dev/api/?v=17.12.3);
- Adicionar loadings nas telas de carregamento de dados;
- Adicionar mais filtros para seleção de dados;
