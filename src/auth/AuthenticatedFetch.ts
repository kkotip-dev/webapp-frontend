import { betterFetch } from "../utils/BetterFetch";

export function authenticatedFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    const token = localStorage.getItem("token");

    return betterFetch(input, {
        ...init,
        headers: {
            "Authorization": token ? `Bearer ${localStorage.getItem("token")}` : "",
            ...init?.headers
        }
    }).then((response) => {
        return response;
    })
        .catch((error) => {
            if (error.response.status === 401) {
                localStorage.removeItem("type");
                localStorage.removeItem("token");
            }

            return Promise.reject(error);
        })

}