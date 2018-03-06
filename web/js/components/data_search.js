!function(w){

  function Datasearch(obj){
    this.url     = obj['url']    // 接口地址
    this.domid     = obj['domid']
    this.data    = obj['data'] || {offset:0}
    this.maindata= null

    this.titile =   obj['titile']
    this.datakey =   obj['datakey']

    this.page    = 1
    this.ispage  = obj.ispage || true
    this.isstatus = obj.isstatus || null
    this.init()
  }



}(window)
