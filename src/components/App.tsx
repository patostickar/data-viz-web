import {Settings} from "./Settings.tsx";
import {MetricsDashboard} from "./metrics/MetricsDashboard.tsx";
import {Dashboard} from "./Dashboard.tsx";

export const App = () => {
  return (
    <>
      <Settings/>
      <MetricsDashboard/>
      <Dashboard/>
    </>
  )
}
