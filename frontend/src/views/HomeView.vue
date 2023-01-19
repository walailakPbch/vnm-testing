<template>
 <div class="container">
  <div class="grid grid-row-3">
   <div class="grid justify-items-center mt-10">
    <div>
     <h1 class="text-xl font-bold">ประวัติ</h1>
    </div>
    <div class="box flex justify-center my-5">
     <img :src="image" />
    </div>
    <div class="">
     <input
      @change="handleImage"
      type="file"
      accept="image/*"
      class="border-black"
     />
    </div>
   </div>
   <div class="flex justify-center">
    <div class="flex justify-evenly mt-5">
     <div class="flex justify-center items-end">
      <vs-input
       label="รหัสพนักงาน"
       v-model="employeeData.code"
       class="text-left mx-2"
      />
     </div>
     <div class="flex justify-center items-end">
      <vs-input
       label="ชื่อ"
       v-model="employeeData.firstname"
       class="text-left mx-2"
      />
     </div>
     <div class="flex justify-center items-end">
      <vs-input
       label="นามสกุล"
       v-model="employeeData.lastname"
       class="text-left mx-2"
      />
     </div>
     <div class="flex justify-center items-end">
      <vs-button
       :disabled="
        (
         employeeData.avatar ||
         employeeData.code ||
         employeeData.firstname ||
         employeeData.lastname
        ).length == 0
       "
       color="primary"
       class="mx-2"
       @click="addItem()"
      >
       เพิ่มประวัติ
      </vs-button>
     </div>
    </div>
   </div>
  </div>
  <div class="my-10 mx-40">
   <vs-table :data="searchList()">
    <template slot="header">
     <div class="m-5">
      <h1 class="font-bold text-xl">ข้อมูลพนักงาน</h1>
     </div>
     <div class="flex justify-between m-5">
      <vs-input v-model="search" class="h-10" />
      <vs-button color="primary" class="mx-2 h-10 w-20"> ค้นหา </vs-button>
     </div>
    </template>
    <template slot="thead">
     <vs-th sort-key="avatar">รูป</vs-th>
     <vs-th sort-key="code">รหัสพนักงาน</vs-th>
     <vs-th sort-key="firstname">ชื่อ</vs-th>
     <vs-th sort-key="lastname">นามสกุล</vs-th>
     <vs-th sort-key="manage"></vs-th>
    </template>

    <template slot-scope="{ data }">
     <vs-tr
      :state="indextr % 2 == 0 ? 'primary' : 'dark'"
      :key="indextr"
      v-for="(tr, indextr) in data"
     >
      <vs-td :data="data[indextr].avatar">
       <div class="flex justify-center">
        <img :src="data[indextr].avatar" alt="" />
       </div>
      </vs-td>
      <vs-td :data="data[indextr].code">
       <div class="flex justify-start">
        {{ data[indextr].code }}
       </div>
      </vs-td>

      <vs-td :data="data[indextr].firstname">
       <div class="flex justify-start">
        {{ data[indextr].firstname }}
       </div>
      </vs-td>
      <vs-td :data="data[indextr].lastname">
       <div class="flex justify-start">
        {{ data[indextr].lastname }}
       </div>
      </vs-td>
      <vs-td :data="data[indextr].manage">
       <div class="flex justify-center">
        <vs-button
         color="warning"
         class="mx-2 h-10 w-20"
         @click="selectById(data[indextr]._id)"
        >
         แก้ไข
        </vs-button>
        <vs-button
         color="danger"
         class="mx-2 h-10 w-20"
         @click="deleteItem(data[indextr]._id)"
        >
         ลบ
        </vs-button>
       </div>
      </vs-td>
     </vs-tr>
    </template>
   </vs-table>
   <vs-popup title="แก้ไขประวัติ" :active.sync="popup">
    <div class="grid justify-items-center">
     <div class="box flex justify-center my-5">
      <img :src="selectItem.avatar" />
     </div>
     <div>
      <input
       @change="handleImage"
       type="file"
       accept="image/*"
       class="border-black"
      />
     </div>
    </div>
    <div class="flex justify-center mt-5">
     <vs-input
      label="รหัสพนักงาน"
      v-model="selectItem.code"
      class="text-left mx-2"
     />
    </div>
    <div class="flex justify-center mt-5">
     <vs-input
      label="ชื่อ"
      v-model="selectItem.firstname"
      class="text-left mx-2"
     />
    </div>
    <div class="flex justify-center mt-5">
     <vs-input
      label="นามสกุล"
      v-model="selectItem.lastname"
      class="text-left mx-2"
     />
    </div>
    <div class="flex justify-center my-5">
     <vs-button
      color="primary"
      class="mx-2 h-10 w-1/2"
      @click="editSubmit(selectItem._id)"
     >
      แก้ไขประวัติ
     </vs-button>
    </div>
   </vs-popup>
  </div>
 </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
export default {
 name: 'HomeView',
 data() {
  return {
   employeeData: {
    avatar: '',
    code: '',
    firstname: '',
    lastname: '',
   },
   selectItem: {},
   popup: false,
   search: '',
   idCardImage: '',
   idCardImageFile: '',
   image: '',
  }
 },
 mounted() {
  this.$store.dispatch('employee/getEmployees')
 },
 computed: {
  ...mapState({
   employees: (state) => state.employee.employees,
   employeeById: (state) => state.employee.employee,
  }),
 },
 methods: {
  searchList() {
   //  console.log('e =', this.employees)
   return this.employees.filter((item) => {
    return (
     item.code.toLowerCase().includes(this.search.toLowerCase()) ||
     item.firstname.toLowerCase().includes(this.search.toLowerCase()) ||
     item.lastname.toLowerCase().includes(this.search.toLowerCase())
    )
   })
  },
  handleImage(e) {
   const selectedImage = e.target.files[0] // get first file
   this.createBase64Image(selectedImage)
  },
  createBase64Image(fileObject) {
   const reader = new FileReader()
   reader.onload = (e) => {
    this.image = e.target.result
    //  this.remoteUrl = this.image
    this.employeeData.avatar = this.image
   }
   reader.readAsDataURL(fileObject)
  },
  // uploadImage() {
  //  const { image } = this
  //  axios
  //   .post('http://localhost:3000/employee', { image })
  //   .then((response) => {
  //    //  this.remoteUrl = response.data.url
  //   })
  //   .catch((err) => {
  //    return new Error(err.message)
  //   })
  // },

  addItem() {
   let payload = {
    ...this.employeeData,
   }
   console.log('payload => ', payload)
   this.$store.dispatch('employee/createEmployee', payload).then(() => {
    this.employeeData = {
     avatar: '',
     code: '',
     firstname: '',
     lastname: '',
    }
   })
   this.image = ''
  },
  selectById(id) {
   this.$store.dispatch('employee/getEmployee', id).then(() => {
    this.popup = true
    this.selectItem = this.employeeById
    console.log('dddd => ', this.selectItem)
   })
  },
  async editSubmit(id) {
   const data = {}
   //  data.avatar = const { image } = this
   data.code = this.selectItem.code
   data.avatar = this.selectItem.avatar
   data.firstname = this.selectItem.firstname
   data.lastname = this.selectItem.lastname
   const url = `http://localhost:3000/employee/${id}`
   await axios.patch(url, data).then((res) => {
    console.log('update employee ++++++ ', res.data)
    this.popup = false
    this.$store.dispatch('employee/getEmployees')
    // commit('SET_CREATE_EMPLOYEE', res.data)
   })
  },
  async deleteItem(id) {
   //  console.log(id)
   //  this.$store.dispatch('employee/deleteEmployee', id)
   const url = `http://localhost:3000/employee/${id}`
   // console.log('url = ', url)
   await axios.delete(url).then((res) => {
    console.log('res', res)
    this.$store.dispatch('employee/getEmployees')
   })
  },
 },
}
</script>
<style scoped>
vs-th,
vs-td {
 width: 20%;
}
img {
 height: 100px;
}

.box {
 padding: 10px;
 width: 200px;
 height: 150px;
 border-style: dotted;
 border-color: black;
 border-width: 1px;
}
/* 
.img-show {
 padding: 10px;
 max-width: 200px;
 max-height: 100px;
} */
</style>
