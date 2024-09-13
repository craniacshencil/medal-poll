# Stage 1: Build using full project 
FROM node:20-alpine as builder
WORKDIR /frontend
COPY . .
RUN npm install -g pnpm
RUN pnpm install 
RUN pnpm run build

# Running minimal build in production
FROM node:20-alpine
WORKDIR build/
COPY --from=builder /frontend/.next ./.next
COPY --from=builder /frontend/node_modules ./node_modules
COPY --from=builder /frontend/package.json .
COPY --from=builder /frontend/public ./public
COPY --from=builder /frontend/next.config.mjs .
EXPOSE 3000
CMD ["npm", "run", "start"]


