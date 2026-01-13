class TextButton extends HTMLInputElement {
	constructor() {
		super();
		this.type = "button";
		this.id = "btnNextLevel";
		// reset some of its css
		this.style.position = "initial";
		this.style.width = "auto";
		this.style.height = "auto";
		this.style.left = "initial";
		this.style.top = "initial";
	}
	set text(value) {
		this.value = value;
	}
	get text() {
		return this.value;
	}
}

class AlmanacButtonPlant extends HTMLInputElement {
	constructor() {
		super();
		this.type = "button";
		this.id = "btnViewPlant";
		// reset margin-top
		this.style.marginTop = "initial";
	}
	set text(value) {
		this.value = value;
	}
	get text() {
		return this.value;
	}
}

class AlmanacButtonZombie extends HTMLInputElement {
	constructor() {
		super();
		this.type = "button";
		this.id = "btnViewZombie";
		// reset margin-top
		this.style.marginTop = "initial";
	}
	set text(value) {
		this.value = value;
	}
	get text() {
		return this.value;
	}
}

class AlmanacButton extends HTMLDivElement {
	constructor() {
		super();
		this.className = "handbook";
		// reset some of its css
		this.style.position = "initial";
		this.style.left = "initial";
		this.style.top = "initial";
		this.onmouseover = function () {
			this.style.backgroundPosition = "bottom";
		};
		this.onmouseout = function () {
			this.style.backgroundPosition = "top";
		};
		this.onclick = function () {
			ViewHandBook();
		};
		this.style.backgroundPosition = "center top";
	}
}

class MinigameButton extends HTMLElement {
	constructor() {
		super();
		const shadow = this.attachShadow({ mode: "open" });

		const container = document.createElement("div");
		container.style.cursor = "url(images/interface/Pointer.cur), pointer";
		container.style.width = "150px";
		container.style.height = "139px";
		container.style.background = "url(images/interface/Challenge.png) no-repeat 50%";
		container.style.fontSize = "12px";
		container.style.textAlign = "center";
		container.style.display = "flex";
		container.style.flexDirection = "column";

		const imageContainer = document.createElement("div");
		imageContainer.style.paddingTop = "18px";

		const imageSlot = document.createElement("slot");
		imageSlot.name = "image";

		const defaultImg = document.createElement("img");
		defaultImg.src = "images/interface/izombie.png";
		imageSlot.appendChild(defaultImg);

		imageContainer.appendChild(imageSlot);
		container.appendChild(imageContainer);

		const textContainer = document.createElement("div");
		textContainer.className = "list";
		textContainer.style.flex = "1";
		textContainer.style.display = "flex";
		textContainer.style.alignItems = "center";
		textContainer.style.justifyContent = "center";

		const textSlot = document.createElement("slot");
		textSlot.name = "text";
		textSlot.textContent = "I, Zombie";

		textContainer.appendChild(textSlot);
		container.appendChild(textContainer);

		const spacer = document.createElement("div");
		spacer.style.height = "14px";
		container.appendChild(spacer);

		shadow.appendChild(container);
	}
}

class TextBox extends HTMLElement {
	constructor() {
		super();
		const shadow = this.attachShadow({ mode: "open" });

		const container = document.createElement("div");
		container.style.position = "relative";
		container.style.display = "inline-block";

		const textArea = document.createElement("input");
		textArea.type = "text";
		textArea.style.padding = "7px";
		textArea.style.paddingRight = "45px";
		textArea.style.borderStyle = "solid";
		textArea.style.borderRadius = "10px";
		textArea.style.fontSize = "large";
		textArea.style.fontFamily = "briannetod";
		textArea.placeholder = this.getAttribute("placeholder") || "";
		container.appendChild(textArea);

		this.container = container;
		this.textArea = textArea;
		shadow.appendChild(container);
	}

	connectedCallback() {
		// Optional icon button
		if (this.hasAttribute("show-button")) {
			const buttonType = this.getAttribute("show-button");
			const button = document.createElement("button");
			button.style.position = "absolute";
			button.style.right = "0";
			button.style.top = "50%";
			button.style.transform = "translateY(-50%)";
			button.style.width = "35px";
			button.style.height = "34px";
			button.style.cursor = 'url("images/interface/Pointer.cur"), pointer';
			button.style.backgroundColor = "rgb(255, 255, 255)";
			button.style.borderStyle = "hidden";
			button.style.borderRadius = "0px 10px 10px 0px";
			button.style.display = "flex";
			button.style.alignItems = "center";
			button.style.justifyContent = "center";

			if (buttonType === "copy") {
				button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-copy" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M0 0h24v24H0z" stroke="none"></path><path d="M7 9.667A2.667 2.667 0 0 1 9.667 7h8.666A2.667 2.667 0 0 1 21 9.667v8.666A2.667 2.667 0 0 1 18.333 21H9.667A2.667 2.667 0 0 1 7 18.333z"></path><path d="M4.012 16.737A2 2 0 0 1 3 15V5c0-1.1.9-2 2-2h10c.75 0 1.158.385 1.5 1"></path></svg>`;
				button.addEventListener("click", () => {
					navigator.clipboard.writeText(this.textArea.value);
					this.dispatchEvent(
						new CustomEvent("button-click", {
							detail: { value: this.textArea.value, action: "copy" },
						})
					);
				});
			} else if (buttonType === "clear") {
				button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>`;
				button.addEventListener("click", () => {
					this.textArea.value = "";
					this.dispatchEvent(new CustomEvent("button-click", { detail: { value: "", action: "clear" } }));
				});
			}

			this.container.appendChild(button);
		}
	}

	static get observedAttributes() {
		return ["placeholder"];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "placeholder") {
			const input = this.shadowRoot.querySelector("input");
			if (input) {
				input.placeholder = newValue;
			}
		}
	}
}

class ScrollingFrame extends HTMLDivElement {
	constructor() {
		super();
		this.style.position = "relative";

		// Add custom scrollbar styles
		const style = document.createElement("style");
		style.textContent = `
			.custom-scrollbar {
				overflow-y: scroll !important;
				overflow-x: hidden !important;
			}
			
			.custom-scrollbar-xy {
				overflow: scroll !important;
			}
			
			.custom-scrollbar::-webkit-scrollbar,
			.custom-scrollbar-xy::-webkit-scrollbar {
				width: 12px;
				height: 12px;
			}
			
			.custom-scrollbar::-webkit-scrollbar-thumb,
			.custom-scrollbar-xy::-webkit-scrollbar-thumb {
				background: #954f19;
				border-radius: 10px;
				box-shadow: inset -1px -1px 2px 0 rgba(0, 0, 0, 0.2),
					inset 1px 1px 2px 0 #b6703b;
				background: linear-gradient(133deg, #954f19, #904b17);
			}
			
			.custom-scrollbar::-webkit-scrollbar-track,
			.custom-scrollbar-xy::-webkit-scrollbar-track {
				border-radius: 10px;
				box-shadow: inset -0.5px -0.5px 2px 0 rgba(255, 255, 255, 0.5),
					inset 0.5px 0.5px 2px 0 rgba(0, 0, 0, 0.2);
				background: linear-gradient(133deg, #e4a865, #d29a59);
			}
		`;

		if (!document.getElementById("scrolling-frame-styles")) {
			style.id = "scrolling-frame-styles";
			document.head.appendChild(style);
		}
	}

	connectedCallback() {
		if (this.hasAttribute("scroll-x")) {
			this.style.setProperty("overflow", "scroll", "important");
			this.classList.add("custom-scrollbar-xy");
		} else {
			this.style.setProperty("overflow-y", "scroll", "important");
			this.style.setProperty("overflow-x", "hidden", "important");
			this.classList.add("custom-scrollbar");
		}
	}
}

class RockButton extends HTMLDivElement {
	constructor() {
		super();
		this.classList.add("BigLevel");
		this.classList.add("button");
		// reset some css
		this.style.width = "170px";
		this.style.marginLeft = "initial";
		this.style.textAlign = "center";
		// disable text selection
		this.style.userSelect = "none";
	}
}

class MenuButton extends HTMLDivElement {
	constructor() {
		super();
		this.id = "bMainMenu";
		// reset some css
		this.style.visibility = "visible";
		this.style.position = "initial";
		this.style.left = "initial";
		this.style.top = "initial";
		this.onmouseover = function () {
			this.style.backgroundPosition = "bottom";
		};
		this.onmouseout = function () {
			this.style.backgroundPosition = "top";
		};
	}
}

class MenuButtonX extends MenuButton {
	constructor() {
		super();
		this.id = "dRiddleClose";
	}
}

class ScrollingFrameStoneScrollBar extends ScrollingFrame {
	constructor() {
		super();

		// Add stone scrollbar styles
		const style = document.createElement("style");
		style.textContent = `
			.stone-scrollbar::-webkit-scrollbar {
				width: 12px;
				height: 12px;
			}
			
			.stone-scrollbar::-webkit-scrollbar-thumb {
				border-radius: 3px;
				box-shadow: inset -1px -1px 2px 0 rgba(0, 0, 0, 0.2),
					inset 1px 1px 2px 0 rgba(255, 255, 255, 0.5);
				background: linear-gradient(130deg, #5f606f, #525362);
			}
			
			.stone-scrollbar::-webkit-scrollbar-track {
				border-radius: 3px;
				box-shadow: inset -0.5px -0.5px 2px 0 rgba(255, 255, 255, 0.5),
					inset 0.5px 0.5px 2px 0 rgba(0, 0, 0, 0.2);
				background: linear-gradient(133deg, #ded5f7, #c9c1e2);
			}
		`;

		if (!document.getElementById("stone-scrollbar-styles")) {
			style.id = "stone-scrollbar-styles";
			document.head.appendChild(style);
		}

		// Remove parent class and add stone class
		this.classList.remove("custom-scrollbar", "custom-scrollbar-xy");
		this.classList.add("stone-scrollbar");
	}
}

customElements.define("text-button", TextButton, { extends: "input" });
customElements.define("almanac-button-plant", AlmanacButtonPlant, { extends: "input" });
customElements.define("almanac-button-zombie", AlmanacButtonZombie, { extends: "input" });
customElements.define("almanac-button", AlmanacButton, { extends: "div" });
customElements.define("minigame-button", MinigameButton);
customElements.define("text-box", TextBox);
customElements.define("scrolling-frame", ScrollingFrame, { extends: "div" });
customElements.define("rock-button", RockButton, { extends: "div" });
customElements.define("menu-button", MenuButton, { extends: "div" });
customElements.define("menu-button-x", MenuButtonX, { extends: "div" });
customElements.define("scrolling-frame-stone-scroll-bar", ScrollingFrameStoneScrollBar, {
	extends: "div",
});
