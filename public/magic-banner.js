(function () {

    const pageUrl = window.location.href

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/banners?url=${encodeURIComponent(pageUrl)}`)
        .then(function (res) {
            if (res.status === 204) return null
            return res.json()
        })
        .then(function (data) {
            if (!data) return

            const banner = document.createElement("div")
            banner.style.width = "100%"
            banner.style.background = "#000"
            banner.style.display = "flex"
            banner.style.justifyContent = "center"
            banner.style.padding = "10px"
            banner.style.boxSizing = "border-box"
            banner.style.zIndex = "9999"

            const link = document.createElement("a")
            link.href = data.link
            link.target = "_blank"
            link.rel = "noopener noreferrer"

            const img = document.createElement("img")
            img.src = data.imageUrl
            img.style.maxWidth = "100%"
            img.style.height = "auto"
            img.style.display = "block"

            link.appendChild(img)
            banner.appendChild(link)

            document.body.prepend(banner)
        })
        .catch(function (err) {
            console.error("[Magic Banner] erro:", err)
        })
})()
