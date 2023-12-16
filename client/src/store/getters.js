export default {
  //addition in here
  getLogged(state) {
    return state.isLogin;
  },
  getLeadership(state) {
    return state.leadership;
  },
  //addition in here
  getManagerDC(state) {
    return state.manager_DC;
  },
  getManagerWH(state) {
    return state.manager_WH;
  },
  getTellerDC(state) {
    return state.teller_DC;
  },
  getStaffWH(state) {
    return state.staff_WH;
  },
}