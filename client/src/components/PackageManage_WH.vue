<template>
    <div class="h-10/12 w-10/12" v-if="staff_WH.username">
        <div class="w-8/12 grid grid-cols-4 mx-auto">
            <span class="col-span-3 max-w-fit">
                <h1 class="font-semibold py-4 text-center lg:text-xl md:text-lg sm:text-base text-sm">
                    Quản lý đơn hàng tại điểm tập kết
                </h1>
            </span>
        </div>
        <div class="mx-auto">
            <h2 class="py-2 md:text-base sm:text-sm text-xs">Chọn loại tác vụ:</h2>
            <select id="office-province" name="province_id" v-model="taskTypeSelected" @change="" class="search-select mb-4 w-4/12 h-full select2-hidden-accessible bg-gray-100 rounded-b-lg border-gray-300
                    md:text-base sm:text-sm text-xs cursor-pointer hover:shadow-lg" tabindex="-1" aria-hidden="true"
                data-select2-id="select2-data-office-province">
                <option class="md:text-base sm:text-sm text-xs border text-gray-900" :value="0" selected>Chọn tác vụ
                </option>
                <option class="md:text-base sm:text-sm text-xs border text-gray-900" :value="4">Gửi hàng tới điểm tập kết
                    đích</option>
                <option class="md:text-base sm:text-sm text-xs border text-gray-900" :value="2">Gửi hàng tới điểm giao dịch
                    đích</option>
                <option class="md:text-base sm:text-sm text-xs border text-gray-900" :value="3">Xác nhận hàng về từ điểm tập
                    kết nguồn</option>
                <option class="md:text-base sm:text-sm text-xs border text-gray-900" :value="1">Xác nhận hàng gửi tới từ
                    điểm giao dịch nguồn</option>
            </select>
        </div>
        <br>
        <div class="mx-auto" id="course" v-if="taskTypeSelected == 3">
            <CreatePackage></CreatePackage>
        </div>

        <div class="mx-auto" id="course" v-if="taskTypeSelected == 2">
            <PackCollectionManage_DC></PackCollectionManage_DC>
        </div>

        <div class="mx-auto" id="course" v-if="taskTypeSelected == 1">
            <PackageConfirm_WH></PackageConfirm_WH>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapMutations } from 'vuex';
import CreatePackage from './CreatePackage.vue';
import PackCollectionManage_DC from './PackCollectionManage_DC.vue';
import PackageConfirm_WH from './PackageConfirm_WH.vue';
export default {
    name: 'PackageManage_WH',
    data() {
        return {
            taskTypeSelected: 0,
        }
    },
    components: {
        CreatePackage,
        PackCollectionManage_DC,
        PackageConfirm_WH,
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