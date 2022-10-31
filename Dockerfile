FROM node:16-alpine AS node-base

FROM node-base AS build-deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM gcr.io/distroless/nodejs:16 AS runner
WORKDIR /app

ENV PORT 8000
ENV MONGO_URL ${MONGO_URL}
ENV TOKEN_KEY ${TOKEN_KEY}

COPY --from=build-deps /app/node_modules ./node_modules
COPY . .

EXPOSE 8000

# Run app command
CMD ["index.js"]