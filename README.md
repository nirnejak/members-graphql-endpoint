# GraphQL App

A Node.js App using Express.js, GraphQL and Handlebars

## Query
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
## Mutations
```graphql
mutation {
  createMember(
    member: {
      name: "Jitendra Nirnejak",
      email: "jeetnirnejak@gmail.com",
      status: "active", 
      skills: ["react", "css", "html", "css", "javascript", "node.js"], 
      work: {
        isEmployed: true, 
        jobTitle: "Software Developer", 
        company: "Inkoop"
      }
    }
  ) {
    id,
    name,
    email,
    status,
    skills,
    work {
      isEmployed,
      jobTitle,
      company
    }
  }
}

```

```graphql
mutation {
  updateMember(
    id: "1",
    member: {
      status: "inactive", 
      skills: ["react", "css", "html", "css", "javascript", "node.js"], 
      work: {
        isEmployed: true, 
        jobTitle: "Software Developer", 
        company: "Inkoop"
      }
    }
  ) {
    id,
    name,
    email,
    status,
    skills,
    work {
      isEmployed,
      jobTitle,
      company
    }
  }
}

```