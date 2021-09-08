import loadable from "@loadable/component";

const Home = loadable(
  // @ts-ignore
  () => import(/* webpackPrefetch: true */ "src/pages/views/home")
);
const WatchList = loadable(
  () => import(/* webpackPrefetch: true */ "src/pages/views/watchlist")
);

const NotFound = loadable(
  () => import(/* webpackPrefetch: true */ "src/pages/views/404")
);

const routes = [
  { path: "/", exact: true, component: Home },
  { path: "/watchlist", exact: true, component: WatchList },
  { path: "/404", component: NotFound },
];

export default routes;
