# FROM node:20.4.0

# WORKDIR /front-react
# COPY . /front-react

# COPY ./package.json ./
# COPY ./package-lock.json ./

# COPY . ./

# RUN npm install
# RUN npm run build

# CMD ["npm", "start"]

FROM node
RUN mkdir /app
WORKDIR /app
COPY . ./
RUN npm install
CMD ["npm", "start"]