import Vue from 'vue'
import Vuex from 'vuex'
import http from "../http-common";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    customerList: [],
    selectedCustomer: {}
  },
  getters: {
    getCustomerListState(state) {
      return state.customerList
    },
    getCustomerSelectedCustomer(state) {
      return state.selectedCustomer
    }
  },
  mutations: {
    UPDATE_CUSTOMER_LIST(state, payload) {
      payload.forEach(el => {
        el.gender = el.gender == 'M' ? "Male" : "Female"
      });

      state.customerList = payload
    },
    UPDATE_SELECTED_CUSTOMER(state, payload) {
      state.selectedCustomer = payload
    },
  },
  actions: {
    getCustomerList(context, payload) {
      return new Promise((resolve, reject) => {
        http.get("/list").then(res => {
          console.log("getCustomerList", res.data.data);
          context.commit('UPDATE_CUSTOMER_LIST', res.data.data)
          resolve()
        }).catch(err => {
          console.error(err);
        })
      })
    },
    getCustomerDetail(context, payload) {
      return new Promise((resolve, reject) => {
        http.get("/detail", { params: { id: payload.id } }).then(res => {
          console.log("getCustomerDetail ", res.data.data);
          context.commit('UPDATE_SELECTED_CUSTOMER', res.data.data)
          resolve()
        }).catch(err => {
          console.error(err);
        })
      })
    },
    addCustomerDetail(context, payload) {
      return new Promise((resolve, reject) => {
        http.post("/add", { data: payload }).then(res => {
          console.log(res.data);
          resolve(res.data)
        }).catch(err => {
          console.error(err);
        })
      })
    },
    updateCustomerDetail(context, payload) {
      return new Promise((resolve, reject) => {
        http.put("/edit", {
          data: payload
        }).then(res => {
          console.log(res.data);
          resolve(res.data)
        }).catch(err => {
          console.error(err);
        })
      })
    },
    deleteCustomerDetail(context, payload) {
      return new Promise((resolve, reject) => {
        http.post("/delete", { data: payload }).then(res => {
          console.log('deleteCustomerDetail' , res.data);
          resolve(res.data)
        }).catch(err => {
          console.error(err);
        })
      })
    },
  },
  modules: {
  }
})
