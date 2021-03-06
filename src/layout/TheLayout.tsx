import { Box, Container } from "@chakra-ui/react";

import { Route, Switch, Redirect } from "react-router-dom";
import routes from "src/config/routes";

import TheFooter from "./TheFooter";
import TheHeader from "./TheHeader";
import TheSidebar from "./TheSidebar";

const TheLayout = () => {
  return (
    <>
      <TheSidebar />
      <TheHeader />
      <Box as={"main"} minH={"80vh"}>
        <Container maxW={"1280px"}>
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
