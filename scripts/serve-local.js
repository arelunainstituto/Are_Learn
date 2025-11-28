#!/usr/bin/env node
/**
 * Orquestrador de serviços locais em localhost com portas estáveis.
 * Serviços iniciados:
 * - Frontend (Next.js): http://localhost:3000
 * - QR-Code Generator (Express): http://localhost:3001
 * - Prostoral LAB (Express): http://localhost:3002
 * - Leitor-De-Faturas (Express): http://localhost:3003
 * - Leitor de Arquivos SAF-T (TS/Express): http://localhost:3004
 * - Inventory Service (NestJS): http://localhost:3005
 * - Inventory UI (Next.js): http://localhost:3006
 */

const { spawn } = require('child_process');
const path = require('path');

// ANSI color codes
const COLORS = {
  'frontend-grupo-areluna': '\x1b[32m', // green
  'prostoral-lab': '\x1b[33m', // yellow
  'qr-code-generator': '\x1b[34m', // blue
  'leitor-de-faturas': '\x1b[35m', // magenta
  'saft-import': '\x1b[36m', // cyan
  'inventory-service': '\x1b[91m', // bright red
  'inventory-ui': '\x1b[92m', // bright green
};
const RED = '\x1b[31m';
const RESET = '\x1b[0m';
const DIM = '\x1b[2m';

function timeStamp() {
  // HH:MM:SS
  return new Date().toISOString().substring(11, 19);
}

function formatPrefix(name, isErr = false) {
  const color = COLORS[name] || '\x1b[37m'; // default white
  const label = isErr ? `${name}::ERR` : name;
  return `${DIM}[${timeStamp()}]${RESET} ${color}[${label}]${RESET} `;
}

const services = [
  {
    name: 'frontend-grupo-areluna',
    cwd: path.join(__dirname, '..', 'Grupo AreLuna', 'frontend-grupo-areluna'),
    command: 'npm',
    args: ['run', 'dev'],
    port: 3000,
  },
  {
    name: 'qr-code-generator',
    cwd: path.join(__dirname, '..', 'Grupo AreLuna', 'QR-Code-Generator'),
    command: 'npm',
    args: ['run', 'dev'],
    port: 3001,
  },
  {
    name: 'prostoral-lab',
    cwd: path.join(__dirname, '..', 'Grupo AreLuna', 'Prostoral LAB app', 'Prostoral LAB app'),
    command: 'npm',
    args: ['run', 'dev'],
    port: 3002,
  },
  {
    name: 'leitor-de-faturas',
    cwd: path.join(__dirname, '..', 'Grupo AreLuna', 'Leitor-De-Faturas'),
    command: 'npm',
    args: ['run', 'dev'],
    port: 3003,
  },
  {
    name: 'saft-import',
    cwd: path.join(__dirname, '..', 'Grupo AreLuna', 'leitor-de-arquivos-saft'),
    command: 'npm',
    args: ['run', 'dev'],
    port: 3004,
  },
  {
    name: 'inventory-service',
    cwd: path.join(__dirname, '..', 'inventory-service'),
    command: 'npm',
    args: ['run', 'start:dev'],
    port: 3005,
  },
  {
    name: 'inventory-ui',
    cwd: path.join(__dirname, '..', 'inventory-ui'),
    command: 'npm',
    args: ['run', 'dev'],
    port: 3006,
  },
];

function startService(svc) {
  const env = { ...process.env, PORT: String(svc.port) };
  // Next utiliza PORT; Express utiliza PORT; tsx/Node também herda PORT.

  console.log(`\n${formatPrefix(svc.name)}➡️  Iniciando '${svc.name}' em http://localhost:${svc.port} ...`);
  const child = spawn(svc.command, svc.args, {
    cwd: svc.cwd,
    env,
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  child.stdout.on('data', (data) => {
    process.stdout.write(`${formatPrefix(svc.name)}${data}`);
  });

  child.stderr.on('data', (data) => {
    process.stderr.write(`${formatPrefix(svc.name, true)}${RED}${data}${RESET}`);
  });

  child.on('close', (code) => {
    console.log(`\n${formatPrefix(svc.name)}⛔ Serviço '${svc.name}' finalizado com código ${code}`);
  });

  console.log(`${formatPrefix(svc.name)}🔗 Preview: http://localhost:${svc.port}/`);
  return child;
}

console.log(`${DIM}🚀 Orquestrando serviços locais (localhost, portas 3000-3006) ...${RESET}`);
const children = services.map(startService);

function shutdown() {
  console.log('\n🛑 Encerrando todos os serviços...');
  for (const proc of children) {
    try {
      proc.kill('SIGINT');
    } catch (e) {
      // ignore
    }
  }
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);