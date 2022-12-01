import Vue from 'vue'
import Vuex from 'vuex'
import TimerSessionRepository from '../modules/repository/timer_session_repository.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    api_url: 'http://localhost:3000/',
    sessions: [],
    view_screenshot: null,
    is_fetching_session: true,
    is_see_more_loading: false
  },
  getters: {
  },
  mutations: {
    setViewScreenhot(state, data){
      state.view_screenshot = data;
    },
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

      const response = await TimerSessionRepository.get(data.page, data.per_page, 1, data.query);

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
