<template>
    <aside class="bg-slate-50 z-20 hidden w-64 h-screen overflow-y-auto dark:bg-gray-800 md:block flex-shrink-0 border-gray-200 border-r border-t border-b">
        <div class="py-4 text-gray-500 dark:text-gray-400">
            <a class="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200" href="#">
                Magic Post
            </a>
            <ul class="mt-6">
                <li class="relative px-6 py-3">
                    <span v-show="selecteds[0]"
                        class="absolute inset-y-0 left-0 w-1 bg-cyan-400 rounded-tr-lg rounded-br-lg" aria-hidden="true">
                    </span>
                    <a @click="display(0)" v-if="selecteds"
                        class="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100 cursor-pointer">
                        <svg class="w-5 h-5" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6">
                            </path>
                        </svg>
                        <span class="ml-4">Trang chủ
                        </span>
                    </a>
                </li>

                <li v-if="!teller_DC.username && !staff_WH.username" class="relative px-6 py-3">
                    <span v-show="selecteds[1]"
                        class="absolute inset-y-0 left-0 w-1 bg-cyan-400 rounded-tr-lg rounded-br-lg"
                        aria-hidden="true"></span>
                    <a @click="display(1)"
                        class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer">
                        <svg class="w-5 h-5" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                d="M9.6,3.32a3.86,3.86,0,1,0,3.86,3.85A3.85,3.85,0,0,0,9.6,3.32M16.35,11a.26.26,0,0,0-.25.21l-.18,1.27a4.63,4.63,0,0,0-.82.45l-1.2-.48a.3.3,0,0,0-.3.13l-1,1.66a.24.24,0,0,0,.06.31l1,.79a3.94,3.94,0,0,0,0,1l-1,.79a.23.23,0,0,0-.06.3l1,1.67c.06.13.19.13.3.13l1.2-.49a3.85,3.85,0,0,0,.82.46l.18,1.27a.24.24,0,0,0,.25.2h1.93a.24.24,0,0,0,.23-.2l.18-1.27a5,5,0,0,0,.81-.46l1.19.49c.12,0,.25,0,.32-.13l1-1.67a.23.23,0,0,0-.06-.3l-1-.79a4,4,0,0,0,0-.49,2.67,2.67,0,0,0,0-.48l1-.79a.25.25,0,0,0,.06-.31l-1-1.66c-.06-.13-.19-.13-.31-.13L19.5,13a4.07,4.07,0,0,0-.82-.45l-.18-1.27a.23.23,0,0,0-.22-.21H16.46M9.71,13C5.45,13,2,14.7,2,16.83v1.92h9.33a6.65,6.65,0,0,1,0-5.69A13.56,13.56,0,0,0,9.71,13m7.6,1.43a1.45,1.45,0,1,1,0,2.89,1.45,1.45,0,0,1,0-2.89Z" />
                        </svg>

                        <span class="ml-4">Quản lí tài khoản</span>
                    </a>
                </li>

                <li v-if="leadership" class="relative px-6 py-3">
                    <span v-show="selecteds[2]"
                        class="absolute inset-y-0 left-0 w-1 bg-cyan-400 rounded-tr-lg rounded-br-lg"
                        aria-hidden="true"></span>

                    <a @click="display(2)"
                        class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer">
                        <svg class="w-5 h-5" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="2" viewBox="0 0 48 48" stroke="currentColor">
                            <path
                                d="M35.8,11a3.2,3.2,0,0,0-2.2-1H32V8a2.9,2.9,0,0,0-3-3H5A2.9,2.9,0,0,0,2,
                                8V35a2.9,2.9,0,0,0,3,3H7.3a7,7,0,0,0,13.4,0h6.6a7,7,0,0,0,13.4,0H43a2.9,
                                2.9,0,0,0,3-3V22.2Zm-2.7,3,7.3,8H32V14ZM6,9H28V32.4a7.7,7.7,0,0,0-.7,
                                1.6H20.7A7,7,0,0,0,7.3,34H6Zm8,30a3,3,0,1,1,3-3A2.9,2.9,0,0,1,14,39Zm20,
                                0a3,3,0,1,1,3-3A2.9,2.9,0,0,1,34,39Zm6.7-5A7,7,0,0,0,34,29a6.4,6.4,0,0,0-2,.3V26H42v8Z" />
                        </svg>
                        <span class="ml-4">Quản lí điểm giao dịch</span>
                    </a>
                </li>

                <li v-if="leadership" class="relative px-6 py-3">
                    <span v-show="selecteds[3]"
                        class="absolute inset-y-0 left-0 w-1 bg-cyan-400 rounded-tr-lg rounded-br-lg"
                        aria-hidden="true"></span>
                    <a @click="display(3)"
                        class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#858585"
                            class="w-5 h-5" version="1.1" id="Capa_1" viewBox="0 0 489.475 489.475" xml:space="preserve"
                            stroke="#858585">

                            <g id="SVGRepo_bgCarrier" stroke-width="0" />

                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

                            <g id="SVGRepo_iconCarrier">
                                <g>
                                    <g>
                                        <path
                                            d="M487.823,468.675v-346.4c0-8.3-4.2-15.6-11.4-18.7l-223.7-102c-5.2-2.1-11.4-2.1-16.6,0l-223.7,102 c-7.3,3.1-11.4,10.4-11.4,18.7v346.4c0,11.4,9.4,20.8,20.8,20.8s20.8-9.4,20.8-20.8v-332.9l203.9-92.6l202.8,92.6v332.9 c0,11.4,9.4,20.8,20.8,20.8S491.023,480.175,487.823,468.675z" />
                                        <path
                                            d="M313.123,285.575c11.4,0,20.8-9.4,20.8-20.8v-134.2c0-11.4-9.4-20.8-20.8-20.8h-134.2c-11.4,0-20.8,9.4-20.8,20.8v134.2 c0,11.4,9.4,20.8,20.8,20.8H313.123z M199.723,152.475h92.6v92.6h-92.6V152.475z" />
                                        <path
                                            d="M213.223,313.675h-134.2c-11.4,0-20.8,9.4-20.8,20.8v134.2c0,11.4,9.4,20.8,20.8,20.8h134.2c11.4,0,20.8-9.4,20.8-20.8 v-134.2C234.023,323.075,224.623,313.675,213.223,313.675z M192.423,448.975h-92.6v-92.6h92.6V448.975z" />
                                        <path
                                            d="M412.923,313.675h-134.2c-11.4,0-20.8,9.4-20.8,20.8v134.2c0,11.4,9.4,20.8,20.8,20.8h134.2c11.4,0,20.8-9.4,20.8-20.8 v-134.2C433.723,323.075,424.423,313.675,412.923,313.675z M392.123,448.975h-92.6v-92.6h92.6V448.975z" />
                                    </g>
                                </g>
                            </g>

                        </svg>
                        <span class="ml-4">Quản lí điểm tập kết</span>
                    </a>
                </li>
                <li v-if="teller_DC.username" class="relative px-6 py-3">
                    <span v-show="selecteds[6]"
                        class="absolute inset-y-0 left-0 w-1 bg-cyan-400 rounded-tr-lg rounded-br-lg"
                        aria-hidden="true"></span>
                    <a @click="display(6)"
                        class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer">
                        <!-- Replace the existing icon with a parcel icon -->
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
                            <rect x="2" y="2" width="20" height="9" />
                            <path d="M2 14L12 7.5L22 14" />
                        </svg>
                        <!-- End of icon replacement -->
                        <span class="ml-4">Quản lí đơn hàng tại điểm giao dịch</span>
                    </a>
                </li>

                <li class="relative px-6 py-3">
                    <span v-show="selecteds[4]"
                        class="absolute inset-y-0 left-0 w-1 bg-cyan-400 rounded-tr-lg rounded-br-lg"
                        aria-hidden="true"></span>

                    <a @click="display(4)"
                        class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer">
                        <svg class="w-5 h-5" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                            <path d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
                        </svg>
                        <span class="ml-4">Thống kê</span>
                    </a>
                </li>

                <li class="relative px-6 py-3">
                    <span v-show="selecteds[5]"
                        class="absolute inset-y-0 left-0 w-1 bg-cyan-400 rounded-tr-lg rounded-br-lg"
                        aria-hidden="true"></span>

                    <a @click="display(5)"
                        class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 48 48" fill="none" stroke="">

                            <g id="SVGRepo_bgCarrier" stroke-width="0" />

                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

                            <g id="SVGRepo_iconCarrier">
                                <rect width="48" height="48" fill="white" fill-opacity="0.01" />
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
                                    stroke="#7d7d7d" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                <path
                                    d="M24 23C26.7614 23 29 20.7614 29 18C29 15.2386 26.7614 13 24 13C21.2386 13 19 15.2386 19 18C19 20.7614 21.2386 23 24 23Z"
                                    fill="#ffffff" stroke="#7d7d7d" stroke-width="4" stroke-linejoin="round" />
                                <path
                                    d="M10.022 38.332C10.3657 33.1206 14.7016 29 20 29H28C33.2914 29 37.6229 33.1097 37.9767 38.3113"
                                    stroke="#7d7d7d" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                            </g>

                        </svg>
                        <span class="ml-4">Thông tin</span>
                    </a>
                </li>
            </ul>
        </div>
    </aside>
</template>
  
<script>
import { mapState } from 'vuex';
export default {
    name: 'SideBarManage',
    props: {
        selecteds: Array,
    },
    data() {
        return {
            selecteds: [true, false, false, false, false, false, false],
        }
    },

    methods: {
        display(t) {
            const newSelecteds = this.selecteds.map((_, index) => index === t);
            this.$emit('update:selecteds', newSelecteds);
            for (let i = 0; i < this.selecteds.length; i++) {
                if (i == t) {
                    this.selecteds[i] = true;
                } else {
                    this.selecteds[i] = false;
                }

            }
        }
    },
    computed: {
        ...mapState(['isLogin', 'leadership', 'leadershipToken', 'manager_DC', 'managerDCToken', 'manager_WH', 'managerWHToken',
            'staff_WH', 'teller_DC']),
    }
}
</script>