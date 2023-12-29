<template>
    <div v-if="isLogin">
        <div class="grid grid-cols-12">
            <SideBarManage @childEvent="getSidebarExpand" class="col-start-1 bg-slate-50 " :selecteds="selecteds"
                @update:selecteds="updateSelecteds">
            </SideBarManage>
            <div v-if="this.sidebarExpand" class="col-start-3 col-end-13 border-t border-l rounded-lg bg-slate-50">
                <Article v-if="selecteds[0]"></Article>
                <LeaderManageAccount class="col-start-3 col-end-13 border-t border-l rounded-lg bg-slate-50"
                    v-if="selecteds[1] && leadership"></LeaderManageAccount>
                <WarehouseManagerManageAccount class="col-start-3 col-end-13 border-t border-l rounded-lg bg-slate-50"
                    v-if="selecteds[1] && manager_WH"></WarehouseManagerManageAccount>
                <DeliveryCenterManagerManageAccount class="col-start-3 col-end-13 border-t border-l rounded-lg bg-slate-50"
                    v-if="selecteds[1] && manager_DC"></DeliveryCenterManagerManageAccount>
                <DeliveryCenterManage class="col-start-3 col-end-13 border-t border-l rounded-lg bg-slate-50"
                    v-if="selecteds[2]"></DeliveryCenterManage>
                <WareHouseManage class="col-start-3 col-end-13 border-t border-l rounded-lg bg-slate-50"
                    v-if="selecteds[3]"></WareHouseManage>
                <PackageManage_DC class="col-start-3 col-end-13 border-t border-l rounded-lg bg-slate-50"
                    v-if="selecteds[6]"></PackageManage_DC>
                <PackageManage_WH class="col-start-3 col-end-13 border-t border-l rounded-lg bg-slate-50"
                    v-if="selecteds[7]"></PackageManage_WH>
                <WarehouseStatisticVue class="col-start-3 col-end-13 border-t border-l rounded-lg bg-slate-50"
                    v-if="selecteds[4] && manager_WH"></WarehouseStatisticVue>
                <DeliveryStatistic class="col-start-3 col-end-13 border-t border-l rounded-lg bg-slate-50"
                    v-if="selecteds[4] && manager_DC">Content for
                    Thống kê</DeliveryStatistic>
                <PersonalInfor class="col-start-3 col-end-13 border-t border-l rounded-lg bg-slate-50" v-if="selecteds[5]">Content for
                    Thống kê</PersonalInfor>
            </div>
            <div v-else class="col-start-2 col-end-13 border-t border-l rounded-lg bg-slate-50">
                <Article v-if="selecteds[0]"></Article>
                <LeaderManageAccount class="col-start-3 col-end-13 border-t border-l rounded-lg bg-slate-50"
                    v-if="selecteds[1] && leadership"></LeaderManageAccount>
                <WarehouseManagerManageAccount class="col-start-3 col-end-13 border-t border-l rounded-lg bg-slate-50"
                    v-if="selecteds[1] && manager_WH"></WarehouseManagerManageAccount>
                <DeliveryCenterManagerManageAccount class="col-start-3 col-end-13 border-t border-l rounded-lg bg-slate-50"
                    v-if="selecteds[1] && manager_DC"></DeliveryCenterManagerManageAccount>
                <DeliveryCenterManage class="col-start-3 col-end-13 border-t border-l rounded-lg bg-slate-50"
                    v-if="selecteds[2]"></DeliveryCenterManage>
                <WareHouseManage class="col-start-3 col-end-13 border-t border-l rounded-lg bg-slate-50"
                    v-if="selecteds[3]"></WareHouseManage>
                <PackageManage_DC class="col-start-3 col-end-13 border-t border-l rounded-lg bg-slate-50"
                    v-if="selecteds[6]"></PackageManage_DC>
                <PackageManage_WH class="col-start-3 col-end-13 border-t border-l rounded-lg bg-slate-50"
                    v-if="selecteds[7]"></PackageManage_WH>
                <DeliveryStatistic class="col-start-3 col-end-13 border-t border-l rounded-lg bg-slate-50"
                    v-if="selecteds[4] && manager_DC">Content for
                    Thống kê</DeliveryStatistic>
                <WarehouseStatisticVue class="col-start-3 col-end-13 border-t border-l rounded-lg bg-slate-50"
                    v-if="selecteds[4] && manager_WH">
                </WarehouseStatisticVue>
                <PersonalInfor class="col-start-3 col-end-13 border-t border-l rounded-lg bg-slate-50" v-if="selecteds[5]">Content for
                    Thống kê</PersonalInfor>
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
import PackageManage_WH from '@/components/PackageManage_WH.vue';
import DeliveryStatistic from '@/components/DeliveryStatistic.vue';
import WarehouseStatisticVue from '@/components/WarehouseStatistic.vue';
import PersonalInfor from './PersonalInfor.vue';
import Article from './Article.vue';
export default {
    name: 'ManagerHome',
    data() {
        return {
            selecteds: [true, false, false, false, false, false, false, false],
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
        PackageManage_WH,
        DeliveryStatistic,
        PersonalInfor,
        Article,
        WarehouseStatisticVue
    },
    methods: {
        updateSelecteds(newSelecteds) {
            this.selecteds = newSelecteds;
            // Do something with the updated selecteds array
            console.log('Selecteds updated in ManagerHome:', this.selecteds);
        },
        getSidebarExpand(mss) {
            this.sidebarExpand = mss
            this.formBill = this.form;
        },

    },
    computed: {
        ...mapState(['isLogin', 'leadership', 'leadershipToken', 'manager_DC', 'manager_WH', 'staff_WH', 'teller_DC']),
    },

};
</script>
  
<style lang="scss" scoped>
* {
    position: relative;
    padding: 0;
    margin: 0;
    //background-color: ;
}</style>
  