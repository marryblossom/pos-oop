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
  var simpleInput = deleteSameItems(input);
  var total = 0 ;
  var free = 0 ;
  for(var i in simpleInput){
    var oneBarCode = simpleInput[i];
    var item = getItemWithBarCode(oneBarCode);
    var num = calculateBoughtNum(item,input);
    if(item !== ''){
      var subTotal = calculateSubtotal(item,num);
      total += subTotal;
      subTotalstr += getEverySubtotalString(item, num, subTotal);
    }
    if(getFreeString(item,num) !== ''){
      promptionString += getFreeString(item,num) + '\n';
      free += item.price * parseInt(num/3);
    }
  }
  totalString += getTotalPriceString(total,free);
  return cutOffLine + subTotalstr + cutOffLine + promptionString + cutOffLine + totalString;
  }

function getEverySubtotalString(item, num, subTotal){
  var str = '名称：'+ item.name + '，数量：' + num + item.unit +
            '，单价：' + item.price.toFixed(2) + '(元)，小计：' + subTotal.toFixed(2) + '(元)\n';

  return str;
}

function getFreeString(item,num){
  var str = '';
  var promotionResult = new promotionHandle();
  var promptionTypes = promotionResult.promotionTypes(item.barcode);
  if(promptionTypes.length !== 0){
    str += '名称：' + item.name + '，数量：' + parseInt(num / 3) + item.unit;
  }
  return str;
}

function getTotalPriceString(total,free){
  return '总计：' + total.toFixed(2) + '(元)\n'+
         '节省：' + free.toFixed(2) + '(元)\n';

}

function getItemWithBarCode(barCode){
  var allItems = loadAllItems();
  var item = '';
  for(var i in allItems){
    if(barCode.indexOf(allItems[i].barcode) === 0){
      item = allItems[i];
    }
  }
  return item;
}


function deleteSameItems(input){
  var index = 0;
  var array = [];
  var oneItem = input[0];
  array.push(oneItem);
  while(index<input.length){
     var simple = input[index];
     if(input[index].indexOf(oneItem) == -1){
       array.push(manageString(input[index],'-'));
       oneItem = simple;
     }
    index++;
  }
  return array;
}
/*************price calculate methods*****************/
function calculateSubtotal(item, num){
  var subTotal = 0;
  var promotionResult = new promotionHandle();
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
}

function calculateBoughtNum(item,input){
  var num = 0;
  for(var i=0;i<input.length;i++){
     if(input[i].indexOf(item.barcode) >=0)
      num += getNUmFromString(input[i]);
  }
  return num;
}

/*************promption calculate method*****************/



/*************util**************************/
function digitToSting(num){
  return num < 10 ? '0'+num : num;
}
function manageString(str,sign){
  if(str.indexOf(sign) > 0){
     var strs = str.split(sign);
     return strs[0];
  }else{
     return str;
  }
}

function getNUmFromString(str){
  if(str.indexOf('-') >= 0){
     var strs = str.split("-");
     return parseInt(strs[1]);
  }else{
     return 1;
  }
}

function getDate(){
  var currentDate = new Date(),
      year = digitToSting(currentDate.getFullYear()),
      month = digitToSting(currentDate.getMonth() + 1),
      date = digitToSting(currentDate.getDate()),
      hour = digitToSting(currentDate.getHours()),
      minute = digitToSting(currentDate.getMinutes()),
      second = digitToSting(currentDate.getSeconds()),
      dateString = year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;
  return dateString;
}
