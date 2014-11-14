function itemHandel(){
  var util = new utils();
  this.item = function getItemWithBarCode(barCode){
    var allItems = loadAllItems();
    var item = '';
    for(var i in allItems){
      if(barCode.indexOf(allItems[i].barcode) === 0){
        item = allItems[i];
      }
    }
    return item;
  };

  this.withoutSameItem = function (input){
    var index = 0;
    var array = [];
    var oneItem = input[0];
    array.push(oneItem);
    while(index<input.length){
       var simple = input[index];
       if(input[index].indexOf(oneItem) == -1){
         array.push(util.manageString(input[index],'-'));
         oneItem = simple;
       }
      index++;
    }
    return array;
  };
}
