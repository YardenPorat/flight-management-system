function sqlDate(dateString) {
    return new Date(dateString).toISOString().slice(0, 19).replace('T', ' ');
}

module.exports = {
    sqlDate,
};
