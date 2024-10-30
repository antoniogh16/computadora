import { useEffect, useState } from 'react';
import { sendRequest } from '../../functions';
import { Pie, Bar, getDatasetAtEvent } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Graphic = () => {
  const [info, setInfo] = useState([]);
  const [colors, setColors] = useState([]);
  let charOptions = { responsive: true };

  useEffect(() => {
    getData();
  }, []);

  const random = () => {
    return Math.floor(Math.random() * 256);
  };

  const getData = async () => {
    const res = await sendRequest('GET', '', '/api/equiposbymarca', '');
    setInfo(res);
    const generatedColors = res.map(() => `rgb(${random()},${random()},${random()})`); 
    setColors(generatedColors);
  };

  const charData = {
    labels: info.map(g => g.name), 
    datasets: [{
      label: 'Equipos', 
      data: info.map(g => g.count), 
      backgroundColor: colors,
    }],
  };

  return (
    <div className='container-fluid'>
      <div className='row mt-5'>
        <div className='col-md-6 offset-md-3'>
          <Pie options={charOptions} data={charData} />
        </div>
      </div>
    </div>
  );
};

export default Graphic;
