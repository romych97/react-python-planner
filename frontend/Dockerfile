# Используем Node.js 20
FROM node:20

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package.json package-lock.json ./

# Устанавливаем зависимости перед копированием кода
RUN npm install

# Копируем весь код
COPY . .

# Сборка Next.js
RUN npm run build

CMD ["npm", "run", "start"]
