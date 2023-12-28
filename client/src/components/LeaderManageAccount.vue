<template>
    <div id="container">
        <div v-if="!this.createNew" class="mx-4">
            <div class="grid grid-cols-6">
                <span class="col-start-1 col-end-5 max-w-fit">
                    <h1 class="flex font-semibold font-sans h-full items-center justify-center text-center lg:text-xl md:lg sm:text-base text-sm">
                        Danh sách tài khoản nhân viên
                    </h1>
                </span>
                <span class="flex col-start-6 items-center justify-center mx-auto">
                    <button v-on:click="this.createdANewAcc()"
                        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 my-4
                            md:text-base sm:text-sm text-xs rounded btn hover:shadow-lg cursor-pointer">
                        Thêm tài khoản
                    </button>
                </span>
            </div>
            <hr class="mb-4 mx-auto">

            <div class="">
                <div class="grid grid-cols-8">
                    <span class="col-start-1 col-end-4">
                        <h2 class="py-2 md:text-base sm:text-sm text-xs">Chọn loại tài khoản:</h2>
                        <select id="office-province" name="province_id" v-model="accountTypeSelected"
                            @change="handleFilter(); fetchAccountsData(); test()" class="search-select mb-4 w-11/12 h-1/2 select2-hidden-accessible bg-gray-100 rounded-b-lg border-gray-300
                    md:text-base sm:text-sm text-xs cursor-pointer hover:shadow-lg" tabindex="-1" aria-hidden="true"
                            data-select2-id="select2-data-office-province">
                            <option class="md:text-base sm:text-sm text-xs border text-gray-900" :value="0" selected>Loại
                                tài
                                khoản</option>
                            <option class="md:text-base sm:text-sm text-xs border text-gray-900" :value="1">Tài khoản trưởng
                                điểm tập kết</option>
                            <option class="md:text-base sm:text-sm text-xs border text-gray-900" :value="2">Tài khoản trưởng
                                điểm giao dịch</option>
                        </select>
                    </span>

                    <span v-if="accountTypeSelected != 0"
                        class="flex col-start-5 col-end-7 mt-8 mx-auto items-center justify-center">
                        <svg class="w-8 h-8 mx-2" xmlns="http://www.w3.org/2000/svg" width="800px" height="800px"
                            viewBox="0 0 24 24" fill="none">
                            <path
                                d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                                stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <input type="text" class="flex w-full h-2/3 rounded-lg" placeholder="Search" v-model="searchInput">
                    </span>

                    <span v-if="accountTypeSelected != 0"
                        class="flex col-start-7 col-end-9 h-2/3 mt-8 py-0 mx-auto items-center justify-center">
                        <svg class="w-8 h-8 mx-2" xmlns="http://www.w3.org/2000/svg" width="800px" height="800px"
                            viewBox="0 0 24 24" fill="none">
                            <path
                                d="M3 4.6C3 4.03995 3 3.75992 3.10899 3.54601C3.20487 3.35785 3.35785 3.20487 3.54601 3.10899C3.75992 3 4.03995 3 4.6 3H19.4C19.9601 3 20.2401 3 20.454 3.10899C20.6422 3.20487 20.7951 3.35785 20.891 3.54601C21 3.75992 21 4.03995 21 4.6V6.33726C21 6.58185 21 6.70414 20.9724 6.81923C20.9479 6.92127 20.9075 7.01881 20.8526 7.10828C20.7908 7.2092 20.7043 7.29568 20.5314 7.46863L14.4686 13.5314C14.2957 13.7043 14.2092 13.7908 14.1474 13.8917C14.0925 13.9812 14.0521 14.0787 14.0276 14.1808C14 14.2959 14 14.4182 14 14.6627V17L10 21V14.6627C10 14.4182 10 14.2959 9.97237 14.1808C9.94787 14.0787 9.90747 13.9812 9.85264 13.8917C9.7908 13.7908 9.70432 13.7043 9.53137 13.5314L3.46863 7.46863C3.29568 7.29568 3.2092 7.2092 3.14736 7.10828C3.09253 7.01881 3.05213 6.92127 3.02763 6.81923C3 6.70414 3 6.58185 3 6.33726V4.6Z"
                                stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <div id="province_filter"
                            class="flex w-full common-shadow-input h-[43px] select2-stupid-at-home items-center"
                            data-select2-id="select2-data-73-3wmt">
                            <select id="office-province_filter" name="province_id" v-model="provinceFilterId"
                                @change="this.solveWhenProvinceChange()"
                                class="search-select w-full h-full select2-hidden-accessible bg-gray-100 max-w-max
                                rounded-b-lg border-gray-300 md:text-base sm:text-sm text-xs cursor-pointer hover:shadow-lg" tabindex="-1" aria-hidden="true"
                                data-select2-id="select2-data-office-province">
                                <option class="text-gray-900" :value="0">Tỉnh/ Thành phố</option>
                                <option class="text-gray-900" v-for="province in provinces"
                                    :value="province.provinceMunicipalityId" :key="province.provinceMunicipalityId">{{
                                        province.provinceMunicipality }}</option>
                            </select>
                        </div>

                    </span>
                </div>

                <!-- HEAD COMP MANAGE  -->
                <div class="mx-auto mt-4" id="course">
                    <table class="w-full" v-if="this.accountTypeSelected == 1">
                        <tr>
                            <th class="bg-green-500 text-white font-bold py-2 px-4 text-center items-center md:text-base sm:text-sm text-xs border">
                                Mã điểm TK</th>
                            <th class="bg-green-500 text-white font-bold py-2 px-4 text-center items-center md:text-base sm:text-sm text-xs border">
                                Tỉnh/Thành phố</th>
                            <th class="bg-green-500 text-white font-bold py-2 px-4 text-center items-center md:text-base sm:text-sm text-xs border">
                                Mã tài khoản</th>
                            <th class="bg-green-500 text-white font-bold py-2 px-4 text-center items-center md:text-base sm:text-sm text-xs border">
                                Tên</th>
                            <th class="bg-green-500 text-white font-bold py-2 px-4 text-center items-center md:text-base sm:text-sm text-xs border">
                                Email</th>
                            <th class="bg-green-500 text-white font-bold py-2 px-4 text-center items-center md:text-base sm:text-sm text-xs border">
                                SĐT</th>
                            <th class="bg-green-500 text-white font-bold py-2 px-4 text-center items-center md:text-base sm:text-sm text-xs border">
                                Chỉnh sửa</th>
                            <th class="bg-green-500 text-white font-bold py-2 px-4 text-center items-center md:text-base sm:text-sm text-xs border">
                                Xóa</th>
                        </tr>
                        <tr v-for="account in displayedItemList" v-if="provinceFilterId != 0">
                            <td v-if="account.warehouse && account.warehouse.provinceMunicipalityId == provinceFilterId"
                                class="py-2 px-4 border text-center items-center md:text-base sm:text-sm text-xs border">
                                {{ account.warehouseId }}</td>
                            <td v-if="account.warehouse && account.warehouse.provinceMunicipalityId == provinceFilterId"
                                class="py-2 px-4 border text-center items-center md:text-base sm:text-sm text-xs border">
                                {{ account.warehouse && account.warehouse.province_municipality
                                    ? account.warehouse.province_municipality.provinceMunicipality
                                    : 'N/A' }}
                            </td>
                            <td v-if="account.warehouse && account.warehouse.provinceMunicipalityId == provinceFilterId"
                                class="py-2 px-4 border text-center items-center md:text-base sm:text-sm text-xs border">
                                WH_{{ account.warehouse && account.warehouse.provinceMunicipalityId
                                    ? account.warehouse.provinceMunicipalityId
                                    : 'N/A' }}_MANAGER_{{ account.accountId }}
                            </td>
                            <td v-if="account.warehouse && account.warehouse.provinceMunicipalityId == provinceFilterId"
                                class="py-2 px-4 border text-center items-center truncate md:text-base sm:text-sm text-xs border">
                                {{ account.firstName + ' ' + account.lastName }}</td>
                            <td v-if="account.warehouse && account.warehouse.provinceMunicipalityId == provinceFilterId"
                                class="py-2 px-4 border text-center items-center truncate md:text-base sm:text-sm text-xs border">
                                {{ account.email }}</td>
                            <td v-if="account.warehouse && account.warehouse.provinceMunicipalityId == provinceFilterId"
                                class="py-2 px-4 border text-center items-center truncate md:text-base sm:text-sm text-xs border">
                                {{ account.phone }}</td>
                            <td v-if="account.warehouse && account.warehouse.provinceMunicipalityId == provinceFilterId"
                                class="flex my-4 mx-auto text-center items-center justify-center">
                                <td class="flex my-4 mx-auto text-center items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        class="w-8 h-8 cursor-pointer hover:opacity-30 hover:shadow-lg" width="800px"
                                        height="800px" viewBox="0 0 24 24" fill="none"
                                        @click="updateAccount(account)">
                                        <path
                                            d="M18.4721 16.7023C17.3398 18.2608 15.6831 19.3584 13.8064 19.7934C11.9297 20.2284 9.95909 19.9716 8.25656 19.0701C6.55404 18.1687 5.23397 16.6832 4.53889 14.8865C3.84381 13.0898 3.82039 11.1027 4.47295 9.29011C5.12551 7.47756 6.41021 5.96135 8.09103 5.02005C9.77184 4.07875 11.7359 3.77558 13.6223 4.16623C15.5087 4.55689 17.1908 5.61514 18.3596 7.14656C19.5283 8.67797 20.1052 10.5797 19.9842 12.5023M19.9842 12.5023L21.4842 11.0023M19.9842 12.5023L18.4842 11.0023"
                                            stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12 8V12L15 15" stroke="#000000" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>
                                </td>
                            </td>
                            <td v-if="account.warehouse && account.warehouse.provinceMunicipalityId == provinceFilterId"
                                class="py-2 px-4 border items-center md:text-base sm:text-sm text-xs">
                                <td class="flex my-4 mx-auto text-center items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        class="w-8 h-8 cursor-pointer hover:opacity-30 hover:shadow-lg" width="800px"
                                        height="800px" viewBox="0 0 24 24" fill="none" @click="deleteAccount(account)">
                                        <path d="M10 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path d="M14 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                                            stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                                            stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </td>
                            </td>
                        </tr>

                        <tr v-else v-for="account in displayedItemList">
                            <td v-if="account.warehouse"
                                class="py-2 px-4 border text-center items-center md:text-base sm:text-sm text-xs border">
                                {{ account.warehouseId }}</td>
                            <td v-if="account.warehouse"
                                class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs border">
                                {{ account.warehouse && account.warehouse.province_municipality
                                    ? account.warehouse.province_municipality.provinceMunicipality
                                    : 'N/A' }}
                            </td>
                            <td v-if="account.warehouse"
                                class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs border">
                                WH_{{ account.warehouse && account.warehouse.provinceMunicipalityId
                                    ? account.warehouse.provinceMunicipalityId
                                    : 'N/A' }}_MANAGER_{{ account.accountId }}
                            </td>
                            <td v-if="account.warehouse"
                                class="py-2 px-4 border items-center justify-center truncate md:text-base sm:text-sm text-xs border">
                                {{ account.firstName + ' ' + account.lastName }}</td>
                            <td v-if="account.warehouse"
                                class="py-2 px-4 border items-center justify-center truncate md:text-base sm:text-sm text-xs border">
                                {{ account.email }}</td>
                            <td v-if="account.warehouse"
                                class="py-2 px-4 border items-center justify-center truncate md:text-base sm:text-sm text-xs border">
                                {{ account.phone }}</td>
                            <td v-if="account.warehouse" class="py-2 px-4 border items-center justify-center">
                                <td class="flex my-4 mx-auto text-center items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        class="w-8 h-8 cursor-pointer hover:opacity-30 hover:shadow-lg" width="800px"
                                        height="800px" viewBox="0 0 24 24" fill="none"
                                        @click="updateAccount(account);">
                                        <path
                                            d="M18.4721 16.7023C17.3398 18.2608 15.6831 19.3584 13.8064 19.7934C11.9297 20.2284 9.95909 19.9716 8.25656 19.0701C6.55404 18.1687 5.23397 16.6832 4.53889 14.8865C3.84381 13.0898 3.82039 11.1027 4.47295 9.29011C5.12551 7.47756 6.41021 5.96135 8.09103 5.02005C9.77184 4.07875 11.7359 3.77558 13.6223 4.16623C15.5087 4.55689 17.1908 5.61514 18.3596 7.14656C19.5283 8.67797 20.1052 10.5797 19.9842 12.5023M19.9842 12.5023L21.4842 11.0023M19.9842 12.5023L18.4842 11.0023"
                                            stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12 8V12L15 15" stroke="#000000" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>
                                </td>

                            </td>
                            <td v-if="account.warehouse"
                                class="py-2 px-4 border items-center md:text-base sm:text-sm text-xs">
                                <td class="flex my-4 mx-auto text-center items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        class="w-8 h-8 cursor-pointer hover:opacity-30 hover:shadow-lg" width="800px"
                                        height="800px" viewBox="0 0 24 24" fill="none" @click="deleteAccount(account)">
                                        <path d="M10 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path d="M14 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                                            stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                                            stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </td>
                            </td>
                        </tr>
                    </table>

                    <table class="w-full" v-if="this.accountTypeSelected == 2">
                        <tr>
                            <th
                                class="bg-green-500 text-white font-bold py-2 px-4 text-center items-center md:text-base sm:text-sm text-xs border">
                                Mã điểm GD</th>
                            <th
                                class="bg-green-500 text-white font-bold py-2 px-4 text-center items-center md:text-base sm:text-sm text-xs border">
                                Tỉnh/Thành phố</th>
                            <th
                                class="bg-green-500 text-white font-bold py-2 px-4 text-center items-center md:text-base sm:text-sm text-xs border">
                                Quận/Huyện</th>
                            <th
                                class="bg-green-500 text-white font-bold py-2 px-4 text-center items-center md:text-base sm:text-sm text-xs border">
                                Mã tài khoản</th>
                            <th
                                class="bg-green-500 text-white font-bold py-2 px-4 text-center items-center md:text-base sm:text-sm text-xs border">
                                Tên</th>
                            <th
                                class="bg-green-500 text-white font-bold py-2 px-4 text-center items-center md:text-base sm:text-sm text-xs border">
                                Email</th>
                            <th
                                class="bg-green-500 text-white font-bold py-2 px-4 text-center items-center md:text-base sm:text-sm text-xs border">
                                SĐT</th>
                            <th
                                class="bg-green-500 text-white font-bold py-2 px-4 text-center items-center md:text-base sm:text-sm text-xs border">
                                Chỉnh sửa</th>
                            <th
                                class="bg-green-500 text-white font-bold py-2 px-4 text-center items-center md:text-base sm:text-sm text-xs border">
                                Xóa</th>
                        </tr>
                        <tr v-if="provinceFilterId != 0" v-for="account in displayedItemList">
                            <td v-if="account.delivery_center && account.delivery_center.district.provinceMunicipalityId == provinceFilterId"
                                class="py-2 px-4 border text-center items-center md:text-base sm:text-sm text-xs">{{
                                    account.deliveryCenterId }}</td>
                            <td v-if="account.delivery_center && account.delivery_center.district.provinceMunicipalityId == provinceFilterId"
                                class="py-2 px-4 border text-center items-center md:text-base sm:text-sm text-xs">
                                {{
                                    account.delivery_center &&
                                    account.delivery_center.district &&
                                    account.delivery_center.district.province_municipality
                                    ? account.delivery_center.district.province_municipality.provinceMunicipality
                                    : 'N/A'
                                }}
                            </td>
                            <td v-if="account.delivery_center && account.delivery_center.district.provinceMunicipalityId == provinceFilterId"
                                class="py-2 px-4 border text-center items-center md:text-base sm:text-sm text-xs">{{
                                    account.delivery_center &&
                                    account.delivery_center.district
                                    ? account.delivery_center.district.district
                                    : 'N/A' }}</td>
                            <td v-if="account.delivery_center && account.delivery_center.district.provinceMunicipalityId == provinceFilterId"
                                class="py-2 px-4 border text-center items-center md:text-base sm:text-sm text-xs">
                                DC_{{ account.delivery_center &&
                                    account.delivery_center.district &&
                                    account.delivery_center.district.provinceMunicipalityId
                                    ?
                                    `${account.delivery_center.district.provinceMunicipalityId}/${account.delivery_center.districtId}_MANAGER_${account.accountId}`
                                    : 'N/A'
                                }}
                            </td>
                            <td v-if="account.delivery_center && account.delivery_center.district.provinceMunicipalityId == provinceFilterId"
                                class="py-2 px-4 border text-center items-center md:text-base sm:text-sm text-xs truncate">
                                {{ account.firstName + ' ' + account.lastName }}</td>
                            <td v-if="account.delivery_center && account.delivery_center.district.provinceMunicipalityId == provinceFilterId"
                                class="py-2 px-4 border text-center items-center md:text-base sm:text-sm text-xs truncate">
                                {{ account.email }}</td>
                            <td v-if="account.delivery_center && account.delivery_center.district.provinceMunicipalityId == provinceFilterId"
                                class="py-2 px-4 border text-center items-center md:text-base sm:text-sm text-xs truncate">
                                {{ account.phone }}</td>
                            <td v-if="account.delivery_center && account.delivery_center.district.provinceMunicipalityId == provinceFilterId"
                                class="py-2 px-4 border items-center justify-center">
                                <td class="flex my-4 mx-auto text-center items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        class="w-8 h-8 cursor-pointer hover:opacity-30 hover:shadow-lg" width="800px"
                                        height="800px" viewBox="0 0 24 24" fill="none"
                                        @click="updateAccount(account);">
                                        <path
                                            d="M18.4721 16.7023C17.3398 18.2608 15.6831 19.3584 13.8064 19.7934C11.9297 20.2284 9.95909 19.9716 8.25656 19.0701C6.55404 18.1687 5.23397 16.6832 4.53889 14.8865C3.84381 13.0898 3.82039 11.1027 4.47295 9.29011C5.12551 7.47756 6.41021 5.96135 8.09103 5.02005C9.77184 4.07875 11.7359 3.77558 13.6223 4.16623C15.5087 4.55689 17.1908 5.61514 18.3596 7.14656C19.5283 8.67797 20.1052 10.5797 19.9842 12.5023M19.9842 12.5023L21.4842 11.0023M19.9842 12.5023L18.4842 11.0023"
                                            stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12 8V12L15 15" stroke="#000000" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>
                                </td>
                            </td>


                            <td v-if="account.delivery_center && account.delivery_center.district.provinceMunicipalityId == provinceFilterId"
                                class="py-2 px-4 border items-center justify-center">
                                <td class="flex my-4 mx-auto text-center items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        class="w-8 h-8 cursor-pointer hover:opacity-30 hover:shadow-lg" width="800px"
                                        height="800px" viewBox="0 0 24 24" fill="none" @click="deleteAccount(account)">
                                        <path d="M10 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path d="M14 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                                            stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                                            stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </td>
                            </td>
                        </tr>
                        <tr v-else v-for="account in displayedItemList">
                            <td class="py-2 px-4 border text-center items-center md:text-base sm:text-sm text-xs">{{
                                account.deliveryCenterId }}</td>
                            <td class="py-2 px-4 border text-center items-center md:text-base sm:text-sm text-xs">
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
                            <td
                                class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs truncate">
                                {{ account.firstName + ' ' + account.lastName }}</td>
                            <td
                                class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs truncate">
                                {{ account.email }}</td>
                            <td
                                class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs truncate">
                                {{ account.phone }}</td>
                            <td class="py-2 px-4 border items-center justify-center">
                                <td class="flex my-4 mx-auto text-center items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        class="w-8 h-8 cursor-pointer hover:opacity-30 hover:shadow-lg" width="800px"
                                        height="800px" viewBox="0 0 24 24" fill="none"
                                        @click="updateAccount(account);">
                                        <path
                                            d="M18.4721 16.7023C17.3398 18.2608 15.6831 19.3584 13.8064 19.7934C11.9297 20.2284 9.95909 19.9716 8.25656 19.0701C6.55404 18.1687 5.23397 16.6832 4.53889 14.8865C3.84381 13.0898 3.82039 11.1027 4.47295 9.29011C5.12551 7.47756 6.41021 5.96135 8.09103 5.02005C9.77184 4.07875 11.7359 3.77558 13.6223 4.16623C15.5087 4.55689 17.1908 5.61514 18.3596 7.14656C19.5283 8.67797 20.1052 10.5797 19.9842 12.5023M19.9842 12.5023L21.4842 11.0023M19.9842 12.5023L18.4842 11.0023"
                                            stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12 8V12L15 15" stroke="#000000" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>
                                </td>
                            </td>


                            <td class="py-2 px-4 border items-center justify-center">
                                <td class="flex my-4 mx-auto text-center items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        class="w-8 h-8 cursor-pointer hover:opacity-30 hover:shadow-lg" width="800px"
                                        height="800px" viewBox="0 0 24 24" fill="none" @click="deleteAccount(account)">
                                        <path d="M10 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path d="M14 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                                            stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                                            stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </td>
                            </td>
                        </tr>
                    </table>

                    <div class="my-4">
                        <div v-if="this.accountTypeSelected != 0" class="max-w-fit mx-auto">
                            <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded 
                        cursor-pointer shadow-lg md:text-base sm:text-sm text-xs" @click="goToPage(currentPage - 1)"
                                :disabled="currentPage === 1">Previous Page</button>
                            <span class="pl-10 pr-10 md:text-base sm:text-sm text-xs">Trang <strong>{{ currentPage
                            }}</strong> trong tổng số <strong>{{ totalPages }}</strong></span>
                            <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded 
                        cursor-pointer shadow-lg md:text-base sm:text-sm text-xs" @click="goToPage(currentPage + 1)"
                                :disabled="currentPage === totalPages">Next Page</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div v-else class="mx-4">
            <div class="py-2 grid gird-cols-6">
                <span class="col-start-1 col-end-5 py-2">
                    <h1 v-if="!this.updating" class="inline-flex font-semibold font-sans lg:text-3xl md:text-xl sm:text-sm text-xs">
                        Tạo mới tài khoản
                    </h1>
                    <h1 v-else-if="this.accountCreateType == 2"
                        class="inline-flex font-semibold font-sans lg:text-3xl md:text-xl sm:text-sm text-xs">
                        Cập nhật tài khoản trưởng điểm giao dịch
                    </h1>
                    <h1 v-else class="inline-flex font-semibold font-sans lg:text-3xl md:text-xl sm:text-sm text-xs">
                        Cập nhật tài khoản trưởng điểm tập kết
                    </h1>
                </span>
                <span class="col-start-6">
                    <button v-on:click="this.createdANewAcc()" class="bg-green-500 hover:bg-green-700 hover:shadow-xl text-white font-bold 
                    md:text-base sm:text-sm text-xs py-2 px-4 mx-auto rounded btn">
                        Hủy bỏ
                    </button>
                </span>
            </div>
            <hr class="my-2">
            <div v-if="!this.updating">
                <h2 class="my-2 text-slate-600 font-sans">Chọn loại tài khoản:</h2>
                <select id="office-province" name="province_id" v-model="accountCreateType"
                    @change="handleWhenChangeStatusAccountCreate()" class="search-select w-4/12 select2-hidden-accessible bg-gray-100 rounded-b-lg border-gray-300
                md:text-base sm:text-sm text-xs cursor-pointer hover:shadow-lg" tabindex="-1" aria-hidden="true"
                    data-select2-id="select2-data-office-province">
                    <option class="text-gray-900" :value="0" selected>Loại tài khoản</option>
                    <option class="text-gray-900" :value="1">Tài khoản trưởng điểm tập kết</option>
                    <option class="text-gray-900" :value="2">Tài khoản trưởng điểm giao dịch</option>
                </select>
            </div>

            <br>
            <div class="" id="course">
                <form ref="accForm" v-if="this.accountCreateType != 0" @submit="handleSubmit"
                    class="bg-white items-center shadow-lg rounded px-8 pt-6 pb-8 mb-4" novalidate autocapitalize="off">
                    <div v-if="this.accountCreateType == 1">
                        <h2><strong>Nơi làm việc:</strong></h2><br>
                        <label for="province" class="info">Tỉnh/Thành phố:</label><br>

                        <div id="province" class="w-2/4 common-shadow-input h-[43px] select2-stupid-at-home"
                            data-select2-id="select2-data-73-3wmt">
                            <select id="office-province" name="province_id" v-model="provinceSelectedId"
                                @change="this.solveWhenProvinceChange()" class="search-select w-full h-full select2-hidden-accessible bg-gray-100 rounded-b-lg border-gray-300
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

                        <label for="warehouse" class="info">Điểm tập kết:</label>
                        <br>

                        <div id="warehouse" class="w-2/4 common-shadow-input h-[43px] select2-stupid-at-home"
                            data-select2-id="select2-data-73-3wmt">
                            <select id="office-province" name="province_id" v-model="warehouseSelectedId" class="search-select w-full h-full select2-hidden-accessible bg-gray-100 rounded-b-lg border-gray-300
                            md:text-base sm:text-sm text-xs cursor-pointer hover:shadow-lg" tabindex="-1"
                                aria-hidden="true" data-select2-id="select2-data-office-province">
                                <option class="text-gray-900" :value="0">Điểm tập kết</option>
                                <option class="text-gray-900 w-2/4" v-for="warehouse in wareHouses"
                                    :value="warehouse.warehouseId" :key="warehouse.warehouseId">{{
                                        truncateText(warehouse.address, 80) }}</option>
                            </select>
                        </div>
                        <p class="error" v-if="this.warehouseError.length > 0">{{ warehouseError[0] }}</p>
                        <br>
                    </div>


                    <div v-if="this.accountCreateType == 2">
                        <h2><strong>Nơi làm việc:</strong></h2>
                        <br>

                        <label for="province" class="info">Tỉnh/Thành phố:</label>
                        <br>

                        <div id="province" class="w-2/4 common-shadow-input h-[43px] select2-stupid-at-home"
                            data-select2-id="select2-data-73-3wmt">
                            <select id="office-province" name="province_id" v-model="provinceSelectedId"
                                @change="this.solveWhenProvinceChange()" class="search-select w-full h-full select2-hidden-accessible bg-gray-100 rounded-b-lg border-gray-300
                            md:text-base sm:text-sm text-xs cursor-pointer hover:shadow-lg" tabindex="-1"
                                aria-hidden="true" data-select2-id="select2-data-office-province">

                                <option class="text-gray-900" :value="0">Tỉnh/ Thành phố</option>
                                <option class="text-gray-900" v-for="province in provinces"
                                    :value="province.provinceMunicipalityId" :key="province.provinceMunicipalityId">{{
                                        province.provinceMunicipality }}</option>

                            </select>
                        </div>

                        <p class="error" v-if="this.provinceError.length > 0">{{ provinceError[0] }}</p>
                        <br>

                        <label for="district" class="info">Quận/Huyện:</label>
                        <br>

                        <div id="district" class="common-shadow-input w-2/4 h-[43px] select2-stupid-at-home">
                            <select id="slDistrict" name="district_id" v-model="districtSelectedId"
                                @change="getAllDeliveryCenterOfADistrict()" class="search-select w-full h-full select2-hidden-accessible bg-gray-100 border-gray-300
                            md:text-base sm:text-sm text-xs cursor-pointer hover:shadow-lg" tabindex="-1"
                                aria-hidden="true">
                                <option class="text-gray-900" value="0">Quận/Huyện</option>
                                <option class="text-gray-900" v-if="districts && districts.length"
                                    v-for="district in districts" :value="district.districtId" :key="district.districtId">{{
                                        district.district }}</option>
                            </select>
                        </div>
                        <p class="error" v-if="districtError.length > 0">{{ districtError[0] }}</p>
                        <br>

                        <label for="dc" class="info">Điểm giao dịch làm việc:</label>
                        <br>

                        <div id="deliverycenter" class="w-2/4 common-shadow-input h-[43px] select2-stupid-at-home"
                            data-select2-id="select2-data-73-3wmt">
                            <select id="office-province" name="province_id" v-model="deliverycenterSelectedId" class="search-select w-full h-full select2-hidden-accessible bg-gray-100 rounded-b-lg border-gray-300
                            md:text-base sm:text-sm text-xs cursor-pointer hover:shadow-lg" tabindex="-1"
                                aria-hidden="true" data-select2-id="select2-data-office-province">
                                <option class="text-gray-900" :value="0">Điểm giao dịch</option>
                                <option class="text-gray-900 w-2/4" v-for="deliveryCenter in deliveryCenters"
                                    :value="deliveryCenter.deliveryCenterId" :key="deliveryCenter.deliveryCenterId">{{
                                        truncateText(deliveryCenter.address, 80) }}</option>
                            </select>
                        </div>
                        <p class="error" v-if="this.deliverycenterError.length > 0">{{ deliverycenterError[0] }}</p>
                        <br>

                    </div>

                    <h2><strong>Thông tin cá nhân:</strong></h2>
                    <br>
                    <label for="username">Tên đăng nhập</label>
                    <input v-if="!this.updating" type="text" id="username" name="username" placeholder="Nhập tên đăng nhập"
                        v-model="form.username" class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                         ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                          sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs hover:shadow-lg">
                    <input v-else type="text" id="username" name="username" placeholder="Nhập tên đăng nhập"
                        v-model="form.username" class="block w-2/4 rounded-md border-0 py-1.5 text-black-300 
                    bg-gray-300 sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs" readonly>

                    <p class="error" v-if="userNameError.length > 0">{{ userNameError[0] }}<br></p>
                    <br>
                    <label for="password">Mật khẩu</label>
                    <input type="password" id="password" name="password" placeholder="Nhập mật khẩu" v-model="form.password"
                        class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                         ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                          sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs hover:shadow-lg">
                    <p class="error" v-if="passwordError.length > 0">{{ passwordError[0] }}<br></p>
                    <br>
                    <label for="re-password">Nhập lại mật khẩu</label>
                    <input type="password" id="re-password" name="re-password" placeholder="Nhập lại mật khẩu"
                        v-model="repassword" class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                         ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                          sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs hover:shadow-lg">
                    <p class="error" v-if="repasswordError.length > 0">{{ repasswordError[0] }}<br></p>
                    <br>
                    <label for="firstname">Họ</label>
                    <input type="text" id="firstname" name="firstname" placeholder="Nhập tên họ" v-model="form.firstName"
                        class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                         ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                          sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs hover:shadow-lg">
                    <p class="error" v-if="firstNameError.length > 0">{{ firstNameError[0] }}<br></p>
                    <br>
                    <label for="lastname">Tên</label>
                    <input type="text" id="lastname" name="lastname" placeholder="Nhập tên đệm" v-model="form.lastName"
                        class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                         ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                          sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs hover:shadow-lg">
                    <p class="error" v-if="lastNameError.length > 0">{{ lastNameError[0] }}<br></p>
                    <br>
                    <label for="email">Email</label>
                    <input type="text" id="email" name="email" placeholder="Nhập email" v-model="form.email" class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                         ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                          sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs hover:shadow-lg">
                    <p class="error" v-if="emailError.length > 0">{{ emailError[0] }}<br></p>
                    <br>
                    <label for="phone">Số điện thoại</label>
                    <input type="text" id="phone" name="phone" placeholder="Nhập số điện thoại" v-model="form.phone" class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                         ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                          sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs hover:shadow-lg">
                    <p class="error" v-if="phoneError.length > 0">{{ phoneError[0] }}<br></p>
                    <br>
                    <label for="citizenCard">Số CCCD:</label>
                    <input type="text" id="citizen" name="citizen" placeholder="Nhập số CCCD vào đây"
                        v-model="form.citizenIdentityCardNumber" class="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                         ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                          sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs hover:shadow-lg">
                    <p class="error" v-if="citizenCardImgError.length > 0">{{ citizenCardImgError[0] }}<br></p>

                    <br>
                    <button v-if="!this.updating" type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded
                md:text-base sm:text-sm text-xs hover:shadow-lg cursor-pointer">Tạo tài
                        khoản</button>

                    <button v-else type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded
                md:text-base sm:text-sm text-xs hover:shadow-lg cursor-pointer">Cập nhật tài
                        khoản</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import axios from 'axios';
export default {
    name: 'LeaderManageAccount',
    data() {
        return {
            form: {
                accountTypeId: 0,
                username: '',
                password: '',
                deliveryCenterId: '',
                warehouseId: '',
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                citizenIdentityCardNumber: '',
            },
            warehouse: {
                provinceMunicipality: '',
                provinceMunicipalityId: 0,
            },
            deliveryCenter: {

            },
            accountToUpdate: {
                provinceUpdate: '',
                districtUpdate: '',
                deliveryCenterUpdate: '',
                usernameUpdate: '',
                passwordUpdate: '',
                repasswordUpdate: '',
                firstNameUpdate: '',
                lastNameUpdate: '',
                emailUpdate: '',
                phoneUpdate: '',
                citizenIdentityCardNumberUpdate: '',
            },
            repassword: '',
            updating: false,
            accountTypeSelected: 0,
            accountSelectedId: 0,
            accountCreateType: 0,
            provinceSelectedId: 0,
            districtSelectedId: 0,
            warehouseSelectedId: 0,
            deliverycenterSelectedId: 0,
            accounts: [],
            warehouseAccount: [],
            deliveryCenterAccount: [],
            provinces: [],
            districts: [],
            wareHouses: [],
            deliveryCenters: [],
            provinceError: [],
            districtError: [],
            warehouseError: [],
            userNameError: [],
            passwordError: [],
            repasswordError: [],
            deliverycenterError: [],
            warehouseError: [],
            firstNameError: [],
            lastNameError: [],
            emailError: [],
            phoneError: [],
            citizenCardImgError: [],
            createNew: false,
            itemsPerPage: 4,
            currentPage: 1,
            isShow: false,
            provinceFilterId: 0,
            fetchFinish: false,
            searchInput: '',
            names: [
                { id: 1, name: 'Nguyễn' },
                { id: 2, name: 'John' },
                { id: 3, name: 'Alice' },
                // Add more names to your array
            ],
            searchResults: [],
        }
    },
    methods: {
        ...mapMutations(['scrollToTop', 'setLogged', 'setLeadership', 'setLeadershipAccessToken',
            'setLeadershipRefreshToken', 'setManagerDC', 'setManagerWH', 'setTellerDC', 'setStaffWH']),
        handleWhenChangeStatusAccountCreate() {
            this.resetError();
            this.provinceSelectedId = 0;
            this.districtSelectedId = 0;
            this.warehouseSelectedId = 0;
            this.deliverycenterSelectedId = 0;
            this.form.username = "";
            this.form.password = "";
            this.repassword = "";
            this.form.firstName = "";
            this.form.lastName = "";
            this.form.email = "";
            this.form.phone = "";
            this.form.citizenIdentityCardNumber = "";
            this.districts = [];
            this.wareHouses = [];
            this.deliveryCenters = [];
        },
        solveWhenProvinceChange() {
            if (this.accountCreateType == 1) {
                this.getAllWarehouseofAProvinces();
            } else if (this.accountCreateType == 2) {
                this.getAllDistrictsOfAProvince();
            }
        },
        handleFilter() {
            console.log(this.searchInput);
            this.provinceFilterId = 0;
            this.resetError();
            this.provinceSelectedId = 0;
            this.districtSelectedId = 0;
            this.warehouseSelectedId = 0;
            this.deliverycenterSelectedId = 0;
            this.form.username = "";
            this.form.password = "";
            this.repassword = "";
            this.form.firstName = "";
            this.form.lastName = "";
            this.form.email = "";
            this.form.phone = "";
            this.form.citizenIdentityCardNumber = "";
            this.districts = [];
            this.wareHouses = [];
            this.deliveryCenters = [];
        },
        async fetchAccountsData() {
            this.fetchFinish = true;
            if (this.accountTypeSelected == 1 || this.accountCreateType == 1) {
                let res = await axios.get('/warehouses/manager', { withCredentials: true });
                this.warehouseAccount = res.data;
            }
            if (this.accountTypeSelected == 2 || this.accountCreateType == 2) {
                let res = await axios.get('/deliveryCenters/manager', { withCredentials: true });
                this.deliveryCenterAccount = res.data;
            }
            // if (!this.deli) {
            //     this.fetchFinish = false;
            // }

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
        async handleCreateAccount() {
            try {
                let res = await axios.post('/signup', this.form, {
                    headers: { "Authorization": `Bearer ${this.leadershipToken.accessToken}` }
                }, { withCredentials: true });
                if (res.data) {
                    this.fetchAccountsData();
                    this.accountCreateType = 0;
                    this.createdANewAcc();
                    console.alert("Tạo thành công")
                }
            } catch (err) {
                if (err.response && err.response.data.error === 'jwt expired') {
                    await this.refreshToken();
                    await this.handleCreateAccount();
                } else if (err.response && err.response.data.error) {
                    alert(err.response.data.error);
                } else if (err.response && err.response.data.error == 'Username is already exists') {
                    this.userNameError.push("Tên đăng nhập đã tồn tại, hãy chọn tên khác!")
                } else if (err.response && err.respone.data.error == 'Phone is already exists') {
                    this.phoneError.push('Số điện thoại bị trùng! Hãy nhập số khác')
                } else if (err.response && err.respone.data.error == 'Email is already exists') {
                    this.emailError.push('Email bị trùng! Hãy chọn email khác!')
                } else if (err.response && err.respone.data.error == 'Identity number is already exists') {
                    this.citizenCardImgError.push('Số CCCD bị trùng! Hãy nhập CCCD khác!')
                } else {
                    alert("Tạo tài khoản thành công!");
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
            if (this.provinceSelectedId > 0) {
                try {
                    const res = await axios.get(`/warehouses/${this.provinceSelectedId}`, { withCredentials: true });
                    this.wareHouses = res.data;
                } catch (error) {
                    console.error('getDistrictofAProvince:', error.message);
                }
            }
        },

        async getAllDeliveryCenterOfADistrict() {
            this.deliveryCenters = [];
            if (this.districtSelectedId > 0) {
                try {
                    const res = await axios.get(`/deliveryCenters/${this.districtSelectedId}`, { withCredentials: true });
                    this.deliveryCenters = res.data;
                } catch (err) {
                    console.log('getDCfromDistrict: ', err.respone.data.error)
                }
            }

        },
        createdANewAcc() {
            this.resetError();
            this.accountToUpdate.usernameUpdate = "";
            this.accountToUpdate.passwordUpdate = "";
            this.accountCreateType = 0;
            this.accountTypeSelected = 0;
            this.provinceSelectedId = 0;
            this.districtSelectedId = 0;
            this.warehouseSelectedId = 0;
            this.deliverycenterSelectedId = 0;
            this.form.username = "";
            this.form.password = "";
            this.repassword = "";
            this.form.firstName = "";
            this.form.lastName = "";
            this.form.email = "";
            this.form.phone = "";
            this.form.citizenIdentityCardNumber = "";
            this.districts = [];
            this.wareHouses = [];
            this.deliveryCenters = [];
            this.createNew = !this.createNew;
            this.updating = false;
        },
        preSubmit() {
            if (this.accountCreateType == 1) {
                this.form.accountTypeId = 5;
                this.form.warehouseId = this.warehouseSelectedId;
            } else if (this.accountCreateType == 2) {
                this.form.accountTypeId = 3;
                this.form.deliveryCenterId = this.deliverycenterSelectedId;
            }
        },
        resetError() {
            this.provinceError = [];
            this.districtError = [];
            this.warehouseError = [];
            this.deliverycenterError = [];
            this.userNameError = [];
            this.passwordError = [];
            this.repasswordError = [];
            this.firstNameError = [];
            this.lastNameError = [];
            this.emailError = [];
            this.phoneError = [];
            this.citizenCardImgError = [];
        },
        checkEmptyError() {
            if (this.provinceError.length != 0
                || this.districtError.length != 0
                || this.warehouseError.length != 0
                || this.passwordError.length != 0
                || this.repasswordError.length != 0
                || this.userNameError.length != 0
                || this.firstNameError.length != 0
                || this.lastNameError.length != 0
                || this.emailError.length != 0
                || this.phoneError.length != 0
                || this.citizenCardImgError.length != 0) {
                return false;
            }
            return true;
        },
        validateRegisterAccount() {
            this.resetError();

            if (this.provinceSelectedId == 0) {
                this.provinceError.push("Hãy chọn Tỉnh/Thành phố làm việc!");
            }
            if (this.warehouseSelectedId == 0) {
                this.warehouseError.push("Hãy chọn điểm tập kết làm việc!");
            }
            if (this.districtSelectedId == 0) {
                this.districtError.push("Hãy chọn Quận/Huyện tương ứng!");
            }
            if (this.deliverycenterSelectedId == 0) {
                this.deliverycenterError.push("Hãy chọn điểm giao dịch tương ứng!")
            }

            if (this.accountCreateType == 1) {
                this.deleveryCenterError = [];
                this.districtError = [];
            } else if (this.accountCreateType == 2) {
                this.warehouseError = [];
            }
            if (!this.form.firstName) {
                this.firstNameError.push("Hãy nhập tên họ. Ví dụ: Lê, Nguyễn, .v.v.");
            } else if (!/^[A-Za-zÀ-ỹ]+$/.test(this.form.firstName.replace(/\s/g, ""))) {
                this.firstNameError.push("Tên họ chỉ được bao gồm chữ cái!");
            }

            // For the last name
            if (!this.form.lastName) {
                this.lastNameError.push('Hãy nhập tên đệm. Ví dụ: Văn A, Tuấn Anh, .v.v.');
            } else if (!/^[A-Za-zÀ-ỹ]+$/.test(this.form.lastName.replace(/\s/g, ""))) {
                this.lastNameError.push('Tên đệm chỉ được bao gồm chữ cái!');
            }

            if (!this.form.email) {
                this.emailError.push('Hãy nhập email.');
            } else if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.form.email)) {
                this.emailError.push('Email sai định dạng!');
            }

            //username 
            if (!this.form.username) {
                this.userNameError.push('Hãy nhập tên đăng nhập.');
            }

            //password
            if (!this.form.password) {
                this.passwordError.push('Hãy nhập mật khẩu!');
            } else if (this.form.password.length < 8) {
                this.passwordError.push('Mật khẩu phải dài tối thiểu 8 kí tự!');
            }

            if (!this.repassword) {
                this.repasswordError.push('Hãy nhập lại mật khẩu!');
            } else if (this.form.password != this.repassword) {
                this.repasswordError.push('Mật khẩu nhập lại không đúng!');
            }

            //phone 
            if (!this.form.phone) {
                this.phoneError.push('Hãy nhập số điện thoại!');
            } else if (!this.form.phone.startsWith('0')) {
                this.phoneError.push('Số điện thoại phải bắt đầu bằng 0!');
            } else if (this.form.phone.length != 10) {
                this.phoneError.push('Số điện thoại phải bao gồm 10 chữ số!');
            } else if (!/[0-9]{10}/.test(this.form.phone)) {
                this.phoneError.push('Số điện thoại chỉ được bao gồm chữ số!');
            }

            if (!this.form.citizenIdentityCardNumber) {
                this.citizenCardImgError.push("Hãy nhập số CCCD!")
            } else if (!/[0-9]{10}/.test(this.form.citizenIdentityCardNumber)) {
                this.citizenCardImgError.push('CCCD không bao gồm chữ cái');
            }
        },
        async handleSubmit(event) {

            this.validateRegisterAccount();

            if (!this.checkEmptyError()) {
                event.preventDefault();
            }
            else {
                event.preventDefault();
                this.scrollToTop();
                this.preSubmit();
                if (this.updating) {
                    await this.handleUpdateAccount();
                } else {
                    await this.handleCreateAccount();
                }
            }
        },

        async handleUpdateAccount() {
            try {
                let res = await axios.put(`/updateAccount/${this.accountSelectedId}`, this.form, {
                    headers: { "Authorization": `Bearer ${this.leadershipToken.accessToken}` }
                }, { withCredentials: true });
                this.fetchAccountsData();
                this.accountCreateType = 0;
                this.createdANewAcc();
            } catch (err) {
                if (err.response && err.response.data.error === 'jwt expired') {
                    await this.refreshToken();
                    await this.handleUpdateAccount();
                } else if (err.response && err.response.data.error) {
                    alert(err.response && err.response.data.error);
                } else {
                    alert("Cập nhật tài khoản thành công!");
                }
            }
        },

        async deleteAccount(account) {
            try {
                let res = await axios.delete(`/deleteAccount/${account.accountId}`, {
                    headers: { "Authorization": `Bearer ${this.leadershipToken.accessToken}` }
                }, { withCredentials: true })
                if (res.data) {
                    this.fetchAccountsData();
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

        test() {
            console.log(this.accountTypeSelected);
        },
        updateAccount(account) {
            this.updating = true;
            this.resetError();
            this.accountSelectedId = account.accountId;
            if (account.accountTypeId == 3) {
                this.accountCreateType = 2;
            } else if (account.accountTypeId == 5) {
                this.accountCreateType = 1;
            }
            this.accountTypeSelected = 0;
            this.provinceSelectedId = 0;
            this.districtSelectedId = 0;
            this.warehouseSelectedId = 0;
            this.deliverycenterSelectedId = 0;
            this.form.username = account.username;
            this.form.password = "";
            this.repassword = "";
            this.form.firstName = account.firstName;
            this.form.lastName = account.lastName;
            this.form.email = account.email;
            this.form.phone = account.phone;
            this.form.citizenIdentityCardNumber = account.citizenIdentityCardNumber;
            this.wareHouses = [];
            this.deliveryCenters = [];
            this.createNew = !this.createNew;
        },
        escapeRegExp(text) {
            // Function to escape special characters in a string for regex
            return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        },
    },

    computed: {
        ...mapState(['isLogin', 'leadership', 'leadershipToken', 'manager_DC', 'manager_WH', 'staff_WH', 'teller_DC']),
        totalPages() {
            if (this.accountTypeSelected == 1) {
                this.accounts = this.warehouseAccount;
            } else if (this.accountTypeSelected == 2) {
                this.accounts = this.deliveryCenterAccount;
            }
            return Math.ceil(this.accounts.length / this.itemsPerPage);
        },
        displayedItemList() {
            
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.searchInput != ''
                ? this.accounts.filter((t) => new RegExp(this.escapeRegExp(this.searchInput), 'i').test(t.firstName + t.lastName)).
                    slice(startIndex, endIndex)
                : this.accounts.slice(startIndex, endIndex);
        },
    },
    created() {
        this.getProvinces();
        this.fetchAccountsData();
    }
}
</script>

<style></style>