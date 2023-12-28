<template>
    <div v-if="!this.createNew" class="mx-4">
        <div class="grid grid-cols-6 mx-4">
            <span class="col-start-1 col-end-5 max-w-fit">
                <h1 class="flex font-semibold font-sans h-full items-center justify-center text-center lg:text-xl md:lg sm:text-base text-sm">
                    Danh sách điểm giao dịch toàn quốc
                </h1>
            </span>
            <span class="flex col-start-6 items-center justify-center mx-auto">
                <button v-on:click="this.createdANewDC()" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 my-4
                    md:text-base sm:text-sm text-xs rounded btn hover:shadow-lg cursor-pointer">
                    Tạo điểm giao dịch
                </button>
            </span>
        </div>
        <hr class="mb-4 mx-4">

        <div class="mx-4" id="course">
            <table class="px-auto">
                <tr>
                    <th
                        class="bg-green-500 text-white font-bold py-2 px-4 border text-center items-center md:text-base sm:text-sm text-xs">
                        Mã định
                        danh Tỉnh/Thành phố</th>
                    <th
                        class="bg-green-500 text-white font-bold py-2 px-4 border text-center items-center md:text-base sm:text-sm text-xs">
                        Mã
                        quận/huyện</th>
                    <th
                        class="bg-green-500 text-white font-bold py-2 px-4 border text-center items-center md:text-base sm:text-sm text-xs">
                        Mã điểm
                        giao dịch</th>
                    <th
                        class="bg-green-500 text-white font-bold py-2 px-4 border text-center items-center md:text-base sm:text-sm text-xs">
                        Địa chỉ
                        cụ thể</th>
                    <th
                        class="bg-green-500 text-white font-bold py-2 px-4 border text-center items-center md:text-base sm:text-sm text-xs">
                        Chỉnh sửa
                    </th>
                    <th
                        class="bg-green-500 text-white font-bold py-2 px-4 border text-center items-center md:text-base sm:text-sm text-xs">
                        Xóa</th>
                </tr>
                <tr v-for="deliveryCenter in deliveryCenters">
                    <td class="py-2 px-4 border text-center items-center justify-center md:text-lg sm:text-base text-sm">{{
                        deliveryCenter.provinceMunicipalityId }}
                    </td>
                    <td class="py-2 px-4 border text-center items-center justify-center md:text-lg sm:text-base text-sm">{{
                        deliveryCenter.districtId }}</td>
                    <td class="py-2 px-4 border text-center items-center justify-center md:text-lg sm:text-base text-sm">
                    <tr class="flex my-auto mx-auto text-center items-center justify-center md:text-base sm:text-sm text-xs"
                        v-for="delivery_center in deliveryCenter.delivery_centers">
                        <td class="py-4">{{ delivery_center.deliveryCenterId }}</td>
                        <!-- <td>{{ whouse.address }}</td> -->

                    </tr>
                    </td>
                <td class="py-4 px-4 border md:text-base sm:text-sm text-xs">
                    <tr class="flex my-4 mx-auto text-center items-center justify-center md:text-base sm:text-sm text-xs" v-for="delivery_center in deliveryCenter.delivery_centers">{{ delivery_center.address
                    }}</tr>
                </td>
                <td class="py-2 px-4 border">
                    <tr v-for="delivery_center in deliveryCenter.delivery_centers"
                        class="flex text-center justify-center items-center">
                        <td class="flex my-4 mx-auto text-center items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                class="w-8 h-8 cursor-pointer hover:opacity-30 hover:shadow-lg" width="800px" height="800px"
                                viewBox="0 0 24 24" fill="none"
                                @click="updateDeliveryCenter(); this.deliverySelectedId = delivery_center.deliveryCenterId">
                                <path
                                    d="M18.4721 16.7023C17.3398 18.2608 15.6831 19.3584 13.8064 19.7934C11.9297 20.2284 9.95909 19.9716 8.25656 19.0701C6.55404 18.1687 5.23397 16.6832 4.53889 14.8865C3.84381 13.0898 3.82039 11.1027 4.47295 9.29011C5.12551 7.47756 6.41021 5.96135 8.09103 5.02005C9.77184 4.07875 11.7359 3.77558 13.6223 4.16623C15.5087 4.55689 17.1908 5.61514 18.3596 7.14656C19.5283 8.67797 20.1052 10.5797 19.9842 12.5023M19.9842 12.5023L21.4842 11.0023M19.9842 12.5023L18.4842 11.0023"
                                    stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M12 8V12L15 15" stroke="#000000" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </td>
                    </tr>
                </td>
                <td class="py-2 px-4 border items-center md:text-base sm:text-sm text-xs">
                    <tr v-for="delivery_center in deliveryCenter.delivery_centers">
                        <td class="flex my-4 mx-auto text-center items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg"
                            class="w-8 h-8 cursor-pointer hover:opacity-30 hover:shadow-lg" width="800px" height="800px"
                            viewBox="0 0 24 24" fill="none" @click="deleteDeliveryCenter(delivery_center)">
                            <path d="M10 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path d="M14 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#000000"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
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
                    <button class="bg-green-500 hover:bg-green-700 hover:shadow-lg cursor-pointer text-white font-bold 
                            py-2 px-4 rounded md:text-base sm:text-sm text-xs" @click="goToPage(currentPage - 1)"
                        :disabled="currentPage === 1">Previous Page</button>
                    <span class="pl-10 pr-10 md:text-base sm:text-sm text-xs">Trang <strong>{{ currentPage }}</strong> trong
                        tổng số <strong>{{ totalPages
                        }}</strong></span>
                    <button class="bg-green-500 hover:bg-green-700 hover:shadow-lg cursor-pointer text-white font-bold 
                            py-2 px-4 rounded md:text-base sm:text-sm text-xs" @click="goToPage(currentPage + 1)"
                        :disabled="currentPage === totalPages">Next Page</button>
                </div>

            </div>

        </div>
    </div>
    <div v-else class="md:max-w-5xl sm:max-w-3xl max-w-xl w-11/12 mx-auto">
        <div class="py-2 grid gird-cols-6">
            <span class="col-start-1 py-2">
                <h1 v-if="!this.updating" class="inline-flex font-semibold lg:text-xl md:text-lg sm:text-base text-sm">
                    Tạo mới điểm giao dịch
                </h1>

                <h1 v-else class="inline-flex font-semibold lg:text-xl md:text-lg sm:text-base text-sm">
                    Chỉnh sửa điểm giao dịch
                </h1>
            </span>
            <span class="col-start-6">
                <button v-on:click="this.createdANewDC()" class="bg-green-500 hover:bg-green-700 hover:shadow-lg cursor-pointer text-white font-bold 
                    md:text-base sm:text-sm text-xs py-2 px-4 rounded btn">
                    Hủy bỏ
                </button>
            </span>
        </div>
        <hr class="my-2">
        <div class="tabcontent" id="course">
            <form @submit="handleSubmit" class="bg-white items-center shadow-lg rounded px-8 pt-6 pb-8 mb-4" novalidate
                autocapitalize="off">
                <h2 v-if="this.updating">ID điểm giao dịch: {{ this.deliverySelectedId }} <br>
                </h2>

                <label for="province" class="md:text-base sm:text-sm text-xs">Tỉnh/Thành phố:</label>
                <br>

                <!-- Select province and display -->
                <div id="province" class="w-2/5 common-shadow-input h-[43px] select2-stupid-at-home"
                    data-select2-id="select2-data-73-3wmt">
                    <select id="office-province" name="province_id" v-model="provinceSelected.provinceMunicipalityId"
                        @change="this.getAllDistrictsOfAProvince(); this.getAllWarehousesOfAProvince()" class="search-select w-full h-full select2-hidden-accessible bg-gray-100 rounded-b-lg border-gray-300
                            cursor-pointer hover:shadow-lg" tabindex="-1" aria-hidden="true"
                        data-select2-id="select2-data-office-province">
                        <option class="text-gray-900" :value="0">Tỉnh/ Thành phố</option>
                        <option class="text-gray-900" v-for="province in provinces" :value="province.provinceMunicipalityId"
                            :key="province.provinceMunicipalityId">{{ province.provinceMunicipality }}</option>
                    </select>
                </div>


                <p class="error" v-if="this.provinceError.length > 0">{{ provinceError[0] }}</p>
                <br>
                <label for="district" class="md:text-base sm:text-sm text-xs">Quận/Huyện:</label>
                <br>

                <!-- Select district and display -->
                <div id="district" class="common-shadow-input w-2/5 h-[43px] select2-stupid-at-home">
                    <select id="slDistrict" name="district_id" v-model="districtSelected.districtId" class="search-select w-full h-full select2-hidden-accessible bg-gray-100 border-gray-300s
                            cursor-pointer hover:shadow-lg" tabindex="-1" aria-hidden="true">
                        <option class="text-gray-900" value="0">Quận/Huyện</option>
                        <option class="text-gray-900" v-if="districts && districts.length" v-for="district in districts"
                            :value="district.districtId" :key="district.districtId">{{
                                district.district }}</option>
                    </select>
                </div>


                <p class="error" v-if="districtError.length > 0">{{ districtError[0] }}</p>
                <br>
                <label for="warehouse" class="md:text-base sm:text-sm text-xs">Điểm tập kết tương ứng: <br /> </label>

                <!-- Select warehouse and display -->
                <div id="warehouse" class="common-shadow-input w-2/5 h-[43px] select2-stupid-at-home">
                    <select id="slWarehouse" name="warehouse_id" v-model="warehouseSelected.warehouseId" class="search-select w-full h-full select2-hidden-accessible bg-gray-100 border-gray-300s
                            cursor-pointer hover:shadow-lg" tabindex="-1" aria-hidden="true">
                        <option class="text-gray-900" value="0">Điểm tập kết tương ứng</option>
                        <option class="text-gray-900" v-if="warehouses && warehouses.length" v-for="warehouse in warehouses"
                            :value="warehouse.warehouseId" :key="warehouse.warehouseId">{{
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
                <button v-if="!this.updating" type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2  px-4 rounded
                    md:text-base sm:text-sm text-xs cursor-pointer hover:shadow-lg">Tạo điểm giao dịch</button>
                <button v-else type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded
                    md:text-base sm:text-sm text-xs cursor-pointer hover:shadow-lg">Cập nhật điểm giao dịch</button>
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
            updating: false,
            deliverySelectedId: 0,
        }
    },
    methods: {
        ...mapMutations(['scrollToTop', 'setLogged', 'setLeadership', 'setLeadershipAccessToken',
            'setLeadershipRefreshToken', 'setManagerDC', 'setDCManagerAccessToken', 'setDCManagerRefreshToken',
            'setManagerWH', 'setWHManagerAccessToken', 'setWHManagerRefreshToken', 'setTellerDC', 'setTellerDCAccessToken',
            'setTellerDCRefresToken', 'setStaffWH']),
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
                let res = await axios.post('/deliveryCenters', this.form,
                    {
                        headers: {
                            "Authorization": `Bearer ${this.leadershipToken.accessToken}`
                        }
                    }, { withCredentials: true });
                this.getAllDeliveryCenter();
                this.createdANewDC();
            } catch (err) {
                if (err.response && err.response.data.error === 'jwt expired') {
                    await this.refreshToken();
                    await this.handleCreateDC();
                } else if (err.response && err.response.data.error) {
                    alert(err.response.data.error);
                } else {
                    alert("An error occurred while processing the request.");
                }
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
                    const res = await axios.get(`/warehouses/${this.provinceSelected.provinceMunicipalityId}`, {
                        headers: {
                            "Authorization": `Bearer ${this.leadershipToken.accessToken}`
                        }
                    },
                        { withCredentials: true });
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
            this.updating = false;
            this.getAllDeliveryCenter();
            this.mountedComponent();
            this.createNew = !this.createNew;
        },
        updateDeliveryCenter() {
            this.updating = true;
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
            if (this.districtSelected.districtId == 0) {
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
                if (this.districtSelected.district != '' && this.provinceSelected.provinceMunicipality != '') {
                    this.form.address += ', ' + this.districtSelected.district + ', ' + this.provinceSelected.provinceMunicipality;
                }
                event.preventDefault();
                this.scrollToTop();
                if (this.updating) {
                    await this.handleUpdateDC();
                } else {
                    await this.handleCreateDC();
                }
            }
        },

        async handleUpdateDC() {
            try {
                let res = await axios.put(`/deliveryCenters/${this.deliverySelectedId}`, this.form,
                    {
                        headers: {
                            "Authorization": `Bearer ${this.leadershipToken.accessToken}`
                        }
                    }, { withCredentials: true });
                this.getAllDeliveryCenter();
                this.createdANewDC();
            } catch (err) {
                if (err.response && err.response.data.error == 'jwt expired') {
                    await this.refreshToken();
                    await this.handleUpdateDC();
                } else if (err.response && err.response.data.error) {
                    alert(err.response.data.error);
                } else {
                    alert("An error occurred while processing the request.");
                }
            }
        },

        async deleteDeliveryCenter(dc) {
            try {
                let res = await axios.delete(`/deliveryCenters/${dc.deliveryCenterId}`, {
                    headers: { "Authorization": `Bearer ${this.leadershipToken.accessToken}`}
                }, { withCredentials: true })
                this.getAllDeliveryCenter();
            } catch (error) {
                console.log("delete Error");
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
        ...mapState(['isLogin', 'leadership', 'leadershipToken', 'manager_DC', 'managerDCToken', 'manager_WH', 'managerWHToken',
            'staff_WH', 'teller_DC']),
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
} */</style>