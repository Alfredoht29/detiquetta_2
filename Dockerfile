FROM node:18-alpine

# Set npm version
RUN npm install -g npm@10.8.2

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application code
COPY . .

# Build Next.js app
RUN npm run build

EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "start"]