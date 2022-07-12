import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { BaseProvider } from "baseui";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { theme } from "./theme";
import Routes from "./routes";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import * as serviceWorker from "./serviceWorker";
import "react-spring-modal/dist/index.css";
import "overlayscrollbars/css/OverlayScrollbars.css";
import "components/Scrollbar/scrollbar.css";
import "./theme/global.css";
import UpdateProvider from "context/updateProvider";

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  cache: new InMemoryCache(),
});

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
};
function App() {
  const engine = new Styletron();

  return (
    <ApolloProvider client={client as any}>
      <Provider template={AlertTemplate} {...options}>
        <StyletronProvider value={engine}>
          <BaseProvider theme={theme}>
            <UpdateProvider>
              <BrowserRouter>
                <Routes />
              </BrowserRouter>
            </UpdateProvider>
          </BaseProvider>
        </StyletronProvider>
      </Provider>
    </ApolloProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
