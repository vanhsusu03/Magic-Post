<template>
    <div id="container">
      <div class="md:max-w-5xl sm:max-w-3xl max-w-2xl mx-auto">
        <div class="py-2 grid gird-cols-9">
          <span class="col-start-1 col-end-5 py-2">
            <h1 class="inline-flex font-semibold lg:text-xl md:text-lg sm:text-base text-sm">
              Thống kê - Điểm tập kết số {{ this.manager_WH.warehouseId }}
            </h1>
          </span>
          <span class="col-start-1 col-end-5 py-2">
            <h5 class="inline-flex font-semibold lg:text-lg md:text-lg sm:text-base text-sm" v-if="WHmanager && WHmanager.length > 0">
              <strong>{{
                        WHmanager[0].warehouse.province_municipality.provinceMunicipality }}</strong> 
            </h5>
          </span>
        </div>
  
        <hr class="my-2 mx-auto">
        <div class="" id="course">
          <chart-component id="my-data-table" :chartData="chartData" :chartOptions="chartOptions" />
          <table id="my-data-table my-6" class="mx-auto">
            <caption><strong>Thống kê các đơn hàng năm 2023</strong></caption>
            <thead>
              <tr>
                
                <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">Số đơn
                    nhận từ  điểm tập kết đích</th>
                <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">Số đơn
                    nhận từ điểm giao dịch</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="py-2 px-4 border text-center items-center justify-center md:text-base sm:text-sm text-xs">{{
                  comingPkgs.length }}</td>
                <td class="py-2 px-4 border text-center items-center justify-center md:text-base sm:text-sm text-xs">{{
                  sentPkgs.length }}</td>
              </tr>
            </tbody>
          </table>
  
          <table class="mx-auto my-6">
            <caption><strong>Thống kê các đơn hàng nhận từ điểm giao dịch</strong></caption>
            <thead>
              <tr>
                <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">Người
                  gửi</th>
                <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">Địa
                  chỉ người gửi</th>
                <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">Người
                  nhận</th>
                <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">Địa
                  chỉ người nhận</th>
                <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">Phí
                  vận chuyển</th>
                <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">Thời
                  gian</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="sentPkg in this.sentPkgs">
                <td class="py-2 px-4 border text-center items-center justify-center md:text-base sm:text-sm text-xs">{{
                  sentPkg.sender_name }}</td>
                <td class="py-2 px-4 border text-center items-center justify-center md:text-base sm:text-sm text-xs">{{
                  sentPkg.sender_address }}</td>
                <td class="py-2 px-4 border text-center items-center justify-center md:text-base sm:text-sm text-xs">{{
                  sentPkg.receiver_name }}</td>
                <td class="py-2 px-4 border text-center items-center justify-center md:text-base sm:text-sm text-xs">{{
                  sentPkg.receiver_address }}</td>
                <td class="py-2 px-4 border text-center items-center justify-center md:text-base sm:text-sm text-xs">{{
                  sentPkg.COD_amount }}</td>
                <td class="py-2 px-4 border text-center items-center justify-center md:text-base sm:text-sm text-xs">{{
                  format(sentPkg.status_details.time) }}</td>
  
              </tr>
            </tbody>
          </table>
  
          <table class="mx-auto my-6">
            <caption><strong>Thống kê các đơn hàng nhận từ điểm tập kết</strong></caption>
            <thead>
              <tr>
                <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">Người
                  gửi</th>
                <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">Địa
                  chỉ người gửi</th>
                <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">Người
                  nhận</th>
                <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">Địa
                  chỉ người nhận</th>
                <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">Phí
                  vận chuyển</th>
                <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">Thời
                  gian</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="comingPkg in this.comingPkgs">
                <td class="py-2 px-4 border text-center items-center justify-center md:text-base sm:text-sm text-xs">{{
                  comingPkg.sender_name }}</td>
                <td class="py-2 px-4 border text-center items-center justify-center md:text-base sm:text-sm text-xs">{{
                  comingPkg.sender_address }}</td>
                <td class="py-2 px-4 border text-center items-center justify-center md:text-base sm:text-sm text-xs">{{
                  comingPkg.receiver_name }}</td>
                <td class="py-2 px-4 border text-center items-center justify-center md:text-base sm:text-sm text-xs">{{
                  comingPkg.receiver_address }}</td>
                <td class="py-2 px-4 border text-center items-center justify-center md:text-base sm:text-sm text-xs">{{
                  comingPkg.COD_amount }}</td>
                <td class="py-2 px-4 border text-center items-center justify-center md:text-base sm:text-sm text-xs">{{
                  format(comingPkg.status_details.time) }}</td>
  
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapMutations, mapState } from 'vuex';
  import axios from 'axios';
  import Alert from './Alert.vue'
  import Chart from './Chart.vue'
  export default {
    name: 'SuccessfullyDelivery',
    data() {
      return {
        deliveryCenter: [],
        itemsPerPage: 4,
        currentPage: 1,
        warehouseStaff: [],
        successPkgs: [],//hàng đến
        failPkg: [],//hàng đi
        comingPkgs: [],
        sentPkgs: [],
        chartData: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [
            {
              label: 'My First Dataset',
              borderColor: 'rgb(75, 192, 192)',
              data: [65, 59, 80, 81, 56, 55, 40, 43, 33, 12, 75, 45],
            },
          ],
        },
        chartOptions: {
          // Your chart options go here
        },
        WHmanager: [],
      }
    },
    components: {
      Alert,
      Chart
  
    },
    methods: {
      ...mapMutations(['scrollToTop', 'setLogged', 'setLeadership', 'setLeadershipAccessToken',
        'setLeadershipRefreshToken', 'setManagerDC', 'setDCManagerAccessToken', 'setDCManagerRefreshToken',
        'setManagerWH', 'setWHManagerAccessToken', 'setWHManagerRefreshToken', 'setTellerDC', 'setTellerDCAccessToken',
        'setTellerDCRefreshToken', 'setStaffWH', 'setStaffWHAccessToken', 'setStaffWHRefreshToken']),
      async getWarehouseStaff() {
        try {
          let res = await axios.get(`/offices/${this.manager_WH.warehouseId}/accounts/${this.manager_WH.accountTypeId}`, {
            headers: { "Authorization": `Bearer ${this.managerWHToken.accessToken}` }
          }, { withCredentials: true });
          if (res.data) {
            this.warehouseStaff = res.data;
          }
        } catch (err) {
          if (err.response.data.error == 'jwt expired') {
            await this.refreshToken();
            await this.getWarehouseStaff();
          } else { alert(err.response.data.error); }
        }
      },
      async getManager() {
            try {
                let res = await axios.get(`/offices/${this.manager_WH.warehouseId}/accounts/${this.manager_WH.accountTypeId}`, {
                    headers: { "Authorization": `Bearer ${this.managerWHToken.accessToken}` }
                }, { withCredentials: true });
                this.WHmanager = res.data;
            } catch (err) {
                if (err.response.data.error == 'jwt expired') {
                    await this.refreshToken();
                    await this.getManager();
                }
                console.log(err.response.data.error);
            }
        },
      
      async getStatisticComing() {
        try {
          let res = await axios.get(`/statistic/8/packages`, {
            params: {
              warehouseId: this.manager_WH.warehouseId
            },
            headers: { "Authorization": `Bearer ${this.managerWHToken.accessToken}` },
            withCredentials: true
          });
          if (res.data) {
            this.comingPkgs = res.data;
            // alert(this.comingPkgs)
          }
  
        } catch (err) {
          if (err.response.data.error == 'jwt expired') {
            await this.refreshToken();
            await this.getStatisticComing();
          }
          else { alert(err.response.data.error); }
        }
      },

      
      async getStatisticSending() {
        try {
          let res = await axios.get(`/statistic/2/packages`, {
            params: {
              warehouseId: this.manager_WH.warehouseId
            },
            headers: { "Authorization": `Bearer ${this.managerWHToken.accessToken}` },
            withCredentials: true
          });
          if (res.data) {
            this.sentPkgs = res.data;
          }
  
        } catch (err) {
          if (err.response.data.error == 'jwt expired') {
            await this.refreshToken();
            await this.getStatisticComing();
          }
          else { alert(err.response.data.error); }
        }
      },
  
  
      async refreshToken() {
        let res = await axios.post('/refresh', {
          refreshToken: this.staffWHToken.refreshToken,
          withCredentials: true
        }, {
          headers:
          {
            'x_authorization': `${this.staffWHToken.accessToken}`,
          }, withCredentials: true
        });
  
        this.setStaffWHAccessToken(res.data);
      },
      format(string) {
            var viTriChuT = string.indexOf("T");
  
        if (viTriChuT !== -1) {
            var chuoiDaCat = string.slice(0, viTriChuT);
        }
        return chuoiDaCat;
      },
      goToPage(page) {
        if (page >= 1 && page <= this.totalPages) {
          this.currentPage = page;
        }
        this.scrollToTop();
      },
      truncateText(text, maxLength) {
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
      },
    },
  
    computed: {
      ...mapState(['isLogin', 'leadership', 'leadershipToken', 'manager_DC', 'managerDCToken', 'manager_WH', 'managerWHToken', 'staff_WH',
        'staffWHToken', 'teller_DC', 'tellerDCToken']),
      totalPages() {
        // if (this.createNew == true) {
        return Math.ceil(this.readyToSendPkgs.length / this.itemsPerPage);
        // } else {
        //     return Math.ceil(this.sendingPkgs.length / this.itemsPerPage);
        // }
      },
      displayedItemList() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        // if (this.createNew == true) {
        return this.readyToSendPkgs.slice(startIndex, endIndex);
        // } else {
        //     return this.sendingPkgs.slice(startIndex, endIndex);
        // }
      },
    },
    created() {
      this.getWarehouseStaff();
    
      // this.fetchReadySendingPkgsData();
      // this.fetchSendingPackagesData();
      this.getStatisticComing()
      this.getStatisticSending()
    }
  }
  </script>
  
  <style>.bg-custom-color {
    background-color: rgb(255, 0, 0);
    /* Replace with your custom RGB color */
  }</style>