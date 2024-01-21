const fetchData = async (url, options = {}) => {
    try {
        const response = await fetch(url, options);
        console.log('Response:', response); 

        if (!response.ok) {
            throw {
                err: true,
                status: response.status,
                text: !response.statusText
                    ? 'There has been an error'
                    : response.statusText,
            };
        }

        const result = await response.json();
        return { data: result, error: { err: false } };
    } catch (error) {
        return { data: null, error };
    }
};

export default fetchData;