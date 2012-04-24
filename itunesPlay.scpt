try
	tell application "iTunes"
		do shell script "/bin/cat ~/itunesStatus.txt"
		set stat to result as string
		set vol to sound volume as number
		set sound volume to 0
		if stat is "play" then play
		repeat with i from 1 to vol
			set sound volume to i
			set i to i + 1
			delay 0.4
		end repeat
		do shell script "/bin/rm ~/itunesStatus.txt"
	end tell
end try