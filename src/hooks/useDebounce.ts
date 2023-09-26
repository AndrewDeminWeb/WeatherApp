import { useEffect, useRef, useState } from "react";

function useDebounce(initialState: string, t: number) {
	const [debounce, setDebounce] = useState(initialState);
	const mountValue = useRef(false);

	useEffect(() => {
		let timer: NodeJS.Timeout;

		if (mountValue.current) {
			if (!initialState) {
				setDebounce("Москва");
				return;
			}

			timer = setTimeout(() => {
				setDebounce(initialState);
			}, t);
		}

		return () => {
			mountValue.current = true;
			clearTimeout(timer);
		};
	}, [initialState, t]);

	return debounce;
}

export { useDebounce };
