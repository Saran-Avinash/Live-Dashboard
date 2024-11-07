import React from 'react'
import {Line} from "react-chartjs-2";
import {Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import { useEffect, useState } from 'react'

ChartJS.register( CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend)

function DashBoard() {

 const [data, setData] = useState(null);

  const options = {};
//   let data = {
//     labels: [
//         '18:19:55',
//         '18:19:58',
//         '18:20:01',
//         '18:20:05',
//         '18:20:08',
//         '18:20:11'
//       ],
//       datasets: [{
//         label: 'Cpu Uitlization (100%)',
//          data: [ '77.47', '64.53', '58.22', '51.01', '47.73', '41.60' ],
//          borderColor: 'red'
//       }]
//   };

  useEffect(() => {
    fetch('/cpuData').then((response) => {
       return response.json();
    }).then(data => {
        // setData(data);
        
        let formatted_data = {labels: [...data.labels],
            datasets: [data.datasets[0]]
        }
        console.log(formatted_data);
        setData(formatted_data);
        // console.log(data.lables);
        // console.log(data.datasets[0]);
        // console.log(data.datasets);
    }).catch(error => console.log(error));
  }, 

[data]);

 
  return (
    <>
        <div className='container'>
            <h1>Real - time data of your PC</h1>
            <div className='chart-container'>
            {data ? (<Line className='line-chart' data={data}/>) : (<p className='loading'>Loading</p>)}
            </div>
        </div>
    </>
  )
}

export default DashBoard
