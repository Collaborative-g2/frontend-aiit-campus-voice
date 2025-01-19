const TruncateText = (text, maxLength = 30) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export default TruncateText;