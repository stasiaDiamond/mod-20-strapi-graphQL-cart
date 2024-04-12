# Strapi Backend / React Frontend

* Create a Strapi backend. It outputs the project's named directory. Be sure it has data, CRUD permissions, and Roles:

npx create-strapi-app@latest restaurants --quickstart

* Create a GraphQL query instance within the newly created directory for Strapi connection.

npx create-strapi-app restaurants --quickstart
npm run strapi install graphql

* Use template:

query {
  restaurants {
    data {
      id
      attributes {
        name
      }
    }
  }
}

* Create React app for front end. Use Axios. Hit the 1337/graphql for data query. Can use Prettify in graphQL instance.

* All must be spun up simultaneously. Strapi npm run build from Terminal / React npm start Integrated
