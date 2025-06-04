document.getElementById("createRoom").onclick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"]
      });
      chrome.runtime.sendMessage({ action: "create" });
    });
  };
  
  document.getElementById("joinRoom").onclick = () => {
    const roomId = document.getElementById("roomId").value;
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"]
      });
      chrome.runtime.sendMessage({ action: "join", roomId });
    });
  };