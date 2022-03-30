import React from "react";
import ReactDOM from "react-dom";
import "./App.scss";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContext";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

library.add(faChevronUp);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 2, // 2 minutes
      cacheTime: 1000 * 60 * 60 * 4, // 4 hours
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
