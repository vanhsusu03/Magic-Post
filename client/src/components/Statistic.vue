<template>
  <div>
    <!-- <button @click="calculateDistance">Calculate Distance</button> -->
    <BarChart/>
  </div>
</template>
  
<script>
import axios from 'axios';
import BarChart from './BarChart.vue';
export default {
  components: {
    BarChart,
  },
  name: 'Statistic',

  // computed: {
  //   chartData() { return /* mutable chart data */ },
  //   chartOptions() { return /* mutable chart options */ }
  // }
  data() {
    return {
      chartData: {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
          {
            label: 'Monthly Sales',
            backgroundColor: '#f87979',
            data: [65, 59, 80, 81, 56]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },

  methods: {
    // calculateDistance() {
    //   const geocoder = new google.maps.Geocoder();

    //   // Replace with actual addresses
    //   const origin = 'Thái Nguyên';
    //   const destination = 'Hà Tĩnh';

    //   geocoder.geocode({ address: origin }, (results, status) => {
    //     if (status === 'OK' && results[0].geometry.location) {
    //       const originLatLng = results[0].geometry.location;

    //       geocoder.geocode({ address: destination }, (results, status) => {
    //         if (status === 'OK' && results[0].geometry.location) {
    //           const destinationLatLng = results[0].geometry.location;

    //           const distance = google.maps.geometry.spherical.computeDistanceBetween(
    //             originLatLng,
    //             destinationLatLng
    //           );

    //           console.log('Distance:', distance);
    //         } else {
    //           console.error('Error geocoding destination:', status);
    //         }
    //       });
    //     } else {
    //       console.error('Error geocoding origin:', status);
    //     }
    //   });
    // },
    async getPackageStatusById(){
      try {
        let res = await axios.get('/statistic/7/packages', {
          withCredentials: true,
        })
        if (res) {

        }
      } catch (error) {
        
      }
    }
  },
  mounted: {

  }
};
</script>