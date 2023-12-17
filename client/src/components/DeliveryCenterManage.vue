<template>
    <div v-if="!this.createNew" class="">
        <div class="w-8/12 grid grid-cols-4 mx-auto">
            <span class="col-span-3 max-w-fit">
                <h1 class="font-semibold py-4 text-center lg:text-2xl md:text-xl sm:text-lg text-base">
                    Danh sách điểm giao dịch toàn quốc
                </h1>
            </span>
            <span class="col-span-1">
                <button v-on:click="this.createdANewDC()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 my-4 
                    md:text-lg sm:text-base text-sm rounded btn">
                    Tạo điểm giao dịch
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
                    <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-lg sm:text-base text-sm">Mã
                        quận/huyện</th>
                    <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-lg sm:text-base text-sm">Mã điểm
                        giao dịch</th>
                    <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-lg sm:text-base text-sm">Địa chỉ
                        cụ thể</th>
                    <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-lg sm:text-base text-sm">Xóa</th>
                </tr>
                <tr v-for="deliveryCenter in deliveryCenters">
                    <td class="py-2 px-4 border items-center justify-center"> <img class="w-2/5 mx-auto"
                            src="../assets/img/note.png"></td>
                    <td class="py-2 px-4 border items-center justify-center">{{ deliveryCenter.provinceMunicipalityId }}</td>
                    <td class="py-2 px-4 border items-center justify-center">{{ deliveryCenter.districtId }}</td>
                    <td class="py-2 px-4 border text-center md:text-lg sm:text-base text-sm">
                <tr class="my-auto mx-auto md:text-lg sm:text-base text-sm"
                    v-for="delivery_center in deliveryCenter.delivery_centers">
                    <td class="py-6">{{ delivery_center.deliveryCenterId }}</td>
                    <!-- <td>{{ whouse.address }}</td> -->
                </tr>
                </td>
                <td class="py-4 px-4 border md:text-lg sm:text-base text-sm">
                    <tr class="my-4" v-for="delivery_center in deliveryCenter.delivery_centers">{{ delivery_center.address
                    }}</tr>
                </td>
                <td class="py-2 px-4 border items-center md:text-lg sm:text-base text-sm">
                    <tr v-for="delivery_center in deliveryCenter.delivery_centers"><img
                            class="lg:w-2/5 md:w-3/5 sm:w-4/5 w-10/12 mx-auto cursor-pointer hover:opacity-90 py-6"
                            src="../assets/img/trash.png" alt=""></tr>
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
                    Tạo mới điểm giao dịch
                </h1>
            </span>
            <span class="col-start-6">
                <button v-on:click="this.createdANewDC()" class="bg-blue-500 hover:bg-blue-700 hover:shadow-xl text-white font-bold 
                    md:text-lg sm:text-base text-sm py-2 px-4 rounded btn">
                    Hủy bỏ
                </button>
            </span>
        </div>
        <hr class="my-2">
        <div class="tabcontent" id="course">
            <form @submit="handleSubmit" class="bg-white items-center shadow-lg rounded px-8 pt-6 pb-8 mb-4" novalidate
                autocapitalize="off">

                <label for="province" class="md:text-lg sm:text-base text-sm">Tỉnh/Thành phố:</label>
                <br>

                <!-- Select province and display -->
                <div id="province" class="w-2/5 common-shadow-input h-[43px] select2-stupid-at-home"
                    data-select2-id="select2-data-73-3wmt">
                    <select id="office-province" name="province_id" v-model="provinceSelected"
                        @change="this.getAllDistrictsOfAProvince(); this.getAllWarehousesOfAProvince()" class="search-select w-full h-full select2-hidden-accessible bg-gray-100 rounded-b-lg border-gray-300
                            cursor-pointer hover:shadow-lg" tabindex="-1" aria-hidden="true"
                        data-select2-id="select2-data-office-province">
                        <option class="text-gray-900" :value="0">Tỉnh/ Thành phố</option>
                        <option class="text-gray-900" v-for="province in provinces" :value="province"
                            :key="province.provinceMunicipalityId">{{ province.provinceMunicipality }}</option>
                    </select>
                </div>


                <p class="error" v-if="this.provinceError.length > 0">{{ provinceError[0] }}</p>
                <br>
                <label for="district" class="md:text-lg sm:text-base text-sm">Quận/Huyện:</label>
                <br>

                <!-- Select district and display -->
                <div id="district" class="common-shadow-input w-2/5 h-[43px] select2-stupid-at-home">
                    <select id="slDistrict" name="district_id" v-model="districtSelected" class="search-select w-full h-full select2-hidden-accessible bg-gray-100 border-gray-300s
                            cursor-pointer hover:shadow-lg" tabindex="-1" aria-hidden="true">
                        <option class="text-gray-900" value="">Quận/Huyện</option>
                        <option class="text-gray-900" v-if="districts && districts.length" v-for="district in districts"
                            :value="district" :key="district.districtId">{{
                                district.district }}</option>
                    </select>
                </div>


                <p class="error" v-if="districtError.length > 0">{{ districtError[0] }}</p>
                <br>
                <label for="warehouse" class="md:text-lg sm:text-base text-sm">Điểm tập kết tương ứng: <br /> </label>

                <!-- Select warehouse and display -->
                <div id="warehouse" class="common-shadow-input w-2/5 h-[43px] select2-stupid-at-home">
                    <select id="slWarehouse" name="warehouse_id" v-model="warehouseSelected" class="search-select w-full h-full select2-hidden-accessible bg-gray-100 border-gray-300s
                            cursor-pointer hover:shadow-lg" tabindex="-1" aria-hidden="true">
                        <option class="text-gray-900" value="">Điểm tập kết tương ứng</option>
                        <option class="text-gray-900" v-if="warehouses && warehouses.length" v-for="warehouse in warehouses"
                            :value="warehouse" :key="warehouse.warehouseId">{{
                                warehouse.address }}</option>
                    </select>
                </div>

                <p class="error" v-if="deleveryCenterError.length > 0">{{ deleveryCenterError[0] }}</p>
                <br>
                <br>
                <label for="address" class="info">Địa chỉ cụ thể: <br /> </label>
                <input type="text" id="address" class="sub w-2/5" v-model="form.address" required>
                <p class="error" v-if="addressError.length > 0">{{ addressError[0] }}</p>
                <br>
                <br>

                <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
                    md:text-lg sm:text-base text-sm cursor-pointer hover:shadow-lg">Tạo giao dịch</button>
            </form>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import axios from 'axios';
export default {
    name: 'DeliveryCenterManage',
    data() {
        return {
            form: {
                districtId: 0,
                warehouseId: 0,
                address: "",
            },
            provinceSelected: {
                provinceMunicipalityId: 0,
                provinceMunicipality: '',
            },
            districtSelected: {
                districtId: 0,
                district: '',
            },
            warehouseSelected: {
                warehouseId: 0,
                warehouse: '',
            },
            deliveryCenters: [],
            createNew: false,
            provinces: [],
            // provinceSelectedId: 0,
            // districtSelectedId: 0,
            districts: [],
            warehouses: [],
            provinceError: [],
            districtError: [],
            addressError: [],
            deleveryCenterError: [],
            warehouseError: [],
            currentPage: 1,
            itemsPerPage: 4,
        }
    },
    methods: {
        ...mapMutations(['scrollToTop', 'setLogged', 'setLeadership', 'setLeadershipAccessToken',
            'setLeadershipRefreshToken', 'setManagerDC', 'setManagerWH', 'setTellerDC', 'setStaffWH']),
        async getProvinces() {
            try {
                const response = await axios.get('/provinces', { withCredentials: true });
                this.provinces = response.data;
            } catch (error) {
                console.error('Error fetching provinces:', error.message);
            }
        },
        mountedComponent() {
            this.form.districtId = 0;
            this.form.warehouseId = 0;
            this.form.address = "";
            this.getAllDistrictsOfAProvince();
            this.getAllWarehousesOfAProvince();
            this.provinceSelected.provinceMunicipalityId = 0;
            this.provinceSelected.provinceMunicipality = '';
            this.districtSelected.districtSelectedId = 0;
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
        async handleCreateDC() {
            try {
                this.refreshToken();
                let res = await axios.post('/deliveryCenters', this.form, {
                    headers: { "Authorization": `Bearer ${this.leadershipToken.accessToken}` }
                }, { withCredentials: true });
                this.getAllDeliveryCenter();
                this.createdANewDC();
            } catch (err) {
                alert(err.response.data.error);
            }
        },

        async getAllDistrictsOfAProvince() {
            this.districts = null;
            if (this.provinceSelected.provinceMunicipalityId > 0) {
                try {
                    const res = await axios.get(`/provinces/${this.provinceSelected.provinceMunicipalityId}/districts`, { withCredentials: true });
                    this.districts = res.data

                } catch (error) {
                    console.error('getDistrictofAProvince:', error.message);
                }
            }
        },
        async getAllWarehousesOfAProvince() {
            this.warehouses = null;
            if (this.provinceSelected.provinceMunicipalityId > 0) {
                try {
                    const res = await axios.get(`/warehouses/${this.provinceSelected.provinceMunicipalityId}`, { withCredentials: true });
                    this.warehouses = res.data

                } catch (error) {
                    console.error('getDistrictofAProvince:', error.message);
                }
            }
        },
        async getAllDeliveryCenter() {
            try {
                let res = await axios.get('/deliveryCenters', { withCredentials: true });
                this.deliveryCenters = res.data;
            } catch (error) {
                console.error('getAllDeleveryCenter', error.message)
            }

        },
        createdANewDC() {
            this.getAllDeliveryCenter();
            this.mountedComponent();
            this.createNew = !this.createNew;
        },
        preSubmit() {
            this.form.districtId = this.districtSelected.districtId;
            this.form.warehouseId = this.warehouseSelected.warehouseId;
        },
        async handleSubmit(event) {

            this.provinceError = [];
            this.districtError = [];
            this.warehouseError = [];
            this.addressError = [];

            this.preSubmit();

            if (this.provinceSelected.provinceMunicipalityId == 0) {
                this.provinceError.push('Vui lòng chọn Tỉnh/Thành phố!');
            }
            if (this.districtSelected.districtSelectedId == 0) {
                this.districtError.push('Vui lòng chọn Quận/Huyện!');
            }
            if (this.warehouseSelected.warehouseSelectedId == 0) {
                this.warehouseError.push('Vui lòng chọn điểm tập kết tương ứng')
            }
            if (!this.form.address) {
                this.addressError.push('Vui lòng nhập địa chỉ cụ thể!');
            }

            if (!this.provinceError.length == 0 || !this.districtError.length == 0 || !this.addressError.length == 0 || !this.warehouseError.length == 0) {
                event.preventDefault();
            }
            else {
                this.form.address = this.form.address + ', ' + this.districtSelected.district + ', ' + this.provinceSelected.provinceMunicipality;
                event.preventDefault();
                this.scrollToTop();
                await this.handleCreateDC();
            }
        },
        goToPage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
            this.scrollToTop();
        },

    },
    computed: {
        ...mapState(['isLogin', 'leadership', 'leadershipToken', 'manager_DC', 'manager_WH', 'staff_WH', 'teller_DC']),
        totalPages() {
            return Math.ceil(this.deliveryCenters.length / this.itemsPerPage);
        },
        displayedItemList() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.deliveryCenters.slice(startIndex, endIndex);
        },
    },
    mounted() {
        this.getProvinces();
        this.getAllDeliveryCenter();
    }
}
</script>

<style>
/* h1 {
    font-size: 30px;
}

.custom-delivery-center {
    width: 100%;
    Set the width to 100% to take up the full width
    Add other styling if needed
} */

/* .btn {
    float: right;
    margin-right: 20%;
} */

/* .sub, .province, .district {
    border-radius: 5px;
} */
/* .tabcontent {
    float: left;
    padding: 0px 12px;
    border: 1px solid #ccc;
    width: 80%;
    border-left: none;
    height: auto;
    
    position: relative;
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
} */
</style>