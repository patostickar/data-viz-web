import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "../Dashboard";

export const Route = createFileRoute("/rest")({
  component: Dashboard,
});
