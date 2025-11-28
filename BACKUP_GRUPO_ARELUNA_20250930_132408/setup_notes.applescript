-- setup_notes.applescript
-- Cria pastas-mãe, subpastas de exemplo e uma nota-modelo na pasta "standard"

on ensureFolder(acc, fname)
	tell application "Notes"
		set matches to (every folder of acc whose name is fname)
		if (count of matches) > 0 then
			return item 1 of matches
		else
			return (make new folder at acc with properties {name:fname})
		end if
	end tell
end ensureFolder

on ensureSubfolder(parentFolder, fname)
	tell application "Notes"
		set matches to (every folder of parentFolder whose name is fname)
		if (count of matches) > 0 then
			return item 1 of matches
		else
			return (make new folder at parentFolder with properties {name:fname})
		end if
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

-- ================= EXECUÇÃO =================
tell application "Notes"
	activate

	-- Conta iCloud (ajuste aqui se o nome for diferente)
	set icloudAcc to first account whose name is "iCloud"

	-- Pastas-mãe
	set inboxFolder to my ensureFolder(icloudAcc, "inbox")
	set projetosFolder to my ensureFolder(icloudAcc, "projetos")
	set referenciaFolder to my ensureFolder(icloudAcc, "referencia")
	set aprendizadoFolder to my ensureFolder(icloudAcc, "aprendizado")
	set pessoalFolder to my ensureFolder(icloudAcc, "pessoal")
	set standardFolder to my ensureFolder(icloudAcc, "standard")

	-- Subpastas de exemplo (edite/expanda depois)
	my ensureSubfolder(projetosFolder, "projeto_implantes_portugal")
	my ensureSubfolder(referenciaFolder, "ref_marketing_odontologia")
	my ensureSubfolder(aprendizadoFolder, "aprendizado_gpt_prompt_engineering")
	my ensureSubfolder(pessoalFolder, "pessoal_metas_2025")

	-- Nota-modelo padrão para duplicar quando precisar
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
end tell
