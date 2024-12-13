import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Suspense, lazy } from "react";
import Spinner from "./components/Spinner";
import AppToaster from "@/components/AppToaster";

const queryClient = new QueryClient();

const Index = lazy(() => import("./pages/Index"));
const AddVehicle = lazy(() => import("./pages/AddVehicle"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Helmet>
      <title>Vehicle Management Dashboard</title>
      <meta
        name="description"
        content="Manage your vehicles effectively with our advanced system."
      />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="/favicon.ico" />
    </Helmet>
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Helmet>
                  <title>Home - Vehicle Management Dashboard</title>
                </Helmet>
                <Index />
              </>
            }
          />
          <Route
            path="/add"
            element={
              <>
                <Helmet>
                  <title>Add Vehicle - Vehicle Management Dashboard</title>
                </Helmet>
                <AddVehicle />
              </>
            }
          />
          <Route
            path="*"
            element={
              <>
                <Helmet>
                  <title>404 - Page Not Found</title>
                </Helmet>
                <NotFound />
              </>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
    <AppToaster />
  </QueryClientProvider>
);

export default App;
