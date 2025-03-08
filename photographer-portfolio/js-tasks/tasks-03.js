// https://www.codewars.com/kata/find-the-smallest-integer-in-the-array/train/javascript

class SmallestIntegerFinder {
  findSmallestInt(args) {
    let minNumber = args[0];
    for(let i=1; i<args.length; i++){
      if(args[i] < minNumber){
        minNumber = args[i];
      }
    }
    return minNumber;
  }
}

// https://www.codewars.com/kata/geometry-basics-circle-circumference-in-2d/train/javascript

function giveMeFive(obj){
  let array = [];
  for (var key in obj){
    if(key.length === 5) {
      array.push(key);
    }
    
    if(obj[key].length === 5) {
      array.push(obj[key]);
    }
  }
  return array;
}

//https://www.codewars.com/kata/training-js-number-12-loop-statement-for-dot-in-and-for-dot-of/train/javascript

function circleCircumference(circle) {
  const length = 2 * Math.PI * circle.radius;
  return length;
}