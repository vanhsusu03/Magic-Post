<template>
  <div id="container">
    <div class="md:max-w-5xl sm:max-w-3xl max-w-2xl mx-auto">
      <div class="py-2 grid gird-cols-9">
        <span class="col-start-1 col-end-5 py-2">
          <h1 class="inline-flex font-semibold lg:text-xl md:text-lg sm:text-base text-sm">
            Thống kê - Điểm giao dịch số {{ this.deliveryCenter[0] ? this.deliveryCenter[0].deliveryCenterId : 'NaN' }}
          </h1>
        </span>
        <span class="col-start-1 col-end-5 py-2">
          <h5 class="inline-flex font-semibold lg:text-lg md:text-lg sm:text-base text-sm">
            <strong>Địa chỉ: </strong> {{ this.deliveryCenter[0] ? this.deliveryCenter[0].address : 'NaN' }}
          </h5>
        </span>
      </div>

      <hr class="my-2 mx-auto">
      <div class="" id="course">

        <table id="my-data-table my-6" class="mx-auto">
          <caption><strong>Thống kê các đơn hàng năm 2023</strong></caption>
          <thead>
            <tr>
              <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">Số đơn
                gửi thành công</th>
              <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">Số đơn
                gửi thất bạn</th>
              <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">Số đơn
                gửi đến </th>
              <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">Số đơn
                gửi đi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="py-2 px-4 border text-center items-center justify-center md:text-base sm:text-sm text-xs">{{
                this.successPkgs.length }}</td>
              <td class="py-2 px-4 border text-center items-center justify-center md:text-base sm:text-sm text-xs">{{
                failPkg.length }}</td>
              <td class="py-2 px-4 border text-center items-center justify-center md:text-base sm:text-sm text-xs">{{
                comingPkg.length }}</td>
              <td class="py-2 px-4 border text-center items-center justify-center md:text-base sm:text-sm text-xs">{{
                sentPkg.length }}</td>
            </tr>
          </tbody>
        </table>

        <table class="mx-auto my-6">
          <caption><strong>Thống kê các đơn hàng thành công</strong></caption>
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
            <tr v-for="successPkg in this.successPkgs">
              <td class="py-2 px-4 border text-center items-center justify-center md:text-base sm:text-sm text-xs">{{
                successPkg.sender_name }}</td>
              <td class="py-2 px-4 border text-center items-center justify-center md:text-base sm:text-sm text-xs">{{
                successPkg.sender_address }}</td>
              <td class="py-2 px-4 border text-center items-center justify-center md:text-base sm:text-sm text-xs">{{
                successPkg.receiver_name }}</td>
              <td class="py-2 px-4 border text-center items-center justify-center md:text-base sm:text-sm text-xs">{{
                successPkg.receiver_address }}</td>
              <td class="py-2 px-4 border text-center items-center justify-center md:text-base sm:text-sm text-xs">{{
                successPkg.COD_amount }}</td>
              <td class="py-2 px-4 border text-center items-center justify-center md:text-base sm:text-sm text-xs">{{
                format(successPkg.status_details.time) }}</td>

            </tr>
          </tbody>
        </table>

        <table class="mx-auto my-6">
          <caption><strong>Thống kê các đơn hàng thất bại</strong></caption>
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
            <tr v-for="failPk in this.failPkg">
              <td class="py-2 px-4 border text-center items-center justify-center md:text-base sm:text-sm text-xs">{{
                failPk.sender_name }}</td>
              <td class="py-2 px-4 border text-center items-center justify-center md:text-base sm:text-sm text-xs">{{
                failPk.sender_address }}</td>
              <td class="py-2 px-4 border text-center items-center justify-center md:text-base sm:text-sm text-xs">{{
                failPk.receiver_name }}</td>
              <td class="py-2 px-4 border text-center items-center justify-center md:text-base sm:text-sm text-xs">{{
                failPk.receiver_address }}</td>
              <td class="py-2 px-4 border text-center items-center justify-center md:text-base sm:text-sm text-xs">{{
                failPk.COD_amount }}</td>
              <td class="py-2 px-4 border text-center items-center justify-center md:text-base sm:text-sm text-xs">{{
                format(failPk.status_details.time) }}</td>

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
  name: 'DeliveryStatistic',
  data() {
    return {
      deliveryCenter: [],
      itemsPerPage: 4,
      currentPage: 1,
      tellerDC: [],
      successPkgs: [],//hàng đến
      failPkg: [],//hàng đi
      comingPkg: [],
      sentPkg: [],
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
    async getTellerDC() {
      try {
        let res = await axios.get(`/offices/${this.manager_DC.deliveryCenterId}/accounts/${this.manager_DC.accountTypeId}`, {
          headers: { "Authorization": `Bearer ${this.managerDCToken.accessToken}` }
        }, { withCredentials: true });
        if (res.data) {
          this.tellerDC = res.data;
        }
      } catch (err) {
        if (err.response.data.error == 'jwt expired') {
          await this.refreshToken();
          await this.getTellerDC();
        } else { alert(err.response.data.error); }
      }
    },
    async getDeliveryCenterHere() {
      try {
        let res = await axios.get(`/deliveryCentersHere/${this.manager_DC.deliveryCenterId}`, {
          headers: { "Authorization": `Bearer ${this.managerDCToken.accessToken}` }
        }, { withCredentials: true });
        if (res.data) {
          this.deliveryCenter = res.data;
        }
      } catch (err) {
        if (err.response.data.error == 'jwt expired') {
          await this.refreshToken();
          await this.getDeliveryCenterHere();
        } else { alert(err.response.data.error); }
      }
    },
    async getStatisticSuccess() {
      try {
        let res = await axios.get(`/statistic/9/packages`, {
          params: {
            deliveryCenterId: this.manager_DC.deliveryCenterId
          },
          headers: { "Authorization": `Bearer ${this.managerDCToken.accessToken}` },
          withCredentials: true
        });
        if (res.data) {
          this.successPkgs = res.data;
          // alert(typeof this.successPkgs)
        }

      } catch (err) {
        if (err.response.data.error == 'jwt expired') {
          await this.refreshToken();
          await this.getStatisticSuccess();
        }
        else { alert(err.response.data.error); }
      }
    },
    async getStatisticFail() {
      try {
        let res = await axios.get(`/statistic/10/packages`, {
          params: {
            deliveryCenterId: this.manager_DC.deliveryCenterId
          },
          headers: { "Authorization": `Bearer ${this.managerDCToken.accessToken}` },
          withCredentials: true
        });
        if (res.data) {
          this.failPkg = res.data;
          // alert(this.failPkg.length)
        }

      } catch (err) {
        if (err.response.data.error == 'jwt expired') {
          await this.refreshToken();
          await this.getStatisticFail();
        }
        else { alert(err.response.data.error); }
      }
    },
    async getStatisticComing() {
      try {
        let res = await axios.get(`/statistic/8/packages`, {
          params: {
            deliveryCenterId: this.manager_DC.deliveryCenterId
          },
          headers: { "Authorization": `Bearer ${this.managerDCToken.accessToken}` },
          withCredentials: true
        });
        if (res.data) {
          this.comingPkg = res.data;
          // alert(this.comingPkg)
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
            deliveryCenterId: this.manager_DC.deliveryCenterId
          },
          headers: { "Authorization": `Bearer ${this.managerDCToken.accessToken}` },
          withCredentials: true
        });
        if (res.data) {
          this.sentPkg = res.data;
        }

      } catch (err) {
        if (err.response.data.error == 'jwt expired') {
          await this.refreshToken();
          await this.getStatisticSending();
        }
        else { alert(err.response.data.error); }
      }
    },


    async refreshToken() {
      let res = await axios.post('/refresh', {
        refreshToken: this.tellerDCToken.refreshToken,
        withCredentials: true
      }, {
        headers:
        {
          'x_authorization': `${this.tellerDCToken.accessToken}`,
        }, withCredentials: true
      });

      this.setTellerDCAccessToken(res.data);
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
    ...mapState(['isLogin', 'leadership', 'leadershipToken', 'manager_DC', 'managerDCToken', 'manager_WH', 'staff_WH',
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
    this.getTellerDC();
    this.getDeliveryCenterHere();
    // this.fetchReadySendingPkgsData();
    // this.fetchSendingPackagesData();
    this.getStatisticSuccess();
    this.getStatisticFail();
    this.getStatisticComing()
    this.getStatisticSending()
  }
}
</script>

<style>.bg-custom-color {
  background-color: rgb(255, 0, 0);
  /* Replace with your custom RGB color */
}</style>