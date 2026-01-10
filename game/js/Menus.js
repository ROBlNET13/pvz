async function getDAll({ timeoutMs = 5000 } = {}) {
	const existing = document.getElementById("dAll");
	if (existing) {
		return existing;
	}

	// if the DOM isn't ready yet, wait for it first
	if (document.readyState === "loading") {
		await new Promise((resolve) => document.addEventListener("DOMContentLoaded", resolve, { once: true }));
		const afterDom = document.getElementById("dAll");
		if (afterDom) {
			return afterDom;
		}
	}

	// wait for late insertion of #dAll
	return await new Promise((resolve, reject) => {
		const start = Date.now();
		const observer = new MutationObserver(() => {
			const el = document.getElementById("dAll");
			if (el) {
				observer.disconnect();
				resolve(el);
			}
		});

		observer.observe(document.documentElement, { childList: true, subtree: true });

		const tick = () => {
			const el = document.getElementById("dAll");
			if (el) {
				observer.disconnect();
				resolve(el);
				return;
			}
			if (Date.now() - start >= timeoutMs) {
				observer.disconnect();
				reject(new Error("LoadMenu: #dAll was not found (timed out waiting for it)."));
				return;
			}
			requestAnimationFrame(tick);
		};
		tick();
	});
}

const visibleMenus = [];
let menusAmount = 0;

async function PreloadMenu(menuId) {
	// fetch menu/html/{menuId}.html and menu/js/{menuId}.js, return nothing and do nothing with it
	await Promise.all([
		fetch(`menu/html/${menuId}.html`).then((response) => response.text()),
		fetch(`menu/js/${menuId}.js`).then((response) => response.text()),
	]);
}

async function LoadMenu(menuId, background) {
	menusAmount++;
	const dAll = await getDAll();
	// fetch menu/html/{menuId}.html and menu/js/{menuId}.js. run the js code after injecting the html into the #dAll element.
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
	menuContainer.style.zIndex = 9999 + menusAmount;
	if (background) {
		menuContainer.style.background = `url(${background}) no-repeat`;
	}
	menuContainer.innerHTML = html;

	// inject first so the menu script can query its DOM
	dAll.appendChild(menuContainer);
	await new Promise((resolve) => requestAnimationFrame(resolve));

	// run the js code (provide menuContainer to the menu script)
	const runMenuScript = new Function("menuContainer", "menuId", `"use strict";\n${js}\n`);
	runMenuScript(menuContainer, menuId, background);

	visibleMenus.push(menuId);
	console.log(menuContainer);

	return menuContainer;
}

async function UnloadMenu(menuId) {
	const dAll = await getDAll();
	// remove the menu menuContainer from #dAll
	const menuContainer = document.getElementById(`dMenu_${menuId}`);
	if (menuContainer) {
		dAll.removeChild(menuContainer);
	}
	const index = visibleMenus.indexOf(menuId);
	if (index !== -1) {
		visibleMenus.splice(index, 1);
	}
}
