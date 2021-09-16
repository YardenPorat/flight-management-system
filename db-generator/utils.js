async function resetDb(db) {
    try {
        await db.raw(`call sp_delete_all();`);
    } catch (err) {
        console.log('Could not reset db\n' + err);
    }
}

module.exports = {
    resetDb,
};
