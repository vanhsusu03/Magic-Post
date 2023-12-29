<template>
    <div id="container">
        <div v-if="!this.createNew" class="w-11/12 h-10/12 mx-auto">
            <div class="w-10/12 grid grid-cols-6 mx-auto">
                <span class="col-start-1 col-end-5 row-start-1 row-end-3 max-w-fit">
                    <h1 class="font-semibold py-2 mt-2 text-center lg:text-2xl md:text-xl sm:text-lg text-base">
                        Danh sách tài khoản nhân viên tại điểm tập kết
                    </h1>
                    <br>
                    <h2><strong>Mã điểm tập kết:</strong> {{ manager_WH.warehouseId }}</h2>
                    <h2 v-if="WHmanager && WHmanager.length > 0"><strong>Nơi làm việc (Tỉnh/Thành phố): </strong>{{
                        WHmanager[0].warehouse.province_municipality.provinceMunicipality }}</h2>
                    <h2 v-if="WHmanager && WHmanager.length > 0"><strong>Mã trưởng điểm: </strong>WH_{{
                        WHmanager[0].warehouse &&
                        WHmanager[0].warehouse.provinceMunicipalityId
                        ? WHmanager[0].warehouse.provinceMunicipalityId
                        : 'N/A' }}_MANAGER_{{ WHmanager[0].accountId }}</h2>
                </span>
                <span class="col-start-6 col-end-7 row-start-1 mx-auto">
                    <button v-on:click="this.createdANewAcc()" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 mt-2 
                    mx-4 md:text-base sm:text-sm text-xs rounded btn cursor-pointer shadow-lg">
                        Thêm tài khoản
                    </button>
                </span>
                <span class="flex col-start-5 col-end-7 row-start-2 w-11/12 mt-6 mx-auto items-center justify-center">
                    <svg class="w-8 h-8 mx-2" xmlns="http://www.w3.org/2000/svg" width="800px" height="800px"
                        viewBox="0 0 24 24" fill="none">
                        <path
                            d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                            stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <input type="text" class="w-full rounded-lg" placeholder="Search" v-model="searchInput">
                </span>
            </div>

            <hr class="my-4 mx-auto w-10/12">

            <div class="max-w-fit w-10/12 mx-auto" id="course">
                <table>
                    <tr>
                        <th
                            class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">
                            Mã tài khoản</th>
                        <th
                            class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">
                            Tên</th>
                        <th
                            class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">
                            Email</th>
                        <th
                            class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">
                            SĐT</th>
                        <th
                            class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">
                            Chỉnh sửa</th>
                        <th
                            class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">
                            Xóa</th>
                    </tr>
                    <tr v-for="account in displayedItemList">
                        <td class="py-2 px-4 border text-center items-center justify-center md:text-base sm:text-sm text-xs">{{
                            account.accountId }}</td>
                        <td class="py-2 px-4 border text-center items-center justify-center md:text-base sm:text-sm text-xs truncate">{{
                            account.firstName + ' ' + account.lastName }}</td>
                        <td class="py-2 px-4 border text-center items-center justify-center md:text-base sm:text-sm text-xs truncate">{{
                            truncateText(account.email, 20) }}</td>
                        <td class="py-2 px-4 border text-center items-center justify-center md:text-base sm:text-sm text-xs truncate">{{
                            account.phone }}</td>
                        <td class="py-2 px-4 border text-center items-center justify-center">
                        <td class="flex my-4 mx-auto text-center items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                class="w-8 h-8 cursor-pointer hover:opacity-30 hover:shadow-lg" width="800px" height="800px"
                                viewBox="0 0 24 24" fill="none" @click="updateAccount(account)">
                                <path
                                    d="M18.4721 16.7023C17.3398 18.2608 15.6831 19.3584 13.8064 19.7934C11.9297 20.2284 9.95909 19.9716 8.25656 19.0701C6.55404 18.1687 5.23397 16.6832 4.53889 14.8865C3.84381 13.0898 3.82039 11.1027 4.47295 9.29011C5.12551 7.47756 6.41021 5.96135 8.09103 5.02005C9.77184 4.07875 11.7359 3.77558 13.6223 4.16623C15.5087 4.55689 17.1908 5.61514 18.3596 7.14656C19.5283 8.67797 20.1052 10.5797 19.9842 12.5023M19.9842 12.5023L21.4842 11.0023M19.9842 12.5023L18.4842 11.0023"
                                    stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M12 8V12L15 15" stroke="#000000" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </td>
                        </td>
                        <td class="py-2 px-4 border text-center items-center justify-center">
                        <td class="flex my-4 mx-auto text-center items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                class="w-8 h-8 cursor-pointer hover:opacity-30 hover:shadow-lg" width="800px" height="800px"
                                viewBox="0 0 24 24" fill="none" @click="deleteAccount(account)">
                                <path d="M10 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M14 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                                    stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </td>
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
                    <h1 v-if="this.updating" class="inline-flex font-semibold lg:text-xl md:text-lg sm:text-base text-sm">
                        Chỉnh sửa tài khoản nhân viên tại điểm tập kết số {{ manager_WH.warehouseId }} <br>
                        ID: {{ this.accountSelectedId }}
                    </h1>
                    <h1 v-else class="inline-flex font-semibold lg:text-xl md:text-lg sm:text-base text-sm">
                        Tạo mới tài khoản nhân viên tại điểm tập kết số {{ manager_WH.warehouseId }}
                    </h1>
                </span>
                <br>
                <span class="col-start-6 mx-auto">
                    <button v-on:click="this.createdANewAcc()" class="bg-green-500 hover:bg-green-700 hover:shadow-xl text-white font-bold 
                    md:text-base sm:text-sm text-xs py-2 px-4 rounded cursor-pointer hover:shadow-lg btn">
                        Hủy bỏ
                    </button>
                </span>
            </div>

            <hr class="my-2 mx-auto">

            <div class="" id="course">
                <form ref="accForm" @submit="handleSubmit"
                    class="bg-white items-center shadow-lg rounded px-8 pt-6 pb-8 mb-4" novalidate autocapitalize="off">
                    <br>
                    <h2><strong>Thông tin cá nhân:</strong></h2>
                    <br>
                    <label for="username">Tên đăng nhập</label>
                    <input v-if="!this.updating" type="text" id="username" name="username" placeholder="Nhập tên đăng nhập"
                        v-model="form.username" class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                        sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs hover:shadow-lg">
                    <input v-else type="text" id="username" name="username" placeholder="Nhập tên đăng nhập"
                        v-model="form.username" class="block w-2/4 rounded-md border-0 py-1.5 text-black-300 
                    bg-gray-300 sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs" readonly>
                    <p class="error" v-if="userNameError.length > 0">{{ userNameError[0] }}<br></p>
                    <br>
                    <label for="password">Mật khẩu</label>
                    <input type="password" id="password" name="password" placeholder="Nhập mật khẩu" v-model="form.password"
                        class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                        sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs hover:shadow-lg">
                    <p class="error" v-if="passwordError.length > 0">{{ passwordError[0] }}<br></p>
                    <br>
                    <label for="re-password">Nhập lại mật khẩu</label>
                    <input type="password" id="re-password" name="re-password" placeholder="Nhập lại mật khẩu"
                        v-model="repassword" class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                        sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs hover:shadow-lg">
                    <p class="error" v-if="repasswordError.length > 0">{{ repasswordError[0] }}<br></p>
                    <br>
                    <label for="firstname">Họ</label>
                    <input type="text" id="firstname" name="firstname" placeholder="Nhập tên họ" v-model="form.firstName"
                        class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                        sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs hover:shadow-lg">
                    <p class="error" v-if="firstNameError.length > 0">{{ firstNameError[0] }}<br></p>
                    <br>
                    <label for="lastname">Tên</label>
                    <input type="text" id="lastname" name="lastname" placeholder="Nhập tên đệm" v-model="form.lastName"
                        class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                        sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs hover:shadow-lg">
                    <p class="error" v-if="lastNameError.length > 0">{{ lastNameError[0] }}<br></p>
                    <br>
                    <label for="email">Email</label>
                    <input type="text" id="email" name="email" placeholder="Nhập email" v-model="form.email" class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                        sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs hover:shadow-lg">
                    <p class="error" v-if="emailError.length > 0">{{ emailError[0] }}<br></p>
                    <br>
                    <label for="phone">Số điện thoại</label>
                    <input type="text" id="phone" name="phone" placeholder="Nhập số điện thoại" v-model="form.phone" class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                        sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs hover:shadow-lg">
                    <p class="error" v-if="phoneError.length > 0">{{ phoneError[0] }}<br></p>
                    <br>
                    <label for="citizenCard">Số CCCD:</label>
                    <input type="text" id="citizen" name="citizen" placeholder="Nhập số CCCD vào đây"
                        v-model="form.citizenIdentityCardNumber" class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                        sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs hover:shadow-lg">
                    <p class="error" v-if="citizenCardImgError.length > 0">{{ citizenCardImgError[0] }}<br></p>

                    <br>
                    <button v-if="this.updating" type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded
                        md:text-base sm:text-sm text-xs hover:shadow-lg cursor-pointer">Cập nhật tài
                        khoản</button>

                    <button v-else type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded
                        md:text-base sm:text-sm text-xs hover:shadow-lg cursor-pointer">Tạo tài
                        khoản</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
// import "./assets/general_css/style.css";
import { mapMutations, mapState } from 'vuex';
import axios from 'axios';
export default {
    name: 'WarehouseManagerManageAccount',
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
            accounts: [],
            userNameError: [],
            passwordError: [],
            repasswordError: [],
            firstNameError: [],
            lastNameError: [],
            emailError: [],
            phoneError: [],
            citizenCardImgError: [],
            createNew: false,
            itemsPerPage: 4,
            currentPage: 1,
            WHmanager: [],
            updating: false,
            accountSelectedId: 0,
            searchInput: '',
            aboutMe: {
                accountId: '',
                firstName: '',
                lastName: '',
                phone: '',
                email: '',
                citizenIdentityCardNumber: '',
            }
        }
    },
    methods: {
        ...mapMutations(['scrollToTop', 'setLogged', 'setLeadership', 'setLeadershipAccessToken',
            'setLeadershipRefreshToken', 'setManagerDC', 'setDCManagerAccessToken', 'setDCManagerRefreshToken',
            'setManagerWH', 'setWHManagerAccessToken', 'setWHManagerRefreshToken', 'setTellerDC', 'setStaffWH']),
        async fetchAccountsData() {
            try {
                let res = await axios.get(`/offices/${this.manager_WH.warehouseId}/accounts/6`, {
                    headers: { "Authorization": `Bearer ${this.managerWHToken.accessToken}` }
                }, { withCredentials: true });
                this.accounts = res.data;

            } catch (err) {
                if (err.response.data.error == 'jwt expired') {
                    await this.refreshToken();
                    await this.fetchAccountsData();
                }
                alert(err.respone.data.error);
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
        async refreshToken() {
            let res = await axios.post('/refresh', {
                refreshToken: this.managerWHToken.refreshToken,
                withCredentials: true
            }, {
                headers:
                {
                    'x_authorization': `${this.managerWHToken.accessToken}`,
                }, withCredentials: true
            });

            this.setWHManagerAccessToken(res.data);
        },
        async handleCreateAccount() {
            try {
                let res = await axios.post('/signup', this.form, {
                    headers: { "Authorization": `Bearer ${this.managerWHToken.accessToken}` }
                }, { withCredentials: true });
                if (res.data) {
                    this.fetchAccountsData();
                    this.createdANewAcc();
                }
            } catch (err) {
                if (err.response && err.response.data.error === 'jwt expired') {
                    await this.refreshToken();
                    await this.handleCreateAccount();
                }
                else if (err.response && err.response.data.error == 'Username is already exists') {
                    this.userNameError.push("Tên đăng nhập đã tồn tại, hãy chọn tên khác!")
                } else if (err.response && err.respone.data.error == 'Phone is already exists') {
                    this.phoneError.push('Số điện thoại bị trùng! Hãy nhập số khác')
                } else if (err.response && err.respone.data.error == 'Email is already exists') {
                    this.emailError.push('Email bị trùng! Hãy chọn email khác!')
                } else if (err.response && err.respone.data.error == 'Identity number is already exists') {
                    this.citizenCardImgError.push('Số CCCD bị trùng! Hãy nhập CCCD khác!')
                } else {
                    alert("Tạo tài khoản thành công!");
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
        createdANewAcc() {
            this.updating = false,
            this.resetError();
            this.form.username = "";
            this.form.password = "";
            this.repassword = "";
            this.form.firstName = "";
            this.form.lastName = "";
            this.form.email = "";
            this.form.phone = "";
            this.form.citizenIdentityCardNumber = "";
            this.createNew = !this.createNew;

        },
        preSubmit() {
            this.form.accountTypeId = 6;
            this.form.warehouseId = this.WHmanager[0].warehouseId;
        },
        resetError() {
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
            if (this.passwordError.length != 0
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
                if (this.updating) {
                    await this.handleUpdateAccount();
                } else {
                    await this.handleCreateAccount();
                }
            }
        },

        async handleUpdateAccount() {
            try {
                let res = await axios.put(`/updateAccount/${this.accountSelectedId}`, this.form, {
                    headers: { "Authorization": `Bearer ${this.managerWHToken.accessToken}` }
                }, { withCredentials: true });
                this.fetchAccountsData();
                this.createdANewAcc();
            } catch (err) {
                if (err.response && err.response.data.error === 'jwt expired') {
                    await this.refreshToken();
                    await this.handleUpdateAccount();
                }
                else if (err.response && err.response.data.error == 'Username is already exists') {
                    this.userNameError.push("Tên đăng nhập đã tồn tại, hãy chọn tên khác!")
                } else if (err.response && err.respone.data.error == 'Phone is already exists') {
                    this.phoneError.push('Số điện thoại bị trùng! Hãy nhập số khác')
                } else if (err.response && err.respone.data.error == 'Email is already exists') {
                    this.emailError.push('Email bị trùng! Hãy chọn email khác!')
                } else if (err.response && err.respone.data.error == 'Identity number is already exists') {
                    this.citizenCardImgError.push('Số CCCD bị trùng! Hãy nhập CCCD khác!')
                } else {
                    alert("Tạo tài khoản thành công!");
                }
            }
        },

        async deleteAccount(account) {
            try {
                let res = await axios.delete(`/deleteAccount/${account.accountId}`, {
                    headers: { "Authorization": `Bearer ${this.managerWHToken.accessToken}` }
                }, { withCredentials: true })
                if (res.data) {
                    this.fetchAccountsData();
                }
            } catch (error) {
                console.log("delete Error");
            }
        },

        updateAccount(account) {
            this.accountSelectedId = account.accountId;
            this.updating = true;
            this.createNew = !this.createNew;
            this.form.username = account.username;
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
        escapeRegExp(text) {
            // Function to escape special characters in a string for regex
            return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        },

        test() {
            if(this.manager_WH) {
                console.log(this.manager_WH.accountId)
            }
        }
    },

    computed: {
        ...mapState(['isLogin', 'leadership', 'leadershipToken', 'manager_DC', 'managerDCToken', 'manager_WH', 'managerWHToken',
            'staff_WH', 'teller_DC']),
        totalPages() {
            return Math.ceil(this.accounts.length / this.itemsPerPage);
        },
        displayedItemList() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.searchInput != ''
                ? this.accounts.filter((t) => new RegExp(this.escapeRegExp(this.searchInput), 'i').test(t.firstName + t.lastName)).
                    slice(startIndex, endIndex)
                : this.accounts.slice(startIndex, endIndex);    
        },
        getters: {
            me: state => {
            return state.todos.filter(todo => todo)
        }
     }
    },
    created() {
        this.fetchAccountsData();
        this.getManager();
    }
}
</script>

<style></style>