import {createRoot} from 'react-dom/client'
import Chart from "./Chart.tsx";
import {Dashboard} from "./Dashboard.tsx";

createRoot(document.getElementById('root')!).render(
        <Dashboard/>
)
