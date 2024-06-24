const docURL = "https://pvz.ee";
const installUrl = removeLastSlash(docURL) + "/#welcome";
const uninstallUrl = removeLastSlash(docURL) + "/#uninstalled";

class ExtBackground {
  initialize() {
    chrome.runtime.onInstalled.addListener((e) => this.onInstalled(e)),
    uninstallUrl && chrome.runtime.setUninstallURL(uninstallUrl);
    chrome.runtime.onStartup.addListener(() => this.onStartup());
  }

  onInstalled(e) {
      chrome.tabs.create({
        url: installUrl,
      });
    
  }

}

new ExtBackground().initialize();


function removeLastSlash(url) {
  if (url.endsWith("/") && url.length > 1) {
    url = url.slice(0, -1);
  }
  return url;
}
