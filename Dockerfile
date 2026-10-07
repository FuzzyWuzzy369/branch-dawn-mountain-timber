FROM node:22-bookworm-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
ENV NITRO_PRESET=node_server
RUN node scripts/inflate-dinnerdraw-sync.mjs \
  && npm run build \
  && node scripts/fix-css-asset.mjs

FROM node:22-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=8080
COPY --from=build /app/.output ./.output
EXPOSE 8080
CMD ["node", ".output/server/index.mjs"]
