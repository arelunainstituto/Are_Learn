-- Padroniza notas na pasta "antigos": insere bloco_meta, título padrão e #revisar

on ymdFromDate(d)
	set {y, m, dd} to {year of d as integer, month of d as integer, day of d as integer}
	set m to text -2 thru -1 of ("0" & m)
	set dd to text -2 thru -1 of ("0" & dd)
	return (y as text) & "-" & m & "-" & dd
end ymdFromDate

on slugify(t)
	-- remove acentos e caracteres estranhos usando iconv + sed
	set sh to "printf %s " & quoted form of t & " | iconv -f UTF-8 -t ASCII//TRANSLIT 2>/dev/null | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/_/g; s/^_|_$//g; s/_+/_/g'"
	return do shell script sh
end slugify

on ensureMetaOnBody(bodyText, contexto, dtYMD)
	if bodyText contains "%%bloco_meta" then
		return bodyText
	else
		set meta to "%%bloco_meta
contexto: " & contexto & "
projeto: nome_do_projeto_ou_vazio
tags: [#revisar]
criacao: " & dtYMD & "
ultima_atualizacao: " & dtYMD & "
privacidade: publico|interno|confidencial|sensivel
%%fim_bloco_meta

" -- quebra de linha extra
		return meta & bodyText
	end if
end ensureMetaOnBody

tell application "Notes"
	activate
	-- localizar conta e pasta "antigos"
	try
		set acc to first account whose name is "iCloud"
	on error
		set acc to first account
	end try

	if not (exists folder "antigos" of acc) then error "Pasta 'antigos' não encontrada no iCloud Notes."

	set antigosFolder to folder "antigos" of acc
	set allNotes to every note of antigosFolder

	repeat with n in allNotes
		set theNote to contents of n

		-- datas
		set cdate to creation date of theNote
		set ymd to my ymdFromDate(cdate)

		-- título atual e tema
		set oldTitle to name of theNote
		set bodyTxt to body of theNote as text

		-- tenta usar primeira linha do corpo se título for vazio
		if oldTitle is "" then
			set firstLine to paragraph 1 of bodyTxt
			set baseTitle to firstLine
		else
			set baseTitle to oldTitle
		end if

		set tema to my slugify(baseTitle)
		if (count of words of tema) = 0 or tema = "" then set tema to "nota"

		set contexto to "ideia"

		-- título padrão (apenas se ainda não estiver no padrão)
		if oldTitle does not contain "_" or oldTitle does not contain "-" then
			set newTitle to contexto & "_" & tema & "_" & ymd
			set name of theNote to newTitle
		end if

		-- inserir bloco_meta se faltar
		set newBody to my ensureMetaOnBody(bodyTxt, contexto, ymd)
		if newBody is not bodyTxt then set body of theNote to newBody
	end repeat
end tell
