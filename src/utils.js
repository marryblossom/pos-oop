function utils(){

  this.getString = function (num){
    return num < 10 ? '0'+num : num;
  };

  this.manageString = function (str,sign){
    if(str.indexOf(sign) > 0){
      var strs = str.split(sign);
      return strs[0];
    }else{
      return str;
    }
  };

  this.number = function (str){
    if(str.indexOf('-') >= 0){
       var strs = str.split("-");
       return parseInt(strs[1]);
    }else{
       return 1;
    }
  };
}
