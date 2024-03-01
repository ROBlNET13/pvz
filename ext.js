const configGameURL = "game/iframe.html";


const configHomepageURL = chrome.runtime.getManifest().homepage_url;
const configTitle = chrome.runtime.getManifest().name;
const configVersionName = chrome.runtime.getManifest().version_name;



document.title = configTitle + " " + configVersionName;






    var iframe = document.createElement('iframe');
    iframe.src = configGameURL;
    iframe.class = 'iframe';
    iframe.scrolling = 'no';

    var container = document.getElementById('iframe-container');
    container.appendChild(iframe);





  

// /src="https://run-3-unblocked.github.io/"


class MyGame {
    constructor() {
      this.configHomepageURL = chrome.runtime.getManifest().homepage_url;
      this.configTitle = chrome.runtime.getManifest().name;
      this.configVersionName = chrome.runtime.getManifest().version_name;
      this.setTitle();
  
      this.setupNavigation();
  
      this.loadMenuItems(); // Call the function here initially
  
    }
  
  
    setupNavigation() {
      const fragment = new DocumentFragment();
  
      const nav = fragment.appendChild(document.createElement("nav"));
  
      const sideNavigationDiv = nav.appendChild(document.createElement("div"));
      sideNavigationDiv.id = "side-navigation";
  
      const menuToggleDiv = sideNavigationDiv.appendChild(
        document.createElement("div")
      );
      menuToggleDiv.id = "menuToggle";
  
      const inputElem = menuToggleDiv.appendChild(
        document.createElement("input")
      );
      inputElem.type = "checkbox";
      inputElem.setAttribute("aria-label", "Show or Hide Menu");
      inputElem.id = "checkbox1";
  
      for (let i = 0; i < 3; i++) {
        menuToggleDiv.appendChild(document.createElement("span"));
      }
  
      const menuContainerDiv = menuToggleDiv.appendChild(
        document.createElement("div")
      );
      menuContainerDiv.id = "menu-container";
  
      const scrollableContainerDiv = menuContainerDiv.appendChild(
        document.createElement("div")
      );
      scrollableContainerDiv.id = "scrollable-container";
  
      const leftColumnDiv = scrollableContainerDiv.appendChild(
        document.createElement("div")
      );
      const ul = document.createElement("ul");
      ul.id = "menu1";
      leftColumnDiv.appendChild(ul);
  
      const menuBottomDiv = scrollableContainerDiv.appendChild(
        document.createElement("div")
      );
      menuBottomDiv.id = "menu-bottom";
  
      menuBottomDiv.appendChild(document.createElement("p"));
  
      const bodyTag = document.getElementsByTagName("body")[0];
  
      bodyTag.insertAdjacentElement("beforeend", nav);
  
      // Attach the event listener to checkbox1
      const checkbox1 = document.getElementById("checkbox1");
      checkbox1.addEventListener("click", () => {
        if (checkbox1.checked) {
          this.loadMenuItems();
        } else {
          ul.innerHTML = ""; // Clear the menu items if checkbox1 is unchecked
        }
      });
    }
  
    loadMenuItems() {
      const url = "https://ubg4all.github.io/data.json";
      const dataContainer = document.getElementById("menu1");
      const checkbox = document.getElementById("checkbox1");
  
      checkbox.addEventListener("click", () => {
        if (checkbox.checked) {
          fetch(url)
            .then((response) => response.json())
            .then((data) => {
              data.forEach((item) => {
                const title = document.createElement("a");
                title.textContent = item.name;
                title.href = item.link;
                title.target = "_blank";
  
                const image = document.createElement("img");
                image.src = item.thumb;
                image.height = "30";
                image.width = "30";
  
                const post = document.createElement("li");
                post.appendChild(image);
                post.appendChild(title);
  
                dataContainer.appendChild(post);
              });
            })
            .catch((error) => console.error(error));
        } else {
          dataContainer.innerHTML = "";
        }
      });
    }
    setTitle() {
  
      document.title = this.configTitle + " " + this.configVersionName;
    }
  }
  const myGame = new MyGame();


// Function to open a URL in fullscreen mode
function openFullscreenURL() {
    window.open('https://pvz.ee', '_blank', 'fullscreen=yes');
  }
  
  // Function to open the rate link of the extension
  function openExtensionRateLink() {
    const extensionId = chrome.runtime.id;
    const extensionRateLink = `https://chrome.google.com/webstore/detail/${extensionId}/reviews`;
    window.open(extensionRateLink, '_blank');
  }
  
  // Attach click event listeners to the buttons
  document.getElementById('fullscreenButton').addEventListener('click', openFullscreenURL);
  document.getElementById('rateButton').addEventListener('click', openExtensionRateLink);
  