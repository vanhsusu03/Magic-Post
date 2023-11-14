<template>
    <header>
        <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
            <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <RouterLink to="/" @click="scrollToTop()" class="flex items-center">
                    <img src="../assets/img/logo.png" class="-mr-4 sm:mr-4 h-8 sm:h-9 md:h-9 lg:h-16"
                        alt="MagicPost Logo" />
                </RouterLink>

                <div class="flex items-center lg:order-2">
                    <RouterLink to=""
                        class="text-gray-800 text-white hover:bg-gray-50 font-medium 
                    rounded-lg lg:text-sm text-xs px-3 lg:px-5 md:px-4 sm:px-2 py-2 lg:py-2.5 mr-2 focus:outline-none chat">Cần hỗ
                        trợ? CHAT
                        NGAY!</RouterLink>
                    <RouterLink to="" href="#"
                        class="text-gray-800 text-white hover:bg-gray-50 font-medium 
                    rounded-lg lg:text-sm text-xs px-4 lg:px-5 md:px-4 sm:px-2 py-2 lg:py-2.5 mr-2 focus:outline-none chat">Hotline:
                        0333544588</RouterLink>

                    <div class="relative inline-block text-left lg:hidden">
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
                                <RouterLink to="/searching" @click="handleDropdown(), scrollToTop()"
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
                <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
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
                            <RouterLink to="/searching" @click="scrollToTop()" class="block py-2 pr-4 pl-3 text-gray-700 border-b-4 
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
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
// import axios from 'axios';
// import { mapMutations, mapState } from 'vuex';
import "../assets/general_css/style.css";


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
        // ...mapMutations(['setStudent', 'setLogged', 'setAdmin']),

        scrollToTop() {
            window.scrollTo(0, 0);
        },

        handleDropdown() {
            this.openDropdown = !this.openDropdown;
        }
        // async handleSearch() {
        //     // this.$refs.anyName.reset();
        //     this.$router.push(`/searching/${this.form.keyw}`);
        // },
    },
    computed: {
        // ...mapState(['student', 'admin'])
    },
}
</script>

<style lang = "scss" scoped>
header {
    padding-top: 10px;
    position: relative;
    width: 100%;
    box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.05);

    nav {
        margin-bottom: 30px;
    }

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
}</style>