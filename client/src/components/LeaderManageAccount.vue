<template>
    <div v-if="!this.createNew" class="custom-warehouse pl-5">
        <div class="head">
            <span>
                <h1 class="inline-flex font-semibold lg:text-3xl md:text-xl sm:text-sm text-xs">
                    Danh sách tài khoản nhân viên
                </h1>
            </span>
            <span>
                <button v-on:click="this.createdANewAcc()"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded btn">
                    Thêm tài khoản
                </button>
            </span>
        </div>
        <!-- <hr> -->
        <br>
        <br>
        <div v-if="leadership">
            <h2>Chọn loại tài khoản:</h2>
            <select id="office-province" name="province_id" v-model="accountTypeSelected" @change="fetchAccountsData()"
                class="search-select w-4/12 h-full select2-hidden-accessible bg-gray-100 rounded-b-lg border-gray-300"
                tabindex="-1" aria-hidden="true" data-select2-id="select2-data-office-province">
                <option class="text-gray-900" :value="0" selected>Loại tài khoản</option>
                <option class="text-gray-900" :value="1">Tài khoản trưởng điểm tập kết</option>
                <option class="text-gray-900" :value="2">Tài khoản trưởng điểm giao dịch</option>
            </select>
            <!-- HEAD COMP MANAGE  -->
            <div class="tabcontentt" id="course">
                <table v-if="this.accountTypeSelected == 1">
                    <tr>
                        <th class="py-2 px-4 border">Mã điểm TK</th>
                        <th class="py-2 px-4 border">Tỉnh/Thành phố</th>
                        <th class="py-2 px-4 border">Mã tài khoản</th>
                        <th class="py-2 px-4 border">Tên</th>
                        <th class="py-2 px-4 border">Email</th>
                        <th class="py-2 px-4 border">SĐT</th>
                        <th class="py-2 px-4 border">Chỉnh sửa</th>
                        <th class="py-2 px-4 border">Xóa</th>
                    </tr>
                    <tr v-for="account in displayedItemList">
                        <td class="py-2 px-4 border">{{ account.warehouseId }}</td>
                        <td class="py-2 px-4 border">{{ account.warehouse.province_municipality.provinceMunicipality }}</td>
                        <td class="py-2 px-4 border">WH_{{ account.warehouse.provinceMunicipalityId }}_MANGER_{{
                            account.accountId }}</td>
                        <td class="py-2 px-4 border truncate">{{ account.firstName + ' ' + account.lastName }}</td>
                        <td class="py-2 px-4 border truncate">{{ truncateText(account.email, 20) }}</td>
                        <td class="py-2 px-4 border truncate">{{ account.phone }}</td>
                        <td class="py-2 px-4 border items-center justify-center"> <img class="w-2/4"
                                src="../assets/img/note.png" alt=""> </td>
                        <td class="py-2 px-4 border">
                            <img class="w-2/4" src="../assets/img/trash.png" alt="">
                        </td>
                    </tr>
                </table>

                <table v-if="this.accountTypeSelected == 2">
                    <tr>
                        <th class="py-2 px-4 border">Mã điểm GD</th>
                        <th class="py-2 px-4 border">Tỉnh/Thành phố</th>
                        <th class="py-2 px-4 border">Mã tài khoản</th>
                        <th class="py-2 px-4 border">Tên</th>
                        <th class="py-2 px-4 border">Email</th>
                        <th class="py-2 px-4 border">SĐT</th>
                        <th class="py-2 px-4 border">Chỉnh sửa</th>
                        <th class="py-2 px-4 border">Xóa</th>
                    </tr>
                    <tr v-for="account in displayedItemList">
                        <td class="py-2 px-4 border">{{ account.warehouseId }}</td>
                        <td class="py-2 px-4 border">{{ account.warehouse.province_municipality.provinceMunicipality }}</td>
                        <td class="py-2 px-4 border">WH_{{ account.warehouse.provinceMunicipalityId }}_MANGER_{{
                            account.accountId }}</td>
                        <td class="py-2 px-4 border truncate">{{ account.firstName + ' ' + account.lastName }}</td>
                        <td class="py-2 px-4 border truncate">{{ truncateText(account.email, 20) }}</td>
                        <td class="py-2 px-4 border truncate">{{ account.phone }}</td>
                        <td class="py-2 px-4 border items-center justify-center"> <img class="w-2/4"
                                src="../assets/img/note.png" alt=""> </td>
                        <td class="py-2 px-4 border">
                            <img class="w-2/4" src="../assets/img/trash.png" alt="">
                        </td>
                    </tr>
                </table>
                <div class="">
                    <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Previous Page</button>
                    <span class="pl-10 pr-10">Trang <strong>{{ currentPage }}</strong> trong tổng số <strong>{{ totalPages
                    }}</strong></span>
                    <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Next Page</button>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="custom-delivery-center pl-5">
        <div class="head">
            <span>
                <h1 class="inline-flex font-semibold lg:text-3xl md:text-xl sm:text-sm text-xs">
                    Tạo mới tài khoản
                </h1>
                <br>
                <br>
                <h2>Chọn loại tài khoản:</h2>
                <select id="office-province" name="province_id" v-model="accountCreateType" @change=""
                    class="search-select w-4/12 h-full select2-hidden-accessible bg-gray-100 rounded-b-lg border-gray-300"
                    tabindex="-1" aria-hidden="true" data-select2-id="select2-data-office-province">
                    <option class="text-gray-900" :value="0" selected>Loại tài khoản</option>
                    <option class="text-gray-900" :value="1">Tài khoản trưởng điểm tập kết</option>
                    <option class="text-gray-900" :value="2">Tài khoản trưởng điểm giao dịch</option>
                </select>
            </span>
            <span>
                <button v-on:click="this.createdANewAcc()"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded btn">
                    Hủy bỏ
                </button>
            </span>
        </div>
        <!-- <hr> -->
        <div class="tabcontent" id="course">
            <form ref="accForm" v-if="this.accountCreateType != 0" @submit="handleSubmit"
                class="bg-white items-center shadow-lg rounded px-8 pt-6 pb-8 mb-4" novalidate autocapitalize="off">
                <h1 v-if="this.accountCreateType == 1">Tạo tài khoản trưởng điểm tập kết</h1>
                <h1 v-if="this.accountCreateType == 2">Tạo tài khoản trưởng điểm giao dịch</h1>
                <br>
                <h2><strong>Nơi làm việc:</strong></h2>
                <br>
                <label for="province" class="info">Tỉnh/Thành phố:</label>
                <br>
                <div id="province" class="w-2/4 common-shadow-input h-[43px] select2-stupid-at-home"
                    data-select2-id="select2-data-73-3wmt">
                    <select id="office-province" name="province_id" v-model="provinceSelectedId"
                        @change="this.getAllWarehouseofAProvinces()"
                        class="search-select w-full h-full select2-hidden-accessible bg-gray-100 rounded-b-lg border-gray-300"
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
                <div id="warehouse" class="w-2/4 common-shadow-input h-[43px] select2-stupid-at-home"
                    data-select2-id="select2-data-73-3wmt">
                    <select id="office-province" name="province_id" v-model="warehouseSelectedId"
                        class="search-select w-full h-full select2-hidden-accessible bg-gray-100 rounded-b-lg border-gray-300"
                        tabindex="-1" aria-hidden="true" data-select2-id="select2-data-office-province">
                        <option class="text-gray-900" :value="0">Điểm tập kết</option>
                        <option class="text-gray-900 w-2/4" v-for="warehouse in wareHouses" :value="warehouse.warehouseId"
                            :key="warehouse.warehouseId">{{
                                truncateText(warehouse.address, 80) }}</option>
                    </select>
                </div>
                <p class="error" v-if="this.warehouseError.length > 0">{{ warehouseError[0] }}</p>
                <br>
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
                <label for="citizenCard">Link ảnh CCCD:</label>
                <input type="text" id="citizen" name="citizen" placeholder="Gắn link vào đây"
                    v-model="form.citizenIdentityCardImage" class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                         ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                          sm:text-sm sm:leading-6">
                <p class="error" v-if="citizenCardImgError.length > 0">{{ citizenCardImgError[0] }}</p>
                <br>

                <br>
                <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Tạo tài
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
                citizenIdentityCardImage: '',
            },
            repassword: '',
            accountTypeSelected: 0,
            accountCreateType: 0,
            provinceSelectedId: 0,
            warehouseSelectedId: 0,
            deliverycenterSelectedId: 0,
            accounts: [],
            provinces: [],
            wareHouses: [],
            provinceError: [],
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
        }
    },
    methods: {
        ...mapMutations(['scrollToTop']),
        async fetchAccountsData() {
            try {
                if (this.accountTypeSelected == 1 || this.accountCreateType == 1) {
                    let res = await axios.get('/warehouses/manager', { withCredentials: true });
                    this.accounts = res.data;
                } else if (this.accountTypeSelected == 2 || this.accountCreateType == 2) {
                    let res = await axios.get('/warehouses/manager', { withCredentials: true });
                    this.accounts = res.data;
                }
            } catch (err) {
                alert(err.respone.data.error);
            }
        },

        async handleCreateAccount() {
            try {
                let res = await axios.post('/signup', this.form, { withCredentials: true });
                if (res.data) {
                    this.fetchAccountsData();
                    this.accountCreateType = 0;
                    this.$refs.accForm.reset();
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
        createdANewAcc() {
            this.resetError();
            this.accountCreateType = 0;
            this.accountTypeSelected = 0;
            this.warehouseSelectedId = 0;
            this.deliverycenterSelectedId = 0;
            this.form.username = "";
            this.form.password = "";
            this.repassword = "";
            this.form.firstName = "";
            this.form.lastName = "";
            this.form.email = "";
            this.form.phone = "";
            this.form.citizenIdentityCardImage = "";
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

            if (!this.form.citizenIdentityCardImage) {
                this.citizenCardImgError.push("Hãy nhập số CCCD!")
            } else if (!/[0-9]{10}/.test(this.form.citizenIdentityCardImage)) {
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
        ...mapState(['isLogin', 'leadership', 'manager_DC', 'manager_WH', 'staff_WH', 'teller_DC']),
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

<style>
* {
    /* display: block; */
}

h1 {
    font-size: 30px;
}

.custom-warehouse {
    width: 100%;
    /* Set the width to 100% to take up the full width */
    /* Add other styling if needed */
}

.btn {
    float: right;
    margin-right: 20%;
}

/* .sub, .province, .district {
  border-radius: 5px;
} */
.tabcontentt {
    float: left;
    padding: 0px 12px;
    border: 1px solid #ccc;
    width: 80%;
    border-left: none;
    height: auto;
    /* display: none; */
    /* position: relative; */
}

table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 70%;
    margin-left: 50%;
    transform: translateX(-50%);
    margin-top: 10px;
    margin-bottom: 10px;
    counter-reset: tableCount;
}
</style>