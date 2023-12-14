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
    //addition in here
    setManagerDC(state, matchManagerDC) {
      state.manager_DC = matchManagerDC;
    },
    setManagerWH(state, matchManagerWH) {
      state.manager_WH = matchManagerWH;
    },
    setTellerDC (state, matchTellerDC) {
      state.teller_DC = matchTellerDC;
    },
    setStaffWH (state, matchStaffWH) {
      state.staff_WH = matchStaffWH;
    },
    
  }