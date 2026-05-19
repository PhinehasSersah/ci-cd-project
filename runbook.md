# Runbook — ci-cd-project

## Check application health

```bash
curl http://localhost:3000/health
# Expected: {"status":"healthy"}
```

## View running container

```bash
docker ps --filter name=ci-cd-app
```

## View container logs

```bash
docker logs ci-cd-app
docker logs -f ci-cd-app   # follow
```

## Restart the container

```bash
docker restart ci-cd-app
```

## Redeploy a specific build

```bash
docker stop ci-cd-app && docker rm ci-cd-app
docker run -d --name ci-cd-app -p 3000:3000 ci-cd-project:<BUILD_NUMBER>
```

## Roll back to the previous build

```bash
docker stop ci-cd-app && docker rm ci-cd-app
docker run -d --name ci-cd-app -p 3000:3000 ci-cd-project:<PREVIOUS_BUILD_NUMBER>
```

## Run tests locally

```bash
npm ci
npm test
```

## Remove old Docker images

```bash
docker images ci-cd-project
docker rmi ci-cd-project:<OLD_TAG>
```

## Common failure modes

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Port 3000 already in use | Previous container still running | `docker stop ci-cd-app` |
| `npm test` fails in Jenkins | Missing `node_modules` | Ensure `npm ci` stage ran first |
| Image build fails | Docker daemon not running | Start Docker on the agent |
| Health endpoint returns 500 | App crash at startup | Check `docker logs ci-cd-app` |
