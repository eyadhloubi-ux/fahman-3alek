# بديل جاهز: إذا بدك تنشر على Render كـ Docker (أو أي استضافة بتدعم Docker)
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --no-audit --no-fund || npm install --omit=dev --no-audit --no-fund
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
