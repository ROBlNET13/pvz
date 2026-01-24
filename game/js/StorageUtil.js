/**
 * StorageUtil - Abstraction layer for storage that works in both extension and web contexts
 * Automatically detects if running in a browser extension and uses the appropriate API
 */
const StorageUtil = (() => {
	// Detect if we're running in a browser extension by checking if localStorage is unavailable
	let isExtension = false;
	try {
		localStorage.setItem("__test__", "1");
		localStorage.removeItem("__test__");
	} catch (e) {
		// If localStorage is unavailable, we're likely in an extension
		isExtension = true;
	}

	// Check if localStorage is available
	const localStorageAvailable = !isExtension;

	/**
	 * Get an item from storage
	 * @param {string} key - The storage key
	 * @returns {string|null} - The stored value or null if not found
	 */
	const getItem = (key) => {
		if (isExtension && typeof chrome !== "undefined" && chrome.storage) {
			// For extension, use chrome.storage.sync
			let result = null;
			chrome.storage.sync.get([key], (data) => {
				result = data[key] !== undefined ? data[key] : null;
			});
			return result;
		} else if (localStorageAvailable) {
			// Use localStorage for web
			try {
				return localStorage.getItem(key);
			} catch (e) {
				console.warn(`Failed to get item from localStorage: ${e}`);
				return null;
			}
		} else {
			return null;
		}
	};

	/**
	 * Set an item in storage
	 * @param {string} key - The storage key
	 * @param {string} value - The value to store
	 */
	const setItem = (key, value) => {
		if (isExtension && typeof chrome !== "undefined" && chrome.storage) {
			// For extension, use chrome.storage.sync
			chrome.storage.sync.set({ [key]: value }, () => {
				if (chrome.runtime.lastError) {
					console.warn(`Failed to set item in extension storage: ${chrome.runtime.lastError.message}`);
				}
			});
		} else if (localStorageAvailable) {
			// Use localStorage for web
			try {
				localStorage.setItem(key, value);
			} catch (e) {
				console.warn(`Failed to set item in localStorage: ${e}`);
			}
		}
	};

	/**
	 * Remove an item from storage
	 * @param {string} key - The storage key
	 */
	const removeItem = (key) => {
		if (isExtension && typeof chrome !== "undefined" && chrome.storage) {
			// For extension, use chrome.storage.sync
			chrome.storage.sync.remove([key], () => {
				if (chrome.runtime.lastError) {
					console.warn(`Failed to remove item from extension storage: ${chrome.runtime.lastError.message}`);
				}
			});
		} else if (localStorageAvailable) {
			// Use localStorage for web
			try {
				localStorage.removeItem(key);
			} catch (e) {
				console.warn(`Failed to remove item from localStorage: ${e}`);
			}
		}
	};

	/**
	 * Clear all storage
	 */
	const clear = () => {
		if (isExtension && typeof chrome !== "undefined" && chrome.storage) {
			// For extension, use chrome.storage.sync
			chrome.storage.sync.clear(() => {
				if (chrome.runtime.lastError) {
					console.warn(`Failed to clear extension storage: ${chrome.runtime.lastError.message}`);
				}
			});
		} else if (localStorageAvailable) {
			// Use localStorage for web
			try {
				localStorage.clear();
			} catch (e) {
				console.warn(`Failed to clear localStorage: ${e}`);
			}
		}
	};

	return {
		getItem,
		setItem,
		removeItem,
		clear,
		isExtension: () => isExtension,
		isLocalStorageAvailable: () => localStorageAvailable,
	};
})();
