-- notes_setup_all.applescript
-- Cria pastas-mãe, subpastas a partir de listas e notas padrão em "standard" (idempotente)

on ensureFolder(acc, fname)
	tell application "Notes"
		set matches to (every folder of acc whose name is fname)
		if (count of matches) > 0 then return item 1 of matches
		return (make new folder at acc with properties {name:fname})
	end tell
end ensureFolder

on ensureSubfolder(parentFolder, fname)
	tell application "Notes"
		set matches to (every folder of parentFolder whose name is fname)
		if (count of matches) > 0 then return item 1 of matches
		return (make new folder at parentFolder with properties {name:fname})
	end tell
end ensureSubfolder

on ensureNoteWithTitle(targetFolder, noteTitle, noteBody)
	tell application "Notes"
		set hits to (every note of targetFolder whose name is noteTitle)
		if (count of hits) = 0 then
			make new note at targetFolder with properties {name:noteTitle, body:noteBody}
		end if
	end tell
end ensureNoteWithTitle

on createFromList(icloudAcc, parentName, listFilename)
	set listPath to (POSIX path of (path to home folder)) & listFilename
	try
		do shell script "test -f " & quoted form of listPath
	on error
		return -- não existe arquivo, sai silenciosamente
	end try
	-- limpa linhas vazias e espaços finais
	set cleanLines to paragraphs of (do shell script "grep -v '^$' " & quoted form of listPath & " | sed 's/[[:space:]]*$//'")
	tell application "Notes"
		set parentFolder to my ensureFolder(icloudAcc, parentName)
	end tell
	repeat with ln in cleanLines
		set nameTxt to (ln as text)
		if nameTxt is not "" then
			tell application "Notes"
				my ensureSubfolder(parentFolder, nameTxt)
			end tell
		end if
	end repeat
end createFromList

-- ================= EXECUÇÃO =================
tell application "Notes"
	activate
	-- tenta vários nomes comuns de conta iCloud
	set accList to every account
	if (count of accList) = 0 then error "Nenhuma conta no Apple Notes."
	try
		set icloudAcc to first account whose name is "iCloud"
	on error
		try
			set icloudAcc to first account whose name is "iCloud Notes"
		on error
			set icloudAcc to first account -- fallback
		end try
	end try

	-- Pastas-mãe
	set inboxFolder to my ensureFolder(icloudAcc, "inbox")
	set projetosFolder to my ensureFolder(icloudAcc, "projetos")
	set referenciaFolder to my ensureFolder(icloudAcc, "referencia")
	set aprendizadoFolder to my ensureFolder(icloudAcc, "aprendizado")
	set pessoalFolder to my ensureFolder(icloudAcc, "pessoal")
	set standardFolder to my ensureFolder(icloudAcc, "standard")

	-- Nota modelo (idempotente)
	set templateTitle to "modelo_nota_padrao_ia"
	set templateBody to "
%%bloco_meta
contexto: proj|ref|aprend|pers|ideia
projeto: nome_do_projeto_ou_vazio
tags: []
criacao: AAAA-MM-DD
ultima_atualizacao: AAAA-MM-DD
privacidade: publico|interno|confidencial|sensivel
%%fim_bloco_meta

Title (name pattern):
[contexto]_[tema]_[data]

Content:
(Write the main body of the note here. Keep logical order for AI processing.)

⸻

Daily Review Checklist:
- Context (proj, ref, aprend, pers, ideia) set in bloco_meta.
- Note name follows [contexto]_[tema]_[date] pattern.
- Relevant tags added (max. 7).
- Privacy correct (publico, interno, confidencial, sensivel).
- Summary created (ai_create_summary).
- Tasks extracted (ai_extract_tasks) and assigned.
- Duplicates checked (ai_detect_duplicates).
- If deadlines exist, tag #prazo_aaaa-mm-dd applied.
- Note moved to the correct folder/subfolder (ai_route).
- External sanitized version created if needed (ai_redact).
"
	my ensureNoteWithTitle(standardFolder, templateTitle, templateBody)

	-- Nota "tags_base" (para semear hashtags)
	set tagTitle to "tags_base"
	set tagBody to "#urgente #revisar #ai_processar #ai_resumo #cliente_nome #financeiro #pessoal #prazo_2025-08-20"
	my ensureNoteWithTitle(standardFolder, tagTitle, tagBody)
end tell

-- Criar subpastas a partir das listas, se existirem
my createFromList(icloudAcc, "projetos", "projetos.txt")
my createFromList(icloudAcc, "referencia", "referencia.txt")
my createFromList(icloudAcc, "aprendizado", "aprendizado.txt")
my createFromList(icloudAcc, "pessoal", "pessoal.txt")
