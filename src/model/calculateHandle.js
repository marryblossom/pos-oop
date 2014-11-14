function calculateHandle(){
  var promotionResult = new promotionHandle();
  var util = new utils();
  this.subtotal = function(item, num){
    var subTotal = 0;
    var promptionTypes = promotionResult.promotionTypes(item.barcode);
    if(promptionTypes.length !== 0){
      for(var i in promptionTypes){
        var type = promptionTypes[i];

        subTotal += promotionResult.getPromption(type,num,item.price);
      }
    }else{
      subTotal = item.price * num;
    }
    return subTotal;
  };

  this.boughtNum = function (item,input){
    var num = 0;
    for(var i=0;i<input.length;i++){
       if(input[i].indexOf(item.barcode) >=0)
        num += util.number(input[i]);
    }
    return num;
  };
}
