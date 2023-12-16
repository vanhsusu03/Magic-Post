<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img src="../assets/img/logo.png" alt="" class="mx-auto h-20 w-auto">
            <h2 class="text-2xl font-medium font-sans">Đăng nhập</h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form @submit="handleSubmit" class="space-y-6" novalidate autocomplete="off">
                <!-- <div> -->
                <div class="flex items-center justify-between">
                    <label for="username" class="block text-sm font-medium leading-6 text-gray-900 font-sans">Tên đăng
                        nhập</label>

                </div>
                <div class="mt-2">
                    <input id="username" name="username" type="text" placeholder="Tên đăng nhập" v-model="form.username"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                        sm:text-sm sm:leading-6" />
                    <p class="error" v-if="usernameError.length > 0">{{ usernameError[0] }}</p>
                </div>
                <!-- </div> -->

                <!-- <div> -->
                <div class="flex items-center justify-between">
                    <label for="password" class="block text-sm font-medium leading-6 text-gray-900 font-sans">Mật
                        khẩu</label>
                    <div class="text-sm">
                        <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500 font-sans">Quên mật
                            khẩu?</a>
                    </div>
                </div>
                <div class="mt-2">
                    <input id="password" name="password" type="password" placeholder="Mật khẩu" v-model="form.password"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                         ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                          sm:text-sm sm:leading-6" />
                    <p class="error" v-if="passwordError.length > 0">{{ passwordError[0] }}</p>
                </div>
                <!-- </div> -->

                <!-- <div> -->
                <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm 
                        font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline 
                        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 
                        font-sans font-bold">Đăng nhập</button>
                <!-- </div> -->
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import "../assets/general_css/style.css";
import { mapMutations } from 'vuex';
export default {
    name: 'Login',
    data() {
        return {
            form: {
                username: "",
                password: "",
            },
            usernameError: [],
            passwordError: [],
        }
    },

    methods: {
        ...mapMutations(['scrollToTop', 'setLogged', 'setLeadership', 'setManagerDC', 'setManagerWH', 'setTellerDC', 'setStaffWH']),
        async handleLogin() {
            try {
                let res = await axios.post('/login', this.form, { withCredentials: true });
                let user = res.data.account;
                if (user.accountTypeId == 2) {
                    this.setLeadership(user);
                } else if (user.accountTypeId == 3) {
                    this.setManagerDC(user);
                } else if (user.accountTypeId == 4) {
                    this.setTellerDC(user);
                } else if (user.accountTypeId == 5) {
                    this.setManagerWH(user);
                } else if (user.accountTypeId == 6) {
                    this.setStaffWH(user);
                }
                this.setLogged(true);
                this.$router.push("/manager");
            } catch (err) {
                if (err.response.data.error === 'Username does not exist') {
                    this.usernameError.push('Tên đăng nhập không tồn tại! Hãy thử lại.');
                } else if (err.response.data.error === 'Wrong password') {
                    this.passwordError.push('Mật khẩu sai, hãy thử lại');
                } else if (err.response.data.error === 'Login unsuccessful') {
                    alert('Đăng nhập không thành công. Lỗi không xác định!');
                }
            }
        },
        async handleSubmit(event) {

            this.usernameError = [];
            this.passwordError = [];

            if (!this.form.username) {
                this.usernameError.push('Vui lòng nhập tên đăng nhập');
            }
            if (!this.form.password) {
                this.passwordError.push('Vui lòng nhập mật khẩu');
            }
            if (!this.usernameError.length == 0 || !this.passwordError.length == 0) {
                event.preventDefault();
            }
            else {
                event.preventDefault();
                this.scrollToTop();
                await this.handleLogin();
            }
        }

    },
    created() {
        this.scrollToTop();
    }
}
</script>

<style></style>

