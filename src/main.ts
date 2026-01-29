// main.ts
import { api } from './api';

export default async function ({ req, res, log, error }: any) {
  try {
    const appHono = api();

    // 🔹 Monta a URL completa
    const url = `${req.scheme}://${req.host}${req.path}${req.queryString ? `?${req.queryString}` : ''
      }`;

    // 🔹 Cria um Request padrão (Fetch API)
    const request = new Request(url, {
      method: req.method,
      headers: req.headers,
      body:
        req.method !== 'GET' && req.method !== 'HEAD'
          ? req.bodyText
          : undefined,
    });

    // 🔹 Chama o Hono
    const response = await appHono.fetch(request);

    // 🔹 Converte Response → Appwrite res
    const body = await response.text();

    return res.text(body, response.status, Object.fromEntries(response.headers));
  } catch (e: any) {
    error(e.message);
    return res.text('Internal Server Error', 500);
  }
}
