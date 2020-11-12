import {
    request as axios
} from "@/utils/request/index.js";

export function getList(data) {
    return axios.request({
        url: '/agentEmp/empList',
        method: 'post',
        data: data
    })
}

export function unBind(data) {
    return axios.request({
        url: '/agentEmp/empUnbind',
        method: 'post',
        data: data
    })
}