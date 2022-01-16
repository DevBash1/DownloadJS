function byId(id) {
    return document.getElementById(id);
}

let d;

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
`;

byId("download").onclick = function() {
    if (byId("input").value.trim() != "") {
        d = new DownloadJS(byId("input").value.trim());
        d.autoUseProxy();
        d.setStyle(theme);
        d.useWidget("#downloaders")
        d.getFileInfo(function(size) {
            if (size) {
                let allowed = ((size / 1000) / 1000);
                if (allowed > 100) {
                    d.removeWidget();
                    alert("File Can Not Be Larger Than 100mb to avoid crashing the browser");
                    return false;
                }
            }
            d.start();
        }, "Content-Length");
    }
}