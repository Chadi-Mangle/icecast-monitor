FROM node:23-alpine AS builder

WORKDIR /tmp

COPY package*.json ./
RUN  npm install --omit=dev -q

COPY . . 

RUN npm run build

FROM node:23-alpine

WORKDIR /app

COPY --from=builder /tmp/dist ./dist
COPY --from=builder /tmp/node_modules ./node_modules
COPY --from=builder /tmp/package.json ./package.json

CMD ["npm", "run", "start"]