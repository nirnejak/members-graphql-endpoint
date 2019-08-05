# GraphQL App

A Node.js App using Express.js, GraphQL and Handlebars


```graphql
{
  hello
  member(id: "1") {
    id
    name
    email
    status
    skills
    work {
      isEmployed
      jobTitle
      company
    }
  }
  
  members(status: "inactive", name: "Jitendra Nirnejak") {
    id
    name
    email
    status
    skills
    work {
      isEmployed
      jobTitle
      company
    }
  }
}
```