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
                                Trạng thái</th>
                            <th
                                class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">
                                Chọn xác nhận</th>
                        </tr>
                        <tr v-for="packages in displayedItemList" :key="packages[0].package_collection_id">
                            <td class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs">
                                {{ packages[0].package_collection_id }}
                            </td>
                            <td
                                class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs truncate">
                                {{ packages[0].package_pkg_collections[0].package.sender_name }}
                                <br />
                                {{ packages[0].package_pkg_collections[0].package.sender_phone }}
                            </td>
                            <td
                                class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs truncate">
                                {{ packages[0].package_pkg_collections[0].package.receiver_name }}
                                <br />
                                {{ packages[0].package_pkg_collections[0].package.receiver_phone }}
                            </td>
                            <td class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs">
                                {{ packages[0].package_pkg_collections[0].package.delivery_center_send_id }}
                            </td>
                            <td class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs">
                                {{ packages[0].package_pkg_collections[0].package.delivery_center_receive_id }}
                            </td>
                            <td
                                class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs truncate">
                                Đang chờ xác nhận
                            </td>
                            <td class="py-2 px-4 border items-center justify-center">
                                <input type="checkbox" v-model="packages[0].isChecked" class="hidden"
                                    @change="toggleCheckbox(packages[0])" />
                                <div class="w-6 h-6 border border-gray-400 rounded cursor-pointer flex items-center justify-center transition-all duration-300"
                                    :class="{ 'bg-green-500': packages[0].isChecked }" @click="toggleCheckbox(packages[0])">
                                    <svg v-if="packages[0].isChecked" class="w-4 h-4 text-white" fill="none"
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
    name: 'PackageConfirm_DC',
    data() {
        return {
            form: {
                statusId: 0,
                location: '',
            },
            createPkgCollectionError: {
                packageIdsError: [],
                packageCollectionTypeIdError: [],
            },
            provinceSelectedId: 0,
            districtSelectedId: 0,
            deliverycenterSelectedId: 0,
            packages: [],
            sendingPkgs: [],
            recvPkgs: [],
            provinces: [],
            districts: [],
            deliveryCenter: [],
            deliveryCenters: [], //dùng
            createNew: false,
            itemsPerPage: 4,
            currentPage: 1,
            tellerDC: [],
            isChecked: false,
            msg: '',
            pkgCollectionSelectedId: 0,
        }
    },
    components: {
        Alert,

    },
    methods: {
        ...mapMutations(['scrollToTop', 'setLogged', 'setLeadership', 'setLeadershipAccessToken',
            'setLeadershipRefreshToken', 'setManagerDC', 'setDCManagerAccessToken', 'setDCManagerRefreshToken',
            'setManagerWH', 'setWHManagerAccessToken', 'setWHManagerRefreshToken', 'setTellerDC', 'setTellerDCAccessToken',
            'setTellerDCRefreshToken', 'setStaffWH']),
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
            this.pkgCollectionSelectedId = 0;
        },
        toggleCheckbox(pkg) {
            pkg.isChecked = !pkg.isChecked;
            if (pkg.isChecked == true) {
                if (this.pkgCollectionSelectedId) {
                    this.msg = "Chỉ chọn tối đa 1 đơn!";
                    pkg.isChecked = false;
                } else if (this.pkgCollectionSelectedId == 0) {
                    this.pkgCollectionSelectedId = pkg.package_collection_id;
                }
            }
            else {
                this.pkgCollectionSelectedId = 0;
            }
        },
        rmvDuplicate() {
            // for(var i in this.)
        },
        async getTellerDC() {
            try {
                let res = await axios.get(`/offices/${this.teller_DC.deliveryCenterId}/accounts/${this.teller_DC.accountTypeId}`, {
                    headers: { "Authorization": `Bearer ${this.tellerDCToken.accessToken}` }
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
                let res = await axios.get(`/deliveryCentersHere/${this.teller_DC.deliveryCenterId}`, {
                    headers: { "Authorization": `Bearer ${this.tellerDCToken.accessToken}` }
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
        async fetchSendPackagesData() {
            try {
                let res = await axios.get(`/deliveryCenters/${this.teller_DC.deliveryCenterId}/packages/statuses`, {
                    params: {
                        deliveryCenterType: 'send'
                    },
                    headers: { "Authorization": `Bearer ${this.tellerDCToken.accessToken}` },
                    withCredentials: true
                });
                if (res.data) {
                    this.packages = res.data;
                    this.packages = this.filteredPackages(this.packages, 1);
                }

            } catch (err) {
                if (err.response.data.error == 'jwt expired') {
                    await this.refreshToken();
                    await this.fetchSendPackagesData();
                }
                else { alert(err.response.data.error); }
            }
        },
        async fetchReceivingPackagesData() {
            try {
                let res = await axios.get(`/collections/sendingCollections/${this.teller_DC.deliveryCenterId}`, {
                    params: {
                        typeOffice: "deliveryCenter",
                        pkgCollectionType: 3,
                        statusId: 6
                    },
                    headers: { "Authorization": `Bearer ${this.tellerDCToken.accessToken}` },
                    withCredentials: true
                });
                if (res.data) {
                    this.recvPkgs = res.data;
                    // this.recvPkgs = this.filteredPackages(this.recvPkgs, 2);

                }

            } catch (err) {
                if (err.response.data.error == 'jwt expired') {
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
        async handleConfirmPkgCollection() {
            try {
                let res = await axios.put(`/collections/${this.pkgCollectionSelectedId}/statuses`, this.form, {
                    headers: { "Authorization": `Bearer ${this.tellerDCToken.accessToken}` }
                }, { withCredentials: true });
                if (res.data) {
                    this.msg = 'Xác nhận thành công!'
                    this.fetchReceivingPackagesData();
                    this.createPackageCollection();
                }
            } catch (err) {
                if (err.response.data.error == 'jwt expired') {
                    await this.refreshToken();
                    await this.handleConfirmPkgCollection();
                } else {
                    console.log(err.response.data.error);
                }
            }
        },
        async handleCreatePkgCollection() {
            try {
                let res = await axios.post('/collections', this.form, {
                    headers: { "Authorization": `Bearer ${this.tellerDCToken.accessToken}` }
                }, { withCredentials: true });
                if (res.data) {
                    this.fetchSendingPackagesData();
                    this.msg = 'Tạo đơn hàng tới điểm tập kết thành công!';
                    this.createPackageCollection();
                }
            } catch (err) {
                if (err.response.data.error == 'jwt expired') {
                    await this.refreshToken();
                    await this.handleCreatePkgCollection();
                } else { alert(err.response.data.error); }
            }
        },
        async getTargetDeliveryCenter() {
            this.deliveryCenters = null;
            if (this.districtSelectedId > 0) {
                try {
                    const res = await axios.get(`/deliveryCenters/${this.districtSelectedId}`, {
                        headers: { "Authorization": `Bearer ${this.tellerDCToken.accessToken}` }
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
            this.form.statusId = 0;
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
            this.form.statusId = 7;
            this.form.location = 'Điểm giao dịch số ' + this.deliveryCenter[0].deliveryCenterId +
                ', ' + this.deliveryCenter[0].address;
        },
        async handleSubmit() {

            this.validateAndPreSubmitCreatePkgCollection();

            if (this.pkgCollectionSelectedId == 0) {
                this.msg = 'Chọn ít nhất 1 đơn!'
            } else {
                this.scrollToTop();
                this.handleConfirmPkgCollection();
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
            'teller_DC', 'tellerDCToken']),
        totalPages() {
            return Math.ceil(this.packages.length / this.itemsPerPage);
        },
        displayedItemList() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.recvPkgs.slice(startIndex, endIndex);
        },
    },
    created() {
        this.getTellerDC();
        this.getDeliveryCenterHere();
        // this.fetchSendPackagesData();
        // this.fetchSendingPackagesData();
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