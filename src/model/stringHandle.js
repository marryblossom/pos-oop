function stringHandle(){
  var promotionResult = new promotionHandle();
  this.subtotalString = function (item, num, subTotal){
    var str = '名称：'+ item.name + '，数量：' + num + item.unit +
              '，单价：' + item.price.toFixed(2) + '(元)，小计：' + subTotal.toFixed(2) + '(元)\n';

    return str;
  };
  this.freeString = function (item,num){
    var str = '';
    var promptionTypes = promotionResult.promotionTypes(item.barcode);
    if(promptionTypes.length !== 0){
      str += '名称：' + item.name + '，数量：' + parseInt(num / 3) + item.unit;
    }
    return str;
  };
  this.totalString = function (total,free){
    return '总计：' + total.toFixed(2) + '(元)\n'+
          '节省：' + free.toFixed(2) + '(元)\n';

  };

}
