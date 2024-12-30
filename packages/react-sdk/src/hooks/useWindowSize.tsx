/**
 * From: https://github.com/streamich/react-use/tree/master
 */

import {
	useEffect,
	Dispatch,
	SetStateAction,
	useCallback,
	useRef,
	useState,
	EffectCallback,
} from 'react';

const useEffectOnce = (effect: EffectCallback) => {
	useEffect(effect, []);
};

const useUnmount = (fn: () => any): void => {
	const fnRef = useRef(fn);
	// update the ref each render so if it change the newest callback will be invoked
	fnRef.current = fn;
	useEffectOnce(() => () => fnRef.current());
};

function useRafState<S>(
	initialState: S | (() => S),
): [S, Dispatch<SetStateAction<S>>] {
	const frame = useRef(0);
	const [state, setState] = useState(initialState);

	const setRafState = useCallback((value: S | ((prevState: S) => S)) => {
		cancelAnimationFrame(frame.current);

		frame.current = requestAnimationFrame(() => {
			setState(value);
		});
	}, []);

	useUnmount(() => {
		cancelAnimationFrame(frame.current);
	});

	return [state, setRafState];
}

function on<T extends Window | Document | HTMLElement | EventTarget>(
	obj: T | null,
	...args: Parameters<T['addEventListener']> | [string, Function | null, ...any]
): void {
	if (obj && obj.addEventListener) {
		obj.addEventListener(
			...(args as Parameters<HTMLElement['addEventListener']>),
		);
	}
}

function off<T extends Window | Document | HTMLElement | EventTarget>(
	obj: T | null,
	...args:
		| Parameters<T['removeEventListener']>
		| [string, Function | null, ...any]
): void {
	if (obj && obj.removeEventListener) {
		obj.removeEventListener(
			...(args as Parameters<HTMLElement['removeEventListener']>),
		);
	}
}

const isBrowser = typeof window !== 'undefined';

// Define the type for options that can be passed to the hook
interface Options {
	onChange?: (width: number, height: number) => void; // Callback function to execute on window resize (optional)
}

export function useWindowSize({ onChange }: Options = {}) {
	// Use the useRafState hook to maintain the current window size (width and height)
	const [state, setState] = useRafState<{
		width: number | null;
		height: number | null;
	}>({
		height: null,
		width: null,
	});

	useEffect((): (() => void) | void => {
		// Only run the effect on the browser (to avoid issues with SSR)
		if (isBrowser) {
			if (state.width === null || state.height === null) {
				// Update the state with the current window size
				setState({
					width: window.innerWidth,
					height: window.innerHeight,
				});
			}

			const handler = () => {
				const width = window.innerWidth;
				const height = window.innerHeight;

				// Update the state with the new window size
				setState(() => ({
					width,
					height,
				}));

				// If an onChange callback is provided, call it with the new dimensions
				if (onChange) onChange(width, height);
			};

			// Add event listener for the resize event
			on(window, 'resize', handler);

			// Cleanup function to remove the event listener when the component is unmounted (it's for performance optimization)
			return () => {
				off(window, 'resize', handler);
			};
		}
	}, [isBrowser, state.height, state.width]);

	// Return the current window size (width and height)
	return state;
}
