
document.addEventListener('DOMContentLoaded', function() {
  let started=0;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.storage.sync.get([tabs[0].id.toString()], function(result) {
      started=parseInt(result[tabs[0].id.toString()])
      // document.getElementById("h").innerHTML=started

      // document.getElementById("h").innerHTML=started
      var btn = document.getElementById('btn');
      btn.addEventListener('click', toggle);
      if(started)
      {
        document.getElementById("btn").innerHTML = 'Stop'
        btn.className="stop"
      }
      else
      {
        document.getElementById("btn").innerHTML = 'Start'
        btn.className="start"
      }
      });
  });
  }, false);

function toggle()
{
    let started
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.storage.sync.get([tabs[0].id.toString()], function(result) {
    started=parseInt(result[tabs[0].id.toString()])
    if(started)
    {
        document.getElementById("btn").innerHTML = 'Start'
        btn.className="start"
        chrome.tabs.sendMessage(tabs[0].id, "stop");
        let st=tabs[0].id.toString();
        var jsonfile = {};
        jsonfile[st] = 0;
        chrome.storage.sync.set(jsonfile);
        started=0;
    }
    else
    {
        document.getElementById("btn").innerHTML = 'Stop'
        btn.className="stop"
        chrome.tabs.sendMessage(tabs[0].id, "start");
        let st=tabs[0].id.toString();
        var jsonfile = {};
        jsonfile[st] = 1;
        chrome.storage.sync.set(jsonfile);
        started=1;
    }
    });
});
}
  
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(request)
        sendResponse({status: true});
    }
    // return true;
  );