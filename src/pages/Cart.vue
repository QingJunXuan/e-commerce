<template>
  <div class="checkout">
    <div id="app">
      <div class="container">
        <div class="cart">
          <div class="checkout-title">
            <span>购物车</span>
          </div>

          <!-- table -->
          <div class="item-list-wrap">
            <div class="cart-item">
              <div class="cart-item-head">
                <ul>
                  <li>商品信息</li>
                  <li>商品单价</li>
                  <li>商品数量</li>
                  <li>总金额</li>
                  <li>编辑</li>
                </ul>
              </div>
              <ul class="cart-item-list">
                <li v-for="(item, index1) in bookList" :key="index1">
                  <div class="cart-tab-1">
                    <div class="cart-item-check">
                      <a
                        href="javascript:void 0"
                        class="item-check-btn"
                        :class="{ check: item.checked }"
                        @click="selectedProduct(item)"
                      >
                        <i class="icon iconfont icon-xuanzhong"></i>
                      </a>
                    </div>
                    <div class="cart-item-pic">
                      <img :src="item.book.picture" alt="book" />
                    </div>
                    <div class="cart-item-title">
                      <div class="item-name">{{ item.book.name }}</div>
                    </div>
                    <!-- 
                      <div class="item-include">
                        <dl>
                          <dt>赠送:</dt>
                          <dd v-for="(part,index2) in item.parts" :key="index2" v-text="part.partsName"></dd>
                        </dl>
                      </div> -->
                  </div>
                  <div class="cart-tab-2">
                    <div class="item-price">
                      {{(item.book.nowprice * 1) | formatMoney}}                      
                    </div>
                  </div>
                  <div class="cart-tab-3">
                    <div class="item-quantity">
                      <div class="select-self select-self-open">
                        <div class="quantity">
                          <a
                            href="javascript:void 0"
                            @click="changeMoney(item, -1)"
                            >-</a
                          >
                          <input
                            type="text"
                            value="0"
                            disabled
                            v-model="item.num"
                          />
                          <a
                            href="javascript:void 0"
                            @click="changeMoney(item, 1)"
                            >+</a
                          >
                        </div>
                      </div>
                      <div class="item-stock">库存：<span>{{item.book.stock}}</span></div>
                    </div>
                  </div>
                  <div class="cart-tab-4">
                    <div class="item-price-total">
                      {{(item.book.nowprice * item.num) | formatMoney}}
                    </div>
                  </div>
                  <div class="cart-tab-5">
                    <div class="cart-item-operation">
                      <a
                        href="javascript:void 0"
                        class="item-edit-btn"
                        @click="delConfirm(item)"
                      >
                        <i class="icon iconfont icon-shanchu"></i>
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- footer -->
          <div class="cart-foot-wrap">
            <div class="cart-foot-l">
              <div class="item-all-check">
                <a href="javascript:void 0" @click="checkAll(true)">
                  <span class="item-check-btn" :class="{ check: checkAllFlag }">
                    <i class="icon iconfont icon-xuanzhong icon-xuanzhongs"></i>
                  </span>
                  <span>全选</span>&nbsp;
                </a>
              </div>
              <div class="item-all-del">
                <a
                  href="javascript:void 0"
                  class="item-del-btn"
                  @click="checkAll(false)"
                >
                  <span>取消全选</span>
                </a>
              </div>
            </div>
            <div class="cart-foot-r">
              <div class="item-total">
                支付金额:
                <span class="total-price">{{ totalMoney | formatMoney }}</span>
              </div>
              <div class="next-btn-wrap">
                <a
                  @click="selectAddress"
                  class="btn btn--red"
                  style="width: 200px"
                  >结账</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="md-modal modal-msg md-modal-transition"
        id="showModal"
        :class="{ 'md-show': delFlag }"
      >
        <div class="md-modal-inner">
          <div class="md-top">
            <button class="md-close" @click="delFlag = false">关闭</button>
          </div>
          <div class="md-content">
            <div class="confirm-tips">
              <p id="cusLanInfo">你确认删除此商品吗?</p>
            </div>
            <div class="btn-wrap col-2">
              <button
                class="btn btn--m"
                id="btnModalConfirm"
                @click="delProduct"
              >
                确认
              </button>
              <button
                class="btn btn--m btn--red"
                id="btnModalCancel"
                @click="delFlag = false"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-if="delFlag" @click="delFlag = false"></div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import store from '../store/store.js'
export default {
  data() {
    return {
      bookList: [],
      totalMoney: 0,
      checkAllFlag: false,
      delFlag: false,
      curProduct: "",
      selectedList:[],
    };
  },
  mounted() {
    this.setCart();
  },
   filters: {
    formatMoney(value) {
      return "￥" + value.toFixed(2) + "(元)";
    }
  },
  methods: {
    setCart() {//获取booklist
      this.$axios
        .get("/api/getCartInfo", {
          params: {
            userid:localStorage.getItem('userid')
          }
        })
        .then(resp => {
          console.log("TCL: setCart -> resp", resp)
          this.bookList=resp.data
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeMoney(item, way) {//某种商品-修改价格
      if (way > 0) {
        item.num++;

        this.$axios
        .post("/api/changeCart", {
            userid: localStorage.getItem('userid'),
            bookid:item.book.id,
            num: item.num
          })
        .then(resp => {
					console.log("TCL: addBook -> resp", resp)
        })
        .catch(err => {
          console.log(err);
        });

      } else {
        item.num--;
        if (item.num < 1) {
          item.num = 1;
        }else{
          //del
          this.$axios
          .post("/api/changeCart", {
            userid: localStorage.getItem('userid'),
            bookid:item.book.id,
            num: item.num
          })
        .then(resp => {
					console.log("TCL: addBook -> resp", resp)
        })
        .catch(err => {
          console.log(err);
        });
        }
      }
      this.clacTotalPrice();
    },
    selectedProduct(item) {//选定商品
      if (typeof item.checked == "undefined") {
        // Vue.set(item,"checked",true);
        this.$set(item, "checked", true);
        this.selectedList.push(item.book.id)
      } else {
        item.checked = !item.checked;
        for (var i = 0; i < this.selectedList.length; i++) { 
          if (item.book.id==this.selectedList[i]) {
            this.selectedList.splice(i,1);
            break;
            }
          } 
      }
      this.clacTotalPrice();
    },
    checkAll(flag) {//全选
      var that = this;
      this.checkAllFlag = flag;
      this.bookList.forEach(function(item, index) {
        if (typeof item.checked == "undefined") {
          that.$set(item, "checked", that.checkAllFlag);
        } else {
          item.checked = that.checkAllFlag;
        }
      });
      this.clacTotalPrice();
    },
    clacTotalPrice() {//计算总价
      var that = this;
      that.totalMoney = 0;
      this.bookList.forEach(function(item, index) {
        if (item.checked) {
          that.totalMoney += item.book.nowprice * item.num;
        }
      });
    },
    delConfirm(item) {
      this.delFlag = true;
      this.curProduct = item;
    },
    delProduct() {
      var index = this.bookList.indexOf(this.curProduct);
      this.bookList.splice(index, 1);
      this.delFlag = false;
       this.$axios
        .get("/api/deleteCart", {
          params: {
            id:this.curProduct.book.id
          }
        })
        .then(resp => {
				console.log("TCL: delProduct -> resp", resp)
        })
        .catch(err => {
          console.log(err);
        });
    },
    selectAddress() {
      if(this.selectedList.length==0){
        this.$message('请选择商品')
      }else{
      store.commit("setList",this.selectedList)
      localStorage.setItem('totalMoney',this.totalMoney)
      //跳转地址页
      this.$router.push('/address');
      }
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
input[type="text"] {
  padding: 0.5em 20px;
  border: 1px solid #bbb;
  background: white;
  width: 100px;
  text-align: center;
}
</style>

