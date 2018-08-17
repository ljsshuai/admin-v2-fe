
class Mutil {
    request(param) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: param.type || 'get',
                url: param.url || '',
                dataType: param.dataType || 'json',
                data: param.data || null,
                success : res=> {
                    //数据请求成功
                    if (0 === res.status) {
                        typeof resolve === 'function' && resolve(res.data, res.msg);
                    }
                    //未登陆，强制登陆
                    else if (10 === res.status) {
                        this.doLogin();
                    } else {
                        typeof reject === 'function' && reject(res.msg, res.data);
                    }
                },
                error :err =>  {
                    typeof reject === 'function' && reject(err.statusText);
                    console.log(err)
                }
            });
        });
    }

    //跳转登陆
    doLogin() {
        window.location.href = '/login?redirect=' + decodeURIComponent(window.location.pathname);
    }
    //获取url参数
    getUrlParam(name) {
        //xxx.com?param=123&param1=456011
        let queryString = window.location.search.split('?')[1] || '',
            reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            result = queryString.match(reg);
        //result:['param=123','','123','&']
        return result ? decodeURIComponent(result[2]) : null;
    }
    successTips(successMsg)
    {
        alert(successMsg||'操作成功！');
    }
    //错误提示
    errorTips(errMsg) {
        alert(errMsg || '好像哪里不对');
    }

    setStorage(name, data) {
        let dataType = typeof data;
        //json类型
        if (dataType === 'object') {
            window.localStorage.setItem(name, JSON.stringify(data))
        }
        //基础类型
        else if (['number', 'string', 'boolean'].indexOf(dataType) >= 0) {
            window.localStorage.setItem(name, data);
        }
        else {
            alert('改类型不能用于本地存储');
        }
    }
//取出存储内容
    getStorage(name) {
        let data = window.localStorage.getItem(name);
        if (data) {
            return JSON.parse(data);
        } else {
            return '';
        }
        //删除本地存储
    }
     removeStorage(name){
            window.localStorage.removeItem(name);
        }

}
export default Mutil;
