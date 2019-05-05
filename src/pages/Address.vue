<template>
  <div class="container">
    <div class="checkout-addr">
      <!-- process step -->
      <div class="check-step">
        <ul>
          <li :class="{ cur: process == 'address' }">地址确认</li>
          <li :class="{ cur: process == 'paying' }">支付</li>
          <li :class="{ cur: process == 'paid' }">支付成功</li>
        </ul>
      </div>

      <!-- address list -->
      <div class="checkout-title">
        <span v-if="isAddress == true">配送地址</span
        ><span v-else-if="isPaying == true">支付</span>
      </div>
      <div class="addr-list-wrap" v-show="isAddress == true">
        <div class="addr-list">
          <ul>
            <li
              v-for="(item, index) in filterAddress"
              :key="index"
              :class="{ check: item.id == currentIndex }"
              @click="currentIndex = item.id"
            >
              <dl>
                <dt>{{ item.name }}</dt>
                <dd class="address">{{ item.province+'/'+item.city+'/'+item.district}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.detail}}</dd>
                <dd class="tel">{{ item.phone }}</dd>
              </dl>
              <div class="addr-opration addr-edit">
                <a href="javascript:;" class="addr-edit-btn">
                  <svg class="icon icon-edit">
                    <use xlink:href="#icon-edit"></use>
                  </svg>
                </a>
              </div>
              <div class="addr-opration addr-del">
                <a href="javascript:;" class="addr-del-btn">
                  <svg class="icon icon-del">
                    <use xlink:href="#icon-del"></use>
                  </svg>
                </a>
              </div>
              <div
                class="addr-opration addr-set-default"
              >
                <a
                  href="javascript:;"
                  class="addr-set-default-btn"
                  @click="delCheck(item,index)"
                  ><i>删除</i></a>
                  <a
                  href="javascript:;"
                  class="addr-set-default-btn"
                  @click="editCheck(item,index)"
                  ><i>编辑</i></a>
              </div>
             <!--  <div class="addr-opration addr-default" v-if="item.isDefault">
                默认地址
              </div> -->
            </li>

            <li class="addr-new">
              <div class="add-new-inner" @click="newFlag = true">
                <i class="icon-add">
                  <svg class="icon icon-add">
                    <use xlink:href="#icon-add"></use>
                  </svg>
                </i>
                <p>添加新地址</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="shipping-addr-more">
          <a
            class="addr-more-btn up-down-btn"
            href="javascript:"
            @click="changeFilter"
          >
            more
            <i class="i-up-down">
              <i class="i-up-down-l"></i>
              <i class="i-up-down-r"></i>
            </i>
          </a>
        </div>
      </div>

      <!-- shipping method-->
      <div class="checkout-title" v-show="isAddress == true">
        <span>配送方式</span>
      </div>
      <div class="shipping-method-wrap" v-show="isAddress == true">
        <div class="shipping-method">
          <ul>
            <li
              :class="{ check: shippingMethod == 1 }"
              @click="shippingMethod = 1"
            >
              <div class="name">标准配送</div>
              <div class="price">Free</div>
            </li>
            <li
              :class="{ check: shippingMethod == 2 }"
              @click="shippingMethod = 2"
            >
              <div class="name">高级配送</div>
              <div class="price">180</div>
            </li>
          </ul>
        </div>
      </div>

      <div class="next-btn-wrap" v-show="isAddress">
        <a @click="toPaying" class="btn btn--red">下一步</a>
      </div>
      <div class="next-btn-wrap" v-show="isPaying">
        <a @click="addOrder" class="btn btn--red">支付成功</a>
      </div>
      
        <el-dialog
          title="收货地址"
          :visible.sync="newFlag"
          width="30%"
          center
        >
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item
              label="收件人"
              :label-width="formLabelWidth"
              prop="name"
            >
              <el-input
                v-model="form.name"
                auto-complete="off"
                style="width:300px"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="收件地址"
              :label-width="formLabelWidth"
              prop="address1"
            >
              <el-cascader
                expand-trigger="hover"
                :options="options"
                :props="props"
                v-model="form.address1"
                @change="handleChange"
                style="width:300px"
              >
              </el-cascader>
            </el-form-item>
            <el-form-item
              label="详细地址"
              :label-width="formLabelWidth"
              prop="address2"
            >
              <el-input
                v-model="form.address2"
                auto-complete="off"
                style="width:300px"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="联系电话"
              :label-width="formLabelWidth"
              prop="tel"
              @keyup.enter.native="newAddress"
            >
              <el-input
                v-model="form.tel"
                auto-complete="off"
                style="width:300px"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="newFlag = false">取 消</el-button>
            <el-button type="danger" @click="newAddress">确 定</el-button>
          </div>
        </el-dialog>
       <el-dialog
          title="确定要删除该地址吗？"
          :visible.sync="delFlag"
          width="24%"
          center
        >
          <div slot="footer" class="dialog-footer">
            <el-button @click="delFlag = false">取 消</el-button>
            <el-button type="danger" @click="delAddress">确 定</el-button>
          </div>
        </el-dialog>
        
        <el-dialog
          title="收货地址"
          :visible.sync="editFlag"
          width="30%"
          center
        >
          <el-form :model="editForm" :rules="rules" ref="editForm">
            <el-form-item
              label="收件人"
              :label-width="formLabelWidth"
              prop="name"
            >
              <el-input
                v-model="editForm.name"
                auto-complete="off"
                style="width:300px"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="收件地址"
              :label-width="formLabelWidth"
              prop="address1"
            >
              <el-cascader
                expand-trigger="hover"
                :options="options"
                :props="props"
                v-model="editForm.address1"
                @change="handleChange"
                style="width:300px"
              >
              </el-cascader>
            </el-form-item>
            <el-form-item
              label="详细地址"
              :label-width="formLabelWidth"
              prop="address2"
            >
              <el-input
                v-model="editForm.address2"
                auto-complete="off"
                style="width:300px"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="联系电话"
              :label-width="formLabelWidth"
              prop="tel"
              @keyup.enter.native="editAddress"
            >
              <el-input
                v-model="editForm.tel"
                auto-complete="off"
                style="width:300px"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="editFlag = false">取 消</el-button>
            <el-button type="danger" @click="editAddress">确 定</el-button>
          </div>
        </el-dialog>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import option from '../../static/address.json'
import store from '../store/store.js'
export default {
  data() {
    return {
      process: "address",
      form: {
        name: "",
        address1: [],
        address2: "",
        tel: ""
      },
      editForm:{
        id:1,
        name: "",
        address1: [],
        address2: "",
        tel: ""
      },
      rules: {
        name: [
          { required: true, message: "请填写收件人", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        address1: [{ required: true, message: "请选择地址", trigger: "blur" }],
        address2: [
          { required: true, message: "请填写详细地址", trigger: "blur" }
        ],
        tel: [
          { required: true, message: "请填写联系方式", trigger: "blur" },
          { min: 6, max: 11, message: "长度在 6 到 11 个字符", trigger: "blur" }
        ]
      },
      options:option,
      props: {
          value: 'name',
          label:'name',
          children: 'city'
      },
      formLabelWidth: "120px",
      currentIndex: 0,
      addressList: [],
      limitNum: 3,
      shippingMethod: 1,
      isAddress: true,
      isPaying: false,
      newFlag: false,
      delFlag:false,
      editFlag:false,
      delete:{},
      deleteIndex:0,
      editIndex:0,
      carts:[],
    };
  },
  created() {
    this.isAddress = true;
    this.isPaying = false;
    console.log(this.options,"options")
  },
  mounted() {
    this.$nextTick(function() {
      this.getAddressList();
    });
  },
  computed: {
    filterAddress() {
      return this.addressList.slice(0, this.limitNum);
    }
  },
  methods: {
    handleChange() {
      console.log(this.form.address1, "address");
    },
    newAddress() {//上传新建地址
      this.$refs.form.validate(valid => {
        if (valid) {
          //发送给后端
          var params={
            userid:localStorage.getItem('userid'),
            name:this.form.name,
            phone:this.form.tel,
            province:this.form.address1[0],
            city:this.form.address1[1],
            district:this.form.address1[2],
            detail:this.form.address2
          }
          this.addressList.push(params)

          this.$axios.post("/api/addAddress", params)
        .then(resp => {
          this.newFlag=false
        })
        .catch(err => {
          console.log(err);
        });
        }
      });
      this.resetForm("form");
    },
    delCheck(item,index){
      this.delFlag=true
      this.delete=item
      this.deleteIndex=index
    },
    delAddress(){
      console.log('deladdress')
      this.delFlag = false
      this.$axios
        .get("/api/deleteAddress", {
          params: {
            id: this.delete.id
          }
        })
        .then(resp => {
          console.log("TCL: delAddress -> resp", resp)
          this.addressList.splice(this.deleteIndex,1)
        })
        .catch(err => {
          console.log(err);
        });
    },
    editCheck(item,index){
      this.editFlag=true
      this.editIndex=index

      this.editForm.id=item.id
      this.editForm.name=item.name
      this.editForm.address1[0]=item.province
      this.editForm.address1[1]=item.city
      this.editForm.address1[2]=item.district
      this.editForm.address2=item.detail
      this.editForm.tel=item.phone
    },
    editAddress(){
      this.editFlag=false
      this.$refs.editForm.validate(valid => {
        if (valid) {
          var params={
            id:this.editForm.id,
            userid:localStorage.getItem('userid'),
            name:this.editForm.name,
            phone:this.editForm.tel,
            province:this.editForm.address1[0],
            city:this.editForm.address1[1],
            district:this.editForm.address1[2],
            detail:this.editForm.address2
        }
        this.addressList.splice(this.editIndex,1,params)
				console.log("TCL: editAddress -> addressList", this.addressList)
        
          //发送给后端
          this.$axios.post("/api/updateAddress", params)
        .then(resp => {
          console.log("TCL: updateAddress -> resp", resp)
        })
        .catch(err => {
          console.log(err);
        });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getAddressList() {//获取地址list
      this.$axios
        .get("/api/getAddressByUser", {
          params: {
            userid: localStorage.getItem("userid")
          }
        })
        .then(resp => {
          console.log("TCL: getAddressList -> resp", resp);

          this.addressList = resp.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeFilter() {//more-nomore
      var length = this.addressList.length;
      if (this.limitNum == 3 && length > 3) {
        this.limitNum = length;
      } else if (this.limitNum == length && length > 3) {
        this.limitNum = 3;
      }
    },
    setDefault(addressId) {
      this.addressList.forEach(function(address, index) {
        if (address.addressId == addressId) {
          address.isDefault = true;
        } else {
          address.isDefault = false;
        }
      });
    },
    toPaying() {
      //进度条变化
      this.process = "paying";
      this.isAddress = false;
      this.isPaying = true;
    },
    addOrder(){//下单
      //this.carts.push(localStorage.getItem('selectedList'))
			//console.log("TCL: addOrder -> carts", this.carts)
      console.log("TCL: addOrder -> store.state.selectedList", store.state.selectedList)
     /*  this.$axios
        .post("/api/generateOrder",{
            userid: localStorage.getItem('userid'),
            addressid:this.currentIndex,
            carts:[181],
            price:localStorage.getItem('totalMoney')
        })
        .then(resp => {
        console.log("TCL: addOrder -> resp", resp)
        //this.$router.push('/cart')
        })
        .catch(err => {
          console.log(err);
        });  */
     }
  }
};
</script>
<style>
@import "../css/base.css";
</style>
<style>
@import "../css/modal.css";
</style>
<style>
@import "../css/checkout.css";
</style>
<style>
</style>

