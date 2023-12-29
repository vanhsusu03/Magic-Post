<template>
    <Bar id="my-chart-id" :data="chartData" :options="chartOptions" />
</template>
  
<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
export default {
    name: 'BarChart',
    components: { Bar },
    data() {
        return {
            chartData: {
                labels: ['January', 'February', 'March'],
                datasets: [{ data: [40, 20, 12] }]
            },
            chartOptions: {
                responsive: true
            }
        }
    },
//     props: {
//         chartData: {
//             // type: Object,
//             // required: true
//             labels: ['January', 'February', 'March', 'April', 'May'],
//             datasets: [
//                 {
//                     label: 'Monthly Sales',
//                     backgroundColor: '#f87979',
//                     data: [65, 59, 80, 81, 56]
//                 }
//             ]
//         },
//         chartOptions: {
//             // type: Object,
//             // default: () => {}

//         }
//     }
 }
</script>