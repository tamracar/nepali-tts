# Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Production image
FROM node:18-alpine

WORKDIR /app

# Install eSpeak-ng for text-to-speech
RUN apk add --no-cache espeak-ng ffmpeg

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Create output directory
RUN mkdir -p /app/output

EXPOSE 3000

CMD ["npm", "run", "start:prod"]