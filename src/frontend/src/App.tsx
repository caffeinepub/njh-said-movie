import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import MovieDetailPage from "./pages/MovieDetailPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

const rootRoute = createRootRoute({
  component: () => (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.108 0.012 252)" }}
    >
      <Header />
      <div className="pt-16">
        <Outlet />
      </div>
      <Footer />
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const movieDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/movie/$id",
  component: MovieDetailPage,
});

const routeTree = rootRoute.addChildren([indexRoute, movieDetailRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
