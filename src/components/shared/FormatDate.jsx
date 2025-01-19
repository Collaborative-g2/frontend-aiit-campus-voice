const FormatDate = (isoString) => {
    const date = new Date(isoString);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Format: "YYYY-M-D HH:mm"
    return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export default FormatDate;