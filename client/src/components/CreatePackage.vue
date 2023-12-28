<template>
    <div v-if="!this.isCreated" id="container">
        <div v-if="!this.createNew" class="mx-auto">
            <div class="grid grid-cols-6 mx-auto">
                <span class="col-start-1 col-end-5 max-w-fit">
                    <h1 class="font-semibold py-2 mt-2 text-center lg:text-2xl md:text-xl sm:text-lg text-base font-sans">
                        Danh sách đơn hàng đã ghi nhận
                    </h1>
                </span>
                <span class="col-start-5 col-end-7">
                    <span class="">
                    <button v-on:click="this.createPackageBill()" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-2 
                    mx-4 md:text-base sm:text-sm text-xs rounded btn cursor-pointer shadow-lg">
                        Ghi nhận hàng mới
                    </button>
                    </span>
                    <span class="">
                        <button v-on:click="this.fetchSendPackagesData()" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-2 
                        mx-4 md:text-base sm:text-sm text-xs rounded btn cursor-pointer shadow-lg">
                            Tải lại
                        </button>
                    </span>
                </span>
                
            </div>

            <hr class="my-2 mx-auto ">

            <div class="w-full mx-auto" id="course">
                <table>
                    <tr>
                        <th
                            class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">
                            Mã đơn</th>
                        <th
                            class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">
                            Thông tin người gửi</th>
                        <th
                            class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">
                            Thông tin người nhận</th>
                        <th
                            class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">
                            Mã điểm GD bên gửi</th>
                        <th
                            class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">
                            Mã điểm GD bên nhận</th>
                        <th
                            class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">
                            Ngày giờ gửi</th>
                        <th
                            class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">
                            Trạng thái</th>
                        <th
                            class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">
                            Xóa</th>
                    </tr>

                    <tr v-for="packages in displayedItemList">
                        <td class="py-2 px-4 border text-center items-center justify-center md:text-base sm:text-sm text-xs">{{
                            packages.packageId }}</td>
                        <td class="py-2 px-4 border text-center items-center justify-center md:text-base sm:text-sm text-xs truncate">
                            <tr >{{ packages.senderName }}</tr>
                            <tr>{{ packages.senderPhone }}</tr>
                    </td>
                    <td class="py-2 px-4 border text-center items-center justify-center md:text-base sm:text-sm text-xs truncate">
                        <tr>{{ packages.receiverName }}</tr>
                        <tr>{{ packages.receiverPhone }}</tr>
                    </td>
                    <td class="py-2 px-4 border text-center items-center justify-center md:text-base sm:text-sm text-xs">{{
                        packages.deliveryCenterSendId }}</td>
                    <td class="py-2 px-4 border text-center items-center justify-center md:text-base sm:text-sm text-xs">
                        {{ packages.deliveryCenterReceiveId }}
                    </td>
                    <td class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs truncate">{{
                        packages.status_details[0].time }}</td>
                    <td v-if="packages.status_details[0].package_status.packageStatus == 'Accept'"
                        class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs truncate"> Đã
                        nhận từ khách hàng
                    </td>
                    <td class="py-2 px-4 border items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="w-8 h-8 cursor-pointer hover:opacity-30 hover:shadow-lg mx-auto" width="800px" height="800px"
                            viewBox="0 0 24 24" fill="none" @click="deletePackage(packages)">
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
                </table>

                <div class="my-4">
                    <div class="max-w-fit mx-auto">
                        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded 
                    cursor-pointer shadow-lg md:text-base sm:text-sm text-xs" @click="goToPage(currentPage - 1)"
                            :disabled="currentPage === 1">Previous Page</button>
                        <span class="pl-10 pr-10 md:text-base sm:text-sm text-xs">Trang <strong>{{ currentPage }}</strong>
                            trong tổng số <strong>{{ totalPages
                            }}</strong></span>
                        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded 
                    cursor-pointer shadow-lg md:text-base sm:text-sm text-xs" @click="goToPage(currentPage + 1)"
                            :disabled="currentPage === totalPages">Next Page</button>
                    </div>
                </div>
            </div>

        </div>

        <div v-else class="md:max-w-5xl sm:max-w-3xl max-w-xl w-11/12 mx-auto">
            <div class="py-2 grid gird-cols-6">
                <span class="col-start-1 col-end-5 py-2">
                    <h1 class="inline-flex font-semibold lg:text-xl md:text-lg sm:text-base text-sm">
                        Ghi nhận hàng mới
                    </h1>
                </span>
                <span class="col-start-6 mx-auto">
                    <button v-on:click="this.createPackageBill()" class="bg-blue-500 hover:bg-blue-700 hover:shadow-xl text-white font-bold 
                    md:text-base sm:text-sm text-xs py-2 px-4 rounded cursor-pointer hover:shadow-lg btn">
                        Hủy bỏ
                    </button>
                </span>
            </div>

            <hr class="my-2 mx-auto">
            <div class="" id="course">
                <form ref="accForm" @submit="handleSubmit"
                    class="bg-white items-center shadow-lg rounded px-8 pt-6 pb-8 mb-4" novalidate autocapitalize="off">
                    <h1 class="text-lg"><strong>Thông tin phía gửi:</strong></h1><br>
                    <h1><strong>Nơi gửi:</strong></h1><br>
                    <label for="province" class="info">Tỉnh/Thành phố: <strong>
                        {{this.tellerDC[0].delivery_center.district.district }}
                        -{{this.tellerDC[0].delivery_center.district.province_municipality.provinceMunicipality}}
                        </strong>
                    </label><br>
                    
                    <label v-if="this.deliveryCenter[0]" for="delivCent" class="info">Địa chỉ điểm giao dịch: <strong>{{
                        this.deliveryCenter[0].address }}</strong></label>
                    <br>
                    <br>
                    <h1><strong>Thông tin người gửi:</strong></h1><br>
                    <label for="">Tên người gửi</label>
                    <input type="text" id="senderName" name="senderName" placeholder="Nhập tên người gửi"
                        v-model="form.senderName" class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                         ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                          sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs hover:shadow-lg">
                    <p class="error" v-if="createPackageError.senderNameError.length > 0">{{
                        createPackageError.senderNameError[0] }}<br></p>
                    <br>

                    <label for="">Số điện thoại người gửi</label>
                    <input type="text" id="senderPhone" name="senderPhone" placeholder="Nhập số điện thoại người gửi"
                        v-model="form.senderPhone" class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                         ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                          sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs hover:shadow-lg">
                    <p class="error" v-if="createPackageError.senderPhoneError.length > 0">{{
                        createPackageError.senderPhoneError[0] }}<br></p>
                    <br>

                    <label for="">Địa chỉ người gửi</label>
                    <input type="text" id="senderAddress" name="senderAddress" placeholder="Nhập địa chỉ người gửi"
                        v-model="form.senderAddress" class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                         ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                          sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs hover:shadow-lg">
                    <p class="error" v-if="createPackageError.senderAddressError.length > 0">{{
                        createPackageError.senderAddressError[0] }}<br></p>
                    <br>

                    <h2><strong>Thông tin đơn gửi:</strong></h2>
                    <br>
                    <label for="">Loại hàng:</label>
                    <br>
                    <br>
                    <div class="flex">
                        <div class="flex items-center h-5 ">
                            <input type="radio" id="packageTypeIdMerchandise" aria-describedby="packageTypeInfo" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 
                            dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                v-model="form.packageTypeId" @change="this.calculateCodAmount()" :value="2">
                        </div>
                        <div class="ms-2 text-sm mr-4">
                            <label for="packageTypeIdMerchandise" class="font-medium text-gray-900 dark:text-gray-300">Hàng
                                hóa</label>
                            <p id="packageTypeInfo" class="text-xs font-normal text-gray-500 dark:text-gray-300">Trọng lượng
                                tối đa: 8kg</p>
                        </div>

                        <div class="flex items-center h-5 ml-4">
                            <input type="radio" id="packageTypeIdDocument" aria-describedby="packageTypeInfo" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 
                            dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                v-model="form.packageTypeId" @change="this.calculateCodAmount()" :value="1">
                        </div>
                        <div class="ms-2 text-sm">
                            <label for="packageTypeIdDocument" class="font-medium text-gray-900 dark:text-gray-300">Tài
                                liệu</label>
                            <p id="packageTypeInfo" class="text-xs font-normal text-gray-500 dark:text-gray-300">Trọng lượng
                                tối đa: 2kg</p>
                        </div>
                    </div>
                    <p class="error" v-if="createPackageError.packageTypeIdError.length > 0">{{
                        createPackageError.packageTypeIdError[0] }}<br></p><br>

                    <label for="weight">Trọng lượng (Nhập theo gram):</label>
                    <input type="text" id="weight" name="weight" placeholder="Nhập trọng lượng (theo gram)"
                        v-model="form.weightGram" @input="this.calculateCodAmount()" class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                        sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs hover:shadow-lg">
                    <p class="error" v-if="createPackageError.weightGramError.length > 0">{{
                        createPackageError.weightGramError[0] }}<br></p><br>

                    <label for="cost">Phí vận chuyển:</label>
                    <input type="text" id="cost" name="cost" placeholder="Nhập phí vận chuyển" v-model="form.codAmount"
                        class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                        sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs hover:shadow-lg">
                    <p class="error" v-if="createPackageError.costError.length > 0">{{
                        createPackageError.costError[0] }}<br></p><br>

                    <h1 class="text-lg"><strong>Thông tin phía nhận:</strong></h1><br>
                    <h1><strong>Nơi nhận:</strong></h1><br>
                    <label for="province" class="info">Tỉnh/Thành phố:</label>
                    <div id="province" class="w-2/4 common-shadow-input h-[43px] select2-stupid-at-home"
                        data-select2-id="select2-data-73-3wmt">
                        <select id="office-province" name="province_id" v-model="provinceSelectedId"
                            @change="this.solveWhenProvinceChange()" class="search-select w-full h-full select2-hidden-accessible bg-gray-100 rounded-b-lg border-gray-300
                                md:text-base sm:text-sm text-xs cursor-pointer hover:shadow-lg" tabindex="-1" aria-hidden="true"
                            data-select2-id="select2-data-office-province">
                            <option class="text-gray-900" :value="0">Tỉnh/ Thành phố</option>
                            <option class="text-gray-900" v-for="province in provinces"
                                :value="province.provinceMunicipalityId" :key="province.provinceMunicipalityId">{{
                                    province.provinceMunicipality }}</option>
                        </select>
                    </div>
                    <p class="error" v-if="this.createPackageError.provinceError.length > 0">{{
                        createPackageError.provinceError[0] }}</p><br>

                    <label for="district" class="info">Quận/Huyện:</label><br>
                    <div id="district" class="w-2/4 common-shadow-input h-[43px] select2-stupid-at-home"
                        data-select2-id="select2-data-73-3wmt">
                        <select id="district" name="district" v-model="districtSelectedId"
                            @change="this.getTargetDeliveryCenter()" class="search-select w-full h-full select2-hidden-accessible bg-gray-100 rounded-b-lg border-gray-300
                                    md:text-base sm:text-sm text-xs cursor-pointer hover:shadow-lg" tabindex="-1"
                            aria-hidden="true" data-select2-id="select2-data-office-province">
                            <option class="text-gray-900" :value="0">Quận/Huyện</option>
                            <option class="text-gray-900" v-for="district in districts" :value="district.districtId"
                                :key="district.districtId">{{
                                    district.district }}</option>
                        </select>
                    </div>
                    <p class="error" v-if="this.createPackageError.districtError.length > 0">{{
                        createPackageError.districtError[0] }}</p><br>
                    <br>
                    <h1><strong>Thông tin người nhận:</strong></h1><br>

                    <label for="">Tên người nhận:</label>
                    <input type="text" id="receiverName" name="receiverName" placeholder="Nhập họ tên người nhận"
                        v-model="form.receiverName" class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
     ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
      sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs hover:shadow-lg">
                    <p class="error" v-if="createPackageError.receiverNameError.length > 0">{{
                        createPackageError.receiverNameError[0] }}<br></p>
                    <br>

                    <label for="">Số điện thoại người nhận:</label>
                    <input type="text" id="receiverPhone" name="receiverPhone" placeholder="Nhập số điện thoại người nhận"
                        v-model="form.receiverPhone" class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
     ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
      sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs hover:shadow-lg">
                    <p class="error" v-if="createPackageError.receiverPhoneError.length > 0">{{
                        createPackageError.receiverPhoneError[0] }}<br></p>
                    <br>

                    <label for="">Địa chỉ cụ thể người nhận:</label>
                    <input type="text" id="receiverAddress" name="receiverAddress" placeholder="Nhập địa chỉ người nhận"
                        v-model="form.receiverAddress" class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
     ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
      sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs hover:shadow-lg">
                    <p class="error" v-if="createPackageError.receiverAddressError.length > 0">{{
                        createPackageError.receiverAddressError[0] }}<br></p>

                    <br>
                    <button type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded
                md:text-base sm:text-sm text-xs hover:shadow-lg cursor-pointer">Tạo đơn
                        hàng</button>
                </form>
            </div>
        </div>
    </div>

    <div v-else class="items-center justify-center mx-auto">
        <PackageBill :form=this.formBill :teller=this.tellerDC></PackageBill>
        <button @click="this.isCreated = false" class="block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 my-4 
                mx-auto md:text-base sm:text-sm text-xs rounded btn cursor-pointer shadow-lg">Xác nhận</button>
        <!-- <button class="block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 my-4 
                mx-auto md:text-base sm:text-sm text-xs rounded btn cursor-pointer shadow-lg" @click="test()"> test</button> -->
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import axios from 'axios';
import PackageBill from '../components/PackageBill.vue'
export default {
    name: 'CreatePackage',
    components: {
        PackageBill,
    },
    data() {
        return {
            form: {
                packageTypeId: 0,
                deliveryCenterSendId: 0,
                deliveryCenterReceiveId: 0,
                weightGram: 0,
                cost: 0,
                codAmount: 0,
                senderAddress: '',
                receiverAddress: '',
                senderName: '',
                receiverName: '',
                senderPhone: '',
                receiverPhone: '',
                location: '',
            },
            formBill: {
                packageTypeId: 0,
                deliveryCenterSendId: 0,
                deliveryCenterReceiveId: 0,
                weightGram: 0,
                cost: 0,
                codAmount: 0,
                senderAddress: '',
                receiverAddress: '',
                senderName: '',
                receiverName: '',
                senderPhone: '',
                receiverPhone: '',
                location: '',
            },
            createPackageError: {
                packageTypeIdError: [],
                deliveryCenterSendIdError: [],
                deliveryCenterReceiveIdError: [],
                weightGramError: [],
                costError: [],
                codAmountError: [],
                senderAddressError: [],
                receiverAddressError: [],
                senderNameError: [],
                receiverNameError: [],
                senderPhoneError: [],
                receiverPhoneError: [],
                provinceError: [],
                districtError: [],
                deliveryCenterError: [],
            },
            provinceSelectedId: 0,
            districtSelectedId: 0,
            deliverycenterSelectedId: 0,
            packages: [],
            provinces: [],
            districts: [],
            deliveryCenter: [],
            deliveryCenters: [], //dùng
            createNew: false,
            itemsPerPage: 4,
            currentPage: 1,
            tellerDC: [],
            isCreated: false,
        }
    },
    methods: {
        ...mapMutations(['scrollToTop', 'setLogged', 'setLeadership', 'setLeadershipAccessToken',
            'setLeadershipRefreshToken', 'setManagerDC', 'setDCManagerAccessToken', 'setDCManagerRefreshToken',
            'setManagerWH', 'setWHManagerAccessToken', 'setWHManagerRefreshToken', 'setTellerDC', 'setTellerDCAccessToken',
            'setTellerDCRefreshToken', 'setStaffWH']),
        calculateCodAmount() {
            // Replace this with your actual calculation logic
            // For example, multiply the weightGram by a constant value
            let dist = this.form.weightGram;
            this.form.codAmount = 0;
            if (this.form.packageTypeId == 1) {
                if (dist <= 400) {
                    this.form.codAmount += 0.28 * dist;
                } else if (dist <= 800) {
                    this.form.codAmount += 0.28 * 400 + 0.23 * (dist - 400);
                } else if (dist <= 1600) {
                    this.form.codAmount += 0.28 * 400 + 0.23 * 400 + 0.17 * (dist - 800);
                } else if(dist <= 3500) {
                    this.form.codAmount += 0.28 * 400 + 0.23 * 400 + 0.17 * 800 + 0.2267 * (dist - 1600);
                } else {
                    this.form.codAmount += 0.28 * 400 + 0.23 * 400 + 0.17 * 800 + 0.2267 * 1600;
                }
                this.form.codAmount = Math.ceil(this.form.codAmount * 22.67);
            } else {
                if (dist <= 1000) {
                    this.form.codAmount += 0.28 * dist;
                } else if (dist <= 2500) {
                    this.form.codAmount += 0.28 * 1000 + 0.23 * (dist - 1500);
                } else if (dist <= 4500) {
                    this.form.codAmount += 0.28 * 1000 + 0.23 * 1500 + 0.17 * (dist - 4500);
                } else {
                    this.form.codAmount += 0.28 * 1000 + 0.23 * 1500 + 0.17 * 2000 + 0.2267 * (dist - 4500);
                }
                this.form.codAmount = Math.ceil(this.form.codAmount * 22.67);
            }
        },
        filteredPackages(arr, id) {
            return arr.filter((packages) => {
                // Check if status_details is an array and has statusId equal to 2 in its last element
                return (
                    Array.isArray(packages.status_details) &&
                    packages.status_details.length > 0 &&
                    packages.status_details[packages.status_details.length - 1].statusId === id
                );
            });
        },
        solveWhenProvinceChange() {
            this.getAllDistrictsOfAProvince();
            this.districtSelectedId = 0;
        },
        async getTellerDC() {
            try {
                let res = await axios.get(`/offices/${this.teller_DC.deliveryCenterId}/accounts/${this.teller_DC.accountTypeId}`, {
                    headers: { "Authorization": `Bearer ${this.tellerDCToken.accessToken}` }
                }, { withCredentials: true });
                if (res.data) {
                    this.tellerDC = res.data;
                }
            } catch (err) {
                if (err.response.data.error == 'jwt expired') {
                    await this.refreshToken();
                    await this.getTellerDC();
                } else { alert(err.response.data.error); }
            }
        },
        async getDeliveryCenterHere() {
            try {
                let res = await axios.get(`/deliveryCentersHere/${this.teller_DC.deliveryCenterId}`, {
                    headers: { "Authorization": `Bearer ${this.tellerDCToken.accessToken}` }
                }, { withCredentials: true });
                if (res.data) {
                    this.deliveryCenter = res.data;
                }
            } catch (err) {
                if (err.response.data.error == 'jwt expired') {
                    await this.refreshToken();
                    await this.getDeliveryCenterHere();
                } else { alert(err.response.data.error); }
            }
        },
        async fetchSendPackagesData() {
            try {
                let res = await axios.get(`/deliveryCenters/${this.teller_DC.deliveryCenterId}/packages/statuses`, {
                    params: {
                        deliveryCenterType: 'send'
                    },
                    headers: { "Authorization": `Bearer ${this.tellerDCToken.accessToken}` },
                    withCredentials: true
                });
                if (res.data) {
                    this.packages = res.data;
                    this.packages = this.filteredPackages(this.packages, 1);
                }

            } catch (err) {
                if (err.response.data.error == 'jwt expired') {
                    await this.refreshToken();
                    await this.fetchSendPackagesData();
                }
                else { alert(err.response.data.error); }
            }
        },
        async refreshToken() {
            let res = await axios.post('/refresh', {
                refreshToken: this.tellerDCToken.refreshToken,
                withCredentials: true
            }, {
                headers:
                {
                    'x_authorization': `${this.tellerDCToken.accessToken}`,
                }, withCredentials: true
            });

            this.setTellerDCAccessToken(res.data);
        },
        async handleCreatePackage() {
            try {
                let res = await axios.post('/packages', this.form, {
                    headers: { "Authorization": `Bearer ${this.tellerDCToken.accessToken}` }
                }, { withCredentials: true });
                if (res.data) {
                    this.formBill = this.form;
                    this.isCreated = true;
                    this.fetchSendPackagesData();
                    this.createPackageBill();
                }
            } catch (err) {
                if (err.reponse && err.response.data && err.response.data.error == 'jwt expired') {
                    await this.refreshToken();
                    await this.handleCreatePackage();
                } else { alert(err.response.data.error); }
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
            if (this.provinceSelectedId > 0) {
                try {
                    const res = await axios.get(`/provinces/${this.provinceSelectedId}/districts`, { withCredentials: true });
                    this.districts = res.data;
                } catch (error) {
                    console.error('getDistrictofAProvince:', error.message);
                }
            }
        },
        async getAllWarehouseofAProvinces() {
            this.wareHouses = null;
            if (this.provinceSelectedId > 0) {
                try {
                    const res = await axios.get(`/warehouses/${this.provinceSelectedId}`, {
                        headers: { "Authorization": `Bearer ${this.tellerDCToken.accessToken}` }
                    }, { withCredentials: true });
                    this.wareHouses = res.data;
                } catch (error) {
                    console.error('getDistrictofAProvince:', error.message);
                }
            }
        },

        async getTargetDeliveryCenter() {
            this.deliveryCenters = null;
            if (this.districtSelectedId > 0) {
                try {
                    const res = await axios.get(`/deliveryCenters/${this.districtSelectedId}`, {
                        headers: { "Authorization": `Bearer ${this.tellerDCToken.accessToken}` }
                    }, { withCredentials: true });
                    this.deliveryCenters = res.data;
                    this.form.deliveryCenterReceiveId = this.deliveryCenters[0].deliveryCenterId;
                } catch (err) {
                    console.log('getDCfromDistrict: ', err.respone.data.error)
                }
            }

        },
        createPackageBill() {
            this.resetError();
            this.provinceSelectedId = 0;
            this.districtSelectedId = 0;
            this.deliverycenterSelectedId = 0;
            this.form.packageTypeId = 0;
            this.form.deliveryCenterSendId = 0;
            this.form.deliveryCenterReceiveId = 0;
            this.form.weightGram = 0;
            this.form.cost = 0;
            this.form.codAmount = 0;
            this.form.senderAddress = '',
            this.form.receiverAddress = '',
            this.form.senderName = '',
            this.form.receiverName = '',
            this.form.senderPhone = '',
            this.form.receiverPhone = '',
            this.form.location = '',
            this.districts = null;
            this.wareHouses = null;
            this.deliveryCenters = null;
            this.createNew = !this.createNew;
        },
        resetError() {
            for (var i in this.createPackageError) {
                this.createPackageError[i] = [];
            }
        },
        checkEmptyError() {
            for (var i in this.createPackageError) {
                if (this.createPackageError[i].length != 0) {
                    return false;
                }
            }
            return true;
        },
        validateAndPreSubmitCreatePackage() {
            this.resetError();

            if (this.provinceSelectedId == 0) {
                this.createPackageError.provinceError.push("Hãy chọn Tỉnh/Thành phố nơi người nhận!");
            }
            if (this.districtSelectedId == 0) {
                this.createPackageError.districtError.push("Hãy chọn Quận/Huyện nơi người nhận!");
            }

            if (this.form.packageTypeId == 0) {
                this.createPackageError.packageTypeIdError.push('Hãy chọn loại hàng gửi!')
            }
            if (this.form.weightGram == 0) {
                this.createPackageError.weightGramError.push('Nhập trọng lượng hàng (theo gram)')
            }
            // this.form.codAmount = 30000
            this.form.deliveryCenterSendId = this.deliveryCenter[0].deliveryCenterId;

            if (!this.form.senderName) {
                this.createPackageError.senderNameError.push("Hãy nhập tên người gửi!");
            } else if (!/^[A-Za-zÀ-ỹ]+$/.test(this.form.senderName.replace(/\s/g, ""))) {
                this.createPackageError.senderNameError.push("Tên chỉ được bao gồm chữ cái!");
            }

            if (!this.form.receiverName) {
                this.createPackageError.receiverNameError.push("Hãy nhập tên người nhận!");
            } else if (!/^[A-Za-zÀ-ỹ]+$/.test(this.form.receiverName.replace(/\s/g, ""))) {
                this.createPackageError.receiverNameError.push("Tên chỉ được bao gồm chữ cái!");
            }

            if (!this.form.senderAddress) {
                this.createPackageError.senderAddressError.push("Hãy nhập địa chỉ người gửi!")
            } else {
                this.form.senderAddress += ', ' + this.tellerDC[0].delivery_center.district.district + ', ' +
                    this.tellerDC[0].delivery_center.district.province_municipality.provinceMunicipality;
            }

            if (!this.form.receiverAddress) {
                this.createPackageError.receiverAddressError.push("Hãy nhập địa chỉ người nhận!")
            }

            //phone 
            if (!this.form.senderPhone) {
                this.createPackageError.senderPhoneError.push('Hãy nhập số điện thoại người gửi!');
            } else if (!this.form.senderPhone.startsWith('0')) {
                this.createPackageError.senderPhoneError.push('Số điện thoại phải bắt đầu bằng 0!');
            } else if (this.form.senderPhone.length != 10) {
                this.createPackageError.senderPhoneError.push('Số điện thoại phải bao gồm 10 chữ số!');
            } else if (!/[0-9]{10}/.test(this.form.senderPhone)) {
                this.createPackageError.senderPhoneError.push('Số điện thoại chỉ được bao gồm chữ số!');
            }

            if (!this.form.receiverPhone) {
                this.createPackageError.receiverPhoneError.push('Hãy nhập số điện thoại người nhận!');
            } else if (!this.form.receiverPhone.startsWith('0')) {
                this.createPackageError.receiverPhoneError.push('Số điện thoại phải bắt đầu bằng 0!');
            } else if (this.form.receiverPhone.length != 10) {
                this.createPackageError.receiverPhoneError.push('Số điện thoại phải bao gồm 10 chữ số!');
            } else if (!/[0-9]{10}/.test(this.form.receiverPhone)) {
                this.createPackageError.receiverPhoneError.push('Số điện thoại chỉ được bao gồm chữ số!');
            }

            this.form.location = this.deliveryCenter[0].address;
        },
        async handleSubmit(event) {

            this.validateAndPreSubmitCreatePackage();

            if (!this.checkEmptyError()) {
                event.preventDefault();
            }
            else {
                event.preventDefault();
                this.scrollToTop();
                await this.handleCreatePackage();

            }
        },
        async deletePackage(packages) {
            try {
                let res = await axios.delete(`/packages/${packages.packageId}`, {
                    headers: { "Authorization": `Bearer ${this.tellerDCToken.accessToken}` }
                }, { withCredentials: true })
                if (res.data) {
                    this.fetchSendPackagesData();
                    alert("successfully!");
                }
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
        truncateText(text, maxLength) {
            return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
        },
    },

    computed: {
        ...mapState(['isLogin', 'leadership', 'leadershipToken', 'manager_DC', 'manager_WH', 'staff_WH',
            'teller_DC', 'tellerDCToken']),
        totalPages() {
            return Math.ceil(this.packages.length / this.itemsPerPage);
        },
        displayedItemList() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.packages.slice(startIndex, endIndex);
        },
    },
    created() {
        this.getProvinces();
        this.getTellerDC();
        this.getDeliveryCenterHere();
        this.fetchSendPackagesData();
    }
    
}
</script>

<style lang="scss">

</style>