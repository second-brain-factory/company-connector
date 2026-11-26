FROM node:22-alpine
WORKDIR /app
COPY . .
RUN mkdir -p /data && chown node:node /data
ENV DATA_DIR=/data PORT=8080 NODE_ENV=production
VOLUME /data
EXPOSE 8080
USER node
CMD ["node", "start.mjs"]
