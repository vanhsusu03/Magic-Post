<template>
    <div class="grid grid-cols-5" v-if="isLogin">
        <SideBarManage class="col-span-2 md:col-span-1" :selecteds="selecteds" @update:selecteds="updateSelecteds">
        </SideBarManage>
        <div class="col-span-4" v-if="selecteds[0]">Content for Thống kê</div>
        <LeaderManageAccount class="col-span-4" v-if="selecteds[1] && leadership"></LeaderManageAccount>
        <WarehouseManagerManageAccount class="col-span-4" v-if="selecteds[1] && manager_WH"></WarehouseManagerManageAccount>
        <DeliveryCenterManagerManageAccount class="col-span-4" v-if="selecteds[1] && manager_DC"></DeliveryCenterManagerManageAccount>
        <DeliveryCenterManage class="col-span-4" v-if="selecteds[2]"></DeliveryCenterManage>
        <WareHouseManage class="col-span-4" v-if="selecteds[3]"></WareHouseManage>
        <PackageManage_DC class="col-span-4" v-if="selecteds[6]"></PackageManage_DC>
        <PackageManage_WH class="col-span-4" v-if="selecteds[7]"></PackageManage_WH>
        <div class="col-span-4" v-if="selecteds[4]">Content for Thống kê</div>
        <div class="col-span-4" v-if="selecteds[5]">Content for Thống kê</div>
    </div>
</template>
  
<script>
import SideBarManage from '../components/SideBarManage.vue';
import DeliveryCenterManage from '../components/DeliveryCenterManage.vue';
import WareHouseManage from '../components/WarehouseManage.vue';
import LeaderManageAccount from '@/components/LeaderManageAccount.vue';
import { mapState } from 'vuex';
import WarehouseManagerManageAccount from '@/components/WarehouseLeadAccount.vue';
import DeliveryCenterManagerManageAccount from '@/components/DeliveryCenterLeadAccount.vue';
import PackageManage_DC from '@/components/PackageManage_DC.vue';
import PackageManage_WH from '@/components/PackageManage_WH.vue';
export default {
    name: 'ManagerHome',
    data() {
        return {
            selecteds: [true, false, false, false, false, false, false, false],
        };
    },
    components: {
        SideBarManage,
        DeliveryCenterManage,
        WareHouseManage,
        LeaderManageAccount,
        WarehouseManagerManageAccount,
        DeliveryCenterManagerManageAccount,
        PackageManage_DC,
        PackageManage_WH,
    },
    methods: {
        updateSelecteds(newSelecteds) {
            this.selecteds = newSelecteds;
            // Do something with the updated selecteds array
            console.log('Selecteds updated in ManagerHome:', this.selecteds);
        },
    },
    computed: {
        ...mapState(['isLogin', 'leadership', 'leadershipToken', 'manager_DC', 'manager_WH', 'staff_WH', 'teller_DC']),
    }
};
</script>
  
<style lang="scss" scoped>
* {
    position: relative;
    padding: 0;
    margin: 0;
}
</style>
  