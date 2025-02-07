import {useData} from "./hooks/useData.tsx";
import Chart from "./Chart.tsx";

export const Dashboard = () => {
    const {data, isLoading} = useData()
    if (isLoading) return "Loading..."

    return (
        <div
            className="chart-grid"
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "16px",
            }}>
            {data!.map((chartData, index) => (
                <div key={chartData.chartId} className="bg-white rounded-lg shadow-lg p-4 mb-6">
                    <h2 className="text-xl font-bold mb-4">{`Chart ${index + 1}`}</h2>
                    <div className="h-64">
                        <Chart data={chartData.data} index={index}/>
                    </div>
                </div>
            ))}
        </div>
    )
}