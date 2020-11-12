const permission = {
  state: {
    roles: [],
    agentId: ""
  },
  mutations: {
    SET_ROLES(state, data) {
      state.roles = data
    },
    SET_AGENTID(state, data) {
      state.agentId = data
    },
  },
  actions: {
    setRoles({ commit }, data) {
      commit('SET_ROLES', data)
    },
    setAgentId({ commit }, data) {
      commit('SET_AGENTID', data)
    },
  }
}

export default permission
