<template>
 <div class="container">
  <div class="grid grid-row-3">
   <div class="grid justify-items-center mt-10">
    <div>
     <h1 class="text-xl font-bold">ประวัติพนักงาน</h1>
    </div>
   </div>
  </div>
  <div class="my-10 mx-40">
   <vs-table :data="searchList()" class="border">
    <template slot="header">
     <div class="m-5">
      <h1 class="font-bold text-xl">ข้อมูลพนักงาน</h1>
     </div>
     <div class="flex justify-between items-center m-5">
      <vs-input v-model="search" />
      <!-- <vs-button color="primary" class="mx-2 h-10 w-20"> ค้นหา </vs-button> -->
      <vs-button color="primary" class="mx-2 w-30" @click="addPopup = true">
       เพิ่มประวัติ
      </vs-button>
     </div>
    </template>
    <template slot="thead">
     <vs-th class="w-48 h-16 bg-gray-800 text-white" sort-key="avatar">
      <div class="font-sans text-lg flex justify-center w-full">รูป</div>
     </vs-th>
     <vs-th class="w-48 h-16 bg-gray-800 text-white" sort-key="code">
      <div class="font-sans text-lg flex justify-center w-full">
       รหัสพนักงาน
      </div>
     </vs-th>
     <vs-th class="w-48 h-16 bg-gray-800 text-white" sort-key="firstname">
      <div class="font-sans text-lg flex justify-center w-full">ชื่อ</div>
     </vs-th>
     <vs-th class="w-48 h-16 bg-gray-800 text-white" sort-key="lastname">
      <div class="font-sans text-lg flex justify-center w-full">นามสกุล</div>
     </vs-th>
     <vs-th class="w-48 h-16 bg-gray-800 text-white" sort-key="manage">
      <div class="font-sans text-lg flex justify-center w-full">จัดการ</div>
     </vs-th>
    </template>

    <template slot-scope="{ data }">
     <vs-tr :key="indextr" v-for="(tr, indextr) in data">
      <vs-td :data="data[indextr].avatar">
       <div class="flex justify-center">
        <img :src="data[indextr].avatar" alt="" />
       </div>
      </vs-td>
      <vs-td :data="data[indextr].code">
       <div class="flex justify-center">
        {{ data[indextr].code }}
       </div>
      </vs-td>

      <vs-td :data="data[indextr].firstname">
       <div class="flex justify-center">
        {{ data[indextr].firstname }}
       </div>
      </vs-td>
      <vs-td :data="data[indextr].lastname">
       <div class="flex justify-center">
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

   <!---- Add Popup ---->
   <vs-popup title="เพิ่มประวัติพนักงาน" :active.sync="addPopup">
    <div class="grid justify-items-center">
     <div class="box flex justify-center items-center my-5">
      <img class="imgImport" :src="employeeData.avatar" />
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
      v-model="employeeData.code"
      class="text-left mx-2"
     />
    </div>
    <div class="flex justify-center mt-5">
     <vs-input
      label="ชื่อ"
      v-model="employeeData.firstname"
      class="text-left mx-2"
     />
    </div>
    <div class="flex justify-center mt-5">
     <vs-input
      label="นามสกุล"
      v-model="employeeData.lastname"
      class="text-left mx-2"
     />
    </div>
    <div class="flex justify-center my-5">
     <vs-button color="primary" class="mx-2 h-10 w-1/2" @click="addItem()">
      บันทึก
     </vs-button>
    </div>
   </vs-popup>

   <!--- Edit Popup ---->
   <vs-popup title="แก้ไขประวัติพนักงาน" :active.sync="editPopup">
    <div class="grid justify-items-center">
     <div class="box flex justify-center items-center my-5">
      <img class="imgImport" :src="selectItem.avatar" />
     </div>
     <div>
      <input
       @change="handleImage2"
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
      บันทึก
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
   addPopup: false,
   editPopup: false,
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
    this.employeeData.avatar = this.image
   }
   reader.readAsDataURL(fileObject)
  },
  handleImage2(e) {
   const selectedImage = e.target.files[0] // get first file
   this.createBase64Image2(selectedImage)
  },
  createBase64Image2(fileObject) {
   const reader = new FileReader()
   reader.onload = (e) => {
    this.selectItem.avatar = e.target.result
   }
   reader.readAsDataURL(fileObject)
  },

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
   this.addPopup = false
  },
  selectById(id) {
   this.$store.dispatch('employee/getEmployee', id).then(() => {
    this.editPopup = true
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
    this.editPopup = false
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
 height: 50px;
}
.imgImport {
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
