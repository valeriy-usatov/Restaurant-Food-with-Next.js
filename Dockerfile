# 1. Используем Node.js как базовый образ
FROM node:21-alpine

# 2. Установка рабочей директории
WORKDIR /app

COPY package.json .

# 4. Установка зависимостей, Использование 'clean install' ( npm ci) вместо 'install' ( npm i) является хорошей практикой для образов Docker.
RUN npm install

# 3. Копирование всех файлов проекта в контейнер, включая папку prisma
COPY . .

# 5. Генерация Prisma-клиента
RUN npx prisma generate

# 6. Сборка Next.js приложения
RUN npm run build

# 7. Открытие порта для приложения
EXPOSE 3000

# 9. Запуск приложения в режиме production
CMD ["npm", "start"]