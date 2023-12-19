<template>
    <div id="container">
        <div v-if="!this.createNew" class="w-10/12 h-10/12 mx-auto">
            <div class="w-8/12 grid grid-cols-6 mx-auto">
                <span class="col-start-1 col-end-5 max-w-fit">
                    <h1 class="font-semibold py-2 mt-2 text-center lg:text-2xl md:text-xl sm:text-lg text-base">
                        Danh sách đơn hàng
                    </h1>
                </span>
                <span class="col-start-6">
                    <button v-on:click="this.createPackageBill()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 mt-2 
                    mx-4 md:text-base sm:text-sm text-xs rounded btn cursor-pointer shadow-lg">
                        Thêm đơn hàng
                    </button>
                </span>
            </div>

            <hr class="my-2 mx-auto w-9/12">

            <div class="w-9/12 mx-auto" id="course">
                <table>
                    <tr>
                        <th
                            class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">
                            Mã đơn hàng</th>
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
                            Chỉnh sửa</th>
                        <th
                            class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">
                            Xóa</th>
                    </tr>
                    <tr v-for="account in displayedItemList">
                        <td class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs">{{
                            account.deliveryCenterId }}</td>
                        <td class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs">
                            {{
                                account.delivery_center &&
                                account.delivery_center.district &&
                                account.delivery_center.district.province_municipality
                                ? account.delivery_center.district.province_municipality.provinceMunicipality
                                : 'N/A'
                            }}
                        </td>
                        <td class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs">{{
                            account.delivery_center &&
                            account.delivery_center.district
                            ? account.delivery_center.district.district
                            : 'N/A' }}</td>
                        <td class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs">
                            DC_{{ account.delivery_center &&
                                account.delivery_center.district &&
                                account.delivery_center.district.provinceMunicipalityId
                                ?
                                `${account.delivery_center.district.provinceMunicipalityId}/${account.delivery_center.districtId}_MANAGER_${account.accountId}`
                                : 'N/A'
                            }}
                        </td>
                        <td class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs truncate">{{
                            account.firstName + ' ' + account.lastName }}</td>
                        <td class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs truncate">{{
                            truncateText(account.email, 20) }}</td>
                        <td class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs truncate">{{
                            account.phone }}</td>
                        <td class="py-2 px-4 border items-center justify-center"> <img
                                class="2xl:w-1/5 xl:w-2/5 lg:w-3/5 w-full mx-auto cursor-pointer"
                                src="../assets/img/note.png" alt=""> </td>
                        <td class="py-2 px-4 border items-center justify-center">
                            <img class="2xl:w-1/5 xl:w-2/5 lg:w-3/5 w-full mx-auto cursor-pointer hover:opacity-90 py-6"
                                src="../assets/img/trash.png" alt="">
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
                        Tạo mới tài khoản
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
                    <h2><strong>Nơi gửi:</strong></h2><br>
                    
                    <label for="province" class="info">Tỉnh/Thành phố:</label><br>
                    <div id="province" class="w-2/4 common-shadow-input h-[43px] select2-stupid-at-home"
                        data-select2-id="select2-data-73-3wmt">
                        <select id="office-province" name="province_id" v-model="provinceSelectedId"
                            @change="this.solveWhenProvinceChange()" 
                            class="search-select w-full h-full select2-hidden-accessible bg-gray-100 rounded-b-lg border-gray-300
                                md:text-base sm:text-sm text-xs cursor-pointer hover:shadow-lg" tabindex="-1"
                            aria-hidden="true" data-select2-id="select2-data-office-province">
                            <option class="text-gray-900" :value="0">Tỉnh/ Thành phố</option>
                            <option class="text-gray-900" v-for="province in provinces"
                                :value="province.provinceMunicipalityId" :key="province.provinceMunicipalityId">{{
                                    province.provinceMunicipality }}</option>
                        </select>
                    </div>

                    <p class="error" v-if="this.provinceError.length > 0">{{ provinceError[0] }}<br></p>
                    <br>

                    <label for="district" class="info">Tỉnh/Thành phố:</label><br>
                    <div id="district" class="w-2/4 common-shadow-input h-[43px] select2-stupid-at-home"
                    data-select2-id="select2-data-73-3wmt">
                        <select id="district" name="district" v-model="districtSelectedId"
                            @change="this.getAllDeliveryCenterOfADistrict()" 
                            class="search-select w-full h-full select2-hidden-accessible bg-gray-100 rounded-b-lg border-gray-300
                                md:text-base sm:text-sm text-xs cursor-pointer hover:shadow-lg" tabindex="-1" aria-hidden="true"
                            data-select2-id="select2-data-office-province">
                            <option class="text-gray-900" :value="0">Quận/Huyện</option>
                            <option class="text-gray-900" v-for="district in districts" :value="district.districtId"
                                :key="district.district">{{
                                    district.district }}</option>
                        </select>
                    </div>
                    <p class="error" v-if="this.districtError.length > 0">{{ districtError[0] }}</p><br>

                    <label for="deliveryCenter" class="info">Tỉnh/Thành phố:</label><br>
                    <div id="deliveryCenter" class="w-2/4 common-shadow-input h-[43px] select2-stupid-at-home"
                    data-select2-id="select2-data-73-3wmt">
                        <select id="deleveryCenter" name="deleveryCenter" v-model="deliverycenterSelectedId"
                            @change="this.getAllDeliveryCenterOfADistrict()" 
                            class="search-select w-full h-full select2-hidden-accessible bg-gray-100 rounded-b-lg border-gray-300
                                md:text-base sm:text-sm text-xs cursor-pointer hover:shadow-lg" tabindex="-1" aria-hidden="true"
                            data-select2-id="select2-data-office-province">
                            <option class="text-gray-900" :value="0">Điểm giao dịch</option>
                            <option class="text-gray-900" v-for="delivery_center in deliveryCenters" :value="delivery_center.deliveryCenterId"
                                :key="delivery_center.deliveryCenterId">{{
                                    delivery_center.address }}</option>
                        </select>
                    </div>
                    <p class="error" v-if="this.deliverycenterError.length > 0">{{ deliverycenterError[0] }}</p>
                    <br>

                    <h2><strong>Thông tin đơn gửi:</strong></h2><br>

                    <div class="flex">
                        <div class="flex items-center h-5 ">
                            <input type="radio" id="packageTypeIdMerchandise" value="Hàng hóa"  aria-describedby="packageTypeInfo"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 
                            dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                            v-model="packageType" @click="test">
                        </div>
                        <div class="ms-2 text-sm mr-4">
                            <label for="packageTypeIdMerchandise" class="font-medium text-gray-900 dark:text-gray-300">Hàng hóa</label>
                            <p id="packageTypeInfo" class="text-xs font-normal text-gray-500 dark:text-gray-300">Trọng lượng tối đa: 8kg</p>
                        </div>

                        <div class="flex items-center h-5 ml-4">
                            <input type="radio" id="packageTypeIdDocument" value="Tài liệu"  aria-describedby="packageTypeInfo"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 
                            dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                v-model="packageType" @click="test">
                        </div>
                        <div class="ms-2 text-sm">
                            <label for="packageTypeIdDocument" class="font-medium text-gray-900 dark:text-gray-300">Tài liệu</label>
                            <p id="packageTypeInfo" class="text-xs font-normal text-gray-500 dark:text-gray-300">Trọng lượng tối đa: 2kg</p>
                        </div>
                    </div><br>

                    <label for="weight">Trọng lượng:</label>
                    <input type="text" id="weight" name="weight" placeholder="Nhập trọng lượng" 
                        class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                        sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs hover:shadow-lg">

                    <label for="cost">Phí vận chuyển:</label>
                    <input type="text" id="cost" name="cost" placeholder="Nhập phí vận chuyển"
                        v-model="repassword" class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                        sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs hover:shadow-lg">

                    <label for="senderName">Họ tên người gửi:</label>
                    <input type="text" id="senderName" name="senderName" placeholder="Nhập tên họ" v-model="form.firstName"
                        class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                        sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs hover:shadow-lg">
                    <p class="error" v-if="firstNameError.length > 0">{{ firstNameError[0] }}<br></p><br>

                    <label for="senderAddress">Địa chỉ người gửi:</label>
                    <input type="text" id="senderAddress" name="senderAddress" placeholder="Nhập địa chỉ" v-model="form.address"
                        class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                        sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs hover:shadow-lg">

                    <label for="senderPhone">Số điện thoại người gửi:</label>
                    <input type="text" id="senderPhone" name="senderPhone" placeholder="Nhập số điện thoại" v-model="form.phone" 
                        class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                        sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs hover:shadow-lg">
                    <p class="error" v-if="phoneError.length > 0">{{ phoneError[0] }}<br></p><br>


                    <label for="receiverName">Họ tên người nhận:</label>
                    <input type="text" id="receiverName" name="receiverName" placeholder="Nhập tên họ" v-model="form.firstName"
                        class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                        sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs hover:shadow-lg">
                    <p class="error" v-if="firstNameError.length > 0">{{ firstNameError[0] }}<br></p><br>

                    <label for="receiverAddress">Địa chỉ người nhận:</label>
                    <input type="text" id="receiverAddress" name="receiverAddress" placeholder="Nhập địa chỉ" v-model="form.address"
                        class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                        sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs hover:shadow-lg">

                    <label for="receiverPhone">Số điện thoại người nhận:</label>
                    <input type="text" id="receiverPhone" name="receiverPhone" placeholder="Nhập số điện thoại" v-model="form.phone" 
                        class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                        sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs hover:shadow-lg">
                    <p class="error" v-if="phoneError.length > 0">{{ phoneError[0] }}<br></p><br>

                <br>
                <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
                md:text-base sm:text-sm text-xs hover:shadow-lg cursor-pointer">Tạo đơn
                    hàng</button>
            </form>
        </div>
    </div>

</div></template>

<script>

</script>

<style>