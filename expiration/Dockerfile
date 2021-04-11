FROM node:alpine
ENV CI=true

WORKDIR /app
COPY package.json .
RUN npm install --only=prod # this will not install the dev dependencies
COPY . .

CMD ["npm", "start"]
