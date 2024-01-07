<template>
    <div id="container">
        <div class="md:max-w-5xl sm:max-w-3xl max-w-xl w-11/12 mx-auto">
            <div class="py-2 grid gird-cols-9">
                <span class="col-start-1 col-end-5 py-2">
                    <h1 class="inline-flex font-semibold lg:text-xl md:text-lg sm:text-base text-sm">
                        Thống kê - Lãnh đạo công ty Magic Post
                    </h1>
                </span>
                <span class="col-start-1 col-end-5 py-2">
                    <h5 class="inline-flex font-semibold lg:text-lg md:text-lg sm:text-base text-sm">
                        <strong>Địa chỉ:</strong> Tổng công ty Magic Post
                    </h5>
                </span>
            </div>

            <hr class="my-2 mx-auto">
            <div class="mx-auto mt-4" id="course">
                <div class="col-start-1 col-end-5 py-2">
                    <h3 class=" inline-flex font-semibold lg:text-lg md:text-lg sm:text-base text-sm">
                        Thống kê trên TOÀN QUỐC
                    </h3>
                </div>
                <table class="w-full">
                    <tr>
                        <th
                            class="bg-green-500 text-white font-bold py-2 px-4 text-center items-center md:text-base sm:text-sm text-xs border">
                            Số đơn hàng đã gửi toàn quốc</th>
                        <th
                            class="bg-green-500 text-white font-bold py-2 px-4 text-center items-center md:text-base sm:text-sm text-xs border">
                            Số đơn hàng đã nhận toàn quốc</th>
                        <th
                            class="bg-green-500 text-white font-bold py-2 px-4 text-center items-center md:text-base sm:text-sm text-xs border">
                            Số đơn hàng đã gửi tại các điểm GD</th>
                        <th
                            class="bg-green-500 text-white font-bold py-2 px-4 text-center items-center md:text-base sm:text-sm text-xs border">
                            Số đơn hàng đã nhận tại các điểm GD</th>
                        <th
                            class="bg-green-500 text-white font-bold py-2 px-4 text-center items-center md:text-base sm:text-sm text-xs border">
                            Số đơn hàng đã gửi tại các điểm tập kết</th>
                        <th
                            class="bg-green-500 text-white font-bold py-2 px-4 text-center items-center md:text-base sm:text-sm text-xs border">
                            Số đơn hàng đã nhận tại các điểm tập kết</th>
                    </tr>
                    <tr>
                        <td class="py-2 px-4 border text-center items-center md:text-base sm:text-sm text-xs border">
                            {{this.getSumPkg(this.sentDCpkgs)+ this.getSumPkg(this.sentWHpkgs) }}</td>
                        <td class="py-2 px-4 border text-center items-center md:text-base sm:text-sm text-xs border">
                            {{ this.getSumPkg(this.rcvDCPkgs) + this.getSumPkg(this.rcvWHPkgs) }}
                        </td>
                        <td class="py-2 px-4 border text-center items-center md:text-base sm:text-sm text-xs border">
                            {{ this.getSumPkg(this.sentDCpkgs) }}
                        </td>
                        <td
                            class="py-2 px-4 border text-center items-center truncate md:text-base sm:text-sm text-xs border">
                            {{ this.getSumPkg(this.rcvDCPkgs)}}</td>
                        <td
                            class="py-2 px-4 border text-center items-center truncate md:text-base sm:text-sm text-xs border">
                            {{this.getSumPkg(this.sentWHpkgs) }}</td>
                        <td
                            class="py-2 px-4 border text-center items-center truncate md:text-base sm:text-sm text-xs border">
                            {{ this.getSumPkg(this.rcvWHPkgs)}}</td>
                    </tr>

                </table>
            </div>
            <br>
            <div class="mx-auto mt-4" id="course">
                <div class="col-start-1 col-end-5 py-2">
                    <h3 class=" inline-flex font-semibold lg:text-lg md:text-lg sm:text-base text-sm">
                        Thống kê trên các ĐIỂM GIAO DỊCH.
                    </h3>
                </div>
                <table class="w-full">
                    <tr>
                        <th
                            class="bg-green-500 text-white font-bold py-2 px-4 text-center items-center md:text-base sm:text-sm text-xs border">
                            Mã điểm giao dịch</th>
                        <th
                            class="bg-green-500 text-white font-bold py-2 px-4 text-center items-center md:text-base sm:text-sm text-xs border">
                            Địa chỉ</th>
                        <th
                            class="bg-green-500 text-white font-bold py-2 px-4 text-center items-center md:text-base sm:text-sm text-xs border">
                            Số đơn hàng đã gửi</th>
                    </tr>
                    <tr v-for="sentPkgs in displayedItemListDCSent">
                        <td class="py-2 px-4 border text-center items-center md:text-base sm:text-sm text-xs border">
                            {{ sentPkgs.code }}</td>
                        <td class="py-2 px-4 border text-center items-center md:text-base sm:text-sm text-xs border">
                            {{ sentPkgs.address }}
                        </td>
                        <td class="py-2 px-4 border text-center items-center md:text-base sm:text-sm text-xs border">
                            {{ sentPkgs.num }}
                        </td>
                    </tr>

                </table>
                <div class="my-4">
                    <div class="max-w-fit mx-auto">
                        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded 
                        cursor-pointer shadow-lg md:text-base sm:text-sm text-xs"
                            @click="goToPageDCSent(currentPageDCSent - 1, totalPagesDCSent)"
                            :disabled="currentPageDCSent === 1">Trang
                            trước</button>
                        <span class="pl-10 pr-10 md:text-base sm:text-sm text-xs">Trang <strong>{{ currentPageDCSent
                        }}</strong> trong tổng số <strong>{{ totalPagesDCSent }}</strong></span>
                        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded 
                        cursor-pointer shadow-lg md:text-base sm:text-sm text-xs"
                            @click="goToPageDCSent(currentPageDCSent + 1, totalPagesDCSent)"
                            :disabled="currentPageDCSent === totalPagesDCSent">Trang sau</button>
                    </div>
                </div>
                <br>
                <table class="w-full">
                    <tr>
                        <th
                            class="bg-green-500 text-white font-bold py-2 px-4 text-center items-center md:text-base sm:text-sm text-xs border">
                            Mã điểm giao dịch</th>
                        <th
                            class="bg-green-500 text-white font-bold py-2 px-4 text-center items-center md:text-base sm:text-sm text-xs border">
                            Địa chỉ</th>
                        <th
                            class="bg-green-500 text-white font-bold py-2 px-4 text-center items-center md:text-base sm:text-sm text-xs border">
                            Số đơn hàng đã nhận</th>
                    </tr>
                    <tr v-for="sentPkgs in displayedItemListDCRcv">
                        <td class="py-2 px-4 border text-center items-center md:text-base sm:text-sm text-xs border">
                            {{ sentPkgs.code }}</td>
                        <td class="py-2 px-4 border text-center items-center md:text-base sm:text-sm text-xs border">
                            {{ sentPkgs.address }}
                        </td>
                        <td class="py-2 px-4 border text-center items-center md:text-base sm:text-sm text-xs border">
                            {{ sentPkgs.num }}
                        </td>
                    </tr>

                </table>
                <div class="my-4">
                    <div class="max-w-fit mx-auto">
                        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded 
                        cursor-pointer shadow-lg md:text-base sm:text-sm text-xs"
                            @click="goToPageDCRcv(currentPageDCRcv - 1, totalPagesDCRcv)"
                            :disabled="currentPageDCRcv === 1">Trang
                            trước</button>
                        <span class="pl-10 pr-10 md:text-base sm:text-sm text-xs">Trang <strong>{{ currentPageDCRcv
                        }}</strong> trong tổng số <strong>{{ totalPagesDCRcv }}</strong></span>
                        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded 
                        cursor-pointer shadow-lg md:text-base sm:text-sm text-xs"
                            @click="goToPageDCRcv(currentPageDCRcv + 1, totalPagesDCRcv)"
                            :disabled="currentPageDCRcv === totalPagesDCRcv">Trang sau</button>
                    </div>
                </div>
            </div>
            <br>
            <div class="mx-auto mt-4" id="course">
                <div class="col-start-1 col-end-5 py-2">
                    <h3 class=" inline-flex font-semibold lg:text-lg md:text-lg sm:text-base text-sm">
                        Thống kê trên các ĐIỂM TẬP KẾT.
                    </h3>
                </div>
                <table class="w-full">
                    <tr>
                        <th
                            class="bg-green-500 text-white font-bold py-2 px-4 text-center items-center md:text-base sm:text-sm text-xs border">
                            Mã điểm tập kết</th>
                        <th
                            class="bg-green-500 text-white font-bold py-2 px-4 text-center items-center md:text-base sm:text-sm text-xs border">
                            Địa chỉ</th>
                        <th
                            class="bg-green-500 text-white font-bold py-2 px-4 text-center items-center md:text-base sm:text-sm text-xs border">
                            Số đơn hàng đã gửi</th>
                    </tr>
                    <tr v-for="sentPkgs in displayedItemListWHSent">
                        <td class="py-2 px-4 border text-center items-center md:text-base sm:text-sm text-xs border">
                            {{ sentPkgs.code }}</td>
                        <td class="py-2 px-4 border text-center items-center md:text-base sm:text-sm text-xs border">
                            {{ sentPkgs.address }}
                        </td>
                        <td class="py-2 px-4 border text-center items-center md:text-base sm:text-sm text-xs border">
                            {{ sentPkgs.num }}
                        </td>
                    </tr>

                </table>
                <div class="my-4">
                    <div class="max-w-fit mx-auto">
                        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded 
                        cursor-pointer shadow-lg md:text-base sm:text-sm text-xs"
                            @click="goToPageWHSent(currentPageWHSent - 1, totalPagesWHSent)"
                            :disabled="currentPageWHSent === 1">Trang
                            trước</button>
                        <span class="pl-10 pr-10 md:text-base sm:text-sm text-xs">Trang <strong>{{ currentPageWHSent
                        }}</strong> trong tổng số <strong>{{ totalPagesWHSent }}</strong></span>
                        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded 
                        cursor-pointer shadow-lg md:text-base sm:text-sm text-xs"
                            @click="goToPageWHSent(currentPageWHSent + 1, totalPagesWHSent)"
                            :disabled="currentPageWHSent === totalPagesWHSent">Trang sau</button>
                    </div>
                </div>
                <br>
                <table class="w-full">
                    <tr>
                        <th
                            class="bg-green-500 text-white font-bold py-2 px-4 text-center items-center md:text-base sm:text-sm text-xs border">
                            Mã điểm giao dịch</th>
                        <th
                            class="bg-green-500 text-white font-bold py-2 px-4 text-center items-center md:text-base sm:text-sm text-xs border">
                            Địa chỉ</th>
                        <th
                            class="bg-green-500 text-white font-bold py-2 px-4 text-center items-center md:text-base sm:text-sm text-xs border">
                            Số đơn hàng đã nhận</th>
                    </tr>
                    <tr v-for="sentPkgs in displayedItemListWHRcv">
                        <td class="py-2 px-4 border text-center items-center md:text-base sm:text-sm text-xs border">
                            {{ sentPkgs.code }}</td>
                        <td class="py-2 px-4 border text-center items-center md:text-base sm:text-sm text-xs border">
                            {{ sentPkgs.address }}
                        </td>
                        <td class="py-2 px-4 border text-center items-center md:text-base sm:text-sm text-xs border">
                            {{ sentPkgs.num }}
                        </td>
                    </tr>

                </table>
                <div class="my-4">
                    <div class="max-w-fit mx-auto">
                        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded 
                        cursor-pointer shadow-lg md:text-base sm:text-sm text-xs"
                            @click="goToPageWHRcv(currentPageWHRcv - 1, totalPagesWHRcv)"
                            :disabled="currentPageWHRcv === 1">Trang
                            trước</button>
                        <span class="pl-10 pr-10 md:text-base sm:text-sm text-xs">Trang <strong>{{ currentPageWHRcv
                        }}</strong> trong tổng số <strong>{{ totalPagesWHRcv }}</strong></span>
                        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded 
                        cursor-pointer shadow-lg md:text-base sm:text-sm text-xs"
                            @click="goToPageWHRcv(currentPageWHRcv + 1, totalPagesWHRcv)"
                            :disabled="currentPageWHRcv === totalPagesWHRcv">Trang sau</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { mapMutations, mapState } from 'vuex';
import axios from 'axios';
import Alert from './Alert.vue'

export default {
    name: 'LeadershipStatistic',
    data() {
        return {
            deliveryCenter: [],
            itemsPerPage: 4,
            currentPageDCSent: 1,
            currentPageDCRcv: 1,
            currentPageWHSent: 1,
            currentPageWHRcv: 1,
            allDC: [],
            allWH: [],
            tellerDC: [],
            sentDCpkgs: [], // hàng đã gửi từ DC
            sentWHpkgs: [],
            rcvDCPkgs: [],
            rcvWHPkgs: [],

        }
    },
    components: {
        Alert,

    },
    methods: {
        ...mapMutations(['scrollToTop', 'setLogged', 'setLeadership', 'setLeadershipAccessToken',
            'setLeadershipRefreshToken', 'setManagerDC', 'setDCManagerAccessToken', 'setDCManagerRefreshToken',
            'setManagerWH', 'setWHManagerAccessToken', 'setWHManagerRefreshToken', 'setTellerDC', 'setTellerDCAccessToken',
            'setTellerDCRefreshToken', 'setStaffWH', 'setStaffWHAccessToken', 'setStaffWHRefreshToken']),
        getSumPkg(arr) {
            let res = 0;
            for (let i = 0; i < arr.length; i++) {
                res += arr[i].num;
            }
            return res;
        },

        async getAllDC() {
            let res = await axios.get('/deliveryCenters', { withCredentials: true });
            if (res.data) {
                this.allDC = res.data;
                for (let i = 0; i < this.allDC.length; i++) {
                    await this.getSentDeliveryCenters(Number(this.allDC[i].delivery_centers[0].deliveryCenterId), this.allDC[i].district);
                    await this.getReceiveDeliveryCenters(Number(this.allDC[i].delivery_centers[0].deliveryCenterId), this.allDC[i].district)
                }
                this.sentDCpkgs.sort((a, b) => b.num - a.num);
                this.rcvDCPkgs.sort((a, b) => b.num - a.num);
                console.log(this.sentDCpkgs)
            }
        },
        async getAllWH() {
            let res = await axios.get('/warehouses', { withCredentials: true });
            if (res.data) {
                this.allWH = res.data;
                for (let i = 0; i < this.allWH.length; i++) {
                    for (let j = 0; j < this.allWH[i].warehouses.length; j++) {
                        await this.getSentWarehouses(Number(this.allWH[i].warehouses[j].warehouseId), this.allWH[i].provinceMunicipality);
                        await this.getReceiveWarehouses(Number(this.allWH[i].warehouses[j].warehouseId), this.allWH[i].provinceMunicipality);
                    }
                }
                this.sentWHpkgs.sort((a, b) => b.num - a.num);
                this.rcvWHPkgs.sort((a, b) => b.num - a.num);
            }
        },

        async getSentDeliveryCenters(id, adds) {
            try {
                let res = await axios.get(`statistic/deliveryCenters/${id}/2/packages`, {
                    headers: { "Authorization": `Bearer ${this.leadershipToken.accessToken}` },
                    withCredentials: true
                });
                if (res.data) {
                    if (res.data.length == 0) {
                        this.sentDCpkgs = this.sentDCpkgs.concat({ code: id, address: adds, details: null, num: 0 });
                    } else {
                        this.sentDCpkgs = this.sentDCpkgs.concat({ code: id, address: adds, details: res, num: res.data.length });
                    }
                }

            } catch (err) {
                if (err.response.data.error == 'jwt expired') {
                    await this.refreshToken();
                    await this.getSentDeliveryCenters(id, adds);
                }
                else { alert(err.response.data.error); }
            }
        },
        async getReceiveDeliveryCenters(id, adds) {
            try {
                let res = await axios.get(`statistic/deliveryCenters/${id}/7/packages`, {
                    headers: { "Authorization": `Bearer ${this.leadershipToken.accessToken}` },
                    withCredentials: true
                });
                if (res.data) {
                    if (res.data.length == 0) {
                        this.rcvDCPkgs = this.rcvDCPkgs.concat({ code: id, address: adds, details: null, num: 0 });
                    } else {
                        this.rcvDCPkgs = this.rcvDCPkgs.concat({ code: id, address: adds, details: null, num: res.data.length });
                    }
                }

            } catch (err) {
                if (err.response && err.response.data && err.response.data.error == 'jwt expired') {
                    await this.refreshToken();
                    await this.getReceiveDeliveryCenters(id, adds);
                }
                else {
                    console.log(err.response && err.response.data ? err.response.data.error : 'NaN');
                }
            }
        },
        async getSentWarehouses(id, adds) {
            try {
                let res = await axios.get(`/statistic/warehouses/${id}/3/packages`, {
                    headers: { "Authorization": `Bearer ${this.leadershipToken.accessToken}` },
                    withCredentials: true
                });
                if (res.data.length == 0) {
                    this.sentWHpkgs = this.sentWHpkgs.concat({ code: id, address: adds, details: null, num: 0 });

                } else {
                    this.sentWHpkgs = this.sentWHpkgs.concat({ code: id, address: adds, details: null, num: res.data.length });
                }
            } catch (err) {
                if (err.response && err.response.data && err.response.data.error == 'jwt expired') {
                    await this.refreshToken();
                    await this.getSentWarehouses(id, adds);
                }
            }
        },
        async getReceiveWarehouses(id, adds) {
            try {
                let res = await axios.get(`/statistic/warehouses/${id}/5/packages`, {
                    headers: { "Authorization": `Bearer ${this.leadershipToken.accessToken}` },
                    withCredentials: true
                });
                if (res.data.length == 0) {
                    this.rcvWHPkgs = this.rcvWHPkgs.concat({ code: id, address: adds, details: null, num: 0 });
                } else {
                    this.rcvWHPkgs = this.rcvWHPkgs.concat({ code: id, address: adds, details: null, num: res.data.length });
                }

            } catch (err) {
                if (err.response && err.response.data && err.response.data.error == 'jwt expired') {
                    await this.refreshToken();
                    await this.getReceiveWarehouses(id, adds);
                }
            }
        },
        async refreshToken() {
            let res = await axios.post('/refresh', {
                refreshToken: this.leadershipToken.refreshToken,
                withCredentials: true
            }, {
                headers:
                {
                    'x_authorization': `${this.leadershipToken.accessToken}`,
                }, withCredentials: true
            });

            this.setLeadershipAccessToken(res.data);
        },
        goToPageDCSent(page, total) {
            if (page >= 1 && page <= total) {
                this.currentPageDCSent = page;
            }
            // this.scrollToTop();
        },
        goToPageDCRcv(page, total) {
            if (page >= 1 && page <= total) {
                this.currentPageDCRcv = page;
            }
            // this.scrollToTop();
        },
        goToPageWHSent(page, total) {
            if (page >= 1 && page <= total) {
                this.currentPageWHSent = page;
            }
            // this.scrollToTop();
        },
        goToPageWHRcv(page, total) {
            if (page >= 1 && page <= total) {
                this.currentPageWHRcv = page;
            }
            // this.scrollToTop();
        },
        truncateText(text, maxLength) {
            return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
        },
    },

    computed: {
        ...mapState(['isLogin', 'leadership', 'leadershipToken', 'manager_DC', 'manager_WH', 'staff_WH',
            'staffWHToken', 'teller_DC', 'tellerDCToken']),
        totalPagesDCSent() {
            // if (this.createNew == true) {
            return Math.ceil(this.sentDCpkgs.length / this.itemsPerPage);
            // } else {
            //     return Math.ceil(this.sendingPkgs.length / this.itemsPerPage);
            // }
        },
        totalPagesDCRcv() {
            // if (this.createNew == true) {
            return Math.ceil(this.rcvDCPkgs.length / this.itemsPerPage);
            // } else {
            //     return Math.ceil(this.sendingPkgs.length / this.itemsPerPage);
            // }
        },
        totalPagesWHSent() {
            // if (this.createNew == true) {
            return Math.ceil(this.sentWHpkgs.length / this.itemsPerPage);
            // } else {
            //     return Math.ceil(this.sendingPkgs.length / this.itemsPerPage);
            // }
        },
        totalPagesWHRcv() {
            // if (this.createNew == true) {
            return Math.ceil(this.rcvWHPkgs.length / this.itemsPerPage);
            // } else {
            //     return Math.ceil(this.sendingPkgs.length / this.itemsPerPage);
            // }
        },
        displayedItemListDCSent() {
            const startIndex = (this.currentPageDCSent - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            // if (this.createNew == true) {
            return this.sentDCpkgs.slice(startIndex, endIndex);
            // } else {
            //     return this.sendingPkgs.slice(startIndex, endIndex);
            // }
        },
        displayedItemListDCRcv() {
            const startIndex = (this.currentPageDCRcv - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            // if (this.createNew == true) {
            return this.rcvDCPkgs.slice(startIndex, endIndex);
            // } else {
            //     return this.sendingPkgs.slice(startIndex, endIndex);
            // }
        },
        displayedItemListWHSent() {
            const startIndex = (this.currentPageWHSent - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            // if (this.createNew == true) {
            return this.sentWHpkgs.slice(startIndex, endIndex);
            // } else {
            //     return this.sendingPkgs.slice(startIndex, endIndex);
            // }
        },
        displayedItemListWHRcv() {
            const startIndex = (this.currentPageWHRcv - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            // if (this.createNew == true) {
            return this.rcvWHPkgs.slice(startIndex, endIndex);
            // } else {
            //     return this.sendingPkgs.slice(startIndex, endIndex);
            // }
        },
    },
    created() {
        this.getAllDC();
        this.getAllWH();
        // this.getTellerDC();
        // this.getDeliveryCenterHere();
        // this.fetchReadySendingPkgsData();
        // this.fetchSendingPackagesData();
        // this.getSentDeliveryCenters();
        // this.getStatisticFail();
        // this.getStatisticComing()
        // this.getStatisticSending()
    }
}
</script>
  
<style>
.bg-custom-color {
    background-color: rgb(255, 0, 0);
    /* Replace with your custom RGB color */
}

.letter-spacing {
    letter-spacing: 5px;
    /* Điều chỉnh giá trị này để thay đổi khoảng cách */
}
</style>