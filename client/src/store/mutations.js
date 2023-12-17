export default {
  scrollToTop() {
    window.scrollTo(0, 0);
  },
  setLogged(state, isLogin) {
    state.isLogin = isLogin;
  },
  setLeadership(state, matchLeadership) {
    state.leadership = matchLeadership;
  },
  setLeadershipAccessToken(state, matchLeadershipAccessToken) {
    state.leadershipToken.accessToken = matchLeadershipAccessToken;
  }, 
  setLeadershipRefreshToken(state, matchLeadershipRefreshToken) {
    state.leadershipToken.refreshToken = matchLeadershipRefreshToken;
  },
  //addition in here
  setManagerDC(state, matchManagerDC) {
    state.manager_DC = matchManagerDC;
  },
  setManagerWH(state, matchManagerWH) {
    state.manager_WH = matchManagerWH;
  },
  setTellerDC(state, matchTellerDC) {
    state.teller_DC = matchTellerDC;
  },
  setStaffWH(state, matchStaffWH) {
    state.staff_WH = matchStaffWH;
  },

}