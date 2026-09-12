const form = document.getElementById("openForm")
const urlInput = document.getElementById("urlInput")
const hint = document.getElementById("hint")
const defaultHint = hint.innerHTML

function normalizeUrl(value) {
    const trimmed = value.trim()
    if (!trimmed) return null
    const withScheme = /^[a-z][a-z0-9+.-]*:/i.test(trimmed) ? trimmed : "https://" + trimmed
    try {
        const url = new URL(withScheme)
        if (url.protocol !== "http:" && url.protocol !== "https:") return null
        return url.href
    } catch {
        return null
    }
}

function showError(message) {
    form.classList.add("is-invalid")
    hint.dataset.state = "error"
    hint.textContent = message
    urlInput.focus()
}

function clearError() {
    form.classList.remove("is-invalid")
    delete hint.dataset.state
    hint.innerHTML = defaultHint
}

function openUrl() {
    const value = urlInput.value
    if (!value.trim()) {
        showError("Type a web address first.")
        return
    }
    const url = normalizeUrl(value)
    if (!url) {
        showError("That doesn't look like a web address. Try something like example.com.")
        return
    }
    clearError()
    window.open(url, "_blank", "noopener")
}

form.addEventListener("submit", function (event) {
    event.preventDefault()
    openUrl()
})

urlInput.addEventListener("input", function () {
    if (form.classList.contains("is-invalid")) clearError()
})
