function minimal(a, b) {
  if(a > b) {
    return b
  } else if (b > a) {
    return a
  } else {
    return a
  }
}

function power(a,b){
  let result = 1;
  if(b<1){
    result =a*b
  }else{
     for (let i=0;i<b;i++){
     result*=a;
   }
  }
   return result;
}

function power(a, b) {
  return a ** b
}