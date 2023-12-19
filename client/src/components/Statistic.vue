<template>
    <div>
      <button @click="calculateDistance">Calculate Distance</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Statistic',
    methods: {
      calculateDistance() {
        const geocoder = new google.maps.Geocoder();
  
        // Replace with actual addresses
        const origin = 'Thái Nguyên';
        const destination = 'Hà Tĩnh';
  
        geocoder.geocode({ address: origin }, (results, status) => {
          if (status === 'OK' && results[0].geometry.location) {
            const originLatLng = results[0].geometry.location;
  
            geocoder.geocode({ address: destination }, (results, status) => {
              if (status === 'OK' && results[0].geometry.location) {
                const destinationLatLng = results[0].geometry.location;
  
                const distance = google.maps.geometry.spherical.computeDistanceBetween(
                  originLatLng,
                  destinationLatLng
                );
  
                console.log('Distance:', distance);
              } else {
                console.error('Error geocoding destination:', status);
              }
            });
          } else {
            console.error('Error geocoding origin:', status);
          }
        });
      },
    },
  };
  </script>