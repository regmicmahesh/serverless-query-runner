
FROM public.ecr.aws/lambda/nodejs:14  AS build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
RUN ls

FROM public.ecr.aws/lambda/nodejs:14 AS run
WORKDIR ${LAMBDA_TASK_ROOT}
COPY package.json ./
ENV NODE_ENV production
RUN npm install --production
COPY public .
COPY views .
COPY --from=build /app/dist .
CMD [ "handler.handler" ]  
