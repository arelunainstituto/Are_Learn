#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const INDEX = path.join(ROOT, '_Index');
const INBOX = path.join(ROOT, '_Inbox');
const GROUP = path.join(ROOT, 'Grupo AreLuna');

const INDEX_DIRS = ['By-Tech', 'By-Year', 'By-Status', 'By-Client'].map((d) => path.join(INDEX, d));

function isDir(p) {
  try { return fs.lstatSync(p).isDirectory(); } catch { return false; }
}
function isSymlink(p) {
  try { return fs.lstatSync(p).isSymbolicLink(); } catch { return false; }
}

function resolveTarget(linkPath) {
  try {
    const target = fs.readlinkSync(linkPath);
    const absTarget = path.isAbsolute(target) ? target : path.resolve(path.dirname(linkPath), target);
    return absTarget;
  } catch { return null; }
}

function scanIndex() {
  let total = 0, ok = 0, broken = 0;
  const brokenList = [];
  INDEX_DIRS.forEach((base) => {
    if (!isDir(base)) return;
    const groups = fs.readdirSync(base).map((e) => path.join(base, e)).filter(isDir);
    groups.forEach((grp) => {
      const entries = fs.readdirSync(grp).map((e) => path.join(grp, e));
      entries.forEach((entry) => {
        if (!isSymlink(entry)) return;
        total++;
        const target = resolveTarget(entry);
        if (target && fs.existsSync(target)) {
          ok++;
        } else {
          broken++;
          brokenList.push({ link: entry, target });
        }
      });
    });
  });
  return { total, ok, broken, brokenList };
}

function listProjects(base) {
  const entries = fs.readdirSync(base)
    .map((e) => path.join(base, e))
    .filter((p) => isDir(p));
  return entries;
}

function checkMeta(base) {
  let missing = 0; let present = 0;
  const details = [];
  listProjects(base).forEach((proj) => {
    const metaPath = path.join(proj, 'project.meta.json');
    if (fs.existsSync(metaPath)) { present++; }
    else { missing++; details.push(proj); }
  });
  return { base, present, missing, details };
}

function main() {
  const idx = scanIndex();
  const metaRoot = checkMeta(ROOT);
  const metaInbox = fs.existsSync(INBOX) ? checkMeta(INBOX) : { base: INBOX, present: 0, missing: 0, details: [] };
  const metaGroup = fs.existsSync(GROUP) ? checkMeta(GROUP) : { base: GROUP, present: 0, missing: 0, details: [] };

  const report = {
    timestamp: new Date().toISOString(),
    root: ROOT,
    index: idx,
    meta: { root: metaRoot, inbox: metaInbox, group: metaGroup }
  };

  if (!fs.existsSync(INDEX)) fs.mkdirSync(INDEX, { recursive: true });
  const out = path.join(INDEX, `status-report-${Date.now()}.json`);
  fs.writeFileSync(out, JSON.stringify(report, null, 2));

  console.log('✅ Status gerado');
  console.log(`🔗 Links: total=${idx.total}, ok=${idx.ok}, broken=${idx.broken}`);
  console.log(`📝 Meta ROOT: present=${metaRoot.present}, missing=${metaRoot.missing}`);
  console.log(`📝 Meta INBOX: present=${metaInbox.present}, missing=${metaInbox.missing}`);
  console.log(`📝 Meta GROUP: present=${metaGroup.present}, missing=${metaGroup.missing}`);
  console.log('📄 Relatório:', out);
}

main();