import assert from 'node:assert/strict';
import test from 'node:test';
import { detectSensitiveContent } from './check-public-secrets.mjs';

test('acepta documentación sin cadenas de credenciales', () => {
  const text = [
    '# Guía',
    'Usar variables de entorno y nunca publicar un .env.',
    'El sistema hace login por Google OIDC y no publica contraseñas.',
  ].join('\n');
  assert.deepEqual(detectSensitiveContent(text), []);
});

test('detecta tokens de GitHub sin exponer el valor capturado', () => {
  const token = 'ghp_' + 'A'.repeat(36);
  const findings = detectSensitiveContent('Ejemplo:\n' + token + '\n', 'README.md');
  assert.equal(findings.length, 1);
  assert.match(findings[0], /README\.md:2.*GitHub/);
  assert.ok(!findings[0].includes(token));
});

test('detecta credenciales de AWS en textos públicos', () => {
  const fakeKey = 'AKIA' + '0'.repeat(16);
  assert.match(detectSensitiveContent('clave=' + fakeKey).join(' '), /AWS access key/);
});

test('detecta encabezados de claves privadas', () => {
  assert.match(detectSensitiveContent('-----BEGIN OPENSSH PRIVATE KEY-----').join(' '), /clave privada/);
});

test('detecta tokens GitLab con formato típico', () => {
  const fake = 'glpat-' + 'A'.repeat(24);
  assert.match(detectSensitiveContent(fake).join(' '), /GitLab/);
});

test('no marca identificadores cortos o marcadores de posición', () => {
  assert.deepEqual(detectSensitiveContent('ghp_***\nAKIA<redactado>\n<API_KEY>'), []);
});
