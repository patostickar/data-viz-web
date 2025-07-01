import { createFileRoute } from '@tanstack/react-router'
import {ChartGrid} from "../features/charts/components/ChartGrid.tsx";

export const Route = createFileRoute('/grpc')({
  component: ChartGrid,
})
