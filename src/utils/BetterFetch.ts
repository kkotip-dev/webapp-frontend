export function betterFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    return fetch(input, init)
        .then((response) => {
            if (!response.ok) {
                return Promise.reject({ response });
            }

            return response;
        });
}