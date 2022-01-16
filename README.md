# DownloadJS

A JavaScript Library for downloading files on our web page.

# Installation

Add DownloadJS from the script tag
```html
<script src="path/to/download.js"></script>
```
Or from [NodifyJS](https://www.github.com/DevBash1/NodifyJS)
```javascript
let downloader = require("path/to/download.js");
```
# Usage

You can download files from any url using DownloadJS.
Example

```javascript
// Create DownloadJS Instance 
let d = new DownloadJS("https://picsum.photos/300");

// onFinish is called when download has finished
d.onFinish = function(){
    // This will prompt the file for saving to device
    d.saveAs("Filename"); //Leaving the filename param will make DownloadJS guess the name of the file.

    // This will return the downloaded file as a Javascript File Object
    // d.getFile()

    // This will return a URL for accessing the file from the browser's storage
    // d.getFileLink()

    // This will return the downloaded file as base64 string
    // d.getBase64()
}

// Starts the download
d.start();
```

DownloadJS makes downing files in browser easy but there is a problem which will commonly occur.  
Which is CORS error, this error occurs when we try to download from an external url which does not allow that.
DownloadJS has a way to bypass.
Example Below:

```javascript
// Create DownloadJS Instance 
let d = new DownloadJS("https://picsum.photos/300");

// This will tell DownloadJS to use a proxy for downloading which tries to bypass CORS Error.
d.useProxy();

// This tells DownloadJS to first try to download without proxy then download again if download fails due to CORS Error.
// We use this when we are not sure whether a CORS Error will occur.
// d.autoUseProxy();

// onFinish is called when download has finished
d.onFinish = function(){
    // This will prompt the file for saving to device
    d.saveAs("Filename"); //Leaving the filename param will make DownloadJS guess the name of the file.
}

d.start();

```

## Listeners

DownloadJS has other listeners you can use to play around.

```javascript

onProgress = function(progress){
    // @param progress ([1-100]||null)
    // progress holds the progress of the download from 1 to 100 or null if the progress can not be calculated
}

this.onFinish = function(){
    // This function will be called when the download completes
}

this.onStopped = function(){
    // This function will be called when the download is aborted using
    // d.stop();
    // This will pause the download in some browsers depending on the server and continue from where it stopped when restarted.  
    // While it will stop completely on some browsers.
}

this.onError = function(){
    // This function is called when an error occurs while downloading
}

this.onNetworkError = function(){
    // This function is called when the browser is disconnected from the internet totally
}

this.onBadURL = function(){
    // This function will be called when a 404 error occurs
}

this.onCorsError = function(){
    // This function will be called when CORS error occurs.
    // Will not detect all CORS errors.
}

this.onLeftTimeUpdate = function(time){
    // @param time (int)
    // This will return the download remain time in miliseconds
}

this.onSpeedUpdate = function(speed){
    // @param speed (int)
    // This will return the speed of download per second in byte if it can be calulated.
    // Eg 1024 (byte)
}

this.onEnded = function(){
    // This function will be called when the download completes same as onFinsished.
    // But you can use this to listen for download completion when using a widget.
}


```

## Methods

This are some of DownloadJS methods you might find useful.

```javascript
d.getDownloadSpeed() // Return download speed per second in byte

d.getTme() // Return Download time in format (HH:MM:SS)

d.stop() // Stops the download

d.restart() // Restarts the download

// This uses DownloadJS to display a download box for managing the downloaded file.
// It takes a css query for finding the element where the widget will be appended.

d.useWidget("#downloader")

d.removeWidget() // This will remove the widget and destroy the DownloadJS Instance.

// This is used to override the DownloadJS custom styling.

let theme = `
#dl-info {
    background: #111529;
}
#dl-bar {
    background: #111529;
}
#dl-subcover {
    background: #111529;
}
`
d.setStyle(theme)

d.getInstances() // Returns all active DownloadJS instances.
```

# Caution

Downloading files larger than 100mb can make the browser unstable and sometimes crash.
This depends on the device and the space left on the device.