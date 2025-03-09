//https://www.codewars.com/kata/convert-a-string-to-an-array/train/javascript
function stringToArray(string) {
  const result = string.split(" ");
  return result;
}

//https://www.codewars.com/kata/dna-to-rna-conversion/train/javascript
function DNAtoRNA(dna) {
  const result = dna.replace(/T/g, "U");
  return result;
}

//https://www.codewars.com/kata/577a98a6ae28071780000989/train/javascript
var min = function(list){
  let result = list[0]; 
  for(let i=0; i<list.length; i++){
    if(list[i] < result){
      result = list[i];
    }
  }
  return result;
}
var max = function(list){
  let result = list[0];
  for(let i=0; i<list.length; i++){
    if(list[i] > result){
      result = list[i];
    }
  }
  return result;
}

//https://www.codewars.com/kata/544a54fd18b8e06d240005c0/train/javascript
function min(arr, toReturn) {
  let minVal = arr[0];
  let minValIndex = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < minVal) {
      minVal = arr[i];
      minValIndex = i;
    }
  }

  if (toReturn === "value") {
    return minVal;
  }

  return minValIndex;
}

//https://www.codewars.com/kata/a-wolf-in-sheeps-clothing/train/javascript
function warnTheSheep(queue) {
  let sheepCount = 0;
  for (let i = queue.length - 1; i >= 0; i--) {
    if (queue[i] === "wolf") {
      if (sheepCount === 0) {
        return "Pls go away and stop eating my sheep";
      }
      return `Oi! Sheep number ${sheepCount}! You are about to be eaten by a wolf!`;
    }
    sheepCount++;
  }
}

//https://www.codewars.com/kata/beginner-lost-without-a-map
function maps(x) {
  let newArray = x.map((a) => a * 2);
  return newArray;
}

//https://www.codewars.com/kata/find-the-first-non-consecutive-number/train/javascript
function firstNonConsecutive(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (i === 0) {
      continue;
    }

    let dif = arr[i] - arr[i - 1];
    if (dif > 1) {
      return arr[i];
    }
  }

  return null;
}