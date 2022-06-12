
let redirectUrl = ''
let blockedUrl = ''
fetch("links.json")
.then((response) => {
      return response.json();
})
.then((json) => {
      console.log(json);
      redirectUrl = json.REDIRECT_URL
      blockedUrl = json.BLOCKED_URL
});

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        console.log('Page Loaded')
        chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
            let url = tabs[0].url;
            // use `url` here inside the callback because it's asynchronous!
            console.log(url)
            if(url.includes(blockedUrl)){
                console.log('Redirect ...')
                chrome.tabs.update({url: redirectUrl});
                window.close()
            }
        });
    }
  })


function randomColor(){
    let r = Math.floor(Math.random()*255)
    let g = Math.floor(Math.random()*255)
    let b = Math.floor(Math.random()*255)
    return `rgb(${r},${g},${b})`;
}