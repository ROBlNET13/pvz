let checkInterval = setInterval(() => {
    if (typeof oS !== "undefined") {
        let previousValue = oS.Lvl;

        const checkForChange = () => {
            if (oS.Lvl !== previousValue) {
                if (String(oS.Lvl).startsWith("[object")) {
                    oS.Lvl = previousValue;
                } else {
                    console.log(
                        `oS.Lvl changed from ${previousValue} to ${oS.Lvl}`
                    );
                    previousValue = oS.Lvl;
                    // now the home bugfix
                    if ($ && $("dAdventure")) {
                        $("dAdventure").onclick = function () {
                            StartAdventure(oS.Lvl);
                        };
                    }
                }
            }
        };

        const changeInterval = setInterval(checkForChange, 1);

        clearInterval(checkInterval);
    }
}, 100);
