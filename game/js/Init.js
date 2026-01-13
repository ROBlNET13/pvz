$User.Client.PC && $User.HTTP
	? ((oS.AutoSun = Math.floor(getCookie("JSPVZAutoSun"))) && ($("cAutoSun").checked = true),
		(oS.Silence = Math.floor(getCookie("JSPVZSilence"))) && ($("cSilence").checked = true))
	: ((oS.AutoSun = 1), ($("cAutoSun").checked = true), (oS.Silence = 0), ($("cSilence").checked = false));
InitGame();
