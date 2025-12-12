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

# Build the React app
RUN npm run build

# Serve with a simple Node server
RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]