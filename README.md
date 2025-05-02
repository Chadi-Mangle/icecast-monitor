Code localy :

```
npm install
npm run dev
```

Start for production:

```
docker build . -t icecast-monitor
docker run --env-file .env --network=host icecast-monitor
```

```
open http://localhost:3000
```
