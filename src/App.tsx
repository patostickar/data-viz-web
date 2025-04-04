import {SettingsForm} from "./features/settings/components/SettingsForm.tsx";
import {MetricsDashboard} from "./features/metrics/components/MetricsDashboard.tsx";
import {ChartGrid} from "./features/charts/components/ChartGrid.tsx";

export const App = () => {
  return (
    <>
      <SettingsForm/>
      <MetricsDashboard/>
      <ChartGrid/>
    </>
  )
}
