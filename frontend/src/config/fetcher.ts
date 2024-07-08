//TODO:FIX interfaces
export const fetcher = (...args) => fetch(...args).then((res) => res.json());

export async function postRequest(
	url: string,
	{ arg }: { arg: { name: string } }
) {
	return fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(arg),
	}).then((res) => res.json());
}

export async function putRequest(url: string, { arg }: { arg: string[] }) {
	return fetch(url, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(arg),
	}).then((res) => res.json());
}
