/*
 * @Descripttion: 
 * @version: X3版本
 * @Author: 胡征
 * @Date: 2020-09-24 11:34:46
 * @LastEditors: huzheng
 * @LastEditTime: 2020-11-12 14:18:55
 */
// const res = this.$api.personalhzapi.standardgoodsinfolis(data)
import { request as axios } from "@/utils/request/index.js";

export default {
  // 用户个人> 修改登录密码
  changePassword: (data) => {
    return axios.request({
      url: '/user/modifypwd',
      method: 'post',
      data
    })
  },
  standardgoodsinfolis: (data) => {
    // 条件查询列表
    return axios.request({
      url: '/standardgoodsinfo/list',
      method: 'post',
      data
    })
  },
  standardgoodsinfo: (id) => {
    // 删除商品
    return axios.request({
      url: `/standardgoodsinfo/${id}`,
      method: 'delete',
    })
  },
  standardgoodsinfoput: (id) => {
    // 上架商品
    return axios.request({
      url: `/standardgoodsinfo/put/${id}`,
      method: 'post',
    })
  },
  standardgoodsinfopull: (id) => {
    //下架商品
    return axios.request({
      url: `/standardgoodsinfo/pull/${id}`,
      method: 'post',
    })
  },
  standardgoodsinfomodify: (data) => {
    //修改
    return axios.request({
      url: `standardgoodsinfo/updateGoodsInfo`,
      method: 'post',
      data
    })
  },
  standardgoodsinfoadd: (data) => {
    //新增
    return axios.request({
      url: `/standardgoodsinfo/add`,
      method: 'post',
      data
    })
  },
  rechargeorderlist: (data) => {
    //资金充值记录列表
    return axios.request({
      url: `/rechargeorder/list`,
      method: 'get',
      params: data
    })
  },
  ticketlist: (data) => {
    //运营门票列表
    return axios.request({
      url: `/operationTicket/list`,
      method: 'post',
      data
    })
  },
  ticketfindHotAmount: () => {
    //展示金额
    return axios.request({

      url: `/operationTicket/exchange`,
      method: 'post',
    })
  },
  ticketUserecordlist: (data) => {
    //门票使用记录
    return axios.request({
      url: `/ticketUserecord/list`,
      method: 'post',
      data
    })
  },
  ossupload: (data) => {
    //上传图片
    return axios.request({
      url: `/oss/upload`,
      method: 'post',
      dataType: 'json',
      data: data,
      contentType: false,
      processData: false
    })
  },
  ticketExchangeInfolist: (data) => {
    //门票兑换记录
    return axios.request({
      url: `/ticketExchangeInfo/list`,
      method: 'post',
      data
    })
  },
  operationTicketconversion: (data) => {
    //门票兑换
    return axios.request({
      url: `operationTicket/conversion`,
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      data
    })
  },
  shopGoodsPageShopByCondition: (data) => {
    //门店分页查询
    return axios.request({
      url: `/jyShops/shopList`,
      method: 'post',
      data
    })
  },
  jyShopssaveShop: (data) => {
    //新增门店
    return axios.request({
      url: `/jyShops/saveShop`,
      method: 'post',
      data
    })
  },
  shopGoodsjyShopsshopList: (data) => {
    //新增门店
    return axios.request({
      url: `/shopGoods/PageShopByCondition`,
      method: 'get',
      params: data
    })
  },
  shopGoodssaveShopGoods: (data) => {
    //新增门票
    return axios.request({
      url: `/shopGoods/saveShopGoods`,
      method: 'post',
      data: data
    })
  },
  shopGoodsdelShopGoodsById: (data) => {
    //删除商品门票
    return axios.request({
      url: `/shopGoods/delShopGoodsById`,
      method: 'post',
      data: data
    })
  },
  shopGoodsupdateShopGoodsById: (data) => {
    //修改商品门票
    return axios.request({
      url: `/shopGoods/updateShopGoodsById`,
      method: 'post',
      data: data
    })
  },
  shopGoodslistTicketInfo: (data) => {
    //全部标准商品
    return axios.request({
      url: `/shopGoods/listTicketInfo`,
      method: 'get',
      data: data
    })
  },

  jyShopsupdateGoodsInfo: (data) => {
    //修改门店信息
    return axios.request({
      url: `/jyShops/updateGoodsInfo`,
      method: 'post',
      data: data
    })
  },

  jyShopsremoveShop: (id) => {
    //删除门店
    return axios.request({
      url: `/jyShops/removeShop/${id}`,
      method: 'delete',
    })
  },
  userOrderpageOrderRecord: (data) => {
    //查询商品使用记录
    return axios.request({
      url: `/userOrder/pageOrderRecord`,
      method: 'get',
      params: data
    })
  },
  userOrderpageGivingRecord: (data) => {
    //查询商品分发记录
    return axios.request({
      url: `/userOrder/pageGivingRecord`,
      method: 'get',
      params: data
    })
  },
  shopGoodslistShopByAgentId: (data) => {
    //通过代理编号查询所有店铺
    return axios.request({
      url: `/shopGoods/listShopByAgentId`,
      method: 'get',
      params: data
    })
  },
  jyusergetUserList: (data) => {
    //用户列表o
    return axios.request({
      url: `/jy/user/getUserList`,
      method: 'get',
      params: data
    })
  },
  withdrawalManagementpageWithdrawalApplyCondition: (data) => {
    //提现管理
    return axios.request({
      url: `/withdrawalManagement/pageWithdrawalApplyCondition`,
      method: 'post',
      data: data
    })
  },
  jyShopsshopOn: (id) => {
    // 关店
    return axios.request({
      url: `/jyShops/shopOn/${id}`,
      method: 'post',
    })
  },
  jyShopsshopOff: (id) => {
    // 开店
    return axios.request({
      url: `/jyShops/shopOff/${id}`,
      method: 'post',
    })
  },
  withdrawalManagementwithdrawalApply: (data) => {
    // 申请提现
    return axios.request({
      url: `/withdrawalManagement/withdrawalApply`,
      method: 'post',
      data: data
    })
  },
  withdrawalManagementcanCashOutAmountAndColdAmount: () => {
    // 申请提现
    return axios.request({
      url: `/withdrawalManagement/canCashOutAmountAndColdAmount`,
      method: 'post',

    })
  },
  ManagementpageWithdrawalApplyCondition: (data) => {
    // 条件查询提现管理
    return axios.request({
      url: `/withdrawalManagement/pageWithdrawalApplyCondition`,
      method: 'post',
      data: data
    })
  },
  withdrawalManagementwithdrawalApplyPass: (data) => {
    // 提现管理通过
    return axios.request({
      url: `/withdrawalManagement/withdrawalApplyPass`,
      method: 'post',
      data: data
    })
  },
  withdrawalManagementwithdrawalApplyNo: (data) => {
    // 提现管理驳回
    return axios.request({
      url: `/withdrawalManagement/withdrawalApplyNo`,
      method: 'post',
      data: data
    })
  },
  ticketUserecordpageTicketById: (data) => {
    // 用户订单查询
    return axios.request({
      url: `/ticketUserecord/pageTicketById`,
      method: 'get',
      params: data
    })
  },
  ticketUserecordpageOrderByCondition: (data) => {
    // 用户订单查询
    return axios.request({
      url: `/ticketUserecord/pageOrderByCondition`,
      method: 'get',
      params: data
    })
  },
  ticketUserecordpageAgentTicketById: (data) => {
    // 用户订单查询
    return axios.request({
      url: `/ticketUserecord/pageAgentTicketById`,
      method: 'get',
      params: data
    })
  },
  withdrawalManagementcancelWithdrawal: (data) => {
    // 代理撤销退款
    return axios.request({
      url: `/withdrawalManagement/cancelWithdrawal/${data}`,
      method: 'post',

    })
  },
  userrefunduserRefundNo: (data) => {
    // 订单退款驳回
    return axios.request({
      url: `/userRefundApply/userRefundNo`,
      method: 'post',
      data: data
    })
  },
  userrefunduserRefundPass: (data) => {
    // 订单退款通过
    return axios.request({
      url: `/userRefundApply/userRefundPass`,
      method: 'post',
      data: data
    })
  },
  userRefundApplyuserRefundApply: (data) => {
    // 订单退款通过
    return axios.request({
      url: `/userRefundApply/userRefundApplyList`,
      method: 'get',
      params: data
    })
  },
  operationTicketnotUsedTicketCount: (data) => {
    // 订单退款通过
    return axios.request({
      url: `/operationTicket/notUsedTicketCount`,
      method: 'post',
      data: data
    })
  },
}




