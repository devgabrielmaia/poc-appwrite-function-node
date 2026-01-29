// main.ts
import app from './api';

export default async function ({ req, res, log, error }: any) {
  try {
    const url = `${req.scheme}://${req.host}${req.path}${req.queryString ? `?${req.queryString}` : ''}`;
    const request = new Request(url, {
      method: req.method,
      headers: req.headers,
      body:
        req.method !== 'GET' && req.method !== 'HEAD'
          ? req.bodyText
          : undefined,
    });
    const response = await app.fetch(request);
    const body = await response.text();
    return res.text(body, response.status, Object.fromEntries(response.headers));
  } catch (e: any) {
    error(e.message);
    return res.text('Internal Server Error', 500);
  }
}
