<template>
    <div v-if="!this.createNew" class="custom-warehouse pl-5">
        <div class="head">
            <span>
                <h1 class="inline-flex font-semibold lg:text-3xl md:text-xl sm:text-sm text-xs">
                    Danh sách điểm tập kết toàn quốc
                </h1>
            </span>
            <span>
                <button v-on:click="this.createdANewWH()"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded btn">
                    Tạo điểm tập kết
                </button>
            </span>
        </div>
        <!-- <hr> -->
        <div class="tabcontent" id="course">
            <table class="table-auto">
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Instrutor</th>
                    <th>Fee</th>
                    <th>Delete</th>
                    <th>Change</th>
                </tr>
                <tr v-for="course in courses">
                    <td>ddd</td>
                    <td>dđ</td>
                    <td>ddddd</td>
                    <td>{{ course.courseFee }}</td>
                    <td><button class="remove" @click="removeCourse(course.courseId)">Delete</button></td>
                    <td><button class="remove"
                            @click="openPayment(2); dataAddChapter.addChapterId = course.courseId; getChapter(course.courseId)">Change</button>
                    </td>
                </tr>
            </table>

        </div>
    </div>
    <div v-else class="custom-delivery-center pl-5">
        <div class="head">
            <span>
                <h1 class="inline-flex font-semibold lg:text-3xl md:text-xl sm:text-sm text-xs">
                    Tạo mới điểm tập kết
                </h1>
            </span>
            <span>
                <button v-on:click="this.createdANewWH()"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded btn">
                    Hủy bỏ
                </button>
            </span>
        </div>
        <!-- <hr> -->
        <div class="tabcontent" id="course">
            <form @submit="handleSubmit" class="bg-white items-center shadow-lg rounded px-8 pt-6 pb-8 mb-4" novalidate
                autocapitalize="off">

                <label for="province" class="info">Tỉnh/Thành phố:</label>
                <br>
                <div id="province" class="w-2/5 common-shadow-input h-[43px] select2-stupid-at-home"
                    data-select2-id="select2-data-73-3wmt">
                    <select id="office-province" name="province_id" v-model="provinceSelected"
                        @change="this.getAllDistrictsOfAProvince()"
                        class="search-select w-full h-full select2-hidden-accessible bg-gray-100 rounded-b-lg border-gray-300"
                        tabindex="-1" aria-hidden="true" data-select2-id="select2-data-office-province">
                        <option class="text-gray-900" :value="0">Tỉnh/ Thành phố</option>
                        <option class="text-gray-900" v-for="province in provinces" :value="province"
                            :key="province.provinceMunicipalityId">{{
                                province.provinceMunicipality }}</option>
                    </select>
                </div>
                <p class="error" v-if="this.provinceError.length > 0">{{ provinceError[0] }}</p>
                <br>
                <label for="district" class="info">Quận/Huyện:</label>
                <br>
                <div id="district" class="common-shadow-input w-2/5 h-[43px] select2-stupid-at-home">
                    <select id="slDistrict" name="district_id" v-model="districtSelected"
                        class="search-select w-full h-full select2-hidden-accessible bg-gray-100 border-gray-300s"
                        tabindex="-1" aria-hidden="true">
                        <option class="text-gray-900" value="">Quận/Huyện</option>
                        <option class="text-gray-900" v-if="districts && districts.length" v-for="district in districts"
                            :value="district" :key="district.districtId">{{
                                district.district }}</option>
                    </select>
                </div>
                <p class="error" v-if="districtError.length > 0">{{ districtError[0] }}</p>
                <br>

                <label for="address" class="info">Địa chỉ cụ thể: <br /> </label>
                <input type="text" ref="inputText" id="address" class="sub w-2/5" v-model="form.address">
                <p class="error" v-if="addressError.length > 0">{{ addressError[0] }}</p>
                <br>
                <br>
                <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Tạo điểm
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
            wareHouses: [],
            createNew: false,
            provinces: [],
            districts: [],
            provinceError: [],
            districtError: [],
            addressError: [],
        }
    },
    methods: {
        ...mapMutations(['scrollToTop']),
        async handleCreateWH() {
            try {
                let res = axios.post('/warehouses', this.form, { withCredentials: true });
                console.log(res.data);
                alert("SUCCESS");
            } catch (err) {
                alert(err.response.data.error);
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
                    this.districts = res.data
F
                } catch (error) {
                    console.error('getDistrictofAProvince:', error.message);
                }
            }
        },
        async getAllWarehouse() {
            try {
                let res = await axios.get('/warehouses', { withCredentials: true });
                this.wareHouses = res.data;
                // alert(this.deliveryCenters);
            }
            catch (error) {
                console.error('getAllWareHouses:', error.message);
            }
        },
        createdANewWH() {
            this.createNew = !this.createNew;
        },
        preSubmit() {
            this.form.provinceMunicipalityId = this.provinceSelected.provinceMunicipalityId;
            // this.form.address = this.form.address + ', ' + this.districtSelected.district + ', ' + this.provinceSelected.provinceMunicipality;

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
                // alert(this.form.provinceMunicipalityId);
                this.form.address = this.form.address + ', ' + this.districtSelected.district + ', ' + this.provinceSelected.provinceMunicipality;
                event.preventDefault();
                this.scrollToTop();
                await this.handleCreateWH();
            }
        },
        // showFinalAddress() {
        //     this.$refs.inputText.innerHTML = this.form.address + ', ' + this.districtSelected.district + ', ' + this.provinceSelected.provinceMunicipality;
        // }
    },

    computed: {
        ...mapState([]),
    },
    mounted() {
        this.getProvinces();
        this.getAllWarehouse();
    },
}
</script>

<style>
* {
    /* display: block; */
}

h1 {
    font-size: 30px;
}

.custom-warehouse {
    width: 100%;
    /* Set the width to 100% to take up the full width */
    /* Add other styling if needed */
}

.btn {
    float: right;
    margin-right: 20%;
}

/* .sub, .province, .district {
    border-radius: 5px;
} */
.tabcontent {
    float: left;
    padding: 0px 12px;
    border: 1px solid #ccc;
    width: 80%;
    border-left: none;
    height: auto;
    /* display: none; */
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
}
</style>