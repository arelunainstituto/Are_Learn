#!/usr/bin/osascript -l JavaScript

(() => {
  const Notes = Application('Notes');
  Notes.includeStandardAdditions = true;

  // Pega a conta iCloud (ou primeira disponível)
  const acc = Notes.accounts().find(a => a.name() === 'iCloud') || Notes.accounts()[0];
  if (!acc) throw new Error('Nenhuma conta encontrada no Notas');

  // Lista de pastas que queremos criar
  const folders = [
    "0. INBOX",
    "1. PROJETOS",
    "2. ÁREAS",
    "3. RECURSOS",
    "4. ARQUIVO",
    "5. AÇÃO"
  ];

  folders.forEach(name => {
    // Verifica se já existe
    let exists = acc.folders().some(f => f.name() === name);
    if (!exists) {
      acc.make({ new: Notes.Folder, withProperties: { name } });
      console.log(`Criada pasta: ${name}`);
    } else {
      console.log(`Já existe: ${name}`);
    }
  });

  return "✅ Estrutura de pastas criada/verificada.";
})();
