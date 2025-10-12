const formatDate = (value) => {
    if (!value && value !== 0) return "-"
    let timestamp = value

    if (typeof value === "string" && /^\d+$/.test(value)) {
        timestamp = Number(value)
    }

    let date
    if (typeof timestamp === "number") {
        const ms = timestamp < 1e12 ? timestamp * 1000 : timestamp
        date = new Date(ms)
    } else {
        date = new Date(String(timestamp))
    }

    if (isNaN(date)) return String(value)

    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()

    return `${day}/${month}/${year}`
}

module.exports = {
    formatDate
}