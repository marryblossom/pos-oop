function promotionPriceHandle(){
  this.promotion = function (num,price){
     return price*(Math.ceil(num/3))*2;

  } ;
}
