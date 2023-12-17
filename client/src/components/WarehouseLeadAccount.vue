<template>
    <div v-if="!this.createNew" class="w-10/12 h-10/12 mx-auto">
        <div class="w-8/12 grid grid-cols-6 mx-auto">
            <span class="col-start-1 col-end-5 max-w-fit">
                <h1 class="font-semibold py-2 mt-2 text-center lg:text-xl md:text-base sm:text-sm text-xs">
                    Danh sách tài khoản nhân viên
                </h1>
            </span>
            <span class="col-start-6">
                <button v-on:click="this.createdANewAcc()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 mt-2 
                    mx-4 md:text-base sm:text-sm text-xs rounded btn">
                    Thêm tài khoản
                </button>
            </span>
        </div>

        <hr class="my-2 mx-auto w-9/12">
        
        <div class="w-9/12 mx-auto" id="course">
            <table class="px-auto">
                <tr>
                    <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs truncate">Mã điểm TK</th>
                    <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs truncate">Tỉnh/Thành phố</th>
                    <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs truncate">Mã tài khoản</th>
                    <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs truncate">Tên</th>
                    <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs truncate">Email</th>
                    <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs truncate">SĐT</th>
                    <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs truncate">Chỉnh sửa</th>
                    <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs truncate">Xóa</th>
                </tr>

                <tr v-for="account in displayedItemList">
                    <td class="py-2 px-4 border text-center md:text-base sm:text-sm text-xs">
                        {{ account.warehouseId }}</td>
                    <td class="py-2 px-4 border text-center md:text-base sm:text-sm text-xs">
                        {{ account.warehouse.province_municipality.provinceMunicipality }}</td>
                    <td class="py-2 px-4 border text-center md:text-base sm:text-sm text-xs">
                        WH_{{ account.warehouse.provinceMunicipalityId }}_MANGER_{{account.accountId }}</td>
                    <td class="py-2 px-4 border text-center md:text-base sm:text-sm text-xs">
                        {{ account.firstName + ' ' + account.lastName }}</td>
                    <td class="py-2 px-4 border text-center md:text-base sm:text-sm text-xs truncate">
                        {{ truncateText(account.email, 20) }}</td>
                    <td class="py-2 px-4 border text-center md:text-base sm:text-sm text-xs truncate">
                        {{ account.phone }}</td>
                    <td class="py-2 px-4 border items-center justify-center"> 
                        <img class="lg:w-2/5 md:w-3/5 sm:w-4/5 w-10/12 mx-auto cursor-pointer hover:opacity-90 py-6"
                            src="../assets/img/note.png" alt=""> </td>
                    <td class="py-2 px-4 border items-center justify-center">
                        <img class="lg:w-2/5 md:w-3/5 sm:w-4/5 w-10/12 mx-auto cursor-pointer hover:opacity-90 py-6" src="../assets/img/trash.png" alt="">
                    </td>
                </tr>
            </table>

            <div>
                <div class="max-w-fit mx-auto">
                    <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded md:text-base sm:text-sm text-xs"
                        @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Previous Page</button>
                    <span class="pl-10 pr-10">Trang <strong>{{ currentPage }}</strong> trong tổng số <strong>{{ totalPages
                    }}</strong></span>
                    <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded md:text-base sm:text-sm text-xs"
                        @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Next Page</button>
                </div>
            </div>
            
        </div>
        
    </div>
    
    <div v-else class="md:max-w-5xl sm:max-w-3xl max-w-xl w-11/12 mx-auto">
        <div class="py-2 grid gird-cols-6">
            <span class="col-start-1 col-end-5 py-2">
                <h1 class="inline-flex font-semibold lg:text-xl md:text-lg sm:text-base text-sm">
                    Tạo mới tài khoản
                </h1>
            </span>
            <span class="col-start-6 mx-auto">
                <button v-on:click="this.createdANewAcc()"
                    class="bg-blue-500 hover:bg-blue-700 hover:shadow-xl text-white font-bold 
                    md:text-base sm:text-sm text-xs py-2 px-4 rounded btn">
                    Hủy bỏ
                </button>
            </span>
        </div>

        <hr class="my-2 mx-auto">

        <div class="tabcontent" id="course">
            <form ref="accForm" @submit="handleSubmit"
                class="bg-white items-center shadow-lg rounded px-8 pt-6 pb-8 mb-4" novalidate autocapitalize="off">
                <h2><strong>Nơi làm việc:</strong></h2>
                <br>

                <label for="province" class="info">Tỉnh/Thành phố:</label>
                <br>

                <div id="province" class="w-2/4 common-shadow-input h-[43px] select2-stupid-at-home"
                    data-select2-id="select2-data-73-3wmt">
                    <select id="office-province" name="province_id" v-model="provinceSelectedId"
                        @change="this.solveWhenProvinceChange()"
                        class="search-select w-full h-full select2-hidden-accessible bg-gray-100 rounded-b-lg border-gray-300
                            cursor-pointer hover:shadow-lg"
                        tabindex="-1" aria-hidden="true" data-select2-id="select2-data-office-province">
                        <option class="text-gray-900" :value="0">Tỉnh/ Thành phố</option>
                        <option class="text-gray-900" v-for="province in provinces" :value="province.provinceMunicipalityId"
                            :key="province.provinceMunicipalityId">{{
                                province.provinceMunicipality }}</option>
                    </select>
                </div>

                <p class="error" v-if="this.provinceError.length > 0">{{ provinceError[0] }}</p>
                <br>

                <label for="warehouse" class="info">Điểm tập kết:</label>
                <br>

                <div id="warehouse"
                    class="w-2/4 common-shadow-input h-[43px] select2-stupid-at-home"
                    data-select2-id="select2-data-73-3wmt">
                    <select id="office-province" name="province_id" v-model="warehouseSelectedId"
                        class="search-select w-full h-full select2-hidden-accessible bg-gray-100 rounded-b-lg border-gray-300
                            cursor-pointer hover:shadow-lg"
                        tabindex="-1" aria-hidden="true" data-select2-id="select2-data-office-province">
                        <option class="text-gray-900" :value="0">Điểm tập kết</option>
                        <option class="text-gray-900 w-2/4" v-for="warehouse in wareHouses" :value="warehouse.warehouseId"
                            :key="warehouse.warehouseId">{{
                                truncateText(warehouse.address, 80) }}</option>
                    </select>
                </div>

                <p class="error" v-if="districtError.length > 0">{{ districtError[0] }}</p>
                <br>

                <p class="error" v-if="this.deliverycenterError.length > 0">{{ deliverycenterError[0] }}<br></p>

                <h2><strong>Thông tin cá nhân:</strong></h2>
                <br>

                <label for="username">Tên đăng nhập</label>
                <input type="text" id="username" name="username" placeholder="Nhập tên đăng nhập" v-model="form.username"
                    class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                         ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                          sm:text-sm sm:leading-6">
                <p class="error" v-if="userNameError.length > 0">{{ userNameError[0] }}</p>
                <br>

                <label for="password">Mật khẩu</label>
                <input type="password" id="password" name="password" placeholder="Nhập mật khẩu" v-model="form.password"
                    class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                         ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                          sm:text-sm sm:leading-6">
                <p class="error" v-if="passwordError.length > 0">{{ passwordError[0] }}</p>
                <br>

                <label for="re-password">Nhập lại mật khẩu</label>
                <input type="password" id="re-password" name="re-password" placeholder="Nhập lại mật khẩu"
                    v-model="repassword" class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                         ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                          sm:text-sm sm:leading-6">
                <p class="error" v-if="repasswordError.length > 0">{{ repasswordError[0] }}</p>
                <br>

                <label for="firstname">Họ</label>
                <input type="text" id="firstname" name="firstname" placeholder="Nhập tên họ" v-model="form.firstName" class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                         ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                          sm:text-sm sm:leading-6">
                <p class="error" v-if="firstNameError.length > 0">{{ firstNameError[0] }}</p>
                <br>

                <label for="lastname">Tên đệm</label>
                <input type="text" id="lastname" name="lastname" placeholder="Nhập tên đệm" v-model="form.lastName" class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                         ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                          sm:text-sm sm:leading-6">
                <p class="error" v-if="lastNameError.length > 0">{{ lastNameError[0] }}</p>
                <br>

                <label for="email">Email</label>
                <input type="text" id="email" name="email" placeholder="Nhập email" v-model="form.email" class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                         ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                          sm:text-sm sm:leading-6">
                <p class="error" v-if="emailError.length > 0">{{ emailError[0] }}</p>
                <br>

                <label for="phone">Số điện thoại</label>
                <input type="text" id="phone" name="phone" placeholder="Nhập số điện thoại" v-model="form.phone" class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                         ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                          sm:text-sm sm:leading-6">
                <p class="error" v-if="phoneError.length > 0">{{ phoneError[0] }}</p>
                <br>

                <label for="citizenCard">Số CCCD:</label>
                <input type="text" id="citizen" name="citizen" placeholder="Nhập số CCCD vào đây"
                    v-model="form.citizenIdentityCardNumber" class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                         ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                          sm:text-sm sm:leading-6">
                <p class="error" v-if="citizenCardImgError.length > 0">{{ citizenCardImgError[0] }}</p>
                <br>

                <br>
                <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
                    md:text-base sm:text-sm text-xs cursor-pointer hover:shadow-lg">Tạo tài
                    khoản</button>
            </form>
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
                accountTypeId: 0,
                username: '',
                password: '',
                deliveryCenterId: '',
                warehouseId: '',
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                citizenIdentityCardNumber: '',
            },
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
            deliveryCenters: [],
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
            createNew: true,
            itemsPerPage: 4,
            currentPage: 1,
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
            this.getAllWarehouseofAProvinces();
        },
        async fetchAccountsData() {
            try { 
                let res = await axios.get('/warehouses/manager', { withCredentials: true });
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
                    this.createdANewAcc();
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
        createdANewAcc() {
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
            if (this.accountCreateType == 1) {
                this.form.accountTypeId = 5;
                this.form.warehouseId = this.warehouseSelectedId;
            } else if (this.accountCreateType == 2) {
                this.form.accountTypeId = 3;
                this.form.deliveryCenterId = this.deliverycenterSelectedId;
            }
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
            if (this.districtSelectedId == 0) {
                this.districtError.push("Hãy chọn Quận/Huyện tương ứng!");
            }
            if(this.deliverycenterSelectedId == 0 ) {
                this.deliverycenterError.push("Hãy chọn điểm giao dịch tương ứng!")
            }
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
    },

    computed: {
        ...mapState(['isLogin', 'leadership', 'leadershipToken', 'manager_DC', 'manager_WH', 'staff_WH', 'teller_DC']),
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
        this.fetchAccountsData();
    }
}
</script>

<style></style>