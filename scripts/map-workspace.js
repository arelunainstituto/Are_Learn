#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const GROUP = path.join(ROOT, 'Grupo AreLuna');
const INDEX = path.join(ROOT, '_Index');

function isDir(p) {
  try { return fs.lstatSync(p).isDirectory(); } catch { return false; }
}

function shouldSkip(dir) {
  const base = path.basename(dir);
  return ['node_modules', '.git', '.github', '.trae'].includes(base);
}

function findPackages(baseDir, maxDepth = 5) {
  const results = [];
  function walk(dir, depth) {
    if (depth > maxDepth) return;
    if (!isDir(dir) || shouldSkip(dir)) return;
    const pkgPath = path.join(dir, 'package.json');
    if (fs.existsSync(pkgPath)) {
      results.push(dir);
    }
    const entries = fs.readdirSync(dir);
    entries.forEach((e) => {
      const next = path.join(dir, e);
      if (isDir(next) && !shouldSkip(next)) walk(next, depth + 1);
    });
  }
  walk(baseDir, 0);
  return results;
}

function detectType(dir) {
  const hasNext = fs.existsSync(path.join(dir, 'next.config.js')) || fs.existsSync(path.join(dir, 'next.config.ts'));
  const hasNest = fs.existsSync(path.join(dir, 'nest-cli.json')) || fs.existsSync(path.join(dir, 'server.js'));
  const hasPrisma = fs.existsSync(path.join(dir, 'prisma')) || fs.existsSync(path.join(dir, 'packages', 'db')) || fs.existsSync(path.join(dir, 'packages', 'database'));
  if (hasNext && hasNest) return 'fullstack-app';
  if (hasNext) return 'web-app';
  if (hasNest) return 'api-app';
  if (hasPrisma) return 'db-package';
  return 'package';
}

function readJson(file) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return null; }
}

function main() {
  if (!fs.existsSync(GROUP)) {
    console.error('Grupo AreLuna directory not found:', GROUP);
    process.exit(1);
  }

  const packageDirs = findPackages(GROUP, 4);
  const items = packageDirs.map((dir) => {
    const pkg = readJson(path.join(dir, 'package.json')) || {};
    const metaPath = path.join(dir, 'project.meta.json');
    const meta = fs.existsSync(metaPath) ? readJson(metaPath) : null;
    return {
      path: path.relative(ROOT, dir),
      name: pkg.name || path.basename(dir),
      private: pkg.private || false,
      type: detectType(dir),
      meta: meta ? { name: meta.name, client: meta.client, year: meta.year, status: meta.status } : null,
    };
  });

  if (!fs.existsSync(INDEX)) fs.mkdirSync(INDEX, { recursive: true });
  const ts = Date.now();
  const jsonOut = path.join(INDEX, `workspace-map-${ts}.json`);
  fs.writeFileSync(jsonOut, JSON.stringify({ timestamp: new Date().toISOString(), count: items.length, items }, null, 2));

  const mdOut = path.join(INDEX, `workspace-map-${ts}.md`);
  const lines = [];
  lines.push(`# Workspace Map (${new Date().toISOString()})`);
  lines.push('');
  lines.push(`Total módulos: ${items.length}`);
  lines.push('');
  items.forEach((it) => {
    lines.push(`- ${it.name} (${it.type}) — ${it.path}`);
  });
  fs.writeFileSync(mdOut, lines.join('\n'));

  console.log('✅ Mapa gerado');
  console.log('JSON:', jsonOut);
  console.log('MD:  ', mdOut);
}

main();