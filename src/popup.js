// var app = chrome.runtime.getBackgroundPage();

function playCannon() {
  chrome.tabs.executeScript({
    file: 'gameJS/cannon.js'
  }); 
}

function stop() {
    chrome.tabs.executeScript({
	    file: 'gameJS/stop.js'
		});
}

function playTic() {
    chrome.tabs.executeScript({
            file: 'gameJS/tic.js'
                });
}


document.getElementById('playCannon').addEventListener('click', playCannon);
document.getElementById('stopCannon').addEventListener('click', stop);
document.getElementById('playTic').addEventListener('click', playTic);
document.getElementById('stopTic').addEventListener('click', stop);