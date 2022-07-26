import { userService } from "../../../services/user-service.js"

export default {
  state: {
    // loggedInUser: userService.getLoggedInUser(),
    user: userService.getLoggedInUser() || null,
    guest: userService.getGuest() || null,
  },
  getters: {
    loggedInUser({ user }) {
      if (!user)
        return {
          id: 111,
          username: "Guest",
          fullname: "Guest",
          imgUrl: "https://www.computerhope.com/jargon/g/guest-user.jpg",
        }
      return user
    },
    guest({ guest }) {
      return guest
    },
    // users({ users }) {
    //   return users
    // },
  },
  mutations: {
    setUser(state, { user }) {
      state.user = user
    },
    loggedOutUser(state) {
      state.user = null
    },
  },
  actions: {
    async loginUser({ commit }, { user }) {
      try {
        const setUser = await userService.setLogin(user)
        commit({ type: "setUser", user: setUser })
      } catch (err) {
        console.log("cannot set user", err)
      }
    },
    logout: async ({ commit }) => {
      try {
        await userService.setLogout()
        commit({ type: "loggedOutUser" })
      } catch (err) {
        console.log("cannot logout", err)
      }
    },
  },
}
