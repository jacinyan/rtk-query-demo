import { Route, Switch, Redirect } from "react-router-dom";
import Auth from "./pages/auth";
import TheLayout from "src/layout/TheLayout";

function App() {
  const sessionId = localStorage.getItem("__TMDB_SESSION__");

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
