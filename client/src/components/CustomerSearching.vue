<template>
    <!-- Nav -->
    <div class="flex gap-x-1 h-full">
        <span @click="showTab = 0" :class="{ 'currentIndex bg-cyan-100 hover:bg-cyan-200': showTab == 0 }"
            class="rounded-t-lg lg:block px-2 lg:px-8 py-2 lg:py-4 hover:bg-gray-100 text-gray-900 text-md  my-tab cursor-pointer">Tra
            cứu đơn hàng</span>
        <span @click="showTab = 1" :class="{ 'currentIndex bg-cyan-100 hover:bg-cyan-200': showTab == 1 }"
            class="rounded-t-lg lg:block px-2 lg:px-8 py-2 lg:py-4 hover:bg-gray-100 text-gray-900 text-md  my-tab cursor-pointer">Tra
            cứu điểm giao dịch</span>
    </div>

    <!-- Product Search -->
    <!-- Product code input form -->
    <div id="search-wrap" class="max-w-3xl" v-if="showTab == 0">
        <form @submit.prevent="showStatus">
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"></label>
            <div class="relative mx-auto">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input type="search" id="default-search" v-model="data"
                    class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-b-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Nhập mã đơn..." required>
                <button type="submit"
                    class="text-white absolute end-2.5 bottom-2.5 bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Tìm
                    kiếm</button>
            </div>


        </form>
        <!-- Show product status -->
        <div class="product-status" v-if="show">
            <div class="status rounded-md font-sans" :class="s1">
                status1
            </div>
            <div class="status rounded-md font-sans" :class="s2">
                status2
            </div>
            <div class="status rounded-md font-sans" :class="s3">
                status3
            </div>

            <div class="information rounded-3xl bg-gray-100 grid gap-10 row-gap-6 grid-cols-1">
                <div id="sender-info" class="col-span-1 px-4 mx-4">
                    <div id="sender-name" class="text-left font-sans">
                        <label for="" class="font-bold">Người gửi:</label>
                        Nguyễn Văn A
                    </div>

                    <div id="sender-address" class="text-left font-sans">
                        <label for="" class="font-bold">Địa chỉ bên gửi: </label>
                    </div>

                    <div id="sender-phone" class="text-left font-sans">
                        <label for="" class="font-bold">Số điện thoại người gửi :</label>
                        0355
                    </div>
                </div>

                <div id="receiver-info" class="col-span-1 w-max px-4 mx-4">
                    <div id="receiver-name" class="text-left font-sans">
                        <label for="" class="font-bold">Người nhận:</label>
                    </div>
                    <div id="receiver-address" class="text-left font-sans">
                        <label for="" class="font-bold">Địa chỉ bên nhận: </label>
                    </div>
                    <div id="receiver-phone" class="text-left font-sans">
                        <label for="" class="font-bold">Số điện thoại người nhận: </label>
                    </div>
                </div>

            </div>
        </div>
        {{ query }}
    </div>

    <!-- Post Office Search -->
    <div class="max-w-3xl" v-if="showTab == 1">
        <div class="flex items-center justify-center flex-col w-full gap-[12px] md:flex-row overflow-hidden h-full">
            <div id="province" class="w-full common-shadow-input h-[43px] select2-stupid-at-home" data-select2-id="select2-data-73-3wmt">
                <select id="office-province" name="province_id"
                    class="search-select w-full h-full select2-hidden-accessible bg-gray-100 rounded-b-lg border-gray-300" tabindex="-1" aria-hidden="true"
                    data-select2-id="select2-data-office-province">
                    <option class="text-gray-900" value="">Tỉnh/ Thành phố</option>
                    <option class="text-gray-900" value="">Ninh Bình</option>
                </select>
            </div>

            <div id="district" class="common-shadow-input w-full h-[43px] select2-stupid-at-home">
                <select id="slDistrict" name="district_id" class="search-select w-full h-full select2-hidden-accessible bg-gray-100 border-gray-300"
                    tabindex="-1" aria-hidden="true">
                    <option class="text-gray-900" value="">Quận/huyện</option>
                </select>
            </div>

            <div class="flex items-center  w-full md:w-[180px]">
                <button class="w-full md:w-[180px] mr-0 lg:mr-2 bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[16px] h-[45px] rounded-[2px] text-white">
                    Tìm kiếm
                </button>
            </div>
        </div>
</div></template>

<script>
export default {
    name: 'CustomerSearching',
    data() {
        return {
            data: '',
            query: '',
            s1: "",
            s2: "",
            s3: "",
            show: false,
            showTab: 1
        }
    },

    methods: {
        showStatus() {
            this.show = true;
            if (this.data == 1) {
                this.s1 = "bg-green-400";
            }

            if (this.data == 2) {
                this.s2 = "bg-green-400";
            }

            if (this.data == 3) {
                this.s3 = "bg-green-400";
            }
        },

        clearData() {

        }
    }
}
</script>

<style>
.status {
    border: 1.5px solid black;
    padding: 20px;
    margin: 20px;
    width: max-content;
    display: inline-block;

}

#province {
    border: 1px solid gray;
}

#district {
    border: 1px solid gray;
}
</style>