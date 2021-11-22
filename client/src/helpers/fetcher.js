const fetcher = async (url, method, body) => {
    const bodyOption = { body: body ? JSON.stringify(body) : undefined };
    const res = await fetch(url, {
        method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        ...(body ? bodyOption : {}),
    });
    return res.json();
};

module.exports = { fetcher };
