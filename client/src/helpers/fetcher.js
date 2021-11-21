const fetcher = async (url, method, body) => {
    const bodyOption = { body: body ? body : undefined };
    const res = await fetch(url, {
        method: method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        ...bodyOption,
    });
    return res.json();
};

module.exports = { fetcher };
