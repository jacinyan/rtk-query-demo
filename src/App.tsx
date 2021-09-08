import { Route, Switch, Redirect } from "react-router-dom";
import Auth from "./pages/auth";
import TheLayout from "src/layout/TheLayout";
import { useSelector } from "react-redux";
import { selectSessionId } from "./pages/auth/authSlice";

function App() {
  const sessionId = useSelector(selectSessionId);

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
