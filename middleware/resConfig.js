function routerResponse(option={}){
    return async function(ctx,next){
        ctx.success = function (status,data,msg) {
            ctx.status = status || 200
            ctx.type = option.type || 'json'
            ctx.body = {
                code : option.successCode || 0,
                msg : msg,
                data : data
            }
        }

        ctx.fail = function (status,msg,code) {
            ctx.status = status || 500
            ctx.type = option.type || 'json'
            ctx.body = {
                code : code || option.failCode || -1,
                msg : msg || option.failMsg || 'fail',
            }
            console.log(ctx.body)
        }

       await next()
    }

}

module.exports = routerResponse