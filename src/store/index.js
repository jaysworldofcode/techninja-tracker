import Vue from 'vue'
import Vuex from 'vuex'
import TimerSessionRepository from '../modules/repository/timer_session_repository.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sessions: [],
    view_screenshot: null,
    is_fetching_session: true,
    is_see_more_loading: false,
    user_info: {}
  },
  getters: {
    getUserToken(state) {
      return state.user_info.token;
    }
  },
  mutations: {
    setViewScreenhot(state, data){
      state.view_screenshot = data;
    },
    setUserInfo(state, data){
      state.user_info = data;
    }
  },
  actions: {
    async fetchSession({commit}, data){
      this.state.is_see_more_loading = true;
      if(!data.is_from_see_more){
        this.state.is_fetching_session = true;
      }

      if(data.query != {} && data.page == 1){
        this.state.sessions = [];
      }

      const response = await TimerSessionRepository.get(data.page, data.per_page, this.state.user_info.user.client_id, data.query, this.state.user_info.token);

      for (let i = 0; i < response.sessions.docs.length; i++) {
        this.state.sessions.push(response.sessions.docs[i]);
      }

      this.state.is_see_more_loading = false;
      this.state.is_fetching_session = false;
    }
  },
  modules: {
  }
})
