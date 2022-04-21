const postData = async function (url, data) {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data,
    });

    return await res.json();
};

const getResource = async function (url) {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Could not fetch ${url} on status ${res.status}`);
    }
    return await res.json();
};

export { postData, getResource }; 