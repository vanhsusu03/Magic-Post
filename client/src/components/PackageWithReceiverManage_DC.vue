<template>
    <div id="container">
        <div class="md:max-w-5xl sm:max-w-3xl max-w-xl w-11/12 mx-auto">
            <div class="py-2 grid gird-cols-12">
                <span class="col-start-1 col-end-5 py-2">
                    <h1 class="inline-flex font-semibold lg:text-xl md:text-lg sm:text-base text-sm">
                        Đang vận chuyển tới người nhận
                    </h1>
                </span>
                <span class="col-start-5 col-end-7">
                    <button v-on:click="this.handleSuccessSubmit()" class="bg-blue-500 hover:bg-blue-700 hover:shadow-xl text-white font-bold 
                    md:text-base sm:text-sm text-xs py-2 px-4 rounded cursor-pointer hover:shadow-lg btn">
                        Xác nhận chuyển thành công
                    </button>
                </span>
                <span class="col-start-7 col-end-9">
                    <button v-on:click="this.handleFailSubmit()" class="bg-blue-500 hover:bg-blue-700 hover:shadow-xl text-white font-bold 
                    md:text-base sm:text-sm text-xs py-2 px-4 rounded cursor-pointer hover:shadow-lg btn">
                        Xác nhận chuyển thất bại
                    </button>
                </span>
                <span class="col-start-9 mx-auto">
                    <button v-on:click="this.resetPkgCheckBox(this.readyToSendPkgs)" class="bg-blue-500 hover:bg-blue-700 hover:shadow-xl text-white font-bold 
                    md:text-base sm:text-sm text-xs py-2 px-4 rounded cursor-pointer hover:shadow-lg btn">
                        Hủy chọn tất cả
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
                                Địa chỉ người nhận</th>
                            <th
                                class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">
                                Bắt đầu gửi tới người nhận lúc</th>
                            <th
                                class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">
                                Thành công</th>
                            <th
                                class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">
                                Thất bại</th>
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
                            <td
                                class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs truncate">
                                {{ packages.receiverAddress }}
                            </td>
                            <td
                                class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs truncate">
                                {{ new Date(packages.status_details[7].time).toLocaleString("en-US", {
                                    timeZone:
                                        Intl.DateTimeFormat().resolvedOptions().timeZone
                                }) }}
                            </td>
                            <td class="py-2 px-4 border items-center justify-center">
                                <input type="checkbox" v-model="packages.isSuccessChecked" class="hidden"
                                    @change="toggleCheckbox(packages, 1)" />
                                <div class="w-6 h-6 border border-gray-400 rounded cursor-pointer flex items-center justify-center transition-all duration-300"
                                    :class="{ 'bg-green-500': packages.isSuccessChecked }"
                                    @click="toggleCheckbox(packages, 1)">
                                    <svg v-if="packages.isSuccessChecked" class="w-4 h-4 text-white" fill="none"
                                        stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                        <path d="M6 12l2 2 6-6"></path>
                                    </svg>
                                </div>
                            </td>
                            <td class="py-2 px-4 border items-center justify-center">
                                <input type="checkbox" v-model="packages.isFailChecked" class="hidden"
                                    @change="toggleCheckbox(packages, 0)" />
                                <div class="w-6 h-6 border border-gray-400 rounded cursor-pointer flex items-center justify-center transition-all duration-300"
                                    :class="{ 'bg-green-500': packages.isFailChecked }"
                                    @click="toggleCheckbox(packages, 0)">
                                    <svg v-if="packages.isFailChecked" class="w-4 h-4 text-white" fill="none"
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
                                :disabled="currentPage === 1">Trang trước</button>
                            <span class="pl-10 pr-10 md:text-base sm:text-sm text-xs">Trang <strong>{{ currentPage
                            }}</strong>
                                trong tổng số <strong>{{ totalPages
                                }}</strong></span>
                            <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded 
                    cursor-pointer shadow-lg md:text-base sm:text-sm text-xs" @click="goToPage(currentPage + 1)"
                                :disabled="currentPage === totalPages">Trang sau</button>
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
    name: 'PackageWithReceiverManage_DC',
    data() {
        return {
            successForm: {
                statusId: 0,
                location: '',
            },
            failForm: {
                statusId: 0,
                location: '',
            },
            createPkgCollectionError: {
                packageIdsError: [],
                packageCollectionTypeIdError: [],
            },
            provinceId: 0,
            provinceSelectedId: 0,
            districtSelectedId: 0,
            deliverycenterSelectedId: 0,
            sendingPkgs: [],
            readyToSendPkgs: [],
            provinces: [],
            districts: [],
            deliveryCenter: [],
            deliveryCenters: [], //dùng
            targetWarehouseId: [],
            createNew: false,
            itemsPerPage: 4,
            currentPage: 1,
            tellerDC: [],
            isSuccessChecked: false,
            isFailChecked: false,
            msg: '',
            whTargetId: 0,
            pkgSelectedId: 0,
            warehouse: [],
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
        test() {
            return 7;
        },
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
                packages.isSuccessChecked = false;
                packages.isFailChecked = false;
            });
        },
        resetPkgCheckBoxExptMain(arr, id) {
            arr.forEach((packages) => {
                if (packages.packageId != id) {
                    packages.isSuccessChecked = false;
                    packages.isFailChecked = false;
                }
            });
            this.pkgSelectedId = 0;
        },
        toggleCheckbox(pkg, id) {
            if (id == 1) {
                pkg.isSuccessChecked = !pkg.isSuccessChecked;
                this.resetPkgCheckBoxExptMain(this.readyToSendPkgs, pkg.packageId);
                if (pkg.isFailChecked) {
                    pkg.isFailChecked = !pkg.isFailChecked;
                }
                if (pkg.isSuccessChecked == true) {

                    if (this.pkgSelectedId) {
                        this.msg = "Chỉ chọn tối đa 1 đơn hàng/1 lần xác nhận!";
                        pkg.isSuccessChecked = false;
                    }
                    else if (this.pkgSelectedId == 0) {
                        this.pkgSelectedId = pkg.packageId;
                    }
                } else {
                    this.pkgSelectedId = 0;
                }
            } else if (id == 0) {
                pkg.isFailChecked = !pkg.isFailChecked;
                this.resetPkgCheckBoxExptMain(this.readyToSendPkgs, pkg.packageId);
                if (pkg.isSuccessChecked) {
                    pkg.isSuccessChecked = !pkg.isSuccessChecked;
                }
                if (pkg.isFailChecked == true) {

                    if (this.pkgSelectedId) {
                        this.msg = "Chỉ chọn tối đa 1 đơn hàng/1 lần xác nhận!";
                        pkg.isFailChecked = false;
                    }
                    else if (this.pkgSelectedId == 0) {
                        this.pkgSelectedId = pkg.packageId;
                    }
                } else {
                    this.pkgSelectedId = 0;
                }
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
                        deliveryCenterType: 'receive'
                    },
                    headers: { "Authorization": `Bearer ${this.tellerDCToken.accessToken}` },
                    withCredentials: true
                });
                if (res.data) {
                    this.readyToSendPkgs = res.data;
                    this.readyToSendPkgs = this.filteredPackages(this.readyToSendPkgs, 8);
                }

            } catch (err) {
                if (err.response.data.error == 'jwt expired') {
                    await this.refreshToken();
                    await this.fetchSendPackagesData();
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
        async handleConfirmSuccess() {
            try {
                let res = await axios.put(`/packages/${this.pkgSelectedId}/statuses`, this.successForm, {
                    headers: { "Authorization": `Bearer ${this.tellerDCToken.accessToken}` }
                }, { withCredentials: true });
                if (res.data) {
                    this.fetchSendPackagesData()
                    this.msg = 'Xác nhận thành công! Chuyển đơn hàng thành công!';
                    this.createPackageCollection();
                }
            } catch (err) {
                if (err.response.data.error == 'jwt expired') {
                    await this.refreshToken();
                    await this.handleConfirmSuccess();
                } else { alert(err.response.data.error); }
            }
        },
        async handleConfirmFail() {
            try {
                let res = await axios.put(`/packages/${this.pkgSelectedId}/statuses`, this.failForm, {
                    headers: { "Authorization": `Bearer ${this.tellerDCToken.accessToken}` }
                }, { withCredentials: true });
                if (res.data) {
                    this.fetchSendPackagesData()
                    this.msg = 'Xác nhận thành công! Chuyển đơn hàng thất bại!';
                    this.createPackageCollection();
                }
            } catch (err) {
                if (err.response.data.error == 'jwt expired') {
                    await this.refreshToken();
                    await this.handleConfirmFail();
                } else { alert(err.response.data.error); }
            }
        },
        createPackageCollection() {
            this.resetError();
            this.resetPkgCheckBox(this.readyToSendPkgs);
            this.successForm.statusId = 0;
            this.successForm.location = '';
            this.failForm.statusId = 0;
            this.failForm.location = '';
            this.deliveryCenters = null;
            this.provinceId = 0;
            this.pkgSelectedId = 0;
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
            if (this.pkgSelectedId == 0) {
                this.createPkgCollectionError.packageIdsError.push('Hãy chọn ít nhất 1 đơn hàng!')
            }
        },
        async handleSuccessSubmit() {

            this.validateAndPreSubmitCreatePkgCollection();

            if (this.checkEmptyError()) {
                this.successForm.statusId = 9;
                this.successForm.location = 'Điểm giao dịch số ' + this.deliveryCenter[0].deliveryCenterId + ', ' + this.deliveryCenter[0].address;
                this.scrollToTop();
                await this.handleConfirmSuccess();
            } else {
                this.msg = "Phải chọn ít nhất 1 đơn hàng!"
            }
        },
        async handleFailSubmit() {

            this.validateAndPreSubmitCreatePkgCollection();

            if (this.checkEmptyError()) {
                this.failForm.statusId = 10;
                this.failForm.location = 'Điểm giao dịch số ' + this.deliveryCenter[0].deliveryCenterId + ', ' + this.deliveryCenter[0].address;
                this.scrollToTop();
                await this.handleConfirmFail();
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
        this.fetchSendPackagesData();
    }
}
</script>

<style>
.bg-custom-color {
    background-color: rgb(255, 0, 0);
    /* Replace with your custom RGB color */
}
</style>