import {useSettings} from "../hooks/useSettings.tsx";

export const Settings = () => {
  const {data, loading, error, updateSettings} = useSettings()

  if (loading) return "Loading...";
  if (error) return "Trying to connect to server...";

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Settings</h2>
      <div
        className="chart-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: "2 px",
        }}
      ><p>Num Plots: {data.settings.NumPlotsPerChart}</p>
        <p>Points: {data.settings.NumPoints}</p>
        <p>Poll: {data.settings.PollInterval}</p>
      </div>
    </>
  );
}
