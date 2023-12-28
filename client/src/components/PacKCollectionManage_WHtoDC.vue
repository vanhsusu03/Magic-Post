<template>
    <div id="container">
        <div class="md:max-w-5xl sm:max-w-3xl max-w-xl w-11/12 mx-auto">
            <div class="py-2 grid gird-cols-9">
                <span class="col-start-1 col-end-5 py-2">
                    <h1 class="inline-flex font-semibold lg:text-xl md:text-lg sm:text-base text-sm">
                        Tạo đơn hàng gửi tới điểm giao dịch đích
                    </h1>
                </span>
                <span class="col-start-5 col-end-7">
                    <button v-on:click="this.handleSubmit()" class="bg-blue-500 hover:bg-blue-700 hover:shadow-xl text-white font-bold 
                    md:text-base sm:text-sm text-xs py-2 px-4 rounded cursor-pointer hover:shadow-lg btn">
                        Gửi
                    </button>
                </span>
                <span class="col-start-7 mx-auto">
                    <button v-on:click="this.resetPkgCheckBox(this.readyToSendPkgs)" class="bg-blue-500 hover:bg-blue-700 hover:shadow-xl text-white font-bold 
                    md:text-base sm:text-sm text-xs py-2 px-4 rounded cursor-pointer hover:shadow-lg btn">
                        Hủy bỏ
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
                                Ngày giờ xác nhận tại điểm tập kết</th>
                            <th
                                class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">
                                Trạng thái</th>
                            <th
                                class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">
                                Chọn gửi</th>
                        </tr>
                        <tr v-for="packages in displayedItemList" :key="packages.package_id">
                            <td class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs">
                                {{ packages.package_id }}
                            </td>
                            <td
                                class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs truncate">
                                {{ packages.sender_name }}
                                <br />
                                {{ packages.sender_phone }}
                            </td>
                            <td
                                class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs truncate">
                                {{ packages.receiver_name }}
                                <br />
                                {{ packages.receiver_phone }}
                            </td>
                            <td class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs">
                                {{ packages.delivery_center_send_id }}
                            </td>
                            <td class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs">
                                {{ packages.delivery_center_receive_id }}
                            </td>
                            <td
                                class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs truncate">
                                {{ new Date(packages.status_details.time).toLocaleString("en-US", {
                                    timeZone:
                                        Intl.DateTimeFormat().resolvedOptions().timeZone
                                }) }}
                            </td>
                            <td v-if="packages.status_details.status_id == 5"
                                class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs truncate">
                                Đã đến điểm tập kết đích
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
    name: 'PackCollectionManage_WHtoDC',
    data() {
        return {
            form: {
                packageIds: '',
                packageCollectionTypeId: 0,
                statusId: 0,
                location: '',
                deliveryCenterReceiveId: 0,
                warehouseReceiveId: 0,
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
            staffWH: [],
            isChecked: false,
            msg: '',
            whTargetId: 0,
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
                let packagesArray = this.form.packageIds.split(',');
                if (packagesArray.length >= 1 && packagesArray[0] !== '') {
                    this.msg = "Chỉ chọn tối đa 1 đơn hàng!";
                    pkg.isChecked = false;
                }
                else {
                    if (!this.form.packageIds) {
                        this.form.packageIds += pkg.package_id;
                    } else {
                        this.form.packageIds += ',' + pkg.package_id;
                    }
                }
            } else {
                let packagesArray = this.form.packageIds.split(',');

                const indexToDelete = packagesArray.indexOf(pkg.package_id.toString());

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
        async getWareHouseTarget(deliveryCenterId) {
            try {
                let res = await axios.get(`/warehouse/deliverycenter/${deliveryCenterId}`, {
                    headers: { "Authorization": `Bearer ${this.staffWHToken.accessToken}` }
                }, { withCredentials: true });
                if (res.data) {
                    if (this.whTargetId == 0) {
                        this.whTargetId = Number(res.data[0].warehouse_id);
                    }
                    alert(this.whTargetId)
                }
            } catch (err) {
                if (err.response.data.error == 'jwt expired') {
                    await this.refreshToken();
                    await this.getWareHouseTarget();
                } else { alert(err.response.data.error); }
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
        async fetchReadySendingPkgsData() {
            try {
                let res = await axios.get(`/packages/5/Warehouse2/${this.staff_WH.warehouseId}`, {
                    headers: { "Authorization": `Bearer ${this.staffWHToken.accessToken}` },
                    withCredentials: true
                });
                if (res.data) {
                    this.readyToSendPkgs = res.data;
                    // this.packages = this.filteredPackages(this.packages, 1);
                }

            } catch (err) {
                if (err.response.data.error == 'jwt expired') {
                    await this.refreshToken();
                    await this.fetchReadySendingPkgsData();
                }
                else { alert(err.response.data.error); }
            }
        },
        //lấy pkg collections đang gửi tới warehouse kế tiếp

        async fetchSendingPackagesData() {
            try {
                let res = await axios.get(`/collections/sendingCollections/${this.staff_WH.warehouseId}`, {
                    params: {
                        typeOffice: "warehouse",
                        pkgCollectionType: 2,
                        statusId: 4
                    },
                    headers: { "Authorization": `Bearer ${this.staffWHToken.accessToken}` },
                    withCredentials: true
                });
                if (res.data) {
                    this.sendingPkgs = res.data;
                    // this.readyToSendPkgs = this.filteredPackages(this.readyToSendPkgs, 2);
                }

            } catch (err) {
                if (err.response.data.error == 'jwt expired') {
                    await this.refreshToken();
                    await this.fetchSendingPackagesData();
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
        async handleCreatePkgCollection() {
            try {
                let res = await axios.post('/collections', this.form, {
                    headers: { "Authorization": `Bearer ${this.staffWHToken.accessToken}` }
                }, { withCredentials: true });
                if (res.data) {
                    this.fetchSendingPackagesData();
                    this.fetchReadySendingPkgsData();
                    this.msg = 'Gửi hàng tới điểm giao dịch đích thành công!';
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
            this.resetPkgCheckBox(this.readyToSendPkgs);
            this.form.packageIds = '';
            this.whTargetId = 0;
            this.form.packageCollectionTypeId = 0;
            this.form.location = '';
            this.form.deliveryCenterReceiveId = 0;
            this.form.warehouseReceiveId = 0;
            this.deliveryCenters = null;
            this.provinceId = 0;
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
        },
        async handleSubmit() {

            this.validateAndPreSubmitCreatePkgCollection();

            if (this.checkEmptyError()) {
                this.form.packageCollectionTypeId = 3;
                this.form.statusId = 6;
                this.form.location = 'Điểm tập kết số ' + this.warehouse.warehouseId + ', ' + this.warehouse.address;
                this.getTargetId(this.readyToSendPkgs);
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
        this.getStaffWH();
        this.fetchReadySendingPkgsData();
        // this.fetchSendingPackagesData();
    }
}
</script>

<style>
.bg-custom-color {
    background-color: rgb(255, 0, 0);
    /* Replace with your custom RGB color */
}
</style>