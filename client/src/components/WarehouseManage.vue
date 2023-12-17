<template>
    <div v-if="!this.createNew" class="">
        <div class="w-8/12 grid grid-cols-4 mx-auto">
            <span class="col-span-3 max-w-fit">
                <h1 class="font-semibold py-4 text-center lg:text-2xl md:text-xl sm:text-lg text-base">
                    Danh sách điểm tập kết toàn quốc
                </h1>
            </span>
            <span class="col-span-1">
                <button v-on:click="this.createdANewWH()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 my-4 
                    md:text-lg sm:text-base text-sm rounded btn">
                    Tạo điểm tập kết
                </button>
            </span>
        </div>

        <hr class="w-9/12 mx-auto">
        <div class="" id="course">
            <table class="px-auto">
                <tr>
                    <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-lg sm:text-base text-sm">Chỉnh sửa
                    </th>
                    <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-lg sm:text-base text-sm">Mã định
                        danh Tỉnh/Thành phố</th>
                    <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-lg sm:text-base text-sm">
                        Tỉnh/Thành phố</th>
                    <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-lg sm:text-base text-sm">Mã điểm
                        TK</th>
                    <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-lg sm:text-base text-sm">Địa chỉ
                        cụ thể</th>
                    <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-lg sm:text-base text-sm">Xóa</th>
                </tr>
                <tr class="" v-for="warehouse in displayedItemList">
                    <td class="py-2 px-4 border items-center justify-center"> <img class="w-2/5 mx-auto"
                            src="../assets/img/note.png">
                    </td>
                    <td class="py-2 px-4 border text-center md:text-lg sm:text-base text-sm"> {{
                        warehouse.provinceMunicipalityId }}</td>
                    <td class="py-2 px-4 border text-center md:text-lg sm:text-base text-sm">{{
                        warehouse.provinceMunicipality }}</td>
                    <td class="py-2 px-4 border text-center md:text-lg sm:text-base text-sm">
                <tr class="my-auto mx-auto md:text-lg sm:text-base text-sm" v-for="whouse in warehouse.warehouses">
                    <td class="py-6">{{ whouse.warehouseId }}</td>
                    <!-- <td>{{ whouse.address }}</td> -->
                </tr>
                </td>
                <td class="py-4 px-4 border md:text-lg sm:text-base text-sm">
                    <tr class="my-4 truncate" v-for="whouse in warehouse.warehouses"
                        @mouseover="setHoveredText(whouse.address, $event)" @mouseleave="clearHoveredText">
                        {{ truncateText(whouse.address, 50) }}
                    </tr>

                    <!-- Show tooltip on small screens -->
                    <div v-if="hoveredText && isSmallScreen" class="tooltip">
                        {{ hoveredText }}
                    </div>
                </td>
                <td class="py-2 px-4 border items-center md:text-lg sm:text-base text-sm">
                    <tr v-for="whouse in warehouse.warehouses"><img
                            class="lg:w-2/5 md:w-3/5 sm:w-4/5 w-10/12 mx-auto cursor-pointer hover:opacity-90 py-6"
                            src="../assets/img/trash.png" alt="" @click="test()"></tr>
                </td>
                </tr>
            </table>
            <div class="my-4">
                <div class="max-w-fit mx-auto">
                    <button
                        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded md:text-lg sm:text-base text-sm"
                        @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Previous Page</button>
                    <span class="pl-10 pr-10 md:text-lg sm:text-base text-sm">Trang <strong>{{ currentPage }}</strong> trong
                        tổng số <strong>{{ totalPages
                        }}</strong></span>
                    <button
                        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded md:text-lg sm:text-base text-sm"
                        @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Next Page</button>
                </div>

            </div>
        </div>
    </div>
    <div v-else class="md:max-w-5xl sm:max-w-3xl max-w-xl w-11/12 mx-auto">
        <div class="py-2 grid gird-cols-6">
            <span class="col-start-1 py-2">
                <h1 class="inline-flex font-semibold lg:text-2xl md:text-xl sm:text-lg text-base">
                    Tạo mới điểm tập kết
                </h1>
            </span>
            <span class="col-start-6">
                <button v-on:click="this.createdANewWH()" class="bg-blue-500 hover:bg-blue-700 hover:shadow-xl text-white font-bold 
                    md:text-lg sm:text-base text-sm py-2 px-4 rounded btn">
                    Hủy bỏ
                </button>
            </span>
        </div>
        <hr class="my-2">
        <div class="" id="course">
            <form @submit="handleSubmit" class="bg-white items-center shadow-lg rounded px-8 pt-6 pb-8 mb-4" novalidate
                autocapitalize="off">

                <label for="province" class="md:text-lg sm:text-base text-sm">Tỉnh/Thành phố:</label>
                <br>
                <div id="province" class="w-2/5 common-shadow-input h-[43px] select2-stupid-at-home"
                    data-select2-id="select2-data-73-3wmt">
                    <select id="office-province" name="province_id" v-model="provinceSelected"
                        @change="this.getAllDistrictsOfAProvince()" class="cursor-pointer hover:shadow-lg search-select w-full h-full select2-hidden-accessible 
                        bg-gray-100 rounded-b-lg border-gray-300" tabindex="-1" aria-hidden="true"
                        data-select2-id="select2-data-office-province">
                        <option class="text-gray-900" :value="0">Tỉnh/ Thành phố</option>
                        <option class="text-gray-900" v-for="province in provinces" :value="province"
                            :key="province.provinceMunicipalityId">{{
                                province.provinceMunicipality }}</option>
                    </select>
                </div>
                <p class="error" v-if="this.provinceError.length > 0">{{ provinceError[0] }}</p>
                <br>
                <label for="district" class="md:text-lg sm:text-base text-sm">Quận/Huyện:</label>
                <br>
                <div id="district" class="common-shadow-input w-2/5 h-[43px] select2-stupid-at-home">
                    <select id="slDistrict" name="district_id" v-model="districtSelected" class="search-select w-full h-full select2-hidden-accessible bg-gray-100 border-gray-300s
                            cursor-pointer hover:shadow-lg" tabindex="-1" aria-hidden="true">
                        <option class="text-gray-900" value="auto">Quận/Huyện</option>
                        <option class="text-gray-900" v-if="districts && districts.length" v-for="district in districts"
                            :value="district" :key="district.districtId">{{
                                district.district }}</option>
                    </select>
                </div>
                <p class="error" v-if="districtError.length > 0">{{ districtError[0] }}</p>
                <br>

                <label for="address" class="md:text-lg sm:text-base text-sm">Địa chỉ cụ thể: <br /> </label>
                <input type="text" ref="inputText" id="address" class="sub w-2/5" v-model="form.address">
                <p class="error" v-if="addressError.length > 0">{{ addressError[0] }}</p>
                <br>
                <br>
                <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
                    md:text-lg sm:text-base text-sm cursor-pointer hover:shadow-lg">Tạo điểm
                    tập kết</button>
            </form>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import axios from 'axios';
export default {
    name: 'WareHouseManage',
    data() {
        return {
            form: {
                provinceMunicipalityId: 0,
                address: "",
            },
            provinceSelected: {
                provinceMunicipalityId: 0,
                provinceMunicipality: ''
            },
            districtSelected: {
                districtSelectedId: 0,
                district: ''
            },
            hoveredText: null,
            isSmallScreen: false,
            wareHouses: [],
            createNew: false,
            provinces: [],
            districts: [],
            provinceError: [],
            districtError: [],
            addressError: [],
            count: 1,
            itemsPerPage: 4, // Adjust the number of items per page
            currentPage: 1,
        }
    },
    methods: {
        ...mapMutations(['scrollToTop']),
        setHoveredText(text, event) {
            this.hoveredText = text;
            this.isSmallScreen = true; // Adjust the breakpoint as needed
        },
        clearHoveredText() {
            this.hoveredText = null;
            this.isSmallScreen = false;
        },
        getRenderedText(text) {
            return this.hoveredText ? this.hoveredText : this.truncateText(text, 50);
        },
        startManage() {
            this.createdANewWH();
            this.getAllWarehouse();
            this.getProvinces();
        },
        mountedComponent() {
            this.form.provinceMunicipalityId = 0;
            this.form.address = "";
            this.getAllDistrictsOfAProvince();
            this.provinceSelected.provinceMunicipalityId = 0;
            this.districtSelected.districtSelectedId = 0;
            this.provinceSelected.provinceMunicipality = '';
            this.districtSelected.district = '';
            this.getProvinces();
        },
        async handleCreateWH() {
            try {
                await axios.post('/warehouses', this.form, { withCredentials: true });
                this.getAllWarehouse();
                this.createdANewWH();
            } catch (err) {
                alert(err.response.data.error);
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
            if (this.provinceSelected.provinceMunicipalityId > 0) {
                try {
                    const res = await axios.get(`/provinces/${this.provinceSelected.provinceMunicipalityId}/districts`, { withCredentials: true });
                    this.districts = res.data;
                } catch (error) {
                    console.error('getDistrictofAProvince:', error.message);
                }
            }
        },
        async getAllWarehouse() {
            try {
                let res = await axios.get('/warehouses', { withCredentials: true });
                this.wareHouses = res.data;
            }
            catch (error) {
                console.error('getAllWareHouses:', error.message);
            }
        },
        createdANewWH() {
            this.getAllWarehouse();
            this.mountedComponent();
            this.createNew = !this.createNew;
        },
        preSubmit() {
            this.form.provinceMunicipalityId = this.provinceSelected.provinceMunicipalityId;
        },
        async handleSubmit(event) {

            this.provinceError = [];
            this.districtError = [];
            this.addressError = [];

            this.preSubmit();

            if (this.provinceSelected.provinceMunicipalityId == 0) {
                this.provinceError.push('Vui lòng chọn Tỉnh/Thành phố!');
            }
            if (this.districtSelected.districtSelectedId == 0) {
                this.districtError.push('Vui lòng chọn Quận/Huyện!');
            }
            if (!this.form.address) {
                this.addressError.push('Vui lòng nhập địa chỉ cụ thể!');
            }

            if (!this.provinceError.length == 0 || !this.districtError.length == 0 || !this.addressError.length == 0) {
                event.preventDefault();
            }
            else {
                this.form.address = this.form.address + ', ' + this.districtSelected.district + ', ' + this.provinceSelected.provinceMunicipality;
                event.preventDefault();
                this.scrollToTop();
                await this.handleCreateWH();
            }
        },
        // showFinalAddress() {
        //     this.$refs.inputText.innerHTML = this.form.address + ', ' + this.districtSelected.district + ', ' + this.provinceSelected.provinceMunicipality;
        // }
        goToPage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
            this.scrollToTop();
        },
        truncateText(text, maxLength) {
            return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
        },
        test() {
            console.log("asd");
        }
    },

    computed: {
        ...mapState([]),
        totalPages() {
            return Math.ceil(this.wareHouses.length / this.itemsPerPage);
        },
        displayedItemList() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.wareHouses.slice(startIndex, endIndex);
        },
    },
    created() {
        this.getProvinces();
        this.getAllWarehouse();
    }
}
</script>

<style>
.tooltip {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: 5px;
    border-radius: 5px;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
    z-index: 9999;
}
</style>