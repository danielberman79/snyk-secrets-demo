FROM node:20-slim

WORKDIR /app

# Auth token for installing private @acme packages from the npm registry.
ARG NPM_TOKEN=INSERT_NPM_TOKEN_HERE

COPY package*.json ./

RUN echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > .npmrc \
 && npm ci --omit=dev \
 && rm -f .npmrc

COPY . .

CMD ["npm", "start"]
