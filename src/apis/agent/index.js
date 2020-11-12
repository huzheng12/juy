/*
 * @Descripttion: 
 * @version: X3版本
 * @Author: 胡征
 * @Date: 2020-10-09 16:23:07
 * @LastEditors: huzheng
 * @LastEditTime: 2020-11-06 09:06:04
 */
import {
  request as axios
} from "@/utils/request/index.js";

export function getList (data) {
  return axios.request({
    url: '/user/list',
    method: 'post',
    data: data
  })
}

export function onAdd (data) {
  return axios.request({
    url: '/user/add',
    method: 'post',
    data: data
  })
}

export function onEdit (data) {
  return axios.request({
    url: '/user/modify',
    method: 'post',
    data: data
  })
}

export function onDelete (ids) {
  return axios.request({
    url: '/user/remove',
    method: 'post',
    data: ids
  })
}

export function getId () {
  return axios.request({
    url: '/agentEmp/getUserId',
    method: 'post',
  })
}

export function recharge (data) {
  return axios.request({
    url: '/rechargeorder/recharge',
    method: 'post',
    data: data
  })
}
