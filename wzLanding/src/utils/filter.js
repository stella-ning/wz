// 定义全局指令

// 金额显示，由单位 分 转换成 ￥0.00 元
const formatPrice = value => {
  let price = parseInt(value) || 0
  return (price / 100).toFixed(2)
}

// 姓名码隐藏部分
const formatName = name => {
  if(name.length == 3){
    return name.replace(/^(.).+(.)$/g,'$1*$2')
  }else{
    return name.replace(/^(.)+.$/g,'$1*')
  }
  
}
// 手机号码隐藏部分
const formatPhone = phone => {
  return phone.replace(/^(\d{3})\d{4}(\d{4})$/,'$1****$2')
}
//电话号码分隔
const formatTel = telPhone =>{
  return telPhone.replace(/^(.{3})(.*)(.{4})$/,'$1-$2-$3')
}
export default {
  formatPrice,
  formatPhone,
  formatTel,
  formatName
}