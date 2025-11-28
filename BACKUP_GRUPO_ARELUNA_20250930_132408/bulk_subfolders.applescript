-- Lê ~/projetos.txt e cria subpastas em iCloud > projetos (idempotente)

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

-- Caminho do ficheiro de lista
set listPath to (POSIX path of (path to home folder)) & "projetos.txt"

-- Lê linhas não vazias e remove espaços no fim
set rawLines to paragraphs of (do shell script "grep -v '^$' " & quoted form of listPath & " | sed 's/[[:space:]]*$//'")

tell application "Notes"
	activate
	-- Tenta usar a conta chamada "iCloud"; se não achar, usa a primeira conta
	try
		set icloudAcc to first account whose name is "iCloud"
	on error
		set icloudAcc to first account
	end try

	-- Garante a pasta-mãe "projetos"
	set projetosFolder to my ensureFolder(icloudAcc, "projetos")
end tell

-- Cria cada subpasta listada
repeat with ln in rawLines
	set nameTxt to (ln as text)
	if nameTxt is not "" then
		tell application "Notes"
			my ensureSubfolder(projetosFolder, nameTxt)
		end tell
	end if
end repeat
