const formattedDate = (date) => {
    const newDate = new Date(date)
    return newDate.toISOString().split('T')[0]
}

const formatIDR = (number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    }).format(number);
}


module.exports = { formattedDate, formatIDR }