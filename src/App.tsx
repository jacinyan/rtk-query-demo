import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./pages/login";
import TheLayout from "src/layout/TheLayout";

function App() {
  const sessionId = localStorage.getItem("__TMDB_SESSION__");

  return (
    <Switch>
      <Route exact path={"/login"} render={() => <Login />} />
      <Route
        path="/"
        render={() => {
          if (!sessionId) {
            return <Redirect to="/login" />;
          } else {
            return <TheLayout />;
          }
        }}
      />
    </Switch>
  );
}

export default App;
