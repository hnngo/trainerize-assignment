import { render } from "react-dom";
import { Provider } from "react-redux";
import { store } from "./shared/store";

import "./style/styles.scss";
import App from "./components/App";

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
