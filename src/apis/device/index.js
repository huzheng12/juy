import {
    request as axios
} from "@/utils/request/index.js";

export function getList(data) {
    return axios.request({
        url: '/device/list',
        method: 'get',
        params: data
    })
}

export function onAdd(data) {
    return axios.request({
        url: '/device/addDeviceInfo',
        method: 'post',
        data: data
    })
}

export function onDelete(ids) {
    return axios.request({
        url: '/device/remove',
        method: 'post',
        data: ids
    })
}

export function onCancelBind(data) {
    return axios.request({
        url: '/device/unBindAgent',
        method: 'post',
        data: data
    })
}

export function onBindAgent(data) {
    return axios.request({
        url: '/device/bindAgent',
        method: 'post',
        data: data
    })
}