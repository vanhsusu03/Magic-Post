<template>
    <div id="container">
        <div v-if="!this.createNew" class="w-10/12 h-10/12 mx-auto">
            <div class="w-8/12 grid grid-cols-6 mx-auto">
                <span class="col-start-1 col-end-5 max-w-fit">
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
                <span class="col-start-6">
                    <button v-on:click="this.createdANewAcc()" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 mt-2 
                    mx-4 md:text-base sm:text-sm text-xs rounded btn cursor-pointer shadow-lg">
                        Thêm tài khoản
                    </button>
                </span>
            </div>

            <hr class="my-2 mx-auto w-9/12">

            <div class="w-9/12 mx-auto" id="course">
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
                        <td class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs">{{
                            account.accountId }}</td>
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
                    <input type="text" id="username" name="username" placeholder="Nhập tên đăng nhập"
                        v-model="form.username" class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                        sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs hover:shadow-lg">
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
                    <button type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded
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
                if (err.response.data.error == 'jwt expired') {
                    await this.refreshToken();
                    await this.handleCreateAccount();
                }
                else if (err.response.data.error == 'Username is already exists') {
                    this.userNameError.push("Tên đăng nhập đã tồn tại, hãy chọn tên khác!")
                } else if (err.respone.data.error == 'Phone is already exists') {
                    this.phoneError.push('Số điện thoại bị trùng! Hãy nhập số khác')
                } else if (err.respone.data.error == 'Email is already exists') {
                    this.emailError.push('Email bị trùng! Hãy chọn email khác!')
                } else if (err.respone.data.error == 'Identity number is already exists') {
                    this.citizenCardImgError.push('Số CCCD bị trùng! Hãy nhập CCCD khác!')
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
        ...mapState(['isLogin', 'leadership', 'leadershipToken', 'manager_DC', 'managerDCToken', 'manager_WH', 'managerWHToken',
            'staff_WH', 'teller_DC']),
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
        this.fetchAccountsData();
        this.getManager();
    }
}
</script>

<style></style>