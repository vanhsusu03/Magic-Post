<template>
    <!-- Nav -->
    <div id="container" class="my-6">
        <div v-if="true" class="max-h-md items-center justify-center mb-6 mx-auto">
            <img src="../assets/img/banner.png" class="w-full h-full max-h-xl" alt="">
        </div>
        <div class="my-4">
            <div class="flex max-w-3xl mx-auto my-4 h-full">
                <span @click="showTab = 0"
                    :class="[
                        { 'rounded-t-lg lg:block px-2 mx-2 lg:px-8 py-2 lg:py-4 text-gray-900 bg-cyan-200 transition-colors duration-150 text-md my-tab cursor-pointer hover:shadow-lg': showTab == 0 },
                        { 'rounded-t-lg lg:block px-2 mx-2 lg:px-8 py-2 lg:py-4 text-gray-900 bg-gray-200 transition-colors duration-150 text-md my-tab cursor-pointer hover:shadow-lg': showTab != 0 }]">
                    Tra cứu đơn hàng</span>
                <span @click="showTab = 1"
                    :class="[
                        { 'rounded-t-lg lg:block px-2 mx-2 lg:px-8 py-2 lg:py-4 text-gray-900 bg-cyan-200 transition-colors duration-150 text-md my-tab cursor-pointer hover:shadow-lg': showTab == 1 },
                        { 'rounded-t-lg lg:block px-2 mx-2 lg:px-8 py-2 lg:py-4 text-gray-900 bg-gray-200 transition-colors duration-150 text-md my-tab cursor-pointer hover:shadow-lg': showTab != 1 }]">
                    Tra cứu điểm giao dịch</span>
                <span @click="showTab = 2"
                    :class="[
                        { 'rounded-t-lg lg:block px-2 mx-2 lg:px-8 py-2 lg:py-4 text-gray-900 bg-cyan-100 transition-colors duration-150 text-md my-tab cursor-pointer hover:shadow-lg': showTab == 2 },
                        { 'rounded-t-lg lg:block px-2 mx-2 lg:px-8 py-2 lg:py-4 text-gray-900 bg-gray-200 transition-colors duration-150 text-md my-tab cursor-pointer hover:shadow-lg': showTab != 2 }]">
                    Hàng từ chối vận chuyển</span>

            </div>
            <!-- Product Search -->
            <!-- Product code input form -->
            <div id="search-wrap" class="max-w-3xl mx-auto" v-if="showTab == 0">
                <form @submit.prevent="getPackageInfo(); showStatus()">
                    <label for="default-search"
                        class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"></label>
                    <div class="relative mx-auto">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" id="default-search" v-model="packageCode"
                            class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-b-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Nhập mã đơn..." required>
                        <button type="submit"
                            class="text-white absolute end-2.5 bottom-2.5 bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Tìm
                            kiếm
                        </button>
                    </div>


                </form>
                <!-- Show product status -->
                <div class="product-status" v-if="show">
                    <div class="border-2 border-solid border-black p-6 m-6 w-max inline-block rounded-md font-sans"
                        :class="s1">
                        status1
                    </div>
                    <div class="border-2 border-solid border-black p-6 m-6 w-max inline-block rounded-md font-sans"
                        :class="s2">
                        status2
                    </div>
                    <div class="border-2 border-solid border-black p-6 m-6 w-max inline-block rounded-md font-sans"
                        :class="s3">
                        status3
                    </div>

                    <div class="information py-4 rounded-3xl bg-gray-100 grid gap-10 row-gap-6 grid-cols-1">
                        <div id="sender-info" class="col-span-1 px-4 mx-4">
                            <div id="sender-name" class="text-left font-sans">
                                <label for="" class="font-bold">Người gửi:</label>
                                {{ this.packageInfo.senderName }}
                            </div>

                            <div id="sender-address" class="text-left font-sans">
                                <label for="" class="font-bold">Địa chỉ bên gửi: </label>
                                {{ this.packageInfo.senderAddress }}
                            </div>

                            <div id="sender-phone" class="text-left font-sans">
                                <label for="" class="font-bold">Số điện thoại người gửi :</label>
                                {{ this.packageInfo.senderPhone }}
                            </div>
                        </div>

                        <div id="receiver-info" class="col-span-1 w-max px-4 mx-4">
                            <div id="receiver-name" class="text-left font-sans">
                                <label for="" class="font-bold">Người nhận:</label>
                                {{ this.packageInfo.receiverName }}
                            </div>
                            <div id="receiver-address" class="text-left font-sans">
                                <label for="" class="font-bold">Địa chỉ bên nhận: </label>
                                {{ this.packageInfo.receiverAddress }}
                            </div>
                            <div id="receiver-phone" class="text-left font-sans">
                                <label for="" class="font-bold">Số điện thoại người nhận: </label>
                                {{ this.packageInfo.receiverPhone }}
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            <!-- Post Office Search -->
            <div class="max-w-3xl mx-auto" v-if="showTab == 1">
                <div class="flex items-center justify-center flex-col w-full gap-[12px] md:flex-row overflow-hidden h-full">
                    <div id="province" class="w-full common-shadow-input h-[43px] select2-stupid-at-home"
                        data-select2-id="select2-data-73-3wmt">
                        <select id="office-province" name="province_id" v-model="provinceSelectedId"
                            @change="this.getAllDistrictsOfAProvince()" class="search-select w-full h-full select2-hidden-accessible bg-gray-100 border-gray-300
                            md:text-base sm:text-sm text-xs cursor-pointer hover:shadow-lg" tabindex="-1"
                            aria-hidden="true" data-select2-id="select2-data-office-province">
                            <option class="text-gray-900" :value="0">Tỉnh/ Thành phố</option>
                            <option class="text-gray-900" v-for="province in provinces"
                                :value="province.provinceMunicipalityId" :key="province.provinceMunicipalityId">{{
                                    province.provinceMunicipality }}</option>
                        </select>
                    </div>

                    <div id="district" class="common-shadow-input w-full h-[43px] select2-stupid-at-home">
                        <select id="slDistrict" name="district_id" v-model="districtSelectedId"
                            @change="getAllDeliveryCenterOfADistrict()" class="search-select w-full h-full select2-hidden-accessible bg-gray-100 border-gray-300
                            md:text-base sm:text-sm text-xs cursor-pointer hover:shadow-lg" tabindex="-1"
                            aria-hidden="true">
                            <option class="text-gray-900" value="0">Quận/Huyện</option>
                            <option class="text-gray-900" v-if="districts && districts.length" v-for="district in districts"
                                :value="district.districtId" :key="district.districtId">{{
                                    district.district }}</option>
                        </select>
                    </div>

                    <div class="flex items-center w-full max-w-fit">
                        <button @click="deliveryCenterSearch()" class="bg-green-500 hover:bg-green-700 text-white font-bold mx-auto py-2 px-4 rounded 
                        cursor-pointer hover:shadow-lg md:text-base sm:text-sm text-xs">
                            Tìm kiếm
                        </button>
                    </div>
                </div>
                <hr v-if="this.displayDeliveryCenter" class="my-4 mx-auto border-[1px] border-black">
                <div v-if="this.displayDeliveryCenter" v-for="deliveryCenter in deliveryCenters"
                    class="border-2 border-gray-400 bg-slate-100 rounded-md mb-4 shadow-md items-center justify-center">
                    <span class="flex my-4 mx-2 items-center justify-center">
                        <a :href="`https://www.google.com/maps/place/${deliveryCenter.address.replace(' phường', '')
                            .replace(' Quận', '').replace(' Thành phố', '').replace(/ /g, '+')}`" target="_blank">
                            <svg class="w-8 h-8 flex hover:text-gray-500 dark:hover:text-gray-200 cursor-pointer"
                                xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24"
                                fill="none">
                                <path
                                    d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
                                    stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path
                                    d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                                    stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </a>
                        <h1 class="flex lg:text-2xl md:text-xl sm:text-sm text-xs font-sans">Địa chỉ {{
                            deliveryCenter.address }}</h1>
                        <br>
                    </span>
                    <span class="flex my-4 mx-2 items-center justify-center">
                        <svg class="w-5 h-5 mx-2" aria-hidden="true" fill="#000000" stroke-linecap="round"
                            stroke-linejoin="round" stroke-width="2" viewBox="0 0 48 48" stroke="currentColor">
                            <path
                                d="M35.8,11a3.2,3.2,0,0,0-2.2-1H32V8a2.9,2.9,0,0,0-3-3H5A2.9,2.9,0,0,0,2,
                                8V35a2.9,2.9,0,0,0,3,3H7.3a7,7,0,0,0,13.4,0h6.6a7,7,0,0,0,13.4,0H43a2.9,
                                2.9,0,0,0,3-3V22.2Zm-2.7,3,7.3,8H32V14ZM6,9H28V32.4a7.7,7.7,0,0,0-.7,
                                1.6H20.7A7,7,0,0,0,7.3,34H6Zm8,30a3,3,0,1,1,3-3A2.9,2.9,0,0,1,14,39Zm20,
                                0a3,3,0,1,1,3-3A2.9,2.9,0,0,1,34,39Zm6.7-5A7,7,0,0,0,34,29a6.4,6.4,0,0,0-2,.3V26H42v8Z" />
                        </svg>
                        <h2 class="flex lg:text-2xl md:text-xl sm:text-sm text-xs font-sans">Delivery Center ID: {{
                            deliveryCenter.deliveryCenterId }}</h2>
                        <br>
                    </span>
                    <span class="flex my-4 mx-2 items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"
                            class="lg:w-7 lg:h-7 md:w-6 md:h-6 w-5 h-5 mx-2" version="1.1" id="Capa_1"
                            viewBox="0 0 489.475 489.475" xml:space="preserve" stroke="#858585">

                            <g id="SVGRepo_bgCarrier" stroke-width="0" />

                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

                            <g id="SVGRepo_iconCarrier">
                                <g>
                                    <g>
                                        <path
                                            d="M487.823,468.675v-346.4c0-8.3-4.2-15.6-11.4-18.7l-223.7-102c-5.2-2.1-11.4-2.1-16.6,0l-223.7,102 c-7.3,3.1-11.4,10.4-11.4,18.7v346.4c0,11.4,9.4,20.8,20.8,20.8s20.8-9.4,20.8-20.8v-332.9l203.9-92.6l202.8,92.6v332.9 c0,11.4,9.4,20.8,20.8,20.8S491.023,480.175,487.823,468.675z" />
                                        <path
                                            d="M313.123,285.575c11.4,0,20.8-9.4,20.8-20.8v-134.2c0-11.4-9.4-20.8-20.8-20.8h-134.2c-11.4,0-20.8,9.4-20.8,20.8v134.2 c0,11.4,9.4,20.8,20.8,20.8H313.123z M199.723,152.475h92.6v92.6h-92.6V152.475z" />
                                        <path
                                            d="M213.223,313.675h-134.2c-11.4,0-20.8,9.4-20.8,20.8v134.2c0,11.4,9.4,20.8,20.8,20.8h134.2c11.4,0,20.8-9.4,20.8-20.8 v-134.2C234.023,323.075,224.623,313.675,213.223,313.675z M192.423,448.975h-92.6v-92.6h92.6V448.975z" />
                                        <path
                                            d="M412.923,313.675h-134.2c-11.4,0-20.8,9.4-20.8,20.8v134.2c0,11.4,9.4,20.8,20.8,20.8h134.2c11.4,0,20.8-9.4,20.8-20.8 v-134.2C433.723,323.075,424.423,313.675,412.923,313.675z M392.123,448.975h-92.6v-92.6h92.6V448.975z" />
                                    </g>
                                </g>
                            </g>

                        </svg>
                        <h2 class="flex lg:text-2xl md:text-xl sm:text-sm text-xs font font-sans">Warehouse ID: {{
                            deliveryCenter.warehouseId }}</h2>
                        <br>
                    </span>
                    <span>

                    </span>
                </div>

            </div>

            <!-- Prohibited Package -->
            <div class="max-w-3xl mx-auto" v-if="showTab == 2">
                <div class="shadow-lg p-7">
                    <div class="block w-full overflow-x-auto lg:px-[28px]">
                        <div
                            class="flex items-start  gap-x-[12px] lg:gap-x-[24px] pt-[30px] border-b border-[#f2f2f2] lg:border-0">
                            <img class="w-[56px] h-[56px] lg:w-[94px] lg:h-[94px] object-cover"
                                src="../assets/img/prohibit1.png"
                                alt="Magicpost - Các mặt hàng cấm gửi">
                            <div class="lg:border-b lg:border-[#f2f2f2] pb-[30px] flex-1">
                                <h5 class="mb-[9px] text-[14px] lg:text-[20px] text-[#FF0000] font-bold"> 1. Vũ khí và
                                    công cụ hỗ trợ </h5>
                                <span class="text-[14px] lg:text-[16px]">Vũ khí quân dụng (súng cầm tay, bom, mìn, lựu
                                    đạn,…); trang thiết bị kỹ thuật quân sự, quân trang; súng săn; vũ khí thô sơ (dao, kiếm,
                                    giáo, mác, mã tấu, cung, nổ, phi tiêu, …); vũ khí thể thao (súng hơi, súng thể thao bắn
                                    đạn sơn, súng bắn đĩa bay, …); công cụ hỗ trợ (bình xịt hơi cay, dùi cui điện, súng bắn
                                    điện, …).</span>
                            </div>
                        </div>
                        <div
                            class="flex items-start  gap-x-[12px] lg:gap-x-[24px] pt-[30px] border-b border-[#f2f2f2] lg:border-0">
                            <img class="w-[56px] h-[56px] lg:w-[94px] lg:h-[94px] object-cover"
                                src="../assets/img/prohibit2.png"
                                alt="Magicpost - Các mặt hàng cấm gửi">
                            <div class="lg:border-b lg:border-[#f2f2f2] pb-[30px] flex-1">
                                <h5 class="mb-[9px] text-[14px] lg:text-[20px] text-[#FF0000] font-bold"> 2. Vật liệu
                                    hoặc chất dễ gây cháy nổ </h5>
                                <span class="text-[14px] lg:text-[16px]">Pháo nổ, pháo hoa, pháo sáng, thuốc nổ, thuốc pháo
                                    hoa, xăng dầu, khí đốt, pin, bình ắc qui,…</span>
                            </div>
                        </div>
                        <div
                            class="flex items-start  gap-x-[12px] lg:gap-x-[24px] pt-[30px] border-b border-[#f2f2f2] lg:border-0">
                            <img class="w-[56px] h-[56px] lg:w-[94px] lg:h-[94px] object-cover"
                                src="../assets/img/prohibit3.png"
                                alt="Magicpost - Các mặt hàng cấm gửi">
                            <div class="lg:border-b lg:border-[#f2f2f2] pb-[30px] flex-1">
                                <h5 class="mb-[9px] text-[14px] lg:text-[20px] text-[#FF0000] font-bold"> 3. Văn hóa
                                    phẩm cấm lưu hành </h5>
                                <span class="text-[14px] lg:text-[16px]">Văn hóa phẩm trái đạo đức xã hội, trái thuần phong
                                    mỹ tục của Việt Nam hoặc nội dung kích động gây mất an ninh, phá hoại đoàn kết dân tộc,
                                    chống phá Nhà nước.</span>
                            </div>
                        </div>
                        <div
                            class="flex items-start  gap-x-[12px] lg:gap-x-[24px] pt-[30px] border-b border-[#f2f2f2] lg:border-0">
                            <img class="w-[56px] h-[56px] lg:w-[94px] lg:h-[94px] object-cover"
                                src="../assets/img/prohibit3.png"
                                alt="Magicpost - Các mặt hàng cấm gửi">
                            <div class="lg:border-b lg:border-[#f2f2f2] pb-[30px] flex-1">
                                <h5 class="mb-[9px] text-[14px] lg:text-[20px] text-[#FF0000] font-bold"> 4. Ma túy
                                </h5>
                                <span class="text-[14px] lg:text-[16px]">Các chất ma túy, chất kích thích thần kinh (bao gồm
                                    cả tiền chất, nguyên vật liệu chế tạo ra ma túy, chất kích thích).</span>
                            </div>
                        </div>
                        <div
                            class="flex items-start  gap-x-[12px] lg:gap-x-[24px] pt-[30px] border-b border-[#f2f2f2] lg:border-0">
                            <img class="w-[56px] h-[56px] lg:w-[94px] lg:h-[94px] object-cover"
                                src="../assets/img/prohibit5.png"
                                alt="Magicpost - Các mặt hàng cấm gửi">
                            <div class="lg:border-b lg:border-[#f2f2f2] pb-[30px] flex-1">
                                <h5 class="mb-[9px] text-[14px] lg:text-[20px] text-[#FF0000] font-bold"> 5. Thuốc lá
                                </h5>
                                <span class="text-[14px] lg:text-[16px]">Thuốc lá, xì gà, thuốc lá điện tử, các dạng thành
                                    phẩm khác và các nguyên liệu sản xuất thuốc lá.</span>
                            </div>
                        </div>
                        <div
                            class="flex items-start  gap-x-[12px] lg:gap-x-[24px] pt-[30px] border-b border-[#f2f2f2] lg:border-0">
                            <img class="w-[56px] h-[56px] lg:w-[94px] lg:h-[94px] object-cover"
                                src="../assets/img/prohibit6.png"
                                alt="Magicpost - Các mặt hàng cấm gửi">
                            <div class="lg:border-b lg:border-[#f2f2f2] pb-[30px] flex-1">
                                <h5 class="mb-[9px] text-[14px] lg:text-[20px] text-[#FF0000] font-bold"> 6. Thuốc thú
                                    y hoặc thuốc bảo vệ thực vật bị cấm hoặc chưa được cấp phép </h5>
                                <span class="text-[14px] lg:text-[16px]">Thuốc thú y, thuốc bảo vệ thực vật hoặc nguyên liệu
                                    sản xuất thuốc thú y, thuốc bảo vệ thực vật thuộc đối tượng bị cấm hoặc chưa được phép
                                    lưu hành tại Việt Nam.</span>
                            </div>
                        </div>
                        <div
                            class="flex items-start  gap-x-[12px] lg:gap-x-[24px] pt-[30px] border-b border-[#f2f2f2] lg:border-0">
                            <img class="w-[56px] h-[56px] lg:w-[94px] lg:h-[94px] object-cover"
                                src="../assets/img/prohibit7.png"
                                alt="Magicpost - Các mặt hàng cấm gửi">
                            <div class="lg:border-b lg:border-[#f2f2f2] pb-[30px] flex-1">
                                <h5 class="mb-[9px] text-[14px] lg:text-[20px] text-[#FF0000] font-bold"> 7. Phân bón
                                    chưa được cấp phép </h5>
                                <span class="text-[14px] lg:text-[16px]">Phân bón không có trong danh mục được phép sản
                                    xuất, kinh doanh và sử dụng tại Việt Nam</span>
                            </div>
                        </div>
                        <div
                            class="flex items-start  gap-x-[12px] lg:gap-x-[24px] pt-[30px] border-b border-[#f2f2f2] lg:border-0">
                            <img class="w-[56px] h-[56px] lg:w-[94px] lg:h-[94px] object-cover"
                                src="../assets/img/prohibit8.png"
                                alt="Magicpost - Các mặt hàng cấm gửi">
                            <div class="lg:border-b lg:border-[#f2f2f2] pb-[30px] flex-1">
                                <h5 class="mb-[9px] text-[14px] lg:text-[20px] text-[#FF0000] font-bold"> 8. Trang
                                    thiết bị y tế và thuốc chữa bệnh cho người chưa được cấp phép </h5>
                                <span class="text-[14px] lg:text-[16px]">Các loại trang thiết bị y tế chưa được phép sử dụng
                                    tại Việt Nam; Các loại thuốc chữa bệnh cho người, các loại vắc xin, sinh phẩm y tế, mỹ
                                    phẩm, hóa chất và chế phẩm diệt côn trùng, diệt khuẩn trong lĩnh vực gia dụng và y tế
                                    chưa được phép sử dụng tại Việt Nam.</span>
                            </div>
                        </div>
                        <div
                            class="flex items-start  gap-x-[12px] lg:gap-x-[24px] pt-[30px] border-b border-[#f2f2f2] lg:border-0">
                            <img class="w-[56px] h-[56px] lg:w-[94px] lg:h-[94px] object-cover"
                                src="../assets/img/prohibit9.png"
                                alt="Magicpost - Các mặt hàng cấm gửi">
                            <div class="lg:border-b lg:border-[#f2f2f2] pb-[30px] flex-1">
                                <h5 class="mb-[9px] text-[14px] lg:text-[20px] text-[#FF0000] font-bold"> 9. Phụ gia
                                    thực phẩm chưa được cấp phép </h5>
                                <span class="text-[14px] lg:text-[16px]">Phụ gia thực phẩm, chất hỗ trợ chế biến thực phẩm,
                                    vi chất dinh dưỡng, thực phẩm chức năng, thực phẩm có nguy cơ cao, thực phẩm được bảo
                                    quản bằng phương pháp chiếu xạ, thực phẩm có gen đã bị biến đổi chưa được phép sử dụng
                                    tại Việt Nam.</span>
                            </div>
                        </div>
                        <div
                            class="flex items-start  gap-x-[12px] lg:gap-x-[24px] pt-[30px] border-b border-[#f2f2f2] lg:border-0">
                            <img class="w-[56px] h-[56px] lg:w-[94px] lg:h-[94px] object-cover"
                                src="../assets/img/prohibit10.png"
                                alt="Magicpost - Các mặt hàng cấm gửi">
                            <div class="lg:border-b lg:border-[#f2f2f2] pb-[30px] flex-1">
                                <h5 class="mb-[9px] text-[14px] lg:text-[20px] text-[#FF0000] font-bold"> 10. Sinh vật
                                </h5>
                                <span class="text-[14px] lg:text-[16px]">Thực vật, động vật nguy cấp, quý, hiếm cần được bảo
                                    vệ (bất luận ở trạng thái nào).</span>
                            </div>
                        </div>
                        <div
                            class="flex items-start  gap-x-[12px] lg:gap-x-[24px] pt-[30px] border-b border-[#f2f2f2] lg:border-0">
                            <img class="w-[56px] h-[56px] lg:w-[94px] lg:h-[94px] object-cover"
                                src="../assets/img/prohibit11.png"
                                alt="Magicpost - Các mặt hàng cấm gửi">
                            <div class="lg:border-b lg:border-[#f2f2f2] pb-[30px] flex-1">
                                <h5 class="mb-[9px] text-[14px] lg:text-[20px] text-[#FF0000] font-bold"> 11. Tiền,
                                    các loại kim khí quý và di vật, cổ vật, bảo vật </h5>
                                <span class="text-[14px] lg:text-[16px]">
                                    <ul class="pl-6">
                                        <li class="list-disc">Tiền (tiền Việt Nam, ngoại tệ);</li>
                                        <li class="list-disc">Các loại kim khí quý (vàng, bạc, bạch kim…), các loại đá quý hoặc các sản phẩm
                                            khác được chế biến từ kim khí quý, đá quý;</li>
                                        <li class="list-disc">Di vật, cổ vật, bảo vật quốc gia.</li>
                                    </ul>
                                </span>
                            </div>
                        </div>
                        <div
                            class="flex items-start  gap-x-[12px] lg:gap-x-[24px] pt-[30px] border-b border-[#f2f2f2] lg:border-0">
                            <img class="w-[56px] h-[56px] lg:w-[94px] lg:h-[94px] object-cover"
                                src="../assets/img/prohibit12.png"
                                alt="Magicpost - Các mặt hàng cấm gửi">
                            <div class="lg:border-b lg:border-[#f2f2f2] pb-[30px] flex-1">
                                <h5 class="mb-[9px] text-[14px] lg:text-[20px] text-[#FF0000] font-bold"> 12. Đồ chơi
                                    nguy hiểm </h5>
                                <span class="text-[14px] lg:text-[16px]">Đồ chơi nguy hiểm, đồ chơi có hại tới giáo dục nhân
                                    cách và sức khỏe của trẻ em hoặc tới an ninh, trật tự, an toàn xã hội</span>
                            </div>
                        </div>
                        <div
                            class="flex items-start  gap-x-[12px] lg:gap-x-[24px] pt-[30px] border-b border-[#f2f2f2] lg:border-0">
                            <img class="w-[56px] h-[56px] lg:w-[94px] lg:h-[94px] object-cover"
                                src="../assets/img/prohibit13.png"
                                alt="Magicpost - Các mặt hàng cấm gửi">
                            <div class="lg:border-b lg:border-[#f2f2f2] pb-[30px] flex-1">
                                <h5 class="mb-[9px] text-[14px] lg:text-[20px] text-[#FF0000] font-bold"> 13. Các hóa
                                    chất và khoáng vật cấm kinh doanh </h5>
                                <span class="text-[14px] lg:text-[16px]"></span>
                            </div>
                        </div>
                        <div
                            class="flex items-start  gap-x-[12px] lg:gap-x-[24px] pt-[30px] border-b border-[#f2f2f2] lg:border-0">
                            <img class="w-[56px] h-[56px] lg:w-[94px] lg:h-[94px] object-cover"
                                src="../assets/img/prohibit14.png"
                                alt="Magicpost - Các mặt hàng cấm gửi">
                            <div class="lg:border-b lg:border-[#f2f2f2] pb-[30px] flex-1">
                                <h5 class="mb-[9px] text-[14px] lg:text-[20px] text-[#FF0000] font-bold"> 14. Bưu gửi
                                    chứa nhiều bưu gửi, gửi nhiều địa chỉ nhận; thư trong bưu gửi; thư có chứa vật phẩm hoặc
                                    hàng hóa </h5>
                                <span class="text-[14px] lg:text-[16px]"></span>
                            </div>
                        </div>
                        <div
                            class="flex items-start  gap-x-[12px] lg:gap-x-[24px] pt-[30px] border-b border-[#f2f2f2] lg:border-0">
                            <img class="w-[56px] h-[56px] lg:w-[94px] lg:h-[94px] object-cover"
                                src="../assets/img/prohibit15.png"
                                alt="Magicpost - Các mặt hàng cấm gửi">
                            <div class="lg:border-b lg:border-[#f2f2f2] pb-[30px] flex-1">
                                <h5 class="mb-[9px] text-[14px] lg:text-[20px] text-[#FF0000] font-bold"> 15. Vật
                                    phẩm, hàng hóa khác cấm xuất khẩu, nhập khẩu hoặc cấm kinh doanh </h5>
                                <span class="text-[14px] lg:text-[16px]">
                                    <ul class="pl-6">
                                        <li class="list-disc">Tiền giả;</li>
                                        <li class="list-disc">Bộ phận cơ thể người, hài cốt, xá lợi;</li>
                                        <li class="list-disc">Sản phẩm, vật liệu có chứa amilăng thuộc nhóm amphibole;</li>
                                        <li class="list-disc">Phế liệu nhập khẩu gây ô nhiễm môi trường;</li>
                                        <li class="list-disc">Ấn phẩm, học phẩm người mù;</li>
                                        <li class="list-disc">Các vật phẩm, hàng hóa khác mà pháp luật của Việt Nam quy định cấm lưu thông,
                                            xuất khẩu, nhập khẩu, kinh doanh; cấm vận chuyển bằng đường bưu chính theo quy
                                            định của pháp luật Việt Nam, điều ước quốc tế mà Cộng hòa xã hội chủ nghĩa Việt
                                            Nam là thành viên tại từng thời điểm.</li>
                                    </ul>
                                </span>
                            </div>
                        </div>
                        <div
                            class="flex items-start  gap-x-[12px] lg:gap-x-[24px] pt-[30px] border-b border-[#f2f2f2] lg:border-0">
                            <img class="w-[56px] h-[56px] lg:w-[94px] lg:h-[94px] object-cover"
                                src="../assets/img/prohibit16.png"
                                alt="Magicpost - Các mặt hàng cấm gửi">
                            <div class="lg:border-b lg:border-[#f2f2f2] pb-[30px] flex-1">
                                <h5 class="mb-[9px] text-[14px] lg:text-[20px] text-[#FF0000] font-bold"> 16. Hàng hóa
                                    kinh doanh không có đủ hóa đơn, chứng từ theo quy định pháp luật </h5>
                                <span class="text-[14px] lg:text-[16px]"></span>
                            </div>
                        </div>
                        <div class="flex items-start gap-x-[24px] mt-[32px]">
                            <div class="w-[94px] h-[94px] hidden lg:block"></div>
                            <div class="flex-1">
                                <h5 class="mb-[9px] text-[14px] lg:text-[16px] text-[#000000] font-bold">
                                    * Khách hàng hiểu và đồng ý rằng, dù là trước khi tiếp nhận, trong quá trình vận chuyển
                                    hoặc sau khi bàn giao hàng hóa, nếu Magicpost có cơ sở nghi ngờ hoặc phát hiện bưu
                                    gửi thuộc Danh mục hàng hóa từ chối vận chuyển nêu trên hoặc vi phạm quy định pháp luật
                                    thì Magicpost có quyền kiểm tra, từ chối cung cấp dịch vụ, xử lý bưu gửi hoặc
                                    trình báo với cơ quan nhà nước có thẩm quyền và được miễn trừ toàn bộ các khiếu nại,
                                    thiệt hại phát sinh từ hành vi không tuân thủ của Khách hàng.
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'CustomerSearching',
    data() {
        return {
            packageCode: '',
            query: '',
            s1: "",
            s2: "",
            s3: "",
            show: false,
            showTab: 0,
            displayDeliveryCenter: false,
            provinces: [],
            provinceSelectedId: 0,
            districts: [],
            deliveryCenters: [],
            packageInfo: [],
            districtSelectedId: 0,
        }
    },

    methods: {
        fetchData() {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve('Dữ liệu từ server');
                }, 2000); // Giả lập thời gian đợi 2 giây
            });
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
                    this.districts = res.data

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

        async getPackageInfo() {
            if (this.packageCode > 0) {
                try {
                    const res = await axios.get(`/search/${this.packageCode}`, { withCredentials: true });
                    this.packageInfo = res.data
                } catch (error) {
                    console.log("get packageInfo error")
                }
            }
        },


        showStatus() {
            this.show = true;
            if (this.packageCode == 1) {
                this.s1 = "bg-green-400";
            }

            if (this.data == 2) {
                this.s2 = "bg-green-400";
            }

            if (this.data == 3) {
                this.s3 = "bg-green-400";
            }
        },
        deliveryCenterSearch() {
            this.displayDeliveryCenter = !this.displayDeliveryCenter;
        },

        clearData() {

        }
    },

    computed: {
        location(address) {

        }
    },

    mounted() {
        this.getPackageInfo();
    },
    created() {
        this.getProvinces();
    }
}
</script>

<style></style>