# ci-cd-project

Minimal Express.js application wired to a Jenkins CI/CD pipeline.

## Project structure

```
ci-cd-project/
├── app/
│   └── server.js       # Express application
├── tests/
│   └── app.test.js     # Jest + Supertest tests
├── package.json
├── Dockerfile
├── Jenkinsfile
├── README.md
└── runbook.md
```

## Local development

```bash
npm install
npm start        # http://localhost:3000
```

## Running tests

```bash
npm test
```

## Endpoints

| Method | Path      | Description       |
|--------|-----------|-------------------|
| GET    | `/`       | Hello World check |
| GET    | `/health` | Health probe      |

## Docker

```bash
docker build -t ci-cd-project .
docker run -p 3000:3000 ci-cd-project
```

## CI/CD

The `Jenkinsfile` defines four stages:

1. **Install** — `npm ci`
2. **Test** — `npm test`
3. **Build Image** — builds a Docker image tagged with `BUILD_NUMBER`
4. **Deploy** — runs the container on port 3000 (main branch only)
