#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const INBOX = path.join(ROOT, '_Inbox');
const INDEX = path.join(ROOT, '_Index');
const GROUP = path.join(ROOT, 'Grupo AreLuna');

const BY_TECH = path.join(INDEX, 'By-Tech');
const BY_YEAR = path.join(INDEX, 'By-Year');
const BY_STATUS = path.join(INDEX, 'By-Status');
const BY_CLIENT = path.join(INDEX, 'By-Client');

function ensureDirs() {
  [BY_TECH, BY_YEAR, BY_STATUS, BY_CLIENT].forEach((d) => {
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
  });
}

function readMeta(projectPath) {
  const metaPath = path.join(projectPath, 'project.meta.json');
  if (!fs.existsSync(metaPath)) return null;
  try {
    const raw = fs.readFileSync(metaPath, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function safeName(name) {
  return String(name)
    .trim()
    .replace(/[^a-zA-Z0-9._-]/g, '-');
}

function makeSymlink(target, linkPath) {
  try {
    if (fs.existsSync(linkPath)) fs.rmSync(linkPath, { recursive: true, force: true });
    fs.symlinkSync(target, linkPath);
    return true;
  } catch (e) {
    return false;
  }
}

function indexProject(projectDir) {
  const meta = readMeta(projectDir);
  const projectName = path.basename(projectDir);

  const target = projectDir;
  let created = 0;
  let errors = 0;

  if (!meta) {
    // Indexar apenas por nome em Unknown se meta ausente
    const unknownDir = path.join(BY_STATUS, 'unknown');
    if (!fs.existsSync(unknownDir)) fs.mkdirSync(unknownDir, { recursive: true });
    const linkPath = path.join(unknownDir, projectName);
    if (makeSymlink(target, linkPath)) created++; else errors++;
    return { created, errors };
  }

  // By-Tech
  const techs = Array.isArray(meta.tech) ? meta.tech : [];
  techs.forEach((t) => {
    const dir = path.join(BY_TECH, safeName(t));
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const linkPath = path.join(dir, projectName);
    if (makeSymlink(target, linkPath)) created++; else errors++;
  });

  // By-Year
  const year = meta.year || 'unknown';
  {
    const dir = path.join(BY_YEAR, String(year));
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const linkPath = path.join(dir, projectName);
    if (makeSymlink(target, linkPath)) created++; else errors++;
  }

  // By-Status
  const status = meta.status || 'unknown';
  {
    const dir = path.join(BY_STATUS, safeName(status));
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const linkPath = path.join(dir, projectName);
    if (makeSymlink(target, linkPath)) created++; else errors++;
  }

  // By-Client
  const client = meta.client || 'unknown';
  {
    const dir = path.join(BY_CLIENT, safeName(client));
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const linkPath = path.join(dir, projectName);
    if (makeSymlink(target, linkPath)) created++; else errors++;
  }

  return { created, errors };
}

function listProjects() {
  const isDir = (p) => {
    try { return fs.lstatSync(p).isDirectory(); } catch { return false; }
  };
  const isCandidateProject = (dir) => {
    const markers = ['package.json', 'server.js', 'vercel.json', 'index.html'];
    const hasMarker = markers.some((f) => fs.existsSync(path.join(dir, f)));
    const hasTrae = fs.existsSync(path.join(dir, '.trae')) && isDir(path.join(dir, '.trae'));
    return hasMarker || hasTrae;
  };

  const baseEntries = fs.readdirSync(ROOT)
    .map((e) => path.join(ROOT, e))
    .filter((p) => isDir(p))
    .filter((p) => !p.endsWith('_Inbox') && !p.endsWith('_Templates') && !p.endsWith('_Archive') && !p.endsWith('_Index') && path.basename(p) !== 'scripts' && path.basename(p) !== 'Grupo AreLuna');

  const rootCandidates = baseEntries.filter(isCandidateProject);

  const groupCandidates = fs.existsSync(GROUP) && isDir(GROUP)
    ? fs.readdirSync(GROUP)
      .map((e) => path.join(GROUP, e))
      .filter((p) => isDir(p))
      .filter(isCandidateProject)
    : [];

  return [...rootCandidates, ...groupCandidates];
}

function main() {
  ensureDirs();
  const projects = listProjects();
  let totalLinks = 0;
  let totalErrors = 0;

  projects.forEach((proj) => {
    const { created, errors } = indexProject(proj);
    totalLinks += created;
    totalErrors += errors;
  });

  // Indexar também o _Inbox como staging
  if (fs.existsSync(INBOX)) {
    const inboxProjects = fs.readdirSync(INBOX)
      .map((e) => path.join(INBOX, e))
      .filter((p) => fs.existsSync(p) && fs.lstatSync(p).isDirectory());
    inboxProjects.forEach((proj) => {
      const { created, errors } = indexProject(proj);
      totalLinks += created;
      totalErrors += errors;
    });
  }

  const report = {
    timestamp: new Date().toISOString(),
    root: ROOT,
    projectsIndexed: projects.length,
    linksCreated: totalLinks,
    errors: totalErrors,
  };

  const reportPath = path.join(ROOT, '_Index', `index-report-${Date.now()}.json`);
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log('✅ Indexação concluída');
  console.log('📊 Relatório:', reportPath);
}

main();