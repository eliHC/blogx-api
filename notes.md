
Iniciar Sequelize:

```bash
npx sequelize-cli init
```

- Configurar o config.js

Criar o banco de dados:

```bash
npx sequelize db:create
```

Iniciar model:

```bash
npx sequelize model:generate --name <NomeDoModel> --attributes <nomeAtributo>
```

Migrar o banco criado no model para o Banco de Dados:

```bash
npx sequelize db:migrate
```

Caso queira reverter a ultima migração:

```bash
npx sequelize db:migrate:undo
```

### No projeto:

- remova createdAt e updatedAt do model acrescentando o comando abaixo no terceiro parâmetro.


```js
  const user = sequelize.define('user', { /* segundo parâmetro */ }, {

    // Adicionando o timestamps: false, removerá ambos updatedAt e createdAt
    timestamps: false,

    // Se não quiser apenas o craetedAt
    createdAt: false,

    // Se não quiser apenas o updatedAt
    updatedAt: false,
  });
```

