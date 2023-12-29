<!-- ChartComponent.vue -->
<template>
    <div>
        <canvas ref="myChart"></canvas>
    </div>
</template>
  
<script>
import { Line } from 'vue-chartjs';

export default {
    extends: Line,
    props: {
        chartData: {
            type: Object,
            required: true,
        },
        chartOptions: {
            type: Object,
            required: true,
        },
    },
    mounted() {
        this.renderChart(this.chartData, this.chartOptions);
    },
};
</script>
  
<style scoped>
/* Your component styles go here */
</style>
  