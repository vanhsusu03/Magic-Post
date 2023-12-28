<template>
    <div v-if="isLogin">
        <div class="grid grid-cols-12" >
            <SideBarManage @childEvent="getSidebarExpand" class="col-start-1 md:col-start-1 md:col-end-2 bg-slate-50 " :selecteds="selecteds" @update:selecteds="updateSelecteds">
            </SideBarManage>
            <div v-if="this.sidebarExpand" class="col-start-3 col-end-13 border-t border-l rounded-lg bg-slate-50">
                <div v-if="selecteds[0]">Content for Thống kêasd</div>
                <LeaderManageAccount class="col-start-3 col-end-13 border-t border-l rounded-lg bg-slate-50" v-if="selecteds[1] && leadership"></LeaderManageAccount>
                <WarehouseManagerManageAccount class="col-start-3 col-end-13 border-t border-l rounded-lg bg-slate-50" v-if="selecteds[1] && manager_WH"></WarehouseManagerManageAccount>
                <DeliveryCenterManagerManageAccount class="col-start-3 col-end-13 border-t border-l rounded-lg bg-slate-50" v-if="selecteds[1] && manager_DC"></DeliveryCenterManagerManageAccount>
                <DeliveryCenterManage class="col-start-3 col-end-13 border-t border-l rounded-lg bg-slate-50" v-if="selecteds[2]"></DeliveryCenterManage>
                <WareHouseManage class="col-start-3 col-end-13 border-t border-l rounded-lg bg-slate-50" v-if="selecteds[3]"></WareHouseManage>
                <PackageManage_DC class="col-start-3 col-end-13 border-t border-l rounded-lg bg-slate-50" v-if="selecteds[6]"></PackageManage_DC>
                <div class="col-start-3 col-end-13 border-t border-l rounded-lg bg-slate-50" v-if="selecteds[4]">Content for Thống kê</div>
                <div class="col-start-3 col-end-13 border-t border-l rounded-lg bg-slate-50" v-if="selecteds[5]">Content for Thống kê</div>
            </div>
            <div v-else class="col-start-2 col-end-13 border-t border-l rounded-lg bg-slate-50">
                <div v-if="selecteds[0]">Content for Thống kêasd</div>
                <LeaderManageAccount class="col-start-3 col-end-13 border-t border-l rounded-lg bg-slate-50" v-if="selecteds[1] && leadership"></LeaderManageAccount>
                <WarehouseManagerManageAccount class="col-start-3 col-end-13 border-t border-l rounded-lg bg-slate-50" v-if="selecteds[1] && manager_WH"></WarehouseManagerManageAccount>
                <DeliveryCenterManagerManageAccount class="col-start-3 col-end-13 border-t border-l rounded-lg bg-slate-50" v-if="selecteds[1] && manager_DC"></DeliveryCenterManagerManageAccount>
                <DeliveryCenterManage class="col-start-3 col-end-13 border-t border-l rounded-lg bg-slate-50" v-if="selecteds[2]"></DeliveryCenterManage>
                <WareHouseManage class="col-start-3 col-end-13 border-t border-l rounded-lg bg-slate-50" v-if="selecteds[3]"></WareHouseManage>
                <PackageManage_DC class="col-start-3 col-end-13 border-t border-l rounded-lg bg-slate-50" v-if="selecteds[6]"></PackageManage_DC>
                <div class="col-start-3 col-end-13 border-t border-l rounded-lg bg-slate-50" v-if="selecteds[4]">Content for Thống kê</div>
                <div class="col-start-3 col-end-13 border-t border-l rounded-lg bg-slate-50" v-if="selecteds[5]">Content for Thống kê</div>
            </div>
            
        </div>
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
export default {
    name: 'ManagerHome',
    data() {
        return {
            selecteds: [true, false, false, false, false, false, false],
            sidebarExpand: true,
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
    },
    methods: {
        updateSelecteds(newSelecteds) {
            this.selecteds = newSelecteds;
            // Do something with the updated selecteds array
            console.log('Selecteds updated in ManagerHome:', this.selecteds);
        },
        getSidebarExpand(mss) {
            this.sidebarExpand = mss
            console.log(this.sidebarExpand)
        }
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
    //background-color: ;
}
</style>
  