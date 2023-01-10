import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { toyService } from '../services/toy.service.js';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { loadToys } from '../store/actions/toy.action.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export function Dashboard() {

    const toys = useSelector(storeState => storeState.toyModule.toys)
    const [inventoryData, setInventoryData] = useState({
        labels: [],
        datasets: [
            {
                label: ' # of toys in stock',
                data: [],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 255, 83, 0.2)',
                    'rgba(132, 195, 111, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 255, 83, 0.2)',
                    'rgba(132, 195, 111, 0.2)'
                ],
                borderWidth: 1
            }
        ]
    })
    const [priceData, setPriceData] = useState({
        labels: [],
        datasets: [
            {
                label: ' Highest price for category',
                data: [],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 255, 83, 0.2)',
                    'rgba(132, 195, 111, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 255, 83, 0.2)',
                    'rgba(132, 195, 111, 0.2)'
                ],
                borderWidth: 1
            }
        ]
    })

    useEffect(() => {
        toyService.getStock().then(stockMap => {
            for (const label in stockMap) {
                inventoryData.labels.push(label)
                inventoryData.datasets[0].data.push(stockMap[label])
                setInventoryData({ ...inventoryData })
            }
        })

        loadToys(toyService.getDefaultFilter()).then(toys => {
            const priceMap = toys.reduce((acc, toy) => {
                toy.labels.forEach(label => {
                    if (!acc[label]) acc[label] = 0
                    if (toy.price > acc[label]) acc[label] = toy.price
                })
                return acc
            }, {})
            for (const label in priceMap) {
                priceData.labels.push(label)
                priceData.datasets[0].data.push(priceMap[label])
                setPriceData({ ...priceData })
            }
        })
    }, [])

    return (
        <section className="dashboard">
            <section className='dashboard-chart'>
                <h2>Highest price per category</h2>
                {priceData.labels.length && <Doughnut data={priceData} />}
            </section>
            <section className='dashboard-chart'>
                <h2>Toys in stock per category</h2>
                {inventoryData.labels.length && <Doughnut data={inventoryData} />}
            </section>
        </section>
    )
}