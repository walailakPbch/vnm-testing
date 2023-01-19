import axios from 'axios'

const state = {
 employees: [],
 employee: {},
}

const mutations = {
 SET_EMPLOYEES: (state, payload) => {
  state.employees = payload
 },
 SET_EMPLOYEE: (state, payload) => {
  state.employee = payload
 },
 SET_CREATE_EMPLOYEE: (state, payload) => {
  state.employees.push(payload)
 },
}

const actions = {
 async getEmployees({ commit }) {
  const url = `http://localhost:3000/employee`
  await axios
   .get(url)
   .then((res) => {
    // const data = _.orderBy(res.data, ['createdAt'], ['desc'])
    console.log('data => ', res.data)
    commit('SET_EMPLOYEES', res.data)
   })
   .catch((error) => {
    console.log(error)
   })
 },
 async getEmployee({ commit }, id) {
  const url = `http://localhost:3000/employee/${id}`
  await axios.get(url).then((res) => {
   console.log('employee ======= ', res.data)
   commit('SET_EMPLOYEE', res.data)
  })
 },
 async createEmployee({ commit }, payload) {
  const data = {}
  console.log('data = ', payload)
  data.avatar = payload.avatar
  data.code = payload.code
  data.firstname = payload.firstname
  data.lastname = payload.lastname

  const url = `http://localhost:3000/employee`
  await axios.post(url, data).then((res) => {
   console.log('res => ', res.data.url)
   commit('SET_CREATE_EMPLOYEE', res.data)
  })
 },
 //  async updateEmployee({ commit }, payload) {
 //   const url = `http://localhost:3000/employee/` + `${payload.id}`
 //   const data = {}
 //   data.avatar = payload.avatar
 //   data.code = payload.code
 //   data.firstname = payload.firstname
 //   data.lastname = payload.lastname

 //   await axios.patch(url, data).then((res) => {
 //    console.log('update employee ++++++ ', res.data)
 //    commit('SET_CREATE_EMPLOYEE', res.data)
 //   })
 //  },
 async deleteEmployee(id) {
  // const data = {}
  // data._id = payload._id
  console.log('data = ', id)
  const url = `http://localhost:3000/employee/${id}`
  console.log('url = ', url)
  await axios.delete(url).then((res) => {
   console.log('res', res)
   this.dispatch('employee/getEmployees')
  })
 },
}

export default {
 namespaced: true,
 state,
 mutations,
 actions,
}
