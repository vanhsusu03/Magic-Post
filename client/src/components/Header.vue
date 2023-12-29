<template>
    <header>
        <nav class="flex border-gray-300 border-b bg-slate-50 px-2 lg:px-6 py-0 mb-2">
            <div class="flex">
                <RouterLink to="/" @click="scrollToTop()" class="flex p-2 items-center mx-auto">
                    <img src="../assets/img/logo.png" class="h-8 sm:h-9 md:h-9 lg:h-16" alt="MagicPost Logo" />
                </RouterLink>
            </div>
            <div class="flex justify-between items-center mx-auto w-full max-w-screen-2xl">


                <div class="flex items-center justify-center lg:order-2 mx-auto lg:mx-0">
                    <RouterLink to="" class="hover:opacity-30 lg:p-2 px-6 py-2">
                        <svg class="w-10 h-10" xmlns="http://www.w3.org/2000/svg" width="800px" height="800px"
                            viewBox="0 0 192 192" fill="none">

                            <g id="SVGRepo_bgCarrier" stroke-width="0" />

                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

                            <g id="SVGRepo_iconCarrier">
                                <g stroke="#4a4a4a" stroke-linejoin="round" stroke-width="12" clip-path="url(#a)">
                                    <path
                                        d="M148.326 43.674c-28.899-28.899-75.753-28.899-104.652 0-25.014 25.014-28.377 63.481-10.087 92.112l-4.336 22.272c-.542 2.784 1.907 5.233 4.691 4.691l22.272-4.336c28.631 18.29 67.098 14.927 92.112-10.087 28.899-28.899 28.899-75.753 0-104.652Z" />
                                    <path stroke-linecap="round"
                                        d="m131.355 83.272-24.041 24.042-21.92-21.92-24.042 24.041" />
                                </g>
                                <defs>
                                    <clipPath id="a">
                                        <path fill="#ffffff" d="M0 0h192v192H0z" />
                                    </clipPath>
                                </defs>
                            </g>

                        </svg>
                    </RouterLink>
                    <RouterLink to="" href="#" class="hover:opacity-30 lg:p-2 px-6 py-2">
                        <svg class="w-10 h-10" xmlns="http://www.w3.org/2000/svg" width="800px" height="800px"
                            viewBox="0 0 24 24" fill="none">

                            <g id="SVGRepo_bgCarrier" stroke-width="0" />

                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

                            <g id="SVGRepo_iconCarrier">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M17.3545 22.2323C15.3344 21.7262 11.1989 20.2993 7.44976 16.5502C3.70065 12.8011 2.2738 8.66559 1.76767 6.6455C1.47681 5.48459 2.00058 4.36434 2.88869 3.72997L5.21694 2.06693C6.57922 1.09388 8.47432 1.42407 9.42724 2.80051L10.893 4.91776C11.5152 5.8165 11.3006 7.0483 10.4111 7.68365L9.24234 8.51849C9.41923 9.1951 9.96939 10.5846 11.6924 12.3076C13.4154 14.0306 14.8049 14.5807 15.4815 14.7576L16.3163 13.5888C16.9517 12.6994 18.1835 12.4847 19.0822 13.1069L21.1995 14.5727C22.5759 15.5257 22.9061 17.4207 21.933 18.783L20.27 21.1113C19.6356 21.9994 18.5154 22.5232 17.3545 22.2323ZM8.86397 15.136C12.2734 18.5454 16.0358 19.8401 17.8405 20.2923C18.1043 20.3583 18.4232 20.2558 18.6425 19.9488L20.3056 17.6205C20.6299 17.1665 20.5199 16.5348 20.061 16.2171L17.9438 14.7513L17.0479 16.0056C16.6818 16.5182 16.0047 16.9202 15.2163 16.7501C14.2323 16.5378 12.4133 15.8569 10.2782 13.7218C8.1431 11.5867 7.46219 9.7677 7.24987 8.7837C7.07977 7.9953 7.48181 7.31821 7.99439 6.95208L9.24864 6.05618L7.78285 3.93893C7.46521 3.48011 6.83351 3.37005 6.37942 3.6944L4.05117 5.35744C3.74413 5.57675 3.64162 5.89565 3.70771 6.15943C4.15989 7.96418 5.45459 11.7266 8.86397 15.136Z"
                                    fill="#4a4a4a" />
                            </g>

                        </svg>
                    </RouterLink>
                    <RouterLink @click="this.handleLogout()" to="" href="#" class="hover:opacity-30 lg:p-2 px-6 py-2">
                        <svg class="w-10 h-10" xmlns="http://www.w3.org/2000/svg" width="800px" height="800px"
                            viewBox="0 0 24 24" fill="none">

                            <g id="SVGRepo_bgCarrier" stroke-width="0" />

                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M9 20.7499H6C5.65324 20.7647 5.30697 20.7109 4.98101 20.5917C4.65505 20.4725 4.3558 20.2902 4.10038 20.0552C3.84495 19.8202 3.63837 19.5371 3.49246 19.2222C3.34654 18.9073 3.26415 18.5667 3.25 18.2199V5.77994C3.26415 5.43316 3.34654 5.09256 3.49246 4.77765C3.63837 4.46274 3.84495 4.17969 4.10038 3.9447C4.3558 3.70971 4.65505 3.52739 4.98101 3.40818C5.30697 3.28896 5.65324 3.23519 6 3.24994H9C9.19891 3.24994 9.38968 3.32896 9.53033 3.46961C9.67098 3.61027 9.75 3.80103 9.75 3.99994C9.75 4.19886 9.67098 4.38962 9.53033 4.53027C9.38968 4.67093 9.19891 4.74994 9 4.74994H6C5.70307 4.72412 5.4076 4.81359 5.17487 4.99977C4.94213 5.18596 4.78999 5.45459 4.75 5.74994V18.2199C4.78999 18.5153 4.94213 18.7839 5.17487 18.9701C5.4076 19.1563 5.70307 19.2458 6 19.2199H9C9.19891 19.2199 9.38968 19.299 9.53033 19.4396C9.67098 19.5803 9.75 19.771 9.75 19.9699C9.75 20.1689 9.67098 20.3596 9.53033 20.5003C9.38968 20.6409 9.19891 20.7199 9 20.7199V20.7499Z"
                                    fill="#4a4a4a" />
                                <path
                                    d="M16 16.7499C15.9015 16.7504 15.8038 16.7312 15.7128 16.6934C15.6218 16.6556 15.5392 16.6 15.47 16.5299C15.3296 16.3893 15.2507 16.1987 15.2507 15.9999C15.2507 15.8012 15.3296 15.6105 15.47 15.4699L18.94 11.9999L15.47 8.52991C15.3963 8.46125 15.3372 8.37845 15.2962 8.28645C15.2552 8.19445 15.2332 8.09513 15.2314 7.99443C15.2296 7.89373 15.2482 7.7937 15.2859 7.70031C15.3236 7.60692 15.3797 7.52209 15.451 7.45087C15.5222 7.37965 15.607 7.32351 15.7004 7.28579C15.7938 7.24807 15.8938 7.22954 15.9945 7.23132C16.0952 7.23309 16.1945 7.25514 16.2865 7.29613C16.3785 7.33712 16.4613 7.39622 16.53 7.46991L20.53 11.4699C20.6705 11.6105 20.7493 11.8012 20.7493 11.9999C20.7493 12.1987 20.6705 12.3893 20.53 12.5299L16.53 16.5299C16.4608 16.6 16.3782 16.6556 16.2872 16.6934C16.1962 16.7312 16.0985 16.7504 16 16.7499Z"
                                    fill="#4a4a4a" />
                                <path
                                    d="M20 12.75H9C8.80109 12.75 8.61032 12.671 8.46967 12.5303C8.32902 12.3897 8.25 12.1989 8.25 12C8.25 11.8011 8.32902 11.6103 8.46967 11.4697C8.61032 11.329 8.80109 11.25 9 11.25H20C20.1989 11.25 20.3897 11.329 20.5303 11.4697C20.671 11.6103 20.75 11.8011 20.75 12C20.75 12.1989 20.671 12.3897 20.5303 12.5303C20.3897 12.671 20.1989 12.75 20 12.75Z"
                                    fill="#4a4a4a" />
                            </g>

                        </svg>
                    </RouterLink>

                    <div class="text-left lg:hidden max-w-fit lg:p-2 pl-6 py-2">
                        <div>
                            <button type="button" @click="handleDropdown()"
                                class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                id="menu-button" aria-expanded="true" aria-haspopup="true">
                                <svg class="sm:w-5 sm:h-5 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </button>
                        </div>

                        <div v-if="this.openDropdown"
                            class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                            <div class="py-1" role="none">
                                <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                                <RouterLink to="/" @click="handleDropdown(), scrollToTop()"
                                    class="text-gray-700 block px-4 py-2 text-sm pr-4 pl-3 lg:p-0" role="menuitem"
                                    tabindex="-1" id="menu-item-0">
                                    Trang chủ
                                </RouterLink>
                                <RouterLink to="/aboutus" @click="handleDropdown(), scrollToTop()"
                                    class="text-gray-700 block px-4 py-2 text-sm pr-4 pl-3 lg:p-0" role="menuitem"
                                    tabindex="-1" id="menu-item-1">
                                    Giới thiệu
                                </RouterLink>
                                <RouterLink to="/customer/searching" @click="handleDropdown(), scrollToTop()"
                                    class="text-gray-700 block px-4 py-2 text-sm pr-4 pl-3 lg:p-0" role="menuitem"
                                    tabindex="-1" id="menu-item-2">
                                    Tra cứu
                                </RouterLink>
                                <RouterLink to="/contact" @click="handleDropdown(), scrollToTop()"
                                    class="text-gray-700 block px-4 py-2 text-sm pr-4 pl-3 lg:p-0" role="menuitem"
                                    tabindex="-1" id="menu-item-3">
                                    Liên hệ
                                </RouterLink>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1 mx-auto"
                    id="mobile-menu-2">
                    <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                        <li>
                            <RouterLink to="/" @click="scrollToTop()" class="block py-2 pr-4 pl-3 text-gray-700 border-b-4 
                                border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:hover:text-primary-700 
                                lg:p-0 text-black-400 lg:hover:text-black dark:hover:bg-gray-700 hover:text-black 
                                lg:hover:bg-transparentborder-gray-700">Trang chủ</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/aboutus" @click="scrollToTop()" class="block py-2 pr-4 pl-3 text-gray-700 border-b-4 
                                border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:hover:text-primary-700 
                                lg:p-0 text-black-400 lg:hover:text-black dark:hover:bg-gray-700 hover:text-black 
                                lg:hover:bg-transparentborder-gray-700">Giới thiệu</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/customer/searching" @click="scrollToTop()" class="block py-2 pr-4 pl-3 text-gray-700 border-b-4 
                                border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:hover:text-primary-700 
                                lg:p-0 text-black-400 lg:hover:text-black dark:hover:bg-gray-700 hover:text-black 
                                lg:hover:bg-transparentborder-gray-700">Tra cứu</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/contact" @click="scrollToTop()" class="block py-2 pr-4 pl-3 text-gray-700 border-b-4 
                                border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:hover:text-primary-700 
                                lg:p-0 text-black-400 lg:hover:text-black dark:hover:bg-gray-700 hover:text-black 
                                lg:hover:bg-transparentborder-gray-700">Liên hệ</RouterLink>
                        </li>
                        <li>
                            <RouterLink v-if="!isLogin" to="/login" @click="scrollToTop()" class="block py-2 pr-4 pl-3 text-gray-700 border-b-4 
                                border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:hover:text-primary-700 
                                lg:p-0 text-black-400 lg:hover:text-black dark:hover:bg-gray-700 hover:text-black 
                                lg:hover:bg-transparentborder-gray-700">Đăng nhập</RouterLink>
                            <RouterLink v-else to="/manager" @click="scrollToTop()" class="block py-2 pr-4 pl-3 text-gray-700 border-b-4 
                                border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:hover:text-primary-700 
                                lg:p-0 text-black-400 lg:hover:text-black dark:hover:bg-gray-700 hover:text-black 
                                lg:hover:bg-transparentborder-gray-700">Quản lý</RouterLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
// import axios from 'axios';
// import { mapMutations, mapState } from 'vuex';
import axios from "axios";
import "../assets/general_css/style.css";
import { mapState, mapMutations } from "vuex";

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Header',
    data() {
        return {
            openDropdown: false,

        }
    },
    components: {

    },
    methods: {
        ...mapMutations(['scrollToTop', 'setLogged', 'setLeadership', 'setLeadershipAccessToken',
            'setLeadershipRefreshToken', 'setManagerDC', 'setDCManagerAccessToken', 'setDCManagerRefreshToken',
            'setManagerWH', 'setWHManagerAccessToken', 'setWHManagerRefreshToken', 'setTellerDC', 'setTellerDCAccessToken',
            'setTellerDCRefreshToken', 'setStaffWH', 'setStaffWHAccessToken', 'setStaffWHRefreshToken']),

        scrollToTop() {
            window.scrollTo(0, 0);
        },

        handleDropdown() {
            this.openDropdown = !this.openDropdown;
        },

        async handleLogout() {
            let res;
            if (this.leadership) {
                res = await axios.post('/logout', { accountId: this.leadership.accountId }, { withCredentials: true });
                this.setLeadership(null);
            } else if (this.manager_DC) {
                res = await axios.post('/logout', { accountId: this.manager_DC.accountId }, { withCredentials: true });
                this.setManagerDC(null);
            } else if (this.manager_WH) {
                res = await axios.post('/logout', { accountId: this.manager_WH.accountId }, { withCredentials: true });
                this.setManagerWH(null)
            } else if (this.teller_DC.accountId) {
                res = await axios.post('/logout', { accountId: this.teller_DC.accountId }, { withCredentials: true });
                this.setTellerDC([])
            } else if (this.staff_WH.accountId) {
                res = await axios.post('/logout', { accountId: this.staff_WH.accountId }, { withCredentials: true });
                this.setStaffWH([])
            }
            if (res.data) {
                this.setLogged(false);
                this.$router.push('/');
            }
        }
        // async handleSearch() {
        //     // this.$refs.anyName.reset();
        //     this.$router.push(`/searching/${this.form.keyw}`);
        // },
    },
    computed: {
        ...mapState(['isLogin', 'leadership', 'leadershipToken', 'manager_DC', 'manager_WH', 'staff_WH',
            'staffWHToken', 'teller_DC', 'tellerDCToken']),
    },
}
</script>

<style lang = "scss" scoped>
header {
    padding-top: 10px;
    position: relative;
    width: 100%;
    box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.05);

    .py-2 {
        color: rgb(17, 54, 99);
        font-weight: 700;
    }

    .chat {
        background-color: rgb(34, 74, 99);
        color: rgb(174, 148, 18);
    }

    .border-b-4:hover {
        border-color: rgb(174, 148, 18);
    }

    #menu-item-0:hover {
        background-color: rgb(231, 204, 84);
    }

    #menu-item-1:hover {
        background-color: rgb(231, 204, 84);
    }

    #menu-item-2:hover {
        background-color: rgb(231, 204, 84);
    }

    #menu-item-3:hover {
        background-color: rgb(231, 204, 84);
    }
}
</style>