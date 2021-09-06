import loadable from "@loadable/component";

const Home = loadable(
  () => import(/* webpackPrefetch: true */ "src/pages/views/home")
);
const WishList = loadable(
  () => import(/* webpackPrefetch: true */ "src/pages/views/wishlist")
);

const NotFound = loadable(
  () => import(/* webpackPrefetch: true */ "src/pages/views/404")
);

const routes = [
  { path: "/", exact: true, component: Home },
  { path: "/wishlist", exact: true, component: WishList },
  { path: "/404", component: NotFound },
];

export default routes;
