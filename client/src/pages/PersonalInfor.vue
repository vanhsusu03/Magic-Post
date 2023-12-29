<template>
    <div id="container">
        <div class="md:max-w-5xl sm:max-w-3xl max-w-xl w-11/12 mx-auto">
            <div class="py-2 grid gird-cols-9">
                <span class="col-start-1 col-end-5 py-2">
                    <h1 v-if="this.leadership" class="inline-flex font-semibold lg:text-xl md:text-lg sm:text-base text-sm">
                        Lãnh đạo công ty
                    </h1>
                    <h1 v-if="this.manager_DC" class="inline-flex font-semibold lg:text-xl md:text-lg sm:text-base text-sm">
                        Trưởng điểm giao dịch số {{ this.manager_DC.deliveryCenterId + ' - ' + this.addressHere }}
                    </h1>
                    <h1 v-if="this.manager_WH" class="inline-flex font-semibold lg:text-xl md:text-lg sm:text-base text-sm">
                        Trưởng điểm tập kết số {{ this.manager_WH.warehouseId + ' - ' + this.addressHere }}
                    </h1>
                    <h1 v-if="this.teller_DC.username"
                        class="inline-flex font-semibold lg:text-xl md:text-lg sm:text-base text-sm">
                        Nhân viên tại điểm giao dịch số {{ this.teller_DC.deliveryCenterId + ' - ' + this.addressHere }}
                    </h1>
                    <h1 v-if="this.staff_WH.username"
                        class="inline-flex font-semibold lg:text-xl md:text-lg sm:text-base text-sm">
                        Nhân viên tại điểm tập kết số {{ this.staff_WH.warehouseId + ' - ' + this.addressHere }}
                    </h1>

                </span>
            </div>

            <hr class="my-2 mx-auto">
            <div class="py-2 grid gird-cols-9" id="course">
                <span class="col-start-1 col-end-5 py-2">
                    <div
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm 
                         placeholder:text-gray-400 sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs hover:shadow-lg">
                        <strong>Mã người dùng:</strong> {{ this.getUserCode() }}
                    </div>
                    <br>
                    <div
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm 
                         placeholder:text-gray-400 sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs hover:shadow-lg">
                        <strong>Họ tên:</strong> {{ this.getUser().firstName + ' ' + this.getUser().lastName }}
                    </div>
                    <br>
                    <div
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm 
                         placeholder:text-gray-400 sm:text-sm sm:leading-6 md:text-base sm:text-sm text-xs hover:shadow-lg">
                        <strong>Cơ sở làm việc:</strong> {{ this.getUserOffice() }}
                    </div>

                    <br>
                </span>
                <span class="col-start-6 col-end-9 py-2">
                    <img class="w-2/4 img_ano pr-20" src="../assets/img/ano_user.jpg">
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import axios from 'axios';
export default {
    name: 'PersonalInfor',
    data() {
        return {
            addressHere: '',

        }
    },
    methods: {
        ...mapMutations(['scrollToTop', 'setLogged', 'setLeadership', 'setLeadershipAccessToken',
            'setLeadershipRefreshToken', 'setManagerDC', 'setDCManagerAccessToken', 'setDCManagerRefreshToken',
            'setManagerWH', 'setWHManagerAccessToken', 'setWHManagerRefreshToken', 'setTellerDC', 'setTellerDCAccessToken',
            'setTellerDCRefreshToken', 'setStaffWH', 'setStaffWHAccessToken', 'setStaffWHRefreshToken']),
        getUser() {
            if (this.leadership) {
                return this.leadership;
            } else if (this.manager_DC) {
                return this.manager_DC
            } else if (this.manager_WH) {
                return this.manager_WH
            } else if (this.teller_DC.accountId) {
                return this.teller_DC
            } else if (this.staff_WH.accountId) {
                return this.staff_WH
            }
        },
        getUserCode() {
            if (this.leadership) {
                return "TYP_" + this.leadership.accountTypeId + "_LD_" + this.leadership.acocuntId;
            } else if (this.manager_DC) {
                return "TYP_" + this.manager_DC.accountTypeId + "_MDC_" + this.manager_DC.deliveryCenterId;
            } else if (this.manager_WH) {
                return "TYP_" + this.manager_WH.accountTypeId + "_MWH_" + this.manager_WH.warehouseId;
            } else if (this.teller_DC.accountId) {
                return "TYP_" + this.teller_DC.accountTypeId + "_TEL_" + this.teller_DC.accountId;
            } else if (this.staff_WH.accountId) {
                return "TYP_" + this.staff_WH.accountTypeId + "_STAWH_" + this.staff_WH.acocuntId;
            }
        },
        getUserOffice() {
            if (this.leadership) {
                return "Tổng công ty Magic Post";
            } else if (this.manager_DC) {
                return "Điểm giao dịch số " + this.manager_DC.deliveryCenterId + ", " + this.addressHere;
            } else if (this.manager_WH) {
                return "Điểm tập kết số " + this.manager_WH.warehouseId + ", " + this.addressHere;
            } else if (this.teller_DC.accountId) {
                return "Điểm giao dịch số " + this.teller_DC.deliveryCenterId + ", " + this.addressHere;
            } else if (this.staff_WH.accountId) {
                return "Điểm tập kết số " + this.staff_WH.warehouseId + ", " + this.addressHere;
            }
        },
        async refreshToken() {
            let rftoken, acctoken
            if (this.leadership) {
                rftoken = this.leadershipToken.refreshToken;
                acctoken = this.leadershipToken.accessToken
            } else if (this.manager_DC) {
                rftoken = this.managerDCToken.refreshToken
                acctoken = this.managerDCToken.accessToken
            } else if (this.manager_WH) {
                rftoken = this.managerWHToken.refreshToken
                acctoken = this.managerWHToken.accessToken
            } else if (this.teller_DC.accountId) {
                rftoken = this.tellerDCToken.refreshToken
                acctoken = this.tellerDCToken.accessToken
            } else if (this.staff_WH.accountId) {
                rftoken = this.staffWHToken.refreshToken
                acctoken = this.staffWHToken.accessToken
            }
            let res = await axios.post('/refresh', {
                refreshToken: rftoken,
                withCredentials: true
            }, {
                headers:
                {
                    'x_authorization': `${acctoken}`,
                }, withCredentials: true
            });

            if (this.leadership) {
                this.setLeadershipAccessToken(res.data)
            } else if (this.manager_DC) {
                this.setDCManagerAccessToken(res.data)
            } else if (this.manager_WH) {
                this.setWHManagerAccessToken(res.data)
            } else if (this.teller_DC.accountId) {
                this.setTellerDCAccessToken(res.data)
            } else if (this.staff_WH.accountId) {
                this.setStaffWHAccessToken(res.data)
            }
        },
        async getDeliveryCenterHere() {
            try {
                let id = 0, acctoken;
                if (this.manager_DC) {
                    id = this.manager_DC.deliveryCenterId
                    acctoken = this.managerDCToken.accessToken
                } else if (this.teller_DC.username) {
                    id = this.teller_DC.deliveryCenterId
                    acctoken = this.tellerDCToken.accessToken
                }
                if (id > 0) {
                    let res = await axios.get(`/deliveryCentersHere/${id}`, {
                        headers: { "Authorization": `Bearer ${acctoken}` }
                    }, { withCredentials: true });
                    if (res.data) {
                        this.addressHere = res.data[0].address;
                        // alert(this.addressHere)
                    }
                }
            } catch (err) {
                if (err.response.data.error == 'jwt expired') {
                    await this.refreshToken();
                    await this.getDeliveryCenterHere();
                } else { alert(err.response.data.error); }
            }
        },
        async getWarehouseHere() {
            try {
                let id = 0, acctoken;
                if (this.manager_WH) {
                    id = this.manager_WH.warehouseId
                    acctoken = this.managerWHToken.accessToken
                } else if (this.staff_WH.username) {
                    id = this.staff_WH.warehouseId
                    acctoken = this.staffWHToken.accessToken
                }
                if (id > 0) {
                    let res = await axios.get(`/warehouseHere/${id}`, {
                        headers: { "Authorization": `Bearer ${acctoken}` }
                    }, { withCredentials: true });
                    if (res.data) {
                        this.addressHere = res.data[0].address;
                    }
                }
            } catch (err) {
                if (err.response && err.response.data && err.response.data.error === 'jwt expired') {
                    await this.refreshToken();
                    await this.getWarehouseHere();
                } else {
                    // Handle other errors or log them
                    console.error(err);
                    alert(err.response ? err.response.data.error : 'ddd');
                }
            }
        },
    },
    computed: {
        ...mapState(['isLogin', 'leadership', 'leadershipToken', 'manager_DC', 'managerDCToken', 'manager_WH', 'managerWHToken',
            'staff_WH', 'staffWHToken', 'teller_DC', 'tellerDCToken']),
    },
    created() {
        this.getDeliveryCenterHere();
        this.getWarehouseHere();
    }
}
</script>
<style lang="scss">
iframe {
    margin-bottom: 200px;
}

.img_ano {
    float: right
}
</style>