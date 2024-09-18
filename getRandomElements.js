function getRandomElements(arr, num) {
    var result = new Array(num),
        len = arr.length,
        taken = new Array(len);
    if (num > len)
      throw new RangeError("getRandomElements: more elements taken than available");
    while (num--) {
      var x = Math.floor(Math.random() * len);
      result[num] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }