<template>
    <div class="bg-grey-lighter min-h-screen ">
        <div class="max-w-lg mx-auto items-center justify-center px-2">
            <form action="/signup" method="POST">
                <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 class="mb-8 text-3xl text-center">Tạo tài khoản</h1>
                    <div class="">
                        <label for="">Vai trò</label>
                    <select id="user-role" name="role"
                        class="search-select w-full h-full select2-hidden-accessible border border-grey-light p-3 rounded mb-4"
                        tabindex="-1" aria-hidden="true" data-select2-id="select2-data-office-province">
                        <option class="text-gray-900" value="">Chọn vai trò</option>
                        <option class="text-gray-900">Trưởng điểm giao dịch</option>
                        <option class="text-gray-900">Trưởng điểm tập kết</option>
                        <option class="text-gray-900">Giao dịch viên</option>
                        <option class="text-gray-900">Nhân viên điểm tập kết</option>
                    </select>
                    </div>
                    <label for="">Tên tài khoản</label>
                    <input type="text" class="block border border-grey-light w-full p-3 rounded mb-4" name="username"
                        placeholder="" required="" v-model="username"/>

                    <label for="">Mật khẩu</label>
                    <input type="password" class="block border border-grey-light w-full p-3 rounded mb-4" name="password"
                        placeholder="" required="" v-model="password"/>

                    <label for="">Xác nhận mật khẩu</label>
                    <input type="password" class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="confirm-password" placeholder="" />    

                    <label for="">Họ, tên đệm</label>
                    <input type="text" class="block border border-grey-light w-full p-3 rounded mb-4" name="firstname"
                        placeholder="" required="" v-model="first_name"/>

                    <label for="">Tên</label>
                    <input type="text" class="block border border-grey-light w-full p-3 rounded mb-4" name="lastname"
                        placeholder="" v-model="last_name"/>

                    <label for="">Email</label>
                    <input type="email" class="block border border-grey-light w-full p-3 rounded mb-4" name="email"
                        placeholder="" required="" v-model="email"/>    

                    <label for="">Số điện thoại</label>
                    <input type="text" class="block border border-grey-light w-full p-3 rounded mb-4" name="phone-number"
                        placeholder="" v-model="phone_number"/>
            
                    <button type="submit" @click="createAccount()"
                        class="flex w-full justify-center rounded-md bg-cyan-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 font-sans font-bold">Create
                        Account</button>


                </div>
            </form>



        </div>
    </div>
</template>

<script>
export default {
    name: 'CreateAccount',

    data() {
        return {
           account_type_id: '',
           username: '',
           password: '', 
           first_name: '',
           last_name: '',
           email: '',
           phone_number: '',
        }
    },

    methods: {
        async createAccount() {
            await axios.post('/signup', { withCredentials: true }).then(res => {
                res.send("asd")
            })
        }
    }
}
</script>

<style></style>