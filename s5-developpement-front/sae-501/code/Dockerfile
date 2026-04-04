# ---------- GLOBAL ARGS ----------
ARG PORT

# ---------- DEV ----------
FROM node:24 AS dev

WORKDIR /app

COPY package*.json ./

RUN npm install --no-cache --legacy-peer-deps

COPY . .

ARG PORT
ENV PORT=$PORT

EXPOSE $PORT 5173

CMD ["npm", "run", "start"]

# ---------- BUILD ----------
FROM node:24 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --no-cache

COPY . .
RUN npm run build

# ---------- PROD ----------
FROM node:24 AS prod

WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev --no-cache

COPY ./server ./server
COPY ./database ./database
COPY ./env ./env
COPY ./utils ./utils
COPY ./generate-list-routes.js ./generate-list-routes.js

COPY ./src/components ./src/components
COPY ./src/data ./src/data
COPY ./src/layouts ./src/layouts
COPY ./src/pages ./src/pages

COPY --from=builder /app/dist ./dist

ARG PORT
ENV PORT=$PORT

EXPOSE $PORT
