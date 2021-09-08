import { Route, Switch, Redirect } from "react-router-dom";
import Auth from "./pages/auth";
import TheLayout from "src/layout/TheLayout";

import { useAuth } from "./hooks/useAuth";

function App() {
  const sessionId = useAuth();

  return (
    <Switch>
      <Route exact path={"/auth"} render={() => <Auth />} />
      <Route
        path="/"
        render={() => {
          if (!sessionId) {
            return <Redirect to="/auth" />;
          } else {
            return <TheLayout />;
          }
        }}
      />
    </Switch>
  );
}

export default App;
