-- EXPORTA UMA PASTA DO ICLOUD NOTES PARA ~/notes_dump
-- AJUSTE O NOME DA PASTA NA LINHA set targetFolderName

set targetFolderName to "Antigos" -- <<< troque aqui se quiser outra pasta
set basePath to POSIX path of (path to home folder) & "notes_dump/"
set redactMode to true -- defina false para não mascarar PII

on ymdFromDate(d)
	set {y, m, dd} to {year of d as integer, month of d as integer, day of d as integer}
	set m to text -2 thru -1 of ("0" & m)
	set dd to text -2 thru -1 of ("0" & dd)
	return (y as text) & "-" & m & "-" & dd
end ymdFromDate

on slugify(t)
	set sh to "printf %s " & quoted form of t & " | iconv -f UTF-8 -t ASCII//TRANSLIT 2>/dev/null | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/_/g; s/^_|_$//g; s/_+/_/g'"
	return do shell script sh
end slugify

on redactText(s)
	set py to "import re,sys; s=sys.stdin.read()\n" & ¬
	"def mask_email(m): return '<email_oculto>'\n" & ¬
	"s=re.sub(r'[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}', mask_email, s)\n" & ¬
	"s=re.sub(r'\\b\\d{3}[\\.-]?\\d{3}[\\.-]?\\d{3}-?\\d{2}\\b','<cpf_oculto>', s)\n" & ¬
	"s=re.sub(r'\\b\\d{9,14}\\b','<id_num_oculto>', s)\n" & ¬
	"sys.stdout.write(s)"
	return do shell script "python3 - <<'PY'\n" & py & "\nPY" input s
end redactText

tell application "Notes"
	activate
	try
		set acc to first account whose name is "iCloud"
	on error
		set acc to first account
	end try
	if not (exists folder targetFolderName of acc) then error "Pasta '" & targetFolderName & "' não encontrada no iCloud Notes."
	set f to folder targetFolderName of acc
	set ns to every note of f
end tell

set i to 0
repeat with n in ns
	tell application "Notes"
		set theNote to contents of n
		set ttl to name of theNote as text
		set rawBody to (body of theNote) as text
		set createdYMD to my ymdFromDate(creation date of theNote)
	end tell

	set safeTitle to my slugify(ttl)
	if safeTitle = "" then set safeTitle to "nota"

	set tmpHTML to (do shell script "mktemp /tmp/notes_export.XXXXXX.html")
	set tmpTXT to (do shell script "mktemp /tmp/notes_export.XXXXXX.txt")
	do shell script "printf %s " & quoted form of rawBody & " > " & quoted form of tmpHTML
	do shell script "textutil -convert txt -output " & quoted form of tmpTXT & " " & quoted form of tmpHTML & " >/dev/null 2>&1 || cp " & quoted form of tmpHTML & " " & quoted form of tmpTXT
	set bodyTXT to do shell script "cat " & quoted form of tmpTXT
	if redactMode then set bodyTXT to my redactText(bodyTXT)

	set outName to targetFolderName & "__" & safeTitle & "__" & createdYMD & ".txt"
	set outPath to basePath & outName
	set header to "Folder: " & targetFolderName & linefeed & "Title: " & ttl & linefeed & "Created: " & createdYMD & linefeed & "-----" & linefeed
	do shell script "printf %s " & quoted form of (header & bodyTXT) & " > " & quoted form of outPath

	do shell script "rm -f " & quoted form of tmpHTML & " " & quoted form of tmpTXT
	set i to i + 1
end repeat
return "Exportadas " & (i as text) & " notas da pasta '" & targetFolderName & "' para ~/notes_dump"
