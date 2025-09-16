# Stage 1: Build the React app
FROM node:20-alpine AS build

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .
RUN pnpm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine AS production

# Copy the custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built app from previous stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]