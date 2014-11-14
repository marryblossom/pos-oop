var stringHand = new stringHandle();
var itemHand = new itemHandel();
var calculateHand = new calculateHandle();
var util = new utils();

function printInventory(input){
  var start='***<没钱赚商店>购物清单***\n';
  var end = '**********************';
  var date = getDate();
  var middle = getAllString(input);
  var output = start + '打印时间：' +date + '\n' + middle + end;
  console.log(output);
}

function getAllString(input){
  var cutOffLine = '----------------------\n' ;
  var subTotalstr = '' ;
  var promptionString = '挥泪赠送商品：\n' ;
  var totalString = '' ;
  var simpleInput = itemHand.withoutSameItem(input);
  var total = 0 ;
  var free = 0 ;

  for(var i in simpleInput){
    var oneBarCode = simpleInput[i];
    var item = itemHand.item(oneBarCode);
    var num = calculateHand.boughtNum(item,input);
    if(item !== ''){
      var subTotal = calculateHand.subtotal(item,num);
      total += subTotal;
      subTotalstr += stringHand.subtotalString(item, num, subTotal);
    }
    if(stringHand.freeString(item,num) !== ''){
      promptionString += stringHand.freeString(item,num) + '\n';
      free += item.price * parseInt(num/3);
    }
  }
  totalString += stringHand.totalString(total,free);
  return cutOffLine + subTotalstr + cutOffLine + promptionString + cutOffLine + totalString;
  }



 function getDate(){

   var currentDate = new Date(),
      year = util.getString(currentDate.getFullYear()),
      month = util.getString(currentDate.getMonth() + 1),
      date = util.getString(currentDate.getDate()),
      hour = util.getString(currentDate.getHours()),
      minute = util.getString(currentDate.getMinutes()),
      second = util.getString(currentDate.getSeconds()),
      dateString = year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;
  return dateString;
}
