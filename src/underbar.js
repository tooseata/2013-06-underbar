var _ = {};

(function() {

  //Return an array of the last n elements of an array. If n is undefined,
  //return just the last element.
  _.last = function(array, n) {
      if (n === undefined) {
        return array[array.length - 1];
      }
      else if (n > array.length) {
        return array;
      }
      else {
        return Array.prototype.slice.call(array, array.length - n);
        }
  };

  // Like last, but for the first elements
  _.first = function(array, n) {
      if(n === undefined){
        return array[0];
      } else if (n > array.length) {
        return array;
      } else{
        return Array.prototype.slice.call(array, 0, n);
        //return _.last(array.reverse(), n);
      }
  };

  // Call iterator(value, key, collection) for each element of collection
  _.each = function(obj, iterator) {
     if(!obj) return;
    if(obj.length){
      for(var i = 0; i < obj.length; i++){
        iterator(obj[i], i, obj);
      }
    } else {
      for (var key in obj){
        iterator(obj[key],key,obj);
      }
    }
  };

  /*
   * TIP: Here's an example of a function that needs to iterate, which we've
   * implemented for you. Instead of using a standard `for` loop, though,
   * it uses the iteration helper `each`, which you will need to write.
   */

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, iterator) {
   if(Array.isArray(collection)){
      return collection.filter(iterator);
    } else{
      return collection;
    }

  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, iterator) {
    // TIP: see if you can re-use _.select() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function(item, index) {
      return !iterator.call(this, item, index);
      }
    );


  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
  //debugger;
  var holderArray, value, index, origLen, result;
    holderArray = [];
    result = [];
    origLen = array.length;
    for (index = 0; index < origLen; index++) {
      value = array[index];
      if (!_.contains(holderArray, value)) {
        result.push(holderArray.push(value));
      }
    }
    return result;
    };

  /*
   * map() is a useful primitive iteration function that works a lot
   * like each(), but in addition to running the operation on all
   * the members, it also maintains an array of results.
   */


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
      var result = [],
      arrayLen = array.length;
      for (var key = 0; key < arrayLen; key++){
         var index = array[key];
         result.push(iterator.call(array, index));
       }
       return  result;
      };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(obj, propertyName) {
    return _.map(obj, function(value){
      return value[propertyName];
    });
  };

  // Calls the method named by methodName on each value in the list.

  _.invoke = function(list, method) {
  //debugger;
  var args = Array.prototype.slice.call(arguments, 2);
  
  return _.map(list, function(value){
    method = value[method] ? value[method] : method;
    return method.apply(value, args);
  });
};


_.invoke = function(list, method) {
  //debugger;
  var args = Array.prototype.slice.call(arguments, 2);
  
  return _.map(list, function(value){
    method = value[method] ? value[method] : method;
    return method.apply(value, args);
  });
};


  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. Defaults to 0.
  //
  // Example:
    // var numbers = [1,2,3];
    // var sum = _.reduce(numbers, function(total, number){
    //   return total + number;
    // }, 0); // should be 6
  //


  _.reduce = function(obj, iterator, initialValue) {
  // debugger;
  if (initialValue == null) {
      initialValue = 0;
    }
    _.each(obj, function(value) {
      return initialValue = iterator(initialValue, value);
    });

    return initialValue;

  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: A lot of iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    //debugger;
    return _.reduce(collection, function(wasFound, item){
      if(wasFound){
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(obj, iterator) {
     //debugger;
    var bool, value, index, origLen;

     if (obj.length === 0) {
      return true;
    }
    // TIP: use reduce on this one!
     for (index = 0, origLen = obj.length; index < origLen; index++) {
      value = obj[index];
      if (iterator(value)) {
        bool = true;
      } else {
        return false;
      }
    }
    return bool;


  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.any = function(obj, iterator) {
    //debugger;
    // TIP: re-use every() here
    var bool, value, index, origLen;
    if (obj.length == 0) {
      return false;
    }
    for (index = 0, origLen = obj.length; index < origLen; index++) {
      value = obj[index];
      if (iterator != null) {
        if (iterator(value)) {
          return true;
        } else {
          bool = false;
        }
      } else {
        if (value) {
          return true;
        } else {
          bool = false;
        }
      }
    }
    return bool;
  };



  /*
   * These are a couple of helpers for merging objects
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
    // var obj1 = {key1: "something"};
    // _.extend(obj1, {
    //   key2: "something new",
    //   key3: "something else new"
    // }, {
    //   bla: "even more stuff"
    // }); // obj1 now contains key1, key2, key3 and bla
  //

  _.extend = function(obj) {
    //debugger;
    var arg, args = 1, key, value, index, origLen;
    if (args <= arguments.length) {
      args = Array.prototype.slice.call(arguments, 0);
    } else {
      args = [];
      }

    for (index = 0, origLen = args.length; index < origLen; index++) {
      arg = args[index];
      for (key in arg) {
        value = arg[key];
        //console.log(value);
        obj[key] = arg[key];
        //console.log(obj[key]);
      }
    }
    return obj;

  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    //debugger;
    var arg, args = 1, key, value, index, origLen;
    if (args <= arguments.length) {
      args = Array.prototype.slice.call(arguments, 0);
    } else {
      args = [];
      }

    console.log("obj: " + obj);
    //debugger;
    console.log("args: " + args);

    for (index = 0, origLen = args.length; index < origLen; index++) {
      arg = args[index];
      for (key in arg) {
        value = arg[key];
        console.log("value: " + value);
        if (obj[key] == null) {
          console.log("Before " + obj[key]);
          obj[key] = arg[key];
          console.log("After " + obj[key]);
        }

      }
    }
    return obj;

  };


  /*
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a `closure scope` (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;
    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function(){
      if(!alreadyCalled){
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {

    var result;
    result = {};
    return function(param) {
      if (result.hasOwnProperty(param)) {
        return result[param];
      } else {
        return result[param] = func(param);
      }
    };

  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    //debugger;
    var args = 1; 
    if (args <= arguments.length){
      args = Array.prototype.slice.call(arguments, 0);
    } else {
      args = [];
    }
    args = args.slice(2);
    //console.log(args);

    setTimeout((function() {
      return func.apply(null, args);
    }), wait);

  };


  /*
   * Advanced collection operations
   */

   // Adding range function

  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while(idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };


  // Shuffle an array.
  _.shuffle = function(obj) {
  //debugger;
  var origLen;

  origLen = obj.length;

  var swap = function (obj, i, j) {
    //debugger;
     obj[i], obj[j] = obj[j], obj[i];
  };

  for (var i = 0; i <= origLen; i++ ) {
    swap (obj, i, _.range(i, origLen));
  }
    return obj;
  };
  
  /* (End of pre-course curriculum) */

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3]]
  _.zip = function() {
  };

  // Flattens a multidimensional array to a one-dimensional array that
  // contains all the elements of all the nested arrays.
  //
  // Hints: Use Array.isArray to check if something is an array
  //
  _.flatten = function(nestedArray, result) {
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };


  /*
   * Offroad
   */

  // EXTRA CREDIT:
  // Return an object that responds to chainable function calls for
  // map, pluck, select, etc
  //
  // See README for details
  _.chain = function(obj) {
  };

  // EXTRA CREDIT:
  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See README for details
  _.throttle = function(func, wait) {
  };

}).call(this);
