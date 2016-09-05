
export default function request(endpoint, method = 'GET', body) {
    return fetch('api/' + endpoint, {
        headers: { 'Content-Type': 'application/json' },
        method,
        body: body ? JSON.stringify(body) : null,
        mode: 'cors',
        credentials: 'include'
    })
    .then(response => {
        return {
            body: response.text(),
            response
        };
    })
    .then(({ body, response }) => {
        return response.ok
            ? body
            : Promise.reject(body);
    })
    .then(
        body => body,
        error => error
    );
}
