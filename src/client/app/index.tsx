/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const __webpack_nonce__ = (document.querySelector('script[nonce]') as HTMLScriptElement | null)?.nonce;
(window as any).__webpack_nonce__ = __webpack_nonce__;
(window as any).__plotly_nonce__ = __webpack_nonce__;

declare global {
	interface Window {
		__webpack_nonce__?: string;
		__plotly_nonce__?: string;
	}
}


const originalAppendChild = document.head.appendChild;
document.head.appendChild = function (node: any) {
	if (
		node instanceof HTMLStyleElement
	) {
		console.log('Appending style, has nonce:', __webpack_nonce__);
		node.setAttribute('nonce', __webpack_nonce__ || '');
	}

	try {
		return originalAppendChild.call(this, node);
	} catch (err) {
		console.error('Failed to append style:', err);
		throw err;
	}
};

store.dispatch(initApp());

// Renders the entire application, starting with RouteComponent, into the root div
const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
	//  Provides the Redux store to all child components
	<CacheProvider value={emotionCache}>
		<Provider store={store} stabilityCheck="always">
			<RouteComponent />
		</Provider>
	</CacheProvider>
);
