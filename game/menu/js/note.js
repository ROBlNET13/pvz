PlaySound2("paper");
AllAudioPaused();
if (extraData.overlayImage) {
	$("noteText").src = extraData.overlayImage;
}
menuContainer.querySelector("#cover").addEventListener("click", () => {
	if (extraData.callback) {
		extraData.callback();
	} else {
		UnloadMenu("note");
	}
});
