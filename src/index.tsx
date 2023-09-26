import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { App } from "./App";
import { store } from "./store";

const root = createRoot(document.getElementById("root") as HTMLDivElement);

root.render(
	<Provider store={store}>
		<App />
	</Provider>
);

const devMode = process.env.NODE_ENV === "development";

if (devMode && module && module.hot) {
	module.hot.accept();
}
