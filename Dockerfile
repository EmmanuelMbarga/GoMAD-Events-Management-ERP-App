
# ...existing code...
FROM node:18-alpine

# Install the required library for Puppeteer
RUN apk add --no-cache libnss3

# ...existing code...