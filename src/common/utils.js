/**
 * 把数组格式转换成树形（移植自之前的项目）
 * @param  {any} arr 数组
 * @param  {any} transformer 自定义返回数据的函数
 * @param  {any} openId
 * @return {object}
 */
export function tree(arr, transformer, openId) {
    if (!arr || !Array.isArray(arr)) return []
    var a, stack = [], list = {}
    arr.forEach(function (v, i) {
        var parentId = v.id.substring(0, v.id.length - 2)
        if (parentId == '') {
            a = stack
        } else {
            var parent = list[parentId]
            if (!parent) return true
            a = parent.children ? parent.children : parent.children = []
            // parent.isFolder = true

        }
        list[v.id] = v
        a.push(transformer ? transformer(v, openId) : v)
    })
    return stack
}

/**
 * 1.数据整理，添加lable是给antd的组件使用
 * 2.最后一层没有数据的children设置为null，是为了正确显示
 * @param  {Array} items
 */
export function treeTransformer(items) {

    const loop = (input) => {
        input.label = input.name
        input.value = input.id
        input.children = input.children && input.children.map(t => {
            t.label = t.name
            t.value = t.id
            if (t.children && t.children.length) {
                t = loop(t)
            } else {
                t.children = null
            }
            return t
        })
        return input
    }

    const data = items.map(d => loop(d))

    return data
}


/**
 * 判断两个对象是否相等
 * @param  {any} a
 * @param  {any} b
 * @return boolean
 */
export function isEqual(a, b) {
    return JSON.stringify(a) === JSON.stringify(b)
}

/**
 * object to list 主要是把旧版的数据结构转换为select列表的数据结构
 * key:value => {title:value,value:key}
 * @param  {any} o
 */
export function toList(o) {
    let result = []
    for (let item in o) {
        item !== '_value' && result.push({ title: o[item], value: item })
    }
    return result
}

const numberReg = /^\d*(\,|\.)?\d+$/

/**
 * 验证是否是数字 可以是小数点 不是必填
 * @param  {any} rule
 * @param  {any} value
 * @param  {any} callback
 */
export function validatorFloat(rule, value, callback) {

    if (numberReg.test(value)) {
        callback()
    } else {
        callback(new Error('请填写有效数字'))
    }

}

/**
 * 验证是否是数字 不是必填
 * @param  {any} rule
 * @param  {any} value
 * @param  {any} callback
 */
export function validatorNumber(rule, value, callback) {
    if (value == '' || value == undefined || value == null) {
        callback()
    } else {
        numberReg.test(value) ? callback() : callback(new Error('请填写有效数字'))
    }
}

/**
 * (检查是否为数字，用法再rules写transform:toNumber)
 * 
 * @param v (description)
 * @returns (description)
 */
export function toNumber(v) {
    if (!v || !v.trim()) {
        return undefined
    }
    let num = Number(v)
    // num === ' '
    if (!isNaN(num)) {
        num = parseInt(v, 10)
    }
    return isNaN(num) ? v : num
}


/**
 * 输入文字中英文字符长度校验
 * 
 * @param value 输入内容
 * @param callback 校验回调
 * @param msg 提示信息
 * @param num 长度
 */
export function validatorContent(value, callback, msg, num) {
    if (value) {
        let textValue = value.replace(/(^\s*)|(\s*$)/g, ''), length = -1
        if (textValue) {
            length = textValue.replace(/[\u4e00-\u9fa5]/g, '**').length
            if (length > num || length < 0) {
                callback(new Error(msg + '长度不能超过' + num + '个字符!'))
            } else {
                callback()
            }
        } else {
            callback(new Error(msg + '不能为空!'))
        }
    } else {
        callback()
    }
}
