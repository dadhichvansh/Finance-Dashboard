FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy rest of code
COPY . .

# Build prisma client
RUN pnpm db:generate

EXPOSE 5000

CMD ["pnpm", "start"]
