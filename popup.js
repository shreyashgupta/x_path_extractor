document.addEventListener('DOMContentLoaded', function() {
    var stopButton = document.getElementById('stop-callback');
    stopButton.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, "stop");
          });
    }, false);
    var startButton = document.getElementById('start-callback');
    startButton.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, "start");
          });
    }, false);
  }, false);

  
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        sendResponse({status: true});
    }
    // return true;
  );