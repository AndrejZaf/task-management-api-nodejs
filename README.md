<h1 align="center" style="font-weight: bold;">Task Management API</h1>

<p align="center">
  <a href="#tech">Technologies</a> •
  <a href="#started">Getting Started</a> •
  <a href="#specification">API Specification</a> •
  <a href="#pointsCovered">Points Covered</a>
</p>

<p align="center">
    <b>Exploring NodeJS by building a simple CRUD with PostgreSQL and Redis .</b>
</p>

<h2 id="tech">💻 Technologies</h2>

- ![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white)
- ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)
- ![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff)
- ![PostgreSQL](https://img.shields.io/badge/Postgresql-30363D?logo=postgresql&logoColor=white)
- ![Redis](https://img.shields.io/badge/Redis-%23DD0031.svg?logo=redis&logoColor=white)

<h2 id="started">🚀 Getting started</h2>
<h3>Prerequisites</h3>

- [Node.js](https://nodejs.org/en/download/package-manager) - **Node 22**
- [TypeScript](https://www.npmjs.com/package/typescript)
- [Docker](https://www.docker.com/products/docker-desktop/)

<h3>Starting the Project</h3>

- Clone the project, install the node dependencies by running `npm install`.
- If you are running the application without docker, make sure to have a PostgreSQL and Redis instances up and running
  and additionally provide the connection strings in .env file.

```
PORT=3000
DATABASE_URL=postgres://postgres:postgres@localhost:5432/task_mgmt
REDIS_URL=redis://localhost:6379
```

- If you are running with docker compose, everything is set up for you from the get go.

<h2 id="specification">⚙️ API Specification</h2>
GET /tasks → Retrieve all tasks

- Response

```
[
    {
        "id": "5fd7df73-af32-4c48-9a95-33a2a036effa",
        "title": "Test Update",
        "description": "Test description",
        "status": "IN_PROGRESS",
        "createdAt": "2025-03-05T21:59:10.990Z",
        "updatedAt": "2025-03-05T21:59:10.990Z"
    }
]
```

GET /tasks/:id → Retrieve a specific task by ID

- Response

```
{
    "id": "5fd7df73-af32-4c48-9a95-33a2a036effa",
    "title": "Test Update",
    "description": "Test description",
    "status": "IN_PROGRESS",
    "createdAt": "2025-03-05T21:59:10.990Z",
    "updatedAt": "2025-03-05T21:59:10.990Z"
}
```

- In case the task cannot be retrieved by ID, HTTP Status 404 is returned

```
{
    "message": "TASK_NOT_FOUND"
}
```

POST /tasks → Create a new task (Title & Description required)

- Request

```
{
    "title": "Test Create",
    "description": "Test description",
    "status": "IN_PROGRESS"
}
```

- Response

```
[
    {
        "id": "5fd7df73-af32-4c48-9a95-33a2a036effa",
        "title": "Test Create",
        "description": "Test description",
        "status": "IN_PROGRESS",
        "createdAt": "2025-03-05T21:59:10.990Z",
        "updatedAt": "2025-03-05T21:59:10.990Z"
    }
]
```

- In case of failed validation, HTTP Status 400 is returned

```
{
    "message": "INVALID_BODY"
}
```

PUT /tasks/:id → Update an existing task (Title, Description, or Status)

- Request

```
{
    "title": "Test Update 2",
    "description": "Test description",
    "status": "IN_PROGRESS"
}
```

- Response

```
[
    {
        "id": "5fd7df73-af32-4c48-9a95-33a2a036effa",
        "title": "Test Update 2",
        "description": "Test description",
        "status": "IN_PROGRESS",
        "createdAt": "2025-03-05T21:59:10.990Z",
        "updatedAt": "2025-03-05T22:03:53.135Z"
    }
]
```

- In case of failed validation, HTTP Status 400 is returned

```
{
    "message": "INVALID_BODY"
}
```

- In case the task cannot be retrieved by ID, HTTP Status 404 is returned

```
{
    "message": "TASK_NOT_FOUND"
}
```

DELETE /tasks/:id → Delete a task

- Response 204 - No content

<h2 id="pointsCovered">📃 Bonus Points Covered</h2>

- Redis Cache - The initial fetch of a task by a specific ID is cached for 1 hour, if a task is editted or deleted the cache is invalidated.
- Dockerized the application and it's dependencies (PostgreSQL and Redis)

You can find the API deployed on the following URL: `159.89.3.82:3000/api/v1/tasks` 
