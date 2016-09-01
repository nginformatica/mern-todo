
export default function request(endpoint, method = 'GET', body) {
    return fetch('api/' + endpoint, {
        headers: { 'Content-Type': 'application/json' },
        method,
        body: JSON.stringify(body)
    })
    .then(response => {
        return {
            body: response.json().catch(() => response.text()),
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
