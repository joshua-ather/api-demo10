# Dockerfile
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy project files
COPY . .

# Build NestJS
RUN npm run build

# Expose NestJS port
EXPOSE 3000

# Start the app
CMD ["node", "dist/main"]
