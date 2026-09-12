const urlInput = document.getElementById("urlInput")
let url = ""
function openUrl() {
    url = urlInput.value
    window.open(url, "_blank")
}
