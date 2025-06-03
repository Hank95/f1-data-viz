import {
  createRouter,
  createRootRoute,
  createRoute,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Drivers from "./pages/Drivers";
import Constructors from "./pages/Constructors";
import Races from "./pages/Races";
import Analytics from "./pages/Analytics";

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
      <TanStackRouterDevtools />
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Dashboard,
});

const driversRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/drivers",
  component: Drivers,
});

const constructorsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/constructors",
  component: Constructors,
});

const racesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/races",
  component: Races,
});

const analyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/analytics",
  component: Analytics,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  driversRoute,
  constructorsRoute,
  racesRoute,
  analyticsRoute,
]);

export const router = createRouter({ routeTree });
