import {
  createRouter,
  createRootRoute,
  createRoute,
  Outlet,
} from "@tanstack/react-router";
import Layout from "./components/Layout";
import { lazy } from "react";

// Lazy load pages for better performance
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Drivers = lazy(() => import("./pages/Drivers"));
const Constructors = lazy(() => import("./pages/Constructors"));
const Races = lazy(() => import("./pages/Races"));
const Analytics = lazy(() => import("./pages/Analytics"));

// Only load devtools in development
const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // Return null component in production
    : lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        }))
      );

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
