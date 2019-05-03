<template>
     <div class="container">
      <div class="checkout-addr">
        <!-- process step -->
        <div class="check-step">
          <ul>
            <li :class="{'cur':process=='address'}">地址确认</li>
            <li :class="{'cur':process=='paying'}">支付</li>
            <li :class="{'cur':process=='paid'}">支付成功</li>
          </ul>
        </div>

        <!-- address list -->
        <div class="checkout-title">
          <span v-if="isAddress==true">配送地址</span><span v-else-if="isPaying==true">支付</span>
        </div>
        <div class="addr-list-wrap" v-show="isAddress==true">
          <div class="addr-list">
            <ul>
              <li v-for="(item,index) in filterAddress" :key="index" :class="{'check':index==currentIndex}" @click="currentIndex=index">
                <dl>
                  <dt>{{item.userName}}</dt>
                  <dd class="address">{{item.streetName}}</dd>
                  <dd class="tel">{{item.tel}}</dd>
                </dl>
                <div class="addr-opration addr-edit">
                  <a href="javascript:;" class="addr-edit-btn">
                    <svg class="icon icon-edit"><use xlink:href="#icon-edit"></use></svg>
                  </a>
                </div>
                <div class="addr-opration addr-del">
                  <a href="javascript:;" class="addr-del-btn">
                    <svg class="icon icon-del"><use xlink:href="#icon-del"></use></svg>
                  </a>
                </div>
                <div class="addr-opration addr-set-default" v-if="!item.isDefault">
                  <a href="javascript:;" class="addr-set-default-btn" @click="setDefault(item.addressId)"><i>设为默认</i></a>
                </div>
                <div class="addr-opration addr-default" v-if="item.isDefault">默认地址</div>
              </li>

              <li class="addr-new">
                <div class="add-new-inner" @click="isNewAddress=true">
                  <i class="icon-add">
                    <svg class="icon icon-add"><use xlink:href="#icon-add"></use></svg>
                  </i>
                  <p >添加新地址</p>
                </div>
              </li>
            </ul>
          </div>
          <el-dialog title="收货地址" :visible.sync="isNewAddress" width="40%" center>
              <el-form :model="form" :rules="rules" ref="form">
                  <el-form-item label="收件人" :label-width="formLabelWidth" prop="name">
                      <el-input v-model="form.name" auto-complete="off" style="width:300px"></el-input>
                  </el-form-item>
                  <el-form-item label="收件地址" :label-width="formLabelWidth" prop="address1">
                      <el-cascader
                      expand-trigger="hover"
                      :options="options"
                      v-model="form.address1"
                      @change="handleChange"
                      style="width:300px">
                      </el-cascader>
                  </el-form-item>
                  <el-form-item label="详细地址" :label-width="formLabelWidth" prop="address2">
                      <el-input v-model="form.address2" auto-complete="off" style="width:300px"></el-input>
                  </el-form-item>
                  <el-form-item label="联系电话" :label-width="formLabelWidth" prop="tel">
                      <el-input v-model="form.tel" auto-complete="off" style="width:300px"></el-input>
                  </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                  <el-button @click="isNewAddress = false">取 消</el-button>
                  <el-button type="primary" @click="newAddress">确 定</el-button>
              </div>
          </el-dialog>
          <div class="shipping-addr-more">
            <a class="addr-more-btn up-down-btn" href="javascript:" @click="changeFilter">
              more
              <i class="i-up-down">
                <i class="i-up-down-l"></i>
                <i class="i-up-down-r"></i>
              </i>
            </a>
          </div>
        </div>

        <!-- shipping method-->
        <div class="checkout-title" v-show="isAddress==true">
          <span>配送方式</span>
        </div>
        <div class="shipping-method-wrap" v-show="isAddress==true">
          <div class="shipping-method">
            <ul>
              <li :class="{'check':shippingMethod==1}" @click="shippingMethod=1">
                <div class="name">标准配送</div>
                <div class="price">Free</div>
              </li>
              <li :class="{'check':shippingMethod==2}" @click="shippingMethod=2">
                <div class="name">高级配送</div>
                <div class="price">180</div>
              </li>
            </ul>
          </div>
        </div>

        <div class="next-btn-wrap" v-show="isAddress">
          <a @click="toPaying" class="btn btn--red">下一步</a>
        </div>

        <div class="md-modal modal-msg md-modal-transition" id="showModal">
          <div class="md-modal-inner">
            <div class="md-top">
              <button class="md-close">关闭</button>
            </div>
            <div class="md-content">
              <div class="confirm-tips">
                <p id="cusLanInfo">你确认删除此配送地址信息吗?</p>
              </div>
              <div class="btn-wrap col-2">
                <button class="btn btn--m" id="btnModalConfirm">Yes</button>
                <button class="btn btn--m btn--red" id="btnModalCancel">No</button>
              </div>
            </div>
          </div>
        </div>
        <div class="md-modal modal-msg md-modal-transition" id="showModalw">
          <div class="md-modal-inner">
            <div class="md-top">
              <button class="md-close">关闭</button>
            </div>
            <div class="md-content">
              <div class="confirm-tips">
                <div class="md-form-item">
                  <label class="md-form-item__label" style="width: 80px;">
                    姓名
                  </label>
                  <div class="md-form-item__content" style="margin-left: 80px;">
                    <div  class="el-input">
                      <input type="text" autocomplete="off" class="md-input__inner">
                    </div>
                  </div>
                </div>
                <div class="md-form-item">
                  <label class="md-form-item__label" style="width: 80px;">
                    地址
                  </label>
                  <div class="md-form-item__content" style="margin-left: 80px;">
                    <div  class="el-input">
                      <input type="text" autocomplete="off" class="md-input__inner">
                    </div>
                  </div>
                </div>
                <div class="md-form-item">
                  <label class="md-form-item__label" style="width: 80px;">
                    电话号码
                  </label>
                  <div class="md-form-item__content" style="margin-left: 80px;">
                    <div  class="el-input">
                      <input type="text" autocomplete="off" class="md-input__inner">
                    </div>
                  </div>
                </div>
              </div>
              <div class="btn-wrap col-2">
                <button class="btn btn--s" id="btnModalConfirms">保存</button>
                <button class="btn btn--s btn--red" id="btnModalCancels">取消</button>
              </div>
            </div>
          </div>
        </div>
<!--         <div class="md-overlay" id="showOverLay"></div>
 -->
      </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
      return {    
        process:'address',    
        form:{
            name:'',
            address1:[],
            address2:'',
            tel:'',
        },
        rules:{
            name: [
            { required: true, message: '请填写收件人', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }],
            address1: [
            { required: true, message: '请选择地址', trigger: 'blur' }],
            address2: [
            { required: true, message: '请填写详细地址', trigger: 'blur' }],
            tel: [
            { required: true, message: '请填写联系方式', trigger: 'blur' },
            { min: 6, max: 11, message: '长度在 6 到 11 个字符', trigger: 'blur' }],
        },
        options:[{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }],
        formLabelWidth:'120px',
        currentIndex:0,
        addressList:[],
        limitNum:3,
        shippingMethod:1,
        isNewAddress:false,
        isAddress:true,
        isPaying:false
      }
    },
    created(){
        this.isAddress=true;
        this.isPaying=false;
    },
    mounted(){
        this.$nextTick(function(){
            this.getAddressList();
        });
    },
    computed:{
        filterAddress(){
            return this.addressList.slice(0,this.limitNum);
        }
    },
    methods:{

        handleChange(){
            console.log(this.form.address,"address")
        },
        newAddress(){//上传新建地址
						console.log("TCL: newAddress -> newAddress", this.form)
            //处理表单
            
            this.$refs[formName].validate(valid => {
              if (valid) {
                //发送给后端
              }
            })
            this.resetForm('form')
            
        },    
        resetForm(formName) {
          this.$refs[formName].resetFields();
          },
        getAddressList(){
            var that=this;
            axios.get("../../static/address.json").then(function(res){
                var _res= res.data;
                if(_res.status=="0"){
                    that.addressList=_res.result;
                }
            });
        },
        changeFilter(){
            var length=this.addressList.length;
            if(this.limitNum==3 && length>3){
            this.limitNum=length;
            }else if(this.limitNum==length && length>3){
            this.limitNum=3;
            }
        },
        setDefault(addressId){
            this.addressList.forEach(function(address,index){
                if(address.addressId==addressId){
                    address.isDefault=true;
                }else{
                    address.isDefault=false;
                }
            })
        },
        toPaying(){
            //进度条变化
            this.process='paying';
            this.isAddress=false;
            this.isPaying=true;
            //弹出支付框
            //返回支付状态
            //支付成功跳转支付成功页面，进度条变化
        },
    }
}
</script>
<style>@import '../css/base.css';</style>
<style>@import '../css/modal.css';</style>
<style>@import '../css/checkout.css';</style>
<style>
</style>

