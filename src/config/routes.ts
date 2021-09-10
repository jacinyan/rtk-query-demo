import loadable from "@loadable/component";

const Home = loadable(
  // @ts-ignore
  () => import(/* webpackPrefetch: true */ "src/features/home")
);
const WatchList = loadable(
  () => import(/* webpackPrefetch: true */ "src/features/watchlist")
);

const NotFound = loadable(
  () => import(/* webpackPrefetch: true */ "src/features/404")
);

const routes = [
  { path: "/", exact: true, component: Home },
  { path: "/watchlist", exact: true, component: WatchList },
  { path: "/404", component: NotFound },
];

export default routes;
