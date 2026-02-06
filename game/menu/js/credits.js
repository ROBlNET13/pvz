PlaySound2("ZombiesOnYourLawn", true);
AllAudioPaused();

menuContainer.querySelector(".content").addEventListener("animationend", () => {
	menuContainer.querySelector(".credits-finale").style.opacity = "1";
});
