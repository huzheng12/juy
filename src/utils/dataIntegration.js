/*
 * @Descripttion: 数据处理函数
 * @version: X3版本
 * @Author: 胡征
 * @Date: 2020-09-26 15:48:32
 * @LastEditors: huzheng
 * @LastEditTime: 2020-11-12 11:04:33
 */


const Fun = {
  searchData: (a, b, c, d) => {
    var data = {}
    a.map((item => {
      data[item.key] = item.input
    }))
    if (b) {
      data[c] = b.pickervalue
      data[d] = b.selectvalue
    }

    return data
  },
  searchDatas: ({
    statusname,
    startTimeName,
    endTimeName,
    pageSize,
    pageNum,
    JSON,
    _this
  }) => {
    var data = {}

    statusname = statusname || "status"
    startTimeName = startTimeName || "startDate"
    endTimeName = endTimeName || "endDate"
    pageNum = pageNum || "pageNum"
    pageSize = pageSize || "pageSize"

    data[pageNum] = _this.currentPage.current
    data[pageSize] = _this.currentPage.size
    _this.inputarr && _this.inputarr.map((item => {
      data[item.key] = item.input
    }))
    if (JSON) {
      data.JSON = 1
    }
    if (_this.selectvalue) {
      data[statusname] = _this.selectvalue.selectvalue
      data[startTimeName] = _this.selectvalue.pickervalue ? _this.selectvalue.pickervalue[0] : ""
      data[endTimeName] = _this.selectvalue.pickervalue ? _this.selectvalue.pickervalue[1] : ""

    }

    return data
  }

}
export default Fun