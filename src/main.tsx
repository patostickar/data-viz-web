import {createRouter, RouterProvider} from "@tanstack/react-router";
import {createRoot} from "react-dom/client";
import {AppProviders} from "./providers/AppProviders.tsx";
import {routeTree} from "./routeTree.gen.ts";

const router = createRouter({routeTree});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <AppProviders>
        <RouterProvider router={router}/>
    </AppProviders>
  );
}
