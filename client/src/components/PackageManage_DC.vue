<template>
    <div class="h-10/12 border-t border-l mx-auto" v-if="teller_DC.username">
        <div class="grid grid-cols-6 mx-4">
            <h1 class="font-semibold col-start-1 col-end-5 py-4 lg:text-2xl md:text-xl sm:text-lg text-base font-sans">
                Quản lý đơn hàng tại điểm giao dịch
            </h1>
            <div class="mx-auto col-start-5 col-end-7">
                <h2 class="py-2 md:text-base sm:text-sm text-xs">Chọn loại tác vụ:</h2>
                <select id="office-province" name="province_id" v-model="taskTypeSelected" @change="" class="search-select mb-4 w-9/12 max-h-fit select2-hidden-accessible bg-gray-100 rounded-b-lg border-gray-300
                        md:text-base sm:text-sm text-xs cursor-pointer hover:shadow-lg" tabindex="-1" aria-hidden="true"
                    data-select2-id="select2-data-office-province">
                    <option class="md:text-base sm:text-sm text-xs border text-gray-900" :value="0" selected>Chọn tác vụ
                    </option>
                    <option class="md:text-base sm:text-sm text-xs border text-gray-900" :value="1">Ghi nhận hàng cần gửi từ
                        khách hàng</option>
                    <option class="md:text-base sm:text-sm text-xs border text-gray-900" :value="2">Gửi hàng tới điểm tập kết
                    </option>
                    <option class="md:text-base sm:text-sm text-xs border text-gray-900" :value="3">Xác nhận hàng về từ điểm tập
                        kết</option>
                    <option class="md:text-base sm:text-sm text-xs border text-gray-900" :value="4">Quản lý đơn hàng vận chuyển
                        tới người nhận</option>
                </select>
            </div>
        </div>
        
        <br>
        <div class="mx-4" id="course" v-if="taskTypeSelected == 1">
            <CreatePackage></CreatePackage>
        </div>

        <div class="mx-4" id="course" v-if="taskTypeSelected == 2">
            <PackCollectionManage_DC></PackCollectionManage_DC>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapMutations } from 'vuex';
import CreatePackage from './CreatePackage.vue';
import PackCollectionManage_DC from './PackCollectionManage_DC.vue';
export default {
    name: 'PackageManage_DC',
    data() {
        return {
            taskTypeSelected: 0,
        }
    },
    components: {
        CreatePackage,
        PackCollectionManage_DC,
    },
    methods: {

    },
    computed: {
        ...mapState(['isLogin', 'leadership', 'leadershipToken', 'manager_DC', 'managerDCToken', 'manager_WH', 'managerWHToken',
            'staff_WH', 'teller_DC', 'tellerDCToken']),
    }
}
</script>

<style></style>