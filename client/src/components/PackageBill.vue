<template>
    <div id="container">
        <div class="mx-auto">
            <h1 class="my-4 text-center font-sans font-bold lg:text-xl md:text-lg text-md">Giấy biên nhận chuyển phát</h1>
            <hr class="my-2 mx-auto w-10/12">
            <!-- <button @click="test()" >tesst</button> -->
            <div class="h-9/12 mx-auto">
                <div class="flex mx-auto my-2">
                    <div class="w-6/12">
                        <img src="../assets/img/logo.png" alt="" class="mx-auto h-20 w-auto">

                        <p class="text-md lg:text-lg text-center pt-4 text-black-100">
                            Delivery all you need
                        </p>
                    </div>
                    <div class="w-6/12">
                        <qrcode-vue class="mx-auto" :value="value" :size="size" level="H" />
                    </div>
                </div>


                <table class="mx-auto mt-4">
                    <tr>
                        <td
                            class="w-6/12 border border-2 border-black items-center justify-center md:text-lg sm:text-base text-sm">
                            <h1><strong>1. Họ tên địa chỉ người gửi</strong></h1>
                            <h2>Nguyễn Tuấn Anh</h2>
                            <h2>Dịch vọng adasdqwđqdqsdqqqqqqqqqqqqqqqqsdqdqđkwjfnùnwfnonp</h2><br>

                            <h2><strong>Điện thoại:</strong> 0355110113</h2>
                            <h2><strong>Mã khách hàng</strong></h2>
                            <h2><strong>Mã bưu chính:</strong> 10179</h2>
                        </td>
                        <td
                            class="w-6/12 border border-2 border-black items-center justify-center md:text-lg sm:text-base text-sm">
                            <h1><strong>2. Họ tên địa chỉ người nhận</strong></h1>
                            <h2>Nguyễn Tuấn Anh</h2>
                            <h2>Dịch vọng adasdqwđqdqsdqqqqqqqqqqqqqqqqsdqdqđkwjfnùnwfnonp</h2><br>

                            <h2><strong>Mã đơn hàng:</strong></h2>
                            <h2><strong>Điện thoại:</strong> 0355110113</h2>
                            <h2><strong>Mã bưu chính:</strong> 10189</h2>
                        </td>
                    </tr>
                    <tr>
                        <td
                            class="w-6/12 border border-2 border-black items-center justify-center md:text-lg sm:text-base text-sm">
                            <h1><strong>3. Loại hàng gửi:</strong></h1>
                            <div class="flex mx-auto my-4">
                                <div class="flex items-center h-5"><input type="radio" id="packageTypeIdMerchandise"
                                        aria-describedby="packageTypeInfo" class="w-4 h-4" value="2" checked disabled>Tài
                                    liệu
                                </div>

                                <div class="flex items-center h-5 ml-4"><input type="radio" id="packageTypeIdDocument"
                                        aria-describedby="packageTypeInfo" class="w-4 h-4" value="1" disabled>Hàng hóa
                                </div>
                            </div>
                            <h1><strong>4. Nội dụng trị giá bưu gửi:</strong></h1>
                            <table class="w-full">
                                <tr>
                                    <th
                                        class="bg-slate-300 border border-2 border-black items-center justify-center md:text-lg sm:text-base text-sm">
                                        Nội dung</th>
                                    <th
                                        class="bg-slate-300 border border-2 border-black items-center justify-center md:text-lg sm:text-base text-sm">
                                        Số lượng</th>
                                    <th
                                        class="bg-slate-300 border border-2 border-black items-center justify-center md:text-lg sm:text-base text-sm">
                                        Trị giá</th>
                                    <th
                                        class="bg-slate-300 border border-2 border-black items-center justify-center md:text-lg sm:text-base text-sm">
                                        Giấy tờ đính kèm</th>
                                </tr>
                                <tr>
                                    <td
                                        class="border border-2 border-black items-center justify-center md:text-lg sm:text-base text-sm">
                                        Tổng</td>
                                    <td
                                        class="border border-2 border-black items-center justify-center md:text-lg sm:text-base text-sm">
                                        0</td>
                                    <td
                                        class="border border-2 border-black items-center justify-center md:text-lg sm:text-base text-sm">
                                    </td>
                                    <td
                                        class="border border-2 border-black items-center justify-center md:text-lg sm:text-base text-sm">
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td
                            class="max-w-screen-sm border border-2 border-black items-center justify-center md:text-lg sm:text-base text-sm">
                            <h1 class="mb-2"><strong>5. Dịch vụ đặc biệt/Cộng thêm</strong></h1>
                            ....................................................................................................................................................................<br>
                            ....................................................................................................................................................................<br>
                            <h2>Mã hợp đồng EMSC/PPA</h2>
                        </td>
                    </tr>

                    <tr>
                        <td class="max-w-screen-sm border border-2 border-black items-center justify-center md:text-lg sm:text-base text-sm">
                            <h1><strong>6. Chỉ dẫn của người gửi khi không phát được bưu gửi</strong></h1>
                            <div class="">
                                <input type="checkbox" class="inline-block" name="" id="" disabled>Chuyển hoàn ngay<br>             
                                <input type="checkbox" class="inline-block" name="" id="" disabled>Gọi điện cho người gửi BC gửi đi<br>
                                <input type="checkbox" class="inline-block" name="" id="" disabled>Chuyển hoàn trước ngày<br>
                                <input type="checkbox" class="inline-block" name="" id="" disabled>Hủy<br>
                                <input type="checkbox" class="inline-block" name="" id="" disabled>Chuyển hoàn sau khi hết thời gian lưu trữ<br>
                            </div>
                            
                        </td>
                        <td class="max-w-screen-sm border border-2 border-black items-center justify-center md:text-lg sm:text-base text-sm">
                            <h1><strong>7. Cước</strong></h1>
                            <table class="w-full my-2">
                                <tr>
                                    <th class="bg-slate-300 border border-2 border-black items-center justify-center md:text-lg sm:text-base text-sm">
                                        Cước chính
                                    </th>
                                    <th class="bg-slate-300 border border-2 border-black items-center justify-center md:text-lg sm:text-base text-sm">
                                        Phụ phí
                                    </th>
                                    <th class="bg-slate-300 border border-2 border-black items-center justify-center md:text-lg sm:text-base text-sm">Cước GTGT</th>
                                    <th class="bg-slate-300 border border-2 border-black items-center justify-center md:text-lg sm:text-base text-sm">Tổng cước(gồm VAT)</th>
                                    <th class="bg-slate-300 border border-2 border-black items-center justify-center md:text-lg sm:text-base text-sm">Thu khác</th>
                                    <th class="bg-slate-300 border border-2 border-black items-center justify-center md:text-lg sm:text-base text-sm">Tổng thu</th>
                                </tr>

                                <tr>
                                    <td class="border border-2 border-black items-center justify-center md:text-lg sm:text-base text-sm">9.500</td>
                                    <td class="border border-2 border-black items-center justify-center md:text-lg sm:text-base text-sm">1.900</td>
                                    <td class="border border-2 border-black items-center justify-center md:text-lg sm:text-base text-sm">0</td>
                                    <td class="border border-2 border-black items-center justify-center md:text-lg sm:text-base text-sm">13.312</td>
                                    <td class="border border-2 border-black items-center justify-center md:text-lg sm:text-base text-sm">0</td>
                                    <td class="border border-2 border-black items-center justify-center md:text-lg sm:text-base text-sm">13.312</td>
                                </tr>
                            </table>
                            <h1><strong>8. Khối lượng(kg):</strong></h1>
                            <h2>Khối lượng thực tế:     30</h2>
                            <h2>Khối lượng quy đổi:     0</h2>
                        </td>
                        
                    </tr>

                    <tr>
                        <td class="max-w-screen-sm border border-2 border-black items-center justify-center md:text-lg sm:text-base text-sm">
                            <h1><strong>9. Cam kết của người gửi</strong></h1>
                            <h3>Tôi chấp nhận các điều khoản tại mặt sau phiếu gửi và cam đoan bưu gửi này không chức những mặt hàng nguy hiểm, cấm gửi. Trườngg hợp không phát được hãy thức hiện chỉ dẫn tại mục 6. tôi sẽ trả cước chuyển hoàn</h3>
                            <h1><strong>Ngày giờ gửi: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Chữ kí người gửi</strong></h1>
                            <h3>12h28/12/2023</h3>
                        </td>
                        <td class="max-w-screen-sm border border-2 border-black items-center justify-center md:text-lg sm:text-base text-sm">
                            <h1><strong>10. Thu của người nhận:</strong></h1>
                            <h2>COD: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1234</h2>
                            <h2>Thu khác: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;1234</h2>
                            <h2>Tổng: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1234
                            </h2>
                            <hr class="border-black">
                            <div class="flex max-w-screen-sm">
                                <div class="max-w-md w-96 border-r border-black">
                                    <h1><strong>11. Bưu cục chấp nhận</strong></h1>
                                    <h3>Chữ kỹ GDV nhận</h3><br>
                                    <br>
                                    <br>
                                    <br>
                                    <br>
                                    <h2 class="ml-24">GDV: Nguyễn Tuấn Anh</h2>
                                </div>
                                <div class="">
                                    <h1><strong>12. Ngày giờ nhận:</strong></h1>
                                    <h3>.....h...../...../20.....</h3>
                                    <h3 class="text-center">Người nhận/ Người được ủy quyền nhận</h3>
                                    <h3 class="text-center">(Ký, ghi rõ họ tên)</h3>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>

</div></template>

<script>
import QrcodeVue from 'qrcode.vue'

export default {
    name: 'PackageBill',
    data() {
      return {
        value: 'https://courses.uet.vnu.edu.vn/',
        size: 96,
      }
    },
    props: {
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
        teller: [],
    },
    components: {
        QrcodeVue,

    },
    methods: {
        test() {
            console.log(this.formBill)
        }
    },
    
}
</script>

<style lang="scss">

</style>