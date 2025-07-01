import * as React from "react";
import {useEffect, useState} from "react";
import {useSettings} from "../hooks/useSettings.tsx";

export const SettingsForm = () => {
  const {settings, loading, error, updateSettings} = useSettings();
  const [numPlots, setNumPlots] = useState<number>(1);
  const [numPoints, setNumPoints] = useState<number>(100);

  useEffect(() => {
    if (settings) {
      setNumPlots(settings.NumPlotsPerChart);
      setNumPoints(settings.NumPoints);
    }
  }, [settings]);

  const handleNumPlotsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = parseInt(event.target.value);
    setNumPlots(newValue);
    updateSettingsOnServer(newValue, numPoints);
  };

  const handlePointsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = parseInt(event.target.value);
    setNumPoints(newValue);
    updateSettingsOnServer(numPlots, newValue);
  };

  const updateSettingsOnServer = (numPlots: number, points: number) => {
    updateSettings({
      NumPlotsPerChart: numPlots,
      NumPoints: points
    }).catch(() => console.error("Failed to update settings"));
  }

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Settings</h2>
      {loading && <div className="text-blue-500">Loading settings...</div>}
      {error && <div className="text-red-500">Error connecting to server: {error.message}</div>}

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <label htmlFor="num-plots-select">Number of plots:</label>
          <select
            id="num-plots-select"
            value={numPlots}
            onChange={handleNumPlotsChange}
            className="border p-1 rounded"
            disabled={loading}
          >
            <option value="1">1</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="100">100</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="points-select">Number of points:</label>
          <select
            id="points-select"
            value={numPoints}
            onChange={handlePointsChange}
            className="border p-1 rounded"
            disabled={loading}
          >
            <option value="10">10</option>
            <option value="100">100</option>
            <option value="1000">1,000</option>
            <option value="10000">10,000</option>
            <option value="100000">100,000</option>
            <option value="1000000">1,000,000</option>
          </select>
        </div>
      </div>
    </>
  );
}
