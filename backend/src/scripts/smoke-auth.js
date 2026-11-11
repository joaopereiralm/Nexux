// Teste de fumaça da autenticação. Com a API rodando: npm run test:auth
const BASE = process.env.API_URL ?? 'http://localhost:3333/api';
let cookie = '';
let failures = 0;

async function call(method, path, body, headers = {}) {
  const res = await fetch(BASE + path, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(cookie ? { Cookie: cookie } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const set = res.headers.getSetCookie();
  if (set.length) cookie = set.map((c) => c.split(';')[0]).join('; ');
  const text = await res.text();
  return { status: res.status, data: text ? JSON.parse(text) : null };
}

function check(label, condition, extra = '') {
  console.log(`${condition ? '✓' : '✗'} ${label}${condition ? '' : ` ${extra}`}`);
  if (!condition) failures += 1;
}

const email = `smoke-${Date.now()}@nexux.test`;
const valid = { name: 'Teste Smoke', email, password: 'Senha1234', confirmPassword: 'Senha1234' };

let r = await call('POST', '/auth/register', { ...valid, password: 'curta', confirmPassword: 'curta' });
check('cadastro com senha fraca é rejeitado (400)', r.status === 400, r.status);

r = await call('POST', '/auth/register', { ...valid, role: 'ADMIN' });
check('cadastro válido (201)', r.status === 201, r.status);
check('perfil forçado para STUDENT mesmo enviando role=ADMIN', r.data?.user?.role === 'STUDENT');
check('resposta não expõe a senha', !JSON.stringify(r.data).includes('password'));
const csrf = r.data?.csrfToken;

r = await call('GET', '/auth/me');
check('/me com cookie de sessão (200)', r.status === 200 && r.data?.user?.email === email, r.status);

const session = cookie;
cookie = '';
r = await call('POST', '/auth/register', valid);
check('e-mail duplicado (409)', r.status === 409, r.status);
r = await call('POST', '/auth/login', { email, password: 'errada123' });
check('login com senha errada (401)', r.status === 401, r.status);
r = await call('GET', '/auth/me');
check('/me sem sessão (401)', r.status === 401, r.status);
cookie = session;

r = await call('POST', '/auth/logout');
check('logout sem token CSRF é bloqueado (403)', r.status === 403, r.status);
r = await call('POST', '/auth/logout', undefined, { 'X-CSRF-Token': csrf });
check('logout com token CSRF (204)', r.status === 204, r.status);
r = await call('GET', '/auth/me');
check('/me após logout (401)', r.status === 401, r.status);

r = await call('POST', '/auth/login', { email, password: valid.password });
check('login válido (200)', r.status === 200, r.status);
r = await call('GET', '/auth/me');
check('/me após login (200)', r.status === 200, r.status);

console.log(failures ? `\n${failures} verificação(ões) falharam.` : '\nTodas as verificações passaram.');
process.exitCode = failures ? 1 : 0;
