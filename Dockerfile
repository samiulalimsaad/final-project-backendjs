FROM node:14

RUN mkdir final_backend_node

WORKDIR /final_backend_node

COPY . .

RUN yarn install


EXPOSE 8080

CMD ["yarn", "start"]