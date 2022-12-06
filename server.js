import http from 'http';
import Koa from 'koa';
import Router from 'koa-router';
import cors from 'koa2-cors';
import koaBody from 'koa-body';
import { nanoid } from 'nanoid';
import {data} from './data.js';

const app = new Koa();
app.use(cors());
app.use(koaBody({
  json: true,
  urlencoded: true,
  multipart: true,
}));
const router = new Router();
let posts = data;

router.get('/posts', async (ctx, next) => {
  ctx.response.body = posts;
});

router.post('/posts', async(ctx, next) => {
  const {id, content} = JSON.parse(ctx.request.body);
  
  if (id !== 0) {
      posts = posts.map(o => o.id !== id ? o : {...o, content: content});
      ctx.response.status = 204;
      return;
  }
  posts.push({content, id: nanoid(5), created: Date.now()});
  ctx.response.status = 204;
});

router.delete('/posts/:id', async(ctx, next) => {
  const postId = ctx.params.id;
  const index = posts.findIndex(o => o.id === postId);
  if (index !== -1) {
      posts.splice(index, 1);
  }
  ctx.response.status = 204;
});

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 7777;
const server = http.createServer(app.callback());
server.listen(port, () => {
  console.log(`server started http://localhost:${port}`)
});
