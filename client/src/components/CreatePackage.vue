<template>
    <div id="container">
        <div v-if="!this.createNew" class="w-10/12 h-10/12 mx-auto">
            <div class="w-8/12 grid grid-cols-6 mx-auto">
                <span class="col-start-1 col-end-5 max-w-fit">
                    <h1 class="font-semibold py-2 mt-2 text-center lg:text-2xl md:text-xl sm:text-lg text-base">
                        Danh sách đơn hàng đã ghi nhận
                    </h1>
                </span>
                <span class="col-start-6">
                    <button v-on:click="this.createPackageBill()" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 mt-2 
                    mx-4 md:text-base sm:text-sm text-xs rounded btn cursor-pointer shadow-lg">
                        Ghi nhận hàng mới
                    </button>
                </span>
            </div>

            <hr class="my-2 mx-auto w-9/12">

            <div class="w-9/12 mx-auto" id="course">
                <table>
                    <tr>
                        <th
                            class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">
                            Mã đơn hàng</th>
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
                            Chỉnh sửa</th>
                        <th
                            class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">
                            Xóa</th>
                    </tr>
                    <tr v-for="account in displayedItemList">
                        <td class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs">{{
                            account.deliveryCenterId }}</td>
                        <td class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs">
                            {{
                                account.delivery_center &&
                                account.delivery_center.district &&
                                account.delivery_center.district.province_municipality
                                ? account.delivery_center.district.province_municipality.provinceMunicipality
                                : 'N/A'
                            }}
                        </td>
                        <td class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs">{{
                            account.delivery_center &&
                            account.delivery_center.district
                            ? account.delivery_center.district.district
                            : 'N/A' }}</td>
                        <td class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs">
                            DC_{{ account.delivery_center &&
                                account.delivery_center.district &&
                                account.delivery_center.district.provinceMunicipalityId
                                ?
                                `${account.delivery_center.district.provinceMunicipalityId}/${account.delivery_center.districtId}_MANAGER_${account.accountId}`
                                : 'N/A'
                            }}
                        </td>
                        <td class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs truncate">{{
                            account.firstName + ' ' + account.lastName }}</td>
                        <td class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs truncate">{{
                            truncateText(account.email, 20) }}</td>
                        <td class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs truncate">{{
                            account.phone }}</td>
                        <td class="py-2 px-4 border items-center justify-center"> <img
                                class="2xl:w-1/5 xl:w-2/5 lg:w-3/5 w-full mx-auto cursor-pointer"
                                src="../assets/img/note.png" alt=""> </td>
                        <td class="py-2 px-4 border items-center justify-center">
                            <img class="2xl:w-1/5 xl:w-2/5 lg:w-3/5 w-full mx-auto cursor-pointer hover:opacity-90 py-6"
                                src="../assets/img/trash.png" alt="">
                        </td>
                    </tr>
                </table>

                <div class="my-4">
                    <div class="max-w-fit mx-auto">
                        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded 
                    cursor-pointer shadow-lg md:text-base sm:text-sm text-xs" @click="goToPage(currentPage - 1)"
                            :disabled="currentPage === 1">Previous Page</button>
                        <span class="pl-10 pr-10 md:text-base sm:text-sm text-xs">Trang <strong>{{ currentPage }}</strong>
                            trong tổng số <strong>{{ totalPages
                            }}</strong></span>
                        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded 
                    cursor-pointer shadow-lg md:text-base sm:text-sm text-xs" @click="goToPage(currentPage + 1)"
                            :disabled="currentPage === totalPages">Next Page</button>
                    </div>
                </div>
            </div>

        </div>

        <div v-else class="md:max-w-5xl sm:max-w-3xl max-w-xl w-11/12 mx-auto">
            <div class="py-2 grid gird-cols-6">
                <span class="col-start-1 col-end-5 py-2">
                    <h1 class="inline-flex font-semibold lg:text-xl md:text-lg sm:text-base text-sm">
                        Ghi nhận hàng mới
                    </h1>
                </span>
                <span class="col-start-6 mx-auto">
                    <button v-on:click="this.createPackageBill()" class="bg-green-500 hover:bg-green-700 hover:shadow-xl text-white font-bold 
                    md:text-base sm:text-sm text-xs py-2 px-4 rounded cursor-pointer hover:shadow-lg btn">
                        Hủy bỏ
                    </button>
                </span>
            </div>

            <hr class="my-2 mx-auto">
            <div class="" id="course">
                <form ref="accForm" @submit="handleSubmit"
                    class="bg-white items-center shadow-lg rounded px-8 pt-6 pb-8 mb-4" novalidate autocapitalize="off">
                    <h1 class="text-lg"><strong>Thông tin phía gửi:</strong></h1><br>
                    <h1><strong>Thông tin người gửi:</strong></h1><br>
                    <h1><strong>Nơi gửi:</strong></h1><br>
                    <label for="province" class="info">Tỉnh/Thành phố: <strong>{{ this.tellerDC }}</strong></label><br>
                    <div id="province" class="w-2/4 common-shadow-input h-[43px] select2-stupid-at-home"
                        data-select2-id="select2-data-73-3wmt">
                        <select id="office-province" name="province_id" v-model="provinceSelectedId"
                            @change="this.solveWhenProvinceChange()" class="search-select w-full h-full select2-hidden-accessible bg-gray-100 rounded-b-lg border-gray-300
                                md:text-base sm:text-sm text-xs cursor-pointer hover:shadow-lg" tabindex="-1"
                            aria-hidden="true" data-select2-id="select2-data-office-province">
                            <option class="text-gray-900" :value="0">Tỉnh/ Thành phố</option>
                            <option class="text-gray-900" v-for="province in provinces"
                                :value="province.provinceMunicipalityId" :key="province.provinceMunicipalityId">{{
                                    province.provinceMunicipality }}</option>
                        </select>
                    </div>

                    <p class="error" v-if="this.provinceError.length > 0">{{ provinceError[0] }}<br></p>
                    <br>

                    <label for="district" class="info">Tỉnh/Thành phố:</label><br>
                    <div id="district" class="w-2/4 common-shadow-input h-[43px] select2-stupid-at-home"
                        data-select2-id="select2-data-73-3wmt">
                        <select id="district" name="district" v-model="districtSelectedId"
                            @change="this.getAllDeliveryCenterOfADistrict()" class="search-select w-full h-full select2-hidden-accessible bg-gray-100 rounded-b-lg border-gray-300
                                md:text-base sm:text-sm text-xs cursor-pointer hover:shadow-lg" tabindex="-1"
                            aria-hidden="true" data-select2-id="select2-data-office-province">
                            <option class="text-gray-900" :value="0">Quận/Huyện</option>
                            <option class="text-gray-900" v-for="district in districts" :value="district.districtId"
                                :key="district.district">{{
                                    district.district }}</option>
                        </select>
                    </div>
                    <p class="error" v-if="this.districtError.length > 0">{{ districtError[0] }}</p><br>

                    <label for="deliveryCenter" class="info">Tỉnh/Thành phố:</label><br>
                    <div id="deliveryCenter" class="w-2/4 common-shadow-input h-[43px] select2-stupid-at-home"
                        data-select2-id="select2-data-73-3wmt">
                        <select id="deleveryCenter" name="deleveryCenter" v-model="deliverycenterSelectedId"
                            @change="this.getAllDeliveryCenterOfADistrict()" class="search-select w-full h-full select2-hidden-accessible bg-gray-100 rounded-b-lg border-gray-300
                                md:text-base sm:text-sm text-xs cursor-pointer hover:shadow-lg" tabindex="-1"
                            aria-hidden="true" data-select2-id="select2-data-office-province">
                            <option class="text-gray-900" :value="0">Điểm giao dịch</option>
                            <option class="text-gray-900" v-for="delivery_center in deliveryCenters"
                                :value="delivery_center.deliveryCenterId" :key="delivery_center.deliveryCenterId">{{
                                    delivery_center.address }}</option>
                        </select>
                    </div>
                    <p class="error" v-if="this.deliverycenterError.length > 0">{{ deliverycenterError[0] }}</p>
                    <br>

                    <h2><strong>Thông tin đơn gửi:</strong></h2><br>

                    <div class="flex">
                        <div class="flex items-center h-5 ">
                            <input type="radio" id="packageTypeIdMerchandise" value="Hàng hóa"
                                aria-describedby="packageTypeInfo" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 
                            dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                v-model="packageType" @click="test">
                        </div>
                        <div class="ms-2 text-sm mr-4">
                            <label for="packageTypeIdMerchandise" class="font-medium text-gray-900 dark:text-gray-300">Hàng
                                hóa</label>
                            <p id="packageTypeInfo" class="text-xs font-normal text-gray-500 dark:text-gray-300">Trọng lượng
                                tối đa: 8kg</p>
                        </div>

                        <div class="flex items-center h-5 ml-4">
                            <input type="radio" id="packageTypeIdDocument" value="Tài liệu"
                                aria-describedby="packageTypeInfo" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 
                            dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                v-model="packageType" @click="test">
                        </div>
                        <div class="ms-2 text-sm">
                            <label for="packageTypeIdDocument" class="font-medium text-gray-900 dark:text-gray-300">Tài
                                liệu</label>
                            <p id="packageTypeInfo" class="text-xs font-normal text-gray-500 dark:text-gray-300">Trọng lượng
                                tối đa: 2kg</p>
                        </div>
                    </div><br>

                    <label for="weight">Trọng lượng:</label>
                    <input type="text" id="weight" name="weight" placeholder="Nhập trọng lượng" class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                        sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs hover:shadow-lg">

                    <label for="cost">Phí vận chuyển:</label>
                    <input type="text" id="cost" name="cost" placeholder="Nhập phí vận chuyển" v-model="repassword" class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                        sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs hover:shadow-lg">

                    <label for="senderName">Họ tên người gửi:</label>
                    <input type="text" id="senderName" name="senderName" placeholder="Nhập tên họ" v-model="form.firstName"
                        class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                        sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs hover:shadow-lg">
                    <p class="error" v-if="firstNameError.length > 0">{{ firstNameError[0] }}<br></p><br>

                    <label for="senderAddress">Địa chỉ người gửi:</label>
                    <input type="text" id="senderAddress" name="senderAddress" placeholder="Nhập địa chỉ"
                        v-model="form.address" class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                        sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs hover:shadow-lg">

                    <label for="senderPhone">Số điện thoại người gửi:</label>
                    <input type="text" id="senderPhone" name="senderPhone" placeholder="Nhập số điện thoại"
                        v-model="form.phone" class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                        sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs hover:shadow-lg">
                    <p class="error" v-if="phoneError.length > 0">{{ phoneError[0] }}<br></p><br>


                    <label for="receiverName">Họ tên người nhận:</label>
                    <input type="text" id="receiverName" name="receiverName" placeholder="Nhập tên họ"
                        v-model="form.firstName" class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                        sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs hover:shadow-lg">
                    <p class="error" v-if="firstNameError.length > 0">{{ firstNameError[0] }}<br></p><br>

                    <label for="receiverAddress">Địa chỉ người nhận:</label>
                    <input type="text" id="receiverAddress" name="receiverAddress" placeholder="Nhập địa chỉ"
                        v-model="form.address" class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                        sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs hover:shadow-lg">

                    <label for="receiverPhone">Số điện thoại người nhận:</label>
                    <input type="text" id="receiverPhone" name="receiverPhone" placeholder="Nhập số điện thoại"
                        v-model="form.phone" class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                        sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs hover:shadow-lg">
                    <p class="error" v-if="phoneError.length > 0">{{ phoneError[0] }}<br></p><br>

                    <br>
                    <button type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded
                md:text-base sm:text-sm text-xs hover:shadow-lg cursor-pointer">Tạo đơn
                        hàng</button>
                </form>
            </div>
        </div>

    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import axios from 'axios';
export default {
    name: 'LeaderManageAccount',
    data() {
        return {
            form: {
                packageTypeId: 0,
                deliveryCenterSendId: 0,
                deliveryCenterReceiveId: 0,
                weightGram: 0,
                cost: 0,
                codAmount: 0,
                senderAddress: '',
                receiverAddress: '',
                senderName: '',
                receiverName: '',
                senderPhone: '',
                receiverPhone: '',
                location: '',
            },
            packageType: '',
            repassword: '',
            accountTypeSelected: 0,
            accountCreateType: 0,
            provinceSelectedId: 0,
            districtSelectedId: 0,
            warehouseSelectedId: 0,
            deliverycenterSelectedId: 0,
            accounts: [],
            provinces: [],
            districts: [],
            wareHouses: [],
            deliveryCenters: [], //dùng
            provinceError: [],
            districtError: [],
            warehouseError: [],
            userNameError: [],
            passwordError: [],
            repasswordError: [],
            deliverycenterError: [],
            warehouseError: [],
            firstNameError: [],
            lastNameError: [],
            emailError: [],
            phoneError: [],
            citizenCardImgError: [],
            createNew: false,
            itemsPerPage: 4,
            currentPage: 1,
            tellerDC: [],
        }
    },
    methods: {
        ...mapMutations(['scrollToTop', 'setLogged', 'setLeadership', 'setLeadershipAccessToken',
            'setLeadershipRefreshToken', 'setManagerDC', 'setManagerWH', 'setTellerDC', 'setStaffWH']),
        handleWhenChangeStatusAccountCreate() {
            this.resetError();
            this.provinceSelectedId = 0;
            this.districtSelectedId = 0;
            this.warehouseSelectedId = 0;
            this.deliverycenterSelectedId = 0;
            this.form.username = "";
            this.form.password = "";
            this.repassword = "";
            this.form.firstName = "";
            this.form.lastName = "";
            this.form.email = "";
            this.form.phone = "";
            this.form.citizenIdentityCardNumber = "";
            this.districts = null;
            this.wareHouses = null;
            this.deliveryCenters = null;
        },
        solveWhenProvinceChange() {
            this.getAllDistrictsOfAProvince();
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
                }
            }
        },
        async fetchAccountsData() {
            try {
                let res = await axios.get('/warehouses/staff', { withCredentials: true });
                this.accounts = res.data;

            } catch (err) {
                alert(err.respone.data.error);
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
        async handleCreateAccount() {
            try {
                this.refreshToken();
                let res = await axios.post('/signup', this.form, {
                    headers: { "Authorization": `Bearer ${this.leadershipToken.accessToken}` }
                }, { withCredentials: true });
                if (res.data) {
                    this.fetchAccountsData();
                    this.accountCreateType = 0;
                    this.createPackageBill();
                }
            } catch (err) {
                if (err.response.data.error == 'Username is already exists') {
                    this.userNameError.push("Tên đăng nhập đã tồn tại, hãy chọn tên khác!")
                } else if (err.respone.data.error == 'Phone is already exists') {
                    this.phoneError.push('Số điện thoại bị trùng! Hãy nhập số khác')
                } else if (err.respone.data.error == 'Email is already exists') {
                    this.emailError.push('Email bị trùng! Hãy chọn email khác!')
                }
            }
        },
        async handleDeleteWH(id) {
            try {
                // let res = await axios.put
            } catch (err) {
                alert(err.respone.data.error);
            }
        },
        async getProvinces() {
            try {
                const response = await axios.get('/provinces', { withCredentials: true });
                this.provinces = response.data;
            } catch (error) {
                console.error('Error fetching provinces:', error.message);
            }
        },
        async getAllDistrictsOfAProvince() {
            this.districts = null;
            if (this.provinceSelectedId > 0) {
                try {
                    const res = await axios.get(`/provinces/${this.provinceSelectedId}/districts`, { withCredentials: true });
                    this.districts = res.data;
                } catch (error) {
                    console.error('getDistrictofAProvince:', error.message);
                }
            }
        },
        async getAllWarehouseofAProvinces() {
            this.wareHouses = null;
            if (this.provinceSelectedId > 0) {
                try {
                    const res = await axios.get(`/warehouses/${this.provinceSelectedId}`, { withCredentials: true });
                    this.wareHouses = res.data;
                } catch (error) {
                    console.error('getDistrictofAProvince:', error.message);
                }
            }
        },

        async getAllDeliveryCenterOfADistrict() {
            this.deliveryCenters = [];
            if (this.districtSelectedId > 0) {
                try {
                    const res = await axios.get(`/deliveryCenters/${this.districtSelectedId}`, { withCredentials: true });
                    this.deliveryCenters = res.data;
                } catch (err) {
                    console.log('getDCfromDistrict: ', err.respone.data.error)
                }
            }

        },
        createPackageBill() {
            this.resetError();
            this.accountCreateType = 0;
            this.accountTypeSelected = 0;
            this.provinceSelectedId = 0;
            this.districtSelectedId = 0;
            this.warehouseSelectedId = 0;
            this.deliverycenterSelectedId = 0;
            this.form.username = "";
            this.form.password = "";
            this.repassword = "";
            this.form.firstName = "";
            this.form.lastName = "";
            this.form.email = "";
            this.form.phone = "";
            this.form.citizenIdentityCardNumber = "";
            this.districts = null;
            this.wareHouses = null;
            this.deliveryCenters = null;
            this.createNew = !this.createNew;

        },
        preSubmit() {
            this.form.accountTypeId = 6;
            this.form.warehouseId = this.warehouseSelectedId;
        },
        resetError() {
            this.provinceError = [];
            this.districtError = [];
            this.warehouseError = [];
            this.userNameError = [];
            this.passwordError = [];
            this.repasswordError = [];
            this.firstNameError = [];
            this.lastNameError = [];
            this.emailError = [];
            this.phoneError = [];
            this.citizenCardImgError = [];
        },
        checkEmptyError() {
            if (this.provinceError.length != 0
                || this.districtError.length != 0
                || this.warehouseError.length != 0
                || this.passwordError.length != 0
                || this.repasswordError.length != 0
                || this.userNameError.length != 0
                || this.firstNameError.length != 0
                || this.lastNameError.length != 0
                || this.emailError.length != 0
                || this.phoneError.length != 0
                || this.citizenCardImgError.length != 0) {
                return false;
            }
            return true;
        },
        validateRegisterAccount() {
            this.resetError();

            if (this.provinceSelectedId == 0) {
                this.provinceError.push("Hãy chọn Tỉnh/Thành phố làm việc!");
            }
            if (this.warehouseSelectedId == 0) {
                this.warehouseError.push("Hãy chọn điểm tập kết làm việc!");
            }
            // if (this.districtSelectedId == 0) {
            //     this.districtError.push("Hãy chọn Quận/Huyện tương ứng!");
            // }

            if (!this.form.firstName) {
                this.firstNameError.push("Hãy nhập tên họ. Ví dụ: Lê, Nguyễn, .v.v.");
            } else if (!/^[A-Za-zÀ-ỹ]+$/.test(this.form.firstName.replace(/\s/g, ""))) {
                this.firstNameError.push("Tên họ chỉ được bao gồm chữ cái!");
            }

            // For the last name
            if (!this.form.lastName) {
                this.lastNameError.push('Hãy nhập tên đệm. Ví dụ: Văn A, Tuấn Anh, .v.v.');
            } else if (!/^[A-Za-zÀ-ỹ]+$/.test(this.form.lastName.replace(/\s/g, ""))) {
                this.lastNameError.push('Tên đệm chỉ được bao gồm chữ cái!');
            }

            if (!this.form.email) {
                this.emailError.push('Hãy nhập email.');
            } else if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.form.email)) {
                this.emailError.push('Email sai định dạng!');
            }

            //username 
            if (!this.form.username) {
                this.userNameError.push('Hãy nhập tên đăng nhập.');
            }

            //password
            if (!this.form.password) {
                this.passwordError.push('Hãy nhập mật khẩu!');
            } else if (this.form.password.length < 8) {
                this.passwordError.push('Mật khẩu phải dài tối thiểu 8 kí tự!');
            }

            if (!this.repassword) {
                this.repasswordError.push('Hãy nhập lại mật khẩu!');
            } else if (this.form.password != this.repassword) {
                this.repasswordError.push('Mật khẩu nhập lại không đúng!');
            }

            //phone 
            if (!this.form.phone) {
                this.phoneError.push('Hãy nhập số điện thoại!');
            } else if (!this.form.phone.startsWith('0')) {
                this.phoneError.push('Số điện thoại phải bắt đầu bằng 0!');
            } else if (this.form.phone.length != 10) {
                this.phoneError.push('Số điện thoại phải bao gồm 10 chữ số!');
            } else if (!/[0-9]{10}/.test(this.form.phone)) {
                this.phoneError.push('Số điện thoại chỉ được bao gồm chữ số!');
            }

            if (!this.form.citizenIdentityCardNumber) {
                this.citizenCardImgError.push("Hãy nhập số CCCD!")
            } else if (!/[0-9]{10}/.test(this.form.citizenIdentityCardNumber)) {
                this.citizenCardImgError.push('CCCD không bao gồm chữ cái');
            }
        },
        async handleSubmit(event) {

            this.validateRegisterAccount();

            if (!this.checkEmptyError()) {
                event.preventDefault();
            }
            else {
                event.preventDefault();
                this.scrollToTop();
                this.preSubmit();
                await this.handleCreateAccount();
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
        test() {
            console.log(this.packageType)
        }
    },

    computed: {
        ...mapState(['isLogin', 'leadership', 'leadershipToken', 'manager_DC', 'manager_WH', 'staff_WH', 'teller_DC', 'tellerDCToken']),
        totalPages() {
            return Math.ceil(this.accounts.length / this.itemsPerPage);
        },
        displayedItemList() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.accounts.slice(startIndex, endIndex);
        },
    },
    created() {
        this.getProvinces();
        this.getTellerDC();
    }
}
</script>

<style></style>