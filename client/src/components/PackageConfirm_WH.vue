<template>
    <div id="container">
        <div class="md:max-w-5xl sm:max-w-3xl max-w-xl w-11/12 mx-auto">
            <div class="py-2 grid gird-cols-9">
                <span class="col-start-1 col-end-5 py-2">
                    <h1 class="inline-flex font-semibold lg:text-xl md:text-lg sm:text-base text-sm">
                        Xác nhận đơn hàng từ điểm tập kết
                    </h1>
                </span>
                <span class="col-start-5 col-end-7">
                    <button v-on:click="this.handleSubmit()" class="bg-blue-500 hover:bg-blue-700 hover:shadow-xl text-white font-bold 
                    md:text-base sm:text-sm text-xs py-2 px-4 rounded cursor-pointer hover:shadow-lg btn">
                        Xác nhận
                    </button>
                </span>
                <span class="col-start-7 mx-auto">
                    <button v-on:click="this.resetPkgCheckBox(this.packages)" class="bg-blue-500 hover:bg-blue-700 hover:shadow-xl text-white font-bold 
                    md:text-base sm:text-sm text-xs py-2 px-4 rounded cursor-pointer hover:shadow-lg btn">
                        Hủy chọn
                    </button>
                </span>
            </div>
            <div class="py-2 grid gird-cols-9">
                <h1><strong>Điểm tập kết số:</strong> {{ this.warehouse.warehouseId }}</h1>
                <h1><strong>Địa chỉ:</strong> {{ this.warehouse.address }}</h1>
            </div>
            <hr class="my-2 mx-auto">
            <div class="" id="course">
                <div class="w-full mx-auto" id="course">
                    <table>
                        <tr>
                            <th
                                class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">
                                Mã đơn</th>
                            <th
                                class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">
                                Thông tin người gửi</th>
                            <th
                                class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">
                                Thông tin người nhận</th>
                            <th
                                class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">
                                Mã điểm GD bên gửi</th>
                            <th
                                class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">
                                Mã điểm GD bên nhận</th>
                            <th
                                class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">
                                Ngày giờ gửi</th>
                            <th
                                class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">
                                Trạng thái</th>
                            <th
                                class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">
                                Chọn xác nhận</th>
                        </tr>
                        <tr v-for="packages in displayedItemList" :key="packages.packageId">
                            <td class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs">
                                {{ packages.packageId }}
                            </td>
                            <td
                                class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs truncate">
                                {{ packages.senderName }}
                                <br />
                                {{ packages.senderPhone }}
                            </td>
                            <td
                                class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs truncate">
                                {{ packages.receiverName }}
                                <br />
                                {{ packages.receiverPhone }}
                            </td>
                            <td class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs">
                                {{ packages.deliveryCenterSendId }}
                            </td>
                            <td class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs">
                                {{ packages.deliveryCenterReceiveId }}
                            </td>
                            <td
                                class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs truncate">
                                {{ packages.status_details[0].time }}
                            </td>
                            <td v-if="packages.status_details[0].package_status.packageStatus == 'Accept'"
                                class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs truncate">
                                Đã nhận từ khách hàng
                            </td>
                            <td class="py-2 px-4 border items-center justify-center">
                                <input type="checkbox" v-model="packages.isChecked" class="hidden"
                                    @change="toggleCheckbox(packages)" />
                                <div class="w-6 h-6 border border-gray-400 rounded cursor-pointer flex items-center justify-center transition-all duration-300"
                                    :class="{ 'bg-green-500': packages.isChecked }" @click="toggleCheckbox(packages)">
                                    <svg v-if="packages.isChecked" class="w-4 h-4 text-white" fill="none"
                                        stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                        <path d="M6 12l2 2 6-6"></path>
                                    </svg>
                                </div>
                            </td>
                        </tr>
                    </table>

                    <div class="my-4">
                        <div class="max-w-fit mx-auto">
                            <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded 
                    cursor-pointer shadow-lg md:text-base sm:text-sm text-xs" @click="goToPage(currentPage - 1)"
                                :disabled="currentPage === 1">Previous Page</button>
                            <span class="pl-10 pr-10 md:text-base sm:text-sm text-xs">Trang <strong>{{ currentPage
                            }}</strong>
                                trong tổng số <strong>{{ totalPages
                                }}</strong></span>
                            <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded 
                    cursor-pointer shadow-lg md:text-base sm:text-sm text-xs" @click="goToPage(currentPage + 1)"
                                :disabled="currentPage === totalPages">Next Page</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Alert v-if="this.msg != ''" :message=this.msg class="pr-10" @close="this.resetMsg()" />
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import axios from 'axios';
import Alert from './Alert.vue'
export default {
    name: 'PackageConfirm_WH',
    data() {
        return {
            form: {
                packageIds: '',
                packageCollectionTypeId: 0,
                location: '',
            },
            createPkgCollectionError: {
                packageIdsError: [],
                packageCollectionTypeIdError: [],
            },
            provinceId: 0,
            districtSelectedId: 0,
            deliverycenterSelectedId: 0,
            packages: [], //confirm
            recvPkgs: [],
            provinces: [],
            districts: [],
            warehouse: [],
            deliveryCenters: [], //dùng
            createNew: false,
            itemsPerPage: 4,
            currentPage: 1,
            staffWH: [],
            isChecked: false,
            msg: '',
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
        filteredPackages(arr, id) {
            return arr.filter((packages) => {
                // Check if status_details is an array and has statusId equal to 2 in its last element
                return (
                    Array.isArray(packages.status_details) &&
                    packages.status_details.length > 0 &&
                    packages.status_details[packages.status_details.length - 1].statusId === id
                );
            });
        },
        resetMsg() {
            this.msg = '';
        },
        resetPkgCheckBox(arr) {
            arr.forEach((packages) => {
                packages.isChecked = false;
            });
        },
        toggleCheckbox(pkg) {
            pkg.isChecked = !pkg.isChecked;
            if (pkg.isChecked == true) {
                let packagesArray = this.form.packageIds.split(',');
                if (packagesArray.length >= 10) {
                    this.msg = "Chỉ chọn tối đa 10 đơn hàng!";
                    pkg.isChecked = false;
                }
                else {
                    if (!this.form.packageIds) {
                        this.form.packageIds += pkg.packageId;
                    } else {
                        this.form.packageIds += ',' + pkg.packageId;
                    }
                }
            } else {
                let packagesArray = this.form.packageIds.split(',');

                const indexToDelete = packagesArray.indexOf(pkg.packageId.toString());

                if (indexToDelete !== -1) {
                    packagesArray.splice(indexToDelete, 1);
                }
                this.form.packageIds = packagesArray.join(',');
            }
        },
        rmvDuplicate() {
            // for(var i in this.)
        },
        async getStaffWH() {
            try {
                let res = await axios.get(`/offices/${this.staff_WH.warehouseId}/accounts/${this.staff_WH.accountTypeId}`, {
                    headers: { "Authorization": `Bearer ${this.staffWHToken.accessToken}` }
                }, { withCredentials: true });
                if (res.data) {
                    this.staffWH = res.data;
                    this.provinceId = Number(res.data[0].warehouse.provinceMunicipalityId);
                    this.getWarehouseHere();
                }
            } catch (err) {
                if (err.response && err.response.data && err.response.data.error === 'jwt expired') {
                    await this.refreshToken();
                    await this.getStaffWH();
                } else {
                    // alert(err.response.data.error); 
                }
            }
        },
        async getWarehouseHere() {
            try {
                let res = await axios.get(`/warehouses/${this.provinceId}`, {
                    headers: { "Authorization": `Bearer ${this.staffWHToken.accessToken}` }
                }, { withCredentials: true });
                if (res.data) {
                    this.warehouse = res.data[0];
                }
            } catch (err) {
                if (err.response && err.response.data && err.response.data.error === 'jwt expired') {
                    await this.refreshToken();
                    await this.getWarehouseHere();
                } else {
                    // Handle other errors or log them
                    console.error(err);
                    alert(err.response ? err.response.data.error : 'ddd');
                }
            }
        },
        async fetchSendPackagesData() {
            try {
                let res = await axios.get(`/fetchPkgCol/${this.staff_WH.warehouseId}/fetch`, {
                    params: {
                        typeOffice: "warehouse",
                        statusId: 2
                    },
                    headers: { "Authorization": `Bearer ${this.staffWHToken.accessToken}` },
                    withCredentials: true
                });
                if (res.data) {
                    this.packages = res.data;
                    // alert("HEHHEHEHE")
                    // console.log(this.packages);
                    // this.packages = this.filteredPackages(this.packages, 1);
                }

            } catch (err) {
                if (err.response.data.error == 'jwt expired') {
                    await this.refreshToken();
                    await this.fetchSendPackagesData();
                }
                else {
                    console.log(err.response.data.error)
                    alert(err.response.data.error);
                }
            }
        },
        async fetchReceivingPackagesData() {
            try {
                let res = await axios.get(`/fetchPkgCol/${this.staff_WH.warehouseId}/fetch`, {
                    params: {
                        typeOffice: "warehouse",
                        statusId: 2
                    },
                    headers: { "Authorization": `Bearer ${this.staffWHToken.accessToken}` },
                    withCredentials: true
                });
                if (res.data) {
                    this.recvPkgs = res.data.ans;
                    // this.recvPkgs = this.filteredPackages(this.recvPkgs, 2);
                    console.log(this.recvPkgs)
                }

            } catch (err) {
                if (err.respone &&
                    err.respone.data && err.response.data.error == 'jwt expired') {
                    await this.refreshToken();
                    await this.fetchReceivingPackagesData();
                }
                else if (err.respone &&
                    err.respone.data && err.response.data.error) {
                    alert(err.response.data.error);
                }
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
        // async handleCreatePkgCollection() {
        //     try {
        //         let res = await axios.post('/collections', this.form, {
        //             headers: { "Authorization": `Bearer ${this.staffWHToken.accessToken}` }
        //         }, { withCredentials: true });
        //         if (res.data) {
        //             this.fetchReceivingPackagesData();
        //             this.msg = 'Tạo đơn hàng tới điểm tập kết thành công!';
        //             this.createPackageCollection();
        //         }
        //     } catch (err) {
        //         if (err.response.data.error == 'jwt expired') {
        //             await this.refreshToken();
        //             await this.handleCreatePkgCollection();
        //         } else { alert(err.response.data.error); }
        //     }
        // },
        async getTargetDeliveryCenter() {
            this.deliveryCenters = null;
            if (this.districtSelectedId > 0) {
                try {
                    const res = await axios.get(`/deliveryCenters/${this.districtSelectedId}`, {
                        headers: { "Authorization": `Bearer ${this.staffWHToken.accessToken}` }
                    }, { withCredentials: true });
                    this.deliveryCenters = res.data;
                    this.form.deliveryCenterReceiveId = this.deliveryCenters[0].deliveryCenterId;
                } catch (err) {
                    console.log('getDCfromDistrict: ', err.respone.data.error)
                }
            }

        },
        createPackageCollection() {
            this.resetError();
            this.resetPkgCheckBox(this.packages);
            this.form.packageIds = '';
            this.form.packageCollectionTypeId = 0;
            this.form.location = '';
            this.deliveryCenters = null;
            this.createNew = !this.createNew;
        },
        resetError() {
            for (var i in this.createPkgCollectionError) {
                this.createPkgCollectionError[i] = [];
            }
        },
        checkEmptyError() {
            for (var i in this.createPkgCollectionError) {
                if (this.createPkgCollectionError[i].length != 0) {
                    return false;
                }
            }
            return true;
        },
        validateAndPreSubmitCreatePkgCollection() {
            this.resetError();
            if (!this.form.packageIds) {
                this.createPkgCollectionError.packageIdsError.push('Hãy chọn ít nhất 1 đơn hàng!')
            }
            this.form.packageCollectionTypeId = 1;
            this.form.location = 'Điểm giao dịch số ' + this.deliveryCenter[0].deliveryCenterId +
                ', ' + this.deliveryCenter[0].address;
        },
        async handleSubmit() {

            this.validateAndPreSubmitCreatePkgCollection();

            if (this.checkEmptyError()) {
                this.scrollToTop();
                await this.handleCreatePkgCollection();
            } else {
                this.msg = "Phải chọn ít nhất 1 đơn hàng!"
            }
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
        ...mapState(['isLogin', 'leadership', 'leadershipToken', 'manager_DC', 'manager_WH', 'staff_WH',
            'staffWHToken', 'teller_DC', 'tellerDCToken']),
        totalPages() {
            return Math.ceil(this.recvPkgs.length / this.itemsPerPage);
        },
        displayedItemList() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.recvPkgs.slice(startIndex,endIndex);
        },
    },
    created() {
        this.getStaffWH();
        // this.fetchSendPackagesData();
        this.fetchReceivingPackagesData();
    }
}
</script>

<style>
.bg-custom-color {
    background-color: rgb(255, 0, 0);
    /* Replace with your custom RGB color */
}
</style>