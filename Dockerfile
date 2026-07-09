# ⚠️ DEMO FIXTURE — INTENTIONALLY INSECURE ⚠️
# An npm registry auth token is baked in as a build ARG default and written to
# .npmrc to install private packages. Even though .npmrc is deleted in the same
# layer, the token is committed here in the Dockerfile — a classic image leak.
FROM node:20-slim

WORKDIR /app

# Should be passed at build time (`--build-arg NPM_TOKEN=…`) or mounted as a
# build secret; hardcoded as the ARG default here on purpose for the scan demo.
ARG NPM_TOKEN=INSERT_NPM_TOKEN_HERE

COPY package*.json ./

RUN echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > .npmrc \
 && npm ci --omit=dev \
 && rm -f .npmrc

COPY . .

CMD ["npm", "start"]
