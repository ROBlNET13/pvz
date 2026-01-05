const dSurface = document.getElementById("dSurface");

async function PreloadMenu(menuId) {
	// fetch menu/html/{menuId}.html and menu/js/{menuId}.js, return nothing and do nothing with it
	await Promise.all([
		fetch(`menu/html/${menuId}.html`).then((response) => response.text()),
		fetch(`menu/js/${menuId}.js`).then((response) => response.text()),
	]);
}

async function LoadMenu(menuId, background) {
	// fetch menu/html/{menuId}.html and menu/js/{menuId}.js. run the js code after injecting the html into the #dSurface element.
	const [htmlResponse, jsResponse] = await Promise.all([fetch(`menu/html/${menuId}.html`), fetch(`menu/js/${menuId}.js`)]);

	const html = await htmlResponse.text();
	const js = await jsResponse.text();

	// make menuContainer for menu
	const menuContainer = document.createElement("div");
	menuContainer.id = `dMenu_${menuId}`;
	menuContainer.style.display = "block";
	menuContainer.style.position = "absolute";
	menuContainer.style.width = "100%";
	menuContainer.style.height = "100%";
	menuContainer.style.top = "0";
	menuContainer.style.left = "0";
	if (background) {
		menuContainer.style.background = `url(${background}) no-repeat`;
	}
	menuContainer.innerHTML = html;
	dSurface.appendChild(menuContainer);

	// run the js code (provide menuContainer to the menu script)
	const runMenuScript = new Function("menuContainer", "menuId", `"use strict";\n${js}\n`);
	runMenuScript(menuContainer, menuId, background);

	return menuContainer;
}

async function UnloadMenu(menuId) {
	// remove the menu menuContainer from #dSurface
	const menuContainer = document.getElementById(`dMenu_${menuId}`);
	if (menuContainer) {
		dSurface.removeChild(menuContainer);
	}
}
