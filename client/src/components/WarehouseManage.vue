<template>
    <div v-if="!this.createNew" class="">
        <div class="grid grid-cols-6 mx-4">
            <span class="col-start-1 col-end-6 max-w-fit">
                <h1
                    class="flex font-semibold font-sans h-full items-center justify-center text-center lg:text-xl md:lg sm:text-base text-sm">
                    Danh sách điểm tập kết toàn quốc
                </h1>
            </span>
            <span class="flex col-start-6 col-end-7 items-center justify-center mx-auto">
                <button v-on:click="this.createdANewWH()" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 my-4 items-center justify-center 
                    md:text-base sm:text-sm text-xs rounded btn">
                    Tạo điểm tập kết
                </button>
            </span>
        </div>

        <hr class="mx-4 mb-4">
        <div class="mx-4" id="course">
            <table class="w-full">
                <tr>
                    <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs">Mã định
                        danh Tỉnh/Thành phố</th>
                    <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs">
                        Tỉnh/Thành phố</th>
                    <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs">Mã điểm
                        TK</th>
                    <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs">Địa chỉ
                        cụ thể</th>
                    <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs">Chỉnh sửa
                    </th>
                    <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs">Xóa</th>
                </tr>
                <tr class="" v-for="warehouse in displayedItemList">
                    <td class="py-2 px-4 border text-center md:text-base sm:text-sm text-xs"> {{
                        warehouse.provinceMunicipalityId }}</td>
                    <td class="py-2 px-4 border text-center md:text-base sm:text-sm text-xs">{{
                        warehouse.provinceMunicipality }}</td>
                    <td class="py-2 px-4 border text-center md:text-lg sm:text-base text-sm">
                <tr class="flex my-auto mx-auto text-center items-center justify-center md:text-base sm:text-sm text-xs"
                    v-for="whouse in warehouse.warehouses">
                    <td class="py-6 px-auto">{{ whouse.warehouseId }}</td>
                    <!-- <td>{{ whouse.address }}</td> -->
                </tr>
                </td>
                <!-- <td class="py-4 px-4 border md:text-lg sm:text-base text-sm">
                    <tr class="flex py-4 my-4 mx-auto text-center items-center justify-center md:text-base sm:text-sm text-xs truncate" v-for="whouse in warehouse.warehouses"
                        @mouseover="setHoveredText(whouse.address, whouse.warehouseId, $event)"
                        @mouseleave="clearHoveredText(whouse.warehouseId)">
                        {{ truncateText(whouse.address, 50) }}
                        <div v-if="isSmallScreen && whouse.warehouseId === hoveredRowId" class="tooltip">
                            {{ hoveredText }}
                        </div>
                    </tr>
                </td> -->
                <td class="py-4 px-4 border md:text-lg sm:text-base text-sm">
                    <tr class="flex py-4 my-4 mx-auto text-center items-center justify-center md:text-base sm:text-sm text-xs truncate"
                        v-for="whouse in warehouse.warehouses">
                        {{ whouse.address }}
                        <div v-if="isSmallScreen && whouse.warehouseId === hoveredRowId" class="tooltip">
                            {{ hoveredText }}
                        </div>
                    </tr>
                </td>
                <td class="py-2 px-4 border items-center md:text-lg sm:text-base text-sm">
                    <tr v-for="whouse in warehouse.warehouses" class="flex items-center justify-center">
                        <td class="flex my-4 mx-auto text-center items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                class="w-8 h-8 cursor-pointer hover:opacity-30 hover:shadow-lg" width="800px" height="800px"
                                viewBox="0 0 24 24" fill="none"
                                @click="updateWarehouse(); this.warehouseSelectedId = whouse.warehouseId">
                                <path
                                    d="M18.4721 16.7023C17.3398 18.2608 15.6831 19.3584 13.8064 19.7934C11.9297 20.2284 9.95909 19.9716 8.25656 19.0701C6.55404 18.1687 5.23397 16.6832 4.53889 14.8865C3.84381 13.0898 3.82039 11.1027 4.47295 9.29011C5.12551 7.47756 6.41021 5.96135 8.09103 5.02005C9.77184 4.07875 11.7359 3.77558 13.6223 4.16623C15.5087 4.55689 17.1908 5.61514 18.3596 7.14656C19.5283 8.67797 20.1052 10.5797 19.9842 12.5023M19.9842 12.5023L21.4842 11.0023M19.9842 12.5023L18.4842 11.0023"
                                    stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M12 8V12L15 15" stroke="#000000" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </td>
                    </tr>
                </td>
                <td class="py-2 px-4 border items-center md:text-lg sm:text-base text-sm">
                    <tr v-for="whouse in warehouse.warehouses">
                        <td class="flex my-4 mx-auto text-center items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                class="w-8 h-8 cursor-pointer hover:opacity-30 hover:shadow-lg" width="800px" height="800px"
                                viewBox="0 0 24 24" fill="none" @click="deleteWarehouse(whouse)">
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
                    </tr>
                </td>
                </tr>
            </table>
            <div class="my-4">
                <div class="max-w-fit mx-auto">
                    <button
                        class="bg-green-500 hover:bg-green-700 hover:shadow-lg cursor-pointer text-white font-bold py-2 px-4 rounded md:text-base sm:text-sm text-xs"
                        @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Previous Page</button>
                    <span class="pl-10 pr-10 md:text-base sm:text-sm text-xs">Trang <strong>{{ currentPage }}</strong> trong
                        tổng số <strong>{{ totalPages
                        }}</strong></span>
                    <button
                        class="bg-green-500 hover:bg-green-700 hover:shadow-lg cursor-pointer text-white font-bold py-2 px-4 rounded md:text-base sm:text-sm text-xs"
                        @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Next Page</button>
                </div>

            </div>
        </div>
    </div>
    <div v-else class="md:max-w-5xl sm:max-w-3xl max-w-xl w-11/12 mx-auto">
        <div class="py-2 grid gird-cols-6">
            <span class="col-start-1 py-2">
                <h1 v-if="!this.updating" class="inline-flex font-semibold lg:text-xl md:text-lg sm:text-base text-sm">
                    Tạo mới điểm tập kết
                </h1>

                <h1 v-else class="inline-flex font-semibold lg:text-xl md:text-lg sm:text-base text-sm">
                    Chỉnh sửa điểm tập kết
                </h1>
            </span>
            <span class="col-start-6">
                <button v-on:click="this.createdANewWH()" class="bg-green-500 hover:bg-green-700 hover:shadow-xl text-white font-bold 
                    md:text-base sm:text-sm text-xs py-2 px-4 rounded btn">
                    Hủy bỏ
                </button>
            </span>
        </div>
        <hr class="my-2">
        <div class="" id="course">
            <form @submit="handleSubmit" class="bg-white items-center shadow-lg rounded px-8 pt-6 pb-8 mb-4" novalidate
                autocapitalize="off">
                <h2 v-if="this.updating"><strong>ID điểm tập kết: {{ this.warehouseSelectedId }} </strong><br>
                </h2>

                <label for="province" class="md:text-base sm:text-sm text-xs">Tỉnh/Thành phố:</label>
                <br>
                <div id="province" class="w-2/5 common-shadow-input h-[43px] select2-stupid-at-home"
                    data-select2-id="select2-data-73-3wmt">
                    <select id="office-province" name="province_id" v-model="provinceSelected.provinceMunicipalityId"
                        @change="this.getAllDistrictsOfAProvince()" class="cursor-pointer hover:shadow-lg search-select w-full h-full select2-hidden-accessible 
                        bg-gray-100 rounded-b-lg border-gray-300" tabindex="-1" aria-hidden="true"
                        data-select2-id="select2-data-office-province">
                        <option class="text-gray-900" :value="0">Tỉnh/ Thành phố</option>
                        <option class="text-gray-900" v-for="province in provinces" :value="province.provinceMunicipalityId"
                            :key="province.provinceMunicipalityId">{{
                                province.provinceMunicipality }}</option>
                    </select>
                </div>

                <p class="error" v-if="this.provinceError.length > 0">{{ provinceError[0] }}</p>
                <br>
                <label for="district" class="md:text-base sm:text-sm text-xs">Quận/Huyện:</label>
                <br>
                <div id="district" class="common-shadow-input w-2/5 h-[43px] select2-stupid-at-home">
                    <select id="slDistrict" name="district_id" v-model="districtSelected.districtSelectedId" class="search-select w-full h-full select2-hidden-accessible bg-gray-100 border-gray-300s
                            cursor-pointer hover:shadow-lg" tabindex="-1" aria-hidden="true">
                        <option class="text-gray-900" value="0">Quận/Huyện</option>
                        <option class="text-gray-900" v-if="districts && districts.length" v-for="district in districts"
                            :value="district.districtId" :key="district.districtId">{{
                                district.district }}</option>
                    </select>
                </div>
                <p class="error" v-if="districtError.length > 0">{{ districtError[0] }}</p>
                <br>
                <label for="address" class="md:text-base sm:text-sm text-xs">Địa chỉ cụ thể: <br /> </label>
                <input type="text" ref="inputText" id="address" class="sub w-2/5" v-model="form.address">
                <p class="error" v-if="addressError.length > 0">{{ addressError[0] }}</p>
                <br>
                <br>
                <button v-if="!this.updating" type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded
                    md:text-base sm:text-sm text-xs cursor-pointer hover:shadow-lg">Tạo điểm
                    tập kết</button>
                <button v-else type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded
                    md:text-base sm:text-sm text-xs cursor-pointer hover:shadow-lg">Cập nhật</button>
            </form>
        </div>
    </div>
    <Alert v-if="this.msg != '' && !this.createNew" :message=this.msg class="pr-10" @close="this.resetMsg()" />
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import axios from 'axios';
import Alert from './Alert.vue'
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
            updating: false,
            warehouseSelectedId: 0,
            hoveredText: null,
            hoveredRowId: null,
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
            msg: '',
        }
    },
    methods: {
        ...mapMutations(['scrollToTop', 'setLogged', 'setLeadership', 'setLeadershipAccessToken',
            'setLeadershipRefreshToken', 'setManagerDC', 'setDCManagerAccessToken', 'setDCManagerRefreshToken',
            'setManagerWH', 'setWHManagerAccessToken', 'setWHManagerRefreshToken', 'setTellerDC', 'setTellerDCAccessToken',
            'setTellerDCRefresToken', 'setStaffWH']),
        resetMsg() {
            this.msg = '';
        },
        setHoveredText(text, rowId, event) {
            this.hoveredText = text;
            this.hoveredRowId = rowId;
            this.isSmallScreen = true; // Adjust the breakpoint as needed
        },
        clearHoveredText(rowId) {
            if (rowId === this.hoveredRowId) {
                this.hoveredText = null;
                this.hoveredRowId = null;
                this.isSmallScreen = false;
            }
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
        async refreshToken() {
            let res = await axios.post('/refresh', {
                refreshToken: this.leadershipToken.refreshToken,
                withCredentials: true
            }, {
                headers:
                {
                    'x_authorization': `${this.leadershipToken.accessToken}`,
                }, withCredentials: true
            });

            this.setLeadershipAccessToken(res.data);
        },
        async handleCreateWH() {
            try {
                const response = await axios.post('/warehouses', this.form, {
                    headers: {
                        "Authorization": `Bearer ${this.leadershipToken.accessToken}`,
                    },
                    withCredentials: true
                });
                this.msg = 'Tạo điểm tập kết thành công!'
                this.getAllWarehouse();
                this.createdANewWH();
            } catch (err) {
                if (err.response && err.response.data.error === 'jwt expired') {
                    await this.refreshToken();
                    await this.handleCreateWH();
                } else if (err.response && err.response.data.error) {
                    alert(err.response.data.error);
                } else {
                    alert("An error occurred while processing the request.");
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
            if (this.createNew) { this.getAllWarehouse(); }
            this.mountedComponent();
            this.createNew = !this.createNew;
            this.updating = false;
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
                if (this.updating) {
                    await this.handleUpdateWarehouse();
                } else {
                    await this.handleCreateWH();
                }
            }
        },
        async handleUpdateWarehouse() {
            try {
                let res = await axios.put(`/warehouses/${this.warehouseSelectedId}`, this.form, {
                    headers: { "Authorization": `Bearer ${this.leadershipToken.accessToken}` }
                }, { withCredentials: true });
                this.getAllWarehouse();
                this.msg = 'Cập nhật thành công!'
                this.createdANewWH();
            } catch (err) {
                if (err.response && err.response.data.error === 'jwt expired') {
                    await this.refreshToken();
                    await this.handleUpdateWarehouse();
                } else if (err.response && err.response.data.error) {
                    alert(err.response.data.error);
                } else {
                    alert("An error occurred while processing the request.");
                }
            }
        },

        async deleteWarehouse(whouse) {
            try {
                let res = await axios.delete(`/warehouses/${whouse.warehouseId}`, {
                    headers: { "Authorization": `Bearer ${this.leadershipToken.accessToken}` }
                }, { withCredentials: true })
                this.msg = 'Xóa thành công!'
                this.getAllWarehouse();
            } catch (error) {
                console.log("delete Error");
            }
        },
        updateWarehouse() {
            console.log(this.updating);
            this.updating = true;
            this.createNew = !this.createNew;
        },
        // showFinalAddress() {
        //     this.$refs.inputText.innerHTML = this.form.address + ', ' + this.districtSelected.district + ', ' + this.provinceSelected.provinceMunicipality;
        // }
        goToPage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
            //this.scrollToTop();
        },
        truncateText(text, maxLength) {
            return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
        },
    },

    computed: {
        ...mapState(['isLogin', 'leadership', 'leadershipToken', 'manager_DC', 'managerDCToken', 'manager_WH', 'managerWHToken',
            'staff_WH', 'teller_DC']),
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

<style></style>