import ReactDOM from "react-dom/client"
import App from "./App"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { LoggedUserContextProvider } from "./context/LoggedUserContext"
import { LoginFormContextProvider } from "./context/LoginFormContext"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <LoggedUserContextProvider>
      <LoginFormContextProvider>
        <App />
      </LoginFormContextProvider>
    </LoggedUserContextProvider>
  </QueryClientProvider>
)
