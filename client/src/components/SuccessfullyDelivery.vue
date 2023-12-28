<template>
    <div id="container">
        <div class="md:max-w-5xl sm:max-w-3xl max-w-xl w-11/12 mx-auto">
            <div class="py-2 grid gird-cols-9">
                <span class="col-start-1 col-end-5 py-2">
                    <h1 class="inline-flex font-semibold lg:text-xl md:text-lg sm:text-base text-sm">
                        Danh sách vận chuyển thành công
                    </h1>
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
                                Xác nhận thành công lúc</th>
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
                                {{ new Date(packages.status_details[8].time).toLocaleString("en-US", {
                                    timeZone:
                                        Intl.DateTimeFormat().resolvedOptions().timeZone
                                }) }}
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
    name: 'SuccessfullyDelivery',
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
            isChecked: false,
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
                packages.isChecked = false;
            });
        },
        getTargetId(arr) {
            let id = 0;

            arr.forEach((packages) => {
                if (packages.isChecked == true) {
                    this.form.deliveryCenterReceiveId = Number(packages.delivery_center_receive_id);
                }
            });
        },
        toggleCheckbox(pkg) {
            pkg.isChecked = !pkg.isChecked;

            if (pkg.isChecked == true) {

                if (this.pkgSelectedId) {
                    this.msg = "Chỉ chọn tối đa 1 đơn hàng/1 lần xác nhận!";
                    pkg.isChecked = false;
                }
                else if (this.pkgSelectedId == 0) {
                    this.pkgSelectedId = pkg.packageId;
                }
            } else {
                this.pkgSelectedId = 0;
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
                    this.readyToSendPkgs = this.filteredPackages(this.readyToSendPkgs, 9);
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
        async handleConfirmSendToReceiver() {
            try {
                let res = await axios.put(`/packages/${this.pkgSelectedId}/statuses`, this.form, {
                    headers: { "Authorization": `Bearer ${this.tellerDCToken.accessToken}` }
                }, { withCredentials: true });
                if (res.data) {
                    this.fetchSendPackagesData()
                    this.msg = 'Xác nhận thành công!';
                    this.createPackageCollection();
                }
            } catch (err) {
                if (err.response.data.error == 'jwt expired') {
                    await this.refreshToken();
                    await this.handleConfirmSendToReceiver();
                } else { alert(err.response.data.error); }
            }
        },
        createPackageCollection() {
            this.resetError();
            this.resetPkgCheckBox(this.readyToSendPkgs);
            this.form.statusId = 0;
            this.form.location = '';
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
        async handleSubmit() {

            this.validateAndPreSubmitCreatePkgCollection();

            if (this.checkEmptyError()) {
                this.form.statusId = 8;
                this.form.location = 'Điểm giao dịch số ' + this.deliveryCenter[0].deliveryCenterId + ', ' + this.deliveryCenter[0].address;
                this.scrollToTop();
                await this.handleConfirmSendToReceiver();
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