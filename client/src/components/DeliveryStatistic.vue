<template>
  <div id="container">
    <div class="md:max-w-5xl sm:max-w-3xl max-w-xl w-11/12 mx-auto">
      <div class="py-2 grid gird-cols-9">
        <span class="col-start-1 col-end-5 py-2">
          <h1 class="inline-flex font-semibold lg:text-xl md:text-lg sm:text-base text-sm">
            Thống kê - Điểm giao dịch số 
          </h1>
        </span>
      </div>

      <hr class="my-2 mx-auto">
      <div class="" id="course">
        <div class="w-full mx-auto" id="course">
          <table>
            <tr>
              <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">
                Mã đơn</th>
              <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">
                Thông tin người gửi</th>
              <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">
                Thông tin người nhận</th>
              <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">
                Mã điểm GD bên gửi</th>
              <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">
                Địa chỉ người nhận</th>
              <th class="bg-green-500 text-white font-bold py-2 px-4 border md:text-base sm:text-sm text-xs border">
                Xác nhận thành công lúc</th>
            </tr>
            <tr v-for="packages in displayedItemList" :key="packages.packageId">
              <td class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs">
                {{ packages.packageId }}
              </td>
              <td class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs truncate">
                {{ packages.senderName }}
                <br />
                {{ packages.senderPhone }}
              </td>
              <td class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs truncate">
                {{ packages.receiverName }}
                <br />
                {{ packages.receiverPhone }}
              </td>
              <td class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs">
                {{ packages.deliveryCenterSendId }}
              </td>
              <td class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs truncate">
                {{ packages.receiverAddress }}
              </td>
              <td class="py-2 px-4 border items-center justify-center md:text-base sm:text-sm text-xs truncate">
                {{ new Date(packages.status_details[8].time).toLocaleString("en-US", {
                  timeZone:
                    Intl.DateTimeFormat().resolvedOptions().timeZone
                }) }}
              </td>
            </tr>
          </table>

          <div class="my-4">
            <div class="max-w-fit mx-auto">
              <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded 
                    cursor-pointer shadow-lg md:text-base sm:text-sm text-xs" @click="goToPage(currentPage - 1)"
                :disabled="currentPage === 1">Previous Page</button>
              <span class="pl-10 pr-10 md:text-base sm:text-sm text-xs">Trang <strong>{{ currentPage
              }}</strong>
                trong tổng số <strong>{{ totalPages
                }}</strong></span>
              <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded 
                    cursor-pointer shadow-lg md:text-base sm:text-sm text-xs" @click="goToPage(currentPage + 1)"
                :disabled="currentPage === totalPages">Next Page</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  name: 'DeliveryStatistic',
  methods: {

  },
};
</script>