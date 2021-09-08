import { Box, Container } from "@chakra-ui/react";

import { Route, Switch, Redirect } from "react-router-dom";
import routes from "src/config/routes";

import TheFooter from "./TheFooter";
import TheHeader from "./TheHeader";

const TheLayout = () => {
  return (
    <>
      <TheHeader />
      <Box as={"main"}>
        <Container maxW={"1553px"}>
          <Switch>
            {routes.map((route, idx) => {
              return (
                route.component && (
                  <Route
                    key={idx}
                    exact={route.exact}
                    path={route.path}
                    render={() => <route.component />}
                  />
                )
              );
            })}
            <Redirect to={"/404"} />
          </Switch>
        </Container>
      </Box>
      <TheFooter />
    </>
  );
};

export default TheLayout;
