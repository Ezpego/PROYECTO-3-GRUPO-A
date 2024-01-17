import { useState, useEffect } from 'react';
//* Custom Hooks
export const useFetch = (url) => {
	const [data, setData] = useState(null);
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const getData = async (url) => {
			try {
				const response = await fetch(url);
				if (!response.ok) {
					throw {
						err: true,
						status: response.status,
						text: !response.statusText
							? 'There has been an error'
							: response.statusText,
					};
				}

				const data = await response.json();
				setIsPending(false);
				setData(data);
				setError({ err: false });
			} catch (error) {
				setIsPending(true);
				setError(error);
			}
		};

		getData(url);
	}, [url]);

	return { data, isPending, error };
};


