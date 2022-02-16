export const APIFailMsg =  `Seems like we are unable to connect to the server! Please try after sometime.`;


export const groupBy = (objectArray, property) => {
    return objectArray.reduce((acc, obj) => {
        let key = obj[property]
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
    }, {});
};


export const APIRequest = (abortController, methodType, API_END_POINT, data=null) => {
    const BASE_URL = 'https://jsonplaceholder.typicode.com/';
    const url = `${BASE_URL}${API_END_POINT}`;

    const requestPayload = {
        method: methodType,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        signal: abortController.signal
    };

    if (abortController.aborted) return;
    return fetch(url, requestPayload);
};