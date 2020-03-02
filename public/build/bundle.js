
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
(function () {
  'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  function getCjsExportFromNamespace (n) {
  	return n && n['default'] || n;
  }

  var runtime_1 = createCommonjsModule(function (module) {
    /**
     * Copyright (c) 2014-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    var runtime = function (exports) {

      var Op = Object.prototype;
      var hasOwn = Op.hasOwnProperty;
      var undefined$1; // More compressible than void 0.

      var $Symbol = typeof Symbol === "function" ? Symbol : {};
      var iteratorSymbol = $Symbol.iterator || "@@iterator";
      var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
      var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

      function wrap(innerFn, outerFn, self, tryLocsList) {
        // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
        var generator = Object.create(protoGenerator.prototype);
        var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
        // .throw, and .return methods.

        generator._invoke = makeInvokeMethod(innerFn, self, context);
        return generator;
      }

      exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
      // record like context.tryEntries[i].completion. This interface could
      // have been (and was previously) designed to take a closure to be
      // invoked without arguments, but in all the cases we care about we
      // already have an existing method we want to call, so there's no need
      // to create a new function object. We can even get away with assuming
      // the method takes exactly one argument, since that happens to be true
      // in every case, so we don't have to touch the arguments object. The
      // only additional allocation required is the completion record, which
      // has a stable shape and so hopefully should be cheap to allocate.

      function tryCatch(fn, obj, arg) {
        try {
          return {
            type: "normal",
            arg: fn.call(obj, arg)
          };
        } catch (err) {
          return {
            type: "throw",
            arg: err
          };
        }
      }

      var GenStateSuspendedStart = "suspendedStart";
      var GenStateSuspendedYield = "suspendedYield";
      var GenStateExecuting = "executing";
      var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
      // breaking out of the dispatch switch statement.

      var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
      // .constructor.prototype properties for functions that return Generator
      // objects. For full spec compliance, you may wish to configure your
      // minifier not to mangle the names of these two functions.

      function Generator() {}

      function GeneratorFunction() {}

      function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
      // don't natively support it.


      var IteratorPrototype = {};

      IteratorPrototype[iteratorSymbol] = function () {
        return this;
      };

      var getProto = Object.getPrototypeOf;
      var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

      if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
        // This environment has a native %IteratorPrototype%; use it instead
        // of the polyfill.
        IteratorPrototype = NativeIteratorPrototype;
      }

      var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
      GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
      GeneratorFunctionPrototype.constructor = GeneratorFunction;
      GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction"; // Helper for defining the .next, .throw, and .return methods of the
      // Iterator interface in terms of a single ._invoke method.

      function defineIteratorMethods(prototype) {
        ["next", "throw", "return"].forEach(function (method) {
          prototype[method] = function (arg) {
            return this._invoke(method, arg);
          };
        });
      }

      exports.isGeneratorFunction = function (genFun) {
        var ctor = typeof genFun === "function" && genFun.constructor;
        return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
      };

      exports.mark = function (genFun) {
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
        } else {
          genFun.__proto__ = GeneratorFunctionPrototype;

          if (!(toStringTagSymbol in genFun)) {
            genFun[toStringTagSymbol] = "GeneratorFunction";
          }
        }

        genFun.prototype = Object.create(Gp);
        return genFun;
      }; // Within the body of any async function, `await x` is transformed to
      // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
      // `hasOwn.call(value, "__await")` to determine if the yielded value is
      // meant to be awaited.


      exports.awrap = function (arg) {
        return {
          __await: arg
        };
      };

      function AsyncIterator(generator) {
        function invoke(method, arg, resolve, reject) {
          var record = tryCatch(generator[method], generator, arg);

          if (record.type === "throw") {
            reject(record.arg);
          } else {
            var result = record.arg;
            var value = result.value;

            if (value && _typeof(value) === "object" && hasOwn.call(value, "__await")) {
              return Promise.resolve(value.__await).then(function (value) {
                invoke("next", value, resolve, reject);
              }, function (err) {
                invoke("throw", err, resolve, reject);
              });
            }

            return Promise.resolve(value).then(function (unwrapped) {
              // When a yielded Promise is resolved, its final value becomes
              // the .value of the Promise<{value,done}> result for the
              // current iteration.
              result.value = unwrapped;
              resolve(result);
            }, function (error) {
              // If a rejected Promise was yielded, throw the rejection back
              // into the async generator function so it can be handled there.
              return invoke("throw", error, resolve, reject);
            });
          }
        }

        var previousPromise;

        function enqueue(method, arg) {
          function callInvokeWithMethodAndArg() {
            return new Promise(function (resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }

          return previousPromise = // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        } // Define the unified helper method that is used to implement .next,
        // .throw, and .return (see defineIteratorMethods).


        this._invoke = enqueue;
      }

      defineIteratorMethods(AsyncIterator.prototype);

      AsyncIterator.prototype[asyncIteratorSymbol] = function () {
        return this;
      };

      exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
      // AsyncIterator objects; they just return a Promise for the value of
      // the final result produced by the iterator.

      exports.async = function (innerFn, outerFn, self, tryLocsList) {
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
        return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
        : iter.next().then(function (result) {
          return result.done ? result.value : iter.next();
        });
      };

      function makeInvokeMethod(innerFn, self, context) {
        var state = GenStateSuspendedStart;
        return function invoke(method, arg) {
          if (state === GenStateExecuting) {
            throw new Error("Generator is already running");
          }

          if (state === GenStateCompleted) {
            if (method === "throw") {
              throw arg;
            } // Be forgiving, per 25.3.3.3.3 of the spec:
            // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


            return doneResult();
          }

          context.method = method;
          context.arg = arg;

          while (true) {
            var delegate = context.delegate;

            if (delegate) {
              var delegateResult = maybeInvokeDelegate(delegate, context);

              if (delegateResult) {
                if (delegateResult === ContinueSentinel) continue;
                return delegateResult;
              }
            }

            if (context.method === "next") {
              // Setting context._sent for legacy support of Babel's
              // function.sent implementation.
              context.sent = context._sent = context.arg;
            } else if (context.method === "throw") {
              if (state === GenStateSuspendedStart) {
                state = GenStateCompleted;
                throw context.arg;
              }

              context.dispatchException(context.arg);
            } else if (context.method === "return") {
              context.abrupt("return", context.arg);
            }

            state = GenStateExecuting;
            var record = tryCatch(innerFn, self, context);

            if (record.type === "normal") {
              // If an exception is thrown from innerFn, we leave state ===
              // GenStateExecuting and loop back for another invocation.
              state = context.done ? GenStateCompleted : GenStateSuspendedYield;

              if (record.arg === ContinueSentinel) {
                continue;
              }

              return {
                value: record.arg,
                done: context.done
              };
            } else if (record.type === "throw") {
              state = GenStateCompleted; // Dispatch the exception by looping back around to the
              // context.dispatchException(context.arg) call above.

              context.method = "throw";
              context.arg = record.arg;
            }
          }
        };
      } // Call delegate.iterator[context.method](context.arg) and handle the
      // result, either by returning a { value, done } result from the
      // delegate iterator, or by modifying context.method and context.arg,
      // setting context.delegate to null, and returning the ContinueSentinel.


      function maybeInvokeDelegate(delegate, context) {
        var method = delegate.iterator[context.method];

        if (method === undefined$1) {
          // A .throw or .return when the delegate iterator has no .throw
          // method always terminates the yield* loop.
          context.delegate = null;

          if (context.method === "throw") {
            // Note: ["return"] must be used for ES3 parsing compatibility.
            if (delegate.iterator["return"]) {
              // If the delegate iterator has a return method, give it a
              // chance to clean up.
              context.method = "return";
              context.arg = undefined$1;
              maybeInvokeDelegate(delegate, context);

              if (context.method === "throw") {
                // If maybeInvokeDelegate(context) changed context.method from
                // "return" to "throw", let that override the TypeError below.
                return ContinueSentinel;
              }
            }

            context.method = "throw";
            context.arg = new TypeError("The iterator does not provide a 'throw' method");
          }

          return ContinueSentinel;
        }

        var record = tryCatch(method, delegate.iterator, context.arg);

        if (record.type === "throw") {
          context.method = "throw";
          context.arg = record.arg;
          context.delegate = null;
          return ContinueSentinel;
        }

        var info = record.arg;

        if (!info) {
          context.method = "throw";
          context.arg = new TypeError("iterator result is not an object");
          context.delegate = null;
          return ContinueSentinel;
        }

        if (info.done) {
          // Assign the result of the finished delegate to the temporary
          // variable specified by delegate.resultName (see delegateYield).
          context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

          context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
          // exception, let the outer generator proceed normally. If
          // context.method was "next", forget context.arg since it has been
          // "consumed" by the delegate iterator. If context.method was
          // "return", allow the original .return call to continue in the
          // outer generator.

          if (context.method !== "return") {
            context.method = "next";
            context.arg = undefined$1;
          }
        } else {
          // Re-yield the result returned by the delegate method.
          return info;
        } // The delegate iterator is finished, so forget it and continue with
        // the outer generator.


        context.delegate = null;
        return ContinueSentinel;
      } // Define Generator.prototype.{next,throw,return} in terms of the
      // unified ._invoke helper method.


      defineIteratorMethods(Gp);
      Gp[toStringTagSymbol] = "Generator"; // A Generator should always return itself as the iterator object when the
      // @@iterator function is called on it. Some browsers' implementations of the
      // iterator prototype chain incorrectly implement this, causing the Generator
      // object to not be returned from this call. This ensures that doesn't happen.
      // See https://github.com/facebook/regenerator/issues/274 for more details.

      Gp[iteratorSymbol] = function () {
        return this;
      };

      Gp.toString = function () {
        return "[object Generator]";
      };

      function pushTryEntry(locs) {
        var entry = {
          tryLoc: locs[0]
        };

        if (1 in locs) {
          entry.catchLoc = locs[1];
        }

        if (2 in locs) {
          entry.finallyLoc = locs[2];
          entry.afterLoc = locs[3];
        }

        this.tryEntries.push(entry);
      }

      function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal";
        delete record.arg;
        entry.completion = record;
      }

      function Context(tryLocsList) {
        // The root entry object (effectively a try statement without a catch
        // or a finally block) gives us a place to store values thrown from
        // locations where there is no enclosing try statement.
        this.tryEntries = [{
          tryLoc: "root"
        }];
        tryLocsList.forEach(pushTryEntry, this);
        this.reset(true);
      }

      exports.keys = function (object) {
        var keys = [];

        for (var key in object) {
          keys.push(key);
        }

        keys.reverse(); // Rather than returning an object with a next method, we keep
        // things simple and return the next function itself.

        return function next() {
          while (keys.length) {
            var key = keys.pop();

            if (key in object) {
              next.value = key;
              next.done = false;
              return next;
            }
          } // To avoid creating an additional object, we just hang the .value
          // and .done properties off the next function object itself. This
          // also ensures that the minifier will not anonymize the function.


          next.done = true;
          return next;
        };
      };

      function values(iterable) {
        if (iterable) {
          var iteratorMethod = iterable[iteratorSymbol];

          if (iteratorMethod) {
            return iteratorMethod.call(iterable);
          }

          if (typeof iterable.next === "function") {
            return iterable;
          }

          if (!isNaN(iterable.length)) {
            var i = -1,
                next = function next() {
              while (++i < iterable.length) {
                if (hasOwn.call(iterable, i)) {
                  next.value = iterable[i];
                  next.done = false;
                  return next;
                }
              }

              next.value = undefined$1;
              next.done = true;
              return next;
            };

            return next.next = next;
          }
        } // Return an iterator with no values.


        return {
          next: doneResult
        };
      }

      exports.values = values;

      function doneResult() {
        return {
          value: undefined$1,
          done: true
        };
      }

      Context.prototype = {
        constructor: Context,
        reset: function reset(skipTempReset) {
          this.prev = 0;
          this.next = 0; // Resetting context._sent for legacy support of Babel's
          // function.sent implementation.

          this.sent = this._sent = undefined$1;
          this.done = false;
          this.delegate = null;
          this.method = "next";
          this.arg = undefined$1;
          this.tryEntries.forEach(resetTryEntry);

          if (!skipTempReset) {
            for (var name in this) {
              // Not sure about the optimal order of these conditions:
              if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
                this[name] = undefined$1;
              }
            }
          }
        },
        stop: function stop() {
          this.done = true;
          var rootEntry = this.tryEntries[0];
          var rootRecord = rootEntry.completion;

          if (rootRecord.type === "throw") {
            throw rootRecord.arg;
          }

          return this.rval;
        },
        dispatchException: function dispatchException(exception) {
          if (this.done) {
            throw exception;
          }

          var context = this;

          function handle(loc, caught) {
            record.type = "throw";
            record.arg = exception;
            context.next = loc;

            if (caught) {
              // If the dispatched exception was caught by a catch block,
              // then let that catch block handle the exception normally.
              context.method = "next";
              context.arg = undefined$1;
            }

            return !!caught;
          }

          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            var record = entry.completion;

            if (entry.tryLoc === "root") {
              // Exception thrown outside of any try block that could handle
              // it, so set the completion value of the entire function to
              // throw the exception.
              return handle("end");
            }

            if (entry.tryLoc <= this.prev) {
              var hasCatch = hasOwn.call(entry, "catchLoc");
              var hasFinally = hasOwn.call(entry, "finallyLoc");

              if (hasCatch && hasFinally) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                } else if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }
              } else if (hasCatch) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                }
              } else if (hasFinally) {
                if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }
              } else {
                throw new Error("try statement without catch or finally");
              }
            }
          }
        },
        abrupt: function abrupt(type, arg) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];

            if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
              var finallyEntry = entry;
              break;
            }
          }

          if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
            // Ignore the finally entry if control is not jumping to a
            // location outside the try/catch block.
            finallyEntry = null;
          }

          var record = finallyEntry ? finallyEntry.completion : {};
          record.type = type;
          record.arg = arg;

          if (finallyEntry) {
            this.method = "next";
            this.next = finallyEntry.finallyLoc;
            return ContinueSentinel;
          }

          return this.complete(record);
        },
        complete: function complete(record, afterLoc) {
          if (record.type === "throw") {
            throw record.arg;
          }

          if (record.type === "break" || record.type === "continue") {
            this.next = record.arg;
          } else if (record.type === "return") {
            this.rval = this.arg = record.arg;
            this.method = "return";
            this.next = "end";
          } else if (record.type === "normal" && afterLoc) {
            this.next = afterLoc;
          }

          return ContinueSentinel;
        },
        finish: function finish(finallyLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];

            if (entry.finallyLoc === finallyLoc) {
              this.complete(entry.completion, entry.afterLoc);
              resetTryEntry(entry);
              return ContinueSentinel;
            }
          }
        },
        "catch": function _catch(tryLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];

            if (entry.tryLoc === tryLoc) {
              var record = entry.completion;

              if (record.type === "throw") {
                var thrown = record.arg;
                resetTryEntry(entry);
              }

              return thrown;
            }
          } // The context.catch method must only be called with a location
          // argument that corresponds to a known catch block.


          throw new Error("illegal catch attempt");
        },
        delegateYield: function delegateYield(iterable, resultName, nextLoc) {
          this.delegate = {
            iterator: values(iterable),
            resultName: resultName,
            nextLoc: nextLoc
          };

          if (this.method === "next") {
            // Deliberately forget the last sent value so that we don't
            // accidentally pass it on to the delegate.
            this.arg = undefined$1;
          }

          return ContinueSentinel;
        }
      }; // Regardless of whether this script is executing as a CommonJS module
      // or not, return the runtime object so that we can declare the variable
      // regeneratorRuntime in the outer scope, which allows this module to be
      // injected easily by `bin/regenerator --include-runtime script.js`.

      return exports;
    }( // If this script is executing as a CommonJS module, use module.exports
    // as the regeneratorRuntime namespace. Otherwise create a new empty
    // object. Either way, the resulting object will be used to initialize
    // the regeneratorRuntime variable at the top of this file.
     module.exports );

    try {
      regeneratorRuntime = runtime;
    } catch (accidentalStrictMode) {
      // This module should not be running in strict mode, so the above
      // assignment should always work unless something is misconfigured. Just
      // in case runtime.js accidentally runs in strict mode, we can escape
      // strict mode using a global Function call. This could conceivably fail
      // if a Content Security Policy forbids using Function, but in that case
      // the proper solution is to fix the accidental strict mode problem. If
      // you've misconfigured your bundler to force strict mode and applied a
      // CSP to forbid Function, and you're not willing to fix either of those
      // problems, please detail your unique predicament in a GitHub issue.
      Function("r", "regeneratorRuntime = r")(runtime);
    }
  });

  var regenerator = runtime_1;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  /**
   * A faster alternative to `Function#apply`, this function invokes `func`
   * with the `this` binding of `thisArg` and the arguments of `args`.
   *
   * @private
   * @param {Function} func The function to invoke.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {Array} args The arguments to invoke `func` with.
   * @returns {*} Returns the result of `func`.
   */
  function apply(func, thisArg, args) {
    switch (args.length) {
      case 0:
        return func.call(thisArg);

      case 1:
        return func.call(thisArg, args[0]);

      case 2:
        return func.call(thisArg, args[0], args[1]);

      case 3:
        return func.call(thisArg, args[0], args[1], args[2]);
    }

    return func.apply(thisArg, args);
  }

  var _apply = apply;

  /**
   * This method returns the first argument it receives.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Util
   * @param {*} value Any value.
   * @returns {*} Returns `value`.
   * @example
   *
   * var object = { 'a': 1 };
   *
   * console.log(_.identity(object) === object);
   * // => true
   */
  function identity(value) {
    return value;
  }

  var identity_1 = identity;

  /* Built-in method references for those with the same name as other `lodash` methods. */

  var nativeMax = Math.max;
  /**
   * A specialized version of `baseRest` which transforms the rest array.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @param {Function} transform The rest array transform.
   * @returns {Function} Returns the new function.
   */

  function overRest(func, start, transform) {
    start = nativeMax(start === undefined ? func.length - 1 : start, 0);
    return function () {
      var args = arguments,
          index = -1,
          length = nativeMax(args.length - start, 0),
          array = Array(length);

      while (++index < length) {
        array[index] = args[start + index];
      }

      index = -1;
      var otherArgs = Array(start + 1);

      while (++index < start) {
        otherArgs[index] = args[index];
      }

      otherArgs[start] = transform(array);
      return _apply(func, this, otherArgs);
    };
  }

  var _overRest = overRest;

  /**
   * Creates a function that returns `value`.
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Util
   * @param {*} value The value to return from the new function.
   * @returns {Function} Returns the new constant function.
   * @example
   *
   * var objects = _.times(2, _.constant({ 'a': 1 }));
   *
   * console.log(objects);
   * // => [{ 'a': 1 }, { 'a': 1 }]
   *
   * console.log(objects[0] === objects[1]);
   * // => true
   */
  function constant(value) {
    return function () {
      return value;
    };
  }

  var constant_1 = constant;

  /** Detect free variable `global` from Node.js. */

  var freeGlobal = _typeof(commonjsGlobal) == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
  var _freeGlobal = freeGlobal;

  /** Detect free variable `self`. */

  var freeSelf = (typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' && self && self.Object === Object && self;
  /** Used as a reference to the global object. */

  var root = _freeGlobal || freeSelf || Function('return this')();
  var _root = root;

  /** Built-in value references. */

  var _Symbol2 = _root.Symbol;
  var _Symbol = _Symbol2;

  /** Used for built-in method references. */

  var objectProto = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty = objectProto.hasOwnProperty;
  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */

  var nativeObjectToString = objectProto.toString;
  /** Built-in value references. */

  var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;
  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */

  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag),
        tag = value[symToStringTag];

    try {
      value[symToStringTag] = undefined;
      var unmasked = true;
    } catch (e) {}

    var result = nativeObjectToString.call(value);

    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }

    return result;
  }

  var _getRawTag = getRawTag;

  /** Used for built-in method references. */
  var objectProto$1 = Object.prototype;
  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */

  var nativeObjectToString$1 = objectProto$1.toString;
  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */

  function objectToString(value) {
    return nativeObjectToString$1.call(value);
  }

  var _objectToString = objectToString;

  /** `Object#toString` result references. */

  var nullTag = '[object Null]',
      undefinedTag = '[object Undefined]';
  /** Built-in value references. */

  var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;
  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */

  function baseGetTag(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }

    return symToStringTag$1 && symToStringTag$1 in Object(value) ? _getRawTag(value) : _objectToString(value);
  }

  var _baseGetTag = baseGetTag;

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */
  function isObject(value) {
    var type = _typeof(value);

    return value != null && (type == 'object' || type == 'function');
  }

  var isObject_1 = isObject;

  /** `Object#toString` result references. */

  var asyncTag = '[object AsyncFunction]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      proxyTag = '[object Proxy]';
  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */

  function isFunction(value) {
    if (!isObject_1(value)) {
      return false;
    } // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.


    var tag = _baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
  }

  var isFunction_1 = isFunction;

  /** Used to detect overreaching core-js shims. */

  var coreJsData = _root['__core-js_shared__'];
  var _coreJsData = coreJsData;

  /** Used to detect methods masquerading as native. */

  var maskSrcKey = function () {
    var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
    return uid ? 'Symbol(src)_1.' + uid : '';
  }();
  /**
   * Checks if `func` has its source masked.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` is masked, else `false`.
   */


  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }

  var _isMasked = isMasked;

  /** Used for built-in method references. */
  var funcProto = Function.prototype;
  /** Used to resolve the decompiled source of functions. */

  var funcToString = funcProto.toString;
  /**
   * Converts `func` to its source code.
   *
   * @private
   * @param {Function} func The function to convert.
   * @returns {string} Returns the source code.
   */

  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {}

      try {
        return func + '';
      } catch (e) {}
    }

    return '';
  }

  var _toSource = toSource;

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */

  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  /** Used to detect host constructors (Safari). */

  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  /** Used for built-in method references. */

  var funcProto$1 = Function.prototype,
      objectProto$2 = Object.prototype;
  /** Used to resolve the decompiled source of functions. */

  var funcToString$1 = funcProto$1.toString;
  /** Used to check objects for own properties. */

  var hasOwnProperty$1 = objectProto$2.hasOwnProperty;
  /** Used to detect if a method is native. */

  var reIsNative = RegExp('^' + funcToString$1.call(hasOwnProperty$1).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
  /**
   * The base implementation of `_.isNative` without bad shim checks.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function,
   *  else `false`.
   */

  function baseIsNative(value) {
    if (!isObject_1(value) || _isMasked(value)) {
      return false;
    }

    var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
    return pattern.test(_toSource(value));
  }

  var _baseIsNative = baseIsNative;

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }

  var _getValue = getValue;

  /**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */

  function getNative(object, key) {
    var value = _getValue(object, key);
    return _baseIsNative(value) ? value : undefined;
  }

  var _getNative = getNative;

  var defineProperty = function () {
    try {
      var func = _getNative(Object, 'defineProperty');
      func({}, '', {});
      return func;
    } catch (e) {}
  }();

  var _defineProperty = defineProperty;

  /**
   * The base implementation of `setToString` without support for hot loop shorting.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */

  var baseSetToString = !_defineProperty ? identity_1 : function (func, string) {
    return _defineProperty(func, 'toString', {
      'configurable': true,
      'enumerable': false,
      'value': constant_1(string),
      'writable': true
    });
  };
  var _baseSetToString = baseSetToString;

  /** Used to detect hot functions by number of calls within a span of milliseconds. */
  var HOT_COUNT = 800,
      HOT_SPAN = 16;
  /* Built-in method references for those with the same name as other `lodash` methods. */

  var nativeNow = Date.now;
  /**
   * Creates a function that'll short out and invoke `identity` instead
   * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
   * milliseconds.
   *
   * @private
   * @param {Function} func The function to restrict.
   * @returns {Function} Returns the new shortable function.
   */

  function shortOut(func) {
    var count = 0,
        lastCalled = 0;
    return function () {
      var stamp = nativeNow(),
          remaining = HOT_SPAN - (stamp - lastCalled);
      lastCalled = stamp;

      if (remaining > 0) {
        if (++count >= HOT_COUNT) {
          return arguments[0];
        }
      } else {
        count = 0;
      }

      return func.apply(undefined, arguments);
    };
  }

  var _shortOut = shortOut;

  /**
   * Sets the `toString` method of `func` to return `string`.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */

  var setToString = _shortOut(_baseSetToString);
  var _setToString = setToString;

  /**
   * The base implementation of `_.rest` which doesn't validate or coerce arguments.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @returns {Function} Returns the new function.
   */

  function baseRest(func, start) {
    return _setToString(_overRest(func, start, identity_1), func + '');
  }

  var _baseRest = baseRest;

  /**
   * Removes all key-value entries from the list cache.
   *
   * @private
   * @name clear
   * @memberOf ListCache
   */
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }

  var _listCacheClear = listCacheClear;

  /**
   * Performs a
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * comparison between two values to determine if they are equivalent.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'a': 1 };
   * var other = { 'a': 1 };
   *
   * _.eq(object, object);
   * // => true
   *
   * _.eq(object, other);
   * // => false
   *
   * _.eq('a', 'a');
   * // => true
   *
   * _.eq('a', Object('a'));
   * // => false
   *
   * _.eq(NaN, NaN);
   * // => true
   */
  function eq(value, other) {
    return value === other || value !== value && other !== other;
  }

  var eq_1 = eq;

  /**
   * Gets the index at which the `key` is found in `array` of key-value pairs.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} key The key to search for.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */

  function assocIndexOf(array, key) {
    var length = array.length;

    while (length--) {
      if (eq_1(array[length][0], key)) {
        return length;
      }
    }

    return -1;
  }

  var _assocIndexOf = assocIndexOf;

  /** Used for built-in method references. */

  var arrayProto = Array.prototype;
  /** Built-in value references. */

  var splice = arrayProto.splice;
  /**
   * Removes `key` and its value from the list cache.
   *
   * @private
   * @name delete
   * @memberOf ListCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */

  function listCacheDelete(key) {
    var data = this.__data__,
        index = _assocIndexOf(data, key);

    if (index < 0) {
      return false;
    }

    var lastIndex = data.length - 1;

    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }

    --this.size;
    return true;
  }

  var _listCacheDelete = listCacheDelete;

  /**
   * Gets the list cache value for `key`.
   *
   * @private
   * @name get
   * @memberOf ListCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */

  function listCacheGet(key) {
    var data = this.__data__,
        index = _assocIndexOf(data, key);
    return index < 0 ? undefined : data[index][1];
  }

  var _listCacheGet = listCacheGet;

  /**
   * Checks if a list cache value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf ListCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */

  function listCacheHas(key) {
    return _assocIndexOf(this.__data__, key) > -1;
  }

  var _listCacheHas = listCacheHas;

  /**
   * Sets the list cache `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf ListCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the list cache instance.
   */

  function listCacheSet(key, value) {
    var data = this.__data__,
        index = _assocIndexOf(data, key);

    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }

    return this;
  }

  var _listCacheSet = listCacheSet;

  /**
   * Creates an list cache object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */

  function ListCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;
    this.clear();

    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  } // Add methods to `ListCache`.


  ListCache.prototype.clear = _listCacheClear;
  ListCache.prototype['delete'] = _listCacheDelete;
  ListCache.prototype.get = _listCacheGet;
  ListCache.prototype.has = _listCacheHas;
  ListCache.prototype.set = _listCacheSet;
  var _ListCache = ListCache;

  /**
   * Removes all key-value entries from the stack.
   *
   * @private
   * @name clear
   * @memberOf Stack
   */

  function stackClear() {
    this.__data__ = new _ListCache();
    this.size = 0;
  }

  var _stackClear = stackClear;

  /**
   * Removes `key` and its value from the stack.
   *
   * @private
   * @name delete
   * @memberOf Stack
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function stackDelete(key) {
    var data = this.__data__,
        result = data['delete'](key);
    this.size = data.size;
    return result;
  }

  var _stackDelete = stackDelete;

  /**
   * Gets the stack value for `key`.
   *
   * @private
   * @name get
   * @memberOf Stack
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function stackGet(key) {
    return this.__data__.get(key);
  }

  var _stackGet = stackGet;

  /**
   * Checks if a stack value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Stack
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function stackHas(key) {
    return this.__data__.has(key);
  }

  var _stackHas = stackHas;

  /* Built-in method references that are verified to be native. */

  var Map$1 = _getNative(_root, 'Map');
  var _Map = Map$1;

  /* Built-in method references that are verified to be native. */

  var nativeCreate = _getNative(Object, 'create');
  var _nativeCreate = nativeCreate;

  /**
   * Removes all key-value entries from the hash.
   *
   * @private
   * @name clear
   * @memberOf Hash
   */

  function hashClear() {
    this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
    this.size = 0;
  }

  var _hashClear = hashClear;

  /**
   * Removes `key` and its value from the hash.
   *
   * @private
   * @name delete
   * @memberOf Hash
   * @param {Object} hash The hash to modify.
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }

  var _hashDelete = hashDelete;

  /** Used to stand-in for `undefined` hash values. */

  var HASH_UNDEFINED = '__lodash_hash_undefined__';
  /** Used for built-in method references. */

  var objectProto$3 = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
  /**
   * Gets the hash value for `key`.
   *
   * @private
   * @name get
   * @memberOf Hash
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */

  function hashGet(key) {
    var data = this.__data__;

    if (_nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED ? undefined : result;
    }

    return hasOwnProperty$2.call(data, key) ? data[key] : undefined;
  }

  var _hashGet = hashGet;

  /** Used for built-in method references. */

  var objectProto$4 = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
  /**
   * Checks if a hash value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Hash
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */

  function hashHas(key) {
    var data = this.__data__;
    return _nativeCreate ? data[key] !== undefined : hasOwnProperty$3.call(data, key);
  }

  var _hashHas = hashHas;

  /** Used to stand-in for `undefined` hash values. */

  var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';
  /**
   * Sets the hash `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Hash
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the hash instance.
   */

  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = _nativeCreate && value === undefined ? HASH_UNDEFINED$1 : value;
    return this;
  }

  var _hashSet = hashSet;

  /**
   * Creates a hash object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */

  function Hash(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;
    this.clear();

    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  } // Add methods to `Hash`.


  Hash.prototype.clear = _hashClear;
  Hash.prototype['delete'] = _hashDelete;
  Hash.prototype.get = _hashGet;
  Hash.prototype.has = _hashHas;
  Hash.prototype.set = _hashSet;
  var _Hash = Hash;

  /**
   * Removes all key-value entries from the map.
   *
   * @private
   * @name clear
   * @memberOf MapCache
   */

  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      'hash': new _Hash(),
      'map': new (_Map || _ListCache)(),
      'string': new _Hash()
    };
  }

  var _mapCacheClear = mapCacheClear;

  /**
   * Checks if `value` is suitable for use as unique object key.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
   */
  function isKeyable(value) {
    var type = _typeof(value);

    return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
  }

  var _isKeyable = isKeyable;

  /**
   * Gets the data for `map`.
   *
   * @private
   * @param {Object} map The map to query.
   * @param {string} key The reference key.
   * @returns {*} Returns the map data.
   */

  function getMapData(map, key) {
    var data = map.__data__;
    return _isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
  }

  var _getMapData = getMapData;

  /**
   * Removes `key` and its value from the map.
   *
   * @private
   * @name delete
   * @memberOf MapCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */

  function mapCacheDelete(key) {
    var result = _getMapData(this, key)['delete'](key);
    this.size -= result ? 1 : 0;
    return result;
  }

  var _mapCacheDelete = mapCacheDelete;

  /**
   * Gets the map value for `key`.
   *
   * @private
   * @name get
   * @memberOf MapCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */

  function mapCacheGet(key) {
    return _getMapData(this, key).get(key);
  }

  var _mapCacheGet = mapCacheGet;

  /**
   * Checks if a map value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf MapCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */

  function mapCacheHas(key) {
    return _getMapData(this, key).has(key);
  }

  var _mapCacheHas = mapCacheHas;

  /**
   * Sets the map `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf MapCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the map cache instance.
   */

  function mapCacheSet(key, value) {
    var data = _getMapData(this, key),
        size = data.size;
    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }

  var _mapCacheSet = mapCacheSet;

  /**
   * Creates a map cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */

  function MapCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;
    this.clear();

    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  } // Add methods to `MapCache`.


  MapCache.prototype.clear = _mapCacheClear;
  MapCache.prototype['delete'] = _mapCacheDelete;
  MapCache.prototype.get = _mapCacheGet;
  MapCache.prototype.has = _mapCacheHas;
  MapCache.prototype.set = _mapCacheSet;
  var _MapCache = MapCache;

  /** Used as the size to enable large array optimizations. */

  var LARGE_ARRAY_SIZE = 200;
  /**
   * Sets the stack `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Stack
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the stack cache instance.
   */

  function stackSet(key, value) {
    var data = this.__data__;

    if (data instanceof _ListCache) {
      var pairs = data.__data__;

      if (!_Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }

      data = this.__data__ = new _MapCache(pairs);
    }

    data.set(key, value);
    this.size = data.size;
    return this;
  }

  var _stackSet = stackSet;

  /**
   * Creates a stack cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */

  function Stack(entries) {
    var data = this.__data__ = new _ListCache(entries);
    this.size = data.size;
  } // Add methods to `Stack`.


  Stack.prototype.clear = _stackClear;
  Stack.prototype['delete'] = _stackDelete;
  Stack.prototype.get = _stackGet;
  Stack.prototype.has = _stackHas;
  Stack.prototype.set = _stackSet;
  var _Stack = Stack;

  /**
   * The base implementation of `assignValue` and `assignMergeValue` without
   * value checks.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */

  function baseAssignValue(object, key, value) {
    if (key == '__proto__' && _defineProperty) {
      _defineProperty(object, key, {
        'configurable': true,
        'enumerable': true,
        'value': value,
        'writable': true
      });
    } else {
      object[key] = value;
    }
  }

  var _baseAssignValue = baseAssignValue;

  /**
   * This function is like `assignValue` except that it doesn't assign
   * `undefined` values.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */

  function assignMergeValue(object, key, value) {
    if (value !== undefined && !eq_1(object[key], value) || value === undefined && !(key in object)) {
      _baseAssignValue(object, key, value);
    }
  }

  var _assignMergeValue = assignMergeValue;

  /**
   * Creates a base function for methods like `_.forIn` and `_.forOwn`.
   *
   * @private
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */
  function createBaseFor(fromRight) {
    return function (object, iteratee, keysFunc) {
      var index = -1,
          iterable = Object(object),
          props = keysFunc(object),
          length = props.length;

      while (length--) {
        var key = props[fromRight ? length : ++index];

        if (iteratee(iterable[key], key, iterable) === false) {
          break;
        }
      }

      return object;
    };
  }

  var _createBaseFor = createBaseFor;

  /**
   * The base implementation of `baseForOwn` which iterates over `object`
   * properties returned by `keysFunc` and invokes `iteratee` for each property.
   * Iteratee functions may exit iteration early by explicitly returning `false`.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @returns {Object} Returns `object`.
   */

  var baseFor = _createBaseFor();
  var _baseFor = baseFor;

  var _cloneBuffer = createCommonjsModule(function (module, exports) {
    /** Detect free variable `exports`. */
    var freeExports =  exports && !exports.nodeType && exports;
    /** Detect free variable `module`. */

    var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;
    /** Detect the popular CommonJS extension `module.exports`. */

    var moduleExports = freeModule && freeModule.exports === freeExports;
    /** Built-in value references. */

    var Buffer = moduleExports ? _root.Buffer : undefined,
        allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;
    /**
     * Creates a clone of  `buffer`.
     *
     * @private
     * @param {Buffer} buffer The buffer to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Buffer} Returns the cloned buffer.
     */

    function cloneBuffer(buffer, isDeep) {
      if (isDeep) {
        return buffer.slice();
      }

      var length = buffer.length,
          result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
      buffer.copy(result);
      return result;
    }

    module.exports = cloneBuffer;
  });

  /** Built-in value references. */

  var Uint8Array$1 = _root.Uint8Array;
  var _Uint8Array = Uint8Array$1;

  /**
   * Creates a clone of `arrayBuffer`.
   *
   * @private
   * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
   * @returns {ArrayBuffer} Returns the cloned array buffer.
   */

  function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new _Uint8Array(result).set(new _Uint8Array(arrayBuffer));
    return result;
  }

  var _cloneArrayBuffer = cloneArrayBuffer;

  /**
   * Creates a clone of `typedArray`.
   *
   * @private
   * @param {Object} typedArray The typed array to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the cloned typed array.
   */

  function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? _cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }

  var _cloneTypedArray = cloneTypedArray;

  /**
   * Copies the values of `source` to `array`.
   *
   * @private
   * @param {Array} source The array to copy values from.
   * @param {Array} [array=[]] The array to copy values to.
   * @returns {Array} Returns `array`.
   */
  function copyArray(source, array) {
    var index = -1,
        length = source.length;
    array || (array = Array(length));

    while (++index < length) {
      array[index] = source[index];
    }

    return array;
  }

  var _copyArray = copyArray;

  /** Built-in value references. */

  var objectCreate = Object.create;
  /**
   * The base implementation of `_.create` without support for assigning
   * properties to the created object.
   *
   * @private
   * @param {Object} proto The object to inherit from.
   * @returns {Object} Returns the new object.
   */

  var baseCreate = function () {
    function object() {}

    return function (proto) {
      if (!isObject_1(proto)) {
        return {};
      }

      if (objectCreate) {
        return objectCreate(proto);
      }

      object.prototype = proto;
      var result = new object();
      object.prototype = undefined;
      return result;
    };
  }();

  var _baseCreate = baseCreate;

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function (arg) {
      return func(transform(arg));
    };
  }

  var _overArg = overArg;

  /** Built-in value references. */

  var getPrototype = _overArg(Object.getPrototypeOf, Object);
  var _getPrototype = getPrototype;

  /** Used for built-in method references. */
  var objectProto$5 = Object.prototype;
  /**
   * Checks if `value` is likely a prototype object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
   */

  function isPrototype(value) {
    var Ctor = value && value.constructor,
        proto = typeof Ctor == 'function' && Ctor.prototype || objectProto$5;
    return value === proto;
  }

  var _isPrototype = isPrototype;

  /**
   * Initializes an object clone.
   *
   * @private
   * @param {Object} object The object to clone.
   * @returns {Object} Returns the initialized clone.
   */

  function initCloneObject(object) {
    return typeof object.constructor == 'function' && !_isPrototype(object) ? _baseCreate(_getPrototype(object)) : {};
  }

  var _initCloneObject = initCloneObject;

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return value != null && _typeof(value) == 'object';
  }

  var isObjectLike_1 = isObjectLike;

  /** `Object#toString` result references. */

  var argsTag = '[object Arguments]';
  /**
   * The base implementation of `_.isArguments`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   */

  function baseIsArguments(value) {
    return isObjectLike_1(value) && _baseGetTag(value) == argsTag;
  }

  var _baseIsArguments = baseIsArguments;

  /** Used for built-in method references. */

  var objectProto$6 = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$4 = objectProto$6.hasOwnProperty;
  /** Built-in value references. */

  var propertyIsEnumerable = objectProto$6.propertyIsEnumerable;
  /**
   * Checks if `value` is likely an `arguments` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   *  else `false`.
   * @example
   *
   * _.isArguments(function() { return arguments; }());
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */

  var isArguments = _baseIsArguments(function () {
    return arguments;
  }()) ? _baseIsArguments : function (value) {
    return isObjectLike_1(value) && hasOwnProperty$4.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
  };
  var isArguments_1 = isArguments;

  /**
   * Checks if `value` is classified as an `Array` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array, else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * _.isArray(document.body.children);
   * // => false
   *
   * _.isArray('abc');
   * // => false
   *
   * _.isArray(_.noop);
   * // => false
   */
  var isArray = Array.isArray;
  var isArray_1 = isArray;

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER = 9007199254740991;
  /**
   * Checks if `value` is a valid array-like length.
   *
   * **Note:** This method is loosely based on
   * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
   * @example
   *
   * _.isLength(3);
   * // => true
   *
   * _.isLength(Number.MIN_VALUE);
   * // => false
   *
   * _.isLength(Infinity);
   * // => false
   *
   * _.isLength('3');
   * // => false
   */

  function isLength(value) {
    return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }

  var isLength_1 = isLength;

  /**
   * Checks if `value` is array-like. A value is considered array-like if it's
   * not a function and has a `value.length` that's an integer greater than or
   * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
   * @example
   *
   * _.isArrayLike([1, 2, 3]);
   * // => true
   *
   * _.isArrayLike(document.body.children);
   * // => true
   *
   * _.isArrayLike('abc');
   * // => true
   *
   * _.isArrayLike(_.noop);
   * // => false
   */

  function isArrayLike(value) {
    return value != null && isLength_1(value.length) && !isFunction_1(value);
  }

  var isArrayLike_1 = isArrayLike;

  /**
   * This method is like `_.isArrayLike` except that it also checks if `value`
   * is an object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array-like object,
   *  else `false`.
   * @example
   *
   * _.isArrayLikeObject([1, 2, 3]);
   * // => true
   *
   * _.isArrayLikeObject(document.body.children);
   * // => true
   *
   * _.isArrayLikeObject('abc');
   * // => false
   *
   * _.isArrayLikeObject(_.noop);
   * // => false
   */

  function isArrayLikeObject(value) {
    return isObjectLike_1(value) && isArrayLike_1(value);
  }

  var isArrayLikeObject_1 = isArrayLikeObject;

  /**
   * This method returns `false`.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {boolean} Returns `false`.
   * @example
   *
   * _.times(2, _.stubFalse);
   * // => [false, false]
   */
  function stubFalse() {
    return false;
  }

  var stubFalse_1 = stubFalse;

  var isBuffer_1 = createCommonjsModule(function (module, exports) {
    /** Detect free variable `exports`. */
    var freeExports =  exports && !exports.nodeType && exports;
    /** Detect free variable `module`. */

    var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;
    /** Detect the popular CommonJS extension `module.exports`. */

    var moduleExports = freeModule && freeModule.exports === freeExports;
    /** Built-in value references. */

    var Buffer = moduleExports ? _root.Buffer : undefined;
    /* Built-in method references for those with the same name as other `lodash` methods. */

    var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;
    /**
     * Checks if `value` is a buffer.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
     * @example
     *
     * _.isBuffer(new Buffer(2));
     * // => true
     *
     * _.isBuffer(new Uint8Array(2));
     * // => false
     */

    var isBuffer = nativeIsBuffer || stubFalse_1;
    module.exports = isBuffer;
  });

  /** `Object#toString` result references. */

  var objectTag = '[object Object]';
  /** Used for built-in method references. */

  var funcProto$2 = Function.prototype,
      objectProto$7 = Object.prototype;
  /** Used to resolve the decompiled source of functions. */

  var funcToString$2 = funcProto$2.toString;
  /** Used to check objects for own properties. */

  var hasOwnProperty$5 = objectProto$7.hasOwnProperty;
  /** Used to infer the `Object` constructor. */

  var objectCtorString = funcToString$2.call(Object);
  /**
   * Checks if `value` is a plain object, that is, an object created by the
   * `Object` constructor or one with a `[[Prototype]]` of `null`.
   *
   * @static
   * @memberOf _
   * @since 0.8.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   * }
   *
   * _.isPlainObject(new Foo);
   * // => false
   *
   * _.isPlainObject([1, 2, 3]);
   * // => false
   *
   * _.isPlainObject({ 'x': 0, 'y': 0 });
   * // => true
   *
   * _.isPlainObject(Object.create(null));
   * // => true
   */

  function isPlainObject(value) {
    if (!isObjectLike_1(value) || _baseGetTag(value) != objectTag) {
      return false;
    }

    var proto = _getPrototype(value);

    if (proto === null) {
      return true;
    }

    var Ctor = hasOwnProperty$5.call(proto, 'constructor') && proto.constructor;
    return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString$2.call(Ctor) == objectCtorString;
  }

  var isPlainObject_1 = isPlainObject;

  /** `Object#toString` result references. */

  var argsTag$1 = '[object Arguments]',
      arrayTag = '[object Array]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      funcTag$1 = '[object Function]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      objectTag$1 = '[object Object]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      weakMapTag = '[object WeakMap]';
  var arrayBufferTag = '[object ArrayBuffer]',
      dataViewTag = '[object DataView]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';
  /** Used to identify `toStringTag` values of typed arrays. */

  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag$1] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
  /**
   * The base implementation of `_.isTypedArray` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   */

  function baseIsTypedArray(value) {
    return isObjectLike_1(value) && isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
  }

  var _baseIsTypedArray = baseIsTypedArray;

  /**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */
  function baseUnary(func) {
    return function (value) {
      return func(value);
    };
  }

  var _baseUnary = baseUnary;

  var _nodeUtil = createCommonjsModule(function (module, exports) {
    /** Detect free variable `exports`. */
    var freeExports =  exports && !exports.nodeType && exports;
    /** Detect free variable `module`. */

    var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;
    /** Detect the popular CommonJS extension `module.exports`. */

    var moduleExports = freeModule && freeModule.exports === freeExports;
    /** Detect free variable `process` from Node.js. */

    var freeProcess = moduleExports && _freeGlobal.process;
    /** Used to access faster Node.js helpers. */

    var nodeUtil = function () {
      try {
        // Use `util.types` for Node.js 10+.
        var types = freeModule && freeModule.require && freeModule.require('util').types;

        if (types) {
          return types;
        } // Legacy `process.binding('util')` for Node.js < 10.


        return freeProcess && freeProcess.binding && freeProcess.binding('util');
      } catch (e) {}
    }();

    module.exports = nodeUtil;
  });

  /* Node.js helper references. */

  var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;
  /**
   * Checks if `value` is classified as a typed array.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   * @example
   *
   * _.isTypedArray(new Uint8Array);
   * // => true
   *
   * _.isTypedArray([]);
   * // => false
   */

  var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;
  var isTypedArray_1 = isTypedArray;

  /**
   * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function safeGet(object, key) {
    if (key === 'constructor' && typeof object[key] === 'function') {
      return;
    }

    if (key == '__proto__') {
      return;
    }

    return object[key];
  }

  var _safeGet = safeGet;

  /** Used for built-in method references. */

  var objectProto$8 = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$6 = objectProto$8.hasOwnProperty;
  /**
   * Assigns `value` to `key` of `object` if the existing value is not equivalent
   * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * for equality comparisons.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */

  function assignValue(object, key, value) {
    var objValue = object[key];

    if (!(hasOwnProperty$6.call(object, key) && eq_1(objValue, value)) || value === undefined && !(key in object)) {
      _baseAssignValue(object, key, value);
    }
  }

  var _assignValue = assignValue;

  /**
   * Copies properties of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy properties from.
   * @param {Array} props The property identifiers to copy.
   * @param {Object} [object={}] The object to copy properties to.
   * @param {Function} [customizer] The function to customize copied values.
   * @returns {Object} Returns `object`.
   */

  function copyObject(source, props, object, customizer) {
    var isNew = !object;
    object || (object = {});
    var index = -1,
        length = props.length;

    while (++index < length) {
      var key = props[index];
      var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;

      if (newValue === undefined) {
        newValue = source[key];
      }

      if (isNew) {
        _baseAssignValue(object, key, newValue);
      } else {
        _assignValue(object, key, newValue);
      }
    }

    return object;
  }

  var _copyObject = copyObject;

  /**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */
  function baseTimes(n, iteratee) {
    var index = -1,
        result = Array(n);

    while (++index < n) {
      result[index] = iteratee(index);
    }

    return result;
  }

  var _baseTimes = baseTimes;

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER$1 = 9007199254740991;
  /** Used to detect unsigned integer values. */

  var reIsUint = /^(?:0|[1-9]\d*)$/;
  /**
   * Checks if `value` is a valid array-like index.
   *
   * @private
   * @param {*} value The value to check.
   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
   */

  function isIndex(value, length) {
    var type = _typeof(value);

    length = length == null ? MAX_SAFE_INTEGER$1 : length;
    return !!length && (type == 'number' || type != 'symbol' && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
  }

  var _isIndex = isIndex;

  /** Used for built-in method references. */

  var objectProto$9 = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$7 = objectProto$9.hasOwnProperty;
  /**
   * Creates an array of the enumerable property names of the array-like `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @param {boolean} inherited Specify returning inherited property names.
   * @returns {Array} Returns the array of property names.
   */

  function arrayLikeKeys(value, inherited) {
    var isArr = isArray_1(value),
        isArg = !isArr && isArguments_1(value),
        isBuff = !isArr && !isArg && isBuffer_1(value),
        isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
        skipIndexes = isArr || isArg || isBuff || isType,
        result = skipIndexes ? _baseTimes(value.length, String) : [],
        length = result.length;

    for (var key in value) {
      if ((inherited || hasOwnProperty$7.call(value, key)) && !(skipIndexes && ( // Safari 9 has enumerable `arguments.length` in strict mode.
      key == 'length' || // Node.js 0.10 has enumerable non-index properties on buffers.
      isBuff && (key == 'offset' || key == 'parent') || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset') || // Skip index properties.
      _isIndex(key, length)))) {
        result.push(key);
      }
    }

    return result;
  }

  var _arrayLikeKeys = arrayLikeKeys;

  /**
   * This function is like
   * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * except that it includes inherited enumerable properties.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function nativeKeysIn(object) {
    var result = [];

    if (object != null) {
      for (var key in Object(object)) {
        result.push(key);
      }
    }

    return result;
  }

  var _nativeKeysIn = nativeKeysIn;

  /** Used for built-in method references. */

  var objectProto$a = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$8 = objectProto$a.hasOwnProperty;
  /**
   * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */

  function baseKeysIn(object) {
    if (!isObject_1(object)) {
      return _nativeKeysIn(object);
    }

    var isProto = _isPrototype(object),
        result = [];

    for (var key in object) {
      if (!(key == 'constructor' && (isProto || !hasOwnProperty$8.call(object, key)))) {
        result.push(key);
      }
    }

    return result;
  }

  var _baseKeysIn = baseKeysIn;

  /**
   * Creates an array of the own and inherited enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keysIn(new Foo);
   * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
   */

  function keysIn(object) {
    return isArrayLike_1(object) ? _arrayLikeKeys(object, true) : _baseKeysIn(object);
  }

  var keysIn_1 = keysIn;

  /**
   * Converts `value` to a plain object flattening inherited enumerable string
   * keyed properties of `value` to own properties of the plain object.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {Object} Returns the converted plain object.
   * @example
   *
   * function Foo() {
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.assign({ 'a': 1 }, new Foo);
   * // => { 'a': 1, 'b': 2 }
   *
   * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
   * // => { 'a': 1, 'b': 2, 'c': 3 }
   */

  function toPlainObject(value) {
    return _copyObject(value, keysIn_1(value));
  }

  var toPlainObject_1 = toPlainObject;

  /**
   * A specialized version of `baseMerge` for arrays and objects which performs
   * deep merges and tracks traversed objects enabling objects with circular
   * references to be merged.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @param {string} key The key of the value to merge.
   * @param {number} srcIndex The index of `source`.
   * @param {Function} mergeFunc The function to merge values.
   * @param {Function} [customizer] The function to customize assigned values.
   * @param {Object} [stack] Tracks traversed source values and their merged
   *  counterparts.
   */

  function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
    var objValue = _safeGet(object, key),
        srcValue = _safeGet(source, key),
        stacked = stack.get(srcValue);

    if (stacked) {
      _assignMergeValue(object, key, stacked);
      return;
    }

    var newValue = customizer ? customizer(objValue, srcValue, key + '', object, source, stack) : undefined;
    var isCommon = newValue === undefined;

    if (isCommon) {
      var isArr = isArray_1(srcValue),
          isBuff = !isArr && isBuffer_1(srcValue),
          isTyped = !isArr && !isBuff && isTypedArray_1(srcValue);
      newValue = srcValue;

      if (isArr || isBuff || isTyped) {
        if (isArray_1(objValue)) {
          newValue = objValue;
        } else if (isArrayLikeObject_1(objValue)) {
          newValue = _copyArray(objValue);
        } else if (isBuff) {
          isCommon = false;
          newValue = _cloneBuffer(srcValue, true);
        } else if (isTyped) {
          isCommon = false;
          newValue = _cloneTypedArray(srcValue, true);
        } else {
          newValue = [];
        }
      } else if (isPlainObject_1(srcValue) || isArguments_1(srcValue)) {
        newValue = objValue;

        if (isArguments_1(objValue)) {
          newValue = toPlainObject_1(objValue);
        } else if (!isObject_1(objValue) || isFunction_1(objValue)) {
          newValue = _initCloneObject(srcValue);
        }
      } else {
        isCommon = false;
      }
    }

    if (isCommon) {
      // Recursively merge objects and arrays (susceptible to call stack limits).
      stack.set(srcValue, newValue);
      mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
      stack['delete'](srcValue);
    }

    _assignMergeValue(object, key, newValue);
  }

  var _baseMergeDeep = baseMergeDeep;

  /**
   * The base implementation of `_.merge` without support for multiple sources.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @param {number} srcIndex The index of `source`.
   * @param {Function} [customizer] The function to customize merged values.
   * @param {Object} [stack] Tracks traversed source values and their merged
   *  counterparts.
   */

  function baseMerge(object, source, srcIndex, customizer, stack) {
    if (object === source) {
      return;
    }

    _baseFor(source, function (srcValue, key) {
      stack || (stack = new _Stack());

      if (isObject_1(srcValue)) {
        _baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
      } else {
        var newValue = customizer ? customizer(_safeGet(object, key), srcValue, key + '', object, source, stack) : undefined;

        if (newValue === undefined) {
          newValue = srcValue;
        }

        _assignMergeValue(object, key, newValue);
      }
    }, keysIn_1);
  }

  var _baseMerge = baseMerge;

  /**
   * Used by `_.defaultsDeep` to customize its `_.merge` use to merge source
   * objects into destination objects that are passed thru.
   *
   * @private
   * @param {*} objValue The destination value.
   * @param {*} srcValue The source value.
   * @param {string} key The key of the property to merge.
   * @param {Object} object The parent object of `objValue`.
   * @param {Object} source The parent object of `srcValue`.
   * @param {Object} [stack] Tracks traversed source values and their merged
   *  counterparts.
   * @returns {*} Returns the value to assign.
   */

  function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
    if (isObject_1(objValue) && isObject_1(srcValue)) {
      // Recursively merge objects and arrays (susceptible to call stack limits).
      stack.set(srcValue, objValue);
      _baseMerge(objValue, srcValue, undefined, customDefaultsMerge, stack);
      stack['delete'](srcValue);
    }

    return objValue;
  }

  var _customDefaultsMerge = customDefaultsMerge;

  /**
   * Checks if the given arguments are from an iteratee call.
   *
   * @private
   * @param {*} value The potential iteratee value argument.
   * @param {*} index The potential iteratee index or key argument.
   * @param {*} object The potential iteratee object argument.
   * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
   *  else `false`.
   */

  function isIterateeCall(value, index, object) {
    if (!isObject_1(object)) {
      return false;
    }

    var type = _typeof(index);

    if (type == 'number' ? isArrayLike_1(object) && _isIndex(index, object.length) : type == 'string' && index in object) {
      return eq_1(object[index], value);
    }

    return false;
  }

  var _isIterateeCall = isIterateeCall;

  /**
   * Creates a function like `_.assign`.
   *
   * @private
   * @param {Function} assigner The function to assign values.
   * @returns {Function} Returns the new assigner function.
   */

  function createAssigner(assigner) {
    return _baseRest(function (object, sources) {
      var index = -1,
          length = sources.length,
          customizer = length > 1 ? sources[length - 1] : undefined,
          guard = length > 2 ? sources[2] : undefined;
      customizer = assigner.length > 3 && typeof customizer == 'function' ? (length--, customizer) : undefined;

      if (guard && _isIterateeCall(sources[0], sources[1], guard)) {
        customizer = length < 3 ? undefined : customizer;
        length = 1;
      }

      object = Object(object);

      while (++index < length) {
        var source = sources[index];

        if (source) {
          assigner(object, source, index, customizer);
        }
      }

      return object;
    });
  }

  var _createAssigner = createAssigner;

  /**
   * This method is like `_.merge` except that it accepts `customizer` which
   * is invoked to produce the merged values of the destination and source
   * properties. If `customizer` returns `undefined`, merging is handled by the
   * method instead. The `customizer` is invoked with six arguments:
   * (objValue, srcValue, key, object, source, stack).
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} sources The source objects.
   * @param {Function} customizer The function to customize assigned values.
   * @returns {Object} Returns `object`.
   * @example
   *
   * function customizer(objValue, srcValue) {
   *   if (_.isArray(objValue)) {
   *     return objValue.concat(srcValue);
   *   }
   * }
   *
   * var object = { 'a': [1], 'b': [2] };
   * var other = { 'a': [3], 'b': [4] };
   *
   * _.mergeWith(object, other, customizer);
   * // => { 'a': [1, 3], 'b': [2, 4] }
   */

  var mergeWith = _createAssigner(function (object, source, srcIndex, customizer) {
    _baseMerge(object, source, srcIndex, customizer);
  });
  var mergeWith_1 = mergeWith;

  /**
   * This method is like `_.defaults` except that it recursively assigns
   * default properties.
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @since 3.10.0
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} [sources] The source objects.
   * @returns {Object} Returns `object`.
   * @see _.defaults
   * @example
   *
   * _.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });
   * // => { 'a': { 'b': 2, 'c': 3 } }
   */

  var defaultsDeep = _baseRest(function (args) {
    args.push(undefined, _customDefaultsMerge);
    return _apply(mergeWith_1, undefined, args);
  });
  var defaultsDeep_1 = defaultsDeep;

  var CustomEvent =
  /*#__PURE__*/
  function () {
    function CustomEvent(eventName) {
      _classCallCheck(this, CustomEvent);

      this.eventName = eventName;
      this.event = document.createEvent('Event');

      this._create();
    }

    _createClass(CustomEvent, [{
      key: "_create",
      value: function _create() {
        this.event.initEvent(this.eventName, true, true);
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(message) {
        this.event.message = message;
        document.dispatchEvent(this.event);
      }
    }]);

    return CustomEvent;
  }();

  /**
   * @function
   * @name getTime
   * @description - Получить текущее время.
   * @return {string}
   * @example '14:01'
   */

  function getTime() {
    var date = new Date();
    return "".concat(date.getHours(), ":").concat(date.getMinutes());
  }
  /**
   * @function
   * @name getElement
   * @description - Получить DOM элемент.
   * @param {string|HTMLElement} element - Селектор или HTMLElement
   * @return {HTMLElement}
   */


  function getElement(element) {
    return element ? typeof element === 'string' ? document.querySelector(element) : element : null;
  }
  /**
   * @function
   * @name scrollTo
   * @description - Проскролить до нужного элемента.
   * @param {string|HTMLElement} container - Селектор или HTMLElement скроллбара
   * @param {string|HTMLElement} target - Селектор или HTMLElement элемента к которому нужно проскролить
   */


  function scrollTo(container, target) {
    container = getElement(container);
    target = getElement(target);
    container.scrollTop = target.offsetTop;
  }

  var _global = createCommonjsModule(function (module) {
    // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
    var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self // eslint-disable-next-line no-new-func
    : Function('return this')();
    if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
  });

  var hasOwnProperty$9 = {}.hasOwnProperty;

  var _has = function _has(it, key) {
    return hasOwnProperty$9.call(it, key);
  };

  var _fails = function _fails(exec) {
    try {
      return !!exec();
    } catch (e) {
      return true;
    }
  };

  var _descriptors = !_fails(function () {
    return Object.defineProperty({}, 'a', {
      get: function get() {
        return 7;
      }
    }).a != 7;
  });

  var _core = createCommonjsModule(function (module) {
    var core = module.exports = {
      version: '2.6.11'
    };
    if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
  });
  var _core_1 = _core.version;

  var _isObject = function _isObject(it) {
    return _typeof(it) === 'object' ? it !== null : typeof it === 'function';
  };

  var _anObject = function _anObject(it) {
    if (!_isObject(it)) throw TypeError(it + ' is not an object!');
    return it;
  };

  var document$1 = _global.document; // typeof document.createElement is 'object' in old IE

  var is = _isObject(document$1) && _isObject(document$1.createElement);

  var _domCreate = function _domCreate(it) {
    return is ? document$1.createElement(it) : {};
  };

  var _ie8DomDefine = !_descriptors && !_fails(function () {
    return Object.defineProperty(_domCreate('div'), 'a', {
      get: function get() {
        return 7;
      }
    }).a != 7;
  });

  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string

  var _toPrimitive = function _toPrimitive(it, S) {
    if (!_isObject(it)) return it;
    var fn, val;
    if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
    if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
    if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var dP = Object.defineProperty;
  var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
    _anObject(O);
    P = _toPrimitive(P, true);
    _anObject(Attributes);
    if (_ie8DomDefine) try {
      return dP(O, P, Attributes);
    } catch (e) {
      /* empty */
    }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };
  var _objectDp = {
    f: f
  };

  var _propertyDesc = function _propertyDesc(bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var _hide = _descriptors ? function (object, key, value) {
    return _objectDp.f(object, key, _propertyDesc(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var id = 0;
  var px = Math.random();

  var _uid = function _uid(key) {
    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
  };

  var _library = false;

  var _shared = createCommonjsModule(function (module) {
    var SHARED = '__core-js_shared__';
    var store = _global[SHARED] || (_global[SHARED] = {});
    (module.exports = function (key, value) {
      return store[key] || (store[key] = value !== undefined ? value : {});
    })('versions', []).push({
      version: _core.version,
      mode:  'global',
      copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
    });
  });

  var _functionToString = _shared('native-function-to-string', Function.toString);

  var _redefine = createCommonjsModule(function (module) {
    var SRC = _uid('src');
    var TO_STRING = 'toString';
    var TPL = ('' + _functionToString).split(TO_STRING);

    _core.inspectSource = function (it) {
      return _functionToString.call(it);
    };

    (module.exports = function (O, key, val, safe) {
      var isFunction = typeof val == 'function';
      if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
      if (O[key] === val) return;
      if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));

      if (O === _global) {
        O[key] = val;
      } else if (!safe) {
        delete O[key];
        _hide(O, key, val);
      } else if (O[key]) {
        O[key] = val;
      } else {
        _hide(O, key, val);
      } // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative

    })(Function.prototype, TO_STRING, function toString() {
      return typeof this == 'function' && this[SRC] || _functionToString.call(this);
    });
  });

  var _aFunction = function _aFunction(it) {
    if (typeof it != 'function') throw TypeError(it + ' is not a function!');
    return it;
  };

  var _ctx = function _ctx(fn, that, length) {
    _aFunction(fn);
    if (that === undefined) return fn;

    switch (length) {
      case 1:
        return function (a) {
          return fn.call(that, a);
        };

      case 2:
        return function (a, b) {
          return fn.call(that, a, b);
        };

      case 3:
        return function (a, b, c) {
          return fn.call(that, a, b, c);
        };
    }

    return function ()
    /* ...args */
    {
      return fn.apply(that, arguments);
    };
  };

  var PROTOTYPE = 'prototype';

  var $export = function $export(type, name, source) {
    var IS_FORCED = type & $export.F;
    var IS_GLOBAL = type & $export.G;
    var IS_STATIC = type & $export.S;
    var IS_PROTO = type & $export.P;
    var IS_BIND = type & $export.B;
    var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
    var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
    var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
    var key, own, out, exp;
    if (IS_GLOBAL) source = name;

    for (key in source) {
      // contains in native
      own = !IS_FORCED && target && target[key] !== undefined; // export native or passed

      out = (own ? target : source)[key]; // bind timers to global for call from export context

      exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out; // extend global

      if (target) _redefine(target, key, out, type & $export.U); // export

      if (exports[key] != out) _hide(exports, key, exp);
      if (IS_PROTO && expProto[key] != out) expProto[key] = out;
    }
  };

  _global.core = _core; // type bitmap

  $export.F = 1; // forced

  $export.G = 2; // global

  $export.S = 4; // static

  $export.P = 8; // proto

  $export.B = 16; // bind

  $export.W = 32; // wrap

  $export.U = 64; // safe

  $export.R = 128; // real proto method for `library`

  var _export = $export;

  var _meta = createCommonjsModule(function (module) {
    var META = _uid('meta');
    var setDesc = _objectDp.f;
    var id = 0;

    var isExtensible = Object.isExtensible || function () {
      return true;
    };

    var FREEZE = !_fails(function () {
      return isExtensible(Object.preventExtensions({}));
    });

    var setMeta = function setMeta(it) {
      setDesc(it, META, {
        value: {
          i: 'O' + ++id,
          // object ID
          w: {} // weak collections IDs

        }
      });
    };

    var fastKey = function fastKey(it, create) {
      // return primitive with prefix
      if (!_isObject(it)) return _typeof(it) == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;

      if (!_has(it, META)) {
        // can't set metadata to uncaught frozen object
        if (!isExtensible(it)) return 'F'; // not necessary to add metadata

        if (!create) return 'E'; // add missing metadata

        setMeta(it); // return object ID
      }

      return it[META].i;
    };

    var getWeak = function getWeak(it, create) {
      if (!_has(it, META)) {
        // can't set metadata to uncaught frozen object
        if (!isExtensible(it)) return true; // not necessary to add metadata

        if (!create) return false; // add missing metadata

        setMeta(it); // return hash weak collections IDs
      }

      return it[META].w;
    }; // add metadata on freeze-family methods calling


    var onFreeze = function onFreeze(it) {
      if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
      return it;
    };

    var meta = module.exports = {
      KEY: META,
      NEED: false,
      fastKey: fastKey,
      getWeak: getWeak,
      onFreeze: onFreeze
    };
  });
  var _meta_1 = _meta.KEY;
  var _meta_2 = _meta.NEED;
  var _meta_3 = _meta.fastKey;
  var _meta_4 = _meta.getWeak;
  var _meta_5 = _meta.onFreeze;

  var _wks = createCommonjsModule(function (module) {
    var store = _shared('wks');
    var _Symbol = _global.Symbol;
    var USE_SYMBOL = typeof _Symbol == 'function';

    var $exports = module.exports = function (name) {
      return store[name] || (store[name] = USE_SYMBOL && _Symbol[name] || (USE_SYMBOL ? _Symbol : _uid)('Symbol.' + name));
    };

    $exports.store = store;
  });

  var def = _objectDp.f;
  var TAG = _wks('toStringTag');

  var _setToStringTag = function _setToStringTag(it, tag, stat) {
    if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, {
      configurable: true,
      value: tag
    });
  };

  var f$1 = _wks;
  var _wksExt = {
    f: f$1
  };

  var defineProperty$1 = _objectDp.f;

  var _wksDefine = function _wksDefine(name) {
    var $Symbol = _core.Symbol || (_core.Symbol =  _global.Symbol || {});
    if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty$1($Symbol, name, {
      value: _wksExt.f(name)
    });
  };

  var toString = {}.toString;

  var _cof = function _cof(it) {
    return toString.call(it).slice(8, -1);
  };

  // eslint-disable-next-line no-prototype-builtins

  var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
    return _cof(it) == 'String' ? it.split('') : Object(it);
  };

  // 7.2.1 RequireObjectCoercible(argument)
  var _defined = function _defined(it) {
    if (it == undefined) throw TypeError("Can't call method on  " + it);
    return it;
  };

  var _toIobject = function _toIobject(it) {
    return _iobject(_defined(it));
  };

  // 7.1.4 ToInteger
  var ceil = Math.ceil;
  var floor = Math.floor;

  var _toInteger = function _toInteger(it) {
    return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
  };

  var min = Math.min;

  var _toLength = function _toLength(it) {
    return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
  };

  var max = Math.max;
  var min$1 = Math.min;

  var _toAbsoluteIndex = function _toAbsoluteIndex(index, length) {
    index = _toInteger(index);
    return index < 0 ? max(index + length, 0) : min$1(index, length);
  };

  // true  -> Array#includes

  var _arrayIncludes = function _arrayIncludes(IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = _toIobject($this);
      var length = _toLength(O.length);
      var index = _toAbsoluteIndex(fromIndex, length);
      var value; // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare

      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++]; // eslint-disable-next-line no-self-compare

        if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
      } else for (; length > index; index++) {
        if (IS_INCLUDES || index in O) {
          if (O[index] === el) return IS_INCLUDES || index || 0;
        }
      }
      return !IS_INCLUDES && -1;
    };
  };

  var shared = _shared('keys');

  var _sharedKey = function _sharedKey(key) {
    return shared[key] || (shared[key] = _uid(key));
  };

  var arrayIndexOf = _arrayIncludes(false);
  var IE_PROTO = _sharedKey('IE_PROTO');

  var _objectKeysInternal = function _objectKeysInternal(object, names) {
    var O = _toIobject(object);
    var i = 0;
    var result = [];
    var key;

    for (key in O) {
      if (key != IE_PROTO) _has(O, key) && result.push(key);
    } // Don't enum bug & hidden keys


    while (names.length > i) {
      if (_has(O, key = names[i++])) {
        ~arrayIndexOf(result, key) || result.push(key);
      }
    }

    return result;
  };

  // IE 8- don't enum bug keys
  var _enumBugKeys = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');

  var _objectKeys = Object.keys || function keys(O) {
    return _objectKeysInternal(O, _enumBugKeys);
  };

  var f$2 = Object.getOwnPropertySymbols;
  var _objectGops = {
    f: f$2
  };

  var f$3 = {}.propertyIsEnumerable;
  var _objectPie = {
    f: f$3
  };

  var _enumKeys = function _enumKeys(it) {
    var result = _objectKeys(it);
    var getSymbols = _objectGops.f;

    if (getSymbols) {
      var symbols = getSymbols(it);
      var isEnum = _objectPie.f;
      var i = 0;
      var key;

      while (symbols.length > i) {
        if (isEnum.call(it, key = symbols[i++])) result.push(key);
      }
    }

    return result;
  };

  var _isArray = Array.isArray || function isArray(arg) {
    return _cof(arg) == 'Array';
  };

  var _toObject = function _toObject(it) {
    return Object(_defined(it));
  };

  var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
    _anObject(O);
    var keys = _objectKeys(Properties);
    var length = keys.length;
    var i = 0;
    var P;

    while (length > i) {
      _objectDp.f(O, P = keys[i++], Properties[P]);
    }

    return O;
  };

  var document$2 = _global.document;

  var _html = document$2 && document$2.documentElement;

  var IE_PROTO$1 = _sharedKey('IE_PROTO');

  var Empty = function Empty() {
    /* empty */
  };

  var PROTOTYPE$1 = 'prototype'; // Create object with fake `null` prototype: use iframe Object with cleared prototype

  var _createDict = function createDict() {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = _domCreate('iframe');
    var i = _enumBugKeys.length;
    var lt = '<';
    var gt = '>';
    var iframeDocument;
    iframe.style.display = 'none';
    _html.appendChild(iframe);
    iframe.src = 'javascript:'; // eslint-disable-line no-script-url
    // createDict = iframe.contentWindow.Object;
    // html.removeChild(iframe);

    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
    iframeDocument.close();
    _createDict = iframeDocument.F;

    while (i--) {
      delete _createDict[PROTOTYPE$1][_enumBugKeys[i]];
    }

    return _createDict();
  };

  var _objectCreate = Object.create || function create(O, Properties) {
    var result;

    if (O !== null) {
      Empty[PROTOTYPE$1] = _anObject(O);
      result = new Empty();
      Empty[PROTOTYPE$1] = null; // add "__proto__" for Object.getPrototypeOf polyfill

      result[IE_PROTO$1] = O;
    } else result = _createDict();

    return Properties === undefined ? result : _objectDps(result, Properties);
  };

  var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

  var f$4 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return _objectKeysInternal(O, hiddenKeys);
  };

  var _objectGopn = {
    f: f$4
  };

  var gOPN = _objectGopn.f;
  var toString$1 = {}.toString;
  var windowNames = (typeof window === "undefined" ? "undefined" : _typeof(window)) == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

  var getWindowNames = function getWindowNames(it) {
    try {
      return gOPN(it);
    } catch (e) {
      return windowNames.slice();
    }
  };

  var f$5 = function getOwnPropertyNames(it) {
    return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(_toIobject(it));
  };

  var _objectGopnExt = {
    f: f$5
  };

  var gOPD = Object.getOwnPropertyDescriptor;
  var f$6 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
    O = _toIobject(O);
    P = _toPrimitive(P, true);
    if (_ie8DomDefine) try {
      return gOPD(O, P);
    } catch (e) {
      /* empty */
    }
    if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
  };
  var _objectGopd = {
    f: f$6
  };

  var META = _meta.KEY;
  var gOPD$1 = _objectGopd.f;
  var dP$1 = _objectDp.f;
  var gOPN$1 = _objectGopnExt.f;
  var $Symbol = _global.Symbol;
  var $JSON = _global.JSON;

  var _stringify = $JSON && $JSON.stringify;

  var PROTOTYPE$2 = 'prototype';
  var HIDDEN = _wks('_hidden');
  var TO_PRIMITIVE = _wks('toPrimitive');
  var isEnum = {}.propertyIsEnumerable;
  var SymbolRegistry = _shared('symbol-registry');
  var AllSymbols = _shared('symbols');
  var OPSymbols = _shared('op-symbols');
  var ObjectProto = Object[PROTOTYPE$2];
  var USE_NATIVE = typeof $Symbol == 'function' && !!_objectGops.f;
  var QObject = _global.QObject; // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173

  var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild; // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687

  var setSymbolDesc = _descriptors && _fails(function () {
    return _objectCreate(dP$1({}, 'a', {
      get: function get() {
        return dP$1(this, 'a', {
          value: 7
        }).a;
      }
    })).a != 7;
  }) ? function (it, key, D) {
    var protoDesc = gOPD$1(ObjectProto, key);
    if (protoDesc) delete ObjectProto[key];
    dP$1(it, key, D);
    if (protoDesc && it !== ObjectProto) dP$1(ObjectProto, key, protoDesc);
  } : dP$1;

  var wrap = function wrap(tag) {
    var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]);

    sym._k = tag;
    return sym;
  };

  var isSymbol = USE_NATIVE && _typeof($Symbol.iterator) == 'symbol' ? function (it) {
    return _typeof(it) == 'symbol';
  } : function (it) {
    return it instanceof $Symbol;
  };

  var $defineProperty = function defineProperty(it, key, D) {
    if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
    _anObject(it);
    key = _toPrimitive(key, true);
    _anObject(D);

    if (_has(AllSymbols, key)) {
      if (!D.enumerable) {
        if (!_has(it, HIDDEN)) dP$1(it, HIDDEN, _propertyDesc(1, {}));
        it[HIDDEN][key] = true;
      } else {
        if (_has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
        D = _objectCreate(D, {
          enumerable: _propertyDesc(0, false)
        });
      }

      return setSymbolDesc(it, key, D);
    }

    return dP$1(it, key, D);
  };

  var $defineProperties = function defineProperties(it, P) {
    _anObject(it);
    var keys = _enumKeys(P = _toIobject(P));
    var i = 0;
    var l = keys.length;
    var key;

    while (l > i) {
      $defineProperty(it, key = keys[i++], P[key]);
    }

    return it;
  };

  var $create = function create(it, P) {
    return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
  };

  var $propertyIsEnumerable = function propertyIsEnumerable(key) {
    var E = isEnum.call(this, key = _toPrimitive(key, true));
    if (this === ObjectProto && _has(AllSymbols, key) && !_has(OPSymbols, key)) return false;
    return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
  };

  var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
    it = _toIobject(it);
    key = _toPrimitive(key, true);
    if (it === ObjectProto && _has(AllSymbols, key) && !_has(OPSymbols, key)) return;
    var D = gOPD$1(it, key);
    if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
    return D;
  };

  var $getOwnPropertyNames = function getOwnPropertyNames(it) {
    var names = gOPN$1(_toIobject(it));
    var result = [];
    var i = 0;
    var key;

    while (names.length > i) {
      if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
    }

    return result;
  };

  var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
    var IS_OP = it === ObjectProto;
    var names = gOPN$1(IS_OP ? OPSymbols : _toIobject(it));
    var result = [];
    var i = 0;
    var key;

    while (names.length > i) {
      if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
    }

    return result;
  }; // 19.4.1.1 Symbol([description])


  if (!USE_NATIVE) {
    $Symbol = function _Symbol() {
      if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
      var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);

      var $set = function $set(value) {
        if (this === ObjectProto) $set.call(OPSymbols, value);
        if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
        setSymbolDesc(this, tag, _propertyDesc(1, value));
      };

      if (_descriptors && setter) setSymbolDesc(ObjectProto, tag, {
        configurable: true,
        set: $set
      });
      return wrap(tag);
    };

    _redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
      return this._k;
    });
    _objectGopd.f = $getOwnPropertyDescriptor;
    _objectDp.f = $defineProperty;
    _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
    _objectPie.f = $propertyIsEnumerable;
    _objectGops.f = $getOwnPropertySymbols;

    if (_descriptors && !_library) {
      _redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
    }

    _wksExt.f = function (name) {
      return wrap(_wks(name));
    };
  }

  _export(_export.G + _export.W + _export.F * !USE_NATIVE, {
    Symbol: $Symbol
  });

  for (var es6Symbols = // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(','), j = 0; es6Symbols.length > j;) {
    _wks(es6Symbols[j++]);
  }

  for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) {
    _wksDefine(wellKnownSymbols[k++]);
  }

  _export(_export.S + _export.F * !USE_NATIVE, 'Symbol', {
    // 19.4.2.1 Symbol.for(key)
    'for': function _for(key) {
      return _has(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
    },
    // 19.4.2.5 Symbol.keyFor(sym)
    keyFor: function keyFor(sym) {
      if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');

      for (var key in SymbolRegistry) {
        if (SymbolRegistry[key] === sym) return key;
      }
    },
    useSetter: function useSetter() {
      setter = true;
    },
    useSimple: function useSimple() {
      setter = false;
    }
  });
  _export(_export.S + _export.F * !USE_NATIVE, 'Object', {
    // 19.1.2.2 Object.create(O [, Properties])
    create: $create,
    // 19.1.2.4 Object.defineProperty(O, P, Attributes)
    defineProperty: $defineProperty,
    // 19.1.2.3 Object.defineProperties(O, Properties)
    defineProperties: $defineProperties,
    // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
    getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
    // 19.1.2.7 Object.getOwnPropertyNames(O)
    getOwnPropertyNames: $getOwnPropertyNames,
    // 19.1.2.8 Object.getOwnPropertySymbols(O)
    getOwnPropertySymbols: $getOwnPropertySymbols
  }); // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
  // https://bugs.chromium.org/p/v8/issues/detail?id=3443

  var FAILS_ON_PRIMITIVES = _fails(function () {
    _objectGops.f(1);
  });
  _export(_export.S + _export.F * FAILS_ON_PRIMITIVES, 'Object', {
    getOwnPropertySymbols: function getOwnPropertySymbols(it) {
      return _objectGops.f(_toObject(it));
    }
  }); // 24.3.2 JSON.stringify(value [, replacer [, space]])

  $JSON && _export(_export.S + _export.F * (!USE_NATIVE || _fails(function () {
    var S = $Symbol(); // MS Edge converts symbol values to JSON as {}
    // WebKit converts symbol values to JSON as null
    // V8 throws on boxed symbols

    return _stringify([S]) != '[null]' || _stringify({
      a: S
    }) != '{}' || _stringify(Object(S)) != '{}';
  })), 'JSON', {
    stringify: function stringify(it) {
      var args = [it];
      var i = 1;
      var replacer, $replacer;

      while (arguments.length > i) {
        args.push(arguments[i++]);
      }

      $replacer = replacer = args[1];
      if (!_isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined

      if (!_isArray(replacer)) replacer = function replacer(key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return _stringify.apply($JSON, args);
    }
  }); // 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)

  $Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf); // 19.4.3.5 Symbol.prototype[@@toStringTag]

  _setToStringTag($Symbol, 'Symbol'); // 20.2.1.9 Math[@@toStringTag]

  _setToStringTag(Math, 'Math', true); // 24.3.3 JSON[@@toStringTag]

  _setToStringTag(_global.JSON, 'JSON', true);

  _export(_export.S, 'Object', {
    create: _objectCreate
  });

  _export(_export.S + _export.F * !_descriptors, 'Object', {
    defineProperty: _objectDp.f
  });

  _export(_export.S + _export.F * !_descriptors, 'Object', {
    defineProperties: _objectDps
  });

  var _objectSap = function _objectSap(KEY, exec) {
    var fn = (_core.Object || {})[KEY] || Object[KEY];
    var exp = {};
    exp[KEY] = exec(fn);
    _export(_export.S + _export.F * _fails(function () {
      fn(1);
    }), 'Object', exp);
  };

  var $getOwnPropertyDescriptor$1 = _objectGopd.f;
  _objectSap('getOwnPropertyDescriptor', function () {
    return function getOwnPropertyDescriptor(it, key) {
      return $getOwnPropertyDescriptor$1(_toIobject(it), key);
    };
  });

  var IE_PROTO$2 = _sharedKey('IE_PROTO');
  var ObjectProto$1 = Object.prototype;

  var _objectGpo = Object.getPrototypeOf || function (O) {
    O = _toObject(O);
    if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];

    if (typeof O.constructor == 'function' && O instanceof O.constructor) {
      return O.constructor.prototype;
    }

    return O instanceof Object ? ObjectProto$1 : null;
  };

  _objectSap('getPrototypeOf', function () {
    return function getPrototypeOf(it) {
      return _objectGpo(_toObject(it));
    };
  });

  _objectSap('keys', function () {
    return function keys(it) {
      return _objectKeys(_toObject(it));
    };
  });

  _objectSap('getOwnPropertyNames', function () {
    return _objectGopnExt.f;
  });

  var meta = _meta.onFreeze;
  _objectSap('freeze', function ($freeze) {
    return function freeze(it) {
      return $freeze && _isObject(it) ? $freeze(meta(it)) : it;
    };
  });

  var meta$1 = _meta.onFreeze;
  _objectSap('seal', function ($seal) {
    return function seal(it) {
      return $seal && _isObject(it) ? $seal(meta$1(it)) : it;
    };
  });

  var meta$2 = _meta.onFreeze;
  _objectSap('preventExtensions', function ($preventExtensions) {
    return function preventExtensions(it) {
      return $preventExtensions && _isObject(it) ? $preventExtensions(meta$2(it)) : it;
    };
  });

  _objectSap('isFrozen', function ($isFrozen) {
    return function isFrozen(it) {
      return _isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
    };
  });

  _objectSap('isSealed', function ($isSealed) {
    return function isSealed(it) {
      return _isObject(it) ? $isSealed ? $isSealed(it) : false : true;
    };
  });

  _objectSap('isExtensible', function ($isExtensible) {
    return function isExtensible(it) {
      return _isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
    };
  });

  var $assign = Object.assign; // should work with symbols and should have deterministic property order (V8 bug)

  var _objectAssign = !$assign || _fails(function () {
    var A = {};
    var B = {}; // eslint-disable-next-line no-undef

    var S = Symbol();
    var K = 'abcdefghijklmnopqrst';
    A[S] = 7;
    K.split('').forEach(function (k) {
      B[k] = k;
    });
    return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
  }) ? function assign(target, source) {
    // eslint-disable-line no-unused-vars
    var T = _toObject(target);
    var aLen = arguments.length;
    var index = 1;
    var getSymbols = _objectGops.f;
    var isEnum = _objectPie.f;

    while (aLen > index) {
      var S = _iobject(arguments[index++]);
      var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
      var length = keys.length;
      var j = 0;
      var key;

      while (length > j) {
        key = keys[j++];
        if (!_descriptors || isEnum.call(S, key)) T[key] = S[key];
      }
    }

    return T;
  } : $assign;

  _export(_export.S + _export.F, 'Object', {
    assign: _objectAssign
  });

  // 7.2.9 SameValue(x, y)
  var _sameValue = Object.is || function is(x, y) {
    // eslint-disable-next-line no-self-compare
    return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
  };

  _export(_export.S, 'Object', {
    is: _sameValue
  });

  /* eslint-disable no-proto */

  var check = function check(O, proto) {
    _anObject(O);
    if (!_isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
  };

  var _setProto = {
    set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) {
        buggy = true;
      }

      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
    check: check
  };

  _export(_export.S, 'Object', {
    setPrototypeOf: _setProto.set
  });

  var TAG$1 = _wks('toStringTag'); // ES3 wrong here

  var ARG = _cof(function () {
    return arguments;
  }()) == 'Arguments'; // fallback for IE11 Script Access Denied error

  var tryGet = function tryGet(it, key) {
    try {
      return it[key];
    } catch (e) {
      /* empty */
    }
  };

  var _classof = function _classof(it) {
    var O, T, B;
    return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T // builtinTag case
    : ARG ? _cof(O) // ES3 arguments fallback
    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
  };

  var test = {};
  test[_wks('toStringTag')] = 'z';

  if (test + '' != '[object z]') {
    _redefine(Object.prototype, 'toString', function toString() {
      return '[object ' + _classof(this) + ']';
    }, true);
  }

  // fast apply, http://jsperf.lnkit.com/fast-apply/5
  var _invoke = function _invoke(fn, args, that) {
    var un = that === undefined;

    switch (args.length) {
      case 0:
        return un ? fn() : fn.call(that);

      case 1:
        return un ? fn(args[0]) : fn.call(that, args[0]);

      case 2:
        return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);

      case 3:
        return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);

      case 4:
        return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
    }

    return fn.apply(that, args);
  };

  var arraySlice = [].slice;
  var factories = {};

  var construct = function construct(F, len, args) {
    if (!(len in factories)) {
      for (var n = [], i = 0; i < len; i++) {
        n[i] = 'a[' + i + ']';
      } // eslint-disable-next-line no-new-func


      factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
    }

    return factories[len](F, args);
  };

  var _bind = Function.bind || function bind(that
  /* , ...args */
  ) {
    var fn = _aFunction(this);
    var partArgs = arraySlice.call(arguments, 1);

    var bound = function bound()
    /* args... */
    {
      var args = partArgs.concat(arraySlice.call(arguments));
      return this instanceof bound ? construct(fn, args.length, args) : _invoke(fn, args, that);
    };

    if (_isObject(fn.prototype)) bound.prototype = fn.prototype;
    return bound;
  };

  _export(_export.P, 'Function', {
    bind: _bind
  });

  var dP$2 = _objectDp.f;
  var FProto = Function.prototype;
  var nameRE = /^\s*function ([^ (]*)/;
  var NAME = 'name'; // 19.2.4.2 name

  NAME in FProto || _descriptors && dP$2(FProto, NAME, {
    configurable: true,
    get: function get() {
      try {
        return ('' + this).match(nameRE)[1];
      } catch (e) {
        return '';
      }
    }
  });

  var HAS_INSTANCE = _wks('hasInstance');
  var FunctionProto = Function.prototype; // 19.2.3.6 Function.prototype[@@hasInstance](V)

  if (!(HAS_INSTANCE in FunctionProto)) _objectDp.f(FunctionProto, HAS_INSTANCE, {
    value: function value(O) {
      if (typeof this != 'function' || !_isObject(O)) return false;
      if (!_isObject(this.prototype)) return O instanceof this; // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:

      while (O = _objectGpo(O)) {
        if (this.prototype === O) return true;
      }

      return false;
    }
  });

  var _stringWs = "\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003" + "\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";

  var space = '[' + _stringWs + ']';
  var non = "\u200B\x85";
  var ltrim = RegExp('^' + space + space + '*');
  var rtrim = RegExp(space + space + '*$');

  var exporter = function exporter(KEY, exec, ALIAS) {
    var exp = {};
    var FORCE = _fails(function () {
      return !!_stringWs[KEY]() || non[KEY]() != non;
    });
    var fn = exp[KEY] = FORCE ? exec(trim) : _stringWs[KEY];
    if (ALIAS) exp[ALIAS] = fn;
    _export(_export.P + _export.F * FORCE, 'String', exp);
  }; // 1 -> String#trimLeft
  // 2 -> String#trimRight
  // 3 -> String#trim


  var trim = exporter.trim = function (string, TYPE) {
    string = String(_defined(string));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };

  var _stringTrim = exporter;

  var $parseInt = _global.parseInt;
  var $trim = _stringTrim.trim;
  var hex = /^[-+]?0[xX]/;

  var _parseInt = $parseInt(_stringWs + '08') !== 8 || $parseInt(_stringWs + '0x16') !== 22 ? function parseInt(str, radix) {
    var string = $trim(String(str), 3);
    return $parseInt(string, radix >>> 0 || (hex.test(string) ? 16 : 10));
  } : $parseInt;

  _export(_export.G + _export.F * (parseInt != _parseInt), {
    parseInt: _parseInt
  });

  var $parseFloat = _global.parseFloat;
  var $trim$1 = _stringTrim.trim;

  var _parseFloat = 1 / $parseFloat(_stringWs + '-0') !== -Infinity ? function parseFloat(str) {
    var string = $trim$1(String(str), 3);
    var result = $parseFloat(string);
    return result === 0 && string.charAt(0) == '-' ? -0 : result;
  } : $parseFloat;

  _export(_export.G + _export.F * (parseFloat != _parseFloat), {
    parseFloat: _parseFloat
  });

  var setPrototypeOf = _setProto.set;

  var _inheritIfRequired = function _inheritIfRequired(that, target, C) {
    var S = target.constructor;
    var P;

    if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && _isObject(P) && setPrototypeOf) {
      setPrototypeOf(that, P);
    }

    return that;
  };

  var gOPN$2 = _objectGopn.f;
  var gOPD$2 = _objectGopd.f;
  var dP$3 = _objectDp.f;
  var $trim$2 = _stringTrim.trim;
  var NUMBER = 'Number';
  var $Number = _global[NUMBER];
  var Base = $Number;
  var proto = $Number.prototype; // Opera ~12 has broken Object#toString

  var BROKEN_COF = _cof(_objectCreate(proto)) == NUMBER;
  var TRIM = 'trim' in String.prototype; // 7.1.3 ToNumber(argument)

  var toNumber = function toNumber(argument) {
    var it = _toPrimitive(argument, false);

    if (typeof it == 'string' && it.length > 2) {
      it = TRIM ? it.trim() : $trim$2(it, 3);
      var first = it.charCodeAt(0);
      var third, radix, maxCode;

      if (first === 43 || first === 45) {
        third = it.charCodeAt(2);
        if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
      } else if (first === 48) {
        switch (it.charCodeAt(1)) {
          case 66:
          case 98:
            radix = 2;
            maxCode = 49;
            break;
          // fast equal /^0b[01]+$/i

          case 79:
          case 111:
            radix = 8;
            maxCode = 55;
            break;
          // fast equal /^0o[0-7]+$/i

          default:
            return +it;
        }

        for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
          code = digits.charCodeAt(i); // parseInt parses a string to a first unavailable symbol
          // but ToNumber should return NaN if a string contains unavailable symbols

          if (code < 48 || code > maxCode) return NaN;
        }

        return parseInt(digits, radix);
      }
    }

    return +it;
  };

  if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
    $Number = function Number(value) {
      var it = arguments.length < 1 ? 0 : value;
      var that = this;
      return that instanceof $Number // check on 1..constructor(foo) case
      && (BROKEN_COF ? _fails(function () {
        proto.valueOf.call(that);
      }) : _cof(that) != NUMBER) ? _inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
    };

    for (var keys = _descriptors ? gOPN$2(Base) : ( // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' + // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' + 'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger').split(','), j$1 = 0, key; keys.length > j$1; j$1++) {
      if (_has(Base, key = keys[j$1]) && !_has($Number, key)) {
        dP$3($Number, key, gOPD$2(Base, key));
      }
    }

    $Number.prototype = proto;
    proto.constructor = $Number;
    _redefine(_global, NUMBER, $Number);
  }

  var _aNumberValue = function _aNumberValue(it, msg) {
    if (typeof it != 'number' && _cof(it) != 'Number') throw TypeError(msg);
    return +it;
  };

  var _stringRepeat = function repeat(count) {
    var str = String(_defined(this));
    var res = '';
    var n = _toInteger(count);
    if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");

    for (; n > 0; (n >>>= 1) && (str += str)) {
      if (n & 1) res += str;
    }

    return res;
  };

  var $toFixed = 1.0.toFixed;
  var floor$1 = Math.floor;
  var data = [0, 0, 0, 0, 0, 0];
  var ERROR = 'Number.toFixed: incorrect invocation!';
  var ZERO = '0';

  var multiply = function multiply(n, c) {
    var i = -1;
    var c2 = c;

    while (++i < 6) {
      c2 += n * data[i];
      data[i] = c2 % 1e7;
      c2 = floor$1(c2 / 1e7);
    }
  };

  var divide = function divide(n) {
    var i = 6;
    var c = 0;

    while (--i >= 0) {
      c += data[i];
      data[i] = floor$1(c / n);
      c = c % n * 1e7;
    }
  };

  var numToString = function numToString() {
    var i = 6;
    var s = '';

    while (--i >= 0) {
      if (s !== '' || i === 0 || data[i] !== 0) {
        var t = String(data[i]);
        s = s === '' ? t : s + _stringRepeat.call(ZERO, 7 - t.length) + t;
      }
    }

    return s;
  };

  var pow = function pow(x, n, acc) {
    return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
  };

  var log = function log(x) {
    var n = 0;
    var x2 = x;

    while (x2 >= 4096) {
      n += 12;
      x2 /= 4096;
    }

    while (x2 >= 2) {
      n += 1;
      x2 /= 2;
    }

    return n;
  };

  _export(_export.P + _export.F * (!!$toFixed && (0.00008.toFixed(3) !== '0.000' || 0.9.toFixed(0) !== '1' || 1.255.toFixed(2) !== '1.25' || 1000000000000000128.0.toFixed(0) !== '1000000000000000128') || !_fails(function () {
    // V8 ~ Android 4.3-
    $toFixed.call({});
  })), 'Number', {
    toFixed: function toFixed(fractionDigits) {
      var x = _aNumberValue(this, ERROR);
      var f = _toInteger(fractionDigits);
      var s = '';
      var m = ZERO;
      var e, z, j, k;
      if (f < 0 || f > 20) throw RangeError(ERROR); // eslint-disable-next-line no-self-compare

      if (x != x) return 'NaN';
      if (x <= -1e21 || x >= 1e21) return String(x);

      if (x < 0) {
        s = '-';
        x = -x;
      }

      if (x > 1e-21) {
        e = log(x * pow(2, 69, 1)) - 69;
        z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
        z *= 0x10000000000000;
        e = 52 - e;

        if (e > 0) {
          multiply(0, z);
          j = f;

          while (j >= 7) {
            multiply(1e7, 0);
            j -= 7;
          }

          multiply(pow(10, j, 1), 0);
          j = e - 1;

          while (j >= 23) {
            divide(1 << 23);
            j -= 23;
          }

          divide(1 << j);
          multiply(1, 1);
          divide(2);
          m = numToString();
        } else {
          multiply(0, z);
          multiply(1 << -e, 0);
          m = numToString() + _stringRepeat.call(ZERO, f);
        }
      }

      if (f > 0) {
        k = m.length;
        m = s + (k <= f ? '0.' + _stringRepeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
      } else {
        m = s + m;
      }

      return m;
    }
  });

  var $toPrecision = 1.0.toPrecision;
  _export(_export.P + _export.F * (_fails(function () {
    // IE7-
    return $toPrecision.call(1, undefined) !== '1';
  }) || !_fails(function () {
    // V8 ~ Android 4.3-
    $toPrecision.call({});
  })), 'Number', {
    toPrecision: function toPrecision(precision) {
      var that = _aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
      return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
    }
  });

  _export(_export.S, 'Number', {
    EPSILON: Math.pow(2, -52)
  });

  var _isFinite = _global.isFinite;
  _export(_export.S, 'Number', {
    isFinite: function isFinite(it) {
      return typeof it == 'number' && _isFinite(it);
    }
  });

  var floor$2 = Math.floor;

  var _isInteger = function isInteger(it) {
    return !_isObject(it) && isFinite(it) && floor$2(it) === it;
  };

  _export(_export.S, 'Number', {
    isInteger: _isInteger
  });

  _export(_export.S, 'Number', {
    isNaN: function isNaN(number) {
      // eslint-disable-next-line no-self-compare
      return number != number;
    }
  });

  var abs = Math.abs;
  _export(_export.S, 'Number', {
    isSafeInteger: function isSafeInteger(number) {
      return _isInteger(number) && abs(number) <= 0x1fffffffffffff;
    }
  });

  _export(_export.S, 'Number', {
    MAX_SAFE_INTEGER: 0x1fffffffffffff
  });

  _export(_export.S, 'Number', {
    MIN_SAFE_INTEGER: -0x1fffffffffffff
  });

  _export(_export.S + _export.F * (Number.parseFloat != _parseFloat), 'Number', {
    parseFloat: _parseFloat
  });

  _export(_export.S + _export.F * (Number.parseInt != _parseInt), 'Number', {
    parseInt: _parseInt
  });

  // 20.2.2.20 Math.log1p(x)
  var _mathLog1p = Math.log1p || function log1p(x) {
    return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
  };

  var sqrt = Math.sqrt;
  var $acosh = Math.acosh;
  _export(_export.S + _export.F * !($acosh // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710 // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity), 'Math', {
    acosh: function acosh(x) {
      return (x = +x) < 1 ? NaN : x > 94906265.62425156 ? Math.log(x) + Math.LN2 : _mathLog1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
    }
  });

  var $asinh = Math.asinh;

  function asinh(x) {
    return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
  } // Tor Browser bug: Math.asinh(0) -> -0


  _export(_export.S + _export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', {
    asinh: asinh
  });

  var $atanh = Math.atanh; // Tor Browser bug: Math.atanh(-0) -> 0

  _export(_export.S + _export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
    atanh: function atanh(x) {
      return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
    }
  });

  // 20.2.2.28 Math.sign(x)
  var _mathSign = Math.sign || function sign(x) {
    // eslint-disable-next-line no-self-compare
    return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
  };

  _export(_export.S, 'Math', {
    cbrt: function cbrt(x) {
      return _mathSign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
    }
  });

  _export(_export.S, 'Math', {
    clz32: function clz32(x) {
      return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
    }
  });

  var exp = Math.exp;
  _export(_export.S, 'Math', {
    cosh: function cosh(x) {
      return (exp(x = +x) + exp(-x)) / 2;
    }
  });

  // 20.2.2.14 Math.expm1(x)
  var $expm1 = Math.expm1;

  var _mathExpm1 = !$expm1 // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168 // Tor Browser bug
  || $expm1(-2e-17) != -2e-17 ? function expm1(x) {
    return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
  } : $expm1;

  _export(_export.S + _export.F * (_mathExpm1 != Math.expm1), 'Math', {
    expm1: _mathExpm1
  });

  var pow$1 = Math.pow;
  var EPSILON = pow$1(2, -52);
  var EPSILON32 = pow$1(2, -23);
  var MAX32 = pow$1(2, 127) * (2 - EPSILON32);
  var MIN32 = pow$1(2, -126);

  var roundTiesToEven = function roundTiesToEven(n) {
    return n + 1 / EPSILON - 1 / EPSILON;
  };

  var _mathFround = Math.fround || function fround(x) {
    var $abs = Math.abs(x);
    var $sign = _mathSign(x);
    var a, result;
    if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
    a = (1 + EPSILON32 / EPSILON) * $abs;
    result = a - (a - $abs); // eslint-disable-next-line no-self-compare

    if (result > MAX32 || result != result) return $sign * Infinity;
    return $sign * result;
  };

  _export(_export.S, 'Math', {
    fround: _mathFround
  });

  var abs$1 = Math.abs;
  _export(_export.S, 'Math', {
    hypot: function hypot(value1, value2) {
      // eslint-disable-line no-unused-vars
      var sum = 0;
      var i = 0;
      var aLen = arguments.length;
      var larg = 0;
      var arg, div;

      while (i < aLen) {
        arg = abs$1(arguments[i++]);

        if (larg < arg) {
          div = larg / arg;
          sum = sum * div * div + 1;
          larg = arg;
        } else if (arg > 0) {
          div = arg / larg;
          sum += div * div;
        } else sum += arg;
      }

      return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
    }
  });

  var $imul = Math.imul; // some WebKit versions fails with big numbers, some has wrong arity

  _export(_export.S + _export.F * _fails(function () {
    return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
  }), 'Math', {
    imul: function imul(x, y) {
      var UINT16 = 0xffff;
      var xn = +x;
      var yn = +y;
      var xl = UINT16 & xn;
      var yl = UINT16 & yn;
      return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
    }
  });

  _export(_export.S, 'Math', {
    log10: function log10(x) {
      return Math.log(x) * Math.LOG10E;
    }
  });

  _export(_export.S, 'Math', {
    log1p: _mathLog1p
  });

  _export(_export.S, 'Math', {
    log2: function log2(x) {
      return Math.log(x) / Math.LN2;
    }
  });

  _export(_export.S, 'Math', {
    sign: _mathSign
  });

  var exp$1 = Math.exp; // V8 near Chromium 38 has a problem with very small numbers

  _export(_export.S + _export.F * _fails(function () {
    return !Math.sinh(-2e-17) != -2e-17;
  }), 'Math', {
    sinh: function sinh(x) {
      return Math.abs(x = +x) < 1 ? (_mathExpm1(x) - _mathExpm1(-x)) / 2 : (exp$1(x - 1) - exp$1(-x - 1)) * (Math.E / 2);
    }
  });

  var exp$2 = Math.exp;
  _export(_export.S, 'Math', {
    tanh: function tanh(x) {
      var a = _mathExpm1(x = +x);
      var b = _mathExpm1(-x);
      return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp$2(x) + exp$2(-x));
    }
  });

  _export(_export.S, 'Math', {
    trunc: function trunc(it) {
      return (it > 0 ? Math.floor : Math.ceil)(it);
    }
  });

  var fromCharCode = String.fromCharCode;
  var $fromCodePoint = String.fromCodePoint; // length should be 1, old FF problem

  _export(_export.S + _export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
    // 21.1.2.2 String.fromCodePoint(...codePoints)
    fromCodePoint: function fromCodePoint(x) {
      // eslint-disable-line no-unused-vars
      var res = [];
      var aLen = arguments.length;
      var i = 0;
      var code;

      while (aLen > i) {
        code = +arguments[i++];
        if (_toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
        res.push(code < 0x10000 ? fromCharCode(code) : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00));
      }

      return res.join('');
    }
  });

  _export(_export.S, 'String', {
    // 21.1.2.4 String.raw(callSite, ...substitutions)
    raw: function raw(callSite) {
      var tpl = _toIobject(callSite.raw);
      var len = _toLength(tpl.length);
      var aLen = arguments.length;
      var res = [];
      var i = 0;

      while (len > i) {
        res.push(String(tpl[i++]));
        if (i < aLen) res.push(String(arguments[i]));
      }

      return res.join('');
    }
  });

  _stringTrim('trim', function ($trim) {
    return function trim() {
      return $trim(this, 3);
    };
  });

  // false -> String#codePointAt

  var _stringAt = function _stringAt(TO_STRING) {
    return function (that, pos) {
      var s = String(_defined(that));
      var i = _toInteger(pos);
      var l = s.length;
      var a, b;
      if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
      a = s.charCodeAt(i);
      return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
    };
  };

  var _iterators = {};

  var IteratorPrototype = {}; // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()

  _hide(IteratorPrototype, _wks('iterator'), function () {
    return this;
  });

  var _iterCreate = function _iterCreate(Constructor, NAME, next) {
    Constructor.prototype = _objectCreate(IteratorPrototype, {
      next: _propertyDesc(1, next)
    });
    _setToStringTag(Constructor, NAME + ' Iterator');
  };

  var ITERATOR = _wks('iterator');
  var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`

  var FF_ITERATOR = '@@iterator';
  var KEYS = 'keys';
  var VALUES = 'values';

  var returnThis = function returnThis() {
    return this;
  };

  var _iterDefine = function _iterDefine(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
    _iterCreate(Constructor, NAME, next);

    var getMethod = function getMethod(kind) {
      if (!BUGGY && kind in proto) return proto[kind];

      switch (kind) {
        case KEYS:
          return function keys() {
            return new Constructor(this, kind);
          };

        case VALUES:
          return function values() {
            return new Constructor(this, kind);
          };
      }

      return function entries() {
        return new Constructor(this, kind);
      };
    };

    var TAG = NAME + ' Iterator';
    var DEF_VALUES = DEFAULT == VALUES;
    var VALUES_BUG = false;
    var proto = Base.prototype;
    var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
    var $default = $native || getMethod(DEFAULT);
    var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
    var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
    var methods, key, IteratorPrototype; // Fix native

    if ($anyNative) {
      IteratorPrototype = _objectGpo($anyNative.call(new Base()));

      if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
        // Set @@toStringTag to native iterators
        _setToStringTag(IteratorPrototype, TAG, true); // fix for some old engines

        if ( typeof IteratorPrototype[ITERATOR] != 'function') _hide(IteratorPrototype, ITERATOR, returnThis);
      }
    } // fix Array#{values, @@iterator}.name in V8 / FF


    if (DEF_VALUES && $native && $native.name !== VALUES) {
      VALUES_BUG = true;

      $default = function values() {
        return $native.call(this);
      };
    } // Define iterator


    if ( (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
      _hide(proto, ITERATOR, $default);
    } // Plug for library


    _iterators[NAME] = $default;
    _iterators[TAG] = returnThis;

    if (DEFAULT) {
      methods = {
        values: DEF_VALUES ? $default : getMethod(VALUES),
        keys: IS_SET ? $default : getMethod(KEYS),
        entries: $entries
      };
      if (FORCED) for (key in methods) {
        if (!(key in proto)) _redefine(proto, key, methods[key]);
      } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
    }

    return methods;
  };

  var $at = _stringAt(true); // 21.1.3.27 String.prototype[@@iterator]()

  _iterDefine(String, 'String', function (iterated) {
    this._t = String(iterated); // target

    this._i = 0; // next index
    // 21.1.5.2.1 %StringIteratorPrototype%.next()
  }, function () {
    var O = this._t;
    var index = this._i;
    var point;
    if (index >= O.length) return {
      value: undefined,
      done: true
    };
    point = $at(O, index);
    this._i += point.length;
    return {
      value: point,
      done: false
    };
  });

  var $at$1 = _stringAt(false);
  _export(_export.P, 'String', {
    // 21.1.3.3 String.prototype.codePointAt(pos)
    codePointAt: function codePointAt(pos) {
      return $at$1(this, pos);
    }
  });

  var MATCH = _wks('match');

  var _isRegexp = function _isRegexp(it) {
    var isRegExp;
    return _isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : _cof(it) == 'RegExp');
  };

  var _stringContext = function _stringContext(that, searchString, NAME) {
    if (_isRegexp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
    return String(_defined(that));
  };

  var MATCH$1 = _wks('match');

  var _failsIsRegexp = function _failsIsRegexp(KEY) {
    var re = /./;

    try {
      '/./'[KEY](re);
    } catch (e) {
      try {
        re[MATCH$1] = false;
        return !'/./'[KEY](re);
      } catch (f) {
        /* empty */
      }
    }

    return true;
  };

  var ENDS_WITH = 'endsWith';
  var $endsWith = ''[ENDS_WITH];
  _export(_export.P + _export.F * _failsIsRegexp(ENDS_WITH), 'String', {
    endsWith: function endsWith(searchString
    /* , endPosition = @length */
    ) {
      var that = _stringContext(this, searchString, ENDS_WITH);
      var endPosition = arguments.length > 1 ? arguments[1] : undefined;
      var len = _toLength(that.length);
      var end = endPosition === undefined ? len : Math.min(_toLength(endPosition), len);
      var search = String(searchString);
      return $endsWith ? $endsWith.call(that, search, end) : that.slice(end - search.length, end) === search;
    }
  });

  var INCLUDES = 'includes';
  _export(_export.P + _export.F * _failsIsRegexp(INCLUDES), 'String', {
    includes: function includes(searchString
    /* , position = 0 */
    ) {
      return !!~_stringContext(this, searchString, INCLUDES).indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  _export(_export.P, 'String', {
    // 21.1.3.13 String.prototype.repeat(count)
    repeat: _stringRepeat
  });

  var STARTS_WITH = 'startsWith';
  var $startsWith = ''[STARTS_WITH];
  _export(_export.P + _export.F * _failsIsRegexp(STARTS_WITH), 'String', {
    startsWith: function startsWith(searchString
    /* , position = 0 */
    ) {
      var that = _stringContext(this, searchString, STARTS_WITH);
      var index = _toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
      var search = String(searchString);
      return $startsWith ? $startsWith.call(that, search, index) : that.slice(index, index + search.length) === search;
    }
  });

  var quot = /"/g; // B.2.3.2.1 CreateHTML(string, tag, attribute, value)

  var createHTML = function createHTML(string, tag, attribute, value) {
    var S = String(_defined(string));
    var p1 = '<' + tag;
    if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
    return p1 + '>' + S + '</' + tag + '>';
  };

  var _stringHtml = function _stringHtml(NAME, exec) {
    var O = {};
    O[NAME] = exec(createHTML);
    _export(_export.P + _export.F * _fails(function () {
      var test = ''[NAME]('"');
      return test !== test.toLowerCase() || test.split('"').length > 3;
    }), 'String', O);
  };

  _stringHtml('anchor', function (createHTML) {
    return function anchor(name) {
      return createHTML(this, 'a', 'name', name);
    };
  });

  _stringHtml('big', function (createHTML) {
    return function big() {
      return createHTML(this, 'big', '', '');
    };
  });

  _stringHtml('blink', function (createHTML) {
    return function blink() {
      return createHTML(this, 'blink', '', '');
    };
  });

  _stringHtml('bold', function (createHTML) {
    return function bold() {
      return createHTML(this, 'b', '', '');
    };
  });

  _stringHtml('fixed', function (createHTML) {
    return function fixed() {
      return createHTML(this, 'tt', '', '');
    };
  });

  _stringHtml('fontcolor', function (createHTML) {
    return function fontcolor(color) {
      return createHTML(this, 'font', 'color', color);
    };
  });

  _stringHtml('fontsize', function (createHTML) {
    return function fontsize(size) {
      return createHTML(this, 'font', 'size', size);
    };
  });

  _stringHtml('italics', function (createHTML) {
    return function italics() {
      return createHTML(this, 'i', '', '');
    };
  });

  _stringHtml('link', function (createHTML) {
    return function link(url) {
      return createHTML(this, 'a', 'href', url);
    };
  });

  _stringHtml('small', function (createHTML) {
    return function small() {
      return createHTML(this, 'small', '', '');
    };
  });

  _stringHtml('strike', function (createHTML) {
    return function strike() {
      return createHTML(this, 'strike', '', '');
    };
  });

  _stringHtml('sub', function (createHTML) {
    return function sub() {
      return createHTML(this, 'sub', '', '');
    };
  });

  _stringHtml('sup', function (createHTML) {
    return function sup() {
      return createHTML(this, 'sup', '', '');
    };
  });

  _export(_export.S, 'Date', {
    now: function now() {
      return new Date().getTime();
    }
  });

  _export(_export.P + _export.F * _fails(function () {
    return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({
      toISOString: function toISOString() {
        return 1;
      }
    }) !== 1;
  }), 'Date', {
    // eslint-disable-next-line no-unused-vars
    toJSON: function toJSON(key) {
      var O = _toObject(this);
      var pv = _toPrimitive(O);
      return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
    }
  });

  var getTime$1 = Date.prototype.getTime;
  var $toISOString = Date.prototype.toISOString;

  var lz = function lz(num) {
    return num > 9 ? num : '0' + num;
  }; // PhantomJS / old WebKit has a broken implementations


  var _dateToIsoString = _fails(function () {
    return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
  }) || !_fails(function () {
    $toISOString.call(new Date(NaN));
  }) ? function toISOString() {
    if (!isFinite(getTime$1.call(this))) throw RangeError('Invalid time value');
    var d = this;
    var y = d.getUTCFullYear();
    var m = d.getUTCMilliseconds();
    var s = y < 0 ? '-' : y > 9999 ? '+' : '';
    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) + '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) + 'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) + ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
  } : $toISOString;

  // PhantomJS / old WebKit has a broken implementations

  _export(_export.P + _export.F * (Date.prototype.toISOString !== _dateToIsoString), 'Date', {
    toISOString: _dateToIsoString
  });

  var DateProto = Date.prototype;
  var INVALID_DATE = 'Invalid Date';
  var TO_STRING = 'toString';
  var $toString = DateProto[TO_STRING];
  var getTime$2 = DateProto.getTime;

  if (new Date(NaN) + '' != INVALID_DATE) {
    _redefine(DateProto, TO_STRING, function toString() {
      var value = getTime$2.call(this); // eslint-disable-next-line no-self-compare

      return value === value ? $toString.call(this) : INVALID_DATE;
    });
  }

  var NUMBER$1 = 'number';

  var _dateToPrimitive = function _dateToPrimitive(hint) {
    if (hint !== 'string' && hint !== NUMBER$1 && hint !== 'default') throw TypeError('Incorrect hint');
    return _toPrimitive(_anObject(this), hint != NUMBER$1);
  };

  var TO_PRIMITIVE$1 = _wks('toPrimitive');
  var proto$1 = Date.prototype;
  if (!(TO_PRIMITIVE$1 in proto$1)) _hide(proto$1, TO_PRIMITIVE$1, _dateToPrimitive);

  _export(_export.S, 'Array', {
    isArray: _isArray
  });

  var _iterCall = function _iterCall(iterator, fn, value, entries) {
    try {
      return entries ? fn(_anObject(value)[0], value[1]) : fn(value); // 7.4.6 IteratorClose(iterator, completion)
    } catch (e) {
      var ret = iterator['return'];
      if (ret !== undefined) _anObject(ret.call(iterator));
      throw e;
    }
  };

  var ITERATOR$1 = _wks('iterator');
  var ArrayProto = Array.prototype;

  var _isArrayIter = function _isArrayIter(it) {
    return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR$1] === it);
  };

  var _createProperty = function _createProperty(object, index, value) {
    if (index in object) _objectDp.f(object, index, _propertyDesc(0, value));else object[index] = value;
  };

  var ITERATOR$2 = _wks('iterator');

  var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
    if (it != undefined) return it[ITERATOR$2] || it['@@iterator'] || _iterators[_classof(it)];
  };

  var ITERATOR$3 = _wks('iterator');
  var SAFE_CLOSING = false;

  try {
    var riter = [7][ITERATOR$3]();

    riter['return'] = function () {
      SAFE_CLOSING = true;
    }; // eslint-disable-next-line no-throw-literal


    Array.from(riter, function () {
      throw 2;
    });
  } catch (e) {
    /* empty */
  }

  var _iterDetect = function _iterDetect(exec, skipClosing) {
    if (!skipClosing && !SAFE_CLOSING) return false;
    var safe = false;

    try {
      var arr = [7];
      var iter = arr[ITERATOR$3]();

      iter.next = function () {
        return {
          done: safe = true
        };
      };

      arr[ITERATOR$3] = function () {
        return iter;
      };

      exec(arr);
    } catch (e) {
      /* empty */
    }

    return safe;
  };

  _export(_export.S + _export.F * !_iterDetect(function (iter) {
    Array.from(iter);
  }), 'Array', {
    // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
    from: function from(arrayLike
    /* , mapfn = undefined, thisArg = undefined */
    ) {
      var O = _toObject(arrayLike);
      var C = typeof this == 'function' ? this : Array;
      var aLen = arguments.length;
      var mapfn = aLen > 1 ? arguments[1] : undefined;
      var mapping = mapfn !== undefined;
      var index = 0;
      var iterFn = core_getIteratorMethod(O);
      var length, result, step, iterator;
      if (mapping) mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2); // if object isn't iterable or it's array with default iterator - use simple case

      if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
        for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
          _createProperty(result, index, mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value);
        }
      } else {
        length = _toLength(O.length);

        for (result = new C(length); length > index; index++) {
          _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
        }
      }

      result.length = index;
      return result;
    }
  });

  _export(_export.S + _export.F * _fails(function () {
    function F() {
      /* empty */
    }

    return !(Array.of.call(F) instanceof F);
  }), 'Array', {
    // 22.1.2.3 Array.of( ...items)
    of: function of()
    /* ...args */
    {
      var index = 0;
      var aLen = arguments.length;
      var result = new (typeof this == 'function' ? this : Array)(aLen);

      while (aLen > index) {
        _createProperty(result, index, arguments[index++]);
      }

      result.length = aLen;
      return result;
    }
  });

  var _strictMethod = function _strictMethod(method, arg) {
    return !!method && _fails(function () {
      // eslint-disable-next-line no-useless-call
      arg ? method.call(null, function () {
        /* empty */
      }, 1) : method.call(null);
    });
  };

  var arrayJoin = [].join; // fallback for not array-like strings

  _export(_export.P + _export.F * (_iobject != Object || !_strictMethod(arrayJoin)), 'Array', {
    join: function join(separator) {
      return arrayJoin.call(_toIobject(this), separator === undefined ? ',' : separator);
    }
  });

  var arraySlice$1 = [].slice; // fallback for not array-like ES3 strings and DOM objects

  _export(_export.P + _export.F * _fails(function () {
    if (_html) arraySlice$1.call(_html);
  }), 'Array', {
    slice: function slice(begin, end) {
      var len = _toLength(this.length);
      var klass = _cof(this);
      end = end === undefined ? len : end;
      if (klass == 'Array') return arraySlice$1.call(this, begin, end);
      var start = _toAbsoluteIndex(begin, len);
      var upTo = _toAbsoluteIndex(end, len);
      var size = _toLength(upTo - start);
      var cloned = new Array(size);
      var i = 0;

      for (; i < size; i++) {
        cloned[i] = klass == 'String' ? this.charAt(start + i) : this[start + i];
      }

      return cloned;
    }
  });

  var $sort = [].sort;
  var test$1 = [1, 2, 3];
  _export(_export.P + _export.F * (_fails(function () {
    // IE8-
    test$1.sort(undefined);
  }) || !_fails(function () {
    // V8 bug
    test$1.sort(null); // Old WebKit
  }) || !_strictMethod($sort)), 'Array', {
    // 22.1.3.25 Array.prototype.sort(comparefn)
    sort: function sort(comparefn) {
      return comparefn === undefined ? $sort.call(_toObject(this)) : $sort.call(_toObject(this), _aFunction(comparefn));
    }
  });

  var SPECIES = _wks('species');

  var _arraySpeciesConstructor = function _arraySpeciesConstructor(original) {
    var C;

    if (_isArray(original)) {
      C = original.constructor; // cross-realm fallback

      if (typeof C == 'function' && (C === Array || _isArray(C.prototype))) C = undefined;

      if (_isObject(C)) {
        C = C[SPECIES];
        if (C === null) C = undefined;
      }
    }

    return C === undefined ? Array : C;
  };

  var _arraySpeciesCreate = function _arraySpeciesCreate(original, length) {
    return new (_arraySpeciesConstructor(original))(length);
  };

  // 1 -> Array#map
  // 2 -> Array#filter
  // 3 -> Array#some
  // 4 -> Array#every
  // 5 -> Array#find
  // 6 -> Array#findIndex

  var _arrayMethods = function _arrayMethods(TYPE, $create) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    var create = $create || _arraySpeciesCreate;
    return function ($this, callbackfn, that) {
      var O = _toObject($this);
      var self = _iobject(O);
      var f = _ctx(callbackfn, that, 3);
      var length = _toLength(self.length);
      var index = 0;
      var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
      var val, res;

      for (; length > index; index++) {
        if (NO_HOLES || index in self) {
          val = self[index];
          res = f(val, index, O);

          if (TYPE) {
            if (IS_MAP) result[index] = res; // map
            else if (res) switch (TYPE) {
                case 3:
                  return true;
                // some

                case 5:
                  return val;
                // find

                case 6:
                  return index;
                // findIndex

                case 2:
                  result.push(val);
                // filter
              } else if (IS_EVERY) return false; // every
          }
        }
      }

      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
    };
  };

  var $forEach = _arrayMethods(0);
  var STRICT = _strictMethod([].forEach, true);
  _export(_export.P + _export.F * !STRICT, 'Array', {
    // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
    forEach: function forEach(callbackfn
    /* , thisArg */
    ) {
      return $forEach(this, callbackfn, arguments[1]);
    }
  });

  var $map = _arrayMethods(1);
  _export(_export.P + _export.F * !_strictMethod([].map, true), 'Array', {
    // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
    map: function map(callbackfn
    /* , thisArg */
    ) {
      return $map(this, callbackfn, arguments[1]);
    }
  });

  var $filter = _arrayMethods(2);
  _export(_export.P + _export.F * !_strictMethod([].filter, true), 'Array', {
    // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
    filter: function filter(callbackfn
    /* , thisArg */
    ) {
      return $filter(this, callbackfn, arguments[1]);
    }
  });

  var $some = _arrayMethods(3);
  _export(_export.P + _export.F * !_strictMethod([].some, true), 'Array', {
    // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
    some: function some(callbackfn
    /* , thisArg */
    ) {
      return $some(this, callbackfn, arguments[1]);
    }
  });

  var $every = _arrayMethods(4);
  _export(_export.P + _export.F * !_strictMethod([].every, true), 'Array', {
    // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
    every: function every(callbackfn
    /* , thisArg */
    ) {
      return $every(this, callbackfn, arguments[1]);
    }
  });

  var _arrayReduce = function _arrayReduce(that, callbackfn, aLen, memo, isRight) {
    _aFunction(callbackfn);
    var O = _toObject(that);
    var self = _iobject(O);
    var length = _toLength(O.length);
    var index = isRight ? length - 1 : 0;
    var i = isRight ? -1 : 1;
    if (aLen < 2) for (;;) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }

      index += i;

      if (isRight ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }

    for (; isRight ? index >= 0 : length > index; index += i) {
      if (index in self) {
        memo = callbackfn(memo, self[index], index, O);
      }
    }

    return memo;
  };

  _export(_export.P + _export.F * !_strictMethod([].reduce, true), 'Array', {
    // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
    reduce: function reduce(callbackfn
    /* , initialValue */
    ) {
      return _arrayReduce(this, callbackfn, arguments.length, arguments[1], false);
    }
  });

  _export(_export.P + _export.F * !_strictMethod([].reduceRight, true), 'Array', {
    // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
    reduceRight: function reduceRight(callbackfn
    /* , initialValue */
    ) {
      return _arrayReduce(this, callbackfn, arguments.length, arguments[1], true);
    }
  });

  var $indexOf = _arrayIncludes(false);
  var $native = [].indexOf;
  var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;
  _export(_export.P + _export.F * (NEGATIVE_ZERO || !_strictMethod($native)), 'Array', {
    // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
    indexOf: function indexOf(searchElement
    /* , fromIndex = 0 */
    ) {
      return NEGATIVE_ZERO // convert -0 to +0
      ? $native.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments[1]);
    }
  });

  var $native$1 = [].lastIndexOf;
  var NEGATIVE_ZERO$1 = !!$native$1 && 1 / [1].lastIndexOf(1, -0) < 0;
  _export(_export.P + _export.F * (NEGATIVE_ZERO$1 || !_strictMethod($native$1)), 'Array', {
    // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
    lastIndexOf: function lastIndexOf(searchElement
    /* , fromIndex = @[*-1] */
    ) {
      // convert -0 to +0
      if (NEGATIVE_ZERO$1) return $native$1.apply(this, arguments) || 0;
      var O = _toIobject(this);
      var length = _toLength(O.length);
      var index = length - 1;
      if (arguments.length > 1) index = Math.min(index, _toInteger(arguments[1]));
      if (index < 0) index = length + index;

      for (; index >= 0; index--) {
        if (index in O) if (O[index] === searchElement) return index || 0;
      }

      return -1;
    }
  });

  var _arrayCopyWithin = [].copyWithin || function copyWithin(target
  /* = 0 */
  , start
  /* = 0, end = @length */
  ) {
    var O = _toObject(this);
    var len = _toLength(O.length);
    var to = _toAbsoluteIndex(target, len);
    var from = _toAbsoluteIndex(start, len);
    var end = arguments.length > 2 ? arguments[2] : undefined;
    var count = Math.min((end === undefined ? len : _toAbsoluteIndex(end, len)) - from, len - to);
    var inc = 1;

    if (from < to && to < from + count) {
      inc = -1;
      from += count - 1;
      to += count - 1;
    }

    while (count-- > 0) {
      if (from in O) O[to] = O[from];else delete O[to];
      to += inc;
      from += inc;
    }

    return O;
  };

  var UNSCOPABLES = _wks('unscopables');
  var ArrayProto$1 = Array.prototype;
  if (ArrayProto$1[UNSCOPABLES] == undefined) _hide(ArrayProto$1, UNSCOPABLES, {});

  var _addToUnscopables = function _addToUnscopables(key) {
    ArrayProto$1[UNSCOPABLES][key] = true;
  };

  _export(_export.P, 'Array', {
    copyWithin: _arrayCopyWithin
  });
  _addToUnscopables('copyWithin');

  var _arrayFill = function fill(value
  /* , start = 0, end = @length */
  ) {
    var O = _toObject(this);
    var length = _toLength(O.length);
    var aLen = arguments.length;
    var index = _toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
    var end = aLen > 2 ? arguments[2] : undefined;
    var endPos = end === undefined ? length : _toAbsoluteIndex(end, length);

    while (endPos > index) {
      O[index++] = value;
    }

    return O;
  };

  _export(_export.P, 'Array', {
    fill: _arrayFill
  });
  _addToUnscopables('fill');

  var $find = _arrayMethods(5);
  var KEY = 'find';
  var forced = true; // Shouldn't skip holes

  if (KEY in []) Array(1)[KEY](function () {
    forced = false;
  });
  _export(_export.P + _export.F * forced, 'Array', {
    find: function find(callbackfn
    /* , that = undefined */
    ) {
      return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });
  _addToUnscopables(KEY);

  var $find$1 = _arrayMethods(6);
  var KEY$1 = 'findIndex';
  var forced$1 = true; // Shouldn't skip holes

  if (KEY$1 in []) Array(1)[KEY$1](function () {
    forced$1 = false;
  });
  _export(_export.P + _export.F * forced$1, 'Array', {
    findIndex: function findIndex(callbackfn
    /* , that = undefined */
    ) {
      return $find$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });
  _addToUnscopables(KEY$1);

  var SPECIES$1 = _wks('species');

  var _setSpecies = function _setSpecies(KEY) {
    var C = _global[KEY];
    if (_descriptors && C && !C[SPECIES$1]) _objectDp.f(C, SPECIES$1, {
      configurable: true,
      get: function get() {
        return this;
      }
    });
  };

  _setSpecies('Array');

  var _iterStep = function _iterStep(done, value) {
    return {
      value: value,
      done: !!done
    };
  };

  // 22.1.3.13 Array.prototype.keys()
  // 22.1.3.29 Array.prototype.values()
  // 22.1.3.30 Array.prototype[@@iterator]()


  var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
    this._t = _toIobject(iterated); // target

    this._i = 0; // next index

    this._k = kind; // kind
    // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
  }, function () {
    var O = this._t;
    var kind = this._k;
    var index = this._i++;

    if (!O || index >= O.length) {
      this._t = undefined;
      return _iterStep(1);
    }

    if (kind == 'keys') return _iterStep(0, index);
    if (kind == 'values') return _iterStep(0, O[index]);
    return _iterStep(0, [index, O[index]]);
  }, 'values'); // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)

  _iterators.Arguments = _iterators.Array;
  _addToUnscopables('keys');
  _addToUnscopables('values');
  _addToUnscopables('entries');

  var _flags = function _flags() {
    var that = _anObject(this);
    var result = '';
    if (that.global) result += 'g';
    if (that.ignoreCase) result += 'i';
    if (that.multiline) result += 'm';
    if (that.unicode) result += 'u';
    if (that.sticky) result += 'y';
    return result;
  };

  var dP$4 = _objectDp.f;
  var gOPN$3 = _objectGopn.f;
  var $RegExp = _global.RegExp;
  var Base$1 = $RegExp;
  var proto$2 = $RegExp.prototype;
  var re1 = /a/g;
  var re2 = /a/g; // "new" creates a new object, old webkit buggy here

  var CORRECT_NEW = new $RegExp(re1) !== re1;

  if (_descriptors && (!CORRECT_NEW || _fails(function () {
    re2[_wks('match')] = false; // RegExp constructor can alter flags and IsRegExp works correct with @@match

    return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
  }))) {
    $RegExp = function RegExp(p, f) {
      var tiRE = this instanceof $RegExp;
      var piRE = _isRegexp(p);
      var fiU = f === undefined;
      return !tiRE && piRE && p.constructor === $RegExp && fiU ? p : _inheritIfRequired(CORRECT_NEW ? new Base$1(piRE && !fiU ? p.source : p, f) : Base$1((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? _flags.call(p) : f), tiRE ? this : proto$2, $RegExp);
    };

    var proxy = function proxy(key) {
      key in $RegExp || dP$4($RegExp, key, {
        configurable: true,
        get: function get() {
          return Base$1[key];
        },
        set: function set(it) {
          Base$1[key] = it;
        }
      });
    };

    for (var keys$1 = gOPN$3(Base$1), i = 0; keys$1.length > i;) {
      proxy(keys$1[i++]);
    }

    proto$2.constructor = $RegExp;
    $RegExp.prototype = proto$2;
    _redefine(_global, 'RegExp', $RegExp);
  }

  _setSpecies('RegExp');

  var nativeExec = RegExp.prototype.exec; // This always refers to the native implementation, because the
  // String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
  // which loads this file before patching the method.

  var nativeReplace = String.prototype.replace;
  var patchedExec = nativeExec;
  var LAST_INDEX = 'lastIndex';

  var UPDATES_LAST_INDEX_WRONG = function () {
    var re1 = /a/,
        re2 = /b*/g;
    nativeExec.call(re1, 'a');
    nativeExec.call(re2, 'a');
    return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
  }(); // nonparticipating capturing group, copied from es5-shim's String#split patch.


  var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;
  var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

  if (PATCH) {
    patchedExec = function exec(str) {
      var re = this;
      var lastIndex, reCopy, match, i;

      if (NPCG_INCLUDED) {
        reCopy = new RegExp('^' + re.source + '$(?!\\s)', _flags.call(re));
      }

      if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];
      match = nativeExec.call(re, str);

      if (UPDATES_LAST_INDEX_WRONG && match) {
        re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
      }

      if (NPCG_INCLUDED && match && match.length > 1) {
        // Fix browsers whose `exec` methods don't consistently return `undefined`
        // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
        // eslint-disable-next-line no-loop-func
        nativeReplace.call(match[0], reCopy, function () {
          for (i = 1; i < arguments.length - 2; i++) {
            if (arguments[i] === undefined) match[i] = undefined;
          }
        });
      }

      return match;
    };
  }

  var _regexpExec = patchedExec;

  _export({
    target: 'RegExp',
    proto: true,
    forced: _regexpExec !== /./.exec
  }, {
    exec: _regexpExec
  });

  if (_descriptors && /./g.flags != 'g') _objectDp.f(RegExp.prototype, 'flags', {
    configurable: true,
    get: _flags
  });

  var TO_STRING$1 = 'toString';
  var $toString$1 = /./[TO_STRING$1];

  var define = function define(fn) {
    _redefine(RegExp.prototype, TO_STRING$1, fn, true);
  }; // 21.2.5.14 RegExp.prototype.toString()


  if (_fails(function () {
    return $toString$1.call({
      source: 'a',
      flags: 'b'
    }) != '/a/b';
  })) {
    define(function toString() {
      var R = _anObject(this);
      return '/'.concat(R.source, '/', 'flags' in R ? R.flags : !_descriptors && R instanceof RegExp ? _flags.call(R) : undefined);
    }); // FF44- RegExp#toString has a wrong name
  } else if ($toString$1.name != TO_STRING$1) {
    define(function toString() {
      return $toString$1.call(this);
    });
  }

  var at = _stringAt(true); // `AdvanceStringIndex` abstract operation
  // https://tc39.github.io/ecma262/#sec-advancestringindex

  var _advanceStringIndex = function _advanceStringIndex(S, index, unicode) {
    return index + (unicode ? at(S, index).length : 1);
  };

  var builtinExec = RegExp.prototype.exec; // `RegExpExec` abstract operation
  // https://tc39.github.io/ecma262/#sec-regexpexec

  var _regexpExecAbstract = function _regexpExecAbstract(R, S) {
    var exec = R.exec;

    if (typeof exec === 'function') {
      var result = exec.call(R, S);

      if (_typeof(result) !== 'object') {
        throw new TypeError('RegExp exec method returned something other than an Object or null');
      }

      return result;
    }

    if (_classof(R) !== 'RegExp') {
      throw new TypeError('RegExp#exec called on incompatible receiver');
    }

    return builtinExec.call(R, S);
  };

  var SPECIES$2 = _wks('species');
  var REPLACE_SUPPORTS_NAMED_GROUPS = !_fails(function () {
    // #replace needs built-in support for named groups.
    // #match works fine because it just return the exec results, even if it has
    // a "grops" property.
    var re = /./;

    re.exec = function () {
      var result = [];
      result.groups = {
        a: '7'
      };
      return result;
    };

    return ''.replace(re, '$<a>') !== '7';
  });

  var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = function () {
    // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
    var re = /(?:)/;
    var originalExec = re.exec;

    re.exec = function () {
      return originalExec.apply(this, arguments);
    };

    var result = 'ab'.split(re);
    return result.length === 2 && result[0] === 'a' && result[1] === 'b';
  }();

  var _fixReWks = function _fixReWks(KEY, length, exec) {
    var SYMBOL = _wks(KEY);
    var DELEGATES_TO_SYMBOL = !_fails(function () {
      // String methods call symbol-named RegEp methods
      var O = {};

      O[SYMBOL] = function () {
        return 7;
      };

      return ''[KEY](O) != 7;
    });
    var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !_fails(function () {
      // Symbol-named RegExp methods call .exec
      var execCalled = false;
      var re = /a/;

      re.exec = function () {
        execCalled = true;
        return null;
      };

      if (KEY === 'split') {
        // RegExp[@@split] doesn't call the regex's exec method, but first creates
        // a new one. We need to return the patched regex when creating the new one.
        re.constructor = {};

        re.constructor[SPECIES$2] = function () {
          return re;
        };
      }

      re[SYMBOL]('');
      return !execCalled;
    }) : undefined;

    if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS || KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC) {
      var nativeRegExpMethod = /./[SYMBOL];
      var fns = exec(_defined, SYMBOL, ''[KEY], function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === _regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return {
              done: true,
              value: nativeRegExpMethod.call(regexp, str, arg2)
            };
          }

          return {
            done: true,
            value: nativeMethod.call(str, regexp, arg2)
          };
        }

        return {
          done: false
        };
      });
      var strfn = fns[0];
      var rxfn = fns[1];
      _redefine(String.prototype, KEY, strfn);
      _hide(RegExp.prototype, SYMBOL, length == 2 // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) {
        return rxfn.call(string, this, arg);
      } // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) {
        return rxfn.call(string, this);
      });
    }
  };

  _fixReWks('match', 1, function (defined, MATCH, $match, maybeCallNative) {
    return [// `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[MATCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    }, // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative($match, regexp, this);
      if (res.done) return res.value;
      var rx = _anObject(regexp);
      var S = String(this);
      if (!rx.global) return _regexpExecAbstract(rx, S);
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;

      while ((result = _regexpExecAbstract(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = _advanceStringIndex(S, _toLength(rx.lastIndex), fullUnicode);
        n++;
      }

      return n === 0 ? null : A;
    }];
  });

  var max$1 = Math.max;
  var min$2 = Math.min;
  var floor$3 = Math.floor;
  var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
  var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

  var maybeToString = function maybeToString(it) {
    return it === undefined ? it : String(it);
  }; // @@replace logic


  _fixReWks('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
    return [// `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined ? fn.call(searchValue, O, replaceValue) : $replace.call(String(O), searchValue, replaceValue);
    }, // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;
      var rx = _anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;

      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }

      var results = [];

      while (true) {
        var result = _regexpExecAbstract(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = _advanceStringIndex(S, _toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;

      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max$1(min$2(_toInteger(result.index), S.length), 0);
        var captures = []; // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.

        for (var j = 1; j < result.length; j++) {
          captures.push(maybeToString(result[j]));
        }

        var namedCaptures = result.groups;

        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }

        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }

      return accumulatedResult + S.slice(nextSourcePosition);
    }]; // https://tc39.github.io/ecma262/#sec-getsubstitution

    function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
      var tailPos = position + matched.length;
      var m = captures.length;
      var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;

      if (namedCaptures !== undefined) {
        namedCaptures = _toObject(namedCaptures);
        symbols = SUBSTITUTION_SYMBOLS;
      }

      return $replace.call(replacement, symbols, function (match, ch) {
        var capture;

        switch (ch.charAt(0)) {
          case '$':
            return '$';

          case '&':
            return matched;

          case '`':
            return str.slice(0, position);

          case "'":
            return str.slice(tailPos);

          case '<':
            capture = namedCaptures[ch.slice(1, -1)];
            break;

          default:
            // \d\d?
            var n = +ch;
            if (n === 0) return match;

            if (n > m) {
              var f = floor$3(n / 10);
              if (f === 0) return match;
              if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
              return match;
            }

            capture = captures[n - 1];
        }

        return capture === undefined ? '' : capture;
      });
    }
  });

  _fixReWks('search', 1, function (defined, SEARCH, $search, maybeCallNative) {
    return [// `String.prototype.search` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[SEARCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
    }, // `RegExp.prototype[@@search]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
    function (regexp) {
      var res = maybeCallNative($search, regexp, this);
      if (res.done) return res.value;
      var rx = _anObject(regexp);
      var S = String(this);
      var previousLastIndex = rx.lastIndex;
      if (!_sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = _regexpExecAbstract(rx, S);
      if (!_sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }];
  });

  var SPECIES$3 = _wks('species');

  var _speciesConstructor = function _speciesConstructor(O, D) {
    var C = _anObject(O).constructor;
    var S;
    return C === undefined || (S = _anObject(C)[SPECIES$3]) == undefined ? D : _aFunction(S);
  };

  var $min = Math.min;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX$1 = 'lastIndex';
  var MAX_UINT32 = 0xffffffff; // babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError

  var SUPPORTS_Y = !_fails(function () {
    RegExp(MAX_UINT32, 'y');
  }); // @@split logic

  _fixReWks('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
    var internalSplit;

    if ('abbc'[$SPLIT](/(b)*/)[1] == 'c' || 'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 || 'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 || '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 || '.'[$SPLIT](/()()/)[LENGTH] > 1 || ''[$SPLIT](/.?/)[LENGTH]) {
      // based on es5-shim implementation, need to rework it
      internalSplit = function internalSplit(separator, limit) {
        var string = String(this);
        if (separator === undefined && limit === 0) return []; // If `separator` is not a regex, use native split

        if (!_isRegexp(separator)) return $split.call(string, separator, limit);
        var output = [];
        var flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.unicode ? 'u' : '') + (separator.sticky ? 'y' : '');
        var lastLastIndex = 0;
        var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0; // Make `global` and avoid `lastIndex` issues by working with a copy

        var separatorCopy = new RegExp(separator.source, flags + 'g');
        var match, lastIndex, lastLength;

        while (match = _regexpExec.call(separatorCopy, string)) {
          lastIndex = separatorCopy[LAST_INDEX$1];

          if (lastIndex > lastLastIndex) {
            output.push(string.slice(lastLastIndex, match.index));
            if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
            lastLength = match[0][LENGTH];
            lastLastIndex = lastIndex;
            if (output[LENGTH] >= splitLimit) break;
          }

          if (separatorCopy[LAST_INDEX$1] === match.index) separatorCopy[LAST_INDEX$1]++; // Avoid an infinite loop
        }

        if (lastLastIndex === string[LENGTH]) {
          if (lastLength || !separatorCopy.test('')) output.push('');
        } else output.push(string.slice(lastLastIndex));

        return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
      }; // Chakra, V8

    } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
      internalSplit = function internalSplit(separator, limit) {
        return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
      };
    } else {
      internalSplit = $split;
    }

    return [// `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = defined(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined ? splitter.call(separator, O, limit) : internalSplit.call(String(O), separator, limit);
    }, // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
      if (res.done) return res.value;
      var rx = _anObject(regexp);
      var S = String(this);
      var C = _speciesConstructor(rx, RegExp);
      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') + (rx.multiline ? 'm' : '') + (rx.unicode ? 'u' : '') + (SUPPORTS_Y ? 'y' : 'g'); // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.

      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return _regexpExecAbstract(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];

      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = _regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;

        if (z === null || (e = $min(_toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p) {
          q = _advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;

          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }

          q = p = e;
        }
      }

      A.push(S.slice(p));
      return A;
    }];
  });

  var _anInstance = function _anInstance(it, Constructor, name, forbiddenField) {
    if (!(it instanceof Constructor) || forbiddenField !== undefined && forbiddenField in it) {
      throw TypeError(name + ': incorrect invocation!');
    }

    return it;
  };

  var _forOf = createCommonjsModule(function (module) {
    var BREAK = {};
    var RETURN = {};

    var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
      var iterFn = ITERATOR ? function () {
        return iterable;
      } : core_getIteratorMethod(iterable);
      var f = _ctx(fn, that, entries ? 2 : 1);
      var index = 0;
      var length, step, iterator, result;
      if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!'); // fast case for arrays with default iterator

      if (_isArrayIter(iterFn)) for (length = _toLength(iterable.length); length > index; index++) {
        result = entries ? f(_anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
        if (result === BREAK || result === RETURN) return result;
      } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
        result = _iterCall(iterator, f, step.value, entries);
        if (result === BREAK || result === RETURN) return result;
      }
    };

    exports.BREAK = BREAK;
    exports.RETURN = RETURN;
  });

  var process$1 = _global.process;
  var setTask = _global.setImmediate;
  var clearTask = _global.clearImmediate;
  var MessageChannel = _global.MessageChannel;
  var Dispatch = _global.Dispatch;
  var counter = 0;
  var queue = {};
  var ONREADYSTATECHANGE = 'onreadystatechange';
  var defer, channel, port;

  var run = function run() {
    var id = +this; // eslint-disable-next-line no-prototype-builtins

    if (queue.hasOwnProperty(id)) {
      var fn = queue[id];
      delete queue[id];
      fn();
    }
  };

  var listener = function listener(event) {
    run.call(event.data);
  }; // Node.js 0.9+ & IE10+ has setImmediate, otherwise:


  if (!setTask || !clearTask) {
    setTask = function setImmediate(fn) {
      var args = [];
      var i = 1;

      while (arguments.length > i) {
        args.push(arguments[i++]);
      }

      queue[++counter] = function () {
        // eslint-disable-next-line no-new-func
        _invoke(typeof fn == 'function' ? fn : Function(fn), args);
      };

      defer(counter);
      return counter;
    };

    clearTask = function clearImmediate(id) {
      delete queue[id];
    }; // Node.js 0.8-


    if (_cof(process$1) == 'process') {
      defer = function defer(id) {
        process$1.nextTick(_ctx(run, id, 1));
      }; // Sphere (JS game engine) Dispatch API

    } else if (Dispatch && Dispatch.now) {
      defer = function defer(id) {
        Dispatch.now(_ctx(run, id, 1));
      }; // Browsers with MessageChannel, includes WebWorkers

    } else if (MessageChannel) {
      channel = new MessageChannel();
      port = channel.port2;
      channel.port1.onmessage = listener;
      defer = _ctx(port.postMessage, port, 1); // Browsers with postMessage, skip WebWorkers
      // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
    } else if (_global.addEventListener && typeof postMessage == 'function' && !_global.importScripts) {
      defer = function defer(id) {
        _global.postMessage(id + '', '*');
      };

      _global.addEventListener('message', listener, false); // IE8-
    } else if (ONREADYSTATECHANGE in _domCreate('script')) {
      defer = function defer(id) {
        _html.appendChild(_domCreate('script'))[ONREADYSTATECHANGE] = function () {
          _html.removeChild(this);
          run.call(id);
        };
      }; // Rest old browsers

    } else {
      defer = function defer(id) {
        setTimeout(_ctx(run, id, 1), 0);
      };
    }
  }

  var _task = {
    set: setTask,
    clear: clearTask
  };

  var macrotask = _task.set;
  var Observer = _global.MutationObserver || _global.WebKitMutationObserver;
  var process$2 = _global.process;
  var Promise$1 = _global.Promise;
  var isNode = _cof(process$2) == 'process';

  var _microtask = function _microtask() {
    var head, last, notify;

    var flush = function flush() {
      var parent, fn;
      if (isNode && (parent = process$2.domain)) parent.exit();

      while (head) {
        fn = head.fn;
        head = head.next;

        try {
          fn();
        } catch (e) {
          if (head) notify();else last = undefined;
          throw e;
        }
      }

      last = undefined;
      if (parent) parent.enter();
    }; // Node.js


    if (isNode) {
      notify = function notify() {
        process$2.nextTick(flush);
      }; // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339

    } else if (Observer && !(_global.navigator && _global.navigator.standalone)) {
      var toggle = true;
      var node = document.createTextNode('');
      new Observer(flush).observe(node, {
        characterData: true
      }); // eslint-disable-line no-new

      notify = function notify() {
        node.data = toggle = !toggle;
      }; // environments with maybe non-completely correct, but existent Promise

    } else if (Promise$1 && Promise$1.resolve) {
      // Promise.resolve without an argument throws an error in LG WebOS 2
      var promise = Promise$1.resolve(undefined);

      notify = function notify() {
        promise.then(flush);
      }; // for other environments - macrotask based on:
      // - setImmediate
      // - MessageChannel
      // - window.postMessag
      // - onreadystatechange
      // - setTimeout

    } else {
      notify = function notify() {
        // strange IE + webpack dev server bug - use .call(global)
        macrotask.call(_global, flush);
      };
    }

    return function (fn) {
      var task = {
        fn: fn,
        next: undefined
      };
      if (last) last.next = task;

      if (!head) {
        head = task;
        notify();
      }

      last = task;
    };
  };

  function PromiseCapability(C) {
    var resolve, reject;
    this.promise = new C(function ($$resolve, $$reject) {
      if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
      resolve = $$resolve;
      reject = $$reject;
    });
    this.resolve = _aFunction(resolve);
    this.reject = _aFunction(reject);
  }

  var f$7 = function f(C) {
    return new PromiseCapability(C);
  };

  var _newPromiseCapability = {
    f: f$7
  };

  var _perform = function _perform(exec) {
    try {
      return {
        e: false,
        v: exec()
      };
    } catch (e) {
      return {
        e: true,
        v: e
      };
    }
  };

  var navigator$1 = _global.navigator;

  var _userAgent = navigator$1 && navigator$1.userAgent || '';

  var _promiseResolve = function _promiseResolve(C, x) {
    _anObject(C);
    if (_isObject(x) && x.constructor === C) return x;
    var promiseCapability = _newPromiseCapability.f(C);
    var resolve = promiseCapability.resolve;
    resolve(x);
    return promiseCapability.promise;
  };

  var _redefineAll = function _redefineAll(target, src, safe) {
    for (var key in src) {
      _redefine(target, key, src[key], safe);
    }

    return target;
  };

  var task = _task.set;
  var microtask = _microtask();
  var PROMISE = 'Promise';
  var TypeError$1 = _global.TypeError;
  var process$3 = _global.process;
  var versions = process$3 && process$3.versions;
  var v8 = versions && versions.v8 || '';
  var $Promise = _global[PROMISE];
  var isNode$1 = _classof(process$3) == 'process';

  var empty = function empty() {
    /* empty */
  };

  var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
  var newPromiseCapability = newGenericPromiseCapability = _newPromiseCapability.f;
  var USE_NATIVE$1 = !!function () {
    try {
      // correct subclassing with @@species support
      var promise = $Promise.resolve(1);

      var FakePromise = (promise.constructor = {})[_wks('species')] = function (exec) {
        exec(empty, empty);
      }; // unhandled rejections tracking support, NodeJS Promise without it fails @@species test


      return (isNode$1 || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0 && _userAgent.indexOf('Chrome/66') === -1;
    } catch (e) {
      /* empty */
    }
  }(); // helpers

  var isThenable = function isThenable(it) {
    var then;
    return _isObject(it) && typeof (then = it.then) == 'function' ? then : false;
  };

  var notify = function notify(promise, isReject) {
    if (promise._n) return;
    promise._n = true;
    var chain = promise._c;
    microtask(function () {
      var value = promise._v;
      var ok = promise._s == 1;
      var i = 0;

      var run = function run(reaction) {
        var handler = ok ? reaction.ok : reaction.fail;
        var resolve = reaction.resolve;
        var reject = reaction.reject;
        var domain = reaction.domain;
        var result, then, exited;

        try {
          if (handler) {
            if (!ok) {
              if (promise._h == 2) onHandleUnhandled(promise);
              promise._h = 1;
            }

            if (handler === true) result = value;else {
              if (domain) domain.enter();
              result = handler(value); // may throw

              if (domain) {
                domain.exit();
                exited = true;
              }
            }

            if (result === reaction.promise) {
              reject(TypeError$1('Promise-chain cycle'));
            } else if (then = isThenable(result)) {
              then.call(result, resolve, reject);
            } else resolve(result);
          } else reject(value);
        } catch (e) {
          if (domain && !exited) domain.exit();
          reject(e);
        }
      };

      while (chain.length > i) {
        run(chain[i++]);
      } // variable length - can't use forEach


      promise._c = [];
      promise._n = false;
      if (isReject && !promise._h) onUnhandled(promise);
    });
  };

  var onUnhandled = function onUnhandled(promise) {
    task.call(_global, function () {
      var value = promise._v;
      var unhandled = isUnhandled(promise);
      var result, handler, console;

      if (unhandled) {
        result = _perform(function () {
          if (isNode$1) {
            process$3.emit('unhandledRejection', value, promise);
          } else if (handler = _global.onunhandledrejection) {
            handler({
              promise: promise,
              reason: value
            });
          } else if ((console = _global.console) && console.error) {
            console.error('Unhandled promise rejection', value);
          }
        }); // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should

        promise._h = isNode$1 || isUnhandled(promise) ? 2 : 1;
      }

      promise._a = undefined;
      if (unhandled && result.e) throw result.v;
    });
  };

  var isUnhandled = function isUnhandled(promise) {
    return promise._h !== 1 && (promise._a || promise._c).length === 0;
  };

  var onHandleUnhandled = function onHandleUnhandled(promise) {
    task.call(_global, function () {
      var handler;

      if (isNode$1) {
        process$3.emit('rejectionHandled', promise);
      } else if (handler = _global.onrejectionhandled) {
        handler({
          promise: promise,
          reason: promise._v
        });
      }
    });
  };

  var $reject = function $reject(value) {
    var promise = this;
    if (promise._d) return;
    promise._d = true;
    promise = promise._w || promise; // unwrap

    promise._v = value;
    promise._s = 2;
    if (!promise._a) promise._a = promise._c.slice();
    notify(promise, true);
  };

  var $resolve = function $resolve(value) {
    var promise = this;
    var then;
    if (promise._d) return;
    promise._d = true;
    promise = promise._w || promise; // unwrap

    try {
      if (promise === value) throw TypeError$1("Promise can't be resolved itself");

      if (then = isThenable(value)) {
        microtask(function () {
          var wrapper = {
            _w: promise,
            _d: false
          }; // wrap

          try {
            then.call(value, _ctx($resolve, wrapper, 1), _ctx($reject, wrapper, 1));
          } catch (e) {
            $reject.call(wrapper, e);
          }
        });
      } else {
        promise._v = value;
        promise._s = 1;
        notify(promise, false);
      }
    } catch (e) {
      $reject.call({
        _w: promise,
        _d: false
      }, e); // wrap
    }
  }; // constructor polyfill


  if (!USE_NATIVE$1) {
    // 25.4.3.1 Promise(executor)
    $Promise = function Promise(executor) {
      _anInstance(this, $Promise, PROMISE, '_h');
      _aFunction(executor);
      Internal.call(this);

      try {
        executor(_ctx($resolve, this, 1), _ctx($reject, this, 1));
      } catch (err) {
        $reject.call(this, err);
      }
    }; // eslint-disable-next-line no-unused-vars


    Internal = function Promise(executor) {
      this._c = []; // <- awaiting reactions

      this._a = undefined; // <- checked in isUnhandled reactions

      this._s = 0; // <- state

      this._d = false; // <- done

      this._v = undefined; // <- value

      this._h = 0; // <- rejection state, 0 - default, 1 - handled, 2 - unhandled

      this._n = false; // <- notify
    };

    Internal.prototype = _redefineAll($Promise.prototype, {
      // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
      then: function then(onFulfilled, onRejected) {
        var reaction = newPromiseCapability(_speciesConstructor(this, $Promise));
        reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
        reaction.fail = typeof onRejected == 'function' && onRejected;
        reaction.domain = isNode$1 ? process$3.domain : undefined;

        this._c.push(reaction);

        if (this._a) this._a.push(reaction);
        if (this._s) notify(this, false);
        return reaction.promise;
      },
      // 25.4.5.1 Promise.prototype.catch(onRejected)
      'catch': function _catch(onRejected) {
        return this.then(undefined, onRejected);
      }
    });

    OwnPromiseCapability = function OwnPromiseCapability() {
      var promise = new Internal();
      this.promise = promise;
      this.resolve = _ctx($resolve, promise, 1);
      this.reject = _ctx($reject, promise, 1);
    };

    _newPromiseCapability.f = newPromiseCapability = function newPromiseCapability(C) {
      return C === $Promise || C === Wrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
    };
  }

  _export(_export.G + _export.W + _export.F * !USE_NATIVE$1, {
    Promise: $Promise
  });
  _setToStringTag($Promise, PROMISE);
  _setSpecies(PROMISE);
  Wrapper = _core[PROMISE]; // statics

  _export(_export.S + _export.F * !USE_NATIVE$1, PROMISE, {
    // 25.4.4.5 Promise.reject(r)
    reject: function reject(r) {
      var capability = newPromiseCapability(this);
      var $$reject = capability.reject;
      $$reject(r);
      return capability.promise;
    }
  });
  _export(_export.S + _export.F * ( !USE_NATIVE$1), PROMISE, {
    // 25.4.4.6 Promise.resolve(x)
    resolve: function resolve(x) {
      return _promiseResolve( this, x);
    }
  });
  _export(_export.S + _export.F * !(USE_NATIVE$1 && _iterDetect(function (iter) {
    $Promise.all(iter)['catch'](empty);
  })), PROMISE, {
    // 25.4.4.1 Promise.all(iterable)
    all: function all(iterable) {
      var C = this;
      var capability = newPromiseCapability(C);
      var resolve = capability.resolve;
      var reject = capability.reject;
      var result = _perform(function () {
        var values = [];
        var index = 0;
        var remaining = 1;
        _forOf(iterable, false, function (promise) {
          var $index = index++;
          var alreadyCalled = false;
          values.push(undefined);
          remaining++;
          C.resolve(promise).then(function (value) {
            if (alreadyCalled) return;
            alreadyCalled = true;
            values[$index] = value;
            --remaining || resolve(values);
          }, reject);
        });
        --remaining || resolve(values);
      });
      if (result.e) reject(result.v);
      return capability.promise;
    },
    // 25.4.4.4 Promise.race(iterable)
    race: function race(iterable) {
      var C = this;
      var capability = newPromiseCapability(C);
      var reject = capability.reject;
      var result = _perform(function () {
        _forOf(iterable, false, function (promise) {
          C.resolve(promise).then(capability.resolve, reject);
        });
      });
      if (result.e) reject(result.v);
      return capability.promise;
    }
  });

  var _validateCollection = function _validateCollection(it, TYPE) {
    if (!_isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
    return it;
  };

  var dP$5 = _objectDp.f;
  var fastKey = _meta.fastKey;
  var SIZE = _descriptors ? '_s' : 'size';

  var getEntry = function getEntry(that, key) {
    // fast case
    var index = fastKey(key);
    var entry;
    if (index !== 'F') return that._i[index]; // frozen object case

    for (entry = that._f; entry; entry = entry.n) {
      if (entry.k == key) return entry;
    }
  };

  var _collectionStrong = {
    getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
      var C = wrapper(function (that, iterable) {
        _anInstance(that, C, NAME, '_i');
        that._t = NAME; // collection type

        that._i = _objectCreate(null); // index

        that._f = undefined; // first entry

        that._l = undefined; // last entry

        that[SIZE] = 0; // size

        if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
      });
      _redefineAll(C.prototype, {
        // 23.1.3.1 Map.prototype.clear()
        // 23.2.3.2 Set.prototype.clear()
        clear: function clear() {
          for (var that = _validateCollection(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
            entry.r = true;
            if (entry.p) entry.p = entry.p.n = undefined;
            delete data[entry.i];
          }

          that._f = that._l = undefined;
          that[SIZE] = 0;
        },
        // 23.1.3.3 Map.prototype.delete(key)
        // 23.2.3.4 Set.prototype.delete(value)
        'delete': function _delete(key) {
          var that = _validateCollection(this, NAME);
          var entry = getEntry(that, key);

          if (entry) {
            var next = entry.n;
            var prev = entry.p;
            delete that._i[entry.i];
            entry.r = true;
            if (prev) prev.n = next;
            if (next) next.p = prev;
            if (that._f == entry) that._f = next;
            if (that._l == entry) that._l = prev;
            that[SIZE]--;
          }

          return !!entry;
        },
        // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
        // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
        forEach: function forEach(callbackfn
        /* , that = undefined */
        ) {
          _validateCollection(this, NAME);
          var f = _ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
          var entry;

          while (entry = entry ? entry.n : this._f) {
            f(entry.v, entry.k, this); // revert to the last existing entry

            while (entry && entry.r) {
              entry = entry.p;
            }
          }
        },
        // 23.1.3.7 Map.prototype.has(key)
        // 23.2.3.7 Set.prototype.has(value)
        has: function has(key) {
          return !!getEntry(_validateCollection(this, NAME), key);
        }
      });
      if (_descriptors) dP$5(C.prototype, 'size', {
        get: function get() {
          return _validateCollection(this, NAME)[SIZE];
        }
      });
      return C;
    },
    def: function def(that, key, value) {
      var entry = getEntry(that, key);
      var prev, index; // change existing entry

      if (entry) {
        entry.v = value; // create new entry
      } else {
        that._l = entry = {
          i: index = fastKey(key, true),
          // <- index
          k: key,
          // <- key
          v: value,
          // <- value
          p: prev = that._l,
          // <- previous entry
          n: undefined,
          // <- next entry
          r: false // <- removed

        };
        if (!that._f) that._f = entry;
        if (prev) prev.n = entry;
        that[SIZE]++; // add to index

        if (index !== 'F') that._i[index] = entry;
      }

      return that;
    },
    getEntry: getEntry,
    setStrong: function setStrong(C, NAME, IS_MAP) {
      // add .keys, .values, .entries, [@@iterator]
      // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
      _iterDefine(C, NAME, function (iterated, kind) {
        this._t = _validateCollection(iterated, NAME); // target

        this._k = kind; // kind

        this._l = undefined; // previous
      }, function () {
        var that = this;
        var kind = that._k;
        var entry = that._l; // revert to the last existing entry

        while (entry && entry.r) {
          entry = entry.p;
        } // get next entry


        if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
          // or finish the iteration
          that._t = undefined;
          return _iterStep(1);
        } // return step by kind


        if (kind == 'keys') return _iterStep(0, entry.k);
        if (kind == 'values') return _iterStep(0, entry.v);
        return _iterStep(0, [entry.k, entry.v]);
      }, IS_MAP ? 'entries' : 'values', !IS_MAP, true); // add [@@species], 23.1.2.2, 23.2.2.2

      _setSpecies(NAME);
    }
  };

  var _collection = function _collection(NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
    var Base = _global[NAME];
    var C = Base;
    var ADDER = IS_MAP ? 'set' : 'add';
    var proto = C && C.prototype;
    var O = {};

    var fixMethod = function fixMethod(KEY) {
      var fn = proto[KEY];
      _redefine(proto, KEY, KEY == 'delete' ? function (a) {
        return IS_WEAK && !_isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !_isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !_isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) {
        fn.call(this, a === 0 ? 0 : a);
        return this;
      } : function set(a, b) {
        fn.call(this, a === 0 ? 0 : a, b);
        return this;
      });
    };

    if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !_fails(function () {
      new C().entries().next();
    }))) {
      // create collection constructor
      C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
      _redefineAll(C.prototype, methods);
      _meta.NEED = true;
    } else {
      var instance = new C(); // early implementations not supports chaining

      var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance; // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false

      var THROWS_ON_PRIMITIVES = _fails(function () {
        instance.has(1);
      }); // most early implementations doesn't supports iterables, most modern - not close it correctly

      var ACCEPT_ITERABLES = _iterDetect(function (iter) {
        new C(iter);
      }); // eslint-disable-line no-new
      // for early implementations -0 and +0 not the same

      var BUGGY_ZERO = !IS_WEAK && _fails(function () {
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new C();
        var index = 5;

        while (index--) {
          $instance[ADDER](index, index);
        }

        return !$instance.has(-0);
      });

      if (!ACCEPT_ITERABLES) {
        C = wrapper(function (target, iterable) {
          _anInstance(target, C, NAME);
          var that = _inheritIfRequired(new Base(), target, C);
          if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
          return that;
        });
        C.prototype = proto;
        proto.constructor = C;
      }

      if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
        fixMethod('delete');
        fixMethod('has');
        IS_MAP && fixMethod('get');
      }

      if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER); // weak collections should not contains .clear method

      if (IS_WEAK && proto.clear) delete proto.clear;
    }

    _setToStringTag(C, NAME);
    O[NAME] = C;
    _export(_export.G + _export.W + _export.F * (C != Base), O);
    if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);
    return C;
  };

  var MAP = 'Map'; // 23.1 Map Objects

  var es6_map = _collection(MAP, function (get) {
    return function Map() {
      return get(this, arguments.length > 0 ? arguments[0] : undefined);
    };
  }, {
    // 23.1.3.6 Map.prototype.get(key)
    get: function get(key) {
      var entry = _collectionStrong.getEntry(_validateCollection(this, MAP), key);
      return entry && entry.v;
    },
    // 23.1.3.9 Map.prototype.set(key, value)
    set: function set(key, value) {
      return _collectionStrong.def(_validateCollection(this, MAP), key === 0 ? 0 : key, value);
    }
  }, _collectionStrong, true);

  var SET = 'Set'; // 23.2 Set Objects

  var es6_set = _collection(SET, function (get) {
    return function Set() {
      return get(this, arguments.length > 0 ? arguments[0] : undefined);
    };
  }, {
    // 23.2.3.1 Set.prototype.add(value)
    add: function add(value) {
      return _collectionStrong.def(_validateCollection(this, SET), value = value === 0 ? 0 : value, value);
    }
  }, _collectionStrong);

  var getWeak = _meta.getWeak;
  var arrayFind = _arrayMethods(5);
  var arrayFindIndex = _arrayMethods(6);
  var id$1 = 0; // fallback for uncaught frozen keys

  var uncaughtFrozenStore = function uncaughtFrozenStore(that) {
    return that._l || (that._l = new UncaughtFrozenStore());
  };

  var UncaughtFrozenStore = function UncaughtFrozenStore() {
    this.a = [];
  };

  var findUncaughtFrozen = function findUncaughtFrozen(store, key) {
    return arrayFind(store.a, function (it) {
      return it[0] === key;
    });
  };

  UncaughtFrozenStore.prototype = {
    get: function get(key) {
      var entry = findUncaughtFrozen(this, key);
      if (entry) return entry[1];
    },
    has: function has(key) {
      return !!findUncaughtFrozen(this, key);
    },
    set: function set(key, value) {
      var entry = findUncaughtFrozen(this, key);
      if (entry) entry[1] = value;else this.a.push([key, value]);
    },
    'delete': function _delete(key) {
      var index = arrayFindIndex(this.a, function (it) {
        return it[0] === key;
      });
      if (~index) this.a.splice(index, 1);
      return !!~index;
    }
  };
  var _collectionWeak = {
    getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
      var C = wrapper(function (that, iterable) {
        _anInstance(that, C, NAME, '_i');
        that._t = NAME; // collection type

        that._i = id$1++; // collection id

        that._l = undefined; // leak store for uncaught frozen objects

        if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
      });
      _redefineAll(C.prototype, {
        // 23.3.3.2 WeakMap.prototype.delete(key)
        // 23.4.3.3 WeakSet.prototype.delete(value)
        'delete': function _delete(key) {
          if (!_isObject(key)) return false;
          var data = getWeak(key);
          if (data === true) return uncaughtFrozenStore(_validateCollection(this, NAME))['delete'](key);
          return data && _has(data, this._i) && delete data[this._i];
        },
        // 23.3.3.4 WeakMap.prototype.has(key)
        // 23.4.3.4 WeakSet.prototype.has(value)
        has: function has(key) {
          if (!_isObject(key)) return false;
          var data = getWeak(key);
          if (data === true) return uncaughtFrozenStore(_validateCollection(this, NAME)).has(key);
          return data && _has(data, this._i);
        }
      });
      return C;
    },
    def: function def(that, key, value) {
      var data = getWeak(_anObject(key), true);
      if (data === true) uncaughtFrozenStore(that).set(key, value);else data[that._i] = value;
      return that;
    },
    ufstore: uncaughtFrozenStore
  };

  var es6_weakMap = createCommonjsModule(function (module) {

    var each = _arrayMethods(0);
    var NATIVE_WEAK_MAP = _validateCollection;
    var IS_IE11 = !_global.ActiveXObject && 'ActiveXObject' in _global;
    var WEAK_MAP = 'WeakMap';
    var getWeak = _meta.getWeak;
    var isExtensible = Object.isExtensible;
    var uncaughtFrozenStore = _collectionWeak.ufstore;
    var InternalMap;

    var wrapper = function wrapper(get) {
      return function WeakMap() {
        return get(this, arguments.length > 0 ? arguments[0] : undefined);
      };
    };

    var methods = {
      // 23.3.3.3 WeakMap.prototype.get(key)
      get: function get(key) {
        if (_isObject(key)) {
          var data = getWeak(key);
          if (data === true) return uncaughtFrozenStore(_validateCollection(this, WEAK_MAP)).get(key);
          return data ? data[this._i] : undefined;
        }
      },
      // 23.3.3.5 WeakMap.prototype.set(key, value)
      set: function set(key, value) {
        return _collectionWeak.def(_validateCollection(this, WEAK_MAP), key, value);
      }
    }; // 23.3 WeakMap Objects

    var $WeakMap = module.exports = _collection(WEAK_MAP, wrapper, methods, _collectionWeak, true, true); // IE11 WeakMap frozen keys fix

    if (NATIVE_WEAK_MAP && IS_IE11) {
      InternalMap = _collectionWeak.getConstructor(wrapper, WEAK_MAP);
      _objectAssign(InternalMap.prototype, methods);
      _meta.NEED = true;
      each(['delete', 'has', 'get', 'set'], function (key) {
        var proto = $WeakMap.prototype;
        var method = proto[key];
        _redefine(proto, key, function (a, b) {
          // store frozen objects on internal weakmap shim
          if (_isObject(a) && !isExtensible(a)) {
            if (!this._f) this._f = new InternalMap();

            var result = this._f[key](a, b);

            return key == 'set' ? this : result; // store all the rest on native weakmap
          }

          return method.call(this, a, b);
        });
      });
    }
  });

  var WEAK_SET = 'WeakSet'; // 23.4 WeakSet Objects

  _collection(WEAK_SET, function (get) {
    return function WeakSet() {
      return get(this, arguments.length > 0 ? arguments[0] : undefined);
    };
  }, {
    // 23.4.3.1 WeakSet.prototype.add(value)
    add: function add(value) {
      return _collectionWeak.def(_validateCollection(this, WEAK_SET), value, true);
    }
  }, _collectionWeak, false, true);

  var TYPED = _uid('typed_array');
  var VIEW = _uid('view');
  var ABV = !!(_global.ArrayBuffer && _global.DataView);
  var CONSTR = ABV;
  var i$1 = 0;
  var l = 9;
  var Typed;
  var TypedArrayConstructors = 'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'.split(',');

  while (i$1 < l) {
    if (Typed = _global[TypedArrayConstructors[i$1++]]) {
      _hide(Typed.prototype, TYPED, true);
      _hide(Typed.prototype, VIEW, true);
    } else CONSTR = false;
  }

  var _typed = {
    ABV: ABV,
    CONSTR: CONSTR,
    TYPED: TYPED,
    VIEW: VIEW
  };

  var _toIndex = function _toIndex(it) {
    if (it === undefined) return 0;
    var number = _toInteger(it);
    var length = _toLength(number);
    if (number !== length) throw RangeError('Wrong length!');
    return length;
  };

  var _typedBuffer = createCommonjsModule(function (module, exports) {

    var gOPN = _objectGopn.f;
    var dP = _objectDp.f;
    var ARRAY_BUFFER = 'ArrayBuffer';
    var DATA_VIEW = 'DataView';
    var PROTOTYPE = 'prototype';
    var WRONG_LENGTH = 'Wrong length!';
    var WRONG_INDEX = 'Wrong index!';
    var $ArrayBuffer = _global[ARRAY_BUFFER];
    var $DataView = _global[DATA_VIEW];
    var Math = _global.Math;
    var RangeError = _global.RangeError; // eslint-disable-next-line no-shadow-restricted-names

    var Infinity = _global.Infinity;
    var BaseBuffer = $ArrayBuffer;
    var abs = Math.abs;
    var pow = Math.pow;
    var floor = Math.floor;
    var log = Math.log;
    var LN2 = Math.LN2;
    var BUFFER = 'buffer';
    var BYTE_LENGTH = 'byteLength';
    var BYTE_OFFSET = 'byteOffset';
    var $BUFFER = _descriptors ? '_b' : BUFFER;
    var $LENGTH = _descriptors ? '_l' : BYTE_LENGTH;
    var $OFFSET = _descriptors ? '_o' : BYTE_OFFSET; // IEEE754 conversions based on https://github.com/feross/ieee754

    function packIEEE754(value, mLen, nBytes) {
      var buffer = new Array(nBytes);
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
      var i = 0;
      var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
      var e, m, c;
      value = abs(value); // eslint-disable-next-line no-self-compare

      if (value != value || value === Infinity) {
        // eslint-disable-next-line no-self-compare
        m = value != value ? 1 : 0;
        e = eMax;
      } else {
        e = floor(log(value) / LN2);

        if (value * (c = pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }

        if (e + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * pow(2, 1 - eBias);
        }

        if (value * c >= 2) {
          e++;
          c /= 2;
        }

        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * pow(2, mLen);
          e = e + eBias;
        } else {
          m = value * pow(2, eBias - 1) * pow(2, mLen);
          e = 0;
        }
      }

      for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8) {
      }

      e = e << mLen | m;
      eLen += mLen;

      for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8) {
      }

      buffer[--i] |= s * 128;
      return buffer;
    }

    function unpackIEEE754(buffer, mLen, nBytes) {
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = eLen - 7;
      var i = nBytes - 1;
      var s = buffer[i--];
      var e = s & 127;
      var m;
      s >>= 7;

      for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8) {
      }

      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;

      for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8) {
      }

      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : s ? -Infinity : Infinity;
      } else {
        m = m + pow(2, mLen);
        e = e - eBias;
      }

      return (s ? -1 : 1) * m * pow(2, e - mLen);
    }

    function unpackI32(bytes) {
      return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
    }

    function packI8(it) {
      return [it & 0xff];
    }

    function packI16(it) {
      return [it & 0xff, it >> 8 & 0xff];
    }

    function packI32(it) {
      return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
    }

    function packF64(it) {
      return packIEEE754(it, 52, 8);
    }

    function packF32(it) {
      return packIEEE754(it, 23, 4);
    }

    function addGetter(C, key, internal) {
      dP(C[PROTOTYPE], key, {
        get: function get() {
          return this[internal];
        }
      });
    }

    function get(view, bytes, index, isLittleEndian) {
      var numIndex = +index;
      var intIndex = _toIndex(numIndex);
      if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
      var store = view[$BUFFER]._b;
      var start = intIndex + view[$OFFSET];
      var pack = store.slice(start, start + bytes);
      return isLittleEndian ? pack : pack.reverse();
    }

    function set(view, bytes, index, conversion, value, isLittleEndian) {
      var numIndex = +index;
      var intIndex = _toIndex(numIndex);
      if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
      var store = view[$BUFFER]._b;
      var start = intIndex + view[$OFFSET];
      var pack = conversion(+value);

      for (var i = 0; i < bytes; i++) {
        store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
      }
    }

    if (!_typed.ABV) {
      $ArrayBuffer = function ArrayBuffer(length) {
        _anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
        var byteLength = _toIndex(length);
        this._b = _arrayFill.call(new Array(byteLength), 0);
        this[$LENGTH] = byteLength;
      };

      $DataView = function DataView(buffer, byteOffset, byteLength) {
        _anInstance(this, $DataView, DATA_VIEW);
        _anInstance(buffer, $ArrayBuffer, DATA_VIEW);
        var bufferLength = buffer[$LENGTH];
        var offset = _toInteger(byteOffset);
        if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
        byteLength = byteLength === undefined ? bufferLength - offset : _toLength(byteLength);
        if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
        this[$BUFFER] = buffer;
        this[$OFFSET] = offset;
        this[$LENGTH] = byteLength;
      };

      if (_descriptors) {
        addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
        addGetter($DataView, BUFFER, '_b');
        addGetter($DataView, BYTE_LENGTH, '_l');
        addGetter($DataView, BYTE_OFFSET, '_o');
      }

      _redefineAll($DataView[PROTOTYPE], {
        getInt8: function getInt8(byteOffset) {
          return get(this, 1, byteOffset)[0] << 24 >> 24;
        },
        getUint8: function getUint8(byteOffset) {
          return get(this, 1, byteOffset)[0];
        },
        getInt16: function getInt16(byteOffset
        /* , littleEndian */
        ) {
          var bytes = get(this, 2, byteOffset, arguments[1]);
          return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
        },
        getUint16: function getUint16(byteOffset
        /* , littleEndian */
        ) {
          var bytes = get(this, 2, byteOffset, arguments[1]);
          return bytes[1] << 8 | bytes[0];
        },
        getInt32: function getInt32(byteOffset
        /* , littleEndian */
        ) {
          return unpackI32(get(this, 4, byteOffset, arguments[1]));
        },
        getUint32: function getUint32(byteOffset
        /* , littleEndian */
        ) {
          return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
        },
        getFloat32: function getFloat32(byteOffset
        /* , littleEndian */
        ) {
          return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
        },
        getFloat64: function getFloat64(byteOffset
        /* , littleEndian */
        ) {
          return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
        },
        setInt8: function setInt8(byteOffset, value) {
          set(this, 1, byteOffset, packI8, value);
        },
        setUint8: function setUint8(byteOffset, value) {
          set(this, 1, byteOffset, packI8, value);
        },
        setInt16: function setInt16(byteOffset, value
        /* , littleEndian */
        ) {
          set(this, 2, byteOffset, packI16, value, arguments[2]);
        },
        setUint16: function setUint16(byteOffset, value
        /* , littleEndian */
        ) {
          set(this, 2, byteOffset, packI16, value, arguments[2]);
        },
        setInt32: function setInt32(byteOffset, value
        /* , littleEndian */
        ) {
          set(this, 4, byteOffset, packI32, value, arguments[2]);
        },
        setUint32: function setUint32(byteOffset, value
        /* , littleEndian */
        ) {
          set(this, 4, byteOffset, packI32, value, arguments[2]);
        },
        setFloat32: function setFloat32(byteOffset, value
        /* , littleEndian */
        ) {
          set(this, 4, byteOffset, packF32, value, arguments[2]);
        },
        setFloat64: function setFloat64(byteOffset, value
        /* , littleEndian */
        ) {
          set(this, 8, byteOffset, packF64, value, arguments[2]);
        }
      });
    } else {
      if (!_fails(function () {
        $ArrayBuffer(1);
      }) || !_fails(function () {
        new $ArrayBuffer(-1); // eslint-disable-line no-new
      }) || _fails(function () {
        new $ArrayBuffer(); // eslint-disable-line no-new

        new $ArrayBuffer(1.5); // eslint-disable-line no-new

        new $ArrayBuffer(NaN); // eslint-disable-line no-new

        return $ArrayBuffer.name != ARRAY_BUFFER;
      })) {
        $ArrayBuffer = function ArrayBuffer(length) {
          _anInstance(this, $ArrayBuffer);
          return new BaseBuffer(_toIndex(length));
        };

        var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];

        for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
          if (!((key = keys[j++]) in $ArrayBuffer)) _hide($ArrayBuffer, key, BaseBuffer[key]);
        }

        ArrayBufferProto.constructor = $ArrayBuffer;
      } // iOS Safari 7.x bug


      var view = new $DataView(new $ArrayBuffer(2));
      var $setInt8 = $DataView[PROTOTYPE].setInt8;
      view.setInt8(0, 2147483648);
      view.setInt8(1, 2147483649);
      if (view.getInt8(0) || !view.getInt8(1)) _redefineAll($DataView[PROTOTYPE], {
        setInt8: function setInt8(byteOffset, value) {
          $setInt8.call(this, byteOffset, value << 24 >> 24);
        },
        setUint8: function setUint8(byteOffset, value) {
          $setInt8.call(this, byteOffset, value << 24 >> 24);
        }
      }, true);
    }

    _setToStringTag($ArrayBuffer, ARRAY_BUFFER);
    _setToStringTag($DataView, DATA_VIEW);
    _hide($DataView[PROTOTYPE], _typed.VIEW, true);
    exports[ARRAY_BUFFER] = $ArrayBuffer;
    exports[DATA_VIEW] = $DataView;
  });

  var ArrayBuffer$1 = _global.ArrayBuffer;
  var $ArrayBuffer = _typedBuffer.ArrayBuffer;
  var $DataView = _typedBuffer.DataView;
  var $isView = _typed.ABV && ArrayBuffer$1.isView;
  var $slice = $ArrayBuffer.prototype.slice;
  var VIEW$1 = _typed.VIEW;
  var ARRAY_BUFFER = 'ArrayBuffer';
  _export(_export.G + _export.W + _export.F * (ArrayBuffer$1 !== $ArrayBuffer), {
    ArrayBuffer: $ArrayBuffer
  });
  _export(_export.S + _export.F * !_typed.CONSTR, ARRAY_BUFFER, {
    // 24.1.3.1 ArrayBuffer.isView(arg)
    isView: function isView(it) {
      return $isView && $isView(it) || _isObject(it) && VIEW$1 in it;
    }
  });
  _export(_export.P + _export.U + _export.F * _fails(function () {
    return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
  }), ARRAY_BUFFER, {
    // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
    slice: function slice(start, end) {
      if ($slice !== undefined && end === undefined) return $slice.call(_anObject(this), start); // FF fix

      var len = _anObject(this).byteLength;
      var first = _toAbsoluteIndex(start, len);
      var fin = _toAbsoluteIndex(end === undefined ? len : end, len);
      var result = new (_speciesConstructor(this, $ArrayBuffer))(_toLength(fin - first));
      var viewS = new $DataView(this);
      var viewT = new $DataView(result);
      var index = 0;

      while (first < fin) {
        viewT.setUint8(index++, viewS.getUint8(first++));
      }

      return result;
    }
  });
  _setSpecies(ARRAY_BUFFER);

  _export(_export.G + _export.W + _export.F * !_typed.ABV, {
    DataView: _typedBuffer.DataView
  });

  var _typedArray = createCommonjsModule(function (module) {

    if (_descriptors) {
      var LIBRARY = _library;
      var global = _global;
      var fails = _fails;
      var $export = _export;
      var $typed = _typed;
      var $buffer = _typedBuffer;
      var ctx = _ctx;
      var anInstance = _anInstance;
      var propertyDesc = _propertyDesc;
      var hide = _hide;
      var redefineAll = _redefineAll;
      var toInteger = _toInteger;
      var toLength = _toLength;
      var toIndex = _toIndex;
      var toAbsoluteIndex = _toAbsoluteIndex;
      var toPrimitive = _toPrimitive;
      var has = _has;
      var classof = _classof;
      var isObject = _isObject;
      var toObject = _toObject;
      var isArrayIter = _isArrayIter;
      var create = _objectCreate;
      var getPrototypeOf = _objectGpo;
      var gOPN = _objectGopn.f;
      var getIterFn = core_getIteratorMethod;
      var uid = _uid;
      var wks = _wks;
      var createArrayMethod = _arrayMethods;
      var createArrayIncludes = _arrayIncludes;
      var speciesConstructor = _speciesConstructor;
      var ArrayIterators = es6_array_iterator;
      var Iterators = _iterators;
      var $iterDetect = _iterDetect;
      var setSpecies = _setSpecies;
      var arrayFill = _arrayFill;
      var arrayCopyWithin = _arrayCopyWithin;
      var $DP = _objectDp;
      var $GOPD = _objectGopd;
      var dP = $DP.f;
      var gOPD = $GOPD.f;
      var RangeError = global.RangeError;
      var TypeError = global.TypeError;
      var Uint8Array = global.Uint8Array;
      var ARRAY_BUFFER = 'ArrayBuffer';
      var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
      var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
      var PROTOTYPE = 'prototype';
      var ArrayProto = Array[PROTOTYPE];
      var $ArrayBuffer = $buffer.ArrayBuffer;
      var $DataView = $buffer.DataView;
      var arrayForEach = createArrayMethod(0);
      var arrayFilter = createArrayMethod(2);
      var arraySome = createArrayMethod(3);
      var arrayEvery = createArrayMethod(4);
      var arrayFind = createArrayMethod(5);
      var arrayFindIndex = createArrayMethod(6);
      var arrayIncludes = createArrayIncludes(true);
      var arrayIndexOf = createArrayIncludes(false);
      var arrayValues = ArrayIterators.values;
      var arrayKeys = ArrayIterators.keys;
      var arrayEntries = ArrayIterators.entries;
      var arrayLastIndexOf = ArrayProto.lastIndexOf;
      var arrayReduce = ArrayProto.reduce;
      var arrayReduceRight = ArrayProto.reduceRight;
      var arrayJoin = ArrayProto.join;
      var arraySort = ArrayProto.sort;
      var arraySlice = ArrayProto.slice;
      var arrayToString = ArrayProto.toString;
      var arrayToLocaleString = ArrayProto.toLocaleString;
      var ITERATOR = wks('iterator');
      var TAG = wks('toStringTag');
      var TYPED_CONSTRUCTOR = uid('typed_constructor');
      var DEF_CONSTRUCTOR = uid('def_constructor');
      var ALL_CONSTRUCTORS = $typed.CONSTR;
      var TYPED_ARRAY = $typed.TYPED;
      var VIEW = $typed.VIEW;
      var WRONG_LENGTH = 'Wrong length!';
      var $map = createArrayMethod(1, function (O, length) {
        return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
      });
      var LITTLE_ENDIAN = fails(function () {
        // eslint-disable-next-line no-undef
        return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
      });
      var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
        new Uint8Array(1).set({});
      });

      var toOffset = function toOffset(it, BYTES) {
        var offset = toInteger(it);
        if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
        return offset;
      };

      var validate = function validate(it) {
        if (isObject(it) && TYPED_ARRAY in it) return it;
        throw TypeError(it + ' is not a typed array!');
      };

      var allocate = function allocate(C, length) {
        if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
          throw TypeError('It is not a typed array constructor!');
        }

        return new C(length);
      };

      var speciesFromList = function speciesFromList(O, list) {
        return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
      };

      var fromList = function fromList(C, list) {
        var index = 0;
        var length = list.length;
        var result = allocate(C, length);

        while (length > index) {
          result[index] = list[index++];
        }

        return result;
      };

      var addGetter = function addGetter(it, key, internal) {
        dP(it, key, {
          get: function get() {
            return this._d[internal];
          }
        });
      };

      var $from = function from(source
      /* , mapfn, thisArg */
      ) {
        var O = toObject(source);
        var aLen = arguments.length;
        var mapfn = aLen > 1 ? arguments[1] : undefined;
        var mapping = mapfn !== undefined;
        var iterFn = getIterFn(O);
        var i, length, values, result, step, iterator;

        if (iterFn != undefined && !isArrayIter(iterFn)) {
          for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
            values.push(step.value);
          }

          O = values;
        }

        if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);

        for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
          result[i] = mapping ? mapfn(O[i], i) : O[i];
        }

        return result;
      };

      var $of = function of()
      /* ...items */
      {
        var index = 0;
        var length = arguments.length;
        var result = allocate(this, length);

        while (length > index) {
          result[index] = arguments[index++];
        }

        return result;
      }; // iOS Safari 6.x fails here


      var TO_LOCALE_BUG = !!Uint8Array && fails(function () {
        arrayToLocaleString.call(new Uint8Array(1));
      });

      var $toLocaleString = function toLocaleString() {
        return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
      };

      var proto = {
        copyWithin: function copyWithin(target, start
        /* , end */
        ) {
          return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
        },
        every: function every(callbackfn
        /* , thisArg */
        ) {
          return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        },
        fill: function fill(value
        /* , start, end */
        ) {
          // eslint-disable-line no-unused-vars
          return arrayFill.apply(validate(this), arguments);
        },
        filter: function filter(callbackfn
        /* , thisArg */
        ) {
          return speciesFromList(this, arrayFilter(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined));
        },
        find: function find(predicate
        /* , thisArg */
        ) {
          return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
        },
        findIndex: function findIndex(predicate
        /* , thisArg */
        ) {
          return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
        },
        forEach: function forEach(callbackfn
        /* , thisArg */
        ) {
          arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        },
        indexOf: function indexOf(searchElement
        /* , fromIndex */
        ) {
          return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
        },
        includes: function includes(searchElement
        /* , fromIndex */
        ) {
          return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
        },
        join: function join(separator) {
          // eslint-disable-line no-unused-vars
          return arrayJoin.apply(validate(this), arguments);
        },
        lastIndexOf: function lastIndexOf(searchElement
        /* , fromIndex */
        ) {
          // eslint-disable-line no-unused-vars
          return arrayLastIndexOf.apply(validate(this), arguments);
        },
        map: function map(mapfn
        /* , thisArg */
        ) {
          return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
        },
        reduce: function reduce(callbackfn
        /* , initialValue */
        ) {
          // eslint-disable-line no-unused-vars
          return arrayReduce.apply(validate(this), arguments);
        },
        reduceRight: function reduceRight(callbackfn
        /* , initialValue */
        ) {
          // eslint-disable-line no-unused-vars
          return arrayReduceRight.apply(validate(this), arguments);
        },
        reverse: function reverse() {
          var that = this;
          var length = validate(that).length;
          var middle = Math.floor(length / 2);
          var index = 0;
          var value;

          while (index < middle) {
            value = that[index];
            that[index++] = that[--length];
            that[length] = value;
          }

          return that;
        },
        some: function some(callbackfn
        /* , thisArg */
        ) {
          return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        },
        sort: function sort(comparefn) {
          return arraySort.call(validate(this), comparefn);
        },
        subarray: function subarray(begin, end) {
          var O = validate(this);
          var length = O.length;
          var $begin = toAbsoluteIndex(begin, length);
          return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(O.buffer, O.byteOffset + $begin * O.BYTES_PER_ELEMENT, toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin));
        }
      };

      var $slice = function slice(start, end) {
        return speciesFromList(this, arraySlice.call(validate(this), start, end));
      };

      var $set = function set(arrayLike
      /* , offset */
      ) {
        validate(this);
        var offset = toOffset(arguments[1], 1);
        var length = this.length;
        var src = toObject(arrayLike);
        var len = toLength(src.length);
        var index = 0;
        if (len + offset > length) throw RangeError(WRONG_LENGTH);

        while (index < len) {
          this[offset + index] = src[index++];
        }
      };

      var $iterators = {
        entries: function entries() {
          return arrayEntries.call(validate(this));
        },
        keys: function keys() {
          return arrayKeys.call(validate(this));
        },
        values: function values() {
          return arrayValues.call(validate(this));
        }
      };

      var isTAIndex = function isTAIndex(target, key) {
        return isObject(target) && target[TYPED_ARRAY] && _typeof(key) != 'symbol' && key in target && String(+key) == String(key);
      };

      var $getDesc = function getOwnPropertyDescriptor(target, key) {
        return isTAIndex(target, key = toPrimitive(key, true)) ? propertyDesc(2, target[key]) : gOPD(target, key);
      };

      var $setDesc = function defineProperty(target, key, desc) {
        if (isTAIndex(target, key = toPrimitive(key, true)) && isObject(desc) && has(desc, 'value') && !has(desc, 'get') && !has(desc, 'set') // TODO: add validation descriptor w/o calling accessors
        && !desc.configurable && (!has(desc, 'writable') || desc.writable) && (!has(desc, 'enumerable') || desc.enumerable)) {
          target[key] = desc.value;
          return target;
        }

        return dP(target, key, desc);
      };

      if (!ALL_CONSTRUCTORS) {
        $GOPD.f = $getDesc;
        $DP.f = $setDesc;
      }

      $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
        getOwnPropertyDescriptor: $getDesc,
        defineProperty: $setDesc
      });

      if (fails(function () {
        arrayToString.call({});
      })) {
        arrayToString = arrayToLocaleString = function toString() {
          return arrayJoin.call(this);
        };
      }

      var $TypedArrayPrototype$ = redefineAll({}, proto);
      redefineAll($TypedArrayPrototype$, $iterators);
      hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
      redefineAll($TypedArrayPrototype$, {
        slice: $slice,
        set: $set,
        constructor: function constructor() {
          /* noop */
        },
        toString: arrayToString,
        toLocaleString: $toLocaleString
      });
      addGetter($TypedArrayPrototype$, 'buffer', 'b');
      addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
      addGetter($TypedArrayPrototype$, 'byteLength', 'l');
      addGetter($TypedArrayPrototype$, 'length', 'e');
      dP($TypedArrayPrototype$, TAG, {
        get: function get() {
          return this[TYPED_ARRAY];
        }
      }); // eslint-disable-next-line max-statements

      module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
        CLAMPED = !!CLAMPED;
        var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
        var GETTER = 'get' + KEY;
        var SETTER = 'set' + KEY;
        var TypedArray = global[NAME];
        var Base = TypedArray || {};
        var TAC = TypedArray && getPrototypeOf(TypedArray);
        var FORCED = !TypedArray || !$typed.ABV;
        var O = {};
        var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];

        var getter = function getter(that, index) {
          var data = that._d;
          return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
        };

        var setter = function setter(that, index, value) {
          var data = that._d;
          if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
          data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
        };

        var addElement = function addElement(that, index) {
          dP(that, index, {
            get: function get() {
              return getter(this, index);
            },
            set: function set(value) {
              return setter(this, index, value);
            },
            enumerable: true
          });
        };

        if (FORCED) {
          TypedArray = wrapper(function (that, data, $offset, $length) {
            anInstance(that, TypedArray, NAME, '_d');
            var index = 0;
            var offset = 0;
            var buffer, byteLength, length, klass;

            if (!isObject(data)) {
              length = toIndex(data);
              byteLength = length * BYTES;
              buffer = new $ArrayBuffer(byteLength);
            } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
              buffer = data;
              offset = toOffset($offset, BYTES);
              var $len = data.byteLength;

              if ($length === undefined) {
                if ($len % BYTES) throw RangeError(WRONG_LENGTH);
                byteLength = $len - offset;
                if (byteLength < 0) throw RangeError(WRONG_LENGTH);
              } else {
                byteLength = toLength($length) * BYTES;
                if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
              }

              length = byteLength / BYTES;
            } else if (TYPED_ARRAY in data) {
              return fromList(TypedArray, data);
            } else {
              return $from.call(TypedArray, data);
            }

            hide(that, '_d', {
              b: buffer,
              o: offset,
              l: byteLength,
              e: length,
              v: new $DataView(buffer)
            });

            while (index < length) {
              addElement(that, index++);
            }
          });
          TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
          hide(TypedArrayPrototype, 'constructor', TypedArray);
        } else if (!fails(function () {
          TypedArray(1);
        }) || !fails(function () {
          new TypedArray(-1); // eslint-disable-line no-new
        }) || !$iterDetect(function (iter) {
          new TypedArray(); // eslint-disable-line no-new

          new TypedArray(null); // eslint-disable-line no-new

          new TypedArray(1.5); // eslint-disable-line no-new

          new TypedArray(iter); // eslint-disable-line no-new
        }, true)) {
          TypedArray = wrapper(function (that, data, $offset, $length) {
            anInstance(that, TypedArray, NAME);
            var klass; // `ws` module bug, temporarily remove validation length for Uint8Array
            // https://github.com/websockets/ws/pull/645

            if (!isObject(data)) return new Base(toIndex(data));

            if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
              return $length !== undefined ? new Base(data, toOffset($offset, BYTES), $length) : $offset !== undefined ? new Base(data, toOffset($offset, BYTES)) : new Base(data);
            }

            if (TYPED_ARRAY in data) return fromList(TypedArray, data);
            return $from.call(TypedArray, data);
          });
          arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
            if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
          });
          TypedArray[PROTOTYPE] = TypedArrayPrototype;
          if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
        }

        var $nativeIterator = TypedArrayPrototype[ITERATOR];
        var CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
        var $iterator = $iterators.values;
        hide(TypedArray, TYPED_CONSTRUCTOR, true);
        hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
        hide(TypedArrayPrototype, VIEW, true);
        hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

        if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
          dP(TypedArrayPrototype, TAG, {
            get: function get() {
              return NAME;
            }
          });
        }

        O[NAME] = TypedArray;
        $export($export.G + $export.W + $export.F * (TypedArray != Base), O);
        $export($export.S, NAME, {
          BYTES_PER_ELEMENT: BYTES
        });
        $export($export.S + $export.F * fails(function () {
          Base.of.call(TypedArray, 1);
        }), NAME, {
          from: $from,
          of: $of
        });
        if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);
        $export($export.P, NAME, proto);
        setSpecies(NAME);
        $export($export.P + $export.F * FORCED_SET, NAME, {
          set: $set
        });
        $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);
        if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;
        $export($export.P + $export.F * fails(function () {
          new TypedArray(1).slice();
        }), NAME, {
          slice: $slice
        });
        $export($export.P + $export.F * (fails(function () {
          return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
        }) || !fails(function () {
          TypedArrayPrototype.toLocaleString.call([1, 2]);
        })), NAME, {
          toLocaleString: $toLocaleString
        });
        Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
        if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
      };
    } else module.exports = function () {
      /* empty */
    };
  });

  _typedArray('Int8', 1, function (init) {
    return function Int8Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  _typedArray('Uint8', 1, function (init) {
    return function Uint8Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  _typedArray('Uint8', 1, function (init) {
    return function Uint8ClampedArray(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  }, true);

  _typedArray('Int16', 2, function (init) {
    return function Int16Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  _typedArray('Uint16', 2, function (init) {
    return function Uint16Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  _typedArray('Int32', 4, function (init) {
    return function Int32Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  _typedArray('Uint32', 4, function (init) {
    return function Uint32Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  _typedArray('Float32', 4, function (init) {
    return function Float32Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  _typedArray('Float64', 8, function (init) {
    return function Float64Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  var rApply = (_global.Reflect || {}).apply;
  var fApply = Function.apply; // MS Edge argumentsList argument is optional

  _export(_export.S + _export.F * !_fails(function () {
    rApply(function () {
      /* empty */
    });
  }), 'Reflect', {
    apply: function apply(target, thisArgument, argumentsList) {
      var T = _aFunction(target);
      var L = _anObject(argumentsList);
      return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
    }
  });

  var rConstruct = (_global.Reflect || {}).construct; // MS Edge supports only 2 arguments and argumentsList argument is optional
  // FF Nightly sets third argument as `new.target`, but does not create `this` from it

  var NEW_TARGET_BUG = _fails(function () {
    function F() {
      /* empty */
    }

    return !(rConstruct(function () {
      /* empty */
    }, [], F) instanceof F);
  });
  var ARGS_BUG = !_fails(function () {
    rConstruct(function () {
      /* empty */
    });
  });
  _export(_export.S + _export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
    construct: function construct(Target, args
    /* , newTarget */
    ) {
      _aFunction(Target);
      _anObject(args);
      var newTarget = arguments.length < 3 ? Target : _aFunction(arguments[2]);
      if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);

      if (Target == newTarget) {
        // w/o altered newTarget, optimization for 0-4 arguments
        switch (args.length) {
          case 0:
            return new Target();

          case 1:
            return new Target(args[0]);

          case 2:
            return new Target(args[0], args[1]);

          case 3:
            return new Target(args[0], args[1], args[2]);

          case 4:
            return new Target(args[0], args[1], args[2], args[3]);
        } // w/o altered newTarget, lot of arguments case


        var $args = [null];
        $args.push.apply($args, args);
        return new (_bind.apply(Target, $args))();
      } // with altered newTarget, not support built-in constructors


      var proto = newTarget.prototype;
      var instance = _objectCreate(_isObject(proto) ? proto : Object.prototype);
      var result = Function.apply.call(Target, instance, args);
      return _isObject(result) ? result : instance;
    }
  });

  // MS Edge has broken Reflect.defineProperty - throwing instead of returning false

  _export(_export.S + _export.F * _fails(function () {
    // eslint-disable-next-line no-undef
    Reflect.defineProperty(_objectDp.f({}, 1, {
      value: 1
    }), 1, {
      value: 2
    });
  }), 'Reflect', {
    defineProperty: function defineProperty(target, propertyKey, attributes) {
      _anObject(target);
      propertyKey = _toPrimitive(propertyKey, true);
      _anObject(attributes);

      try {
        _objectDp.f(target, propertyKey, attributes);
        return true;
      } catch (e) {
        return false;
      }
    }
  });

  var gOPD$3 = _objectGopd.f;
  _export(_export.S, 'Reflect', {
    deleteProperty: function deleteProperty(target, propertyKey) {
      var desc = gOPD$3(_anObject(target), propertyKey);
      return desc && !desc.configurable ? false : delete target[propertyKey];
    }
  });

  var Enumerate = function Enumerate(iterated) {
    this._t = _anObject(iterated); // target

    this._i = 0; // next index

    var keys = this._k = []; // keys

    var key;

    for (key in iterated) {
      keys.push(key);
    }
  };

  _iterCreate(Enumerate, 'Object', function () {
    var that = this;
    var keys = that._k;
    var key;

    do {
      if (that._i >= keys.length) return {
        value: undefined,
        done: true
      };
    } while (!((key = keys[that._i++]) in that._t));

    return {
      value: key,
      done: false
    };
  });
  _export(_export.S, 'Reflect', {
    enumerate: function enumerate(target) {
      return new Enumerate(target);
    }
  });

  function get(target, propertyKey
  /* , receiver */
  ) {
    var receiver = arguments.length < 3 ? target : arguments[2];
    var desc, proto;
    if (_anObject(target) === receiver) return target[propertyKey];
    if (desc = _objectGopd.f(target, propertyKey)) return _has(desc, 'value') ? desc.value : desc.get !== undefined ? desc.get.call(receiver) : undefined;
    if (_isObject(proto = _objectGpo(target))) return get(proto, propertyKey, receiver);
  }

  _export(_export.S, 'Reflect', {
    get: get
  });

  _export(_export.S, 'Reflect', {
    getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
      return _objectGopd.f(_anObject(target), propertyKey);
    }
  });

  _export(_export.S, 'Reflect', {
    getPrototypeOf: function getPrototypeOf(target) {
      return _objectGpo(_anObject(target));
    }
  });

  _export(_export.S, 'Reflect', {
    has: function has(target, propertyKey) {
      return propertyKey in target;
    }
  });

  var $isExtensible = Object.isExtensible;
  _export(_export.S, 'Reflect', {
    isExtensible: function isExtensible(target) {
      _anObject(target);
      return $isExtensible ? $isExtensible(target) : true;
    }
  });

  var Reflect$1 = _global.Reflect;

  var _ownKeys = Reflect$1 && Reflect$1.ownKeys || function ownKeys(it) {
    var keys = _objectGopn.f(_anObject(it));
    var getSymbols = _objectGops.f;
    return getSymbols ? keys.concat(getSymbols(it)) : keys;
  };

  _export(_export.S, 'Reflect', {
    ownKeys: _ownKeys
  });

  var $preventExtensions = Object.preventExtensions;
  _export(_export.S, 'Reflect', {
    preventExtensions: function preventExtensions(target) {
      _anObject(target);

      try {
        if ($preventExtensions) $preventExtensions(target);
        return true;
      } catch (e) {
        return false;
      }
    }
  });

  function set(target, propertyKey, V
  /* , receiver */
  ) {
    var receiver = arguments.length < 4 ? target : arguments[3];
    var ownDesc = _objectGopd.f(_anObject(target), propertyKey);
    var existingDescriptor, proto;

    if (!ownDesc) {
      if (_isObject(proto = _objectGpo(target))) {
        return set(proto, propertyKey, V, receiver);
      }

      ownDesc = _propertyDesc(0);
    }

    if (_has(ownDesc, 'value')) {
      if (ownDesc.writable === false || !_isObject(receiver)) return false;

      if (existingDescriptor = _objectGopd.f(receiver, propertyKey)) {
        if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
        existingDescriptor.value = V;
        _objectDp.f(receiver, propertyKey, existingDescriptor);
      } else _objectDp.f(receiver, propertyKey, _propertyDesc(0, V));

      return true;
    }

    return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
  }

  _export(_export.S, 'Reflect', {
    set: set
  });

  if (_setProto) _export(_export.S, 'Reflect', {
    setPrototypeOf: function setPrototypeOf(target, proto) {
      _setProto.check(target, proto);

      try {
        _setProto.set(target, proto);
        return true;
      } catch (e) {
        return false;
      }
    }
  });

  var $includes = _arrayIncludes(true);
  _export(_export.P, 'Array', {
    includes: function includes(el
    /* , fromIndex = 0 */
    ) {
      return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
    }
  });
  _addToUnscopables('includes');

  var includes = _core.Array.includes;

  var IS_CONCAT_SPREADABLE = _wks('isConcatSpreadable');

  function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
    var targetIndex = start;
    var sourceIndex = 0;
    var mapFn = mapper ? _ctx(mapper, thisArg, 3) : false;
    var element, spreadable;

    while (sourceIndex < sourceLen) {
      if (sourceIndex in source) {
        element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];
        spreadable = false;

        if (_isObject(element)) {
          spreadable = element[IS_CONCAT_SPREADABLE];
          spreadable = spreadable !== undefined ? !!spreadable : _isArray(element);
        }

        if (spreadable && depth > 0) {
          targetIndex = flattenIntoArray(target, original, element, _toLength(element.length), targetIndex, depth - 1) - 1;
        } else {
          if (targetIndex >= 0x1fffffffffffff) throw TypeError();
          target[targetIndex] = element;
        }

        targetIndex++;
      }

      sourceIndex++;
    }

    return targetIndex;
  }

  var _flattenIntoArray = flattenIntoArray;

  _export(_export.P, 'Array', {
    flatMap: function flatMap(callbackfn
    /* , thisArg */
    ) {
      var O = _toObject(this);
      var sourceLen, A;
      _aFunction(callbackfn);
      sourceLen = _toLength(O.length);
      A = _arraySpeciesCreate(O, 0);
      _flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
      return A;
    }
  });
  _addToUnscopables('flatMap');

  var flatMap = _core.Array.flatMap;

  var _stringPad = function _stringPad(that, maxLength, fillString, left) {
    var S = String(_defined(that));
    var stringLength = S.length;
    var fillStr = fillString === undefined ? ' ' : String(fillString);
    var intMaxLength = _toLength(maxLength);
    if (intMaxLength <= stringLength || fillStr == '') return S;
    var fillLen = intMaxLength - stringLength;
    var stringFiller = _stringRepeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
    if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
    return left ? stringFiller + S : S + stringFiller;
  };

  // https://github.com/zloirock/core-js/issues/280


  var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(_userAgent);
  _export(_export.P + _export.F * WEBKIT_BUG, 'String', {
    padStart: function padStart(maxLength
    /* , fillString = ' ' */
    ) {
      return _stringPad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
    }
  });

  var padStart = _core.String.padStart;

  // https://github.com/zloirock/core-js/issues/280


  var WEBKIT_BUG$1 = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(_userAgent);
  _export(_export.P + _export.F * WEBKIT_BUG$1, 'String', {
    padEnd: function padEnd(maxLength
    /* , fillString = ' ' */
    ) {
      return _stringPad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
    }
  });

  var padEnd = _core.String.padEnd;

  _stringTrim('trimLeft', function ($trim) {
    return function trimLeft() {
      return $trim(this, 1);
    };
  }, 'trimStart');

  var trimStart = _core.String.trimLeft;

  _stringTrim('trimRight', function ($trim) {
    return function trimRight() {
      return $trim(this, 2);
    };
  }, 'trimEnd');

  var trimEnd = _core.String.trimRight;

  _wksDefine('asyncIterator');

  var asyncIterator = _wksExt.f('asyncIterator');

  _export(_export.S, 'Object', {
    getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
      var O = _toIobject(object);
      var getDesc = _objectGopd.f;
      var keys = _ownKeys(O);
      var result = {};
      var i = 0;
      var key, desc;

      while (keys.length > i) {
        desc = getDesc(O, key = keys[i++]);
        if (desc !== undefined) _createProperty(result, key, desc);
      }

      return result;
    }
  });

  var getOwnPropertyDescriptors = _core.Object.getOwnPropertyDescriptors;

  var isEnum$1 = _objectPie.f;

  var _objectToArray = function _objectToArray(isEntries) {
    return function (it) {
      var O = _toIobject(it);
      var keys = _objectKeys(O);
      var length = keys.length;
      var i = 0;
      var result = [];
      var key;

      while (length > i) {
        key = keys[i++];

        if (!_descriptors || isEnum$1.call(O, key)) {
          result.push(isEntries ? [key, O[key]] : O[key]);
        }
      }

      return result;
    };
  };

  var $values = _objectToArray(false);
  _export(_export.S, 'Object', {
    values: function values(it) {
      return $values(it);
    }
  });

  var values = _core.Object.values;

  var $entries = _objectToArray(true);
  _export(_export.S, 'Object', {
    entries: function entries(it) {
      return $entries(it);
    }
  });

  var entries = _core.Object.entries;

  _export(_export.P + _export.R, 'Promise', {
    'finally': function _finally(onFinally) {
      var C = _speciesConstructor(this, _core.Promise || _global.Promise);
      var isFunction = typeof onFinally == 'function';
      return this.then(isFunction ? function (x) {
        return _promiseResolve(C, onFinally()).then(function () {
          return x;
        });
      } : onFinally, isFunction ? function (e) {
        return _promiseResolve(C, onFinally()).then(function () {
          throw e;
        });
      } : onFinally);
    }
  });

  var _finally = _core.Promise['finally'];

  var slice = [].slice;
  var MSIE = /MSIE .\./.test(_userAgent); // <- dirty ie9- check

  var wrap$1 = function wrap(set) {
    return function (fn, time
    /* , ...args */
    ) {
      var boundArgs = arguments.length > 2;
      var args = boundArgs ? slice.call(arguments, 2) : false;
      return set(boundArgs ? function () {
        // eslint-disable-next-line no-new-func
        (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
      } : fn, time);
    };
  };

  _export(_export.G + _export.B + _export.F * MSIE, {
    setTimeout: wrap$1(_global.setTimeout),
    setInterval: wrap$1(_global.setInterval)
  });

  _export(_export.G + _export.B, {
    setImmediate: _task.set,
    clearImmediate: _task.clear
  });

  var ITERATOR$4 = _wks('iterator');
  var TO_STRING_TAG = _wks('toStringTag');
  var ArrayValues = _iterators.Array;
  var DOMIterables = {
    CSSRuleList: true,
    // TODO: Not spec compliant, should be false.
    CSSStyleDeclaration: false,
    CSSValueList: false,
    ClientRectList: false,
    DOMRectList: false,
    DOMStringList: false,
    DOMTokenList: true,
    DataTransferItemList: false,
    FileList: false,
    HTMLAllCollection: false,
    HTMLCollection: false,
    HTMLFormElement: false,
    HTMLSelectElement: false,
    MediaList: true,
    // TODO: Not spec compliant, should be false.
    MimeTypeArray: false,
    NamedNodeMap: false,
    NodeList: true,
    PaintRequestList: false,
    Plugin: false,
    PluginArray: false,
    SVGLengthList: false,
    SVGNumberList: false,
    SVGPathSegList: false,
    SVGPointList: false,
    SVGStringList: false,
    SVGTransformList: false,
    SourceBufferList: false,
    StyleSheetList: true,
    // TODO: Not spec compliant, should be false.
    TextTrackCueList: false,
    TextTrackList: false,
    TouchList: false
  };

  for (var collections = _objectKeys(DOMIterables), i$2 = 0; i$2 < collections.length; i$2++) {
    var NAME$1 = collections[i$2];
    var explicit = DOMIterables[NAME$1];
    var Collection = _global[NAME$1];
    var proto$3 = Collection && Collection.prototype;
    var key$1;

    if (proto$3) {
      if (!proto$3[ITERATOR$4]) _hide(proto$3, ITERATOR$4, ArrayValues);
      if (!proto$3[TO_STRING_TAG]) _hide(proto$3, TO_STRING_TAG, NAME$1);
      _iterators[NAME$1] = ArrayValues;
      if (explicit) for (key$1 in es6_array_iterator) {
        if (!proto$3[key$1]) _redefine(proto$3, key$1, es6_array_iterator[key$1], true);
      }
    }
  }

  var _global$1 = createCommonjsModule(function (module) {
    // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
    var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self // eslint-disable-next-line no-new-func
    : Function('return this')();
    if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
  });

  var _core$1 = createCommonjsModule(function (module) {
    var core = module.exports = {
      version: '2.6.11'
    };
    if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
  });
  var _core_1$1 = _core$1.version;

  var _aFunction$1 = function _aFunction(it) {
    if (typeof it != 'function') throw TypeError(it + ' is not a function!');
    return it;
  };

  var _ctx$1 = function _ctx(fn, that, length) {
    _aFunction$1(fn);
    if (that === undefined) return fn;

    switch (length) {
      case 1:
        return function (a) {
          return fn.call(that, a);
        };

      case 2:
        return function (a, b) {
          return fn.call(that, a, b);
        };

      case 3:
        return function (a, b, c) {
          return fn.call(that, a, b, c);
        };
    }

    return function ()
    /* ...args */
    {
      return fn.apply(that, arguments);
    };
  };

  var _isObject$1 = function _isObject(it) {
    return _typeof(it) === 'object' ? it !== null : typeof it === 'function';
  };

  var _anObject$1 = function _anObject(it) {
    if (!_isObject$1(it)) throw TypeError(it + ' is not an object!');
    return it;
  };

  var _fails$1 = function _fails(exec) {
    try {
      return !!exec();
    } catch (e) {
      return true;
    }
  };

  var _descriptors$1 = !_fails$1(function () {
    return Object.defineProperty({}, 'a', {
      get: function get() {
        return 7;
      }
    }).a != 7;
  });

  var document$3 = _global$1.document; // typeof document.createElement is 'object' in old IE

  var is$1 = _isObject$1(document$3) && _isObject$1(document$3.createElement);

  var _domCreate$1 = function _domCreate(it) {
    return is$1 ? document$3.createElement(it) : {};
  };

  var _ie8DomDefine$1 = !_descriptors$1 && !_fails$1(function () {
    return Object.defineProperty(_domCreate$1('div'), 'a', {
      get: function get() {
        return 7;
      }
    }).a != 7;
  });

  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string

  var _toPrimitive$1 = function _toPrimitive(it, S) {
    if (!_isObject$1(it)) return it;
    var fn, val;
    if (S && typeof (fn = it.toString) == 'function' && !_isObject$1(val = fn.call(it))) return val;
    if (typeof (fn = it.valueOf) == 'function' && !_isObject$1(val = fn.call(it))) return val;
    if (!S && typeof (fn = it.toString) == 'function' && !_isObject$1(val = fn.call(it))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var dP$6 = Object.defineProperty;
  var f$8 = _descriptors$1 ? Object.defineProperty : function defineProperty(O, P, Attributes) {
    _anObject$1(O);
    P = _toPrimitive$1(P, true);
    _anObject$1(Attributes);
    if (_ie8DomDefine$1) try {
      return dP$6(O, P, Attributes);
    } catch (e) {
      /* empty */
    }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };
  var _objectDp$1 = {
    f: f$8
  };

  var _propertyDesc$1 = function _propertyDesc(bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var _hide$1 = _descriptors$1 ? function (object, key, value) {
    return _objectDp$1.f(object, key, _propertyDesc$1(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var hasOwnProperty$a = {}.hasOwnProperty;

  var _has$1 = function _has(it, key) {
    return hasOwnProperty$a.call(it, key);
  };

  var PROTOTYPE$3 = 'prototype';

  var $export$1 = function $export(type, name, source) {
    var IS_FORCED = type & $export.F;
    var IS_GLOBAL = type & $export.G;
    var IS_STATIC = type & $export.S;
    var IS_PROTO = type & $export.P;
    var IS_BIND = type & $export.B;
    var IS_WRAP = type & $export.W;
    var exports = IS_GLOBAL ? _core$1 : _core$1[name] || (_core$1[name] = {});
    var expProto = exports[PROTOTYPE$3];
    var target = IS_GLOBAL ? _global$1 : IS_STATIC ? _global$1[name] : (_global$1[name] || {})[PROTOTYPE$3];
    var key, own, out;
    if (IS_GLOBAL) source = name;

    for (key in source) {
      // contains in native
      own = !IS_FORCED && target && target[key] !== undefined;
      if (own && _has$1(exports, key)) continue; // export native or passed

      out = own ? target[key] : source[key]; // prevent global pollution for namespaces

      exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key] // bind timers to global for call from export context
      : IS_BIND && own ? _ctx$1(out, _global$1) // wrap global constructors for prevent change them in library
      : IS_WRAP && target[key] == out ? function (C) {
        var F = function F(a, b, c) {
          if (this instanceof C) {
            switch (arguments.length) {
              case 0:
                return new C();

              case 1:
                return new C(a);

              case 2:
                return new C(a, b);
            }

            return new C(a, b, c);
          }

          return C.apply(this, arguments);
        };

        F[PROTOTYPE$3] = C[PROTOTYPE$3];
        return F; // make static versions for prototype methods
      }(out) : IS_PROTO && typeof out == 'function' ? _ctx$1(Function.call, out) : out; // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%

      if (IS_PROTO) {
        (exports.virtual || (exports.virtual = {}))[key] = out; // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%

        if (type & $export.R && expProto && !expProto[key]) _hide$1(expProto, key, out);
      }
    }
  }; // type bitmap


  $export$1.F = 1; // forced

  $export$1.G = 2; // global

  $export$1.S = 4; // static

  $export$1.P = 8; // proto

  $export$1.B = 16; // bind

  $export$1.W = 32; // wrap

  $export$1.U = 64; // safe

  $export$1.R = 128; // real proto method for `library`

  var _export$1 = $export$1;

  _export$1(_export$1.G, {
    global: _global$1
  });

  var global$1 = _core$1.global;

  var lib = createCommonjsModule(function (module) {



  var _global = _interopRequireDefault(global$1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  if (_global["default"]._babelPolyfill && typeof console !== "undefined" && console.warn) {
    console.warn("@babel/polyfill is loaded more than once on this page. This is probably not desirable/intended " + "and may have consequences if different versions of the polyfills are applied sequentially. " + "If you do need to load the polyfill more than once, use @babel/polyfill/noConflict " + "instead to bypass the warning.");
  }

  _global["default"]._babelPolyfill = true;
  });

  unwrapExports(lib);

  var bind = function bind(fn, thisArg) {
    return function wrap() {
      var args = new Array(arguments.length);

      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }

      return fn.apply(thisArg, args);
    };
  };

  /*global toString:true*/
  // utils is a library of generic helper functions non-specific to axios


  var toString$2 = Object.prototype.toString;
  /**
   * Determine if a value is an Array
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an Array, otherwise false
   */

  function isArray$1(val) {
    return toString$2.call(val) === '[object Array]';
  }
  /**
   * Determine if a value is undefined
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if the value is undefined, otherwise false
   */


  function isUndefined(val) {
    return typeof val === 'undefined';
  }
  /**
   * Determine if a value is a Buffer
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Buffer, otherwise false
   */


  function isBuffer(val) {
    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
  }
  /**
   * Determine if a value is an ArrayBuffer
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an ArrayBuffer, otherwise false
   */


  function isArrayBuffer(val) {
    return toString$2.call(val) === '[object ArrayBuffer]';
  }
  /**
   * Determine if a value is a FormData
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an FormData, otherwise false
   */


  function isFormData(val) {
    return typeof FormData !== 'undefined' && val instanceof FormData;
  }
  /**
   * Determine if a value is a view on an ArrayBuffer
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
   */


  function isArrayBufferView(val) {
    var result;

    if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
      result = ArrayBuffer.isView(val);
    } else {
      result = val && val.buffer && val.buffer instanceof ArrayBuffer;
    }

    return result;
  }
  /**
   * Determine if a value is a String
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a String, otherwise false
   */


  function isString(val) {
    return typeof val === 'string';
  }
  /**
   * Determine if a value is a Number
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Number, otherwise false
   */


  function isNumber(val) {
    return typeof val === 'number';
  }
  /**
   * Determine if a value is an Object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an Object, otherwise false
   */


  function isObject$1(val) {
    return val !== null && _typeof(val) === 'object';
  }
  /**
   * Determine if a value is a Date
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Date, otherwise false
   */


  function isDate(val) {
    return toString$2.call(val) === '[object Date]';
  }
  /**
   * Determine if a value is a File
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a File, otherwise false
   */


  function isFile(val) {
    return toString$2.call(val) === '[object File]';
  }
  /**
   * Determine if a value is a Blob
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Blob, otherwise false
   */


  function isBlob(val) {
    return toString$2.call(val) === '[object Blob]';
  }
  /**
   * Determine if a value is a Function
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Function, otherwise false
   */


  function isFunction$1(val) {
    return toString$2.call(val) === '[object Function]';
  }
  /**
   * Determine if a value is a Stream
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Stream, otherwise false
   */


  function isStream(val) {
    return isObject$1(val) && isFunction$1(val.pipe);
  }
  /**
   * Determine if a value is a URLSearchParams object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a URLSearchParams object, otherwise false
   */


  function isURLSearchParams(val) {
    return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
  }
  /**
   * Trim excess whitespace off the beginning and end of a string
   *
   * @param {String} str The String to trim
   * @returns {String} The String freed of excess whitespace
   */


  function trim$1(str) {
    return str.replace(/^\s*/, '').replace(/\s*$/, '');
  }
  /**
   * Determine if we're running in a standard browser environment
   *
   * This allows axios to run in a web worker, and react-native.
   * Both environments support XMLHttpRequest, but not fully standard globals.
   *
   * web workers:
   *  typeof window -> undefined
   *  typeof document -> undefined
   *
   * react-native:
   *  navigator.product -> 'ReactNative'
   * nativescript
   *  navigator.product -> 'NativeScript' or 'NS'
   */


  function isStandardBrowserEnv() {
    if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' || navigator.product === 'NativeScript' || navigator.product === 'NS')) {
      return false;
    }

    return typeof window !== 'undefined' && typeof document !== 'undefined';
  }
  /**
   * Iterate over an Array or an Object invoking a function for each item.
   *
   * If `obj` is an Array callback will be called passing
   * the value, index, and complete array for each item.
   *
   * If 'obj' is an Object callback will be called passing
   * the value, key, and complete object for each property.
   *
   * @param {Object|Array} obj The object to iterate
   * @param {Function} fn The callback to invoke for each item
   */


  function forEach(obj, fn) {
    // Don't bother if no value provided
    if (obj === null || typeof obj === 'undefined') {
      return;
    } // Force an array if not already something iterable


    if (_typeof(obj) !== 'object') {
      /*eslint no-param-reassign:0*/
      obj = [obj];
    }

    if (isArray$1(obj)) {
      // Iterate over array values
      for (var i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      // Iterate over object keys
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          fn.call(null, obj[key], key, obj);
        }
      }
    }
  }
  /**
   * Accepts varargs expecting each argument to be an object, then
   * immutably merges the properties of each object and returns result.
   *
   * When multiple objects contain the same key the later object in
   * the arguments list will take precedence.
   *
   * Example:
   *
   * ```js
   * var result = merge({foo: 123}, {foo: 456});
   * console.log(result.foo); // outputs 456
   * ```
   *
   * @param {Object} obj1 Object to merge
   * @returns {Object} Result of all merge properties
   */


  function merge()
  /* obj1, obj2, obj3, ... */
  {
    var result = {};

    function assignValue(val, key) {
      if (_typeof(result[key]) === 'object' && _typeof(val) === 'object') {
        result[key] = merge(result[key], val);
      } else {
        result[key] = val;
      }
    }

    for (var i = 0, l = arguments.length; i < l; i++) {
      forEach(arguments[i], assignValue);
    }

    return result;
  }
  /**
   * Function equal to merge with the difference being that no reference
   * to original objects is kept.
   *
   * @see merge
   * @param {Object} obj1 Object to merge
   * @returns {Object} Result of all merge properties
   */


  function deepMerge()
  /* obj1, obj2, obj3, ... */
  {
    var result = {};

    function assignValue(val, key) {
      if (_typeof(result[key]) === 'object' && _typeof(val) === 'object') {
        result[key] = deepMerge(result[key], val);
      } else if (_typeof(val) === 'object') {
        result[key] = deepMerge({}, val);
      } else {
        result[key] = val;
      }
    }

    for (var i = 0, l = arguments.length; i < l; i++) {
      forEach(arguments[i], assignValue);
    }

    return result;
  }
  /**
   * Extends object a by mutably adding to it the properties of object b.
   *
   * @param {Object} a The object to be extended
   * @param {Object} b The object to copy properties from
   * @param {Object} thisArg The object to bind function to
   * @return {Object} The resulting value of object a
   */


  function extend(a, b, thisArg) {
    forEach(b, function assignValue(val, key) {
      if (thisArg && typeof val === 'function') {
        a[key] = bind(val, thisArg);
      } else {
        a[key] = val;
      }
    });
    return a;
  }

  var utils = {
    isArray: isArray$1,
    isArrayBuffer: isArrayBuffer,
    isBuffer: isBuffer,
    isFormData: isFormData,
    isArrayBufferView: isArrayBufferView,
    isString: isString,
    isNumber: isNumber,
    isObject: isObject$1,
    isUndefined: isUndefined,
    isDate: isDate,
    isFile: isFile,
    isBlob: isBlob,
    isFunction: isFunction$1,
    isStream: isStream,
    isURLSearchParams: isURLSearchParams,
    isStandardBrowserEnv: isStandardBrowserEnv,
    forEach: forEach,
    merge: merge,
    deepMerge: deepMerge,
    extend: extend,
    trim: trim$1
  };

  function encode(val) {
    return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
  }
  /**
   * Build a URL by appending params to the end
   *
   * @param {string} url The base of the url (e.g., http://www.google.com)
   * @param {object} [params] The params to be appended
   * @returns {string} The formatted url
   */


  var buildURL = function buildURL(url, params, paramsSerializer) {
    /*eslint no-param-reassign:0*/
    if (!params) {
      return url;
    }

    var serializedParams;

    if (paramsSerializer) {
      serializedParams = paramsSerializer(params);
    } else if (utils.isURLSearchParams(params)) {
      serializedParams = params.toString();
    } else {
      var parts = [];
      utils.forEach(params, function serialize(val, key) {
        if (val === null || typeof val === 'undefined') {
          return;
        }

        if (utils.isArray(val)) {
          key = key + '[]';
        } else {
          val = [val];
        }

        utils.forEach(val, function parseValue(v) {
          if (utils.isDate(v)) {
            v = v.toISOString();
          } else if (utils.isObject(v)) {
            v = JSON.stringify(v);
          }

          parts.push(encode(key) + '=' + encode(v));
        });
      });
      serializedParams = parts.join('&');
    }

    if (serializedParams) {
      var hashmarkIndex = url.indexOf('#');

      if (hashmarkIndex !== -1) {
        url = url.slice(0, hashmarkIndex);
      }

      url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
    }

    return url;
  };

  function InterceptorManager() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */


  InterceptorManager.prototype.use = function use(fulfilled, rejected) {
    this.handlers.push({
      fulfilled: fulfilled,
      rejected: rejected
    });
    return this.handlers.length - 1;
  };
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   */


  InterceptorManager.prototype.eject = function eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  };
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   */


  InterceptorManager.prototype.forEach = function forEach(fn) {
    utils.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  };

  var InterceptorManager_1 = InterceptorManager;

  /**
   * Transform the data for a request or a response
   *
   * @param {Object|String} data The data to be transformed
   * @param {Array} headers The headers for the request or response
   * @param {Array|Function} fns A single function or Array of functions
   * @returns {*} The resulting transformed data
   */


  var transformData = function transformData(data, headers, fns) {
    /*eslint no-param-reassign:0*/
    utils.forEach(fns, function transform(fn) {
      data = fn(data, headers);
    });
    return data;
  };

  var isCancel = function isCancel(value) {
    return !!(value && value.__CANCEL__);
  };

  var normalizeHeaderName = function normalizeHeaderName(headers, normalizedName) {
    utils.forEach(headers, function processHeader(value, name) {
      if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
        headers[normalizedName] = value;
        delete headers[name];
      }
    });
  };

  /**
   * Update an Error with the specified config, error code, and response.
   *
   * @param {Error} error The error to update.
   * @param {Object} config The config.
   * @param {string} [code] The error code (for example, 'ECONNABORTED').
   * @param {Object} [request] The request.
   * @param {Object} [response] The response.
   * @returns {Error} The error.
   */

  var enhanceError = function enhanceError(error, config, code, request, response) {
    error.config = config;

    if (code) {
      error.code = code;
    }

    error.request = request;
    error.response = response;
    error.isAxiosError = true;

    error.toJSON = function () {
      return {
        // Standard
        message: this.message,
        name: this.name,
        // Microsoft
        description: this.description,
        number: this.number,
        // Mozilla
        fileName: this.fileName,
        lineNumber: this.lineNumber,
        columnNumber: this.columnNumber,
        stack: this.stack,
        // Axios
        config: this.config,
        code: this.code
      };
    };

    return error;
  };

  /**
   * Create an Error with the specified message, config, error code, request and response.
   *
   * @param {string} message The error message.
   * @param {Object} config The config.
   * @param {string} [code] The error code (for example, 'ECONNABORTED').
   * @param {Object} [request] The request.
   * @param {Object} [response] The response.
   * @returns {Error} The created error.
   */


  var createError = function createError(message, config, code, request, response) {
    var error = new Error(message);
    return enhanceError(error, config, code, request, response);
  };

  /**
   * Resolve or reject a Promise based on response status.
   *
   * @param {Function} resolve A function that resolves the promise.
   * @param {Function} reject A function that rejects the promise.
   * @param {object} response The response.
   */


  var settle = function settle(resolve, reject, response) {
    var validateStatus = response.config.validateStatus;

    if (!validateStatus || validateStatus(response.status)) {
      resolve(response);
    } else {
      reject(createError('Request failed with status code ' + response.status, response.config, null, response.request, response));
    }
  };

  /**
   * Determines whether the specified URL is absolute
   *
   * @param {string} url The URL to test
   * @returns {boolean} True if the specified URL is absolute, otherwise false
   */

  var isAbsoluteURL = function isAbsoluteURL(url) {
    // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
    // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
    // by any combination of letters, digits, plus, period, or hyphen.
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
  };

  /**
   * Creates a new URL by combining the specified URLs
   *
   * @param {string} baseURL The base URL
   * @param {string} relativeURL The relative URL
   * @returns {string} The combined URL
   */

  var combineURLs = function combineURLs(baseURL, relativeURL) {
    return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
  };

  /**
   * Creates a new URL by combining the baseURL with the requestedURL,
   * only when the requestedURL is not already an absolute URL.
   * If the requestURL is absolute, this function returns the requestedURL untouched.
   *
   * @param {string} baseURL The base URL
   * @param {string} requestedURL Absolute or relative URL to combine
   * @returns {string} The combined full path
   */


  var buildFullPath = function buildFullPath(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
      return combineURLs(baseURL, requestedURL);
    }

    return requestedURL;
  };

  // c.f. https://nodejs.org/api/http.html#http_message_headers


  var ignoreDuplicateOf = ['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent'];
  /**
   * Parse headers into an object
   *
   * ```
   * Date: Wed, 27 Aug 2014 08:58:49 GMT
   * Content-Type: application/json
   * Connection: keep-alive
   * Transfer-Encoding: chunked
   * ```
   *
   * @param {String} headers Headers needing to be parsed
   * @returns {Object} Headers parsed into an object
   */

  var parseHeaders = function parseHeaders(headers) {
    var parsed = {};
    var key;
    var val;
    var i;

    if (!headers) {
      return parsed;
    }

    utils.forEach(headers.split('\n'), function parser(line) {
      i = line.indexOf(':');
      key = utils.trim(line.substr(0, i)).toLowerCase();
      val = utils.trim(line.substr(i + 1));

      if (key) {
        if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
          return;
        }

        if (key === 'set-cookie') {
          parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
        } else {
          parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
        }
      }
    });
    return parsed;
  };

  var isURLSameOrigin = utils.isStandardBrowserEnv() ? // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;
    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */

    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href); // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils

      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);
    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */

    return function isURLSameOrigin(requestURL) {
      var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
      return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
    };
  }() : // Non standard browser envs (web workers, react-native) lack needed support.
  function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  }();

  var cookies = utils.isStandardBrowserEnv() ? // Standard browser envs support document.cookie
  function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },
      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return match ? decodeURIComponent(match[3]) : null;
      },
      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  }() : // Non standard browser env (web workers, react-native) lack needed support.
  function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() {
        return null;
      },
      remove: function remove() {}
    };
  }();

  var xhr = function xhrAdapter(config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
      var requestData = config.data;
      var requestHeaders = config.headers;

      if (utils.isFormData(requestData)) {
        delete requestHeaders['Content-Type']; // Let the browser set it
      }

      var request = new XMLHttpRequest(); // HTTP basic authentication

      if (config.auth) {
        var username = config.auth.username || '';
        var password = config.auth.password || '';
        requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
      }

      var fullPath = buildFullPath(config.baseURL, config.url);
      request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true); // Set the request timeout in MS

      request.timeout = config.timeout; // Listen for ready state

      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        } // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request


        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        } // Prepare the response


        var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
        var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
        var response = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config: config,
          request: request
        };
        settle(resolve, reject, response); // Clean up request

        request = null;
      }; // Handle browser request cancellation (as opposed to a manual cancellation)


      request.onabort = function handleAbort() {
        if (!request) {
          return;
        }

        reject(createError('Request aborted', config, 'ECONNABORTED', request)); // Clean up request

        request = null;
      }; // Handle low level network errors


      request.onerror = function handleError() {
        // Real errors are hidden from us by the browser
        // onerror should only fire if it's a network error
        reject(createError('Network Error', config, null, request)); // Clean up request

        request = null;
      }; // Handle timeout


      request.ontimeout = function handleTimeout() {
        var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';

        if (config.timeoutErrorMessage) {
          timeoutErrorMessage = config.timeoutErrorMessage;
        }

        reject(createError(timeoutErrorMessage, config, 'ECONNABORTED', request)); // Clean up request

        request = null;
      }; // Add xsrf header
      // This is only done if running in a standard browser environment.
      // Specifically not if we're in a web worker, or react-native.


      if (utils.isStandardBrowserEnv()) {
        var cookies$1 = cookies; // Add xsrf header

        var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies$1.read(config.xsrfCookieName) : undefined;

        if (xsrfValue) {
          requestHeaders[config.xsrfHeaderName] = xsrfValue;
        }
      } // Add headers to the request


      if ('setRequestHeader' in request) {
        utils.forEach(requestHeaders, function setRequestHeader(val, key) {
          if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
            // Remove Content-Type if data is undefined
            delete requestHeaders[key];
          } else {
            // Otherwise add header to the request
            request.setRequestHeader(key, val);
          }
        });
      } // Add withCredentials to request if needed


      if (!utils.isUndefined(config.withCredentials)) {
        request.withCredentials = !!config.withCredentials;
      } // Add responseType to request if needed


      if (config.responseType) {
        try {
          request.responseType = config.responseType;
        } catch (e) {
          // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
          // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
          if (config.responseType !== 'json') {
            throw e;
          }
        }
      } // Handle progress if needed


      if (typeof config.onDownloadProgress === 'function') {
        request.addEventListener('progress', config.onDownloadProgress);
      } // Not all browsers support upload events


      if (typeof config.onUploadProgress === 'function' && request.upload) {
        request.upload.addEventListener('progress', config.onUploadProgress);
      }

      if (config.cancelToken) {
        // Handle cancellation
        config.cancelToken.promise.then(function onCanceled(cancel) {
          if (!request) {
            return;
          }

          request.abort();
          reject(cancel); // Clean up request

          request = null;
        });
      }

      if (requestData === undefined) {
        requestData = null;
      } // Send the request


      request.send(requestData);
    });
  };

  var DEFAULT_CONTENT_TYPE = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  function setContentTypeIfUnset(headers, value) {
    if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
      headers['Content-Type'] = value;
    }
  }

  function getDefaultAdapter() {
    var adapter;

    if (typeof XMLHttpRequest !== 'undefined') {
      // For browsers use XHR adapter
      adapter = xhr;
    } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
      // For node use HTTP adapter
      adapter = xhr;
    }

    return adapter;
  }

  var defaults = {
    adapter: getDefaultAdapter(),
    transformRequest: [function transformRequest(data, headers) {
      normalizeHeaderName(headers, 'Accept');
      normalizeHeaderName(headers, 'Content-Type');

      if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
        return data;
      }

      if (utils.isArrayBufferView(data)) {
        return data.buffer;
      }

      if (utils.isURLSearchParams(data)) {
        setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
        return data.toString();
      }

      if (utils.isObject(data)) {
        setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
        return JSON.stringify(data);
      }

      return data;
    }],
    transformResponse: [function transformResponse(data) {
      /*eslint no-param-reassign:0*/
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
        } catch (e) {
          /* Ignore */
        }
      }

      return data;
    }],

    /**
     * A timeout in milliseconds to abort a request. If set to 0 (default) a
     * timeout is not created.
     */
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    validateStatus: function validateStatus(status) {
      return status >= 200 && status < 300;
    }
  };
  defaults.headers = {
    common: {
      'Accept': 'application/json, text/plain, */*'
    }
  };
  utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
    defaults.headers[method] = {};
  });
  utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
    defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
  });
  var defaults_1 = defaults;

  /**
   * Throws a `Cancel` if cancellation has been requested.
   */


  function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
      config.cancelToken.throwIfRequested();
    }
  }
  /**
   * Dispatch a request to the server using the configured adapter.
   *
   * @param {object} config The config that is to be used for the request
   * @returns {Promise} The Promise to be fulfilled
   */


  var dispatchRequest = function dispatchRequest(config) {
    throwIfCancellationRequested(config); // Ensure headers exist

    config.headers = config.headers || {}; // Transform request data

    config.data = transformData(config.data, config.headers, config.transformRequest); // Flatten headers

    config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
    utils.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
      delete config.headers[method];
    });
    var adapter = config.adapter || defaults_1.adapter;
    return adapter(config).then(function onAdapterResolution(response) {
      throwIfCancellationRequested(config); // Transform response data

      response.data = transformData(response.data, response.headers, config.transformResponse);
      return response;
    }, function onAdapterRejection(reason) {
      if (!isCancel(reason)) {
        throwIfCancellationRequested(config); // Transform response data

        if (reason && reason.response) {
          reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse);
        }
      }

      return Promise.reject(reason);
    });
  };

  /**
   * Config-specific merge-function which creates a new config-object
   * by merging two configuration objects together.
   *
   * @param {Object} config1
   * @param {Object} config2
   * @returns {Object} New object resulting from merging config2 to config1
   */


  var mergeConfig = function mergeConfig(config1, config2) {
    // eslint-disable-next-line no-param-reassign
    config2 = config2 || {};
    var config = {};
    var valueFromConfig2Keys = ['url', 'method', 'params', 'data'];
    var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy'];
    var defaultToConfig2Keys = ['baseURL', 'url', 'transformRequest', 'transformResponse', 'paramsSerializer', 'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName', 'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent', 'httpsAgent', 'cancelToken', 'socketPath'];
    utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
      if (typeof config2[prop] !== 'undefined') {
        config[prop] = config2[prop];
      }
    });
    utils.forEach(mergeDeepPropertiesKeys, function mergeDeepProperties(prop) {
      if (utils.isObject(config2[prop])) {
        config[prop] = utils.deepMerge(config1[prop], config2[prop]);
      } else if (typeof config2[prop] !== 'undefined') {
        config[prop] = config2[prop];
      } else if (utils.isObject(config1[prop])) {
        config[prop] = utils.deepMerge(config1[prop]);
      } else if (typeof config1[prop] !== 'undefined') {
        config[prop] = config1[prop];
      }
    });
    utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
      if (typeof config2[prop] !== 'undefined') {
        config[prop] = config2[prop];
      } else if (typeof config1[prop] !== 'undefined') {
        config[prop] = config1[prop];
      }
    });
    var axiosKeys = valueFromConfig2Keys.concat(mergeDeepPropertiesKeys).concat(defaultToConfig2Keys);
    var otherKeys = Object.keys(config2).filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });
    utils.forEach(otherKeys, function otherKeysDefaultToConfig2(prop) {
      if (typeof config2[prop] !== 'undefined') {
        config[prop] = config2[prop];
      } else if (typeof config1[prop] !== 'undefined') {
        config[prop] = config1[prop];
      }
    });
    return config;
  };

  /**
   * Create a new instance of Axios
   *
   * @param {Object} instanceConfig The default config for the instance
   */


  function Axios(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager_1(),
      response: new InterceptorManager_1()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {Object} config The config specific for this request (merged with this.defaults)
   */


  Axios.prototype.request = function request(config) {
    /*eslint no-param-reassign:0*/
    // Allow for axios('example/url'[, config]) a la fetch API
    if (typeof config === 'string') {
      config = arguments[1] || {};
      config.url = arguments[0];
    } else {
      config = config || {};
    }

    config = mergeConfig(this.defaults, config); // Set config.method

    if (config.method) {
      config.method = config.method.toLowerCase();
    } else if (this.defaults.method) {
      config.method = this.defaults.method.toLowerCase();
    } else {
      config.method = 'get';
    } // Hook up interceptors middleware


    var chain = [dispatchRequest, undefined];
    var promise = Promise.resolve(config);
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      chain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      chain.push(interceptor.fulfilled, interceptor.rejected);
    });

    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  };

  Axios.prototype.getUri = function getUri(config) {
    config = mergeConfig(this.defaults, config);
    return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
  }; // Provide aliases for supported request methods


  utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
    /*eslint func-names:0*/
    Axios.prototype[method] = function (url, config) {
      return this.request(utils.merge(config || {}, {
        method: method,
        url: url
      }));
    };
  });
  utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
    /*eslint func-names:0*/
    Axios.prototype[method] = function (url, data, config) {
      return this.request(utils.merge(config || {}, {
        method: method,
        url: url,
        data: data
      }));
    };
  });
  var Axios_1 = Axios;

  /**
   * A `Cancel` is an object that is thrown when an operation is canceled.
   *
   * @class
   * @param {string=} message The message.
   */

  function Cancel(message) {
    this.message = message;
  }

  Cancel.prototype.toString = function toString() {
    return 'Cancel' + (this.message ? ': ' + this.message : '');
  };

  Cancel.prototype.__CANCEL__ = true;
  var Cancel_1 = Cancel;

  /**
   * A `CancelToken` is an object that can be used to request cancellation of an operation.
   *
   * @class
   * @param {Function} executor The executor function.
   */


  function CancelToken(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('executor must be a function.');
    }

    var resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });
    var token = this;
    executor(function cancel(message) {
      if (token.reason) {
        // Cancellation has already been requested
        return;
      }

      token.reason = new Cancel_1(message);
      resolvePromise(token.reason);
    });
  }
  /**
   * Throws a `Cancel` if cancellation has been requested.
   */


  CancelToken.prototype.throwIfRequested = function throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  };
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */


  CancelToken.source = function source() {
    var cancel;
    var token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token: token,
      cancel: cancel
    };
  };

  var CancelToken_1 = CancelToken;

  /**
   * Syntactic sugar for invoking a function and expanding an array for arguments.
   *
   * Common use case would be to use `Function.prototype.apply`.
   *
   *  ```js
   *  function f(x, y, z) {}
   *  var args = [1, 2, 3];
   *  f.apply(null, args);
   *  ```
   *
   * With `spread` this example can be re-written.
   *
   *  ```js
   *  spread(function(x, y, z) {})([1, 2, 3]);
   *  ```
   *
   * @param {Function} callback
   * @returns {Function}
   */

  var spread = function spread(callback) {
    return function wrap(arr) {
      return callback.apply(null, arr);
    };
  };

  /**
   * Create an instance of Axios
   *
   * @param {Object} defaultConfig The default config for the instance
   * @return {Axios} A new instance of Axios
   */


  function createInstance(defaultConfig) {
    var context = new Axios_1(defaultConfig);
    var instance = bind(Axios_1.prototype.request, context); // Copy axios.prototype to instance

    utils.extend(instance, Axios_1.prototype, context); // Copy context to instance

    utils.extend(instance, context);
    return instance;
  } // Create the default instance to be exported


  var axios = createInstance(defaults_1); // Expose Axios class to allow class inheritance

  axios.Axios = Axios_1; // Factory for creating new instances

  axios.create = function create(instanceConfig) {
    return createInstance(mergeConfig(axios.defaults, instanceConfig));
  }; // Expose Cancel & CancelToken


  axios.Cancel = Cancel_1;
  axios.CancelToken = CancelToken_1;
  axios.isCancel = isCancel; // Expose all/spread

  axios.all = function all(promises) {
    return Promise.all(promises);
  };

  axios.spread = spread;
  var axios_1 = axios; // Allow use of default import syntax in TypeScript

  var default_1 = axios;
  axios_1.default = default_1;

  var axios$1 = axios_1;

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
      return;
    }

    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);
        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function noop() {}

  var identity$1 = function identity(x) {
    return x;
  };

  function add_location(element, file, line, column, char) {
    element.__svelte_meta = {
      loc: {
        file: file,
        line: line,
        column: column,
        char: char
      }
    };
  }

  function run$1(fn) {
    return fn();
  }

  function blank_object() {
    return Object.create(null);
  }

  function run_all(fns) {
    fns.forEach(run$1);
  }

  function is_function(thing) {
    return typeof thing === 'function';
  }

  function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || a && _typeof(a) === 'object' || typeof a === 'function';
  }

  function validate_store(store, name) {
    if (store != null && typeof store.subscribe !== 'function') {
      throw new Error("'".concat(name, "' is not a store with a 'subscribe' method"));
    }
  }

  function subscribe(store) {
    if (store == null) {
      return noop;
    }

    for (var _len = arguments.length, callbacks = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      callbacks[_key - 1] = arguments[_key];
    }

    var unsub = store.subscribe.apply(store, callbacks);
    return unsub.unsubscribe ? function () {
      return unsub.unsubscribe();
    } : unsub;
  }

  function get_store_value(store) {
    var value;
    subscribe(store, function (_) {
      return value = _;
    })();
    return value;
  }

  function component_subscribe(component, store, callback) {
    component.$$.on_destroy.push(subscribe(store, callback));
  }

  var is_client = typeof window !== 'undefined';
  var now = is_client ? function () {
    return window.performance.now();
  } : function () {
    return Date.now();
  };
  var raf = is_client ? function (cb) {
    return requestAnimationFrame(cb);
  } : noop; // used internally for testing

  var tasks = new Set();

  function run_tasks(now) {
    tasks.forEach(function (task) {
      if (!task.c(now)) {
        tasks.delete(task);
        task.f();
      }
    });
    if (tasks.size !== 0) raf(run_tasks);
  }
  /**
   * Creates a new task that runs on each raf frame
   * until it returns a falsy value or is aborted
   */


  function loop(callback) {
    var task;
    if (tasks.size === 0) raf(run_tasks);
    return {
      promise: new Promise(function (fulfill) {
        tasks.add(task = {
          c: callback,
          f: fulfill
        });
      }),
      abort: function abort() {
        tasks.delete(task);
      }
    };
  }

  function append(target, node) {
    target.appendChild(node);
  }

  function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
  }

  function detach(node) {
    node.parentNode.removeChild(node);
  }

  function destroy_each(iterations, detaching) {
    for (var i = 0; i < iterations.length; i += 1) {
      if (iterations[i]) iterations[i].d(detaching);
    }
  }

  function element(name) {
    return document.createElement(name);
  }

  function text(data) {
    return document.createTextNode(data);
  }

  function space$1() {
    return text(' ');
  }

  function empty$1() {
    return text('');
  }

  function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return function () {
      return node.removeEventListener(event, handler, options);
    };
  }

  function prevent_default(fn) {
    return function (event) {
      event.preventDefault(); // @ts-ignore

      return fn.call(this, event);
    };
  }

  function attr(node, attribute, value) {
    if (value == null) node.removeAttribute(attribute);else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
  }

  function children(element) {
    return Array.from(element.childNodes);
  }

  function set_input_value(input, value) {
    if (value != null || input.value) {
      input.value = value;
    }
  }

  function set_style(node, key, value, important) {
    node.style.setProperty(key, value, important ? 'important' : '');
  }

  function toggle_class(element, name, toggle) {
    element.classList[toggle ? 'add' : 'remove'](name);
  }

  function custom_event(type, detail) {
    var e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, false, false, detail);
    return e;
  }

  var stylesheet;
  var active = 0;
  var current_rules = {}; // https://github.com/darkskyapp/string-hash/blob/master/index.js

  function hash(str) {
    var hash = 5381;
    var i = str.length;

    while (i--) {
      hash = (hash << 5) - hash ^ str.charCodeAt(i);
    }

    return hash >>> 0;
  }

  function create_rule(node, a, b, duration, delay, ease, fn) {
    var uid = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
    var step = 16.666 / duration;
    var keyframes = '{\n';

    for (var p = 0; p <= 1; p += step) {
      var t = a + (b - a) * ease(p);
      keyframes += p * 100 + "%{".concat(fn(t, 1 - t), "}\n");
    }

    var rule = keyframes + "100% {".concat(fn(b, 1 - b), "}\n}");
    var name = "__svelte_".concat(hash(rule), "_").concat(uid);

    if (!current_rules[name]) {
      if (!stylesheet) {
        var style = element('style');
        document.head.appendChild(style);
        stylesheet = style.sheet;
      }

      current_rules[name] = true;
      stylesheet.insertRule("@keyframes ".concat(name, " ").concat(rule), stylesheet.cssRules.length);
    }

    var animation = node.style.animation || '';
    node.style.animation = "".concat(animation ? "".concat(animation, ", ") : "").concat(name, " ").concat(duration, "ms linear ").concat(delay, "ms 1 both");
    active += 1;
    return name;
  }

  function delete_rule(node, name) {
    node.style.animation = (node.style.animation || '').split(', ').filter(name ? function (anim) {
      return anim.indexOf(name) < 0;
    } // remove specific animation
    : function (anim) {
      return anim.indexOf('__svelte') === -1;
    } // remove all Svelte animations
    ).join(', ');
    if (name && ! --active) clear_rules();
  }

  function clear_rules() {
    raf(function () {
      if (active) return;
      var i = stylesheet.cssRules.length;

      while (i--) {
        stylesheet.deleteRule(i);
      }

      current_rules = {};
    });
  }

  var current_component;

  function set_current_component(component) {
    current_component = component;
  }

  function get_current_component() {
    if (!current_component) throw new Error("Function called outside component initialization");
    return current_component;
  }

  function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
  }

  function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
  }

  function getContext(key) {
    return get_current_component().$$.context.get(key);
  } // TODO figure out if we still want to support

  var dirty_components = [];
  var binding_callbacks = [];
  var render_callbacks = [];
  var flush_callbacks = [];
  var resolved_promise = Promise.resolve();
  var update_scheduled = false;

  function schedule_update() {
    if (!update_scheduled) {
      update_scheduled = true;
      resolved_promise.then(flush);
    }
  }

  function add_render_callback(fn) {
    render_callbacks.push(fn);
  }

  var flushing = false;
  var seen_callbacks = new Set();

  function flush() {
    if (flushing) return;
    flushing = true;

    do {
      // first, call beforeUpdate functions
      // and update components
      for (var i = 0; i < dirty_components.length; i += 1) {
        var component = dirty_components[i];
        set_current_component(component);
        update(component.$$);
      }

      dirty_components.length = 0;

      while (binding_callbacks.length) {
        binding_callbacks.pop()();
      } // then, once components are updated, call
      // afterUpdate functions. This may cause
      // subsequent updates...


      for (var _i = 0; _i < render_callbacks.length; _i += 1) {
        var callback = render_callbacks[_i];

        if (!seen_callbacks.has(callback)) {
          // ...so guard against infinite loops
          seen_callbacks.add(callback);
          callback();
        }
      }

      render_callbacks.length = 0;
    } while (dirty_components.length);

    while (flush_callbacks.length) {
      flush_callbacks.pop()();
    }

    update_scheduled = false;
    flushing = false;
    seen_callbacks.clear();
  }

  function update($$) {
    if ($$.fragment !== null) {
      $$.update();
      run_all($$.before_update);
      var dirty = $$.dirty;
      $$.dirty = [-1];
      $$.fragment && $$.fragment.p($$.ctx, dirty);
      $$.after_update.forEach(add_render_callback);
    }
  }

  var promise;

  function wait() {
    if (!promise) {
      promise = Promise.resolve();
      promise.then(function () {
        promise = null;
      });
    }

    return promise;
  }

  function dispatch(node, direction, kind) {
    node.dispatchEvent(custom_event("".concat(direction ? 'intro' : 'outro').concat(kind)));
  }

  var outroing = new Set();
  var outros;

  function group_outros() {
    outros = {
      r: 0,
      c: [],
      p: outros // parent group

    };
  }

  function check_outros() {
    if (!outros.r) {
      run_all(outros.c);
    }

    outros = outros.p;
  }

  function transition_in(block, local) {
    if (block && block.i) {
      outroing.delete(block);
      block.i(local);
    }
  }

  function transition_out(block, local, detach, callback) {
    if (block && block.o) {
      if (outroing.has(block)) return;
      outroing.add(block);
      outros.c.push(function () {
        outroing.delete(block);

        if (callback) {
          if (detach) block.d(1);
          callback();
        }
      });
      block.o(local);
    }
  }

  var null_transition = {
    duration: 0
  };

  function create_bidirectional_transition(node, fn, params, intro) {
    var config = fn(node, params);
    var t = intro ? 0 : 1;
    var running_program = null;
    var pending_program = null;
    var animation_name = null;

    function clear_animation() {
      if (animation_name) delete_rule(node, animation_name);
    }

    function init(program, duration) {
      var d = program.b - t;
      duration *= Math.abs(d);
      return {
        a: t,
        b: program.b,
        d: d,
        duration: duration,
        start: program.start,
        end: program.start + duration,
        group: program.group
      };
    }

    function go(b) {
      var _ref3 = config || null_transition,
          _ref3$delay = _ref3.delay,
          delay = _ref3$delay === void 0 ? 0 : _ref3$delay,
          _ref3$duration = _ref3.duration,
          duration = _ref3$duration === void 0 ? 300 : _ref3$duration,
          _ref3$easing = _ref3.easing,
          easing = _ref3$easing === void 0 ? identity$1 : _ref3$easing,
          _ref3$tick = _ref3.tick,
          tick = _ref3$tick === void 0 ? noop : _ref3$tick,
          css = _ref3.css;

      var program = {
        start: now() + delay,
        b: b
      };

      if (!b) {
        // @ts-ignore todo: improve typings
        program.group = outros;
        outros.r += 1;
      }

      if (running_program) {
        pending_program = program;
      } else {
        // if this is an intro, and there's a delay, we need to do
        // an initial tick and/or apply CSS animation immediately
        if (css) {
          clear_animation();
          animation_name = create_rule(node, t, b, duration, delay, easing, css);
        }

        if (b) tick(0, 1);
        running_program = init(program, duration);
        add_render_callback(function () {
          return dispatch(node, b, 'start');
        });
        loop(function (now) {
          if (pending_program && now > pending_program.start) {
            running_program = init(pending_program, duration);
            pending_program = null;
            dispatch(node, running_program.b, 'start');

            if (css) {
              clear_animation();
              animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
            }
          }

          if (running_program) {
            if (now >= running_program.end) {
              tick(t = running_program.b, 1 - t);
              dispatch(node, running_program.b, 'end');

              if (!pending_program) {
                // we're done
                if (running_program.b) {
                  // intro — we can tidy up immediately
                  clear_animation();
                } else {
                  // outro — needs to be coordinated
                  if (! --running_program.group.r) run_all(running_program.group.c);
                }
              }

              running_program = null;
            } else if (now >= running_program.start) {
              var p = now - running_program.start;
              t = running_program.a + running_program.d * easing(p / running_program.duration);
              tick(t, 1 - t);
            }
          }

          return !!(running_program || pending_program);
        });
      }
    }

    return {
      run: function run(b) {
        if (is_function(config)) {
          wait().then(function () {
            // @ts-ignore
            config = config();
            go(b);
          });
        } else {
          go(b);
        }
      },
      end: function end() {
        clear_animation();
        running_program = pending_program = null;
      }
    };
  }

  function create_component(block) {
    block && block.c();
  }

  function mount_component(component, target, anchor) {
    var _component$$$ = component.$$,
        fragment = _component$$$.fragment,
        on_mount = _component$$$.on_mount,
        on_destroy = _component$$$.on_destroy,
        after_update = _component$$$.after_update;
    fragment && fragment.m(target, anchor); // onMount happens before the initial afterUpdate

    add_render_callback(function () {
      var new_on_destroy = on_mount.map(run$1).filter(is_function);

      if (on_destroy) {
        on_destroy.push.apply(on_destroy, _toConsumableArray(new_on_destroy));
      } else {
        // Edge case - component was destroyed immediately,
        // most likely as a result of a binding initialising
        run_all(new_on_destroy);
      }

      component.$$.on_mount = [];
    });
    after_update.forEach(add_render_callback);
  }

  function destroy_component(component, detaching) {
    var $$ = component.$$;

    if ($$.fragment !== null) {
      run_all($$.on_destroy);
      $$.fragment && $$.fragment.d(detaching); // TODO null out other refs, including component.$$ (but need to
      // preserve final state?)

      $$.on_destroy = $$.fragment = null;
      $$.ctx = [];
    }
  }

  function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
      dirty_components.push(component);
      schedule_update();
      component.$$.dirty.fill(0);
    }

    component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
  }

  function init(component, options, instance, create_fragment, not_equal, props) {
    var dirty = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [-1];
    var parent_component = current_component;
    set_current_component(component);
    var prop_values = options.props || {};
    var $$ = component.$$ = {
      fragment: null,
      ctx: null,
      // state
      props: props,
      update: noop,
      not_equal: not_equal,
      bound: blank_object(),
      // lifecycle
      on_mount: [],
      on_destroy: [],
      before_update: [],
      after_update: [],
      context: new Map(parent_component ? parent_component.$$.context : []),
      // everything else
      callbacks: blank_object(),
      dirty: dirty
    };
    var ready = false;
    $$.ctx = instance ? instance(component, prop_values, function (i, ret) {
      var value = (arguments.length <= 2 ? 0 : arguments.length - 2) ? arguments.length <= 2 ? undefined : arguments[2] : ret;

      if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
        if ($$.bound[i]) $$.bound[i](value);
        if (ready) make_dirty(component, i);
      }

      return ret;
    }) : [];
    $$.update();
    ready = true;
    run_all($$.before_update); // `false` as a special case of no DOM component

    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;

    if (options.target) {
      if (options.hydrate) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        $$.fragment && $$.fragment.l(children(options.target));
      } else {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        $$.fragment && $$.fragment.c();
      }

      if (options.intro) transition_in(component.$$.fragment);
      mount_component(component, options.target, options.anchor);
      flush();
    }

    set_current_component(parent_component);
  }

  var SvelteElement;

  if (typeof HTMLElement === 'function') {
    SvelteElement =
    /*#__PURE__*/
    function (_HTMLElement) {
      _inherits(SvelteElement, _HTMLElement);

      function SvelteElement() {
        var _this;

        _classCallCheck(this, SvelteElement);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(SvelteElement).call(this));

        _this.attachShadow({
          mode: 'open'
        });

        return _this;
      }

      _createClass(SvelteElement, [{
        key: "connectedCallback",
        value: function connectedCallback() {
          // @ts-ignore todo: improve typings
          for (var key in this.$$.slotted) {
            // @ts-ignore todo: improve typings
            this.appendChild(this.$$.slotted[key]);
          }
        }
      }, {
        key: "attributeChangedCallback",
        value: function attributeChangedCallback(attr, _oldValue, newValue) {
          this[attr] = newValue;
        }
      }, {
        key: "$destroy",
        value: function $destroy() {
          destroy_component(this, 1);
          this.$destroy = noop;
        }
      }, {
        key: "$on",
        value: function $on(type, callback) {
          // TODO should this delegate to addEventListener?
          var callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
          callbacks.push(callback);
          return function () {
            var index = callbacks.indexOf(callback);
            if (index !== -1) callbacks.splice(index, 1);
          };
        }
      }, {
        key: "$set",
        value: function $set() {// overridden by instance, if it has props
        }
      }]);

      return SvelteElement;
    }(_wrapNativeSuper(HTMLElement));
  }

  var SvelteComponent =
  /*#__PURE__*/
  function () {
    function SvelteComponent() {
      _classCallCheck(this, SvelteComponent);
    }

    _createClass(SvelteComponent, [{
      key: "$destroy",
      value: function $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
      }
    }, {
      key: "$on",
      value: function $on(type, callback) {
        var callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
        callbacks.push(callback);
        return function () {
          var index = callbacks.indexOf(callback);
          if (index !== -1) callbacks.splice(index, 1);
        };
      }
    }, {
      key: "$set",
      value: function $set() {// overridden by instance, if it has props
      }
    }]);

    return SvelteComponent;
  }();

  function dispatch_dev(type, detail) {
    document.dispatchEvent(custom_event(type, Object.assign({
      version: '3.18.2'
    }, detail)));
  }

  function append_dev(target, node) {
    dispatch_dev("SvelteDOMInsert", {
      target: target,
      node: node
    });
    append(target, node);
  }

  function insert_dev(target, node, anchor) {
    dispatch_dev("SvelteDOMInsert", {
      target: target,
      node: node,
      anchor: anchor
    });
    insert(target, node, anchor);
  }

  function detach_dev(node) {
    dispatch_dev("SvelteDOMRemove", {
      node: node
    });
    detach(node);
  }

  function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
    var modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
    if (has_prevent_default) modifiers.push('preventDefault');
    if (has_stop_propagation) modifiers.push('stopPropagation');
    dispatch_dev("SvelteDOMAddEventListener", {
      node: node,
      event: event,
      handler: handler,
      modifiers: modifiers
    });
    var dispose = listen(node, event, handler, options);
    return function () {
      dispatch_dev("SvelteDOMRemoveEventListener", {
        node: node,
        event: event,
        handler: handler,
        modifiers: modifiers
      });
      dispose();
    };
  }

  function attr_dev(node, attribute, value) {
    attr(node, attribute, value);
    if (value == null) dispatch_dev("SvelteDOMRemoveAttribute", {
      node: node,
      attribute: attribute
    });else dispatch_dev("SvelteDOMSetAttribute", {
      node: node,
      attribute: attribute,
      value: value
    });
  }

  function prop_dev(node, property, value) {
    node[property] = value;
    dispatch_dev("SvelteDOMSetProperty", {
      node: node,
      property: property,
      value: value
    });
  }

  function set_data_dev(text, data) {
    data = '' + data;
    if (text.data === data) return;
    dispatch_dev("SvelteDOMSetData", {
      node: text,
      data: data
    });
    text.data = data;
  }

  var SvelteComponentDev =
  /*#__PURE__*/
  function (_SvelteComponent) {
    _inherits(SvelteComponentDev, _SvelteComponent);

    function SvelteComponentDev(options) {
      _classCallCheck(this, SvelteComponentDev);

      if (!options || !options.target && !options.$$inline) {
        throw new Error("'target' is a required option");
      }

      return _possibleConstructorReturn(this, _getPrototypeOf(SvelteComponentDev).call(this));
    }

    _createClass(SvelteComponentDev, [{
      key: "$destroy",
      value: function $destroy() {
        _get(_getPrototypeOf(SvelteComponentDev.prototype), "$destroy", this).call(this);

        this.$destroy = function () {
          console.warn("Component was already destroyed"); // eslint-disable-line no-console
        };
      }
    }]);

    return SvelteComponentDev;
  }(SvelteComponent);

  var subscriber_queue = [];
  /**
   * Create a `Writable` store that allows both updating and reading by subscription.
   * @param {*=}value initial value
   * @param {StartStopNotifier=}start start and stop notifications for subscriptions
   */


  function writable(value) {
    var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    var stop;
    var subscribers = [];

    function set(new_value) {
      if (safe_not_equal(value, new_value)) {
        value = new_value;

        if (stop) {
          // store is ready
          var run_queue = !subscriber_queue.length;

          for (var i = 0; i < subscribers.length; i += 1) {
            var s = subscribers[i];
            s[1]();
            subscriber_queue.push(s, value);
          }

          if (run_queue) {
            for (var _i = 0; _i < subscriber_queue.length; _i += 2) {
              subscriber_queue[_i][0](subscriber_queue[_i + 1]);
            }

            subscriber_queue.length = 0;
          }
        }
      }
    }

    function update(fn) {
      set(fn(value));
    }

    function subscribe(run) {
      var invalidate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
      var subscriber = [run, invalidate];
      subscribers.push(subscriber);

      if (subscribers.length === 1) {
        stop = start(set) || noop;
      }

      run(value);
      return function () {
        var index = subscribers.indexOf(subscriber);

        if (index !== -1) {
          subscribers.splice(index, 1);
        }

        if (subscribers.length === 0) {
          stop();
          stop = null;
        }
      };
    }

    return {
      set: set,
      update: update,
      subscribe: subscribe
    };
  }

  var DEFAULT_LOCALE = 'ru-RU';
  var DEFAULT_POSITION = 'right-bottom';
  var DEFAULT_TITLE = 'C-bot';
  var TRANSITION_DURATION = 200;
  var TOKEN_NAME = 'chatToken';
  var TRANSPORT_TYPE = 'wss';
  var LAYOUT_TYPE = 'fixed';
  var DEFAULT_TARGET = document.body;
  var DEFAULT_ASSETS_URL = '/';
  var EVENTS = {
    INIT_NAME: 'chatbot.init',
    MESSAGE_SEND_NAME: 'chatbot.message.send',
    MESSAGE_REPLY_NAME: 'chatbot.message.reply',
    HIDE_NAME: 'chatbot.hide',
    SHOW_NAME: 'chatbot.show'
  };

  function createChatVisible() {
    var _writable = writable(true),
        subscribe = _writable.subscribe,
        set = _writable.set,
        update = _writable.update;

    var chatHideEvent = new CustomEvent(EVENTS.HIDE_NAME);
    var chatShowEvent = new CustomEvent(EVENTS.SHOW_NAME);
    return {
      subscribe: subscribe,
      set: set,
      toggle: function toggle() {
        return update(function (value) {
          value ? chatHideEvent.dispatchEvent() : chatShowEvent.dispatchEvent();
          return !value;
        });
      },
      show: function show() {
        chatShowEvent.dispatchEvent();
        return set(true);
      },
      hide: function hide() {
        chatHideEvent.dispatchEvent();
        return set(false);
      }
    };
  }

  function createChatLoading() {
    var _writable2 = writable(false),
        subscribe = _writable2.subscribe,
        set = _writable2.set,
        update = _writable2.update;

    return {
      subscribe: subscribe,
      set: set,
      toggle: function toggle() {
        return update(function (value) {
          return !value;
        });
      },
      show: function show() {
        return set(true);
      },
      hide: function hide() {
        return set(false);
      }
    };
  }

  var chatVisible = createChatVisible();
  var chatLoading = createChatLoading();
  var isDev = writable();
  var chatLayout = writable();
  var chatPosition = writable();
  var chatToken = writable();
  var chatBaseUrl = writable();
  var chatLocale = writable();
  var chatData = writable();
  var chatTransportType = writable();
  var chatPlugins = writable();
  var chatTheme = writable();
  var chatOutsideClose = writable();
  var chatAssetsUrl = writable();

  function _defineProperty$1(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  /**
   * Assigns (shallow copies) the properties of `src` onto `dest`, if the
   * corresponding property on `dest` === `undefined`.
   *
   * @param {Object} dest The destination object.
   * @param {Object} src The source object.
   * @return {Object} The destination object (`dest`)
   */
  function defaults$1(dest, src) {
    for (var prop in src) {
      if (src.hasOwnProperty(prop) && dest[prop] === undefined) {
        dest[prop] = src[prop];
      }
    }

    return dest;
  }
  /**
   * Truncates the `str` at `len - ellipsisChars.length`, and adds the `ellipsisChars` to the
   * end of the string (by default, two periods: '..'). If the `str` length does not exceed
   * `len`, the string will be returned unchanged.
   *
   * @param {String} str The string to truncate and add an ellipsis to.
   * @param {Number} truncateLen The length to truncate the string at.
   * @param {String} [ellipsisChars=...] The ellipsis character(s) to add to the end of `str`
   *   when truncated. Defaults to '...'
   */

  function ellipsis(str, truncateLen, ellipsisChars) {
    var ellipsisLength;

    if (str.length > truncateLen) {
      if (ellipsisChars == null) {
        ellipsisChars = '&hellip;';
        ellipsisLength = 3;
      } else {
        ellipsisLength = ellipsisChars.length;
      }

      str = str.substring(0, truncateLen - ellipsisLength) + ellipsisChars;
    }

    return str;
  }
  /**
   * Supports `Array.prototype.indexOf()` functionality for old IE (IE8 and below).
   *
   * @param {Array} arr The array to find an element of.
   * @param {*} element The element to find in the array, and return the index of.
   * @return {Number} The index of the `element`, or -1 if it was not found.
   */

  function indexOf(arr, element) {
    if (Array.prototype.indexOf) {
      return arr.indexOf(element);
    } else {
      for (var i = 0, len = arr.length; i < len; i++) {
        if (arr[i] === element) return i;
      }

      return -1;
    }
  }
  /**
   * Removes array elements based on a filtering function. Mutates the input
   * array.
   *
   * Using this instead of the ES5 Array.prototype.filter() function, to allow
   * Autolinker compatibility with IE8, and also to prevent creating many new
   * arrays in memory for filtering.
   *
   * @param {Array} arr The array to remove elements from. This array is
   *   mutated.
   * @param {Function} fn A function which should return `true` to
   *   remove an element.
   * @return {Array} The mutated input `arr`.
   */

  function remove(arr, fn) {
    for (var i = arr.length - 1; i >= 0; i--) {
      if (fn(arr[i]) === true) {
        arr.splice(i, 1);
      }
    }
  }
  /**
   * Performs the functionality of what modern browsers do when `String.prototype.split()` is called
   * with a regular expression that contains capturing parenthesis.
   *
   * For example:
   *
   *     // Modern browsers:
   *     "a,b,c".split( /(,)/ );  // --> [ 'a', ',', 'b', ',', 'c' ]
   *
   *     // Old IE (including IE8):
   *     "a,b,c".split( /(,)/ );  // --> [ 'a', 'b', 'c' ]
   *
   * This method emulates the functionality of modern browsers for the old IE case.
   *
   * @param {String} str The string to split.
   * @param {RegExp} splitRegex The regular expression to split the input `str` on. The splitting
   *   character(s) will be spliced into the array, as in the "modern browsers" example in the
   *   description of this method.
   *   Note #1: the supplied regular expression **must** have the 'g' flag specified.
   *   Note #2: for simplicity's sake, the regular expression does not need
   *   to contain capturing parenthesis - it will be assumed that any match has them.
   * @return {String[]} The split array of strings, with the splitting character(s) included.
   */

  function splitAndCapture(str, splitRegex) {
    if (!splitRegex.global) throw new Error("`splitRegex` must have the 'g' flag set");
    var result = [],
        lastIdx = 0,
        match;

    while (match = splitRegex.exec(str)) {
      result.push(str.substring(lastIdx, match.index));
      result.push(match[0]); // push the splitting char(s)

      lastIdx = match.index + match[0].length;
    }

    result.push(str.substring(lastIdx));
    return result;
  }
  /**
   * Function that should never be called but is used to check that every
   * enum value is handled using TypeScript's 'never' type.
   */

  function throwUnhandledCaseError(theValue) {
    throw new Error("Unhandled case for value: '" + theValue + "'");
  }

  /**
   * @class Autolinker.HtmlTag
   * @extends Object
   *
   * Represents an HTML tag, which can be used to easily build/modify HTML tags programmatically.
   *
   * Autolinker uses this abstraction to create HTML tags, and then write them out as strings. You may also use
   * this class in your code, especially within a {@link Autolinker#replaceFn replaceFn}.
   *
   * ## Examples
   *
   * Example instantiation:
   *
   *     var tag = new Autolinker.HtmlTag( {
   *         tagName : 'a',
   *         attrs   : { 'href': 'http://google.com', 'class': 'external-link' },
   *         innerHtml : 'Google'
   *     } );
   *
   *     tag.toAnchorString();  // <a href="http://google.com" class="external-link">Google</a>
   *
   *     // Individual accessor methods
   *     tag.getTagName();                 // 'a'
   *     tag.getAttr( 'href' );            // 'http://google.com'
   *     tag.hasClass( 'external-link' );  // true
   *
   *
   * Using mutator methods (which may be used in combination with instantiation config properties):
   *
   *     var tag = new Autolinker.HtmlTag();
   *     tag.setTagName( 'a' );
   *     tag.setAttr( 'href', 'http://google.com' );
   *     tag.addClass( 'external-link' );
   *     tag.setInnerHtml( 'Google' );
   *
   *     tag.getTagName();                 // 'a'
   *     tag.getAttr( 'href' );            // 'http://google.com'
   *     tag.hasClass( 'external-link' );  // true
   *
   *     tag.toAnchorString();  // <a href="http://google.com" class="external-link">Google</a>
   *
   *
   * ## Example use within a {@link Autolinker#replaceFn replaceFn}
   *
   *     var html = Autolinker.link( "Test google.com", {
   *         replaceFn : function( match ) {
   *             var tag = match.buildTag();  // returns an {@link Autolinker.HtmlTag} instance, configured with the Match's href and anchor text
   *             tag.setAttr( 'rel', 'nofollow' );
   *
   *             return tag;
   *         }
   *     } );
   *
   *     // generated html:
   *     //   Test <a href="http://google.com" target="_blank" rel="nofollow">google.com</a>
   *
   *
   * ## Example use with a new tag for the replacement
   *
   *     var html = Autolinker.link( "Test google.com", {
   *         replaceFn : function( match ) {
   *             var tag = new Autolinker.HtmlTag( {
   *                 tagName : 'button',
   *                 attrs   : { 'title': 'Load URL: ' + match.getAnchorHref() },
   *                 innerHtml : 'Load URL: ' + match.getAnchorText()
   *             } );
   *
   *             return tag;
   *         }
   *     } );
   *
   *     // generated html:
   *     //   Test <button title="Load URL: http://google.com">Load URL: google.com</button>
   */

  var HtmlTag =
  /** @class */
  function () {
    /**
     * @method constructor
     * @param {Object} [cfg] The configuration properties for this class, in an Object (map)
     */
    function HtmlTag(cfg) {
      if (cfg === void 0) {
        cfg = {};
      }
      /**
       * @cfg {String} tagName
       *
       * The tag name. Ex: 'a', 'button', etc.
       *
       * Not required at instantiation time, but should be set using {@link #setTagName} before {@link #toAnchorString}
       * is executed.
       */


      this.tagName = ''; // default value just to get the above doc comment in the ES5 output and documentation generator

      /**
       * @cfg {Object.<String, String>} attrs
       *
       * An key/value Object (map) of attributes to create the tag with. The keys are the attribute names, and the
       * values are the attribute values.
       */

      this.attrs = {}; // default value just to get the above doc comment in the ES5 output and documentation generator

      /**
       * @cfg {String} innerHTML
       *
       * The inner HTML for the tag.
       */

      this.innerHTML = ''; // default value just to get the above doc comment in the ES5 output and documentation generator

      /**
       * @protected
       * @property {RegExp} whitespaceRegex
       *
       * Regular expression used to match whitespace in a string of CSS classes.
       */

      this.whitespaceRegex = /\s+/; // default value just to get the above doc comment in the ES5 output and documentation generator

      this.tagName = cfg.tagName || '';
      this.attrs = cfg.attrs || {};
      this.innerHTML = cfg.innerHtml || cfg.innerHTML || ''; // accept either the camelCased form or the fully capitalized acronym as in the DOM
    }
    /**
     * Sets the tag name that will be used to generate the tag with.
     *
     * @param {String} tagName
     * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
     */


    HtmlTag.prototype.setTagName = function (tagName) {
      this.tagName = tagName;
      return this;
    };
    /**
     * Retrieves the tag name.
     *
     * @return {String}
     */


    HtmlTag.prototype.getTagName = function () {
      return this.tagName || '';
    };
    /**
     * Sets an attribute on the HtmlTag.
     *
     * @param {String} attrName The attribute name to set.
     * @param {String} attrValue The attribute value to set.
     * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
     */


    HtmlTag.prototype.setAttr = function (attrName, attrValue) {
      var tagAttrs = this.getAttrs();
      tagAttrs[attrName] = attrValue;
      return this;
    };
    /**
     * Retrieves an attribute from the HtmlTag. If the attribute does not exist, returns `undefined`.
     *
     * @param {String} attrName The attribute name to retrieve.
     * @return {String} The attribute's value, or `undefined` if it does not exist on the HtmlTag.
     */


    HtmlTag.prototype.getAttr = function (attrName) {
      return this.getAttrs()[attrName];
    };
    /**
     * Sets one or more attributes on the HtmlTag.
     *
     * @param {Object.<String, String>} attrs A key/value Object (map) of the attributes to set.
     * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
     */


    HtmlTag.prototype.setAttrs = function (attrs) {
      Object.assign(this.getAttrs(), attrs);
      return this;
    };
    /**
     * Retrieves the attributes Object (map) for the HtmlTag.
     *
     * @return {Object.<String, String>} A key/value object of the attributes for the HtmlTag.
     */


    HtmlTag.prototype.getAttrs = function () {
      return this.attrs || (this.attrs = {});
    };
    /**
     * Sets the provided `cssClass`, overwriting any current CSS classes on the HtmlTag.
     *
     * @param {String} cssClass One or more space-separated CSS classes to set (overwrite).
     * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
     */


    HtmlTag.prototype.setClass = function (cssClass) {
      return this.setAttr('class', cssClass);
    };
    /**
     * Convenience method to add one or more CSS classes to the HtmlTag. Will not add duplicate CSS classes.
     *
     * @param {String} cssClass One or more space-separated CSS classes to add.
     * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
     */


    HtmlTag.prototype.addClass = function (cssClass) {
      var classAttr = this.getClass(),
          whitespaceRegex = this.whitespaceRegex,
          classes = !classAttr ? [] : classAttr.split(whitespaceRegex),
          newClasses = cssClass.split(whitespaceRegex),
          newClass;

      while (newClass = newClasses.shift()) {
        if (indexOf(classes, newClass) === -1) {
          classes.push(newClass);
        }
      }

      this.getAttrs()['class'] = classes.join(" ");
      return this;
    };
    /**
     * Convenience method to remove one or more CSS classes from the HtmlTag.
     *
     * @param {String} cssClass One or more space-separated CSS classes to remove.
     * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
     */


    HtmlTag.prototype.removeClass = function (cssClass) {
      var classAttr = this.getClass(),
          whitespaceRegex = this.whitespaceRegex,
          classes = !classAttr ? [] : classAttr.split(whitespaceRegex),
          removeClasses = cssClass.split(whitespaceRegex),
          removeClass;

      while (classes.length && (removeClass = removeClasses.shift())) {
        var idx = indexOf(classes, removeClass);

        if (idx !== -1) {
          classes.splice(idx, 1);
        }
      }

      this.getAttrs()['class'] = classes.join(" ");
      return this;
    };
    /**
     * Convenience method to retrieve the CSS class(es) for the HtmlTag, which will each be separated by spaces when
     * there are multiple.
     *
     * @return {String}
     */


    HtmlTag.prototype.getClass = function () {
      return this.getAttrs()['class'] || "";
    };
    /**
     * Convenience method to check if the tag has a CSS class or not.
     *
     * @param {String} cssClass The CSS class to check for.
     * @return {Boolean} `true` if the HtmlTag has the CSS class, `false` otherwise.
     */


    HtmlTag.prototype.hasClass = function (cssClass) {
      return (' ' + this.getClass() + ' ').indexOf(' ' + cssClass + ' ') !== -1;
    };
    /**
     * Sets the inner HTML for the tag.
     *
     * @param {String} html The inner HTML to set.
     * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
     */


    HtmlTag.prototype.setInnerHTML = function (html) {
      this.innerHTML = html;
      return this;
    };
    /**
     * Backwards compatibility method name.
     *
     * @param {String} html The inner HTML to set.
     * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
     */


    HtmlTag.prototype.setInnerHtml = function (html) {
      return this.setInnerHTML(html);
    };
    /**
     * Retrieves the inner HTML for the tag.
     *
     * @return {String}
     */


    HtmlTag.prototype.getInnerHTML = function () {
      return this.innerHTML || "";
    };
    /**
     * Backward compatibility method name.
     *
     * @return {String}
     */


    HtmlTag.prototype.getInnerHtml = function () {
      return this.getInnerHTML();
    };
    /**
     * Override of superclass method used to generate the HTML string for the tag.
     *
     * @return {String}
     */


    HtmlTag.prototype.toAnchorString = function () {
      var tagName = this.getTagName(),
          attrsStr = this.buildAttrsStr();
      attrsStr = attrsStr ? ' ' + attrsStr : ''; // prepend a space if there are actually attributes

      return ['<', tagName, attrsStr, '>', this.getInnerHtml(), '</', tagName, '>'].join("");
    };
    /**
     * Support method for {@link #toAnchorString}, returns the string space-separated key="value" pairs, used to populate
     * the stringified HtmlTag.
     *
     * @protected
     * @return {String} Example return: `attr1="value1" attr2="value2"`
     */


    HtmlTag.prototype.buildAttrsStr = function () {
      if (!this.attrs) return ""; // no `attrs` Object (map) has been set, return empty string

      var attrs = this.getAttrs(),
          attrsArr = [];

      for (var prop in attrs) {
        if (attrs.hasOwnProperty(prop)) {
          attrsArr.push(prop + '="' + attrs[prop] + '"');
        }
      }

      return attrsArr.join(" ");
    };

    return HtmlTag;
  }();

  /**
   * Date: 2015-10-05
   * Author: Kasper Søfren <soefritz@gmail.com> (https://github.com/kafoso)
   *
   * A truncation feature, where the ellipsis will be placed at a section within
   * the URL making it still somewhat human readable.
   *
   * @param {String} url						 A URL.
   * @param {Number} truncateLen		 The maximum length of the truncated output URL string.
   * @param {String} ellipsisChars	 The characters to place within the url, e.g. "...".
   * @return {String} The truncated URL.
   */
  function truncateSmart(url, truncateLen, ellipsisChars) {
    var ellipsisLengthBeforeParsing;
    var ellipsisLength;

    if (ellipsisChars == null) {
      ellipsisChars = '&hellip;';
      ellipsisLength = 3;
      ellipsisLengthBeforeParsing = 8;
    } else {
      ellipsisLength = ellipsisChars.length;
      ellipsisLengthBeforeParsing = ellipsisChars.length;
    }

    var parse_url = function parse_url(url) {
      var urlObj = {};
      var urlSub = url;
      var match = urlSub.match(/^([a-z]+):\/\//i);

      if (match) {
        urlObj.scheme = match[1];
        urlSub = urlSub.substr(match[0].length);
      }

      match = urlSub.match(/^(.*?)(?=(\?|#|\/|$))/i);

      if (match) {
        urlObj.host = match[1];
        urlSub = urlSub.substr(match[0].length);
      }

      match = urlSub.match(/^\/(.*?)(?=(\?|#|$))/i);

      if (match) {
        urlObj.path = match[1];
        urlSub = urlSub.substr(match[0].length);
      }

      match = urlSub.match(/^\?(.*?)(?=(#|$))/i);

      if (match) {
        urlObj.query = match[1];
        urlSub = urlSub.substr(match[0].length);
      }

      match = urlSub.match(/^#(.*?)$/i);

      if (match) {
        urlObj.fragment = match[1]; //urlSub = urlSub.substr(match[0].length);  -- not used. Uncomment if adding another block.
      }

      return urlObj;
    };

    var buildUrl = function buildUrl(urlObj) {
      var url = "";

      if (urlObj.scheme && urlObj.host) {
        url += urlObj.scheme + "://";
      }

      if (urlObj.host) {
        url += urlObj.host;
      }

      if (urlObj.path) {
        url += "/" + urlObj.path;
      }

      if (urlObj.query) {
        url += "?" + urlObj.query;
      }

      if (urlObj.fragment) {
        url += "#" + urlObj.fragment;
      }

      return url;
    };

    var buildSegment = function buildSegment(segment, remainingAvailableLength) {
      var remainingAvailableLengthHalf = remainingAvailableLength / 2,
          startOffset = Math.ceil(remainingAvailableLengthHalf),
          endOffset = -1 * Math.floor(remainingAvailableLengthHalf),
          end = "";

      if (endOffset < 0) {
        end = segment.substr(endOffset);
      }

      return segment.substr(0, startOffset) + ellipsisChars + end;
    };

    if (url.length <= truncateLen) {
      return url;
    }

    var availableLength = truncateLen - ellipsisLength;
    var urlObj = parse_url(url); // Clean up the URL

    if (urlObj.query) {
      var matchQuery = urlObj.query.match(/^(.*?)(?=(\?|\#))(.*?)$/i);

      if (matchQuery) {
        // Malformed URL; two or more "?". Removed any content behind the 2nd.
        urlObj.query = urlObj.query.substr(0, matchQuery[1].length);
        url = buildUrl(urlObj);
      }
    }

    if (url.length <= truncateLen) {
      return url;
    }

    if (urlObj.host) {
      urlObj.host = urlObj.host.replace(/^www\./, "");
      url = buildUrl(urlObj);
    }

    if (url.length <= truncateLen) {
      return url;
    } // Process and build the URL


    var str = "";

    if (urlObj.host) {
      str += urlObj.host;
    }

    if (str.length >= availableLength) {
      if (urlObj.host.length == truncateLen) {
        return (urlObj.host.substr(0, truncateLen - ellipsisLength) + ellipsisChars).substr(0, availableLength + ellipsisLengthBeforeParsing);
      }

      return buildSegment(str, availableLength).substr(0, availableLength + ellipsisLengthBeforeParsing);
    }

    var pathAndQuery = "";

    if (urlObj.path) {
      pathAndQuery += "/" + urlObj.path;
    }

    if (urlObj.query) {
      pathAndQuery += "?" + urlObj.query;
    }

    if (pathAndQuery) {
      if ((str + pathAndQuery).length >= availableLength) {
        if ((str + pathAndQuery).length == truncateLen) {
          return (str + pathAndQuery).substr(0, truncateLen);
        }

        var remainingAvailableLength = availableLength - str.length;
        return (str + buildSegment(pathAndQuery, remainingAvailableLength)).substr(0, availableLength + ellipsisLengthBeforeParsing);
      } else {
        str += pathAndQuery;
      }
    }

    if (urlObj.fragment) {
      var fragment = "#" + urlObj.fragment;

      if ((str + fragment).length >= availableLength) {
        if ((str + fragment).length == truncateLen) {
          return (str + fragment).substr(0, truncateLen);
        }

        var remainingAvailableLength2 = availableLength - str.length;
        return (str + buildSegment(fragment, remainingAvailableLength2)).substr(0, availableLength + ellipsisLengthBeforeParsing);
      } else {
        str += fragment;
      }
    }

    if (urlObj.scheme && urlObj.host) {
      var scheme = urlObj.scheme + "://";

      if ((str + scheme).length < availableLength) {
        return (scheme + str).substr(0, truncateLen);
      }
    }

    if (str.length <= truncateLen) {
      return str;
    }

    var end = "";

    if (availableLength > 0) {
      end = str.substr(-1 * Math.floor(availableLength / 2));
    }

    return (str.substr(0, Math.ceil(availableLength / 2)) + ellipsisChars + end).substr(0, availableLength + ellipsisLengthBeforeParsing);
  }

  /**
   * Date: 2015-10-05
   * Author: Kasper Søfren <soefritz@gmail.com> (https://github.com/kafoso)
   *
   * A truncation feature, where the ellipsis will be placed in the dead-center of the URL.
   *
   * @param {String} url             A URL.
   * @param {Number} truncateLen     The maximum length of the truncated output URL string.
   * @param {String} ellipsisChars   The characters to place within the url, e.g. "..".
   * @return {String} The truncated URL.
   */
  function truncateMiddle(url, truncateLen, ellipsisChars) {
    if (url.length <= truncateLen) {
      return url;
    }

    var ellipsisLengthBeforeParsing;
    var ellipsisLength;

    if (ellipsisChars == null) {
      ellipsisChars = '&hellip;';
      ellipsisLengthBeforeParsing = 8;
      ellipsisLength = 3;
    } else {
      ellipsisLengthBeforeParsing = ellipsisChars.length;
      ellipsisLength = ellipsisChars.length;
    }

    var availableLength = truncateLen - ellipsisLength;
    var end = "";

    if (availableLength > 0) {
      end = url.substr(-1 * Math.floor(availableLength / 2));
    }

    return (url.substr(0, Math.ceil(availableLength / 2)) + ellipsisChars + end).substr(0, availableLength + ellipsisLengthBeforeParsing);
  }

  /**
   * A truncation feature where the ellipsis will be placed at the end of the URL.
   *
   * @param {String} anchorText
   * @param {Number} truncateLen The maximum length of the truncated output URL string.
   * @param {String} ellipsisChars The characters to place within the url, e.g. "..".
   * @return {String} The truncated URL.
   */

  function truncateEnd(anchorText, truncateLen, ellipsisChars) {
    return ellipsis(anchorText, truncateLen, ellipsisChars);
  }

  /**
   * @protected
   * @class Autolinker.AnchorTagBuilder
   * @extends Object
   *
   * Builds anchor (&lt;a&gt;) tags for the Autolinker utility when a match is
   * found.
   *
   * Normally this class is instantiated, configured, and used internally by an
   * {@link Autolinker} instance, but may actually be used indirectly in a
   * {@link Autolinker#replaceFn replaceFn} to create {@link Autolinker.HtmlTag HtmlTag}
   * instances which may be modified before returning from the
   * {@link Autolinker#replaceFn replaceFn}. For example:
   *
   *     var html = Autolinker.link( "Test google.com", {
   *         replaceFn : function( match ) {
   *             var tag = match.buildTag();  // returns an {@link Autolinker.HtmlTag} instance
   *             tag.setAttr( 'rel', 'nofollow' );
   *
   *             return tag;
   *         }
   *     } );
   *
   *     // generated html:
   *     //   Test <a href="http://google.com" target="_blank" rel="nofollow">google.com</a>
   */

  var AnchorTagBuilder =
  /** @class */
  function () {
    /**
     * @method constructor
     * @param {Object} [cfg] The configuration options for the AnchorTagBuilder instance, specified in an Object (map).
     */
    function AnchorTagBuilder(cfg) {
      if (cfg === void 0) {
        cfg = {};
      }
      /**
       * @cfg {Boolean} newWindow
       * @inheritdoc Autolinker#newWindow
       */


      this.newWindow = false; // default value just to get the above doc comment in the ES5 output and documentation generator

      /**
       * @cfg {Object} truncate
       * @inheritdoc Autolinker#truncate
       */

      this.truncate = {}; // default value just to get the above doc comment in the ES5 output and documentation generator

      /**
       * @cfg {String} className
       * @inheritdoc Autolinker#className
       */

      this.className = ''; // default value just to get the above doc comment in the ES5 output and documentation generator

      this.newWindow = cfg.newWindow || false;
      this.truncate = cfg.truncate || {};
      this.className = cfg.className || '';
    }
    /**
     * Generates the actual anchor (&lt;a&gt;) tag to use in place of the
     * matched text, via its `match` object.
     *
     * @param {Autolinker.match.Match} match The Match instance to generate an
     *   anchor tag from.
     * @return {Autolinker.HtmlTag} The HtmlTag instance for the anchor tag.
     */


    AnchorTagBuilder.prototype.build = function (match) {
      return new HtmlTag({
        tagName: 'a',
        attrs: this.createAttrs(match),
        innerHtml: this.processAnchorText(match.getAnchorText())
      });
    };
    /**
     * Creates the Object (map) of the HTML attributes for the anchor (&lt;a&gt;)
     *   tag being generated.
     *
     * @protected
     * @param {Autolinker.match.Match} match The Match instance to generate an
     *   anchor tag from.
     * @return {Object} A key/value Object (map) of the anchor tag's attributes.
     */


    AnchorTagBuilder.prototype.createAttrs = function (match) {
      var attrs = {
        'href': match.getAnchorHref() // we'll always have the `href` attribute

      };
      var cssClass = this.createCssClass(match);

      if (cssClass) {
        attrs['class'] = cssClass;
      }

      if (this.newWindow) {
        attrs['target'] = "_blank";
        attrs['rel'] = "noopener noreferrer"; // Issue #149. See https://mathiasbynens.github.io/rel-noopener/
      }

      if (this.truncate) {
        if (this.truncate.length && this.truncate.length < match.getAnchorText().length) {
          attrs['title'] = match.getAnchorHref();
        }
      }

      return attrs;
    };
    /**
     * Creates the CSS class that will be used for a given anchor tag, based on
     * the `matchType` and the {@link #className} config.
     *
     * Example returns:
     *
     * - ""                                      // no {@link #className}
     * - "myLink myLink-url"                     // url match
     * - "myLink myLink-email"                   // email match
     * - "myLink myLink-phone"                   // phone match
     * - "myLink myLink-hashtag"                 // hashtag match
     * - "myLink myLink-mention myLink-twitter"  // mention match with Twitter service
     *
     * @protected
     * @param {Autolinker.match.Match} match The Match instance to generate an
     *   anchor tag from.
     * @return {String} The CSS class string for the link. Example return:
     *   "myLink myLink-url". If no {@link #className} was configured, returns
     *   an empty string.
     */


    AnchorTagBuilder.prototype.createCssClass = function (match) {
      var className = this.className;

      if (!className) {
        return "";
      } else {
        var returnClasses = [className],
            cssClassSuffixes = match.getCssClassSuffixes();

        for (var i = 0, len = cssClassSuffixes.length; i < len; i++) {
          returnClasses.push(className + '-' + cssClassSuffixes[i]);
        }

        return returnClasses.join(' ');
      }
    };
    /**
     * Processes the `anchorText` by truncating the text according to the
     * {@link #truncate} config.
     *
     * @private
     * @param {String} anchorText The anchor tag's text (i.e. what will be
     *   displayed).
     * @return {String} The processed `anchorText`.
     */


    AnchorTagBuilder.prototype.processAnchorText = function (anchorText) {
      anchorText = this.doTruncate(anchorText);
      return anchorText;
    };
    /**
     * Performs the truncation of the `anchorText` based on the {@link #truncate}
     * option. If the `anchorText` is longer than the length specified by the
     * {@link #truncate} option, the truncation is performed based on the
     * `location` property. See {@link #truncate} for details.
     *
     * @private
     * @param {String} anchorText The anchor tag's text (i.e. what will be
     *   displayed).
     * @return {String} The truncated anchor text.
     */


    AnchorTagBuilder.prototype.doTruncate = function (anchorText) {
      var truncate = this.truncate;
      if (!truncate || !truncate.length) return anchorText;
      var truncateLength = truncate.length,
          truncateLocation = truncate.location;

      if (truncateLocation === 'smart') {
        return truncateSmart(anchorText, truncateLength);
      } else if (truncateLocation === 'middle') {
        return truncateMiddle(anchorText, truncateLength);
      } else {
        return truncateEnd(anchorText, truncateLength);
      }
    };

    return AnchorTagBuilder;
  }();

  /**
   * @abstract
   * @class Autolinker.match.Match
   *
   * Represents a match found in an input string which should be Autolinked. A Match object is what is provided in a
   * {@link Autolinker#replaceFn replaceFn}, and may be used to query for details about the match.
   *
   * For example:
   *
   *     var input = "...";  // string with URLs, Email Addresses, and Mentions (Twitter, Instagram, Soundcloud)
   *
   *     var linkedText = Autolinker.link( input, {
   *         replaceFn : function( match ) {
   *             console.log( "href = ", match.getAnchorHref() );
   *             console.log( "text = ", match.getAnchorText() );
   *
   *             switch( match.getType() ) {
   *                 case 'url' :
   *                     console.log( "url: ", match.getUrl() );
   *
   *                 case 'email' :
   *                     console.log( "email: ", match.getEmail() );
   *
   *                 case 'mention' :
   *                     console.log( "mention: ", match.getMention() );
   *             }
   *         }
   *     } );
   *
   * See the {@link Autolinker} class for more details on using the {@link Autolinker#replaceFn replaceFn}.
   */
  var Match =
  /** @class */
  function () {
    /**
     * @member Autolinker.match.Match
     * @method constructor
     * @param {Object} cfg The configuration properties for the Match
     *   instance, specified in an Object (map).
     */
    function Match(cfg) {
      /**
       * @cfg {Autolinker.AnchorTagBuilder} tagBuilder (required)
       *
       * Reference to the AnchorTagBuilder instance to use to generate an anchor
       * tag for the Match.
       */
      this.__jsduckDummyDocProp = null; // property used just to get the above doc comment into the ES5 output and documentation generator

      /**
       * @cfg {String} matchedText (required)
       *
       * The original text that was matched by the {@link Autolinker.matcher.Matcher}.
       */

      this.matchedText = ''; // default value just to get the above doc comment in the ES5 output and documentation generator

      /**
       * @cfg {Number} offset (required)
       *
       * The offset of where the match was made in the input string.
       */

      this.offset = 0; // default value just to get the above doc comment in the ES5 output and documentation generator

      this.tagBuilder = cfg.tagBuilder;
      this.matchedText = cfg.matchedText;
      this.offset = cfg.offset;
    }
    /**
     * Returns the original text that was matched.
     *
     * @return {String}
     */


    Match.prototype.getMatchedText = function () {
      return this.matchedText;
    };
    /**
     * Sets the {@link #offset} of where the match was made in the input string.
     *
     * A {@link Autolinker.matcher.Matcher} will be fed only HTML text nodes,
     * and will therefore set an original offset that is relative to the HTML
     * text node itself. However, we want this offset to be relative to the full
     * HTML input string, and thus if using {@link Autolinker#parse} (rather
     * than calling a {@link Autolinker.matcher.Matcher} directly), then this
     * offset is corrected after the Matcher itself has done its job.
     *
     * @param {Number} offset
     */


    Match.prototype.setOffset = function (offset) {
      this.offset = offset;
    };
    /**
     * Returns the offset of where the match was made in the input string. This
     * is the 0-based index of the match.
     *
     * @return {Number}
     */


    Match.prototype.getOffset = function () {
      return this.offset;
    };
    /**
     * Returns the CSS class suffix(es) for this match.
     *
     * A CSS class suffix is appended to the {@link Autolinker#className} in
     * the {@link Autolinker.AnchorTagBuilder} when a match is translated into
     * an anchor tag.
     *
     * For example, if {@link Autolinker#className} was configured as 'myLink',
     * and this method returns `[ 'url' ]`, the final class name of the element
     * will become: 'myLink myLink-url'.
     *
     * The match may provide multiple CSS class suffixes to be appended to the
     * {@link Autolinker#className} in order to facilitate better styling
     * options for different match criteria. See {@link Autolinker.match.Mention}
     * for an example.
     *
     * By default, this method returns a single array with the match's
     * {@link #getType type} name, but may be overridden by subclasses.
     *
     * @return {String[]}
     */


    Match.prototype.getCssClassSuffixes = function () {
      return [this.getType()];
    };
    /**
     * Builds and returns an {@link Autolinker.HtmlTag} instance based on the
     * Match.
     *
     * This can be used to easily generate anchor tags from matches, and either
     * return their HTML string, or modify them before doing so.
     *
     * Example Usage:
     *
     *     var tag = match.buildTag();
     *     tag.addClass( 'cordova-link' );
     *     tag.setAttr( 'target', '_system' );
     *
     *     tag.toAnchorString();  // <a href="http://google.com" class="cordova-link" target="_system">Google</a>
     *
     * Example Usage in {@link Autolinker#replaceFn}:
     *
     *     var html = Autolinker.link( "Test google.com", {
     *         replaceFn : function( match ) {
     *             var tag = match.buildTag();  // returns an {@link Autolinker.HtmlTag} instance
     *             tag.setAttr( 'rel', 'nofollow' );
     *
     *             return tag;
     *         }
     *     } );
     *
     *     // generated html:
     *     //   Test <a href="http://google.com" target="_blank" rel="nofollow">google.com</a>
     */


    Match.prototype.buildTag = function () {
      return this.tagBuilder.build(this);
    };

    return Match;
  }();

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0

  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.

  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** */

  /* global Reflect, Promise */
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  function __extends(d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }

  var _assign = function __assign() {
    _assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];

        for (var p in s) {
          if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
      }

      return t;
    };

    return _assign.apply(this, arguments);
  };

  /**
   * @class Autolinker.match.Email
   * @extends Autolinker.match.Match
   *
   * Represents a Email match found in an input string which should be Autolinked.
   *
   * See this class's superclass ({@link Autolinker.match.Match}) for more details.
   */

  var EmailMatch =
  /** @class */
  function (_super) {
    __extends(EmailMatch, _super);
    /**
     * @method constructor
     * @param {Object} cfg The configuration properties for the Match
     *   instance, specified in an Object (map).
     */


    function EmailMatch(cfg) {
      var _this = _super.call(this, cfg) || this;
      /**
       * @cfg {String} email (required)
       *
       * The email address that was matched.
       */


      _this.email = ''; // default value just to get the above doc comment in the ES5 output and documentation generator

      _this.email = cfg.email;
      return _this;
    }
    /**
     * Returns a string name for the type of match that this class represents.
     * For the case of EmailMatch, returns 'email'.
     *
     * @return {String}
     */


    EmailMatch.prototype.getType = function () {
      return 'email';
    };
    /**
     * Returns the email address that was matched.
     *
     * @return {String}
     */


    EmailMatch.prototype.getEmail = function () {
      return this.email;
    };
    /**
     * Returns the anchor href that should be generated for the match.
     *
     * @return {String}
     */


    EmailMatch.prototype.getAnchorHref = function () {
      return 'mailto:' + this.email;
    };
    /**
     * Returns the anchor text that should be generated for the match.
     *
     * @return {String}
     */


    EmailMatch.prototype.getAnchorText = function () {
      return this.email;
    };

    return EmailMatch;
  }(Match);

  /**
   * @class Autolinker.match.Hashtag
   * @extends Autolinker.match.Match
   *
   * Represents a Hashtag match found in an input string which should be
   * Autolinked.
   *
   * See this class's superclass ({@link Autolinker.match.Match}) for more
   * details.
   */

  var HashtagMatch =
  /** @class */
  function (_super) {
    __extends(HashtagMatch, _super);
    /**
     * @method constructor
     * @param {Object} cfg The configuration properties for the Match
     *   instance, specified in an Object (map).
     */


    function HashtagMatch(cfg) {
      var _this = _super.call(this, cfg) || this;
      /**
       * @cfg {String} serviceName
       *
       * The service to point hashtag matches to. See {@link Autolinker#hashtag}
       * for available values.
       */


      _this.serviceName = ''; // default value just to get the above doc comment in the ES5 output and documentation generator

      /**
       * @cfg {String} hashtag (required)
       *
       * The HashtagMatch that was matched, without the '#'.
       */

      _this.hashtag = ''; // default value just to get the above doc comment in the ES5 output and documentation generator

      _this.serviceName = cfg.serviceName;
      _this.hashtag = cfg.hashtag;
      return _this;
    }
    /**
     * Returns a string name for the type of match that this class represents.
     * For the case of HashtagMatch, returns 'hashtag'.
     *
     * @return {String}
     */


    HashtagMatch.prototype.getType = function () {
      return 'hashtag';
    };
    /**
     * Returns the configured {@link #serviceName} to point the HashtagMatch to.
     * Ex: 'facebook', 'twitter'.
     *
     * @return {String}
     */


    HashtagMatch.prototype.getServiceName = function () {
      return this.serviceName;
    };
    /**
     * Returns the matched hashtag, without the '#' character.
     *
     * @return {String}
     */


    HashtagMatch.prototype.getHashtag = function () {
      return this.hashtag;
    };
    /**
     * Returns the anchor href that should be generated for the match.
     *
     * @return {String}
     */


    HashtagMatch.prototype.getAnchorHref = function () {
      var serviceName = this.serviceName,
          hashtag = this.hashtag;

      switch (serviceName) {
        case 'twitter':
          return 'https://twitter.com/hashtag/' + hashtag;

        case 'facebook':
          return 'https://www.facebook.com/hashtag/' + hashtag;

        case 'instagram':
          return 'https://instagram.com/explore/tags/' + hashtag;

        default:
          // Shouldn't happen because Autolinker's constructor should block any invalid values, but just in case.
          throw new Error('Unknown service name to point hashtag to: ' + serviceName);
      }
    };
    /**
     * Returns the anchor text that should be generated for the match.
     *
     * @return {String}
     */


    HashtagMatch.prototype.getAnchorText = function () {
      return '#' + this.hashtag;
    };

    return HashtagMatch;
  }(Match);

  /**
   * @class Autolinker.match.Mention
   * @extends Autolinker.match.Match
   *
   * Represents a Mention match found in an input string which should be Autolinked.
   *
   * See this class's superclass ({@link Autolinker.match.Match}) for more details.
   */

  var MentionMatch =
  /** @class */
  function (_super) {
    __extends(MentionMatch, _super);
    /**
     * @method constructor
     * @param {Object} cfg The configuration properties for the Match
     *   instance, specified in an Object (map).
     */


    function MentionMatch(cfg) {
      var _this = _super.call(this, cfg) || this;
      /**
       * @cfg {String} serviceName
       *
       * The service to point mention matches to. See {@link Autolinker#mention}
       * for available values.
       */


      _this.serviceName = 'twitter'; // default value just to get the above doc comment in the ES5 output and documentation generator

      /**
       * @cfg {String} mention (required)
       *
       * The Mention that was matched, without the '@' character.
       */

      _this.mention = ''; // default value just to get the above doc comment in the ES5 output and documentation generator

      _this.mention = cfg.mention;
      _this.serviceName = cfg.serviceName;
      return _this;
    }
    /**
     * Returns a string name for the type of match that this class represents.
     * For the case of MentionMatch, returns 'mention'.
     *
     * @return {String}
     */


    MentionMatch.prototype.getType = function () {
      return 'mention';
    };
    /**
     * Returns the mention, without the '@' character.
     *
     * @return {String}
     */


    MentionMatch.prototype.getMention = function () {
      return this.mention;
    };
    /**
     * Returns the configured {@link #serviceName} to point the mention to.
     * Ex: 'instagram', 'twitter', 'soundcloud'.
     *
     * @return {String}
     */


    MentionMatch.prototype.getServiceName = function () {
      return this.serviceName;
    };
    /**
     * Returns the anchor href that should be generated for the match.
     *
     * @return {String}
     */


    MentionMatch.prototype.getAnchorHref = function () {
      switch (this.serviceName) {
        case 'twitter':
          return 'https://twitter.com/' + this.mention;

        case 'instagram':
          return 'https://instagram.com/' + this.mention;

        case 'soundcloud':
          return 'https://soundcloud.com/' + this.mention;

        default:
          // Shouldn't happen because Autolinker's constructor should block any invalid values, but just in case.
          throw new Error('Unknown service name to point mention to: ' + this.serviceName);
      }
    };
    /**
     * Returns the anchor text that should be generated for the match.
     *
     * @return {String}
     */


    MentionMatch.prototype.getAnchorText = function () {
      return '@' + this.mention;
    };
    /**
     * Returns the CSS class suffixes that should be used on a tag built with
     * the match. See {@link Autolinker.match.Match#getCssClassSuffixes} for
     * details.
     *
     * @return {String[]}
     */


    MentionMatch.prototype.getCssClassSuffixes = function () {
      var cssClassSuffixes = _super.prototype.getCssClassSuffixes.call(this),
          serviceName = this.getServiceName();

      if (serviceName) {
        cssClassSuffixes.push(serviceName);
      }

      return cssClassSuffixes;
    };

    return MentionMatch;
  }(Match);

  /**
   * @class Autolinker.match.Phone
   * @extends Autolinker.match.Match
   *
   * Represents a Phone number match found in an input string which should be
   * Autolinked.
   *
   * See this class's superclass ({@link Autolinker.match.Match}) for more
   * details.
   */

  var PhoneMatch =
  /** @class */
  function (_super) {
    __extends(PhoneMatch, _super);
    /**
     * @method constructor
     * @param {Object} cfg The configuration properties for the Match
     *   instance, specified in an Object (map).
     */


    function PhoneMatch(cfg) {
      var _this = _super.call(this, cfg) || this;
      /**
       * @protected
       * @property {String} number (required)
       *
       * The phone number that was matched, without any delimiter characters.
       *
       * Note: This is a string to allow for prefixed 0's.
       */


      _this.number = ''; // default value just to get the above doc comment in the ES5 output and documentation generator

      /**
       * @protected
       * @property  {Boolean} plusSign (required)
       *
       * `true` if the matched phone number started with a '+' sign. We'll include
       * it in the `tel:` URL if so, as this is needed for international numbers.
       *
       * Ex: '+1 (123) 456 7879'
       */

      _this.plusSign = false; // default value just to get the above doc comment in the ES5 output and documentation generator

      _this.number = cfg.number;
      _this.plusSign = cfg.plusSign;
      return _this;
    }
    /**
     * Returns a string name for the type of match that this class represents.
     * For the case of PhoneMatch, returns 'phone'.
     *
     * @return {String}
     */


    PhoneMatch.prototype.getType = function () {
      return 'phone';
    };
    /**
     * Returns the phone number that was matched as a string, without any
     * delimiter characters.
     *
     * Note: This is a string to allow for prefixed 0's.
     *
     * @return {String}
     */


    PhoneMatch.prototype.getPhoneNumber = function () {
      return this.number;
    };
    /**
     * Alias of {@link #getPhoneNumber}, returns the phone number that was
     * matched as a string, without any delimiter characters.
     *
     * Note: This is a string to allow for prefixed 0's.
     *
     * @return {String}
     */


    PhoneMatch.prototype.getNumber = function () {
      return this.getPhoneNumber();
    };
    /**
     * Returns the anchor href that should be generated for the match.
     *
     * @return {String}
     */


    PhoneMatch.prototype.getAnchorHref = function () {
      return 'tel:' + (this.plusSign ? '+' : '') + this.number;
    };
    /**
     * Returns the anchor text that should be generated for the match.
     *
     * @return {String}
     */


    PhoneMatch.prototype.getAnchorText = function () {
      return this.matchedText;
    };

    return PhoneMatch;
  }(Match);

  /**
   * @class Autolinker.match.Url
   * @extends Autolinker.match.Match
   *
   * Represents a Url match found in an input string which should be Autolinked.
   *
   * See this class's superclass ({@link Autolinker.match.Match}) for more details.
   */

  var UrlMatch =
  /** @class */
  function (_super) {
    __extends(UrlMatch, _super);
    /**
     * @method constructor
     * @param {Object} cfg The configuration properties for the Match
     *   instance, specified in an Object (map).
     */


    function UrlMatch(cfg) {
      var _this = _super.call(this, cfg) || this;
      /**
       * @cfg {String} url (required)
       *
       * The url that was matched.
       */


      _this.url = ''; // default value just to get the above doc comment in the ES5 output and documentation generator

      /**
       * @cfg {"scheme"/"www"/"tld"} urlMatchType (required)
       *
       * The type of URL match that this class represents. This helps to determine
       * if the match was made in the original text with a prefixed scheme (ex:
       * 'http://www.google.com'), a prefixed 'www' (ex: 'www.google.com'), or
       * was matched by a known top-level domain (ex: 'google.com').
       */

      _this.urlMatchType = 'scheme'; // default value just to get the above doc comment in the ES5 output and documentation generator

      /**
       * @cfg {Boolean} protocolUrlMatch (required)
       *
       * `true` if the URL is a match which already has a protocol (i.e.
       * 'http://'), `false` if the match was from a 'www' or known TLD match.
       */

      _this.protocolUrlMatch = false; // default value just to get the above doc comment in the ES5 output and documentation generator

      /**
       * @cfg {Boolean} protocolRelativeMatch (required)
       *
       * `true` if the URL is a protocol-relative match. A protocol-relative match
       * is a URL that starts with '//', and will be either http:// or https://
       * based on the protocol that the site is loaded under.
       */

      _this.protocolRelativeMatch = false; // default value just to get the above doc comment in the ES5 output and documentation generator

      /**
       * @cfg {Object} stripPrefix (required)
       *
       * The Object form of {@link Autolinker#cfg-stripPrefix}.
       */

      _this.stripPrefix = {
        scheme: true,
        www: true
      }; // default value just to get the above doc comment in the ES5 output and documentation generator

      /**
       * @cfg {Boolean} stripTrailingSlash (required)
       * @inheritdoc Autolinker#cfg-stripTrailingSlash
       */

      _this.stripTrailingSlash = true; // default value just to get the above doc comment in the ES5 output and documentation generator

      /**
       * @cfg {Boolean} decodePercentEncoding (required)
       * @inheritdoc Autolinker#cfg-decodePercentEncoding
       */

      _this.decodePercentEncoding = true; // default value just to get the above doc comment in the ES5 output and documentation generator

      /**
       * @private
       * @property {RegExp} schemePrefixRegex
       *
       * A regular expression used to remove the 'http://' or 'https://' from
       * URLs.
       */

      _this.schemePrefixRegex = /^(https?:\/\/)?/i;
      /**
       * @private
       * @property {RegExp} wwwPrefixRegex
       *
       * A regular expression used to remove the 'www.' from URLs.
       */

      _this.wwwPrefixRegex = /^(https?:\/\/)?(www\.)?/i;
      /**
       * @private
       * @property {RegExp} protocolRelativeRegex
       *
       * The regular expression used to remove the protocol-relative '//' from the {@link #url} string, for purposes
       * of {@link #getAnchorText}. A protocol-relative URL is, for example, "//yahoo.com"
       */

      _this.protocolRelativeRegex = /^\/\//;
      /**
       * @private
       * @property {Boolean} protocolPrepended
       *
       * Will be set to `true` if the 'http://' protocol has been prepended to the {@link #url} (because the
       * {@link #url} did not have a protocol)
       */

      _this.protocolPrepended = false;
      _this.urlMatchType = cfg.urlMatchType;
      _this.url = cfg.url;
      _this.protocolUrlMatch = cfg.protocolUrlMatch;
      _this.protocolRelativeMatch = cfg.protocolRelativeMatch;
      _this.stripPrefix = cfg.stripPrefix;
      _this.stripTrailingSlash = cfg.stripTrailingSlash;
      _this.decodePercentEncoding = cfg.decodePercentEncoding;
      return _this;
    }
    /**
     * Returns a string name for the type of match that this class represents.
     * For the case of UrlMatch, returns 'url'.
     *
     * @return {String}
     */


    UrlMatch.prototype.getType = function () {
      return 'url';
    };
    /**
     * Returns a string name for the type of URL match that this class
     * represents.
     *
     * This helps to determine if the match was made in the original text with a
     * prefixed scheme (ex: 'http://www.google.com'), a prefixed 'www' (ex:
     * 'www.google.com'), or was matched by a known top-level domain (ex:
     * 'google.com').
     *
     * @return {"scheme"/"www"/"tld"}
     */


    UrlMatch.prototype.getUrlMatchType = function () {
      return this.urlMatchType;
    };
    /**
     * Returns the url that was matched, assuming the protocol to be 'http://' if the original
     * match was missing a protocol.
     *
     * @return {String}
     */


    UrlMatch.prototype.getUrl = function () {
      var url = this.url; // if the url string doesn't begin with a protocol, assume 'http://'

      if (!this.protocolRelativeMatch && !this.protocolUrlMatch && !this.protocolPrepended) {
        url = this.url = 'http://' + url;
        this.protocolPrepended = true;
      }

      return url;
    };
    /**
     * Returns the anchor href that should be generated for the match.
     *
     * @return {String}
     */


    UrlMatch.prototype.getAnchorHref = function () {
      var url = this.getUrl();
      return url.replace(/&amp;/g, '&'); // any &amp;'s in the URL should be converted back to '&' if they were displayed as &amp; in the source html
    };
    /**
     * Returns the anchor text that should be generated for the match.
     *
     * @return {String}
     */


    UrlMatch.prototype.getAnchorText = function () {
      var anchorText = this.getMatchedText();

      if (this.protocolRelativeMatch) {
        // Strip off any protocol-relative '//' from the anchor text
        anchorText = this.stripProtocolRelativePrefix(anchorText);
      }

      if (this.stripPrefix.scheme) {
        anchorText = this.stripSchemePrefix(anchorText);
      }

      if (this.stripPrefix.www) {
        anchorText = this.stripWwwPrefix(anchorText);
      }

      if (this.stripTrailingSlash) {
        anchorText = this.removeTrailingSlash(anchorText); // remove trailing slash, if there is one
      }

      if (this.decodePercentEncoding) {
        anchorText = this.removePercentEncoding(anchorText);
      }

      return anchorText;
    }; // ---------------------------------------
    // Utility Functionality

    /**
     * Strips the scheme prefix (such as "http://" or "https://") from the given
     * `url`.
     *
     * @private
     * @param {String} url The text of the anchor that is being generated, for
     *   which to strip off the url scheme.
     * @return {String} The `url`, with the scheme stripped.
     */


    UrlMatch.prototype.stripSchemePrefix = function (url) {
      return url.replace(this.schemePrefixRegex, '');
    };
    /**
     * Strips the 'www' prefix from the given `url`.
     *
     * @private
     * @param {String} url The text of the anchor that is being generated, for
     *   which to strip off the 'www' if it exists.
     * @return {String} The `url`, with the 'www' stripped.
     */


    UrlMatch.prototype.stripWwwPrefix = function (url) {
      return url.replace(this.wwwPrefixRegex, '$1'); // leave any scheme ($1), it one exists
    };
    /**
     * Strips any protocol-relative '//' from the anchor text.
     *
     * @private
     * @param {String} text The text of the anchor that is being generated, for which to strip off the
     *   protocol-relative prefix (such as stripping off "//")
     * @return {String} The `anchorText`, with the protocol-relative prefix stripped.
     */


    UrlMatch.prototype.stripProtocolRelativePrefix = function (text) {
      return text.replace(this.protocolRelativeRegex, '');
    };
    /**
     * Removes any trailing slash from the given `anchorText`, in preparation for the text to be displayed.
     *
     * @private
     * @param {String} anchorText The text of the anchor that is being generated, for which to remove any trailing
     *   slash ('/') that may exist.
     * @return {String} The `anchorText`, with the trailing slash removed.
     */


    UrlMatch.prototype.removeTrailingSlash = function (anchorText) {
      if (anchorText.charAt(anchorText.length - 1) === '/') {
        anchorText = anchorText.slice(0, -1);
      }

      return anchorText;
    };
    /**
     * Decodes percent-encoded characters from the given `anchorText`, in
     * preparation for the text to be displayed.
     *
     * @private
     * @param {String} anchorText The text of the anchor that is being
     *   generated, for which to decode any percent-encoded characters.
     * @return {String} The `anchorText`, with the percent-encoded characters
     *   decoded.
     */


    UrlMatch.prototype.removePercentEncoding = function (anchorText) {
      // First, convert a few of the known % encodings to the corresponding
      // HTML entities that could accidentally be interpretted as special
      // HTML characters
      var preProcessedEntityAnchorText = anchorText.replace(/%22/gi, '&quot;') // " char
      .replace(/%26/gi, '&amp;') // & char
      .replace(/%27/gi, '&#39;') // ' char
      .replace(/%3C/gi, '&lt;') // < char
      .replace(/%3E/gi, '&gt;'); // > char

      try {
        // Now attempt to decode the rest of the anchor text
        return decodeURIComponent(preProcessedEntityAnchorText);
      } catch (e) {
        // Invalid % escape sequence in the anchor text
        return preProcessedEntityAnchorText;
      }
    };

    return UrlMatch;
  }(Match);

  /**
   * @abstract
   * @class Autolinker.matcher.Matcher
   *
   * An abstract class and interface for individual matchers to find matches in
   * an input string with linkified versions of them.
   *
   * Note that Matchers do not take HTML into account - they must be fed the text
   * nodes of any HTML string, which is handled by {@link Autolinker#parse}.
   */
  var Matcher =
  /** @class */
  function () {
    /**
     * @method constructor
     * @param {Object} cfg The configuration properties for the Matcher
     *   instance, specified in an Object (map).
     */
    function Matcher(cfg) {
      /**
       * @cfg {Autolinker.AnchorTagBuilder} tagBuilder (required)
       *
       * Reference to the AnchorTagBuilder instance to use to generate HTML tags
       * for {@link Autolinker.match.Match Matches}.
       */
      this.__jsduckDummyDocProp = null; // property used just to get the above doc comment into the ES5 output and documentation generator

      this.tagBuilder = cfg.tagBuilder;
    }

    return Matcher;
  }();

  /*
   * This file builds and stores a library of the common regular expressions used
   * by the Autolinker utility.
   *
   * Other regular expressions may exist ad-hoc, but these are generally the
   * regular expressions that are shared between source files.
   */

  /**
   * Regular expression to match upper and lowercase ASCII letters
   */
  var letterRe = /[A-Za-z]/;
  /**
   * Regular expression to match ASCII digits
   */

  var digitRe = /[0-9]/;
  /**
   * Regular expression to match whitespace
   */

  var whitespaceRe = /\s/;
  /**
   * Regular expression to match quote characters
   */

  var quoteRe = /['"]/;
  /**
   * Regular expression to match the range of ASCII control characters (0-31), and
   * the backspace char (127)
   */

  var controlCharsRe = /[\x00-\x1F\x7F]/;
  /**
   * The string form of a regular expression that would match all of the
   * alphabetic ("letter") chars in the unicode character set when placed in a
   * RegExp character class (`[]`). This includes all international alphabetic
   * characters.
   *
   * These would be the characters matched by unicode regex engines `\p{L}`
   * escape ("all letters").
   *
   * Taken from the XRegExp library: http://xregexp.com/ (thanks @https://github.com/slevithan)
   * Specifically: http://xregexp.com/v/3.2.0/xregexp-all.js, the 'Letter'
   *   regex's bmp
   *
   * VERY IMPORTANT: This set of characters is defined inside of a Regular
   *   Expression literal rather than a string literal to prevent UglifyJS from
   *   compressing the unicode escape sequences into their actual unicode
   *   characters. If Uglify compresses these into the unicode characters
   *   themselves, this results in the error "Range out of order in character
   *   class" when these characters are used inside of a Regular Expression
   *   character class (`[]`). See usages of this const. Alternatively, we can set
   *   the UglifyJS option `ascii_only` to true for the build, but that doesn't
   *   help others who are pulling in Autolinker into their own build and running
   *   UglifyJS themselves.
   */

  var alphaCharsStr = /A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC/.source; // see note in above variable description

  /**
   * The string form of a regular expression that would match all emoji characters
   * Based on the emoji regex defined in this article: https://thekevinscott.com/emojis-in-javascript/
   */

  var emojiStr = /\u2700-\u27bf\udde6-\uddff\ud800-\udbff\udc00-\udfff\ufe0e\ufe0f\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0\ud83c\udffb-\udfff\u200d\u3299\u3297\u303d\u3030\u24c2\ud83c\udd70-\udd71\udd7e-\udd7f\udd8e\udd91-\udd9a\udde6-\uddff\ude01-\ude02\ude1a\ude2f\ude32-\ude3a\ude50-\ude51\u203c\u2049\u25aa-\u25ab\u25b6\u25c0\u25fb-\u25fe\u00a9\u00ae\u2122\u2139\udc04\u2600-\u26FF\u2b05\u2b06\u2b07\u2b1b\u2b1c\u2b50\u2b55\u231a\u231b\u2328\u23cf\u23e9-\u23f3\u23f8-\u23fa\udccf\u2935\u2934\u2190-\u21ff/.source;
  /**
   * The string form of a regular expression that would match all of the
   * combining mark characters in the unicode character set when placed in a
   * RegExp character class (`[]`).
   *
   * These would be the characters matched by unicode regex engines `\p{M}`
   * escape ("all marks").
   *
   * Taken from the XRegExp library: http://xregexp.com/ (thanks @https://github.com/slevithan)
   * Specifically: http://xregexp.com/v/3.2.0/xregexp-all.js, the 'Mark'
   *   regex's bmp
   *
   * VERY IMPORTANT: This set of characters is defined inside of a Regular
   *   Expression literal rather than a string literal to prevent UglifyJS from
   *   compressing the unicode escape sequences into their actual unicode
   *   characters. If Uglify compresses these into the unicode characters
   *   themselves, this results in the error "Range out of order in character
   *   class" when these characters are used inside of a Regular Expression
   *   character class (`[]`). See usages of this const. Alternatively, we can set
   *   the UglifyJS option `ascii_only` to true for the build, but that doesn't
   *   help others who are pulling in Autolinker into their own build and running
   *   UglifyJS themselves.
   */

  var marksStr = /\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D4-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C00-\u0C03\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D01-\u0D03\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u192B\u1930-\u193B\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F\u1AB0-\u1ABE\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF5\u1DFB-\u1DFF\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C5\uA8E0-\uA8F1\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9E5\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F/.source; // see note in above variable description

  /**
   * The string form of a regular expression that would match all of the
   * alphabetic ("letter") chars, emoji, and combining marks in the unicode character set
   * when placed in a RegExp character class (`[]`). This includes all
   * international alphabetic characters.
   *
   * These would be the characters matched by unicode regex engines `\p{L}\p{M}`
   * escapes and emoji characters.
   */

  var alphaCharsAndMarksStr = alphaCharsStr + emojiStr + marksStr;
  /**
   * The string form of a regular expression that would match all of the
   * decimal number chars in the unicode character set when placed in a RegExp
   * character class (`[]`).
   *
   * These would be the characters matched by unicode regex engines `\p{Nd}`
   * escape ("all decimal numbers")
   *
   * Taken from the XRegExp library: http://xregexp.com/ (thanks @https://github.com/slevithan)
   * Specifically: http://xregexp.com/v/3.2.0/xregexp-all.js, the 'Decimal_Number'
   *   regex's bmp
   *
   * VERY IMPORTANT: This set of characters is defined inside of a Regular
   *   Expression literal rather than a string literal to prevent UglifyJS from
   *   compressing the unicode escape sequences into their actual unicode
   *   characters. If Uglify compresses these into the unicode characters
   *   themselves, this results in the error "Range out of order in character
   *   class" when these characters are used inside of a Regular Expression
   *   character class (`[]`). See usages of this const. Alternatively, we can set
   *   the UglifyJS option `ascii_only` to true for the build, but that doesn't
   *   help others who are pulling in Autolinker into their own build and running
   *   UglifyJS themselves.
   */

  var decimalNumbersStr = /0-9\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0BE6-\u0BEF\u0C66-\u0C6F\u0CE6-\u0CEF\u0D66-\u0D6F\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F29\u1040-\u1049\u1090-\u1099\u17E0-\u17E9\u1810-\u1819\u1946-\u194F\u19D0-\u19D9\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\uA620-\uA629\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19/.source; // see note in above variable description

  /**
   * The string form of a regular expression that would match all of the
   * letters and decimal number chars in the unicode character set when placed in
   * a RegExp character class (`[]`).
   *
   * These would be the characters matched by unicode regex engines
   * `[\p{L}\p{Nd}]` escape ("all letters and decimal numbers")
   */

  var alphaNumericCharsStr = alphaCharsAndMarksStr + decimalNumbersStr;
  /**
   * The string form of a regular expression that would match all of the
   * letters, combining marks, and decimal number chars in the unicode character
   * set when placed in a RegExp character class (`[]`).
   *
   * These would be the characters matched by unicode regex engines
   * `[\p{L}\p{M}\p{Nd}]` escape ("all letters, combining marks, and decimal
   * numbers")
   */

  var alphaNumericAndMarksCharsStr = alphaCharsAndMarksStr + decimalNumbersStr; // Simplified IP regular expression

  var ipStr = '(?:[' + decimalNumbersStr + ']{1,3}\\.){3}[' + decimalNumbersStr + ']{1,3}'; // Protected domain label which do not allow "-" character on the beginning and the end of a single label

  var domainLabelStr = '[' + alphaNumericAndMarksCharsStr + '](?:[' + alphaNumericAndMarksCharsStr + '\\-]{0,61}[' + alphaNumericAndMarksCharsStr + '])?';

  var getDomainLabelStr = function getDomainLabelStr(group) {
    return '(?=(' + domainLabelStr + '))\\' + group;
  };
  /**
   * A function to match domain names of a URL or email address.
   * Ex: 'google', 'yahoo', 'some-other-company', etc.
   */


  var getDomainNameStr = function getDomainNameStr(group) {
    return '(?:' + getDomainLabelStr(group) + '(?:\\.' + getDomainLabelStr(group + 1) + '){0,126}|' + ipStr + ')';
  };
  /**
   * A regular expression that is simply the character class of the characters
   * that may be used in a domain name, minus the '-' or '.'
   */

  var domainNameCharRegex = new RegExp("[" + alphaNumericAndMarksCharsStr + "]");

  // NOTE: THIS IS A GENERATED FILE
  // To update with the latest TLD list, run `npm run update-tld-regex` or `yarn update-tld-regex` (depending on which you have installed)
  var tldRegex = /(?:xn--vermgensberatung-pwb|xn--vermgensberater-ctb|xn--clchc0ea0b2g2a9gcd|xn--w4r85el8fhu5dnra|northwesternmutual|travelersinsurance|vermögensberatung|xn--3oq18vl8pn36a|xn--5su34j936bgsg|xn--bck1b9a5dre4c|xn--mgbai9azgqp6j|xn--mgberp4a5d4ar|xn--xkc2dl3a5ee0h|vermögensberater|xn--fzys8d69uvgm|xn--mgba7c0bbn0a|xn--xkc2al3hye2a|americanexpress|kerryproperties|sandvikcoromant|xn--i1b6b1a6a2e|xn--kcrx77d1x4a|xn--lgbbat1ad8j|xn--mgba3a4f16a|xn--mgbaakc7dvf|xn--mgbc0a9azcg|xn--nqv7fs00ema|afamilycompany|americanfamily|bananarepublic|cancerresearch|cookingchannel|kerrylogistics|weatherchannel|xn--54b7fta0cc|xn--6qq986b3xl|xn--80aqecdr1a|xn--b4w605ferd|xn--fiq228c5hs|xn--h2breg3eve|xn--jlq61u9w7b|xn--mgba3a3ejt|xn--mgbaam7a8h|xn--mgbayh7gpa|xn--mgbb9fbpob|xn--mgbbh1a71e|xn--mgbca7dzdo|xn--mgbi4ecexp|xn--mgbx4cd0ab|xn--rvc1e0am3e|international|lifeinsurance|spreadbetting|travelchannel|wolterskluwer|xn--eckvdtc9d|xn--fpcrj9c3d|xn--fzc2c9e2c|xn--h2brj9c8c|xn--tiq49xqyj|xn--yfro4i67o|xn--ygbi2ammx|construction|lplfinancial|scholarships|versicherung|xn--3e0b707e|xn--45br5cyl|xn--80adxhks|xn--80asehdb|xn--8y0a063a|xn--gckr3f0f|xn--mgb9awbf|xn--mgbab2bd|xn--mgbgu82a|xn--mgbpl2fh|xn--mgbt3dhd|xn--mk1bu44c|xn--ngbc5azd|xn--ngbe9e0a|xn--ogbpf8fl|xn--qcka1pmc|accountants|barclaycard|blackfriday|blockbuster|bridgestone|calvinklein|contractors|creditunion|engineering|enterprises|foodnetwork|investments|kerryhotels|lamborghini|motorcycles|olayangroup|photography|playstation|productions|progressive|redumbrella|rightathome|williamhill|xn--11b4c3d|xn--1ck2e1b|xn--1qqw23a|xn--2scrj9c|xn--3bst00m|xn--3ds443g|xn--3hcrj9c|xn--42c2d9a|xn--45brj9c|xn--55qw42g|xn--6frz82g|xn--80ao21a|xn--9krt00a|xn--cck2b3b|xn--czr694b|xn--d1acj3b|xn--efvy88h|xn--estv75g|xn--fct429k|xn--fjq720a|xn--flw351e|xn--g2xx48c|xn--gecrj9c|xn--gk3at1e|xn--h2brj9c|xn--hxt814e|xn--imr513n|xn--j6w193g|xn--jvr189m|xn--kprw13d|xn--kpry57d|xn--kpu716f|xn--mgbbh1a|xn--mgbtx2b|xn--mix891f|xn--nyqy26a|xn--otu796d|xn--pbt977c|xn--pgbs0dh|xn--q9jyb4c|xn--rhqv96g|xn--rovu88b|xn--s9brj9c|xn--ses554g|xn--t60b56a|xn--vuq861b|xn--w4rs40l|xn--xhq521b|xn--zfr164b|சிங்கப்பூர்|accountant|apartments|associates|basketball|bnpparibas|boehringer|capitalone|consulting|creditcard|cuisinella|eurovision|extraspace|foundation|healthcare|immobilien|industries|management|mitsubishi|nationwide|newholland|nextdirect|onyourside|properties|protection|prudential|realestate|republican|restaurant|schaeffler|swiftcover|tatamotors|technology|telefonica|university|vistaprint|vlaanderen|volkswagen|xn--30rr7y|xn--3pxu8k|xn--45q11c|xn--4gbrim|xn--55qx5d|xn--5tzm5g|xn--80aswg|xn--90a3ac|xn--9dbq2a|xn--9et52u|xn--c2br7g|xn--cg4bki|xn--czrs0t|xn--czru2d|xn--fiq64b|xn--fiqs8s|xn--fiqz9s|xn--io0a7i|xn--kput3i|xn--mxtq1m|xn--o3cw4h|xn--pssy2u|xn--unup4y|xn--wgbh1c|xn--wgbl6a|xn--y9a3aq|accenture|alfaromeo|allfinanz|amsterdam|analytics|aquarelle|barcelona|bloomberg|christmas|community|directory|education|equipment|fairwinds|financial|firestone|fresenius|frontdoor|fujixerox|furniture|goldpoint|hisamitsu|homedepot|homegoods|homesense|honeywell|institute|insurance|kuokgroup|ladbrokes|lancaster|landrover|lifestyle|marketing|marshalls|melbourne|microsoft|panasonic|passagens|pramerica|richardli|scjohnson|shangrila|solutions|statebank|statefarm|stockholm|travelers|vacations|xn--90ais|xn--c1avg|xn--d1alf|xn--e1a4c|xn--fhbei|xn--j1aef|xn--j1amh|xn--l1acc|xn--ngbrx|xn--nqv7f|xn--p1acf|xn--tckwe|xn--vhquv|yodobashi|abudhabi|airforce|allstate|attorney|barclays|barefoot|bargains|baseball|boutique|bradesco|broadway|brussels|budapest|builders|business|capetown|catering|catholic|chrysler|cipriani|cityeats|cleaning|clinique|clothing|commbank|computer|delivery|deloitte|democrat|diamonds|discount|discover|download|engineer|ericsson|esurance|etisalat|everbank|exchange|feedback|fidelity|firmdale|football|frontier|goodyear|grainger|graphics|guardian|hdfcbank|helsinki|holdings|hospital|infiniti|ipiranga|istanbul|jpmorgan|lighting|lundbeck|marriott|maserati|mckinsey|memorial|merckmsd|mortgage|movistar|observer|partners|pharmacy|pictures|plumbing|property|redstone|reliance|saarland|samsclub|security|services|shopping|showtime|softbank|software|stcgroup|supplies|symantec|training|uconnect|vanguard|ventures|verisign|woodside|xn--90ae|xn--node|xn--p1ai|xn--qxam|yokohama|السعودية|abogado|academy|agakhan|alibaba|android|athleta|auction|audible|auspost|avianca|banamex|bauhaus|bentley|bestbuy|booking|brother|bugatti|capital|caravan|careers|cartier|channel|charity|chintai|citadel|clubmed|college|cologne|comcast|company|compare|contact|cooking|corsica|country|coupons|courses|cricket|cruises|dentist|digital|domains|exposed|express|farmers|fashion|ferrari|ferrero|finance|fishing|fitness|flights|florist|flowers|forsale|frogans|fujitsu|gallery|genting|godaddy|grocery|guitars|hamburg|hangout|hitachi|holiday|hosting|hoteles|hotmail|hyundai|iselect|ismaili|jewelry|juniper|kitchen|komatsu|lacaixa|lancome|lanxess|lasalle|latrobe|leclerc|liaison|limited|lincoln|markets|metlife|monster|netbank|netflix|network|neustar|okinawa|oldnavy|organic|origins|philips|pioneer|politie|realtor|recipes|rentals|reviews|rexroth|samsung|sandvik|schmidt|schwarz|science|shiksha|shriram|singles|staples|starhub|storage|support|surgery|systems|temasek|theater|theatre|tickets|tiffany|toshiba|trading|walmart|wanggou|watches|weather|website|wedding|whoswho|windows|winners|xfinity|yamaxun|youtube|zuerich|католик|اتصالات|الجزائر|العليان|پاکستان|كاثوليك|موبايلي|இந்தியா|abarth|abbott|abbvie|active|africa|agency|airbus|airtel|alipay|alsace|alstom|anquan|aramco|author|bayern|beauty|berlin|bharti|blanco|bostik|boston|broker|camera|career|caseih|casino|center|chanel|chrome|church|circle|claims|clinic|coffee|comsec|condos|coupon|credit|cruise|dating|datsun|dealer|degree|dental|design|direct|doctor|dunlop|dupont|durban|emerck|energy|estate|events|expert|family|flickr|futbol|gallup|garden|george|giving|global|google|gratis|health|hermes|hiphop|hockey|hotels|hughes|imamat|insure|intuit|jaguar|joburg|juegos|kaufen|kinder|kindle|kosher|lancia|latino|lawyer|lefrak|living|locker|london|luxury|madrid|maison|makeup|market|mattel|mobile|mobily|monash|mormon|moscow|museum|mutual|nagoya|natura|nissan|nissay|norton|nowruz|office|olayan|online|oracle|orange|otsuka|pfizer|photos|physio|piaget|pictet|quebec|racing|realty|reisen|repair|report|review|rocher|rogers|ryukyu|safety|sakura|sanofi|school|schule|search|secure|select|shouji|soccer|social|stream|studio|supply|suzuki|swatch|sydney|taipei|taobao|target|tattoo|tennis|tienda|tjmaxx|tkmaxx|toyota|travel|unicom|viajes|viking|villas|virgin|vision|voting|voyage|vuelos|walter|warman|webcam|xihuan|yachts|yandex|zappos|москва|онлайн|ابوظبي|ارامكو|الاردن|المغرب|امارات|فلسطين|مليسيا|भारतम्|இலங்கை|ファッション|actor|adult|aetna|amfam|amica|apple|archi|audio|autos|azure|baidu|beats|bible|bingo|black|boats|bosch|build|canon|cards|chase|cheap|cisco|citic|click|cloud|coach|codes|crown|cymru|dabur|dance|deals|delta|dodge|drive|dubai|earth|edeka|email|epost|epson|faith|fedex|final|forex|forum|gallo|games|gifts|gives|glade|glass|globo|gmail|green|gripe|group|gucci|guide|homes|honda|horse|house|hyatt|ikano|intel|irish|iveco|jetzt|koeln|kyoto|lamer|lease|legal|lexus|lilly|linde|lipsy|lixil|loans|locus|lotte|lotto|lupin|macys|mango|media|miami|money|mopar|movie|nadex|nexus|nikon|ninja|nokia|nowtv|omega|osaka|paris|parts|party|phone|photo|pizza|place|poker|praxi|press|prime|promo|quest|radio|rehab|reise|ricoh|rocks|rodeo|rugby|salon|sener|seven|sharp|shell|shoes|skype|sling|smart|smile|solar|space|sport|stada|store|study|style|sucks|swiss|tatar|tires|tirol|tmall|today|tokyo|tools|toray|total|tours|trade|trust|tunes|tushu|ubank|vegas|video|vodka|volvo|wales|watch|weber|weibo|works|world|xerox|yahoo|zippo|ایران|بازار|بھارت|سودان|سورية|همراه|भारोत|संगठन|বাংলা|భారత్|ഭാരതം|嘉里大酒店|aarp|able|adac|aero|aigo|akdn|ally|amex|arab|army|arpa|arte|asda|asia|audi|auto|baby|band|bank|bbva|beer|best|bike|bing|blog|blue|bofa|bond|book|buzz|cafe|call|camp|care|cars|casa|case|cash|cbre|cern|chat|citi|city|club|cool|coop|cyou|data|date|dclk|deal|dell|desi|diet|dish|docs|doha|duck|duns|dvag|erni|fage|fail|fans|farm|fast|fiat|fido|film|fire|fish|flir|food|ford|free|fund|game|gbiz|gent|ggee|gift|gmbh|gold|golf|goog|guge|guru|hair|haus|hdfc|help|here|hgtv|host|hsbc|icbc|ieee|imdb|immo|info|itau|java|jeep|jobs|jprs|kddi|kiwi|kpmg|kred|land|lego|lgbt|lidl|life|like|limo|link|live|loan|loft|love|ltda|luxe|maif|meet|meme|menu|mini|mint|mobi|moda|moto|name|navy|news|next|nico|nike|ollo|open|page|pars|pccw|pics|ping|pink|play|plus|pohl|porn|post|prod|prof|qpon|raid|read|reit|rent|rest|rich|rmit|room|rsvp|ruhr|safe|sale|sarl|save|saxo|scor|scot|seat|seek|sexy|shaw|shia|shop|show|silk|sina|site|skin|sncf|sohu|song|sony|spot|star|surf|talk|taxi|team|tech|teva|tiaa|tips|town|toys|tube|vana|visa|viva|vivo|vote|voto|wang|weir|wien|wiki|wine|work|xbox|yoga|zara|zero|zone|дети|сайт|بارت|بيتك|ڀارت|تونس|شبكة|عراق|عمان|موقع|भारत|ভারত|ভাৰত|ਭਾਰਤ|ભારત|ଭାରତ|ಭಾರತ|ලංකා|グーグル|クラウド|ポイント|大众汽车|组织机构|電訊盈科|香格里拉|aaa|abb|abc|aco|ads|aeg|afl|aig|anz|aol|app|art|aws|axa|bar|bbc|bbt|bcg|bcn|bet|bid|bio|biz|bms|bmw|bnl|bom|boo|bot|box|buy|bzh|cab|cal|cam|car|cat|cba|cbn|cbs|ceb|ceo|cfa|cfd|com|crs|csc|dad|day|dds|dev|dhl|diy|dnp|dog|dot|dtv|dvr|eat|eco|edu|esq|eus|fan|fit|fly|foo|fox|frl|ftr|fun|fyi|gal|gap|gdn|gea|gle|gmo|gmx|goo|gop|got|gov|hbo|hiv|hkt|hot|how|ibm|ice|icu|ifm|inc|ing|ink|int|ist|itv|jcb|jcp|jio|jll|jmp|jnj|jot|joy|kfh|kia|kim|kpn|krd|lat|law|lds|llc|lol|lpl|ltd|man|map|mba|med|men|mil|mit|mlb|mls|mma|moe|moi|mom|mov|msd|mtn|mtr|nab|nba|nec|net|new|nfl|ngo|nhk|now|nra|nrw|ntt|nyc|obi|off|one|ong|onl|ooo|org|ott|ovh|pay|pet|phd|pid|pin|pnc|pro|pru|pub|pwc|qvc|red|ren|ril|rio|rip|run|rwe|sap|sas|sbi|sbs|sca|scb|ses|sew|sex|sfr|ski|sky|soy|srl|srt|stc|tab|tax|tci|tdk|tel|thd|tjx|top|trv|tui|tvs|ubs|uno|uol|ups|vet|vig|vin|vip|wed|win|wme|wow|wtc|wtf|xin|xxx|xyz|you|yun|zip|бел|ком|қаз|мкд|мон|орг|рус|срб|укр|հայ|קום|عرب|قطر|كوم|مصر|कॉम|नेट|คอม|ไทย|ストア|セール|みんな|中文网|天主教|我爱你|新加坡|淡马锡|诺基亚|飞利浦|ac|ad|ae|af|ag|ai|al|am|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cw|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|za|zm|zw|ελ|бг|ею|рф|გე|닷넷|닷컴|삼성|한국|コム|世界|中信|中国|中國|企业|佛山|信息|健康|八卦|公司|公益|台湾|台灣|商城|商店|商标|嘉里|在线|大拿|娱乐|家電|工行|广东|微博|慈善|手机|手表|招聘|政务|政府|新闻|时尚|書籍|机构|游戏|澳門|点看|珠宝|移动|网址|网店|网站|网络|联通|谷歌|购物|通販|集团|食品|餐厅|香港)/;

  // import CliTable from 'cli-table';

  /**
   * @class Autolinker.matcher.Email
   * @extends Autolinker.matcher.Matcher
   *
   * Matcher to find email matches in an input string.
   *
   * See this class's superclass ({@link Autolinker.matcher.Matcher}) for more details.
   */

  var EmailMatcher =
  /** @class */
  function (_super) {
    __extends(EmailMatcher, _super);

    function EmailMatcher() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      /**
       * Valid characters that can be used in the "local" part of an email address,
       * i.e. the "name" part of "name@site.com"
       */


      _this.localPartCharRegex = new RegExp("[" + alphaNumericAndMarksCharsStr + "!#$%&'*+/=?^_`{|}~-]");
      /**
       * Stricter TLD regex which adds a beginning and end check to ensure
       * the string is a valid TLD
       */

      _this.strictTldRegex = new RegExp("^" + tldRegex.source + "$");
      return _this;
    }
    /**
     * @inheritdoc
     */


    EmailMatcher.prototype.parseMatches = function (text) {
      var tagBuilder = this.tagBuilder,
          localPartCharRegex = this.localPartCharRegex,
          strictTldRegex = this.strictTldRegex,
          matches = [],
          len = text.length,
          noCurrentEmailMatch = new CurrentEmailMatch(); // for matching a 'mailto:' prefix

      var mailtoTransitions = {
        'm': 'a',
        'a': 'i',
        'i': 'l',
        'l': 't',
        't': 'o',
        'o': ':'
      };
      var charIdx = 0,
          state = 0
      /* NonEmailMatch */
      ,
          currentEmailMatch = noCurrentEmailMatch; // For debugging: search for other "For debugging" lines
      // const table = new CliTable( {
      // 	head: [ 'charIdx', 'char', 'state', 'charIdx', 'currentEmailAddress.idx', 'hasDomainDot' ]
      // } );

      while (charIdx < len) {
        var char = text.charAt(charIdx); // For debugging: search for other "For debugging" lines
        // table.push( 
        // 	[ charIdx, char, State[ state ], charIdx, currentEmailAddress.idx, currentEmailAddress.hasDomainDot ] 
        // );

        switch (state) {
          case 0
          /* NonEmailMatch */
          :
            stateNonEmailAddress(char);
            break;

          case 1
          /* Mailto */
          :
            stateMailTo(text.charAt(charIdx - 1), char);
            break;

          case 2
          /* LocalPart */
          :
            stateLocalPart(char);
            break;

          case 3
          /* LocalPartDot */
          :
            stateLocalPartDot(char);
            break;

          case 4
          /* AtSign */
          :
            stateAtSign(char);
            break;

          case 5
          /* DomainChar */
          :
            stateDomainChar(char);
            break;

          case 6
          /* DomainHyphen */
          :
            stateDomainHyphen(char);
            break;

          case 7
          /* DomainDot */
          :
            stateDomainDot(char);
            break;

          default:
            throwUnhandledCaseError(state);
        } // For debugging: search for other "For debugging" lines
        // table.push( 
        // 	[ charIdx, char, State[ state ], charIdx, currentEmailAddress.idx, currentEmailAddress.hasDomainDot ] 
        // );


        charIdx++;
      } // Capture any valid match at the end of the string


      captureMatchIfValidAndReset(); // For debugging: search for other "For debugging" lines
      //console.log( '\n' + table.toString() );

      return matches; // Handles the state when we're not in an email address

      function stateNonEmailAddress(char) {
        if (char === 'm') {
          beginEmailMatch(1
          /* Mailto */
          );
        } else if (localPartCharRegex.test(char)) {
          beginEmailMatch();
        }
      } // Handles if we're reading a 'mailto:' prefix on the string


      function stateMailTo(prevChar, char) {
        if (prevChar === ':') {
          // We've reached the end of the 'mailto:' prefix
          if (localPartCharRegex.test(char)) {
            state = 2
            /* LocalPart */
            ;
            currentEmailMatch = new CurrentEmailMatch(_assign({}, currentEmailMatch, {
              hasMailtoPrefix: true
            }));
          } else {
            // we've matched 'mailto:' but didn't get anything meaningful
            // immediately afterwards (for example, we encountered a 
            // space character, or an '@' character which formed 'mailto:@'
            resetToNonEmailMatchState();
          }
        } else if (mailtoTransitions[prevChar] === char) ; else if (localPartCharRegex.test(char)) {
          // We we're reading a prefix of 'mailto:', but encountered a
          // different character that didn't continue the prefix
          state = 2
          /* LocalPart */
          ;
        } else if (char === '.') {
          // We we're reading a prefix of 'mailto:', but encountered a
          // dot character
          state = 3
          /* LocalPartDot */
          ;
        } else if (char === '@') {
          // We we're reading a prefix of 'mailto:', but encountered a
          // an @ character
          state = 4
          /* AtSign */
          ;
        } else {
          // not an email address character, return to "NonEmailAddress" state
          resetToNonEmailMatchState();
        }
      } // Handles the state when we're currently in the "local part" of an 
      // email address (as opposed to the "domain part")


      function stateLocalPart(char) {
        if (char === '.') {
          state = 3
          /* LocalPartDot */
          ;
        } else if (char === '@') {
          state = 4
          /* AtSign */
          ;
        } else if (localPartCharRegex.test(char)) ; else {
          // not an email address character, return to "NonEmailAddress" state
          resetToNonEmailMatchState();
        }
      } // Handles the state where we've read 


      function stateLocalPartDot(char) {
        if (char === '.') {
          // We read a second '.' in a row, not a valid email address 
          // local part
          resetToNonEmailMatchState();
        } else if (char === '@') {
          // We read the '@' character immediately after a dot ('.'), not 
          // an email address
          resetToNonEmailMatchState();
        } else if (localPartCharRegex.test(char)) {
          state = 2
          /* LocalPart */
          ;
        } else {
          // Anything else, not an email address
          resetToNonEmailMatchState();
        }
      }

      function stateAtSign(char) {
        if (domainNameCharRegex.test(char)) {
          state = 5
          /* DomainChar */
          ;
        } else {
          // Anything else, not an email address
          resetToNonEmailMatchState();
        }
      }

      function stateDomainChar(char) {
        if (char === '.') {
          state = 7
          /* DomainDot */
          ;
        } else if (char === '-') {
          state = 6
          /* DomainHyphen */
          ;
        } else if (domainNameCharRegex.test(char)) ; else {
          // Anything else, we potentially matched if the criteria has
          // been met
          captureMatchIfValidAndReset();
        }
      }

      function stateDomainHyphen(char) {
        if (char === '-' || char === '.') {
          // Not valid to have two hyphens ("--") or hypen+dot ("-.")
          captureMatchIfValidAndReset();
        } else if (domainNameCharRegex.test(char)) {
          state = 5
          /* DomainChar */
          ;
        } else {
          // Anything else
          captureMatchIfValidAndReset();
        }
      }

      function stateDomainDot(char) {
        if (char === '.' || char === '-') {
          // not valid to have two dots ("..") or dot+hypen (".-")
          captureMatchIfValidAndReset();
        } else if (domainNameCharRegex.test(char)) {
          state = 5
          /* DomainChar */
          ; // After having read a '.' and then a valid domain character,
          // we now know that the domain part of the email is valid, and
          // we have found at least a partial EmailMatch (however, the
          // email address may have additional characters from this point)

          currentEmailMatch = new CurrentEmailMatch(_assign({}, currentEmailMatch, {
            hasDomainDot: true
          }));
        } else {
          // Anything else
          captureMatchIfValidAndReset();
        }
      }

      function beginEmailMatch(newState) {
        if (newState === void 0) {
          newState = 2
          /* LocalPart */
          ;
        }

        state = newState;
        currentEmailMatch = new CurrentEmailMatch({
          idx: charIdx
        });
      }

      function resetToNonEmailMatchState() {
        state = 0
        /* NonEmailMatch */
        ;
        currentEmailMatch = noCurrentEmailMatch;
      }
      /*
       * Captures the current email address as an EmailMatch if it's valid,
       * and resets the state to read another email address.
       */


      function captureMatchIfValidAndReset() {
        if (currentEmailMatch.hasDomainDot) {
          // we need at least one dot in the domain to be considered a valid email address
          var matchedText = text.slice(currentEmailMatch.idx, charIdx); // If we read a '.' or '-' char that ended the email address
          // (valid domain name characters, but only valid email address
          // characters if they are followed by something else), strip 
          // it off now

          if (/[-.]$/.test(matchedText)) {
            matchedText = matchedText.slice(0, -1);
          }

          var emailAddress = currentEmailMatch.hasMailtoPrefix ? matchedText.slice('mailto:'.length) : matchedText; // if the email address has a valid TLD, add it to the list of matches

          if (doesEmailHaveValidTld(emailAddress)) {
            matches.push(new EmailMatch({
              tagBuilder: tagBuilder,
              matchedText: matchedText,
              offset: currentEmailMatch.idx,
              email: emailAddress
            }));
          }
        }

        resetToNonEmailMatchState();
        /**
         * Determines if the given email address has a valid TLD or not
         * @param {string} emailAddress - email address
         * @return {Boolean} - true is email have valid TLD, false otherwise
         */

        function doesEmailHaveValidTld(emailAddress) {
          var emailAddressTld = emailAddress.split('.').pop() || '';
          var emailAddressNormalized = emailAddressTld.toLowerCase();
          var isValidTld = strictTldRegex.test(emailAddressNormalized);
          return isValidTld;
        }
      }
    };

    return EmailMatcher;
  }(Matcher);

  var CurrentEmailMatch =
  /** @class */
  function () {
    function CurrentEmailMatch(cfg) {
      if (cfg === void 0) {
        cfg = {};
      }

      this.idx = cfg.idx !== undefined ? cfg.idx : -1;
      this.hasMailtoPrefix = !!cfg.hasMailtoPrefix;
      this.hasDomainDot = !!cfg.hasDomainDot;
    }

    return CurrentEmailMatch;
  }();

  /**
   * @private
   * @class Autolinker.matcher.UrlMatchValidator
   * @singleton
   *
   * Used by Autolinker to filter out false URL positives from the
   * {@link Autolinker.matcher.Url UrlMatcher}.
   *
   * Due to the limitations of regular expressions (including the missing feature
   * of look-behinds in JS regular expressions), we cannot always determine the
   * validity of a given match. This class applies a bit of additional logic to
   * filter out any false positives that have been matched by the
   * {@link Autolinker.matcher.Url UrlMatcher}.
   */

  var UrlMatchValidator =
  /** @class */
  function () {
    function UrlMatchValidator() {}
    /**
     * Determines if a given URL match found by the {@link Autolinker.matcher.Url UrlMatcher}
     * is valid. Will return `false` for:
     *
     * 1) URL matches which do not have at least have one period ('.') in the
     *    domain name (effectively skipping over matches like "abc:def").
     *    However, URL matches with a protocol will be allowed (ex: 'http://localhost')
     * 2) URL matches which do not have at least one word character in the
     *    domain name (effectively skipping over matches like "git:1.0").
     * 3) A protocol-relative url match (a URL beginning with '//') whose
     *    previous character is a word character (effectively skipping over
     *    strings like "abc//google.com")
     *
     * Otherwise, returns `true`.
     *
     * @param {String} urlMatch The matched URL, if there was one. Will be an
     *   empty string if the match is not a URL match.
     * @param {String} protocolUrlMatch The match URL string for a protocol
     *   match. Ex: 'http://yahoo.com'. This is used to match something like
     *   'http://localhost', where we won't double check that the domain name
     *   has at least one '.' in it.
     * @return {Boolean} `true` if the match given is valid and should be
     *   processed, or `false` if the match is invalid and/or should just not be
     *   processed.
     */


    UrlMatchValidator.isValid = function (urlMatch, protocolUrlMatch) {
      if (protocolUrlMatch && !this.isValidUriScheme(protocolUrlMatch) || this.urlMatchDoesNotHaveProtocolOrDot(urlMatch, protocolUrlMatch) || // At least one period ('.') must exist in the URL match for us to consider it an actual URL, *unless* it was a full protocol match (like 'http://localhost')
      this.urlMatchDoesNotHaveAtLeastOneWordChar(urlMatch, protocolUrlMatch) && // At least one letter character must exist in the domain name after a protocol match. Ex: skip over something like "git:1.0"
      !this.isValidIpAddress(urlMatch) || // Except if it's an IP address
      this.containsMultipleDots(urlMatch)) {
        return false;
      }

      return true;
    };

    UrlMatchValidator.isValidIpAddress = function (uriSchemeMatch) {
      var newRegex = new RegExp(this.hasFullProtocolRegex.source + this.ipRegex.source);
      var uriScheme = uriSchemeMatch.match(newRegex);
      return uriScheme !== null;
    };

    UrlMatchValidator.containsMultipleDots = function (urlMatch) {
      var stringBeforeSlash = urlMatch;

      if (this.hasFullProtocolRegex.test(urlMatch)) {
        stringBeforeSlash = urlMatch.split('://')[1];
      }

      return stringBeforeSlash.split('/')[0].indexOf("..") > -1;
    };
    /**
     * Determines if the URI scheme is a valid scheme to be autolinked. Returns
     * `false` if the scheme is 'javascript:' or 'vbscript:'
     *
     * @private
     * @param {String} uriSchemeMatch The match URL string for a full URI scheme
     *   match. Ex: 'http://yahoo.com' or 'mailto:a@a.com'.
     * @return {Boolean} `true` if the scheme is a valid one, `false` otherwise.
     */


    UrlMatchValidator.isValidUriScheme = function (uriSchemeMatch) {
      var uriSchemeMatchArr = uriSchemeMatch.match(this.uriSchemeRegex),
          uriScheme = uriSchemeMatchArr && uriSchemeMatchArr[0].toLowerCase();
      return uriScheme !== 'javascript:' && uriScheme !== 'vbscript:';
    };
    /**
     * Determines if a URL match does not have either:
     *
     * a) a full protocol (i.e. 'http://'), or
     * b) at least one dot ('.') in the domain name (for a non-full-protocol
     *    match).
     *
     * Either situation is considered an invalid URL (ex: 'git:d' does not have
     * either the '://' part, or at least one dot in the domain name. If the
     * match was 'git:abc.com', we would consider this valid.)
     *
     * @private
     * @param {String} urlMatch The matched URL, if there was one. Will be an
     *   empty string if the match is not a URL match.
     * @param {String} protocolUrlMatch The match URL string for a protocol
     *   match. Ex: 'http://yahoo.com'. This is used to match something like
     *   'http://localhost', where we won't double check that the domain name
     *   has at least one '.' in it.
     * @return {Boolean} `true` if the URL match does not have a full protocol,
     *   or at least one dot ('.') in a non-full-protocol match.
     */


    UrlMatchValidator.urlMatchDoesNotHaveProtocolOrDot = function (urlMatch, protocolUrlMatch) {
      return !!urlMatch && (!protocolUrlMatch || !this.hasFullProtocolRegex.test(protocolUrlMatch)) && urlMatch.indexOf('.') === -1;
    };
    /**
     * Determines if a URL match does not have at least one word character after
     * the protocol (i.e. in the domain name).
     *
     * At least one letter character must exist in the domain name after a
     * protocol match. Ex: skip over something like "git:1.0"
     *
     * @private
     * @param {String} urlMatch The matched URL, if there was one. Will be an
     *   empty string if the match is not a URL match.
     * @param {String} protocolUrlMatch The match URL string for a protocol
     *   match. Ex: 'http://yahoo.com'. This is used to know whether or not we
     *   have a protocol in the URL string, in order to check for a word
     *   character after the protocol separator (':').
     * @return {Boolean} `true` if the URL match does not have at least one word
     *   character in it after the protocol, `false` otherwise.
     */


    UrlMatchValidator.urlMatchDoesNotHaveAtLeastOneWordChar = function (urlMatch, protocolUrlMatch) {
      if (urlMatch && protocolUrlMatch) {
        return !this.hasWordCharAfterProtocolRegex.test(urlMatch);
      } else {
        return false;
      }
    };
    /**
     * Regex to test for a full protocol, with the two trailing slashes. Ex: 'http://'
     *
     * @private
     * @property {RegExp} hasFullProtocolRegex
     */


    UrlMatchValidator.hasFullProtocolRegex = /^[A-Za-z][-.+A-Za-z0-9]*:\/\//;
    /**
     * Regex to find the URI scheme, such as 'mailto:'.
     *
     * This is used to filter out 'javascript:' and 'vbscript:' schemes.
     *
     * @private
     * @property {RegExp} uriSchemeRegex
     */

    UrlMatchValidator.uriSchemeRegex = /^[A-Za-z][-.+A-Za-z0-9]*:/;
    /**
     * Regex to determine if at least one word char exists after the protocol (i.e. after the ':')
     *
     * @private
     * @property {RegExp} hasWordCharAfterProtocolRegex
     */

    UrlMatchValidator.hasWordCharAfterProtocolRegex = new RegExp(":[^\\s]*?[" + alphaCharsStr + "]");
    /**
     * Regex to determine if the string is a valid IP address
     *
     * @private
     * @property {RegExp} ipRegex
     */

    UrlMatchValidator.ipRegex = /[0-9][0-9]?[0-9]?\.[0-9][0-9]?[0-9]?\.[0-9][0-9]?[0-9]?\.[0-9][0-9]?[0-9]?(:[0-9]*)?\/?$/;
    return UrlMatchValidator;
  }();

  /**
   * @class Autolinker.matcher.Url
   * @extends Autolinker.matcher.Matcher
   *
   * Matcher to find URL matches in an input string.
   *
   * See this class's superclass ({@link Autolinker.matcher.Matcher}) for more details.
   */

  var UrlMatcher =
  /** @class */
  function (_super) {
    __extends(UrlMatcher, _super);
    /**
     * @method constructor
     * @param {Object} cfg The configuration properties for the Match instance,
     *   specified in an Object (map).
     */


    function UrlMatcher(cfg) {
      var _this = _super.call(this, cfg) || this;
      /**
       * @cfg {Object} stripPrefix (required)
       *
       * The Object form of {@link Autolinker#cfg-stripPrefix}.
       */


      _this.stripPrefix = {
        scheme: true,
        www: true
      }; // default value just to get the above doc comment in the ES5 output and documentation generator

      /**
       * @cfg {Boolean} stripTrailingSlash (required)
       * @inheritdoc Autolinker#stripTrailingSlash
       */

      _this.stripTrailingSlash = true; // default value just to get the above doc comment in the ES5 output and documentation generator

      /**
       * @cfg {Boolean} decodePercentEncoding (required)
       * @inheritdoc Autolinker#decodePercentEncoding
       */

      _this.decodePercentEncoding = true; // default value just to get the above doc comment in the ES5 output and documentation generator

      /**
       * @protected
       * @property {RegExp} matcherRegex
       *
       * The regular expression to match URLs with an optional scheme, port
       * number, path, query string, and hash anchor.
       *
       * Example matches:
       *
       *     http://google.com
       *     www.google.com
       *     google.com/path/to/file?q1=1&q2=2#myAnchor
       *
       *
       * This regular expression will have the following capturing groups:
       *
       * 1.  Group that matches a scheme-prefixed URL (i.e. 'http://google.com').
       *     This is used to match scheme URLs with just a single word, such as
       *     'http://localhost', where we won't double check that the domain name
       *     has at least one dot ('.') in it.
       * 2.  Group that matches a 'www.' prefixed URL. This is only matched if the
       *     'www.' text was not prefixed by a scheme (i.e.: not prefixed by
       *     'http://', 'ftp:', etc.)
       * 3.  A protocol-relative ('//') match for the case of a 'www.' prefixed
       *     URL. Will be an empty string if it is not a protocol-relative match.
       *     We need to know the character before the '//' in order to determine
       *     if it is a valid match or the // was in a string we don't want to
       *     auto-link.
       * 4.  Group that matches a known TLD (top level domain), when a scheme
       *     or 'www.'-prefixed domain is not matched.
       * 5.  A protocol-relative ('//') match for the case of a known TLD prefixed
       *     URL. Will be an empty string if it is not a protocol-relative match.
       *     See #3 for more info.
       */

      _this.matcherRegex = function () {
        var schemeRegex = /(?:[A-Za-z][-.+A-Za-z0-9]{0,63}:(?![A-Za-z][-.+A-Za-z0-9]{0,63}:\/\/)(?!\d+\/?)(?:\/\/)?)/,
            // match protocol, allow in format "http://" or "mailto:". However, do not match the first part of something like 'link:http://www.google.com' (i.e. don't match "link:"). Also, make sure we don't interpret 'google.com:8000' as if 'google.com' was a protocol here (i.e. ignore a trailing port number in this regex)
        wwwRegex = /(?:www\.)/,
            // starting with 'www.'
        // Allow optional path, query string, and hash anchor, not ending in the following characters: "?!:,.;"
        // http://blog.codinghorror.com/the-problem-with-urls/
        urlSuffixRegex = new RegExp('[/?#](?:[' + alphaNumericAndMarksCharsStr + "\\-+&@#/%=~_()|'$*\\[\\]{}?!:,.;^\u2713]*[" + alphaNumericAndMarksCharsStr + "\\-+&@#/%=~_()|'$*\\[\\]{}\u2713])?");
        return new RegExp(['(?:', '(', schemeRegex.source, getDomainNameStr(2), ')', '|', '(', '(//)?', wwwRegex.source, getDomainNameStr(6), ')', '|', '(', '(//)?', getDomainNameStr(10) + '\\.', tldRegex.source, '(?![-' + alphaNumericCharsStr + '])', ')', ')', '(?::[0-9]+)?', '(?:' + urlSuffixRegex.source + ')?' // match for path, query string, and/or hash anchor - optional
        ].join(""), 'gi');
      }();
      /**
       * A regular expression to use to check the character before a protocol-relative
       * URL match. We don't want to match a protocol-relative URL if it is part
       * of another word.
       *
       * For example, we want to match something like "Go to: //google.com",
       * but we don't want to match something like "abc//google.com"
       *
       * This regular expression is used to test the character before the '//'.
       *
       * @protected
       * @type {RegExp} wordCharRegExp
       */


      _this.wordCharRegExp = new RegExp('[' + alphaNumericAndMarksCharsStr + ']');
      _this.stripPrefix = cfg.stripPrefix;
      _this.stripTrailingSlash = cfg.stripTrailingSlash;
      _this.decodePercentEncoding = cfg.decodePercentEncoding;
      return _this;
    }
    /**
     * @inheritdoc
     */


    UrlMatcher.prototype.parseMatches = function (text) {
      var matcherRegex = this.matcherRegex,
          stripPrefix = this.stripPrefix,
          stripTrailingSlash = this.stripTrailingSlash,
          decodePercentEncoding = this.decodePercentEncoding,
          tagBuilder = this.tagBuilder,
          matches = [],
          match;

      var _loop_1 = function _loop_1() {
        var matchStr = match[0],
            schemeUrlMatch = match[1],
            wwwUrlMatch = match[4],
            wwwProtocolRelativeMatch = match[5],
            //tldUrlMatch = match[ 8 ],  -- not needed at the moment
        tldProtocolRelativeMatch = match[9],
            offset = match.index,
            protocolRelativeMatch = wwwProtocolRelativeMatch || tldProtocolRelativeMatch,
            prevChar = text.charAt(offset - 1);

        if (!UrlMatchValidator.isValid(matchStr, schemeUrlMatch)) {
          return "continue";
        } // If the match is preceded by an '@' character, then it is either
        // an email address or a username. Skip these types of matches.


        if (offset > 0 && prevChar === '@') {
          return "continue";
        } // If it's a protocol-relative '//' match, but the character before the '//'
        // was a word character (i.e. a letter/number), then we found the '//' in the
        // middle of another word (such as "asdf//asdf.com"). In this case, skip the
        // match.


        if (offset > 0 && protocolRelativeMatch && this_1.wordCharRegExp.test(prevChar)) {
          return "continue";
        } // If the URL ends with a question mark, don't include the question
        // mark as part of the URL. We'll assume the question mark was the
        // end of a sentence, such as: "Going to google.com?"


        if (/\?$/.test(matchStr)) {
          matchStr = matchStr.substr(0, matchStr.length - 1);
        } // Handle a closing parenthesis or square bracket at the end of the 
        // match, and exclude it if there is not a matching open parenthesis 
        // or square bracket in the match itself.


        if (this_1.matchHasUnbalancedClosingParen(matchStr)) {
          matchStr = matchStr.substr(0, matchStr.length - 1); // remove the trailing ")"
        } else {
          // Handle an invalid character after the TLD
          var pos = this_1.matchHasInvalidCharAfterTld(matchStr, schemeUrlMatch);

          if (pos > -1) {
            matchStr = matchStr.substr(0, pos); // remove the trailing invalid chars
          }
        } // The autolinker accepts many characters in a url's scheme (like `fake://test.com`).
        // However, in cases where a URL is missing whitespace before an obvious link,
        // (for example: `nowhitespacehttp://www.test.com`), we only want the match to start
        // at the http:// part. We will check if the match contains a common scheme and then 
        // shift the match to start from there. 		


        var foundCommonScheme = ['http://', 'https://'].find(function (commonScheme) {
          return !!schemeUrlMatch && schemeUrlMatch.indexOf(commonScheme) !== -1;
        });

        if (foundCommonScheme) {
          // If we found an overmatched URL, we want to find the index
          // of where the match should start and shift the match to
          // start from the beginning of the common scheme
          var indexOfSchemeStart = matchStr.indexOf(foundCommonScheme);
          matchStr = matchStr.substr(indexOfSchemeStart);
          schemeUrlMatch = schemeUrlMatch.substr(indexOfSchemeStart);
          offset = offset + indexOfSchemeStart;
        }

        var urlMatchType = schemeUrlMatch ? 'scheme' : wwwUrlMatch ? 'www' : 'tld',
            protocolUrlMatch = !!schemeUrlMatch;
        matches.push(new UrlMatch({
          tagBuilder: tagBuilder,
          matchedText: matchStr,
          offset: offset,
          urlMatchType: urlMatchType,
          url: matchStr,
          protocolUrlMatch: protocolUrlMatch,
          protocolRelativeMatch: !!protocolRelativeMatch,
          stripPrefix: stripPrefix,
          stripTrailingSlash: stripTrailingSlash,
          decodePercentEncoding: decodePercentEncoding
        }));
      };

      var this_1 = this;

      while ((match = matcherRegex.exec(text)) !== null) {
        _loop_1();
      }

      return matches;
    };
    /**
     * Determines if a match found has an unmatched closing parenthesis,
     * square bracket or curly bracket. If so, the symbol will be removed
     * from the match itself, and appended after the generated anchor tag.
     *
     * A match may have an extra closing parenthesis at the end of the match
     * because the regular expression must include parenthesis for URLs such as
     * "wikipedia.com/something_(disambiguation)", which should be auto-linked.
     *
     * However, an extra parenthesis *will* be included when the URL itself is
     * wrapped in parenthesis, such as in the case of:
     *     "(wikipedia.com/something_(disambiguation))"
     * In this case, the last closing parenthesis should *not* be part of the
     * URL itself, and this method will return `true`.
     *
     * For square brackets in URLs such as in PHP arrays, the same behavior as
     * parenthesis discussed above should happen:
     *     "[http://www.example.com/foo.php?bar[]=1&bar[]=2&bar[]=3]"
     * The closing square bracket should not be part of the URL itself, and this
     * method will return `true`.
     *
     * @protected
     * @param {String} matchStr The full match string from the {@link #matcherRegex}.
     * @return {Boolean} `true` if there is an unbalanced closing parenthesis or
     *   square bracket at the end of the `matchStr`, `false` otherwise.
     */


    UrlMatcher.prototype.matchHasUnbalancedClosingParen = function (matchStr) {
      var endChar = matchStr.charAt(matchStr.length - 1);
      var startChar;

      if (endChar === ')') {
        startChar = '(';
      } else if (endChar === ']') {
        startChar = '[';
      } else if (endChar === '}') {
        startChar = '{';
      } else {
        return false; // not a close parenthesis or square bracket
      } // Find if there are the same number of open braces as close braces in
      // the URL string, minus the last character (which we have already 
      // determined to be either ')', ']' or '}'


      var numOpenBraces = 0;

      for (var i = 0, len = matchStr.length - 1; i < len; i++) {
        var char = matchStr.charAt(i);

        if (char === startChar) {
          numOpenBraces++;
        } else if (char === endChar) {
          numOpenBraces = Math.max(numOpenBraces - 1, 0);
        }
      } // If the number of open braces matches the number of close braces in
      // the URL minus the last character, then the match has *unbalanced*
      // braces because of the last character. Example of unbalanced braces
      // from the regex match:
      //     "http://example.com?a[]=1]"


      if (numOpenBraces === 0) {
        return true;
      }

      return false;
    };
    /**
     * Determine if there's an invalid character after the TLD in a URL. Valid
     * characters after TLD are ':/?#'. Exclude scheme matched URLs from this
     * check.
     *
     * @protected
     * @param {String} urlMatch The matched URL, if there was one. Will be an
     *   empty string if the match is not a URL match.
     * @param {String} schemeUrlMatch The match URL string for a scheme
     *   match. Ex: 'http://yahoo.com'. This is used to match something like
     *   'http://localhost', where we won't double check that the domain name
     *   has at least one '.' in it.
     * @return {Number} the position where the invalid character was found. If
     *   no such character was found, returns -1
     */


    UrlMatcher.prototype.matchHasInvalidCharAfterTld = function (urlMatch, schemeUrlMatch) {
      if (!urlMatch) {
        return -1;
      }

      var offset = 0;

      if (schemeUrlMatch) {
        offset = urlMatch.indexOf(':');
        urlMatch = urlMatch.slice(offset);
      }

      var re = new RegExp("^((.?\/\/)?[-." + alphaNumericAndMarksCharsStr + "]*[-" + alphaNumericAndMarksCharsStr + "]\\.[-" + alphaNumericAndMarksCharsStr + "]+)");
      var res = re.exec(urlMatch);

      if (res === null) {
        return -1;
      }

      offset += res[1].length;
      urlMatch = urlMatch.slice(res[1].length);

      if (/^[^-.A-Za-z0-9:\/?#]/.test(urlMatch)) {
        return offset;
      }

      return -1;
    };

    return UrlMatcher;
  }(Matcher);

  /**
   * @class Autolinker.matcher.Hashtag
   * @extends Autolinker.matcher.Matcher
   *
   * Matcher to find HashtagMatch matches in an input string.
   */

  var HashtagMatcher =
  /** @class */
  function (_super) {
    __extends(HashtagMatcher, _super);
    /**
     * @method constructor
     * @param {Object} cfg The configuration properties for the Match instance,
     *   specified in an Object (map).
     */


    function HashtagMatcher(cfg) {
      var _this = _super.call(this, cfg) || this;
      /**
       * @cfg {String} serviceName
       *
       * The service to point hashtag matches to. See {@link Autolinker#hashtag}
       * for available values.
       */


      _this.serviceName = 'twitter'; // default value just to get the above doc comment in the ES5 output and documentation generator

      /**
       * The regular expression to match Hashtags. Example match:
       *
       *     #asdf
       *
       * @protected
       * @property {RegExp} matcherRegex
       */

      _this.matcherRegex = new RegExp("#[_" + alphaNumericAndMarksCharsStr + "]{1,139}(?![_" + alphaNumericAndMarksCharsStr + "])", 'g'); // lookahead used to make sure we don't match something above 139 characters

      /**
       * The regular expression to use to check the character before a username match to
       * make sure we didn't accidentally match an email address.
       *
       * For example, the string "asdf@asdf.com" should not match "@asdf" as a username.
       *
       * @protected
       * @property {RegExp} nonWordCharRegex
       */

      _this.nonWordCharRegex = new RegExp('[^' + alphaNumericAndMarksCharsStr + ']');
      _this.serviceName = cfg.serviceName;
      return _this;
    }
    /**
     * @inheritdoc
     */


    HashtagMatcher.prototype.parseMatches = function (text) {
      var matcherRegex = this.matcherRegex,
          nonWordCharRegex = this.nonWordCharRegex,
          serviceName = this.serviceName,
          tagBuilder = this.tagBuilder,
          matches = [],
          match;

      while ((match = matcherRegex.exec(text)) !== null) {
        var offset = match.index,
            prevChar = text.charAt(offset - 1); // If we found the match at the beginning of the string, or we found the match
        // and there is a whitespace char in front of it (meaning it is not a '#' char
        // in the middle of a word), then it is a hashtag match.

        if (offset === 0 || nonWordCharRegex.test(prevChar)) {
          var matchedText = match[0],
              hashtag = match[0].slice(1); // strip off the '#' character at the beginning

          matches.push(new HashtagMatch({
            tagBuilder: tagBuilder,
            matchedText: matchedText,
            offset: offset,
            serviceName: serviceName,
            hashtag: hashtag
          }));
        }
      }

      return matches;
    };

    return HashtagMatcher;
  }(Matcher);

  /**
   * @class Autolinker.matcher.Phone
   * @extends Autolinker.matcher.Matcher
   *
   * Matcher to find Phone number matches in an input string.
   *
   * See this class's superclass ({@link Autolinker.matcher.Matcher}) for more
   * details.
   */

  var PhoneMatcher =
  /** @class */
  function (_super) {
    __extends(PhoneMatcher, _super);

    function PhoneMatcher() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      /**
       * The regular expression to match Phone numbers. Example match:
       *
       *     (123) 456-7890
       *
       * This regular expression has the following capturing groups:
       *
       * 1 or 2. The prefixed '+' sign, if there is one.
       *
       * @protected
       * @property {RegExp} matcherRegex
       */


      _this.matcherRegex = /(?:(?:(?:(\+)?\d{1,3}[-\040.]?)?\(?\d{3}\)?[-\040.]?\d{3}[-\040.]?\d{4})|(?:(\+)(?:9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)[-\040.]?(?:\d[-\040.]?){6,12}\d+))([,;]+[0-9]+#?)*/g;
      return _this;
    } // ex: (123) 456-7890, 123 456 7890, 123-456-7890, +18004441234,,;,10226420346#,
    // +1 (800) 444 1234, 10226420346#, 1-800-444-1234,1022,64,20346#

    /**
     * @inheritdoc
     */


    PhoneMatcher.prototype.parseMatches = function (text) {
      var matcherRegex = this.matcherRegex,
          tagBuilder = this.tagBuilder,
          matches = [],
          match;

      while ((match = matcherRegex.exec(text)) !== null) {
        // Remove non-numeric values from phone number string
        var matchedText = match[0],
            cleanNumber = matchedText.replace(/[^0-9,;#]/g, ''),
            // strip out non-digit characters exclude comma semicolon and #
        plusSign = !!(match[1] || match[2]),
            // match[ 1 ] or match[ 2 ] is the prefixed plus sign, if there is one
        before = match.index == 0 ? '' : text.substr(match.index - 1, 1),
            after = text.substr(match.index + matchedText.length, 1),
            contextClear = !before.match(/\d/) && !after.match(/\d/);

        if (this.testMatch(match[3]) && this.testMatch(matchedText) && contextClear) {
          matches.push(new PhoneMatch({
            tagBuilder: tagBuilder,
            matchedText: matchedText,
            offset: match.index,
            number: cleanNumber,
            plusSign: plusSign
          }));
        }
      }

      return matches;
    };

    PhoneMatcher.prototype.testMatch = function (text) {
      return /\D/.test(text);
    };

    return PhoneMatcher;
  }(Matcher);

  /**
   * @class Autolinker.matcher.Mention
   * @extends Autolinker.matcher.Matcher
   *
   * Matcher to find/replace username matches in an input string.
   */

  var MentionMatcher =
  /** @class */
  function (_super) {
    __extends(MentionMatcher, _super);
    /**
     * @method constructor
     * @param {Object} cfg The configuration properties for the Match instance,
     *   specified in an Object (map).
     */


    function MentionMatcher(cfg) {
      var _this = _super.call(this, cfg) || this;
      /**
       * @cfg {'twitter'/'instagram'/'soundcloud'} protected
       *
       * The name of service to link @mentions to.
       *
       * Valid values are: 'twitter', 'instagram', or 'soundcloud'
       */


      _this.serviceName = 'twitter'; // default value just to get the above doc comment in the ES5 output and documentation generator

      /**
       * Hash of regular expression to match username handles. Example match:
       *
       *     @asdf
       *
       * @private
       * @property {Object} matcherRegexes
       */

      _this.matcherRegexes = {
        'twitter': new RegExp("@[_" + alphaNumericAndMarksCharsStr + "]{1,50}(?![_" + alphaNumericAndMarksCharsStr + "])", 'g'),
        'instagram': new RegExp("@[_." + alphaNumericAndMarksCharsStr + "]{1,30}(?![_" + alphaNumericAndMarksCharsStr + "])", 'g'),
        'soundcloud': new RegExp("@[-_." + alphaNumericAndMarksCharsStr + "]{1,50}(?![-_" + alphaNumericAndMarksCharsStr + "])", 'g') // lookahead used to make sure we don't match something above 50 characters

      };
      /**
       * The regular expression to use to check the character before a username match to
       * make sure we didn't accidentally match an email address.
       *
       * For example, the string "asdf@asdf.com" should not match "@asdf" as a username.
       *
       * @private
       * @property {RegExp} nonWordCharRegex
       */

      _this.nonWordCharRegex = new RegExp('[^' + alphaNumericAndMarksCharsStr + ']');
      _this.serviceName = cfg.serviceName;
      return _this;
    }
    /**
     * @inheritdoc
     */


    MentionMatcher.prototype.parseMatches = function (text) {
      var serviceName = this.serviceName,
          matcherRegex = this.matcherRegexes[this.serviceName],
          nonWordCharRegex = this.nonWordCharRegex,
          tagBuilder = this.tagBuilder,
          matches = [],
          match;

      if (!matcherRegex) {
        return matches;
      }

      while ((match = matcherRegex.exec(text)) !== null) {
        var offset = match.index,
            prevChar = text.charAt(offset - 1); // If we found the match at the beginning of the string, or we found the match
        // and there is a whitespace char in front of it (meaning it is not an email
        // address), then it is a username match.

        if (offset === 0 || nonWordCharRegex.test(prevChar)) {
          var matchedText = match[0].replace(/\.+$/g, ''),
              // strip off trailing .
          mention = matchedText.slice(1); // strip off the '@' character at the beginning

          matches.push(new MentionMatch({
            tagBuilder: tagBuilder,
            matchedText: matchedText,
            offset: offset,
            serviceName: serviceName,
            mention: mention
          }));
        }
      }

      return matches;
    };

    return MentionMatcher;
  }(Matcher);

  // import CliTable from 'cli-table';

  /**
   * Parses an HTML string, calling the callbacks to notify of tags and text.
   *
   * ## History
   *
   * This file previously used a regular expression to find html tags in the input
   * text. Unfortunately, we ran into a bunch of catastrophic backtracking issues
   * with certain input text, causing Autolinker to either hang or just take a
   * really long time to parse the string.
   *
   * The current code is intended to be a O(n) algorithm that walks through
   * the string in one pass, and tries to be as cheap as possible. We don't need
   * to implement the full HTML spec, but rather simply determine where the string
   * looks like an HTML tag, and where it looks like text (so that we can autolink
   * that).
   *
   * This state machine parser is intended just to be a simple but performant
   * parser of HTML for the subset of requirements we have. We simply need to:
   *
   * 1. Determine where HTML tags are
   * 2. Determine the tag name (Autolinker specifically only cares about <a>,
   *    <script>, and <style> tags, so as not to link any text within them)
   *
   * We don't need to:
   *
   * 1. Create a parse tree
   * 2. Auto-close tags with invalid markup
   * 3. etc.
   *
   * The other intention behind this is that we didn't want to add external
   * dependencies on the Autolinker utility which would increase its size. For
   * instance, adding htmlparser2 adds 125kb to the minified output file,
   * increasing its final size from 47kb to 172kb (at the time of writing). It
   * also doesn't work exactly correctly, treating the string "<3 blah blah blah"
   * as an HTML tag.
   *
   * Reference for HTML spec:
   *
   *     https://www.w3.org/TR/html51/syntax.html#sec-tokenization
   *
   * @param {String} html The HTML to parse
   * @param {Object} callbacks
   * @param {Function} callbacks.onOpenTag Callback function to call when an open
   *   tag is parsed. Called with the tagName as its argument.
   * @param {Function} callbacks.onCloseTag Callback function to call when a close
   *   tag is parsed. Called with the tagName as its argument. If a self-closing
   *   tag is found, `onCloseTag` is called immediately after `onOpenTag`.
   * @param {Function} callbacks.onText Callback function to call when text (i.e
   *   not an HTML tag) is parsed. Called with the text (string) as its first
   *   argument, and offset (number) into the string as its second.
   */

  function parseHtml(html, _a) {
    var onOpenTag = _a.onOpenTag,
        onCloseTag = _a.onCloseTag,
        onText = _a.onText,
        onComment = _a.onComment,
        onDoctype = _a.onDoctype;
    var noCurrentTag = new CurrentTag();
    var charIdx = 0,
        len = html.length,
        state = 0
    /* Data */
    ,
        currentDataIdx = 0,
        // where the current data start index is
    currentTag = noCurrentTag; // describes the current tag that is being read
    // For debugging: search for other "For debugging" lines
    // const table = new CliTable( {
    // 	head: [ 'charIdx', 'char', 'state', 'currentDataIdx', 'currentOpenTagIdx', 'tag.type' ]
    // } );

    while (charIdx < len) {
      var char = html.charAt(charIdx); // For debugging: search for other "For debugging" lines
      // ALSO: Temporarily remove the 'const' keyword on the State enum
      // table.push( 
      // 	[ charIdx, char, State[ state ], currentDataIdx, currentTag.idx, currentTag.idx === -1 ? '' : currentTag.type ] 
      // );

      switch (state) {
        case 0
        /* Data */
        :
          stateData(char);
          break;

        case 1
        /* TagOpen */
        :
          stateTagOpen(char);
          break;

        case 2
        /* EndTagOpen */
        :
          stateEndTagOpen(char);
          break;

        case 3
        /* TagName */
        :
          stateTagName(char);
          break;

        case 4
        /* BeforeAttributeName */
        :
          stateBeforeAttributeName(char);
          break;

        case 5
        /* AttributeName */
        :
          stateAttributeName(char);
          break;

        case 6
        /* AfterAttributeName */
        :
          stateAfterAttributeName(char);
          break;

        case 7
        /* BeforeAttributeValue */
        :
          stateBeforeAttributeValue(char);
          break;

        case 8
        /* AttributeValueDoubleQuoted */
        :
          stateAttributeValueDoubleQuoted(char);
          break;

        case 9
        /* AttributeValueSingleQuoted */
        :
          stateAttributeValueSingleQuoted(char);
          break;

        case 10
        /* AttributeValueUnquoted */
        :
          stateAttributeValueUnquoted(char);
          break;

        case 11
        /* AfterAttributeValueQuoted */
        :
          stateAfterAttributeValueQuoted(char);
          break;

        case 12
        /* SelfClosingStartTag */
        :
          stateSelfClosingStartTag(char);
          break;

        case 13
        /* MarkupDeclarationOpenState */
        :
          stateMarkupDeclarationOpen();
          break;

        case 14
        /* CommentStart */
        :
          stateCommentStart(char);
          break;

        case 15
        /* CommentStartDash */
        :
          stateCommentStartDash(char);
          break;

        case 16
        /* Comment */
        :
          stateComment(char);
          break;

        case 17
        /* CommentEndDash */
        :
          stateCommentEndDash(char);
          break;

        case 18
        /* CommentEnd */
        :
          stateCommentEnd(char);
          break;

        case 19
        /* CommentEndBang */
        :
          stateCommentEndBang(char);
          break;

        case 20
        /* Doctype */
        :
          stateDoctype(char);
          break;

        default:
          throwUnhandledCaseError(state);
      } // For debugging: search for other "For debugging" lines
      // ALSO: Temporarily remove the 'const' keyword on the State enum
      // table.push( 
      // 	[ charIdx, char, State[ state ], currentDataIdx, currentTag.idx, currentTag.idx === -1 ? '' : currentTag.type ] 
      // );


      charIdx++;
    }

    if (currentDataIdx < charIdx) {
      emitText();
    } // For debugging: search for other "For debugging" lines
    // console.log( '\n' + table.toString() );
    // Called when non-tags are being read (i.e. the text around HTML †ags)
    // https://www.w3.org/TR/html51/syntax.html#data-state


    function stateData(char) {
      if (char === '<') {
        startNewTag();
      }
    } // Called after a '<' is read from the Data state
    // https://www.w3.org/TR/html51/syntax.html#tag-open-state


    function stateTagOpen(char) {
      if (char === '!') {
        state = 13
        /* MarkupDeclarationOpenState */
        ;
      } else if (char === '/') {
        state = 2
        /* EndTagOpen */
        ;
        currentTag = new CurrentTag(_assign({}, currentTag, {
          isClosing: true
        }));
      } else if (char === '<') {
        // start of another tag (ignore the previous, incomplete one)
        startNewTag();
      } else if (letterRe.test(char)) {
        // tag name start (and no '/' read)
        state = 3
        /* TagName */
        ;
        currentTag = new CurrentTag(_assign({}, currentTag, {
          isOpening: true
        }));
      } else {
        // Any other 
        state = 0
        /* Data */
        ;
        currentTag = noCurrentTag;
      }
    } // After a '<x', '</x' sequence is read (where 'x' is a letter character), 
    // this is to continue reading the tag name
    // https://www.w3.org/TR/html51/syntax.html#tag-name-state


    function stateTagName(char) {
      if (whitespaceRe.test(char)) {
        currentTag = new CurrentTag(_assign({}, currentTag, {
          name: captureTagName()
        }));
        state = 4
        /* BeforeAttributeName */
        ;
      } else if (char === '<') {
        // start of another tag (ignore the previous, incomplete one)
        startNewTag();
      } else if (char === '/') {
        currentTag = new CurrentTag(_assign({}, currentTag, {
          name: captureTagName()
        }));
        state = 12
        /* SelfClosingStartTag */
        ;
      } else if (char === '>') {
        currentTag = new CurrentTag(_assign({}, currentTag, {
          name: captureTagName()
        }));
        emitTagAndPreviousTextNode(); // resets to Data state as well
      } else if (!letterRe.test(char) && !digitRe.test(char) && char !== ':') {
        // Anything else that does not form an html tag. Note: the colon 
        // character is accepted for XML namespaced tags
        resetToDataState();
      }
    } // Called after the '/' is read from a '</' sequence
    // https://www.w3.org/TR/html51/syntax.html#end-tag-open-state


    function stateEndTagOpen(char) {
      if (char === '>') {
        // parse error. Encountered "</>". Skip it without treating as a tag
        resetToDataState();
      } else if (letterRe.test(char)) {
        state = 3
        /* TagName */
        ;
      } else {
        // some other non-tag-like character, don't treat this as a tag
        resetToDataState();
      }
    } // https://www.w3.org/TR/html51/syntax.html#before-attribute-name-state


    function stateBeforeAttributeName(char) {
      if (whitespaceRe.test(char)) ; else if (char === '/') {
        state = 12
        /* SelfClosingStartTag */
        ;
      } else if (char === '>') {
        emitTagAndPreviousTextNode(); // resets to Data state as well
      } else if (char === '<') {
        // start of another tag (ignore the previous, incomplete one)
        startNewTag();
      } else if (char === "=" || quoteRe.test(char) || controlCharsRe.test(char)) {
        // "Parse error" characters that, according to the spec, should be
        // appended to the attribute name, but we'll treat these characters
        // as not forming a real HTML tag
        resetToDataState();
      } else {
        // Any other char, start of a new attribute name
        state = 5
        /* AttributeName */
        ;
      }
    } // https://www.w3.org/TR/html51/syntax.html#attribute-name-state


    function stateAttributeName(char) {
      if (whitespaceRe.test(char)) {
        state = 6
        /* AfterAttributeName */
        ;
      } else if (char === '/') {
        state = 12
        /* SelfClosingStartTag */
        ;
      } else if (char === '=') {
        state = 7
        /* BeforeAttributeValue */
        ;
      } else if (char === '>') {
        emitTagAndPreviousTextNode(); // resets to Data state as well
      } else if (char === '<') {
        // start of another tag (ignore the previous, incomplete one)
        startNewTag();
      } else if (quoteRe.test(char)) {
        // "Parse error" characters that, according to the spec, should be
        // appended to the attribute name, but we'll treat these characters
        // as not forming a real HTML tag
        resetToDataState();
      }
    } // https://www.w3.org/TR/html51/syntax.html#after-attribute-name-state


    function stateAfterAttributeName(char) {
      if (whitespaceRe.test(char)) ; else if (char === '/') {
        state = 12
        /* SelfClosingStartTag */
        ;
      } else if (char === '=') {
        state = 7
        /* BeforeAttributeValue */
        ;
      } else if (char === '>') {
        emitTagAndPreviousTextNode();
      } else if (char === '<') {
        // start of another tag (ignore the previous, incomplete one)
        startNewTag();
      } else if (quoteRe.test(char)) {
        // "Parse error" characters that, according to the spec, should be
        // appended to the attribute name, but we'll treat these characters
        // as not forming a real HTML tag
        resetToDataState();
      } else {
        // Any other character, start a new attribute in the current tag
        state = 5
        /* AttributeName */
        ;
      }
    } // https://www.w3.org/TR/html51/syntax.html#before-attribute-value-state


    function stateBeforeAttributeValue(char) {
      if (whitespaceRe.test(char)) ; else if (char === "\"") {
        state = 8
        /* AttributeValueDoubleQuoted */
        ;
      } else if (char === "'") {
        state = 9
        /* AttributeValueSingleQuoted */
        ;
      } else if (/[>=`]/.test(char)) {
        // Invalid chars after an '=' for an attribute value, don't count 
        // the current tag as an HTML tag
        resetToDataState();
      } else if (char === '<') {
        // start of another tag (ignore the previous, incomplete one)
        startNewTag();
      } else {
        // Any other character, consider it an unquoted attribute value
        state = 10
        /* AttributeValueUnquoted */
        ;
      }
    } // https://www.w3.org/TR/html51/syntax.html#attribute-value-double-quoted-state


    function stateAttributeValueDoubleQuoted(char) {
      if (char === "\"") {
        // end the current double-quoted attribute
        state = 11
        /* AfterAttributeValueQuoted */
        ;
      }
    } // https://www.w3.org/TR/html51/syntax.html#attribute-value-single-quoted-state


    function stateAttributeValueSingleQuoted(char) {
      if (char === "'") {
        // end the current single-quoted attribute
        state = 11
        /* AfterAttributeValueQuoted */
        ;
      }
    } // https://www.w3.org/TR/html51/syntax.html#attribute-value-unquoted-state


    function stateAttributeValueUnquoted(char) {
      if (whitespaceRe.test(char)) {
        state = 4
        /* BeforeAttributeName */
        ;
      } else if (char === '>') {
        emitTagAndPreviousTextNode();
      } else if (char === '<') {
        // start of another tag (ignore the previous, incomplete one)
        startNewTag();
      }
    } // https://www.w3.org/TR/html51/syntax.html#after-attribute-value-quoted-state


    function stateAfterAttributeValueQuoted(char) {
      if (whitespaceRe.test(char)) {
        state = 4
        /* BeforeAttributeName */
        ;
      } else if (char === '/') {
        state = 12
        /* SelfClosingStartTag */
        ;
      } else if (char === '>') {
        emitTagAndPreviousTextNode();
      } else if (char === '<') {
        // start of another tag (ignore the previous, incomplete one)
        startNewTag();
      } else {
        // Any other character, "parse error". Spec says to switch to the
        // BeforeAttributeState and re-consume the character, as it may be
        // the start of a new attribute name
        state = 4
        /* BeforeAttributeName */
        ;
        reconsumeCurrentCharacter();
      }
    } // A '/' has just been read in the current tag (presumably for '/>'), and 
    // this handles the next character
    // https://www.w3.org/TR/html51/syntax.html#self-closing-start-tag-state


    function stateSelfClosingStartTag(char) {
      if (char === '>') {
        currentTag = new CurrentTag(_assign({}, currentTag, {
          isClosing: true
        }));
        emitTagAndPreviousTextNode(); // resets to Data state as well
      } else {
        state = 4
        /* BeforeAttributeName */
        ;
      }
    } // https://www.w3.org/TR/html51/syntax.html#markup-declaration-open-state
    // (HTML Comments or !DOCTYPE)


    function stateMarkupDeclarationOpen(char) {
      if (html.substr(charIdx, 2) === '--') {
        // html comment
        charIdx += 2; // "consume" characters

        currentTag = new CurrentTag(_assign({}, currentTag, {
          type: 'comment'
        }));
        state = 14
        /* CommentStart */
        ;
      } else if (html.substr(charIdx, 7).toUpperCase() === 'DOCTYPE') {
        charIdx += 7; // "consume" characters

        currentTag = new CurrentTag(_assign({}, currentTag, {
          type: 'doctype'
        }));
        state = 20
        /* Doctype */
        ;
      } else {
        // At this point, the spec specifies that the state machine should
        // enter the "bogus comment" state, in which case any character(s) 
        // after the '<!' that were read should become an HTML comment up
        // until the first '>' that is read (or EOF). Instead, we'll assume
        // that a user just typed '<!' as part of text data
        resetToDataState();
      }
    } // Handles after the sequence '<!--' has been read
    // https://www.w3.org/TR/html51/syntax.html#comment-start-state


    function stateCommentStart(char) {
      if (char === '-') {
        // We've read the sequence '<!---' at this point (3 dashes)
        state = 15
        /* CommentStartDash */
        ;
      } else if (char === '>') {
        // At this point, we'll assume the comment wasn't a real comment
        // so we'll just emit it as data. We basically read the sequence 
        // '<!-->'
        resetToDataState();
      } else {
        // Any other char, take it as part of the comment
        state = 16
        /* Comment */
        ;
      }
    } // We've read the sequence '<!---' at this point (3 dashes)
    // https://www.w3.org/TR/html51/syntax.html#comment-start-dash-state


    function stateCommentStartDash(char) {
      if (char === '-') {
        // We've read '<!----' (4 dashes) at this point
        state = 18
        /* CommentEnd */
        ;
      } else if (char === '>') {
        // At this point, we'll assume the comment wasn't a real comment
        // so we'll just emit it as data. We basically read the sequence 
        // '<!--->'
        resetToDataState();
      } else {
        // Anything else, take it as a valid comment
        state = 16
        /* Comment */
        ;
      }
    } // Currently reading the comment's text (data)
    // https://www.w3.org/TR/html51/syntax.html#comment-state


    function stateComment(char) {
      if (char === '-') {
        state = 17
        /* CommentEndDash */
        ;
      }
    } // When we we've read the first dash inside a comment, it may signal the
    // end of the comment if we read another dash
    // https://www.w3.org/TR/html51/syntax.html#comment-end-dash-state


    function stateCommentEndDash(char) {
      if (char === '-') {
        state = 18
        /* CommentEnd */
        ;
      } else {
        // Wasn't a dash, must still be part of the comment
        state = 16
        /* Comment */
        ;
      }
    } // After we've read two dashes inside a comment, it may signal the end of 
    // the comment if we then read a '>' char
    // https://www.w3.org/TR/html51/syntax.html#comment-end-state


    function stateCommentEnd(char) {
      if (char === '>') {
        emitTagAndPreviousTextNode();
      } else if (char === '!') {
        state = 19
        /* CommentEndBang */
        ;
      } else if (char === '-') ; else {
        // Anything else, switch back to the comment state since we didn't
        // read the full "end comment" sequence (i.e. '-->')
        state = 16
        /* Comment */
        ;
      }
    } // We've read the sequence '--!' inside of a comment
    // https://www.w3.org/TR/html51/syntax.html#comment-end-bang-state


    function stateCommentEndBang(char) {
      if (char === '-') {
        // We read the sequence '--!-' inside of a comment. The last dash
        // could signify that the comment is going to close
        state = 17
        /* CommentEndDash */
        ;
      } else if (char === '>') {
        // End of comment with the sequence '--!>'
        emitTagAndPreviousTextNode();
      } else {
        // The '--!' was not followed by a '>', continue reading the 
        // comment's text
        state = 16
        /* Comment */
        ;
      }
    }
    /**
     * For DOCTYPES in particular, we don't care about the attributes. Just
     * advance to the '>' character and emit the tag, unless we find a '<'
     * character in which case we'll start a new tag.
     *
     * Example doctype tag:
     *    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
     *
     * Actual spec: https://www.w3.org/TR/html51/syntax.html#doctype-state
     */


    function stateDoctype(char) {
      if (char === '>') {
        emitTagAndPreviousTextNode();
      } else if (char === '<') {
        startNewTag();
      }
    }
    /**
     * Resets the state back to the Data state, and removes the current tag.
     *
     * We'll generally run this function whenever a "parse error" is
     * encountered, where the current tag that is being read no longer looks
     * like a real HTML tag.
     */


    function resetToDataState() {
      state = 0
      /* Data */
      ;
      currentTag = noCurrentTag;
    }
    /**
     * Starts a new HTML tag at the current index, ignoring any previous HTML
     * tag that was being read.
     *
     * We'll generally run this function whenever we read a new '<' character,
     * including when we read a '<' character inside of an HTML tag that we were
     * previously reading.
     */


    function startNewTag() {
      state = 1
      /* TagOpen */
      ;
      currentTag = new CurrentTag({
        idx: charIdx
      });
    }
    /**
     * Once we've decided to emit an open tag, that means we can also emit the
     * text node before it.
     */


    function emitTagAndPreviousTextNode() {
      var textBeforeTag = html.slice(currentDataIdx, currentTag.idx);

      if (textBeforeTag) {
        // the html tag was the first element in the html string, or two 
        // tags next to each other, in which case we should not emit a text 
        // node
        onText(textBeforeTag, currentDataIdx);
      }

      if (currentTag.type === 'comment') {
        onComment(currentTag.idx);
      } else if (currentTag.type === 'doctype') {
        onDoctype(currentTag.idx);
      } else {
        if (currentTag.isOpening) {
          onOpenTag(currentTag.name, currentTag.idx);
        }

        if (currentTag.isClosing) {
          // note: self-closing tags will emit both opening and closing
          onCloseTag(currentTag.name, currentTag.idx);
        }
      } // Since we just emitted a tag, reset to the data state for the next char


      resetToDataState();
      currentDataIdx = charIdx + 1;
    }

    function emitText() {
      var text = html.slice(currentDataIdx, charIdx);
      onText(text, currentDataIdx);
      currentDataIdx = charIdx + 1;
    }
    /**
     * Captures the tag name from the start of the tag to the current character
     * index, and converts it to lower case
     */


    function captureTagName() {
      var startIdx = currentTag.idx + (currentTag.isClosing ? 2 : 1);
      return html.slice(startIdx, charIdx).toLowerCase();
    }
    /**
     * Causes the main loop to re-consume the current character, such as after
     * encountering a "parse error" that changed state and needs to reconsume
     * the same character in that new state.
     */


    function reconsumeCurrentCharacter() {
      charIdx--;
    }
  }

  var CurrentTag =
  /** @class */
  function () {
    function CurrentTag(cfg) {
      if (cfg === void 0) {
        cfg = {};
      }

      this.idx = cfg.idx !== undefined ? cfg.idx : -1;
      this.type = cfg.type || 'tag';
      this.name = cfg.name || '';
      this.isOpening = !!cfg.isOpening;
      this.isClosing = !!cfg.isClosing;
    }

    return CurrentTag;
  }();

  /**
   * @class Autolinker
   * @extends Object
   *
   * Utility class used to process a given string of text, and wrap the matches in
   * the appropriate anchor (&lt;a&gt;) tags to turn them into links.
   *
   * Any of the configuration options may be provided in an Object provided
   * to the Autolinker constructor, which will configure how the {@link #link link()}
   * method will process the links.
   *
   * For example:
   *
   *     var autolinker = new Autolinker( {
   *         newWindow : false,
   *         truncate  : 30
   *     } );
   *
   *     var html = autolinker.link( "Joe went to www.yahoo.com" );
   *     // produces: 'Joe went to <a href="http://www.yahoo.com">yahoo.com</a>'
   *
   *
   * The {@link #static-link static link()} method may also be used to inline
   * options into a single call, which may be more convenient for one-off uses.
   * For example:
   *
   *     var html = Autolinker.link( "Joe went to www.yahoo.com", {
   *         newWindow : false,
   *         truncate  : 30
   *     } );
   *     // produces: 'Joe went to <a href="http://www.yahoo.com">yahoo.com</a>'
   *
   *
   * ## Custom Replacements of Links
   *
   * If the configuration options do not provide enough flexibility, a {@link #replaceFn}
   * may be provided to fully customize the output of Autolinker. This function is
   * called once for each URL/Email/Phone#/Hashtag/Mention (Twitter, Instagram, Soundcloud)
   * match that is encountered.
   *
   * For example:
   *
   *     var input = "...";  // string with URLs, Email Addresses, Phone #s, Hashtags, and Mentions (Twitter, Instagram, Soundcloud)
   *
   *     var linkedText = Autolinker.link( input, {
   *         replaceFn : function( match ) {
   *             console.log( "href = ", match.getAnchorHref() );
   *             console.log( "text = ", match.getAnchorText() );
   *
   *             switch( match.getType() ) {
   *                 case 'url' :
   *                     console.log( "url: ", match.getUrl() );
   *
   *                     if( match.getUrl().indexOf( 'mysite.com' ) === -1 ) {
   *                         var tag = match.buildTag();  // returns an `Autolinker.HtmlTag` instance, which provides mutator methods for easy changes
   *                         tag.setAttr( 'rel', 'nofollow' );
   *                         tag.addClass( 'external-link' );
   *
   *                         return tag;
   *
   *                     } else {
   *                         return true;  // let Autolinker perform its normal anchor tag replacement
   *                     }
   *
   *                 case 'email' :
   *                     var email = match.getEmail();
   *                     console.log( "email: ", email );
   *
   *                     if( email === "my@own.address" ) {
   *                         return false;  // don't auto-link this particular email address; leave as-is
   *                     } else {
   *                         return;  // no return value will have Autolinker perform its normal anchor tag replacement (same as returning `true`)
   *                     }
   *
   *                 case 'phone' :
   *                     var phoneNumber = match.getPhoneNumber();
   *                     console.log( phoneNumber );
   *
   *                     return '<a href="http://newplace.to.link.phone.numbers.to/">' + phoneNumber + '</a>';
   *
   *                 case 'hashtag' :
   *                     var hashtag = match.getHashtag();
   *                     console.log( hashtag );
   *
   *                     return '<a href="http://newplace.to.link.hashtag.handles.to/">' + hashtag + '</a>';
   *
   *                 case 'mention' :
   *                     var mention = match.getMention();
   *                     console.log( mention );
   *
   *                     return '<a href="http://newplace.to.link.mention.to/">' + mention + '</a>';
   *             }
   *         }
   *     } );
   *
   *
   * The function may return the following values:
   *
   * - `true` (Boolean): Allow Autolinker to replace the match as it normally
   *   would.
   * - `false` (Boolean): Do not replace the current match at all - leave as-is.
   * - Any String: If a string is returned from the function, the string will be
   *   used directly as the replacement HTML for the match.
   * - An {@link Autolinker.HtmlTag} instance, which can be used to build/modify
   *   an HTML tag before writing out its HTML text.
   */

  var Autolinker =
  /** @class */
  function () {
    /**
     * @method constructor
     * @param {Object} [cfg] The configuration options for the Autolinker instance,
     *   specified in an Object (map).
     */
    function Autolinker(cfg) {
      if (cfg === void 0) {
        cfg = {};
      }
      /**
       * The Autolinker version number exposed on the instance itself.
       *
       * Ex: 0.25.1
       */


      this.version = Autolinker.version;
      /**
       * @cfg {Boolean/Object} [urls]
       *
       * `true` if URLs should be automatically linked, `false` if they should not
       * be. Defaults to `true`.
       *
       * Examples:
       *
       *     urls: true
       *
       *     // or
       *
       *     urls: {
       *         schemeMatches : true,
       *         wwwMatches    : true,
       *         tldMatches    : true
       *     }
       *
       * As shown above, this option also accepts an Object form with 3 properties
       * to allow for more customization of what exactly gets linked. All default
       * to `true`:
       *
       * @cfg {Boolean} [urls.schemeMatches] `true` to match URLs found prefixed
       *   with a scheme, i.e. `http://google.com`, or `other+scheme://google.com`,
       *   `false` to prevent these types of matches.
       * @cfg {Boolean} [urls.wwwMatches] `true` to match urls found prefixed with
       *   `'www.'`, i.e. `www.google.com`. `false` to prevent these types of
       *   matches. Note that if the URL had a prefixed scheme, and
       *   `schemeMatches` is true, it will still be linked.
       * @cfg {Boolean} [urls.tldMatches] `true` to match URLs with known top
       *   level domains (.com, .net, etc.) that are not prefixed with a scheme or
       *   `'www.'`. This option attempts to match anything that looks like a URL
       *   in the given text. Ex: `google.com`, `asdf.org/?page=1`, etc. `false`
       *   to prevent these types of matches.
       */

      this.urls = {}; // default value just to get the above doc comment in the ES5 output and documentation generator

      /**
       * @cfg {Boolean} [email=true]
       *
       * `true` if email addresses should be automatically linked, `false` if they
       * should not be.
       */

      this.email = true; // default value just to get the above doc comment in the ES5 output and documentation generator

      /**
       * @cfg {Boolean} [phone=true]
       *
       * `true` if Phone numbers ("(555)555-5555") should be automatically linked,
       * `false` if they should not be.
       */

      this.phone = true; // default value just to get the above doc comment in the ES5 output and documentation generator

      /**
       * @cfg {Boolean/String} [hashtag=false]
       *
       * A string for the service name to have hashtags (ex: "#myHashtag")
       * auto-linked to. The currently-supported values are:
       *
       * - 'twitter'
       * - 'facebook'
       * - 'instagram'
       *
       * Pass `false` to skip auto-linking of hashtags.
       */

      this.hashtag = false; // default value just to get the above doc comment in the ES5 output and documentation generator

      /**
       * @cfg {String/Boolean} [mention=false]
       *
       * A string for the service name to have mentions (ex: "@myuser")
       * auto-linked to. The currently supported values are:
       *
       * - 'twitter'
       * - 'instagram'
       * - 'soundcloud'
       *
       * Defaults to `false` to skip auto-linking of mentions.
       */

      this.mention = false; // default value just to get the above doc comment in the ES5 output and documentation generator

      /**
       * @cfg {Boolean} [newWindow=true]
       *
       * `true` if the links should open in a new window, `false` otherwise.
       */

      this.newWindow = true; // default value just to get the above doc comment in the ES5 output and documentation generator

      /**
       * @cfg {Boolean/Object} [stripPrefix=true]
       *
       * `true` if 'http://' (or 'https://') and/or the 'www.' should be stripped
       * from the beginning of URL links' text, `false` otherwise. Defaults to
       * `true`.
       *
       * Examples:
       *
       *     stripPrefix: true
       *
       *     // or
       *
       *     stripPrefix: {
       *         scheme : true,
       *         www    : true
       *     }
       *
       * As shown above, this option also accepts an Object form with 2 properties
       * to allow for more customization of what exactly is prevented from being
       * displayed. Both default to `true`:
       *
       * @cfg {Boolean} [stripPrefix.scheme] `true` to prevent the scheme part of
       *   a URL match from being displayed to the user. Example:
       *   `'http://google.com'` will be displayed as `'google.com'`. `false` to
       *   not strip the scheme. NOTE: Only an `'http://'` or `'https://'` scheme
       *   will be removed, so as not to remove a potentially dangerous scheme
       *   (such as `'file://'` or `'javascript:'`)
       * @cfg {Boolean} [stripPrefix.www] www (Boolean): `true` to prevent the
       *   `'www.'` part of a URL match from being displayed to the user. Ex:
       *   `'www.google.com'` will be displayed as `'google.com'`. `false` to not
       *   strip the `'www'`.
       */

      this.stripPrefix = {
        scheme: true,
        www: true
      }; // default value just to get the above doc comment in the ES5 output and documentation generator

      /**
       * @cfg {Boolean} [stripTrailingSlash=true]
       *
       * `true` to remove the trailing slash from URL matches, `false` to keep
       *  the trailing slash.
       *
       *  Example when `true`: `http://google.com/` will be displayed as
       *  `http://google.com`.
       */

      this.stripTrailingSlash = true; // default value just to get the above doc comment in the ES5 output and documentation generator

      /**
       * @cfg {Boolean} [decodePercentEncoding=true]
       *
       * `true` to decode percent-encoded characters in URL matches, `false` to keep
       *  the percent-encoded characters.
       *
       *  Example when `true`: `https://en.wikipedia.org/wiki/San_Jos%C3%A9` will
       *  be displayed as `https://en.wikipedia.org/wiki/San_José`.
       */

      this.decodePercentEncoding = true; // default value just to get the above doc comment in the ES5 output and documentation generator

      /**
       * @cfg {Number/Object} [truncate=0]
       *
       * ## Number Form
       *
       * A number for how many characters matched text should be truncated to
       * inside the text of a link. If the matched text is over this number of
       * characters, it will be truncated to this length by adding a two period
       * ellipsis ('..') to the end of the string.
       *
       * For example: A url like 'http://www.yahoo.com/some/long/path/to/a/file'
       * truncated to 25 characters might look something like this:
       * 'yahoo.com/some/long/pat..'
       *
       * Example Usage:
       *
       *     truncate: 25
       *
       *
       *  Defaults to `0` for "no truncation."
       *
       *
       * ## Object Form
       *
       * An Object may also be provided with two properties: `length` (Number) and
       * `location` (String). `location` may be one of the following: 'end'
       * (default), 'middle', or 'smart'.
       *
       * Example Usage:
       *
       *     truncate: { length: 25, location: 'middle' }
       *
       * @cfg {Number} [truncate.length=0] How many characters to allow before
       *   truncation will occur. Defaults to `0` for "no truncation."
       * @cfg {"end"/"middle"/"smart"} [truncate.location="end"]
       *
       * - 'end' (default): will truncate up to the number of characters, and then
       *   add an ellipsis at the end. Ex: 'yahoo.com/some/long/pat..'
       * - 'middle': will truncate and add the ellipsis in the middle. Ex:
       *   'yahoo.com/s..th/to/a/file'
       * - 'smart': for URLs where the algorithm attempts to strip out unnecessary
       *   parts first (such as the 'www.', then URL scheme, hash, etc.),
       *   attempting to make the URL human-readable before looking for a good
       *   point to insert the ellipsis if it is still too long. Ex:
       *   'yahoo.com/some..to/a/file'. For more details, see
       *   {@link Autolinker.truncate.TruncateSmart}.
       */

      this.truncate = {
        length: 0,
        location: 'end'
      }; // default value just to get the above doc comment in the ES5 output and documentation generator

      /**
       * @cfg {String} className
       *
       * A CSS class name to add to the generated links. This class will be added
       * to all links, as well as this class plus match suffixes for styling
       * url/email/phone/hashtag/mention links differently.
       *
       * For example, if this config is provided as "myLink", then:
       *
       * - URL links will have the CSS classes: "myLink myLink-url"
       * - Email links will have the CSS classes: "myLink myLink-email", and
       * - Phone links will have the CSS classes: "myLink myLink-phone"
       * - Hashtag links will have the CSS classes: "myLink myLink-hashtag"
       * - Mention links will have the CSS classes: "myLink myLink-mention myLink-[type]"
       *   where [type] is either "instagram", "twitter" or "soundcloud"
       */

      this.className = ''; // default value just to get the above doc comment in the ES5 output and documentation generator

      /**
       * @cfg {Function} replaceFn
       *
       * A function to individually process each match found in the input string.
       *
       * See the class's description for usage.
       *
       * The `replaceFn` can be called with a different context object (`this`
       * reference) using the {@link #context} cfg.
       *
       * This function is called with the following parameter:
       *
       * @cfg {Autolinker.match.Match} replaceFn.match The Match instance which
       *   can be used to retrieve information about the match that the `replaceFn`
       *   is currently processing. See {@link Autolinker.match.Match} subclasses
       *   for details.
       */

      this.replaceFn = null; // default value just to get the above doc comment in the ES5 output and documentation generator

      /**
       * @cfg {Object} context
       *
       * The context object (`this` reference) to call the `replaceFn` with.
       *
       * Defaults to this Autolinker instance.
       */

      this.context = undefined; // default value just to get the above doc comment in the ES5 output and documentation generator

      /**
       * @private
       * @property {Autolinker.matcher.Matcher[]} matchers
       *
       * The {@link Autolinker.matcher.Matcher} instances for this Autolinker
       * instance.
       *
       * This is lazily created in {@link #getMatchers}.
       */

      this.matchers = null;
      /**
       * @private
       * @property {Autolinker.AnchorTagBuilder} tagBuilder
       *
       * The AnchorTagBuilder instance used to build match replacement anchor tags.
       * Note: this is lazily instantiated in the {@link #getTagBuilder} method.
       */

      this.tagBuilder = null; // Note: when `this.something` is used in the rhs of these assignments,
      //       it refers to the default values set above the constructor

      this.urls = this.normalizeUrlsCfg(cfg.urls);
      this.email = typeof cfg.email === 'boolean' ? cfg.email : this.email;
      this.phone = typeof cfg.phone === 'boolean' ? cfg.phone : this.phone;
      this.hashtag = cfg.hashtag || this.hashtag;
      this.mention = cfg.mention || this.mention;
      this.newWindow = typeof cfg.newWindow === 'boolean' ? cfg.newWindow : this.newWindow;
      this.stripPrefix = this.normalizeStripPrefixCfg(cfg.stripPrefix);
      this.stripTrailingSlash = typeof cfg.stripTrailingSlash === 'boolean' ? cfg.stripTrailingSlash : this.stripTrailingSlash;
      this.decodePercentEncoding = typeof cfg.decodePercentEncoding === 'boolean' ? cfg.decodePercentEncoding : this.decodePercentEncoding; // Validate the value of the `mention` cfg

      var mention = this.mention;

      if (mention !== false && mention !== 'twitter' && mention !== 'instagram' && mention !== 'soundcloud') {
        throw new Error("invalid `mention` cfg - see docs");
      } // Validate the value of the `hashtag` cfg


      var hashtag = this.hashtag;

      if (hashtag !== false && hashtag !== 'twitter' && hashtag !== 'facebook' && hashtag !== 'instagram') {
        throw new Error("invalid `hashtag` cfg - see docs");
      }

      this.truncate = this.normalizeTruncateCfg(cfg.truncate);
      this.className = cfg.className || this.className;
      this.replaceFn = cfg.replaceFn || this.replaceFn;
      this.context = cfg.context || this;
    }
    /**
     * Automatically links URLs, Email addresses, Phone Numbers, Twitter handles,
     * Hashtags, and Mentions found in the given chunk of HTML. Does not link URLs
     * found within HTML tags.
     *
     * For instance, if given the text: `You should go to http://www.yahoo.com`,
     * then the result will be `You should go to &lt;a href="http://www.yahoo.com"&gt;http://www.yahoo.com&lt;/a&gt;`
     *
     * Example:
     *
     *     var linkedText = Autolinker.link( "Go to google.com", { newWindow: false } );
     *     // Produces: "Go to <a href="http://google.com">google.com</a>"
     *
     * @static
     * @param {String} textOrHtml The HTML or text to find matches within (depending
     *   on if the {@link #urls}, {@link #email}, {@link #phone}, {@link #mention},
     *   {@link #hashtag}, and {@link #mention} options are enabled).
     * @param {Object} [options] Any of the configuration options for the Autolinker
     *   class, specified in an Object (map). See the class description for an
     *   example call.
     * @return {String} The HTML text, with matches automatically linked.
     */


    Autolinker.link = function (textOrHtml, options) {
      var autolinker = new Autolinker(options);
      return autolinker.link(textOrHtml);
    };
    /**
     * Parses the input `textOrHtml` looking for URLs, email addresses, phone
     * numbers, username handles, and hashtags (depending on the configuration
     * of the Autolinker instance), and returns an array of {@link Autolinker.match.Match}
     * objects describing those matches (without making any replacements).
     *
     * Note that if parsing multiple pieces of text, it is slightly more efficient
     * to create an Autolinker instance, and use the instance-level {@link #parse}
     * method.
     *
     * Example:
     *
     *     var matches = Autolinker.parse( "Hello google.com, I am asdf@asdf.com", {
     *         urls: true,
     *         email: true
     *     } );
     *
     *     console.log( matches.length );           // 2
     *     console.log( matches[ 0 ].getType() );   // 'url'
     *     console.log( matches[ 0 ].getUrl() );    // 'google.com'
     *     console.log( matches[ 1 ].getType() );   // 'email'
     *     console.log( matches[ 1 ].getEmail() );  // 'asdf@asdf.com'
     *
     * @static
     * @param {String} textOrHtml The HTML or text to find matches within
     *   (depending on if the {@link #urls}, {@link #email}, {@link #phone},
     *   {@link #hashtag}, and {@link #mention} options are enabled).
     * @param {Object} [options] Any of the configuration options for the Autolinker
     *   class, specified in an Object (map). See the class description for an
     *   example call.
     * @return {Autolinker.match.Match[]} The array of Matches found in the
     *   given input `textOrHtml`.
     */


    Autolinker.parse = function (textOrHtml, options) {
      var autolinker = new Autolinker(options);
      return autolinker.parse(textOrHtml);
    };
    /**
     * Normalizes the {@link #urls} config into an Object with 3 properties:
     * `schemeMatches`, `wwwMatches`, and `tldMatches`, all Booleans.
     *
     * See {@link #urls} config for details.
     *
     * @private
     * @param {Boolean/Object} urls
     * @return {Object}
     */


    Autolinker.prototype.normalizeUrlsCfg = function (urls) {
      if (urls == null) urls = true; // default to `true`

      if (typeof urls === 'boolean') {
        return {
          schemeMatches: urls,
          wwwMatches: urls,
          tldMatches: urls
        };
      } else {
        // object form
        return {
          schemeMatches: typeof urls.schemeMatches === 'boolean' ? urls.schemeMatches : true,
          wwwMatches: typeof urls.wwwMatches === 'boolean' ? urls.wwwMatches : true,
          tldMatches: typeof urls.tldMatches === 'boolean' ? urls.tldMatches : true
        };
      }
    };
    /**
     * Normalizes the {@link #stripPrefix} config into an Object with 2
     * properties: `scheme`, and `www` - both Booleans.
     *
     * See {@link #stripPrefix} config for details.
     *
     * @private
     * @param {Boolean/Object} stripPrefix
     * @return {Object}
     */


    Autolinker.prototype.normalizeStripPrefixCfg = function (stripPrefix) {
      if (stripPrefix == null) stripPrefix = true; // default to `true`

      if (typeof stripPrefix === 'boolean') {
        return {
          scheme: stripPrefix,
          www: stripPrefix
        };
      } else {
        // object form
        return {
          scheme: typeof stripPrefix.scheme === 'boolean' ? stripPrefix.scheme : true,
          www: typeof stripPrefix.www === 'boolean' ? stripPrefix.www : true
        };
      }
    };
    /**
     * Normalizes the {@link #truncate} config into an Object with 2 properties:
     * `length` (Number), and `location` (String).
     *
     * See {@link #truncate} config for details.
     *
     * @private
     * @param {Number/Object} truncate
     * @return {Object}
     */


    Autolinker.prototype.normalizeTruncateCfg = function (truncate) {
      if (typeof truncate === 'number') {
        return {
          length: truncate,
          location: 'end'
        };
      } else {
        // object, or undefined/null
        return defaults$1(truncate || {}, {
          length: Number.POSITIVE_INFINITY,
          location: 'end'
        });
      }
    };
    /**
     * Parses the input `textOrHtml` looking for URLs, email addresses, phone
     * numbers, username handles, and hashtags (depending on the configuration
     * of the Autolinker instance), and returns an array of {@link Autolinker.match.Match}
     * objects describing those matches (without making any replacements).
     *
     * This method is used by the {@link #link} method, but can also be used to
     * simply do parsing of the input in order to discover what kinds of links
     * there are and how many.
     *
     * Example usage:
     *
     *     var autolinker = new Autolinker( {
     *         urls: true,
     *         email: true
     *     } );
     *
     *     var matches = autolinker.parse( "Hello google.com, I am asdf@asdf.com" );
     *
     *     console.log( matches.length );           // 2
     *     console.log( matches[ 0 ].getType() );   // 'url'
     *     console.log( matches[ 0 ].getUrl() );    // 'google.com'
     *     console.log( matches[ 1 ].getType() );   // 'email'
     *     console.log( matches[ 1 ].getEmail() );  // 'asdf@asdf.com'
     *
     * @param {String} textOrHtml The HTML or text to find matches within
     *   (depending on if the {@link #urls}, {@link #email}, {@link #phone},
     *   {@link #hashtag}, and {@link #mention} options are enabled).
     * @return {Autolinker.match.Match[]} The array of Matches found in the
     *   given input `textOrHtml`.
     */


    Autolinker.prototype.parse = function (textOrHtml) {
      var _this = this;

      var skipTagNames = ['a', 'style', 'script'],
          skipTagsStackCount = 0,
          // used to only Autolink text outside of anchor/script/style tags. We don't want to autolink something that is already linked inside of an <a> tag, for instance
      matches = []; // Find all matches within the `textOrHtml` (but not matches that are
      // already nested within <a>, <style> and <script> tags)

      parseHtml(textOrHtml, {
        onOpenTag: function onOpenTag(tagName) {
          if (skipTagNames.indexOf(tagName) >= 0) {
            skipTagsStackCount++;
          }
        },
        onText: function onText(text, offset) {
          // Only process text nodes that are not within an <a>, <style> or <script> tag
          if (skipTagsStackCount === 0) {
            // "Walk around" common HTML entities. An '&nbsp;' (for example)
            // could be at the end of a URL, but we don't want to 
            // include the trailing '&' in the URL. See issue #76
            // TODO: Handle HTML entities separately in parseHtml() and
            // don't emit them as "text" except for &amp; entities
            var htmlCharacterEntitiesRegex = /(&nbsp;|&#160;|&lt;|&#60;|&gt;|&#62;|&quot;|&#34;|&#39;)/gi;
            var textSplit = splitAndCapture(text, htmlCharacterEntitiesRegex);
            var currentOffset_1 = offset;
            textSplit.forEach(function (splitText, i) {
              // even number matches are text, odd numbers are html entities
              if (i % 2 === 0) {
                var textNodeMatches = _this.parseText(splitText, currentOffset_1);

                matches.push.apply(matches, textNodeMatches);
              }

              currentOffset_1 += splitText.length;
            });
          }
        },
        onCloseTag: function onCloseTag(tagName) {
          if (skipTagNames.indexOf(tagName) >= 0) {
            skipTagsStackCount = Math.max(skipTagsStackCount - 1, 0); // attempt to handle extraneous </a> tags by making sure the stack count never goes below 0
          }
        },
        onComment: function onComment(offset) {},
        onDoctype: function onDoctype(offset) {}
      }); // After we have found all matches, remove subsequent matches that
      // overlap with a previous match. This can happen for instance with URLs,
      // where the url 'google.com/#link' would match '#link' as a hashtag.

      matches = this.compactMatches(matches); // And finally, remove matches for match types that have been turned
      // off. We needed to have all match types turned on initially so that
      // things like hashtags could be filtered out if they were really just
      // part of a URL match (for instance, as a named anchor).

      matches = this.removeUnwantedMatches(matches);
      return matches;
    };
    /**
     * After we have found all matches, we need to remove matches that overlap
     * with a previous match. This can happen for instance with URLs, where the
     * url 'google.com/#link' would match '#link' as a hashtag. Because the
     * '#link' part is contained in a larger match that comes before the HashTag
     * match, we'll remove the HashTag match.
     *
     * @private
     * @param {Autolinker.match.Match[]} matches
     * @return {Autolinker.match.Match[]}
     */


    Autolinker.prototype.compactMatches = function (matches) {
      // First, the matches need to be sorted in order of offset
      matches.sort(function (a, b) {
        return a.getOffset() - b.getOffset();
      });

      for (var i = 0; i < matches.length - 1; i++) {
        var match = matches[i],
            offset = match.getOffset(),
            matchedTextLength = match.getMatchedText().length,
            endIdx = offset + matchedTextLength;

        if (i + 1 < matches.length) {
          // Remove subsequent matches that equal offset with current match
          if (matches[i + 1].getOffset() === offset) {
            var removeIdx = matches[i + 1].getMatchedText().length > matchedTextLength ? i : i + 1;
            matches.splice(removeIdx, 1);
            continue;
          } // Remove subsequent matches that overlap with the current match


          if (matches[i + 1].getOffset() < endIdx) {
            matches.splice(i + 1, 1);
          }
        }
      }

      return matches;
    };
    /**
     * Removes matches for matchers that were turned off in the options. For
     * example, if {@link #hashtag hashtags} were not to be matched, we'll
     * remove them from the `matches` array here.
     *
     * Note: we *must* use all Matchers on the input string, and then filter
     * them out later. For example, if the options were `{ url: false, hashtag: true }`,
     * we wouldn't want to match the text '#link' as a HashTag inside of the text
     * 'google.com/#link'. The way the algorithm works is that we match the full
     * URL first (which prevents the accidental HashTag match), and then we'll
     * simply throw away the URL match.
     *
     * @private
     * @param {Autolinker.match.Match[]} matches The array of matches to remove
     *   the unwanted matches from. Note: this array is mutated for the
     *   removals.
     * @return {Autolinker.match.Match[]} The mutated input `matches` array.
     */


    Autolinker.prototype.removeUnwantedMatches = function (matches) {
      if (!this.hashtag) remove(matches, function (match) {
        return match.getType() === 'hashtag';
      });
      if (!this.email) remove(matches, function (match) {
        return match.getType() === 'email';
      });
      if (!this.phone) remove(matches, function (match) {
        return match.getType() === 'phone';
      });
      if (!this.mention) remove(matches, function (match) {
        return match.getType() === 'mention';
      });

      if (!this.urls.schemeMatches) {
        remove(matches, function (m) {
          return m.getType() === 'url' && m.getUrlMatchType() === 'scheme';
        });
      }

      if (!this.urls.wwwMatches) {
        remove(matches, function (m) {
          return m.getType() === 'url' && m.getUrlMatchType() === 'www';
        });
      }

      if (!this.urls.tldMatches) {
        remove(matches, function (m) {
          return m.getType() === 'url' && m.getUrlMatchType() === 'tld';
        });
      }

      return matches;
    };
    /**
     * Parses the input `text` looking for URLs, email addresses, phone
     * numbers, username handles, and hashtags (depending on the configuration
     * of the Autolinker instance), and returns an array of {@link Autolinker.match.Match}
     * objects describing those matches.
     *
     * This method processes a **non-HTML string**, and is used to parse and
     * match within the text nodes of an HTML string. This method is used
     * internally by {@link #parse}.
     *
     * @private
     * @param {String} text The text to find matches within (depending on if the
     *   {@link #urls}, {@link #email}, {@link #phone},
     *   {@link #hashtag}, and {@link #mention} options are enabled). This must be a non-HTML string.
     * @param {Number} [offset=0] The offset of the text node within the
     *   original string. This is used when parsing with the {@link #parse}
     *   method to generate correct offsets within the {@link Autolinker.match.Match}
     *   instances, but may be omitted if calling this method publicly.
     * @return {Autolinker.match.Match[]} The array of Matches found in the
     *   given input `text`.
     */


    Autolinker.prototype.parseText = function (text, offset) {
      if (offset === void 0) {
        offset = 0;
      }

      offset = offset || 0;
      var matchers = this.getMatchers(),
          matches = [];

      for (var i = 0, numMatchers = matchers.length; i < numMatchers; i++) {
        var textMatches = matchers[i].parseMatches(text); // Correct the offset of each of the matches. They are originally
        // the offset of the match within the provided text node, but we
        // need to correct them to be relative to the original HTML input
        // string (i.e. the one provided to #parse).

        for (var j = 0, numTextMatches = textMatches.length; j < numTextMatches; j++) {
          textMatches[j].setOffset(offset + textMatches[j].getOffset());
        }

        matches.push.apply(matches, textMatches);
      }

      return matches;
    };
    /**
     * Automatically links URLs, Email addresses, Phone numbers, Hashtags,
     * and Mentions (Twitter, Instagram, Soundcloud) found in the given chunk of HTML. Does not link
     * URLs found within HTML tags.
     *
     * For instance, if given the text: `You should go to http://www.yahoo.com`,
     * then the result will be `You should go to
     * &lt;a href="http://www.yahoo.com"&gt;http://www.yahoo.com&lt;/a&gt;`
     *
     * This method finds the text around any HTML elements in the input
     * `textOrHtml`, which will be the text that is processed. Any original HTML
     * elements will be left as-is, as well as the text that is already wrapped
     * in anchor (&lt;a&gt;) tags.
     *
     * @param {String} textOrHtml The HTML or text to autolink matches within
     *   (depending on if the {@link #urls}, {@link #email}, {@link #phone}, {@link #hashtag}, and {@link #mention} options are enabled).
     * @return {String} The HTML, with matches automatically linked.
     */


    Autolinker.prototype.link = function (textOrHtml) {
      if (!textOrHtml) {
        return "";
      } // handle `null` and `undefined`


      var matches = this.parse(textOrHtml),
          newHtml = [],
          lastIndex = 0;

      for (var i = 0, len = matches.length; i < len; i++) {
        var match = matches[i];
        newHtml.push(textOrHtml.substring(lastIndex, match.getOffset()));
        newHtml.push(this.createMatchReturnVal(match));
        lastIndex = match.getOffset() + match.getMatchedText().length;
      }

      newHtml.push(textOrHtml.substring(lastIndex)); // handle the text after the last match

      return newHtml.join('');
    };
    /**
     * Creates the return string value for a given match in the input string.
     *
     * This method handles the {@link #replaceFn}, if one was provided.
     *
     * @private
     * @param {Autolinker.match.Match} match The Match object that represents
     *   the match.
     * @return {String} The string that the `match` should be replaced with.
     *   This is usually the anchor tag string, but may be the `matchStr` itself
     *   if the match is not to be replaced.
     */


    Autolinker.prototype.createMatchReturnVal = function (match) {
      // Handle a custom `replaceFn` being provided
      var replaceFnResult;

      if (this.replaceFn) {
        replaceFnResult = this.replaceFn.call(this.context, match); // Autolinker instance is the context
      }

      if (typeof replaceFnResult === 'string') {
        return replaceFnResult; // `replaceFn` returned a string, use that
      } else if (replaceFnResult === false) {
        return match.getMatchedText(); // no replacement for the match
      } else if (replaceFnResult instanceof HtmlTag) {
        return replaceFnResult.toAnchorString();
      } else {
        // replaceFnResult === true, or no/unknown return value from function
        // Perform Autolinker's default anchor tag generation
        var anchorTag = match.buildTag(); // returns an Autolinker.HtmlTag instance

        return anchorTag.toAnchorString();
      }
    };
    /**
     * Lazily instantiates and returns the {@link Autolinker.matcher.Matcher}
     * instances for this Autolinker instance.
     *
     * @private
     * @return {Autolinker.matcher.Matcher[]}
     */


    Autolinker.prototype.getMatchers = function () {
      if (!this.matchers) {
        var tagBuilder = this.getTagBuilder();
        var matchers = [new HashtagMatcher({
          tagBuilder: tagBuilder,
          serviceName: this.hashtag
        }), new EmailMatcher({
          tagBuilder: tagBuilder
        }), new PhoneMatcher({
          tagBuilder: tagBuilder
        }), new MentionMatcher({
          tagBuilder: tagBuilder,
          serviceName: this.mention
        }), new UrlMatcher({
          tagBuilder: tagBuilder,
          stripPrefix: this.stripPrefix,
          stripTrailingSlash: this.stripTrailingSlash,
          decodePercentEncoding: this.decodePercentEncoding
        })];
        return this.matchers = matchers;
      } else {
        return this.matchers;
      }
    };
    /**
     * Returns the {@link #tagBuilder} instance for this Autolinker instance,
     * lazily instantiating it if it does not yet exist.
     *
     * @private
     * @return {Autolinker.AnchorTagBuilder}
     */


    Autolinker.prototype.getTagBuilder = function () {
      var tagBuilder = this.tagBuilder;

      if (!tagBuilder) {
        tagBuilder = this.tagBuilder = new AnchorTagBuilder({
          newWindow: this.newWindow,
          truncate: this.truncate,
          className: this.className
        });
      }

      return tagBuilder;
    };
    /**
     * @static
     * @property {String} version
     *
     * The Autolinker version number in the form major.minor.patch
     *
     * Ex: 0.25.1
     */


    Autolinker.version = '3.12.0';
    /**
     * For backwards compatibility with Autolinker 1.x, the AnchorTagBuilder
     * class is provided as a static on the Autolinker class.
     */

    Autolinker.AnchorTagBuilder = AnchorTagBuilder;
    /**
     * For backwards compatibility with Autolinker 1.x, the HtmlTag class is
     * provided as a static on the Autolinker class.
     */

    Autolinker.HtmlTag = HtmlTag;
    /**
     * For backwards compatibility with Autolinker 1.x, the Matcher classes are
     * provided as statics on the Autolinker class.
     */

    Autolinker.matcher = {
      Email: EmailMatcher,
      Hashtag: HashtagMatcher,
      Matcher: Matcher,
      Mention: MentionMatcher,
      Phone: PhoneMatcher,
      Url: UrlMatcher
    };
    /**
     * For backwards compatibility with Autolinker 1.x, the Match classes are
     * provided as statics on the Autolinker class.
     */

    Autolinker.match = {
      Email: EmailMatch,
      Hashtag: HashtagMatch,
      Match: Match,
      Mention: MentionMatch,
      Phone: PhoneMatch,
      Url: UrlMatch
    };
    return Autolinker;
  }();

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
  /**
   * Класс для сериализации приходящих сообщений от сервера
   * @class
   * @name MessagesModel
   * @requires autolinker
   */

  var MessagesModel =
  /*#__PURE__*/
  function () {
    function MessagesModel(messages) {
      _classCallCheck(this, MessagesModel);

      this.autolinker = new Autolinker({
        truncate: {
          length: 34,
          location: 'smart'
        }
      });
      this.messages = messages;
    }
    /**
     * @function
     * @name textFormat
     * @param {string} text - Строка с сообщением
     * @description - Форматирование строки с автоматическим созданием парсинга ссылок и переносом слов
     * @requires autolinker
     * @return {string}
     */


    _createClass(MessagesModel, [{
      key: "_textFormat",
      value: function _textFormat(text) {
        if (!text) {
          return;
        }

        var regexp = /\r\n/g;
        var format = text.replace(regexp, '</br>');
        return this.autolinker.link(format);
      }
    }, {
      key: "getMessages",
      value: function getMessages() {
        var _this = this;

        var messages = null;

        if (Array.isArray(this.messages)) {
          messages = this.messages.map(function (item) {
            return _objectSpread({
              time: getTime(),
              direction: 'left'
            }, item, {
              text: _this._textFormat(item.text)
            });
          });
        } else if (_typeof(this.messages) === 'object') {
          messages = {
            time: getTime(),
            direction: 'right',
            type: 'text',
            text: this._textFormat(this.messages.text)
          };
        }

        return messages;
      }
    }]);

    return MessagesModel;
  }();

  function createChatMessages() {
    var _writable = writable([]),
        subscribe = _writable.subscribe,
        update = _writable.update;

    var messageReplyEvent = new CustomEvent(EVENTS.MESSAGE_REPLY_NAME);
    return {
      subscribe: subscribe,
      add: function add(newValue) {
        return update(function (value) {
          messageReplyEvent.dispatchEvent(newValue);
          value.find(function (item) {
            var isActionsType = item.type === 'actions'; // Блокировать кнопки в истории

            if (isActionsType) {
              item.actions.forEach(function (action) {
                action.disabled = true;
              });
            }
          });
          return value.concat(newValue);
        });
      }
    };
  }

  var chatMessages = createChatMessages();
  var isMessagesLoading = writable(false);

  var Chat =
  /*#__PURE__*/
  function () {
    function Chat() {
      _classCallCheck(this, Chat);

      this.isDev = get_store_value(isDev);
      this.token = get_store_value(chatToken);
      this.baseUrl = get_store_value(chatBaseUrl);
      this.locale = get_store_value(chatLocale);
      this.messageSendEvent = new CustomEvent(EVENTS.MESSAGE_SEND_NAME);
    }
    /**
     * @function
     * @name setMessages
     * @description добавляет сообщение или сообщения в store
     * @param {object|array} data - одно или несколько сообщений
     */


    _createClass(Chat, [{
      key: "setMessages",
      value: function setMessages(data) {
        var messages = new MessagesModel(data);
        chatMessages.add(messages.getMessages());
      }
    }]);

    return Chat;
  }();

  /**
   * Parses an URI
   *
   * @author Steven Levithan <stevenlevithan.com> (MIT license)
   * @api private
   */
  var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
  var parts = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'];

  var parseuri = function parseuri(str) {
    var src = str,
        b = str.indexOf('['),
        e = str.indexOf(']');

    if (b != -1 && e != -1) {
      str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
    }

    var m = re.exec(str || ''),
        uri = {},
        i = 14;

    while (i--) {
      uri[parts[i]] = m[i] || '';
    }

    if (b != -1 && e != -1) {
      uri.source = src;
      uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
      uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
      uri.ipv6uri = true;
    }

    return uri;
  };

  /**
   * Helpers.
   */
  var s = 1000;
  var m = s * 60;
  var h = m * 60;
  var d = h * 24;
  var w = d * 7;
  var y = d * 365.25;
  /**
   * Parse or format the given `val`.
   *
   * Options:
   *
   *  - `long` verbose formatting [false]
   *
   * @param {String|Number} val
   * @param {Object} [options]
   * @throws {Error} throw an error if val is not a non-empty string or a number
   * @return {String|Number}
   * @api public
   */

  var ms = function ms(val, options) {
    options = options || {};

    var type = _typeof(val);

    if (type === 'string' && val.length > 0) {
      return parse(val);
    } else if (type === 'number' && isFinite(val)) {
      return options.long ? fmtLong(val) : fmtShort(val);
    }

    throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
  };
  /**
   * Parse the given `str` and return milliseconds.
   *
   * @param {String} str
   * @return {Number}
   * @api private
   */


  function parse(str) {
    str = String(str);

    if (str.length > 100) {
      return;
    }

    var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);

    if (!match) {
      return;
    }

    var n = parseFloat(match[1]);
    var type = (match[2] || 'ms').toLowerCase();

    switch (type) {
      case 'years':
      case 'year':
      case 'yrs':
      case 'yr':
      case 'y':
        return n * y;

      case 'weeks':
      case 'week':
      case 'w':
        return n * w;

      case 'days':
      case 'day':
      case 'd':
        return n * d;

      case 'hours':
      case 'hour':
      case 'hrs':
      case 'hr':
      case 'h':
        return n * h;

      case 'minutes':
      case 'minute':
      case 'mins':
      case 'min':
      case 'm':
        return n * m;

      case 'seconds':
      case 'second':
      case 'secs':
      case 'sec':
      case 's':
        return n * s;

      case 'milliseconds':
      case 'millisecond':
      case 'msecs':
      case 'msec':
      case 'ms':
        return n;

      default:
        return undefined;
    }
  }
  /**
   * Short format for `ms`.
   *
   * @param {Number} ms
   * @return {String}
   * @api private
   */


  function fmtShort(ms) {
    var msAbs = Math.abs(ms);

    if (msAbs >= d) {
      return Math.round(ms / d) + 'd';
    }

    if (msAbs >= h) {
      return Math.round(ms / h) + 'h';
    }

    if (msAbs >= m) {
      return Math.round(ms / m) + 'm';
    }

    if (msAbs >= s) {
      return Math.round(ms / s) + 's';
    }

    return ms + 'ms';
  }
  /**
   * Long format for `ms`.
   *
   * @param {Number} ms
   * @return {String}
   * @api private
   */


  function fmtLong(ms) {
    var msAbs = Math.abs(ms);

    if (msAbs >= d) {
      return plural(ms, msAbs, d, 'day');
    }

    if (msAbs >= h) {
      return plural(ms, msAbs, h, 'hour');
    }

    if (msAbs >= m) {
      return plural(ms, msAbs, m, 'minute');
    }

    if (msAbs >= s) {
      return plural(ms, msAbs, s, 'second');
    }

    return ms + ' ms';
  }
  /**
   * Pluralization helper.
   */


  function plural(ms, msAbs, n, name) {
    var isPlural = msAbs >= n * 1.5;
    return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
  }

  /**
   * This is the common logic for both the Node.js and web browser
   * implementations of `debug()`.
   */

  function setup(env) {
    createDebug.debug = createDebug;
    createDebug.default = createDebug;
    createDebug.coerce = coerce;
    createDebug.disable = disable;
    createDebug.enable = enable;
    createDebug.enabled = enabled;
    createDebug.humanize = ms;
    Object.keys(env).forEach(function (key) {
      createDebug[key] = env[key];
    });
    /**
    * Active `debug` instances.
    */

    createDebug.instances = [];
    /**
    * The currently active debug mode names, and names to skip.
    */

    createDebug.names = [];
    createDebug.skips = [];
    /**
    * Map of special "%n" handling functions, for the debug "format" argument.
    *
    * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
    */

    createDebug.formatters = {};
    /**
    * Selects a color for a debug namespace
    * @param {String} namespace The namespace string for the for the debug instance to be colored
    * @return {Number|String} An ANSI color code for the given namespace
    * @api private
    */

    function selectColor(namespace) {
      var hash = 0;

      for (var i = 0; i < namespace.length; i++) {
        hash = (hash << 5) - hash + namespace.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
      }

      return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
    }

    createDebug.selectColor = selectColor;
    /**
    * Create a debugger with the given `namespace`.
    *
    * @param {String} namespace
    * @return {Function}
    * @api public
    */

    function createDebug(namespace) {
      var prevTime;

      function debug() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        // Disabled?
        if (!debug.enabled) {
          return;
        }

        var self = debug; // Set `diff` timestamp

        var curr = Number(new Date());
        var ms = curr - (prevTime || curr);
        self.diff = ms;
        self.prev = prevTime;
        self.curr = curr;
        prevTime = curr;
        args[0] = createDebug.coerce(args[0]);

        if (typeof args[0] !== 'string') {
          // Anything else let's inspect with %O
          args.unshift('%O');
        } // Apply any `formatters` transformations


        var index = 0;
        args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
          // If we encounter an escaped % then don't increase the array index
          if (match === '%%') {
            return match;
          }

          index++;
          var formatter = createDebug.formatters[format];

          if (typeof formatter === 'function') {
            var val = args[index];
            match = formatter.call(self, val); // Now we need to remove `args[index]` since it's inlined in the `format`

            args.splice(index, 1);
            index--;
          }

          return match;
        }); // Apply env-specific formatting (colors, etc.)

        createDebug.formatArgs.call(self, args);
        var logFn = self.log || createDebug.log;
        logFn.apply(self, args);
      }

      debug.namespace = namespace;
      debug.enabled = createDebug.enabled(namespace);
      debug.useColors = createDebug.useColors();
      debug.color = selectColor(namespace);
      debug.destroy = destroy;
      debug.extend = extend; // Debug.formatArgs = formatArgs;
      // debug.rawLog = rawLog;
      // env-specific initialization logic for debug instances

      if (typeof createDebug.init === 'function') {
        createDebug.init(debug);
      }

      createDebug.instances.push(debug);
      return debug;
    }

    function destroy() {
      var index = createDebug.instances.indexOf(this);

      if (index !== -1) {
        createDebug.instances.splice(index, 1);
        return true;
      }

      return false;
    }

    function extend(namespace, delimiter) {
      var newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
      newDebug.log = this.log;
      return newDebug;
    }
    /**
    * Enables a debug mode by namespaces. This can include modes
    * separated by a colon and wildcards.
    *
    * @param {String} namespaces
    * @api public
    */


    function enable(namespaces) {
      createDebug.save(namespaces);
      createDebug.names = [];
      createDebug.skips = [];
      var i;
      var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
      var len = split.length;

      for (i = 0; i < len; i++) {
        if (!split[i]) {
          // ignore empty strings
          continue;
        }

        namespaces = split[i].replace(/\*/g, '.*?');

        if (namespaces[0] === '-') {
          createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
        } else {
          createDebug.names.push(new RegExp('^' + namespaces + '$'));
        }
      }

      for (i = 0; i < createDebug.instances.length; i++) {
        var instance = createDebug.instances[i];
        instance.enabled = createDebug.enabled(instance.namespace);
      }
    }
    /**
    * Disable debug output.
    *
    * @return {String} namespaces
    * @api public
    */


    function disable() {
      var namespaces = [].concat(_toConsumableArray(createDebug.names.map(toNamespace)), _toConsumableArray(createDebug.skips.map(toNamespace).map(function (namespace) {
        return '-' + namespace;
      }))).join(',');
      createDebug.enable('');
      return namespaces;
    }
    /**
    * Returns true if the given mode name is enabled, false otherwise.
    *
    * @param {String} name
    * @return {Boolean}
    * @api public
    */


    function enabled(name) {
      if (name[name.length - 1] === '*') {
        return true;
      }

      var i;
      var len;

      for (i = 0, len = createDebug.skips.length; i < len; i++) {
        if (createDebug.skips[i].test(name)) {
          return false;
        }
      }

      for (i = 0, len = createDebug.names.length; i < len; i++) {
        if (createDebug.names[i].test(name)) {
          return true;
        }
      }

      return false;
    }
    /**
    * Convert regexp to namespace
    *
    * @param {RegExp} regxep
    * @return {String} namespace
    * @api private
    */


    function toNamespace(regexp) {
      return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, '*');
    }
    /**
    * Coerce `val`.
    *
    * @param {Mixed} val
    * @return {Mixed}
    * @api private
    */


    function coerce(val) {
      if (val instanceof Error) {
        return val.stack || val.message;
      }

      return val;
    }

    createDebug.enable(createDebug.load());
    return createDebug;
  }

  var common = setup;

  var browser = createCommonjsModule(function (module, exports) {
    /* eslint-env browser */

    /**
     * This is the web browser implementation of `debug()`.
     */
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    /**
     * Colors.
     */

    exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];
    /**
     * Currently only WebKit-based Web Inspectors, Firefox >= v31,
     * and the Firebug extension (any Firefox version) are known
     * to support "%c" CSS customizations.
     *
     * TODO: add a `localStorage` variable to explicitly enable/disable colors
     */
    // eslint-disable-next-line complexity

    function useColors() {
      // NB: In an Electron preload script, document will be defined but not fully
      // initialized. Since we know we're in Chrome, we'll just detect this case
      // explicitly
      if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
        return true;
      } // Internet Explorer and Edge do not support colors.


      if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      } // Is webkit? http://stackoverflow.com/a/16459606/376773
      // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632


      return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    /**
     * Colorize log arguments if enabled.
     *
     * @api public
     */


    function formatArgs(args) {
      args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);

      if (!this.useColors) {
        return;
      }

      var c = 'color: ' + this.color;
      args.splice(1, 0, c, 'color: inherit'); // The final "%c" is somewhat tricky, because there could be other
      // arguments passed either before or after the %c, so we need to
      // figure out the correct index to insert the CSS into

      var index = 0;
      var lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, function (match) {
        if (match === '%%') {
          return;
        }

        index++;

        if (match === '%c') {
          // We only are interested in the *last* %c
          // (the user may have provided their own)
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    /**
     * Invokes `console.log()` when available.
     * No-op when `console.log` is not a "function".
     *
     * @api public
     */


    function log() {
      var _console;

      // This hackery is required for IE8/9, where
      // the `console.log` function doesn't have 'apply'
      return (typeof console === "undefined" ? "undefined" : _typeof(console)) === 'object' && console.log && (_console = console).log.apply(_console, arguments);
    }
    /**
     * Save `namespaces`.
     *
     * @param {String} namespaces
     * @api private
     */


    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem('debug', namespaces);
        } else {
          exports.storage.removeItem('debug');
        }
      } catch (error) {// Swallow
        // XXX (@Qix-) should we be logging these?
      }
    }
    /**
     * Load `namespaces`.
     *
     * @return {String} returns the previously persisted debug modes
     * @api private
     */


    function load() {
      var r;

      try {
        r = exports.storage.getItem('debug');
      } catch (error) {} // Swallow
      // XXX (@Qix-) should we be logging these?
      // If debug isn't set in LS, and we're in Electron, try to load $DEBUG


      if (!r && typeof process !== 'undefined' && 'env' in process) {
        r = process.env.DEBUG;
      }

      return r;
    }
    /**
     * Localstorage attempts to return the localstorage.
     *
     * This is necessary because safari throws
     * when a user disables cookies/localstorage
     * and you attempt to access it.
     *
     * @return {LocalStorage}
     * @api private
     */


    function localstorage() {
      try {
        // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
        // The Browser also has localStorage in the global context.
        return localStorage;
      } catch (error) {// Swallow
        // XXX (@Qix-) should we be logging these?
      }
    }

    module.exports = common(exports);
    var formatters = module.exports.formatters;
    /**
     * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
     */

    formatters.j = function (v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return '[UnexpectedJSONParseError]: ' + error.message;
      }
    };
  });
  var browser_1 = browser.log;
  var browser_2 = browser.formatArgs;
  var browser_3 = browser.save;
  var browser_4 = browser.load;
  var browser_5 = browser.useColors;
  var browser_6 = browser.storage;
  var browser_7 = browser.colors;

  /**
   * Module dependencies.
   */

  var debug = browser('socket.io-client:url');
  /**
   * Module exports.
   */

  var url_1 = url;
  /**
   * URL parser.
   *
   * @param {String} url
   * @param {Object} An object meant to mimic window.location.
   *                 Defaults to window.location.
   * @api public
   */

  function url(uri, loc) {
    var obj = uri; // default to window.location

    loc = loc || typeof location !== 'undefined' && location;
    if (null == uri) uri = loc.protocol + '//' + loc.host; // relative path support

    if ('string' === typeof uri) {
      if ('/' === uri.charAt(0)) {
        if ('/' === uri.charAt(1)) {
          uri = loc.protocol + uri;
        } else {
          uri = loc.host + uri;
        }
      }

      if (!/^(https?|wss?):\/\//.test(uri)) {
        debug('protocol-less url %s', uri);

        if ('undefined' !== typeof loc) {
          uri = loc.protocol + '//' + uri;
        } else {
          uri = 'https://' + uri;
        }
      } // parse


      debug('parse %s', uri);
      obj = parseuri(uri);
    } // make sure we treat `localhost:80` and `localhost` equally


    if (!obj.port) {
      if (/^(http|ws)$/.test(obj.protocol)) {
        obj.port = '80';
      } else if (/^(http|ws)s$/.test(obj.protocol)) {
        obj.port = '443';
      }
    }

    obj.path = obj.path || '/';
    var ipv6 = obj.host.indexOf(':') !== -1;
    var host = ipv6 ? '[' + obj.host + ']' : obj.host; // define unique id

    obj.id = obj.protocol + '://' + host + ':' + obj.port; // define href

    obj.href = obj.protocol + '://' + host + (loc && loc.port === obj.port ? '' : ':' + obj.port);
    return obj;
  }

  /**
   * Helpers.
   */
  var s$1 = 1000;
  var m$1 = s$1 * 60;
  var h$1 = m$1 * 60;
  var d$1 = h$1 * 24;
  var y$1 = d$1 * 365.25;
  /**
   * Parse or format the given `val`.
   *
   * Options:
   *
   *  - `long` verbose formatting [false]
   *
   * @param {String|Number} val
   * @param {Object} [options]
   * @throws {Error} throw an error if val is not a non-empty string or a number
   * @return {String|Number}
   * @api public
   */

  var ms$1 = function ms(val, options) {
    options = options || {};

    var type = _typeof(val);

    if (type === 'string' && val.length > 0) {
      return parse$1(val);
    } else if (type === 'number' && isNaN(val) === false) {
      return options.long ? fmtLong$1(val) : fmtShort$1(val);
    }

    throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
  };
  /**
   * Parse the given `str` and return milliseconds.
   *
   * @param {String} str
   * @return {Number}
   * @api private
   */


  function parse$1(str) {
    str = String(str);

    if (str.length > 100) {
      return;
    }

    var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);

    if (!match) {
      return;
    }

    var n = parseFloat(match[1]);
    var type = (match[2] || 'ms').toLowerCase();

    switch (type) {
      case 'years':
      case 'year':
      case 'yrs':
      case 'yr':
      case 'y':
        return n * y$1;

      case 'days':
      case 'day':
      case 'd':
        return n * d$1;

      case 'hours':
      case 'hour':
      case 'hrs':
      case 'hr':
      case 'h':
        return n * h$1;

      case 'minutes':
      case 'minute':
      case 'mins':
      case 'min':
      case 'm':
        return n * m$1;

      case 'seconds':
      case 'second':
      case 'secs':
      case 'sec':
      case 's':
        return n * s$1;

      case 'milliseconds':
      case 'millisecond':
      case 'msecs':
      case 'msec':
      case 'ms':
        return n;

      default:
        return undefined;
    }
  }
  /**
   * Short format for `ms`.
   *
   * @param {Number} ms
   * @return {String}
   * @api private
   */


  function fmtShort$1(ms) {
    if (ms >= d$1) {
      return Math.round(ms / d$1) + 'd';
    }

    if (ms >= h$1) {
      return Math.round(ms / h$1) + 'h';
    }

    if (ms >= m$1) {
      return Math.round(ms / m$1) + 'm';
    }

    if (ms >= s$1) {
      return Math.round(ms / s$1) + 's';
    }

    return ms + 'ms';
  }
  /**
   * Long format for `ms`.
   *
   * @param {Number} ms
   * @return {String}
   * @api private
   */


  function fmtLong$1(ms) {
    return plural$1(ms, d$1, 'day') || plural$1(ms, h$1, 'hour') || plural$1(ms, m$1, 'minute') || plural$1(ms, s$1, 'second') || ms + ' ms';
  }
  /**
   * Pluralization helper.
   */


  function plural$1(ms, n, name) {
    if (ms < n) {
      return;
    }

    if (ms < n * 1.5) {
      return Math.floor(ms / n) + ' ' + name;
    }

    return Math.ceil(ms / n) + ' ' + name + 's';
  }

  var debug$1 = createCommonjsModule(function (module, exports) {
    /**
     * This is the common logic for both the Node.js and web browser
     * implementations of `debug()`.
     *
     * Expose `debug()` as the module.
     */
    exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
    exports.coerce = coerce;
    exports.disable = disable;
    exports.enable = enable;
    exports.enabled = enabled;
    exports.humanize = ms$1;
    /**
     * Active `debug` instances.
     */

    exports.instances = [];
    /**
     * The currently active debug mode names, and names to skip.
     */

    exports.names = [];
    exports.skips = [];
    /**
     * Map of special "%n" handling functions, for the debug "format" argument.
     *
     * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
     */

    exports.formatters = {};
    /**
     * Select a color.
     * @param {String} namespace
     * @return {Number}
     * @api private
     */

    function selectColor(namespace) {
      var hash = 0,
          i;

      for (i in namespace) {
        hash = (hash << 5) - hash + namespace.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
      }

      return exports.colors[Math.abs(hash) % exports.colors.length];
    }
    /**
     * Create a debugger with the given `namespace`.
     *
     * @param {String} namespace
     * @return {Function}
     * @api public
     */


    function createDebug(namespace) {
      var prevTime;

      function debug() {
        // disabled?
        if (!debug.enabled) return;
        var self = debug; // set `diff` timestamp

        var curr = +new Date();
        var ms = curr - (prevTime || curr);
        self.diff = ms;
        self.prev = prevTime;
        self.curr = curr;
        prevTime = curr; // turn the `arguments` into a proper Array

        var args = new Array(arguments.length);

        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }

        args[0] = exports.coerce(args[0]);

        if ('string' !== typeof args[0]) {
          // anything else let's inspect with %O
          args.unshift('%O');
        } // apply any `formatters` transformations


        var index = 0;
        args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
          // if we encounter an escaped % then don't increase the array index
          if (match === '%%') return match;
          index++;
          var formatter = exports.formatters[format];

          if ('function' === typeof formatter) {
            var val = args[index];
            match = formatter.call(self, val); // now we need to remove `args[index]` since it's inlined in the `format`

            args.splice(index, 1);
            index--;
          }

          return match;
        }); // apply env-specific formatting (colors, etc.)

        exports.formatArgs.call(self, args);
        var logFn = debug.log || exports.log || console.log.bind(console);
        logFn.apply(self, args);
      }

      debug.namespace = namespace;
      debug.enabled = exports.enabled(namespace);
      debug.useColors = exports.useColors();
      debug.color = selectColor(namespace);
      debug.destroy = destroy; // env-specific initialization logic for debug instances

      if ('function' === typeof exports.init) {
        exports.init(debug);
      }

      exports.instances.push(debug);
      return debug;
    }

    function destroy() {
      var index = exports.instances.indexOf(this);

      if (index !== -1) {
        exports.instances.splice(index, 1);
        return true;
      } else {
        return false;
      }
    }
    /**
     * Enables a debug mode by namespaces. This can include modes
     * separated by a colon and wildcards.
     *
     * @param {String} namespaces
     * @api public
     */


    function enable(namespaces) {
      exports.save(namespaces);
      exports.names = [];
      exports.skips = [];
      var i;
      var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
      var len = split.length;

      for (i = 0; i < len; i++) {
        if (!split[i]) continue; // ignore empty strings

        namespaces = split[i].replace(/\*/g, '.*?');

        if (namespaces[0] === '-') {
          exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
        } else {
          exports.names.push(new RegExp('^' + namespaces + '$'));
        }
      }

      for (i = 0; i < exports.instances.length; i++) {
        var instance = exports.instances[i];
        instance.enabled = exports.enabled(instance.namespace);
      }
    }
    /**
     * Disable debug output.
     *
     * @api public
     */


    function disable() {
      exports.enable('');
    }
    /**
     * Returns true if the given mode name is enabled, false otherwise.
     *
     * @param {String} name
     * @return {Boolean}
     * @api public
     */


    function enabled(name) {
      if (name[name.length - 1] === '*') {
        return true;
      }

      var i, len;

      for (i = 0, len = exports.skips.length; i < len; i++) {
        if (exports.skips[i].test(name)) {
          return false;
        }
      }

      for (i = 0, len = exports.names.length; i < len; i++) {
        if (exports.names[i].test(name)) {
          return true;
        }
      }

      return false;
    }
    /**
     * Coerce `val`.
     *
     * @param {Mixed} val
     * @return {Mixed}
     * @api private
     */


    function coerce(val) {
      if (val instanceof Error) return val.stack || val.message;
      return val;
    }
  });
  var debug_1 = debug$1.coerce;
  var debug_2 = debug$1.disable;
  var debug_3 = debug$1.enable;
  var debug_4 = debug$1.enabled;
  var debug_5 = debug$1.humanize;
  var debug_6 = debug$1.instances;
  var debug_7 = debug$1.names;
  var debug_8 = debug$1.skips;
  var debug_9 = debug$1.formatters;

  var browser$1 = createCommonjsModule(function (module, exports) {
    /**
     * This is the web browser implementation of `debug()`.
     *
     * Expose `debug()` as the module.
     */
    exports = module.exports = debug$1;
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = 'undefined' != typeof chrome && 'undefined' != typeof chrome.storage ? chrome.storage.local : localstorage();
    /**
     * Colors.
     */

    exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];
    /**
     * Currently only WebKit-based Web Inspectors, Firefox >= v31,
     * and the Firebug extension (any Firefox version) are known
     * to support "%c" CSS customizations.
     *
     * TODO: add a `localStorage` variable to explicitly enable/disable colors
     */

    function useColors() {
      // NB: In an Electron preload script, document will be defined but not fully
      // initialized. Since we know we're in Chrome, we'll just detect this case
      // explicitly
      if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
        return true;
      } // Internet Explorer and Edge do not support colors.


      if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      } // is webkit? http://stackoverflow.com/a/16459606/376773
      // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632


      return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || // is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // double check webkit in userAgent just in case we are in a worker
      typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    /**
     * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
     */


    exports.formatters.j = function (v) {
      try {
        return JSON.stringify(v);
      } catch (err) {
        return '[UnexpectedJSONParseError]: ' + err.message;
      }
    };
    /**
     * Colorize log arguments if enabled.
     *
     * @api public
     */


    function formatArgs(args) {
      var useColors = this.useColors;
      args[0] = (useColors ? '%c' : '') + this.namespace + (useColors ? ' %c' : ' ') + args[0] + (useColors ? '%c ' : ' ') + '+' + exports.humanize(this.diff);
      if (!useColors) return;
      var c = 'color: ' + this.color;
      args.splice(1, 0, c, 'color: inherit'); // the final "%c" is somewhat tricky, because there could be other
      // arguments passed either before or after the %c, so we need to
      // figure out the correct index to insert the CSS into

      var index = 0;
      var lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, function (match) {
        if ('%%' === match) return;
        index++;

        if ('%c' === match) {
          // we only are interested in the *last* %c
          // (the user may have provided their own)
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    /**
     * Invokes `console.log()` when available.
     * No-op when `console.log` is not a "function".
     *
     * @api public
     */


    function log() {
      // this hackery is required for IE8/9, where
      // the `console.log` function doesn't have 'apply'
      return 'object' === (typeof console === "undefined" ? "undefined" : _typeof(console)) && console.log && Function.prototype.apply.call(console.log, console, arguments);
    }
    /**
     * Save `namespaces`.
     *
     * @param {String} namespaces
     * @api private
     */


    function save(namespaces) {
      try {
        if (null == namespaces) {
          exports.storage.removeItem('debug');
        } else {
          exports.storage.debug = namespaces;
        }
      } catch (e) {}
    }
    /**
     * Load `namespaces`.
     *
     * @return {String} returns the previously persisted debug modes
     * @api private
     */


    function load() {
      var r;

      try {
        r = exports.storage.debug;
      } catch (e) {} // If debug isn't set in LS, and we're in Electron, try to load $DEBUG


      if (!r && typeof process !== 'undefined' && 'env' in process) {
        r = process.env.DEBUG;
      }

      return r;
    }
    /**
     * Enable namespaces listed in `localStorage.debug` initially.
     */


    exports.enable(load());
    /**
     * Localstorage attempts to return the localstorage.
     *
     * This is necessary because safari throws
     * when a user disables cookies/localstorage
     * and you attempt to access it.
     *
     * @return {LocalStorage}
     * @api private
     */

    function localstorage() {
      try {
        return window.localStorage;
      } catch (e) {}
    }
  });
  var browser_1$1 = browser$1.log;
  var browser_2$1 = browser$1.formatArgs;
  var browser_3$1 = browser$1.save;
  var browser_4$1 = browser$1.load;
  var browser_5$1 = browser$1.useColors;
  var browser_6$1 = browser$1.storage;
  var browser_7$1 = browser$1.colors;

  var componentEmitter = createCommonjsModule(function (module) {
    /**
     * Expose `Emitter`.
     */
    {
      module.exports = Emitter;
    }
    /**
     * Initialize a new `Emitter`.
     *
     * @api public
     */


    function Emitter(obj) {
      if (obj) return mixin(obj);
    }
    /**
     * Mixin the emitter properties.
     *
     * @param {Object} obj
     * @return {Object}
     * @api private
     */

    function mixin(obj) {
      for (var key in Emitter.prototype) {
        obj[key] = Emitter.prototype[key];
      }

      return obj;
    }
    /**
     * Listen on the given `event` with `fn`.
     *
     * @param {String} event
     * @param {Function} fn
     * @return {Emitter}
     * @api public
     */


    Emitter.prototype.on = Emitter.prototype.addEventListener = function (event, fn) {
      this._callbacks = this._callbacks || {};
      (this._callbacks['$' + event] = this._callbacks['$' + event] || []).push(fn);
      return this;
    };
    /**
     * Adds an `event` listener that will be invoked a single
     * time then automatically removed.
     *
     * @param {String} event
     * @param {Function} fn
     * @return {Emitter}
     * @api public
     */


    Emitter.prototype.once = function (event, fn) {
      function on() {
        this.off(event, on);
        fn.apply(this, arguments);
      }

      on.fn = fn;
      this.on(event, on);
      return this;
    };
    /**
     * Remove the given callback for `event` or all
     * registered callbacks.
     *
     * @param {String} event
     * @param {Function} fn
     * @return {Emitter}
     * @api public
     */


    Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, fn) {
      this._callbacks = this._callbacks || {}; // all

      if (0 == arguments.length) {
        this._callbacks = {};
        return this;
      } // specific event


      var callbacks = this._callbacks['$' + event];
      if (!callbacks) return this; // remove all handlers

      if (1 == arguments.length) {
        delete this._callbacks['$' + event];
        return this;
      } // remove specific handler


      var cb;

      for (var i = 0; i < callbacks.length; i++) {
        cb = callbacks[i];

        if (cb === fn || cb.fn === fn) {
          callbacks.splice(i, 1);
          break;
        }
      }

      return this;
    };
    /**
     * Emit `event` with the given args.
     *
     * @param {String} event
     * @param {Mixed} ...
     * @return {Emitter}
     */


    Emitter.prototype.emit = function (event) {
      this._callbacks = this._callbacks || {};
      var args = [].slice.call(arguments, 1),
          callbacks = this._callbacks['$' + event];

      if (callbacks) {
        callbacks = callbacks.slice(0);

        for (var i = 0, len = callbacks.length; i < len; ++i) {
          callbacks[i].apply(this, args);
        }
      }

      return this;
    };
    /**
     * Return array of callbacks for `event`.
     *
     * @param {String} event
     * @return {Array}
     * @api public
     */


    Emitter.prototype.listeners = function (event) {
      this._callbacks = this._callbacks || {};
      return this._callbacks['$' + event] || [];
    };
    /**
     * Check if this emitter has `event` handlers.
     *
     * @param {String} event
     * @return {Boolean}
     * @api public
     */


    Emitter.prototype.hasListeners = function (event) {
      return !!this.listeners(event).length;
    };
  });

  var toString$3 = {}.toString;

  var isarray = Array.isArray || function (arr) {
    return toString$3.call(arr) == '[object Array]';
  };

  var isBuffer$1 = isBuf;
  var withNativeBuffer = typeof Buffer === 'function' && typeof Buffer.isBuffer === 'function';
  var withNativeArrayBuffer = typeof ArrayBuffer === 'function';

  var isView = function isView(obj) {
    return typeof ArrayBuffer.isView === 'function' ? ArrayBuffer.isView(obj) : obj.buffer instanceof ArrayBuffer;
  };
  /**
   * Returns true if obj is a buffer or an arraybuffer.
   *
   * @api private
   */


  function isBuf(obj) {
    return withNativeBuffer && Buffer.isBuffer(obj) || withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj));
  }

  /*global Blob,File*/

  /**
   * Module requirements
   */

  var toString$4 = Object.prototype.toString;
  var withNativeBlob = typeof Blob === 'function' || typeof Blob !== 'undefined' && toString$4.call(Blob) === '[object BlobConstructor]';
  var withNativeFile = typeof File === 'function' || typeof File !== 'undefined' && toString$4.call(File) === '[object FileConstructor]';
  /**
   * Replaces every Buffer | ArrayBuffer in packet with a numbered placeholder.
   * Anything with blobs or files should be fed through removeBlobs before coming
   * here.
   *
   * @param {Object} packet - socket.io event packet
   * @return {Object} with deconstructed packet and list of buffers
   * @api public
   */

  var deconstructPacket = function deconstructPacket(packet) {
    var buffers = [];
    var packetData = packet.data;
    var pack = packet;
    pack.data = _deconstructPacket(packetData, buffers);
    pack.attachments = buffers.length; // number of binary 'attachments'

    return {
      packet: pack,
      buffers: buffers
    };
  };

  function _deconstructPacket(data, buffers) {
    if (!data) return data;

    if (isBuffer$1(data)) {
      var placeholder = {
        _placeholder: true,
        num: buffers.length
      };
      buffers.push(data);
      return placeholder;
    } else if (isarray(data)) {
      var newData = new Array(data.length);

      for (var i = 0; i < data.length; i++) {
        newData[i] = _deconstructPacket(data[i], buffers);
      }

      return newData;
    } else if (_typeof(data) === 'object' && !(data instanceof Date)) {
      var newData = {};

      for (var key in data) {
        newData[key] = _deconstructPacket(data[key], buffers);
      }

      return newData;
    }

    return data;
  }
  /**
   * Reconstructs a binary packet from its placeholder packet and buffers
   *
   * @param {Object} packet - event packet with placeholders
   * @param {Array} buffers - binary buffers to put in placeholder positions
   * @return {Object} reconstructed packet
   * @api public
   */


  var reconstructPacket = function reconstructPacket(packet, buffers) {
    packet.data = _reconstructPacket(packet.data, buffers);
    packet.attachments = undefined; // no longer useful

    return packet;
  };

  function _reconstructPacket(data, buffers) {
    if (!data) return data;

    if (data && data._placeholder) {
      return buffers[data.num]; // appropriate buffer (should be natural order anyway)
    } else if (isarray(data)) {
      for (var i = 0; i < data.length; i++) {
        data[i] = _reconstructPacket(data[i], buffers);
      }
    } else if (_typeof(data) === 'object') {
      for (var key in data) {
        data[key] = _reconstructPacket(data[key], buffers);
      }
    }

    return data;
  }
  /**
   * Asynchronously removes Blobs or Files from data via
   * FileReader's readAsArrayBuffer method. Used before encoding
   * data as msgpack. Calls callback with the blobless data.
   *
   * @param {Object} data
   * @param {Function} callback
   * @api private
   */


  var removeBlobs = function removeBlobs(data, callback) {
    function _removeBlobs(obj, curKey, containingObject) {
      if (!obj) return obj; // convert any blob

      if (withNativeBlob && obj instanceof Blob || withNativeFile && obj instanceof File) {
        pendingBlobs++; // async filereader

        var fileReader = new FileReader();

        fileReader.onload = function () {
          // this.result == arraybuffer
          if (containingObject) {
            containingObject[curKey] = this.result;
          } else {
            bloblessData = this.result;
          } // if nothing pending its callback time


          if (! --pendingBlobs) {
            callback(bloblessData);
          }
        };

        fileReader.readAsArrayBuffer(obj); // blob -> arraybuffer
      } else if (isarray(obj)) {
        // handle array
        for (var i = 0; i < obj.length; i++) {
          _removeBlobs(obj[i], i, obj);
        }
      } else if (_typeof(obj) === 'object' && !isBuffer$1(obj)) {
        // and object
        for (var key in obj) {
          _removeBlobs(obj[key], key, obj);
        }
      }
    }

    var pendingBlobs = 0;
    var bloblessData = data;

    _removeBlobs(bloblessData);

    if (!pendingBlobs) {
      callback(bloblessData);
    }
  };

  var binary = {
    deconstructPacket: deconstructPacket,
    reconstructPacket: reconstructPacket,
    removeBlobs: removeBlobs
  };

  var socket_ioParser = createCommonjsModule(function (module, exports) {
    /**
     * Module dependencies.
     */
    var debug = browser$1('socket.io-parser');
    /**
     * Protocol version.
     *
     * @api public
     */

    exports.protocol = 4;
    /**
     * Packet types.
     *
     * @api public
     */

    exports.types = ['CONNECT', 'DISCONNECT', 'EVENT', 'ACK', 'ERROR', 'BINARY_EVENT', 'BINARY_ACK'];
    /**
     * Packet type `connect`.
     *
     * @api public
     */

    exports.CONNECT = 0;
    /**
     * Packet type `disconnect`.
     *
     * @api public
     */

    exports.DISCONNECT = 1;
    /**
     * Packet type `event`.
     *
     * @api public
     */

    exports.EVENT = 2;
    /**
     * Packet type `ack`.
     *
     * @api public
     */

    exports.ACK = 3;
    /**
     * Packet type `error`.
     *
     * @api public
     */

    exports.ERROR = 4;
    /**
     * Packet type 'binary event'
     *
     * @api public
     */

    exports.BINARY_EVENT = 5;
    /**
     * Packet type `binary ack`. For acks with binary arguments.
     *
     * @api public
     */

    exports.BINARY_ACK = 6;
    /**
     * Encoder constructor.
     *
     * @api public
     */

    exports.Encoder = Encoder;
    /**
     * Decoder constructor.
     *
     * @api public
     */

    exports.Decoder = Decoder;
    /**
     * A socket.io Encoder instance
     *
     * @api public
     */

    function Encoder() {}

    var ERROR_PACKET = exports.ERROR + '"encode error"';
    /**
     * Encode a packet as a single string if non-binary, or as a
     * buffer sequence, depending on packet type.
     *
     * @param {Object} obj - packet object
     * @param {Function} callback - function to handle encodings (likely engine.write)
     * @return Calls callback with Array of encodings
     * @api public
     */

    Encoder.prototype.encode = function (obj, callback) {
      debug('encoding packet %j', obj);

      if (exports.BINARY_EVENT === obj.type || exports.BINARY_ACK === obj.type) {
        encodeAsBinary(obj, callback);
      } else {
        var encoding = encodeAsString(obj);
        callback([encoding]);
      }
    };
    /**
     * Encode packet as string.
     *
     * @param {Object} packet
     * @return {String} encoded
     * @api private
     */


    function encodeAsString(obj) {
      // first is type
      var str = '' + obj.type; // attachments if we have them

      if (exports.BINARY_EVENT === obj.type || exports.BINARY_ACK === obj.type) {
        str += obj.attachments + '-';
      } // if we have a namespace other than `/`
      // we append it followed by a comma `,`


      if (obj.nsp && '/' !== obj.nsp) {
        str += obj.nsp + ',';
      } // immediately followed by the id


      if (null != obj.id) {
        str += obj.id;
      } // json data


      if (null != obj.data) {
        var payload = tryStringify(obj.data);

        if (payload !== false) {
          str += payload;
        } else {
          return ERROR_PACKET;
        }
      }

      debug('encoded %j as %s', obj, str);
      return str;
    }

    function tryStringify(str) {
      try {
        return JSON.stringify(str);
      } catch (e) {
        return false;
      }
    }
    /**
     * Encode packet as 'buffer sequence' by removing blobs, and
     * deconstructing packet into object with placeholders and
     * a list of buffers.
     *
     * @param {Object} packet
     * @return {Buffer} encoded
     * @api private
     */


    function encodeAsBinary(obj, callback) {
      function writeEncoding(bloblessData) {
        var deconstruction = binary.deconstructPacket(bloblessData);
        var pack = encodeAsString(deconstruction.packet);
        var buffers = deconstruction.buffers;
        buffers.unshift(pack); // add packet info to beginning of data list

        callback(buffers); // write all the buffers
      }

      binary.removeBlobs(obj, writeEncoding);
    }
    /**
     * A socket.io Decoder instance
     *
     * @return {Object} decoder
     * @api public
     */


    function Decoder() {
      this.reconstructor = null;
    }
    /**
     * Mix in `Emitter` with Decoder.
     */


    componentEmitter(Decoder.prototype);
    /**
     * Decodes an encoded packet string into packet JSON.
     *
     * @param {String} obj - encoded packet
     * @return {Object} packet
     * @api public
     */

    Decoder.prototype.add = function (obj) {
      var packet;

      if (typeof obj === 'string') {
        packet = decodeString(obj);

        if (exports.BINARY_EVENT === packet.type || exports.BINARY_ACK === packet.type) {
          // binary packet's json
          this.reconstructor = new BinaryReconstructor(packet); // no attachments, labeled binary but no binary data to follow

          if (this.reconstructor.reconPack.attachments === 0) {
            this.emit('decoded', packet);
          }
        } else {
          // non-binary full packet
          this.emit('decoded', packet);
        }
      } else if (isBuffer$1(obj) || obj.base64) {
        // raw binary data
        if (!this.reconstructor) {
          throw new Error('got binary data when not reconstructing a packet');
        } else {
          packet = this.reconstructor.takeBinaryData(obj);

          if (packet) {
            // received final buffer
            this.reconstructor = null;
            this.emit('decoded', packet);
          }
        }
      } else {
        throw new Error('Unknown type: ' + obj);
      }
    };
    /**
     * Decode a packet String (JSON data)
     *
     * @param {String} str
     * @return {Object} packet
     * @api private
     */


    function decodeString(str) {
      var i = 0; // look up type

      var p = {
        type: Number(str.charAt(0))
      };

      if (null == exports.types[p.type]) {
        return error('unknown packet type ' + p.type);
      } // look up attachments if type binary


      if (exports.BINARY_EVENT === p.type || exports.BINARY_ACK === p.type) {
        var buf = '';

        while (str.charAt(++i) !== '-') {
          buf += str.charAt(i);
          if (i == str.length) break;
        }

        if (buf != Number(buf) || str.charAt(i) !== '-') {
          throw new Error('Illegal attachments');
        }

        p.attachments = Number(buf);
      } // look up namespace (if any)


      if ('/' === str.charAt(i + 1)) {
        p.nsp = '';

        while (++i) {
          var c = str.charAt(i);
          if (',' === c) break;
          p.nsp += c;
          if (i === str.length) break;
        }
      } else {
        p.nsp = '/';
      } // look up id


      var next = str.charAt(i + 1);

      if ('' !== next && Number(next) == next) {
        p.id = '';

        while (++i) {
          var c = str.charAt(i);

          if (null == c || Number(c) != c) {
            --i;
            break;
          }

          p.id += str.charAt(i);
          if (i === str.length) break;
        }

        p.id = Number(p.id);
      } // look up json data


      if (str.charAt(++i)) {
        var payload = tryParse(str.substr(i));
        var isPayloadValid = payload !== false && (p.type === exports.ERROR || isarray(payload));

        if (isPayloadValid) {
          p.data = payload;
        } else {
          return error('invalid payload');
        }
      }

      debug('decoded %s as %j', str, p);
      return p;
    }

    function tryParse(str) {
      try {
        return JSON.parse(str);
      } catch (e) {
        return false;
      }
    }
    /**
     * Deallocates a parser's resources
     *
     * @api public
     */


    Decoder.prototype.destroy = function () {
      if (this.reconstructor) {
        this.reconstructor.finishedReconstruction();
      }
    };
    /**
     * A manager of a binary event's 'buffer sequence'. Should
     * be constructed whenever a packet of type BINARY_EVENT is
     * decoded.
     *
     * @param {Object} packet
     * @return {BinaryReconstructor} initialized reconstructor
     * @api private
     */


    function BinaryReconstructor(packet) {
      this.reconPack = packet;
      this.buffers = [];
    }
    /**
     * Method to be called when binary data received from connection
     * after a BINARY_EVENT packet.
     *
     * @param {Buffer | ArrayBuffer} binData - the raw binary data received
     * @return {null | Object} returns null if more binary data is expected or
     *   a reconstructed packet object if all buffers have been received.
     * @api private
     */


    BinaryReconstructor.prototype.takeBinaryData = function (binData) {
      this.buffers.push(binData);

      if (this.buffers.length === this.reconPack.attachments) {
        // done with buffer list
        var packet = binary.reconstructPacket(this.reconPack, this.buffers);
        this.finishedReconstruction();
        return packet;
      }

      return null;
    };
    /**
     * Cleans up binary packet reconstruction variables.
     *
     * @api private
     */


    BinaryReconstructor.prototype.finishedReconstruction = function () {
      this.reconPack = null;
      this.buffers = [];
    };

    function error(msg) {
      return {
        type: exports.ERROR,
        data: 'parser error: ' + msg
      };
    }
  });
  var socket_ioParser_1 = socket_ioParser.protocol;
  var socket_ioParser_2 = socket_ioParser.types;
  var socket_ioParser_3 = socket_ioParser.CONNECT;
  var socket_ioParser_4 = socket_ioParser.DISCONNECT;
  var socket_ioParser_5 = socket_ioParser.EVENT;
  var socket_ioParser_6 = socket_ioParser.ACK;
  var socket_ioParser_7 = socket_ioParser.ERROR;
  var socket_ioParser_8 = socket_ioParser.BINARY_EVENT;
  var socket_ioParser_9 = socket_ioParser.BINARY_ACK;
  var socket_ioParser_10 = socket_ioParser.Encoder;
  var socket_ioParser_11 = socket_ioParser.Decoder;

  var hasCors = createCommonjsModule(function (module) {
    /**
     * Module exports.
     *
     * Logic borrowed from Modernizr:
     *
     *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
     */
    try {
      module.exports = typeof XMLHttpRequest !== 'undefined' && 'withCredentials' in new XMLHttpRequest();
    } catch (err) {
      // if XMLHttp support is disabled in IE then it will throw
      // when trying to create
      module.exports = false;
    }
  });

  var xmlhttprequest = function xmlhttprequest(opts) {
    var xdomain = opts.xdomain; // scheme must be same when usign XDomainRequest
    // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx

    var xscheme = opts.xscheme; // XDomainRequest has a flow of not sending cookie, therefore it should be disabled as a default.
    // https://github.com/Automattic/engine.io-client/pull/217

    var enablesXDR = opts.enablesXDR; // XMLHttpRequest can be disabled on IE

    try {
      if ('undefined' !== typeof XMLHttpRequest && (!xdomain || hasCors)) {
        return new XMLHttpRequest();
      }
    } catch (e) {} // Use XDomainRequest for IE8 if enablesXDR is true
    // because loading bar keeps flashing when using jsonp-polling
    // https://github.com/yujiosaka/socke.io-ie8-loading-example


    try {
      if ('undefined' !== typeof XDomainRequest && !xscheme && enablesXDR) {
        return new XDomainRequest();
      }
    } catch (e) {}

    if (!xdomain) {
      try {
        return new self[['Active'].concat('Object').join('X')]('Microsoft.XMLHTTP');
      } catch (e) {}
    }
  };

  /**
   * Gets the keys for an object.
   *
   * @return {Array} keys
   * @api private
   */
  var keys$2 = Object.keys || function keys(obj) {
    var arr = [];
    var has = Object.prototype.hasOwnProperty;

    for (var i in obj) {
      if (has.call(obj, i)) {
        arr.push(i);
      }
    }

    return arr;
  };

  var toString$5 = {}.toString;

  var isarray$1 = Array.isArray || function (arr) {
    return toString$5.call(arr) == '[object Array]';
  };

  /* global Blob File */

  /*
   * Module requirements.
   */

  var toString$6 = Object.prototype.toString;
  var withNativeBlob$1 = typeof Blob === 'function' || typeof Blob !== 'undefined' && toString$6.call(Blob) === '[object BlobConstructor]';
  var withNativeFile$1 = typeof File === 'function' || typeof File !== 'undefined' && toString$6.call(File) === '[object FileConstructor]';
  /**
   * Module exports.
   */

  var hasBinary2 = hasBinary;
  /**
   * Checks for binary data.
   *
   * Supports Buffer, ArrayBuffer, Blob and File.
   *
   * @param {Object} anything
   * @api public
   */

  function hasBinary(obj) {
    if (!obj || _typeof(obj) !== 'object') {
      return false;
    }

    if (isarray$1(obj)) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (hasBinary(obj[i])) {
          return true;
        }
      }

      return false;
    }

    if (typeof Buffer === 'function' && Buffer.isBuffer && Buffer.isBuffer(obj) || typeof ArrayBuffer === 'function' && obj instanceof ArrayBuffer || withNativeBlob$1 && obj instanceof Blob || withNativeFile$1 && obj instanceof File) {
      return true;
    } // see: https://github.com/Automattic/has-binary/pull/4


    if (obj.toJSON && typeof obj.toJSON === 'function' && arguments.length === 1) {
      return hasBinary(obj.toJSON(), true);
    }

    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
        return true;
      }
    }

    return false;
  }

  /**
   * An abstraction for slicing an arraybuffer even when
   * ArrayBuffer.prototype.slice is not supported
   *
   * @api public
   */
  var arraybuffer_slice = function arraybuffer_slice(arraybuffer, start, end) {
    var bytes = arraybuffer.byteLength;
    start = start || 0;
    end = end || bytes;

    if (arraybuffer.slice) {
      return arraybuffer.slice(start, end);
    }

    if (start < 0) {
      start += bytes;
    }

    if (end < 0) {
      end += bytes;
    }

    if (end > bytes) {
      end = bytes;
    }

    if (start >= bytes || start >= end || bytes === 0) {
      return new ArrayBuffer(0);
    }

    var abv = new Uint8Array(arraybuffer);
    var result = new Uint8Array(end - start);

    for (var i = start, ii = 0; i < end; i++, ii++) {
      result[ii] = abv[i];
    }

    return result.buffer;
  };

  var after_1 = after;

  function after(count, callback, err_cb) {
    var bail = false;
    err_cb = err_cb || noop$1;
    proxy.count = count;
    return count === 0 ? callback() : proxy;

    function proxy(err, result) {
      if (proxy.count <= 0) {
        throw new Error('after called too many times');
      }

      --proxy.count; // after first error, rest are passed to err_cb

      if (err) {
        bail = true;
        callback(err); // future error callbacks will go to error handler

        callback = err_cb;
      } else if (proxy.count === 0 && !bail) {
        callback(null, result);
      }
    }
  }

  function noop$1() {}

  /*! https://mths.be/utf8js v2.1.2 by @mathias */
  var stringFromCharCode = String.fromCharCode; // Taken from https://mths.be/punycode

  function ucs2decode(string) {
    var output = [];
    var counter = 0;
    var length = string.length;
    var value;
    var extra;

    while (counter < length) {
      value = string.charCodeAt(counter++);

      if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
        // high surrogate, and there is a next character
        extra = string.charCodeAt(counter++);

        if ((extra & 0xFC00) == 0xDC00) {
          // low surrogate
          output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
        } else {
          // unmatched surrogate; only append this code unit, in case the next
          // code unit is the high surrogate of a surrogate pair
          output.push(value);
          counter--;
        }
      } else {
        output.push(value);
      }
    }

    return output;
  } // Taken from https://mths.be/punycode


  function ucs2encode(array) {
    var length = array.length;
    var index = -1;
    var value;
    var output = '';

    while (++index < length) {
      value = array[index];

      if (value > 0xFFFF) {
        value -= 0x10000;
        output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
        value = 0xDC00 | value & 0x3FF;
      }

      output += stringFromCharCode(value);
    }

    return output;
  }

  function checkScalarValue(codePoint, strict) {
    if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
      if (strict) {
        throw Error('Lone surrogate U+' + codePoint.toString(16).toUpperCase() + ' is not a scalar value');
      }

      return false;
    }

    return true;
  }
  /*--------------------------------------------------------------------------*/


  function createByte(codePoint, shift) {
    return stringFromCharCode(codePoint >> shift & 0x3F | 0x80);
  }

  function encodeCodePoint(codePoint, strict) {
    if ((codePoint & 0xFFFFFF80) == 0) {
      // 1-byte sequence
      return stringFromCharCode(codePoint);
    }

    var symbol = '';

    if ((codePoint & 0xFFFFF800) == 0) {
      // 2-byte sequence
      symbol = stringFromCharCode(codePoint >> 6 & 0x1F | 0xC0);
    } else if ((codePoint & 0xFFFF0000) == 0) {
      // 3-byte sequence
      if (!checkScalarValue(codePoint, strict)) {
        codePoint = 0xFFFD;
      }

      symbol = stringFromCharCode(codePoint >> 12 & 0x0F | 0xE0);
      symbol += createByte(codePoint, 6);
    } else if ((codePoint & 0xFFE00000) == 0) {
      // 4-byte sequence
      symbol = stringFromCharCode(codePoint >> 18 & 0x07 | 0xF0);
      symbol += createByte(codePoint, 12);
      symbol += createByte(codePoint, 6);
    }

    symbol += stringFromCharCode(codePoint & 0x3F | 0x80);
    return symbol;
  }

  function utf8encode(string, opts) {
    opts = opts || {};
    var strict = false !== opts.strict;
    var codePoints = ucs2decode(string);
    var length = codePoints.length;
    var index = -1;
    var codePoint;
    var byteString = '';

    while (++index < length) {
      codePoint = codePoints[index];
      byteString += encodeCodePoint(codePoint, strict);
    }

    return byteString;
  }
  /*--------------------------------------------------------------------------*/


  function readContinuationByte() {
    if (byteIndex >= byteCount) {
      throw Error('Invalid byte index');
    }

    var continuationByte = byteArray[byteIndex] & 0xFF;
    byteIndex++;

    if ((continuationByte & 0xC0) == 0x80) {
      return continuationByte & 0x3F;
    } // If we end up here, it’s not a continuation byte


    throw Error('Invalid continuation byte');
  }

  function decodeSymbol(strict) {
    var byte1;
    var byte2;
    var byte3;
    var byte4;
    var codePoint;

    if (byteIndex > byteCount) {
      throw Error('Invalid byte index');
    }

    if (byteIndex == byteCount) {
      return false;
    } // Read first byte


    byte1 = byteArray[byteIndex] & 0xFF;
    byteIndex++; // 1-byte sequence (no continuation bytes)

    if ((byte1 & 0x80) == 0) {
      return byte1;
    } // 2-byte sequence


    if ((byte1 & 0xE0) == 0xC0) {
      byte2 = readContinuationByte();
      codePoint = (byte1 & 0x1F) << 6 | byte2;

      if (codePoint >= 0x80) {
        return codePoint;
      } else {
        throw Error('Invalid continuation byte');
      }
    } // 3-byte sequence (may include unpaired surrogates)


    if ((byte1 & 0xF0) == 0xE0) {
      byte2 = readContinuationByte();
      byte3 = readContinuationByte();
      codePoint = (byte1 & 0x0F) << 12 | byte2 << 6 | byte3;

      if (codePoint >= 0x0800) {
        return checkScalarValue(codePoint, strict) ? codePoint : 0xFFFD;
      } else {
        throw Error('Invalid continuation byte');
      }
    } // 4-byte sequence


    if ((byte1 & 0xF8) == 0xF0) {
      byte2 = readContinuationByte();
      byte3 = readContinuationByte();
      byte4 = readContinuationByte();
      codePoint = (byte1 & 0x07) << 0x12 | byte2 << 0x0C | byte3 << 0x06 | byte4;

      if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
        return codePoint;
      }
    }

    throw Error('Invalid UTF-8 detected');
  }

  var byteArray;
  var byteCount;
  var byteIndex;

  function utf8decode(byteString, opts) {
    opts = opts || {};
    var strict = false !== opts.strict;
    byteArray = ucs2decode(byteString);
    byteCount = byteArray.length;
    byteIndex = 0;
    var codePoints = [];
    var tmp;

    while ((tmp = decodeSymbol(strict)) !== false) {
      codePoints.push(tmp);
    }

    return ucs2encode(codePoints);
  }

  var utf8 = {
    version: '2.1.2',
    encode: utf8encode,
    decode: utf8decode
  };

  var base64Arraybuffer = createCommonjsModule(function (module, exports) {
    /*
     * base64-arraybuffer
     * https://github.com/niklasvh/base64-arraybuffer
     *
     * Copyright (c) 2012 Niklas von Hertzen
     * Licensed under the MIT license.
     */
    (function () {

      var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"; // Use a lookup table to find the index.

      var lookup = new Uint8Array(256);

      for (var i = 0; i < chars.length; i++) {
        lookup[chars.charCodeAt(i)] = i;
      }

      exports.encode = function (arraybuffer) {
        var bytes = new Uint8Array(arraybuffer),
            i,
            len = bytes.length,
            base64 = "";

        for (i = 0; i < len; i += 3) {
          base64 += chars[bytes[i] >> 2];
          base64 += chars[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
          base64 += chars[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
          base64 += chars[bytes[i + 2] & 63];
        }

        if (len % 3 === 2) {
          base64 = base64.substring(0, base64.length - 1) + "=";
        } else if (len % 3 === 1) {
          base64 = base64.substring(0, base64.length - 2) + "==";
        }

        return base64;
      };

      exports.decode = function (base64) {
        var bufferLength = base64.length * 0.75,
            len = base64.length,
            i,
            p = 0,
            encoded1,
            encoded2,
            encoded3,
            encoded4;

        if (base64[base64.length - 1] === "=") {
          bufferLength--;

          if (base64[base64.length - 2] === "=") {
            bufferLength--;
          }
        }

        var arraybuffer = new ArrayBuffer(bufferLength),
            bytes = new Uint8Array(arraybuffer);

        for (i = 0; i < len; i += 4) {
          encoded1 = lookup[base64.charCodeAt(i)];
          encoded2 = lookup[base64.charCodeAt(i + 1)];
          encoded3 = lookup[base64.charCodeAt(i + 2)];
          encoded4 = lookup[base64.charCodeAt(i + 3)];
          bytes[p++] = encoded1 << 2 | encoded2 >> 4;
          bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
          bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
        }

        return arraybuffer;
      };
    })();
  });
  var base64Arraybuffer_1 = base64Arraybuffer.encode;
  var base64Arraybuffer_2 = base64Arraybuffer.decode;

  /**
   * Create a blob builder even when vendor prefixes exist
   */
  var BlobBuilder = typeof BlobBuilder !== 'undefined' ? BlobBuilder : typeof WebKitBlobBuilder !== 'undefined' ? WebKitBlobBuilder : typeof MSBlobBuilder !== 'undefined' ? MSBlobBuilder : typeof MozBlobBuilder !== 'undefined' ? MozBlobBuilder : false;
  /**
   * Check if Blob constructor is supported
   */

  var blobSupported = function () {
    try {
      var a = new Blob(['hi']);
      return a.size === 2;
    } catch (e) {
      return false;
    }
  }();
  /**
   * Check if Blob constructor supports ArrayBufferViews
   * Fails in Safari 6, so we need to map to ArrayBuffers there.
   */


  var blobSupportsArrayBufferView = blobSupported && function () {
    try {
      var b = new Blob([new Uint8Array([1, 2])]);
      return b.size === 2;
    } catch (e) {
      return false;
    }
  }();
  /**
   * Check if BlobBuilder is supported
   */


  var blobBuilderSupported = BlobBuilder && BlobBuilder.prototype.append && BlobBuilder.prototype.getBlob;
  /**
   * Helper function that maps ArrayBufferViews to ArrayBuffers
   * Used by BlobBuilder constructor and old browsers that didn't
   * support it in the Blob constructor.
   */

  function mapArrayBufferViews(ary) {
    return ary.map(function (chunk) {
      if (chunk.buffer instanceof ArrayBuffer) {
        var buf = chunk.buffer; // if this is a subarray, make a copy so we only
        // include the subarray region from the underlying buffer

        if (chunk.byteLength !== buf.byteLength) {
          var copy = new Uint8Array(chunk.byteLength);
          copy.set(new Uint8Array(buf, chunk.byteOffset, chunk.byteLength));
          buf = copy.buffer;
        }

        return buf;
      }

      return chunk;
    });
  }

  function BlobBuilderConstructor(ary, options) {
    options = options || {};
    var bb = new BlobBuilder();
    mapArrayBufferViews(ary).forEach(function (part) {
      bb.append(part);
    });
    return options.type ? bb.getBlob(options.type) : bb.getBlob();
  }

  function BlobConstructor(ary, options) {
    return new Blob(mapArrayBufferViews(ary), options || {});
  }

  if (typeof Blob !== 'undefined') {
    BlobBuilderConstructor.prototype = Blob.prototype;
    BlobConstructor.prototype = Blob.prototype;
  }

  var blob = function () {
    if (blobSupported) {
      return blobSupportsArrayBufferView ? Blob : BlobConstructor;
    } else if (blobBuilderSupported) {
      return BlobBuilderConstructor;
    } else {
      return undefined;
    }
  }();

  var browser$2 = createCommonjsModule(function (module, exports) {
    /**
     * Module dependencies.
     */
    var base64encoder;

    if (typeof ArrayBuffer !== 'undefined') {
      base64encoder = base64Arraybuffer;
    }
    /**
     * Check if we are running an android browser. That requires us to use
     * ArrayBuffer with polling transports...
     *
     * http://ghinda.net/jpeg-blob-ajax-android/
     */


    var isAndroid = typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent);
    /**
     * Check if we are running in PhantomJS.
     * Uploading a Blob with PhantomJS does not work correctly, as reported here:
     * https://github.com/ariya/phantomjs/issues/11395
     * @type boolean
     */

    var isPhantomJS = typeof navigator !== 'undefined' && /PhantomJS/i.test(navigator.userAgent);
    /**
     * When true, avoids using Blobs to encode payloads.
     * @type boolean
     */

    var dontSendBlobs = isAndroid || isPhantomJS;
    /**
     * Current protocol version.
     */

    exports.protocol = 3;
    /**
     * Packet types.
     */

    var packets = exports.packets = {
      open: 0 // non-ws
      ,
      close: 1 // non-ws
      ,
      ping: 2,
      pong: 3,
      message: 4,
      upgrade: 5,
      noop: 6
    };
    var packetslist = keys$2(packets);
    /**
     * Premade error packet.
     */

    var err = {
      type: 'error',
      data: 'parser error'
    };
    /**
     * Create a blob api even for blob builder when vendor prefixes exist
     */

    /**
     * Encodes a packet.
     *
     *     <packet type id> [ <data> ]
     *
     * Example:
     *
     *     5hello world
     *     3
     *     4
     *
     * Binary is encoded in an identical principle
     *
     * @api private
     */

    exports.encodePacket = function (packet, supportsBinary, utf8encode, callback) {
      if (typeof supportsBinary === 'function') {
        callback = supportsBinary;
        supportsBinary = false;
      }

      if (typeof utf8encode === 'function') {
        callback = utf8encode;
        utf8encode = null;
      }

      var data = packet.data === undefined ? undefined : packet.data.buffer || packet.data;

      if (typeof ArrayBuffer !== 'undefined' && data instanceof ArrayBuffer) {
        return encodeArrayBuffer(packet, supportsBinary, callback);
      } else if (typeof blob !== 'undefined' && data instanceof blob) {
        return encodeBlob(packet, supportsBinary, callback);
      } // might be an object with { base64: true, data: dataAsBase64String }


      if (data && data.base64) {
        return encodeBase64Object(packet, callback);
      } // Sending data as a utf-8 string


      var encoded = packets[packet.type]; // data fragment is optional

      if (undefined !== packet.data) {
        encoded += utf8encode ? utf8.encode(String(packet.data), {
          strict: false
        }) : String(packet.data);
      }

      return callback('' + encoded);
    };

    function encodeBase64Object(packet, callback) {
      // packet data is an object { base64: true, data: dataAsBase64String }
      var message = 'b' + exports.packets[packet.type] + packet.data.data;
      return callback(message);
    }
    /**
     * Encode packet helpers for binary types
     */


    function encodeArrayBuffer(packet, supportsBinary, callback) {
      if (!supportsBinary) {
        return exports.encodeBase64Packet(packet, callback);
      }

      var data = packet.data;
      var contentArray = new Uint8Array(data);
      var resultBuffer = new Uint8Array(1 + data.byteLength);
      resultBuffer[0] = packets[packet.type];

      for (var i = 0; i < contentArray.length; i++) {
        resultBuffer[i + 1] = contentArray[i];
      }

      return callback(resultBuffer.buffer);
    }

    function encodeBlobAsArrayBuffer(packet, supportsBinary, callback) {
      if (!supportsBinary) {
        return exports.encodeBase64Packet(packet, callback);
      }

      var fr = new FileReader();

      fr.onload = function () {
        exports.encodePacket({
          type: packet.type,
          data: fr.result
        }, supportsBinary, true, callback);
      };

      return fr.readAsArrayBuffer(packet.data);
    }

    function encodeBlob(packet, supportsBinary, callback) {
      if (!supportsBinary) {
        return exports.encodeBase64Packet(packet, callback);
      }

      if (dontSendBlobs) {
        return encodeBlobAsArrayBuffer(packet, supportsBinary, callback);
      }

      var length = new Uint8Array(1);
      length[0] = packets[packet.type];
      var blob$1 = new blob([length.buffer, packet.data]);
      return callback(blob$1);
    }
    /**
     * Encodes a packet with binary data in a base64 string
     *
     * @param {Object} packet, has `type` and `data`
     * @return {String} base64 encoded message
     */


    exports.encodeBase64Packet = function (packet, callback) {
      var message = 'b' + exports.packets[packet.type];

      if (typeof blob !== 'undefined' && packet.data instanceof blob) {
        var fr = new FileReader();

        fr.onload = function () {
          var b64 = fr.result.split(',')[1];
          callback(message + b64);
        };

        return fr.readAsDataURL(packet.data);
      }

      var b64data;

      try {
        b64data = String.fromCharCode.apply(null, new Uint8Array(packet.data));
      } catch (e) {
        // iPhone Safari doesn't let you apply with typed arrays
        var typed = new Uint8Array(packet.data);
        var basic = new Array(typed.length);

        for (var i = 0; i < typed.length; i++) {
          basic[i] = typed[i];
        }

        b64data = String.fromCharCode.apply(null, basic);
      }

      message += btoa(b64data);
      return callback(message);
    };
    /**
     * Decodes a packet. Changes format to Blob if requested.
     *
     * @return {Object} with `type` and `data` (if any)
     * @api private
     */


    exports.decodePacket = function (data, binaryType, utf8decode) {
      if (data === undefined) {
        return err;
      } // String data


      if (typeof data === 'string') {
        if (data.charAt(0) === 'b') {
          return exports.decodeBase64Packet(data.substr(1), binaryType);
        }

        if (utf8decode) {
          data = tryDecode(data);

          if (data === false) {
            return err;
          }
        }

        var type = data.charAt(0);

        if (Number(type) != type || !packetslist[type]) {
          return err;
        }

        if (data.length > 1) {
          return {
            type: packetslist[type],
            data: data.substring(1)
          };
        } else {
          return {
            type: packetslist[type]
          };
        }
      }

      var asArray = new Uint8Array(data);
      var type = asArray[0];
      var rest = arraybuffer_slice(data, 1);

      if (blob && binaryType === 'blob') {
        rest = new blob([rest]);
      }

      return {
        type: packetslist[type],
        data: rest
      };
    };

    function tryDecode(data) {
      try {
        data = utf8.decode(data, {
          strict: false
        });
      } catch (e) {
        return false;
      }

      return data;
    }
    /**
     * Decodes a packet encoded in a base64 string
     *
     * @param {String} base64 encoded message
     * @return {Object} with `type` and `data` (if any)
     */


    exports.decodeBase64Packet = function (msg, binaryType) {
      var type = packetslist[msg.charAt(0)];

      if (!base64encoder) {
        return {
          type: type,
          data: {
            base64: true,
            data: msg.substr(1)
          }
        };
      }

      var data = base64encoder.decode(msg.substr(1));

      if (binaryType === 'blob' && blob) {
        data = new blob([data]);
      }

      return {
        type: type,
        data: data
      };
    };
    /**
     * Encodes multiple messages (payload).
     *
     *     <length>:data
     *
     * Example:
     *
     *     11:hello world2:hi
     *
     * If any contents are binary, they will be encoded as base64 strings. Base64
     * encoded strings are marked with a b before the length specifier
     *
     * @param {Array} packets
     * @api private
     */


    exports.encodePayload = function (packets, supportsBinary, callback) {
      if (typeof supportsBinary === 'function') {
        callback = supportsBinary;
        supportsBinary = null;
      }

      var isBinary = hasBinary2(packets);

      if (supportsBinary && isBinary) {
        if (blob && !dontSendBlobs) {
          return exports.encodePayloadAsBlob(packets, callback);
        }

        return exports.encodePayloadAsArrayBuffer(packets, callback);
      }

      if (!packets.length) {
        return callback('0:');
      }

      function setLengthHeader(message) {
        return message.length + ':' + message;
      }

      function encodeOne(packet, doneCallback) {
        exports.encodePacket(packet, !isBinary ? false : supportsBinary, false, function (message) {
          doneCallback(null, setLengthHeader(message));
        });
      }

      map(packets, encodeOne, function (err, results) {
        return callback(results.join(''));
      });
    };
    /**
     * Async array map using after
     */


    function map(ary, each, done) {
      var result = new Array(ary.length);
      var next = after_1(ary.length, done);

      var eachWithIndex = function eachWithIndex(i, el, cb) {
        each(el, function (error, msg) {
          result[i] = msg;
          cb(error, result);
        });
      };

      for (var i = 0; i < ary.length; i++) {
        eachWithIndex(i, ary[i], next);
      }
    }
    /*
     * Decodes data when a payload is maybe expected. Possible binary contents are
     * decoded from their base64 representation
     *
     * @param {String} data, callback method
     * @api public
     */


    exports.decodePayload = function (data, binaryType, callback) {
      if (typeof data !== 'string') {
        return exports.decodePayloadAsBinary(data, binaryType, callback);
      }

      if (typeof binaryType === 'function') {
        callback = binaryType;
        binaryType = null;
      }

      var packet;

      if (data === '') {
        // parser error - ignoring payload
        return callback(err, 0, 1);
      }

      var length = '',
          n,
          msg;

      for (var i = 0, l = data.length; i < l; i++) {
        var chr = data.charAt(i);

        if (chr !== ':') {
          length += chr;
          continue;
        }

        if (length === '' || length != (n = Number(length))) {
          // parser error - ignoring payload
          return callback(err, 0, 1);
        }

        msg = data.substr(i + 1, n);

        if (length != msg.length) {
          // parser error - ignoring payload
          return callback(err, 0, 1);
        }

        if (msg.length) {
          packet = exports.decodePacket(msg, binaryType, false);

          if (err.type === packet.type && err.data === packet.data) {
            // parser error in individual packet - ignoring payload
            return callback(err, 0, 1);
          }

          var ret = callback(packet, i + n, l);
          if (false === ret) return;
        } // advance cursor


        i += n;
        length = '';
      }

      if (length !== '') {
        // parser error - ignoring payload
        return callback(err, 0, 1);
      }
    };
    /**
     * Encodes multiple messages (payload) as binary.
     *
     * <1 = binary, 0 = string><number from 0-9><number from 0-9>[...]<number
     * 255><data>
     *
     * Example:
     * 1 3 255 1 2 3, if the binary contents are interpreted as 8 bit integers
     *
     * @param {Array} packets
     * @return {ArrayBuffer} encoded payload
     * @api private
     */


    exports.encodePayloadAsArrayBuffer = function (packets, callback) {
      if (!packets.length) {
        return callback(new ArrayBuffer(0));
      }

      function encodeOne(packet, doneCallback) {
        exports.encodePacket(packet, true, true, function (data) {
          return doneCallback(null, data);
        });
      }

      map(packets, encodeOne, function (err, encodedPackets) {
        var totalLength = encodedPackets.reduce(function (acc, p) {
          var len;

          if (typeof p === 'string') {
            len = p.length;
          } else {
            len = p.byteLength;
          }

          return acc + len.toString().length + len + 2; // string/binary identifier + separator = 2
        }, 0);
        var resultArray = new Uint8Array(totalLength);
        var bufferIndex = 0;
        encodedPackets.forEach(function (p) {
          var isString = typeof p === 'string';
          var ab = p;

          if (isString) {
            var view = new Uint8Array(p.length);

            for (var i = 0; i < p.length; i++) {
              view[i] = p.charCodeAt(i);
            }

            ab = view.buffer;
          }

          if (isString) {
            // not true binary
            resultArray[bufferIndex++] = 0;
          } else {
            // true binary
            resultArray[bufferIndex++] = 1;
          }

          var lenStr = ab.byteLength.toString();

          for (var i = 0; i < lenStr.length; i++) {
            resultArray[bufferIndex++] = parseInt(lenStr[i]);
          }

          resultArray[bufferIndex++] = 255;
          var view = new Uint8Array(ab);

          for (var i = 0; i < view.length; i++) {
            resultArray[bufferIndex++] = view[i];
          }
        });
        return callback(resultArray.buffer);
      });
    };
    /**
     * Encode as Blob
     */


    exports.encodePayloadAsBlob = function (packets, callback) {
      function encodeOne(packet, doneCallback) {
        exports.encodePacket(packet, true, true, function (encoded) {
          var binaryIdentifier = new Uint8Array(1);
          binaryIdentifier[0] = 1;

          if (typeof encoded === 'string') {
            var view = new Uint8Array(encoded.length);

            for (var i = 0; i < encoded.length; i++) {
              view[i] = encoded.charCodeAt(i);
            }

            encoded = view.buffer;
            binaryIdentifier[0] = 0;
          }

          var len = encoded instanceof ArrayBuffer ? encoded.byteLength : encoded.size;
          var lenStr = len.toString();
          var lengthAry = new Uint8Array(lenStr.length + 1);

          for (var i = 0; i < lenStr.length; i++) {
            lengthAry[i] = parseInt(lenStr[i]);
          }

          lengthAry[lenStr.length] = 255;

          if (blob) {
            var blob$1 = new blob([binaryIdentifier.buffer, lengthAry.buffer, encoded]);
            doneCallback(null, blob$1);
          }
        });
      }

      map(packets, encodeOne, function (err, results) {
        return callback(new blob(results));
      });
    };
    /*
     * Decodes data when a payload is maybe expected. Strings are decoded by
     * interpreting each byte as a key code for entries marked to start with 0. See
     * description of encodePayloadAsBinary
     *
     * @param {ArrayBuffer} data, callback method
     * @api public
     */


    exports.decodePayloadAsBinary = function (data, binaryType, callback) {
      if (typeof binaryType === 'function') {
        callback = binaryType;
        binaryType = null;
      }

      var bufferTail = data;
      var buffers = [];

      while (bufferTail.byteLength > 0) {
        var tailArray = new Uint8Array(bufferTail);
        var isString = tailArray[0] === 0;
        var msgLength = '';

        for (var i = 1;; i++) {
          if (tailArray[i] === 255) break; // 310 = char length of Number.MAX_VALUE

          if (msgLength.length > 310) {
            return callback(err, 0, 1);
          }

          msgLength += tailArray[i];
        }

        bufferTail = arraybuffer_slice(bufferTail, 2 + msgLength.length);
        msgLength = parseInt(msgLength);
        var msg = arraybuffer_slice(bufferTail, 0, msgLength);

        if (isString) {
          try {
            msg = String.fromCharCode.apply(null, new Uint8Array(msg));
          } catch (e) {
            // iPhone Safari doesn't let you apply to typed arrays
            var typed = new Uint8Array(msg);
            msg = '';

            for (var i = 0; i < typed.length; i++) {
              msg += String.fromCharCode(typed[i]);
            }
          }
        }

        buffers.push(msg);
        bufferTail = arraybuffer_slice(bufferTail, msgLength);
      }

      var total = buffers.length;
      buffers.forEach(function (buffer, i) {
        callback(exports.decodePacket(buffer, binaryType, true), i, total);
      });
    };
  });
  var browser_1$2 = browser$2.protocol;
  var browser_2$2 = browser$2.packets;
  var browser_3$2 = browser$2.encodePacket;
  var browser_4$2 = browser$2.encodeBase64Packet;
  var browser_5$2 = browser$2.decodePacket;
  var browser_6$2 = browser$2.decodeBase64Packet;
  var browser_7$2 = browser$2.encodePayload;
  var browser_8 = browser$2.decodePayload;
  var browser_9 = browser$2.encodePayloadAsArrayBuffer;
  var browser_10 = browser$2.encodePayloadAsBlob;
  var browser_11 = browser$2.decodePayloadAsBinary;

  /**
   * Module dependencies.
   */

  /**
   * Module exports.
   */

  var transport = Transport;
  /**
   * Transport abstract constructor.
   *
   * @param {Object} options.
   * @api private
   */

  function Transport(opts) {
    this.path = opts.path;
    this.hostname = opts.hostname;
    this.port = opts.port;
    this.secure = opts.secure;
    this.query = opts.query;
    this.timestampParam = opts.timestampParam;
    this.timestampRequests = opts.timestampRequests;
    this.readyState = '';
    this.agent = opts.agent || false;
    this.socket = opts.socket;
    this.enablesXDR = opts.enablesXDR;
    this.withCredentials = opts.withCredentials; // SSL options for Node.js client

    this.pfx = opts.pfx;
    this.key = opts.key;
    this.passphrase = opts.passphrase;
    this.cert = opts.cert;
    this.ca = opts.ca;
    this.ciphers = opts.ciphers;
    this.rejectUnauthorized = opts.rejectUnauthorized;
    this.forceNode = opts.forceNode; // results of ReactNative environment detection

    this.isReactNative = opts.isReactNative; // other options for Node.js client

    this.extraHeaders = opts.extraHeaders;
    this.localAddress = opts.localAddress;
  }
  /**
   * Mix in `Emitter`.
   */


  componentEmitter(Transport.prototype);
  /**
   * Emits an error.
   *
   * @param {String} str
   * @return {Transport} for chaining
   * @api public
   */

  Transport.prototype.onError = function (msg, desc) {
    var err = new Error(msg);
    err.type = 'TransportError';
    err.description = desc;
    this.emit('error', err);
    return this;
  };
  /**
   * Opens the transport.
   *
   * @api public
   */


  Transport.prototype.open = function () {
    if ('closed' === this.readyState || '' === this.readyState) {
      this.readyState = 'opening';
      this.doOpen();
    }

    return this;
  };
  /**
   * Closes the transport.
   *
   * @api private
   */


  Transport.prototype.close = function () {
    if ('opening' === this.readyState || 'open' === this.readyState) {
      this.doClose();
      this.onClose();
    }

    return this;
  };
  /**
   * Sends multiple packets.
   *
   * @param {Array} packets
   * @api private
   */


  Transport.prototype.send = function (packets) {
    if ('open' === this.readyState) {
      this.write(packets);
    } else {
      throw new Error('Transport not open');
    }
  };
  /**
   * Called upon open
   *
   * @api private
   */


  Transport.prototype.onOpen = function () {
    this.readyState = 'open';
    this.writable = true;
    this.emit('open');
  };
  /**
   * Called with data.
   *
   * @param {String} data
   * @api private
   */


  Transport.prototype.onData = function (data) {
    var packet = browser$2.decodePacket(data, this.socket.binaryType);
    this.onPacket(packet);
  };
  /**
   * Called with a decoded packet.
   */


  Transport.prototype.onPacket = function (packet) {
    this.emit('packet', packet);
  };
  /**
   * Called upon close.
   *
   * @api private
   */


  Transport.prototype.onClose = function () {
    this.readyState = 'closed';
    this.emit('close');
  };

  /**
   * Compiles a querystring
   * Returns string representation of the object
   *
   * @param {Object}
   * @api private
   */
  var encode$1 = function encode(obj) {
    var str = '';

    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        if (str.length) str += '&';
        str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
      }
    }

    return str;
  };
  /**
   * Parses a simple querystring into an object
   *
   * @param {String} qs
   * @api private
   */


  var decode = function decode(qs) {
    var qry = {};
    var pairs = qs.split('&');

    for (var i = 0, l = pairs.length; i < l; i++) {
      var pair = pairs[i].split('=');
      qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }

    return qry;
  };

  var parseqs = {
    encode: encode$1,
    decode: decode
  };

  var componentInherit = function componentInherit(a, b) {
    var fn = function fn() {};

    fn.prototype = b.prototype;
    a.prototype = new fn();
    a.prototype.constructor = a;
  };

  var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split(''),
      length = 64,
      map = {},
      seed = 0,
      i$3 = 0,
      prev;
  /**
   * Return a string representing the specified number.
   *
   * @param {Number} num The number to convert.
   * @returns {String} The string representation of the number.
   * @api public
   */

  function encode$2(num) {
    var encoded = '';

    do {
      encoded = alphabet[num % length] + encoded;
      num = Math.floor(num / length);
    } while (num > 0);

    return encoded;
  }
  /**
   * Return the integer value specified by the given string.
   *
   * @param {String} str The string to convert.
   * @returns {Number} The integer value represented by the string.
   * @api public
   */


  function decode$1(str) {
    var decoded = 0;

    for (i$3 = 0; i$3 < str.length; i$3++) {
      decoded = decoded * length + map[str.charAt(i$3)];
    }

    return decoded;
  }
  /**
   * Yeast: A tiny growing id generator.
   *
   * @returns {String} A unique id.
   * @api public
   */


  function yeast() {
    var now = encode$2(+new Date());
    if (now !== prev) return seed = 0, prev = now;
    return now + '.' + encode$2(seed++);
  } //
  // Map each character to its index.
  //


  for (; i$3 < length; i$3++) {
    map[alphabet[i$3]] = i$3;
  } //
  // Expose the `yeast`, `encode` and `decode` functions.
  //


  yeast.encode = encode$2;
  yeast.decode = decode$1;
  var yeast_1 = yeast;

  /**
   * Module dependencies.
   */

  var debug$2 = browser('engine.io-client:polling');
  /**
   * Module exports.
   */

  var polling = Polling;
  /**
   * Is XHR2 supported?
   */

  var hasXHR2 = function () {
    var XMLHttpRequest = xmlhttprequest;
    var xhr = new XMLHttpRequest({
      xdomain: false
    });
    return null != xhr.responseType;
  }();
  /**
   * Polling interface.
   *
   * @param {Object} opts
   * @api private
   */


  function Polling(opts) {
    var forceBase64 = opts && opts.forceBase64;

    if (!hasXHR2 || forceBase64) {
      this.supportsBinary = false;
    }

    transport.call(this, opts);
  }
  /**
   * Inherits from Transport.
   */


  componentInherit(Polling, transport);
  /**
   * Transport name.
   */

  Polling.prototype.name = 'polling';
  /**
   * Opens the socket (triggers polling). We write a PING message to determine
   * when the transport is open.
   *
   * @api private
   */

  Polling.prototype.doOpen = function () {
    this.poll();
  };
  /**
   * Pauses polling.
   *
   * @param {Function} callback upon buffers are flushed and transport is paused
   * @api private
   */


  Polling.prototype.pause = function (onPause) {
    var self = this;
    this.readyState = 'pausing';

    function pause() {
      debug$2('paused');
      self.readyState = 'paused';
      onPause();
    }

    if (this.polling || !this.writable) {
      var total = 0;

      if (this.polling) {
        debug$2('we are currently polling - waiting to pause');
        total++;
        this.once('pollComplete', function () {
          debug$2('pre-pause polling complete');
          --total || pause();
        });
      }

      if (!this.writable) {
        debug$2('we are currently writing - waiting to pause');
        total++;
        this.once('drain', function () {
          debug$2('pre-pause writing complete');
          --total || pause();
        });
      }
    } else {
      pause();
    }
  };
  /**
   * Starts polling cycle.
   *
   * @api public
   */


  Polling.prototype.poll = function () {
    debug$2('polling');
    this.polling = true;
    this.doPoll();
    this.emit('poll');
  };
  /**
   * Overloads onData to detect payloads.
   *
   * @api private
   */


  Polling.prototype.onData = function (data) {
    var self = this;
    debug$2('polling got data %s', data);

    var callback = function callback(packet, index, total) {
      // if its the first message we consider the transport open
      if ('opening' === self.readyState) {
        self.onOpen();
      } // if its a close packet, we close the ongoing requests


      if ('close' === packet.type) {
        self.onClose();
        return false;
      } // otherwise bypass onData and handle the message


      self.onPacket(packet);
    }; // decode payload


    browser$2.decodePayload(data, this.socket.binaryType, callback); // if an event did not trigger closing

    if ('closed' !== this.readyState) {
      // if we got data we're not polling
      this.polling = false;
      this.emit('pollComplete');

      if ('open' === this.readyState) {
        this.poll();
      } else {
        debug$2('ignoring poll - transport state "%s"', this.readyState);
      }
    }
  };
  /**
   * For polling, send a close packet.
   *
   * @api private
   */


  Polling.prototype.doClose = function () {
    var self = this;

    function close() {
      debug$2('writing close packet');
      self.write([{
        type: 'close'
      }]);
    }

    if ('open' === this.readyState) {
      debug$2('transport open - closing');
      close();
    } else {
      // in case we're trying to close while
      // handshaking is in progress (GH-164)
      debug$2('transport not open - deferring close');
      this.once('open', close);
    }
  };
  /**
   * Writes a packets payload.
   *
   * @param {Array} data packets
   * @param {Function} drain callback
   * @api private
   */


  Polling.prototype.write = function (packets) {
    var self = this;
    this.writable = false;

    var callbackfn = function callbackfn() {
      self.writable = true;
      self.emit('drain');
    };

    browser$2.encodePayload(packets, this.supportsBinary, function (data) {
      self.doWrite(data, callbackfn);
    });
  };
  /**
   * Generates uri for connection.
   *
   * @api private
   */


  Polling.prototype.uri = function () {
    var query = this.query || {};
    var schema = this.secure ? 'https' : 'http';
    var port = ''; // cache busting is forced

    if (false !== this.timestampRequests) {
      query[this.timestampParam] = yeast_1();
    }

    if (!this.supportsBinary && !query.sid) {
      query.b64 = 1;
    }

    query = parseqs.encode(query); // avoid port if default for schema

    if (this.port && ('https' === schema && Number(this.port) !== 443 || 'http' === schema && Number(this.port) !== 80)) {
      port = ':' + this.port;
    } // prepend ? to query


    if (query.length) {
      query = '?' + query;
    }

    var ipv6 = this.hostname.indexOf(':') !== -1;
    return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
  };

  /* global attachEvent */

  /**
   * Module requirements.
   */

  var debug$3 = browser('engine.io-client:polling-xhr');
  /**
   * Module exports.
   */

  var pollingXhr = XHR;
  var Request_1 = Request;
  /**
   * Empty function
   */

  function empty$2() {}
  /**
   * XHR Polling constructor.
   *
   * @param {Object} opts
   * @api public
   */


  function XHR(opts) {
    polling.call(this, opts);
    this.requestTimeout = opts.requestTimeout;
    this.extraHeaders = opts.extraHeaders;

    if (typeof location !== 'undefined') {
      var isSSL = 'https:' === location.protocol;
      var port = location.port; // some user agents have empty `location.port`

      if (!port) {
        port = isSSL ? 443 : 80;
      }

      this.xd = typeof location !== 'undefined' && opts.hostname !== location.hostname || port !== opts.port;
      this.xs = opts.secure !== isSSL;
    }
  }
  /**
   * Inherits from Polling.
   */


  componentInherit(XHR, polling);
  /**
   * XHR supports binary
   */

  XHR.prototype.supportsBinary = true;
  /**
   * Creates a request.
   *
   * @param {String} method
   * @api private
   */

  XHR.prototype.request = function (opts) {
    opts = opts || {};
    opts.uri = this.uri();
    opts.xd = this.xd;
    opts.xs = this.xs;
    opts.agent = this.agent || false;
    opts.supportsBinary = this.supportsBinary;
    opts.enablesXDR = this.enablesXDR;
    opts.withCredentials = this.withCredentials; // SSL options for Node.js client

    opts.pfx = this.pfx;
    opts.key = this.key;
    opts.passphrase = this.passphrase;
    opts.cert = this.cert;
    opts.ca = this.ca;
    opts.ciphers = this.ciphers;
    opts.rejectUnauthorized = this.rejectUnauthorized;
    opts.requestTimeout = this.requestTimeout; // other options for Node.js client

    opts.extraHeaders = this.extraHeaders;
    return new Request(opts);
  };
  /**
   * Sends data.
   *
   * @param {String} data to send.
   * @param {Function} called upon flush.
   * @api private
   */


  XHR.prototype.doWrite = function (data, fn) {
    var isBinary = typeof data !== 'string' && data !== undefined;
    var req = this.request({
      method: 'POST',
      data: data,
      isBinary: isBinary
    });
    var self = this;
    req.on('success', fn);
    req.on('error', function (err) {
      self.onError('xhr post error', err);
    });
    this.sendXhr = req;
  };
  /**
   * Starts a poll cycle.
   *
   * @api private
   */


  XHR.prototype.doPoll = function () {
    debug$3('xhr poll');
    var req = this.request();
    var self = this;
    req.on('data', function (data) {
      self.onData(data);
    });
    req.on('error', function (err) {
      self.onError('xhr poll error', err);
    });
    this.pollXhr = req;
  };
  /**
   * Request constructor
   *
   * @param {Object} options
   * @api public
   */


  function Request(opts) {
    this.method = opts.method || 'GET';
    this.uri = opts.uri;
    this.xd = !!opts.xd;
    this.xs = !!opts.xs;
    this.async = false !== opts.async;
    this.data = undefined !== opts.data ? opts.data : null;
    this.agent = opts.agent;
    this.isBinary = opts.isBinary;
    this.supportsBinary = opts.supportsBinary;
    this.enablesXDR = opts.enablesXDR;
    this.withCredentials = opts.withCredentials;
    this.requestTimeout = opts.requestTimeout; // SSL options for Node.js client

    this.pfx = opts.pfx;
    this.key = opts.key;
    this.passphrase = opts.passphrase;
    this.cert = opts.cert;
    this.ca = opts.ca;
    this.ciphers = opts.ciphers;
    this.rejectUnauthorized = opts.rejectUnauthorized; // other options for Node.js client

    this.extraHeaders = opts.extraHeaders;
    this.create();
  }
  /**
   * Mix in `Emitter`.
   */


  componentEmitter(Request.prototype);
  /**
   * Creates the XHR object and sends the request.
   *
   * @api private
   */

  Request.prototype.create = function () {
    var opts = {
      agent: this.agent,
      xdomain: this.xd,
      xscheme: this.xs,
      enablesXDR: this.enablesXDR
    }; // SSL options for Node.js client

    opts.pfx = this.pfx;
    opts.key = this.key;
    opts.passphrase = this.passphrase;
    opts.cert = this.cert;
    opts.ca = this.ca;
    opts.ciphers = this.ciphers;
    opts.rejectUnauthorized = this.rejectUnauthorized;
    var xhr = this.xhr = new xmlhttprequest(opts);
    var self = this;

    try {
      debug$3('xhr open %s: %s', this.method, this.uri);
      xhr.open(this.method, this.uri, this.async);

      try {
        if (this.extraHeaders) {
          xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);

          for (var i in this.extraHeaders) {
            if (this.extraHeaders.hasOwnProperty(i)) {
              xhr.setRequestHeader(i, this.extraHeaders[i]);
            }
          }
        }
      } catch (e) {}

      if ('POST' === this.method) {
        try {
          if (this.isBinary) {
            xhr.setRequestHeader('Content-type', 'application/octet-stream');
          } else {
            xhr.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
          }
        } catch (e) {}
      }

      try {
        xhr.setRequestHeader('Accept', '*/*');
      } catch (e) {} // ie6 check


      if ('withCredentials' in xhr) {
        xhr.withCredentials = this.withCredentials;
      }

      if (this.requestTimeout) {
        xhr.timeout = this.requestTimeout;
      }

      if (this.hasXDR()) {
        xhr.onload = function () {
          self.onLoad();
        };

        xhr.onerror = function () {
          self.onError(xhr.responseText);
        };
      } else {
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 2) {
            try {
              var contentType = xhr.getResponseHeader('Content-Type');

              if (self.supportsBinary && contentType === 'application/octet-stream' || contentType === 'application/octet-stream; charset=UTF-8') {
                xhr.responseType = 'arraybuffer';
              }
            } catch (e) {}
          }

          if (4 !== xhr.readyState) return;

          if (200 === xhr.status || 1223 === xhr.status) {
            self.onLoad();
          } else {
            // make sure the `error` event handler that's user-set
            // does not throw in the same tick and gets caught here
            setTimeout(function () {
              self.onError(typeof xhr.status === 'number' ? xhr.status : 0);
            }, 0);
          }
        };
      }

      debug$3('xhr data %s', this.data);
      xhr.send(this.data);
    } catch (e) {
      // Need to defer since .create() is called directly fhrom the constructor
      // and thus the 'error' event can only be only bound *after* this exception
      // occurs.  Therefore, also, we cannot throw here at all.
      setTimeout(function () {
        self.onError(e);
      }, 0);
      return;
    }

    if (typeof document !== 'undefined') {
      this.index = Request.requestsCount++;
      Request.requests[this.index] = this;
    }
  };
  /**
   * Called upon successful response.
   *
   * @api private
   */


  Request.prototype.onSuccess = function () {
    this.emit('success');
    this.cleanup();
  };
  /**
   * Called if we have data.
   *
   * @api private
   */


  Request.prototype.onData = function (data) {
    this.emit('data', data);
    this.onSuccess();
  };
  /**
   * Called upon error.
   *
   * @api private
   */


  Request.prototype.onError = function (err) {
    this.emit('error', err);
    this.cleanup(true);
  };
  /**
   * Cleans up house.
   *
   * @api private
   */


  Request.prototype.cleanup = function (fromError) {
    if ('undefined' === typeof this.xhr || null === this.xhr) {
      return;
    } // xmlhttprequest


    if (this.hasXDR()) {
      this.xhr.onload = this.xhr.onerror = empty$2;
    } else {
      this.xhr.onreadystatechange = empty$2;
    }

    if (fromError) {
      try {
        this.xhr.abort();
      } catch (e) {}
    }

    if (typeof document !== 'undefined') {
      delete Request.requests[this.index];
    }

    this.xhr = null;
  };
  /**
   * Called upon load.
   *
   * @api private
   */


  Request.prototype.onLoad = function () {
    var data;

    try {
      var contentType;

      try {
        contentType = this.xhr.getResponseHeader('Content-Type');
      } catch (e) {}

      if (contentType === 'application/octet-stream' || contentType === 'application/octet-stream; charset=UTF-8') {
        data = this.xhr.response || this.xhr.responseText;
      } else {
        data = this.xhr.responseText;
      }
    } catch (e) {
      this.onError(e);
    }

    if (null != data) {
      this.onData(data);
    }
  };
  /**
   * Check if it has XDomainRequest.
   *
   * @api private
   */


  Request.prototype.hasXDR = function () {
    return typeof XDomainRequest !== 'undefined' && !this.xs && this.enablesXDR;
  };
  /**
   * Aborts the request.
   *
   * @api public
   */


  Request.prototype.abort = function () {
    this.cleanup();
  };
  /**
   * Aborts pending requests when unloading the window. This is needed to prevent
   * memory leaks (e.g. when using IE) and to ensure that no spurious error is
   * emitted.
   */


  Request.requestsCount = 0;
  Request.requests = {};

  if (typeof document !== 'undefined') {
    if (typeof attachEvent === 'function') {
      attachEvent('onunload', unloadHandler);
    } else if (typeof addEventListener === 'function') {
      var terminationEvent = 'onpagehide' in self ? 'pagehide' : 'unload';
      addEventListener(terminationEvent, unloadHandler, false);
    }
  }

  function unloadHandler() {
    for (var i in Request.requests) {
      if (Request.requests.hasOwnProperty(i)) {
        Request.requests[i].abort();
      }
    }
  }
  pollingXhr.Request = Request_1;

  /**
   * Module requirements.
   */

  /**
   * Module exports.
   */

  var pollingJsonp = JSONPPolling;
  /**
   * Cached regular expressions.
   */

  var rNewline = /\n/g;
  var rEscapedNewline = /\\n/g;
  /**
   * Global JSONP callbacks.
   */

  var callbacks;
  /**
   * Noop.
   */

  function empty$3() {}
  /**
   * Until https://github.com/tc39/proposal-global is shipped.
   */


  function glob() {
    return typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : {};
  }
  /**
   * JSONP Polling constructor.
   *
   * @param {Object} opts.
   * @api public
   */


  function JSONPPolling(opts) {
    polling.call(this, opts);
    this.query = this.query || {}; // define global callbacks array if not present
    // we do this here (lazily) to avoid unneeded global pollution

    if (!callbacks) {
      // we need to consider multiple engines in the same page
      var global = glob();
      callbacks = global.___eio = global.___eio || [];
    } // callback identifier


    this.index = callbacks.length; // add callback to jsonp global

    var self = this;
    callbacks.push(function (msg) {
      self.onData(msg);
    }); // append to query string

    this.query.j = this.index; // prevent spurious errors from being emitted when the window is unloaded

    if (typeof addEventListener === 'function') {
      addEventListener('beforeunload', function () {
        if (self.script) self.script.onerror = empty$3;
      }, false);
    }
  }
  /**
   * Inherits from Polling.
   */


  componentInherit(JSONPPolling, polling);
  /*
   * JSONP only supports binary as base64 encoded strings
   */

  JSONPPolling.prototype.supportsBinary = false;
  /**
   * Closes the socket.
   *
   * @api private
   */

  JSONPPolling.prototype.doClose = function () {
    if (this.script) {
      this.script.parentNode.removeChild(this.script);
      this.script = null;
    }

    if (this.form) {
      this.form.parentNode.removeChild(this.form);
      this.form = null;
      this.iframe = null;
    }

    polling.prototype.doClose.call(this);
  };
  /**
   * Starts a poll cycle.
   *
   * @api private
   */


  JSONPPolling.prototype.doPoll = function () {
    var self = this;
    var script = document.createElement('script');

    if (this.script) {
      this.script.parentNode.removeChild(this.script);
      this.script = null;
    }

    script.async = true;
    script.src = this.uri();

    script.onerror = function (e) {
      self.onError('jsonp poll error', e);
    };

    var insertAt = document.getElementsByTagName('script')[0];

    if (insertAt) {
      insertAt.parentNode.insertBefore(script, insertAt);
    } else {
      (document.head || document.body).appendChild(script);
    }

    this.script = script;
    var isUAgecko = 'undefined' !== typeof navigator && /gecko/i.test(navigator.userAgent);

    if (isUAgecko) {
      setTimeout(function () {
        var iframe = document.createElement('iframe');
        document.body.appendChild(iframe);
        document.body.removeChild(iframe);
      }, 100);
    }
  };
  /**
   * Writes with a hidden iframe.
   *
   * @param {String} data to send
   * @param {Function} called upon flush.
   * @api private
   */


  JSONPPolling.prototype.doWrite = function (data, fn) {
    var self = this;

    if (!this.form) {
      var form = document.createElement('form');
      var area = document.createElement('textarea');
      var id = this.iframeId = 'eio_iframe_' + this.index;
      var iframe;
      form.className = 'socketio';
      form.style.position = 'absolute';
      form.style.top = '-1000px';
      form.style.left = '-1000px';
      form.target = id;
      form.method = 'POST';
      form.setAttribute('accept-charset', 'utf-8');
      area.name = 'd';
      form.appendChild(area);
      document.body.appendChild(form);
      this.form = form;
      this.area = area;
    }

    this.form.action = this.uri();

    function complete() {
      initIframe();
      fn();
    }

    function initIframe() {
      if (self.iframe) {
        try {
          self.form.removeChild(self.iframe);
        } catch (e) {
          self.onError('jsonp polling iframe removal error', e);
        }
      }

      try {
        // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
        var html = '<iframe src="javascript:0" name="' + self.iframeId + '">';
        iframe = document.createElement(html);
      } catch (e) {
        iframe = document.createElement('iframe');
        iframe.name = self.iframeId;
        iframe.src = 'javascript:0';
      }

      iframe.id = self.iframeId;
      self.form.appendChild(iframe);
      self.iframe = iframe;
    }

    initIframe(); // escape \n to prevent it from being converted into \r\n by some UAs
    // double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side

    data = data.replace(rEscapedNewline, '\\\n');
    this.area.value = data.replace(rNewline, '\\n');

    try {
      this.form.submit();
    } catch (e) {}

    if (this.iframe.attachEvent) {
      this.iframe.onreadystatechange = function () {
        if (self.iframe.readyState === 'complete') {
          complete();
        }
      };
    } else {
      this.iframe.onload = complete;
    }
  };

  var _nodeResolve_empty = {};

  var _nodeResolve_empty$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': _nodeResolve_empty
  });

  var require$$1 = getCjsExportFromNamespace(_nodeResolve_empty$1);

  /**
   * Module dependencies.
   */

  var debug$4 = browser('engine.io-client:websocket');
  var BrowserWebSocket, NodeWebSocket;

  if (typeof WebSocket !== 'undefined') {
    BrowserWebSocket = WebSocket;
  } else if (typeof self !== 'undefined') {
    BrowserWebSocket = self.WebSocket || self.MozWebSocket;
  }

  if (typeof window === 'undefined') {
    try {
      NodeWebSocket = require$$1;
    } catch (e) {}
  }
  /**
   * Get either the `WebSocket` or `MozWebSocket` globals
   * in the browser or try to resolve WebSocket-compatible
   * interface exposed by `ws` for Node-like environment.
   */


  var WebSocketImpl = BrowserWebSocket || NodeWebSocket;
  /**
   * Module exports.
   */

  var websocket = WS;
  /**
   * WebSocket transport constructor.
   *
   * @api {Object} connection options
   * @api public
   */

  function WS(opts) {
    var forceBase64 = opts && opts.forceBase64;

    if (forceBase64) {
      this.supportsBinary = false;
    }

    this.perMessageDeflate = opts.perMessageDeflate;
    this.usingBrowserWebSocket = BrowserWebSocket && !opts.forceNode;
    this.protocols = opts.protocols;

    if (!this.usingBrowserWebSocket) {
      WebSocketImpl = NodeWebSocket;
    }

    transport.call(this, opts);
  }
  /**
   * Inherits from Transport.
   */


  componentInherit(WS, transport);
  /**
   * Transport name.
   *
   * @api public
   */

  WS.prototype.name = 'websocket';
  /*
   * WebSockets support binary
   */

  WS.prototype.supportsBinary = true;
  /**
   * Opens socket.
   *
   * @api private
   */

  WS.prototype.doOpen = function () {
    if (!this.check()) {
      // let probe timeout
      return;
    }

    var uri = this.uri();
    var protocols = this.protocols;
    var opts = {
      agent: this.agent,
      perMessageDeflate: this.perMessageDeflate
    }; // SSL options for Node.js client

    opts.pfx = this.pfx;
    opts.key = this.key;
    opts.passphrase = this.passphrase;
    opts.cert = this.cert;
    opts.ca = this.ca;
    opts.ciphers = this.ciphers;
    opts.rejectUnauthorized = this.rejectUnauthorized;

    if (this.extraHeaders) {
      opts.headers = this.extraHeaders;
    }

    if (this.localAddress) {
      opts.localAddress = this.localAddress;
    }

    try {
      this.ws = this.usingBrowserWebSocket && !this.isReactNative ? protocols ? new WebSocketImpl(uri, protocols) : new WebSocketImpl(uri) : new WebSocketImpl(uri, protocols, opts);
    } catch (err) {
      return this.emit('error', err);
    }

    if (this.ws.binaryType === undefined) {
      this.supportsBinary = false;
    }

    if (this.ws.supports && this.ws.supports.binary) {
      this.supportsBinary = true;
      this.ws.binaryType = 'nodebuffer';
    } else {
      this.ws.binaryType = 'arraybuffer';
    }

    this.addEventListeners();
  };
  /**
   * Adds event listeners to the socket
   *
   * @api private
   */


  WS.prototype.addEventListeners = function () {
    var self = this;

    this.ws.onopen = function () {
      self.onOpen();
    };

    this.ws.onclose = function () {
      self.onClose();
    };

    this.ws.onmessage = function (ev) {
      self.onData(ev.data);
    };

    this.ws.onerror = function (e) {
      self.onError('websocket error', e);
    };
  };
  /**
   * Writes data to socket.
   *
   * @param {Array} array of packets.
   * @api private
   */


  WS.prototype.write = function (packets) {
    var self = this;
    this.writable = false; // encodePacket efficient as it uses WS framing
    // no need for encodePayload

    var total = packets.length;

    for (var i = 0, l = total; i < l; i++) {
      (function (packet) {
        browser$2.encodePacket(packet, self.supportsBinary, function (data) {
          if (!self.usingBrowserWebSocket) {
            // always create a new object (GH-437)
            var opts = {};

            if (packet.options) {
              opts.compress = packet.options.compress;
            }

            if (self.perMessageDeflate) {
              var len = 'string' === typeof data ? Buffer.byteLength(data) : data.length;

              if (len < self.perMessageDeflate.threshold) {
                opts.compress = false;
              }
            }
          } // Sometimes the websocket has already been closed but the browser didn't
          // have a chance of informing us about it yet, in that case send will
          // throw an error


          try {
            if (self.usingBrowserWebSocket) {
              // TypeError is thrown when passing the second argument on Safari
              self.ws.send(data);
            } else {
              self.ws.send(data, opts);
            }
          } catch (e) {
            debug$4('websocket closed before onclose event');
          }

          --total || done();
        });
      })(packets[i]);
    }

    function done() {
      self.emit('flush'); // fake drain
      // defer to next tick to allow Socket to clear writeBuffer

      setTimeout(function () {
        self.writable = true;
        self.emit('drain');
      }, 0);
    }
  };
  /**
   * Called upon close
   *
   * @api private
   */


  WS.prototype.onClose = function () {
    transport.prototype.onClose.call(this);
  };
  /**
   * Closes socket.
   *
   * @api private
   */


  WS.prototype.doClose = function () {
    if (typeof this.ws !== 'undefined') {
      this.ws.close();
    }
  };
  /**
   * Generates uri for connection.
   *
   * @api private
   */


  WS.prototype.uri = function () {
    var query = this.query || {};
    var schema = this.secure ? 'wss' : 'ws';
    var port = ''; // avoid port if default for schema

    if (this.port && ('wss' === schema && Number(this.port) !== 443 || 'ws' === schema && Number(this.port) !== 80)) {
      port = ':' + this.port;
    } // append timestamp to URI


    if (this.timestampRequests) {
      query[this.timestampParam] = yeast_1();
    } // communicate binary support capabilities


    if (!this.supportsBinary) {
      query.b64 = 1;
    }

    query = parseqs.encode(query); // prepend ? to query

    if (query.length) {
      query = '?' + query;
    }

    var ipv6 = this.hostname.indexOf(':') !== -1;
    return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
  };
  /**
   * Feature detection for WebSocket.
   *
   * @return {Boolean} whether this transport is available.
   * @api public
   */


  WS.prototype.check = function () {
    return !!WebSocketImpl && !('__initialize' in WebSocketImpl && this.name === WS.prototype.name);
  };

  /**
   * Module dependencies
   */

  /**
   * Export transports.
   */

  var polling_1 = polling$1;
  var websocket_1 = websocket;
  /**
   * Polling transport polymorphic constructor.
   * Decides on xhr vs jsonp based on feature detection.
   *
   * @api private
   */

  function polling$1(opts) {
    var xhr;
    var xd = false;
    var xs = false;
    var jsonp = false !== opts.jsonp;

    if (typeof location !== 'undefined') {
      var isSSL = 'https:' === location.protocol;
      var port = location.port; // some user agents have empty `location.port`

      if (!port) {
        port = isSSL ? 443 : 80;
      }

      xd = opts.hostname !== location.hostname || port !== opts.port;
      xs = opts.secure !== isSSL;
    }

    opts.xdomain = xd;
    opts.xscheme = xs;
    xhr = new xmlhttprequest(opts);

    if ('open' in xhr && !opts.forceJSONP) {
      return new pollingXhr(opts);
    } else {
      if (!jsonp) throw new Error('JSONP disabled');
      return new pollingJsonp(opts);
    }
  }

  var transports = {
    polling: polling_1,
    websocket: websocket_1
  };

  var indexOf$1 = [].indexOf;

  var indexof = function indexof(arr, obj) {
    if (indexOf$1) return arr.indexOf(obj);

    for (var i = 0; i < arr.length; ++i) {
      if (arr[i] === obj) return i;
    }

    return -1;
  };

  /**
   * Module dependencies.
   */

  var debug$5 = browser('engine.io-client:socket');
  /**
   * Module exports.
   */

  var socket = Socket;
  /**
   * Socket constructor.
   *
   * @param {String|Object} uri or options
   * @param {Object} options
   * @api public
   */

  function Socket(uri, opts) {
    if (!(this instanceof Socket)) return new Socket(uri, opts);
    opts = opts || {};

    if (uri && 'object' === _typeof(uri)) {
      opts = uri;
      uri = null;
    }

    if (uri) {
      uri = parseuri(uri);
      opts.hostname = uri.host;
      opts.secure = uri.protocol === 'https' || uri.protocol === 'wss';
      opts.port = uri.port;
      if (uri.query) opts.query = uri.query;
    } else if (opts.host) {
      opts.hostname = parseuri(opts.host).host;
    }

    this.secure = null != opts.secure ? opts.secure : typeof location !== 'undefined' && 'https:' === location.protocol;

    if (opts.hostname && !opts.port) {
      // if no port is specified manually, use the protocol default
      opts.port = this.secure ? '443' : '80';
    }

    this.agent = opts.agent || false;
    this.hostname = opts.hostname || (typeof location !== 'undefined' ? location.hostname : 'localhost');
    this.port = opts.port || (typeof location !== 'undefined' && location.port ? location.port : this.secure ? 443 : 80);
    this.query = opts.query || {};
    if ('string' === typeof this.query) this.query = parseqs.decode(this.query);
    this.upgrade = false !== opts.upgrade;
    this.path = (opts.path || '/engine.io').replace(/\/$/, '') + '/';
    this.forceJSONP = !!opts.forceJSONP;
    this.jsonp = false !== opts.jsonp;
    this.forceBase64 = !!opts.forceBase64;
    this.enablesXDR = !!opts.enablesXDR;
    this.withCredentials = false !== opts.withCredentials;
    this.timestampParam = opts.timestampParam || 't';
    this.timestampRequests = opts.timestampRequests;
    this.transports = opts.transports || ['polling', 'websocket'];
    this.transportOptions = opts.transportOptions || {};
    this.readyState = '';
    this.writeBuffer = [];
    this.prevBufferLen = 0;
    this.policyPort = opts.policyPort || 843;
    this.rememberUpgrade = opts.rememberUpgrade || false;
    this.binaryType = null;
    this.onlyBinaryUpgrades = opts.onlyBinaryUpgrades;
    this.perMessageDeflate = false !== opts.perMessageDeflate ? opts.perMessageDeflate || {} : false;
    if (true === this.perMessageDeflate) this.perMessageDeflate = {};

    if (this.perMessageDeflate && null == this.perMessageDeflate.threshold) {
      this.perMessageDeflate.threshold = 1024;
    } // SSL options for Node.js client


    this.pfx = opts.pfx || null;
    this.key = opts.key || null;
    this.passphrase = opts.passphrase || null;
    this.cert = opts.cert || null;
    this.ca = opts.ca || null;
    this.ciphers = opts.ciphers || null;
    this.rejectUnauthorized = opts.rejectUnauthorized === undefined ? true : opts.rejectUnauthorized;
    this.forceNode = !!opts.forceNode; // detect ReactNative environment

    this.isReactNative = typeof navigator !== 'undefined' && typeof navigator.product === 'string' && navigator.product.toLowerCase() === 'reactnative'; // other options for Node.js or ReactNative client

    if (typeof self === 'undefined' || this.isReactNative) {
      if (opts.extraHeaders && Object.keys(opts.extraHeaders).length > 0) {
        this.extraHeaders = opts.extraHeaders;
      }

      if (opts.localAddress) {
        this.localAddress = opts.localAddress;
      }
    } // set on handshake


    this.id = null;
    this.upgrades = null;
    this.pingInterval = null;
    this.pingTimeout = null; // set on heartbeat

    this.pingIntervalTimer = null;
    this.pingTimeoutTimer = null;
    this.open();
  }

  Socket.priorWebsocketSuccess = false;
  /**
   * Mix in `Emitter`.
   */

  componentEmitter(Socket.prototype);
  /**
   * Protocol version.
   *
   * @api public
   */

  Socket.protocol = browser$2.protocol; // this is an int

  /**
   * Expose deps for legacy compatibility
   * and standalone browser access.
   */

  Socket.Socket = Socket;
  Socket.Transport = transport;
  Socket.transports = transports;
  Socket.parser = browser$2;
  /**
   * Creates transport of the given type.
   *
   * @param {String} transport name
   * @return {Transport}
   * @api private
   */

  Socket.prototype.createTransport = function (name) {
    debug$5('creating transport "%s"', name);
    var query = clone(this.query); // append engine.io protocol identifier

    query.EIO = browser$2.protocol; // transport name

    query.transport = name; // per-transport options

    var options = this.transportOptions[name] || {}; // session id if we already have one

    if (this.id) query.sid = this.id;
    var transport = new transports[name]({
      query: query,
      socket: this,
      agent: options.agent || this.agent,
      hostname: options.hostname || this.hostname,
      port: options.port || this.port,
      secure: options.secure || this.secure,
      path: options.path || this.path,
      forceJSONP: options.forceJSONP || this.forceJSONP,
      jsonp: options.jsonp || this.jsonp,
      forceBase64: options.forceBase64 || this.forceBase64,
      enablesXDR: options.enablesXDR || this.enablesXDR,
      withCredentials: options.withCredentials || this.withCredentials,
      timestampRequests: options.timestampRequests || this.timestampRequests,
      timestampParam: options.timestampParam || this.timestampParam,
      policyPort: options.policyPort || this.policyPort,
      pfx: options.pfx || this.pfx,
      key: options.key || this.key,
      passphrase: options.passphrase || this.passphrase,
      cert: options.cert || this.cert,
      ca: options.ca || this.ca,
      ciphers: options.ciphers || this.ciphers,
      rejectUnauthorized: options.rejectUnauthorized || this.rejectUnauthorized,
      perMessageDeflate: options.perMessageDeflate || this.perMessageDeflate,
      extraHeaders: options.extraHeaders || this.extraHeaders,
      forceNode: options.forceNode || this.forceNode,
      localAddress: options.localAddress || this.localAddress,
      requestTimeout: options.requestTimeout || this.requestTimeout,
      protocols: options.protocols || void 0,
      isReactNative: this.isReactNative
    });
    return transport;
  };

  function clone(obj) {
    var o = {};

    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        o[i] = obj[i];
      }
    }

    return o;
  }
  /**
   * Initializes transport to use and starts probe.
   *
   * @api private
   */


  Socket.prototype.open = function () {
    var transport;

    if (this.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf('websocket') !== -1) {
      transport = 'websocket';
    } else if (0 === this.transports.length) {
      // Emit error on next tick so it can be listened to
      var self = this;
      setTimeout(function () {
        self.emit('error', 'No transports available');
      }, 0);
      return;
    } else {
      transport = this.transports[0];
    }

    this.readyState = 'opening'; // Retry with the next transport if the transport is disabled (jsonp: false)

    try {
      transport = this.createTransport(transport);
    } catch (e) {
      this.transports.shift();
      this.open();
      return;
    }

    transport.open();
    this.setTransport(transport);
  };
  /**
   * Sets the current transport. Disables the existing one (if any).
   *
   * @api private
   */


  Socket.prototype.setTransport = function (transport) {
    debug$5('setting transport %s', transport.name);
    var self = this;

    if (this.transport) {
      debug$5('clearing existing transport %s', this.transport.name);
      this.transport.removeAllListeners();
    } // set up transport


    this.transport = transport; // set up transport listeners

    transport.on('drain', function () {
      self.onDrain();
    }).on('packet', function (packet) {
      self.onPacket(packet);
    }).on('error', function (e) {
      self.onError(e);
    }).on('close', function () {
      self.onClose('transport close');
    });
  };
  /**
   * Probes a transport.
   *
   * @param {String} transport name
   * @api private
   */


  Socket.prototype.probe = function (name) {
    debug$5('probing transport "%s"', name);
    var transport = this.createTransport(name, {
      probe: 1
    });
    var failed = false;
    var self = this;
    Socket.priorWebsocketSuccess = false;

    function onTransportOpen() {
      if (self.onlyBinaryUpgrades) {
        var upgradeLosesBinary = !this.supportsBinary && self.transport.supportsBinary;
        failed = failed || upgradeLosesBinary;
      }

      if (failed) return;
      debug$5('probe transport "%s" opened', name);
      transport.send([{
        type: 'ping',
        data: 'probe'
      }]);
      transport.once('packet', function (msg) {
        if (failed) return;

        if ('pong' === msg.type && 'probe' === msg.data) {
          debug$5('probe transport "%s" pong', name);
          self.upgrading = true;
          self.emit('upgrading', transport);
          if (!transport) return;
          Socket.priorWebsocketSuccess = 'websocket' === transport.name;
          debug$5('pausing current transport "%s"', self.transport.name);
          self.transport.pause(function () {
            if (failed) return;
            if ('closed' === self.readyState) return;
            debug$5('changing transport and sending upgrade packet');
            cleanup();
            self.setTransport(transport);
            transport.send([{
              type: 'upgrade'
            }]);
            self.emit('upgrade', transport);
            transport = null;
            self.upgrading = false;
            self.flush();
          });
        } else {
          debug$5('probe transport "%s" failed', name);
          var err = new Error('probe error');
          err.transport = transport.name;
          self.emit('upgradeError', err);
        }
      });
    }

    function freezeTransport() {
      if (failed) return; // Any callback called by transport should be ignored since now

      failed = true;
      cleanup();
      transport.close();
      transport = null;
    } // Handle any error that happens while probing


    function onerror(err) {
      var error = new Error('probe error: ' + err);
      error.transport = transport.name;
      freezeTransport();
      debug$5('probe transport "%s" failed because of error: %s', name, err);
      self.emit('upgradeError', error);
    }

    function onTransportClose() {
      onerror('transport closed');
    } // When the socket is closed while we're probing


    function onclose() {
      onerror('socket closed');
    } // When the socket is upgraded while we're probing


    function onupgrade(to) {
      if (transport && to.name !== transport.name) {
        debug$5('"%s" works - aborting "%s"', to.name, transport.name);
        freezeTransport();
      }
    } // Remove all listeners on the transport and on self


    function cleanup() {
      transport.removeListener('open', onTransportOpen);
      transport.removeListener('error', onerror);
      transport.removeListener('close', onTransportClose);
      self.removeListener('close', onclose);
      self.removeListener('upgrading', onupgrade);
    }

    transport.once('open', onTransportOpen);
    transport.once('error', onerror);
    transport.once('close', onTransportClose);
    this.once('close', onclose);
    this.once('upgrading', onupgrade);
    transport.open();
  };
  /**
   * Called when connection is deemed open.
   *
   * @api public
   */


  Socket.prototype.onOpen = function () {
    debug$5('socket open');
    this.readyState = 'open';
    Socket.priorWebsocketSuccess = 'websocket' === this.transport.name;
    this.emit('open');
    this.flush(); // we check for `readyState` in case an `open`
    // listener already closed the socket

    if ('open' === this.readyState && this.upgrade && this.transport.pause) {
      debug$5('starting upgrade probes');

      for (var i = 0, l = this.upgrades.length; i < l; i++) {
        this.probe(this.upgrades[i]);
      }
    }
  };
  /**
   * Handles a packet.
   *
   * @api private
   */


  Socket.prototype.onPacket = function (packet) {
    if ('opening' === this.readyState || 'open' === this.readyState || 'closing' === this.readyState) {
      debug$5('socket receive: type "%s", data "%s"', packet.type, packet.data);
      this.emit('packet', packet); // Socket is live - any packet counts

      this.emit('heartbeat');

      switch (packet.type) {
        case 'open':
          this.onHandshake(JSON.parse(packet.data));
          break;

        case 'pong':
          this.setPing();
          this.emit('pong');
          break;

        case 'error':
          var err = new Error('server error');
          err.code = packet.data;
          this.onError(err);
          break;

        case 'message':
          this.emit('data', packet.data);
          this.emit('message', packet.data);
          break;
      }
    } else {
      debug$5('packet received with socket readyState "%s"', this.readyState);
    }
  };
  /**
   * Called upon handshake completion.
   *
   * @param {Object} handshake obj
   * @api private
   */


  Socket.prototype.onHandshake = function (data) {
    this.emit('handshake', data);
    this.id = data.sid;
    this.transport.query.sid = data.sid;
    this.upgrades = this.filterUpgrades(data.upgrades);
    this.pingInterval = data.pingInterval;
    this.pingTimeout = data.pingTimeout;
    this.onOpen(); // In case open handler closes socket

    if ('closed' === this.readyState) return;
    this.setPing(); // Prolong liveness of socket on heartbeat

    this.removeListener('heartbeat', this.onHeartbeat);
    this.on('heartbeat', this.onHeartbeat);
  };
  /**
   * Resets ping timeout.
   *
   * @api private
   */


  Socket.prototype.onHeartbeat = function (timeout) {
    clearTimeout(this.pingTimeoutTimer);
    var self = this;
    self.pingTimeoutTimer = setTimeout(function () {
      if ('closed' === self.readyState) return;
      self.onClose('ping timeout');
    }, timeout || self.pingInterval + self.pingTimeout);
  };
  /**
   * Pings server every `this.pingInterval` and expects response
   * within `this.pingTimeout` or closes connection.
   *
   * @api private
   */


  Socket.prototype.setPing = function () {
    var self = this;
    clearTimeout(self.pingIntervalTimer);
    self.pingIntervalTimer = setTimeout(function () {
      debug$5('writing ping packet - expecting pong within %sms', self.pingTimeout);
      self.ping();
      self.onHeartbeat(self.pingTimeout);
    }, self.pingInterval);
  };
  /**
  * Sends a ping packet.
  *
  * @api private
  */


  Socket.prototype.ping = function () {
    var self = this;
    this.sendPacket('ping', function () {
      self.emit('ping');
    });
  };
  /**
   * Called on `drain` event
   *
   * @api private
   */


  Socket.prototype.onDrain = function () {
    this.writeBuffer.splice(0, this.prevBufferLen); // setting prevBufferLen = 0 is very important
    // for example, when upgrading, upgrade packet is sent over,
    // and a nonzero prevBufferLen could cause problems on `drain`

    this.prevBufferLen = 0;

    if (0 === this.writeBuffer.length) {
      this.emit('drain');
    } else {
      this.flush();
    }
  };
  /**
   * Flush write buffers.
   *
   * @api private
   */


  Socket.prototype.flush = function () {
    if ('closed' !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
      debug$5('flushing %d packets in socket', this.writeBuffer.length);
      this.transport.send(this.writeBuffer); // keep track of current length of writeBuffer
      // splice writeBuffer and callbackBuffer on `drain`

      this.prevBufferLen = this.writeBuffer.length;
      this.emit('flush');
    }
  };
  /**
   * Sends a message.
   *
   * @param {String} message.
   * @param {Function} callback function.
   * @param {Object} options.
   * @return {Socket} for chaining.
   * @api public
   */


  Socket.prototype.write = Socket.prototype.send = function (msg, options, fn) {
    this.sendPacket('message', msg, options, fn);
    return this;
  };
  /**
   * Sends a packet.
   *
   * @param {String} packet type.
   * @param {String} data.
   * @param {Object} options.
   * @param {Function} callback function.
   * @api private
   */


  Socket.prototype.sendPacket = function (type, data, options, fn) {
    if ('function' === typeof data) {
      fn = data;
      data = undefined;
    }

    if ('function' === typeof options) {
      fn = options;
      options = null;
    }

    if ('closing' === this.readyState || 'closed' === this.readyState) {
      return;
    }

    options = options || {};
    options.compress = false !== options.compress;
    var packet = {
      type: type,
      data: data,
      options: options
    };
    this.emit('packetCreate', packet);
    this.writeBuffer.push(packet);
    if (fn) this.once('flush', fn);
    this.flush();
  };
  /**
   * Closes the connection.
   *
   * @api private
   */


  Socket.prototype.close = function () {
    if ('opening' === this.readyState || 'open' === this.readyState) {
      this.readyState = 'closing';
      var self = this;

      if (this.writeBuffer.length) {
        this.once('drain', function () {
          if (this.upgrading) {
            waitForUpgrade();
          } else {
            close();
          }
        });
      } else if (this.upgrading) {
        waitForUpgrade();
      } else {
        close();
      }
    }

    function close() {
      self.onClose('forced close');
      debug$5('socket closing - telling transport to close');
      self.transport.close();
    }

    function cleanupAndClose() {
      self.removeListener('upgrade', cleanupAndClose);
      self.removeListener('upgradeError', cleanupAndClose);
      close();
    }

    function waitForUpgrade() {
      // wait for upgrade to finish since we can't send packets while pausing a transport
      self.once('upgrade', cleanupAndClose);
      self.once('upgradeError', cleanupAndClose);
    }

    return this;
  };
  /**
   * Called upon transport error
   *
   * @api private
   */


  Socket.prototype.onError = function (err) {
    debug$5('socket error %j', err);
    Socket.priorWebsocketSuccess = false;
    this.emit('error', err);
    this.onClose('transport error', err);
  };
  /**
   * Called upon transport close.
   *
   * @api private
   */


  Socket.prototype.onClose = function (reason, desc) {
    if ('opening' === this.readyState || 'open' === this.readyState || 'closing' === this.readyState) {
      debug$5('socket close with reason: "%s"', reason);
      var self = this; // clear timers

      clearTimeout(this.pingIntervalTimer);
      clearTimeout(this.pingTimeoutTimer); // stop event from firing again for transport

      this.transport.removeAllListeners('close'); // ensure transport won't stay open

      this.transport.close(); // ignore further transport communication

      this.transport.removeAllListeners(); // set ready state

      this.readyState = 'closed'; // clear session id

      this.id = null; // emit close event

      this.emit('close', reason, desc); // clean buffers after, so users can still
      // grab the buffers on `close` event

      self.writeBuffer = [];
      self.prevBufferLen = 0;
    }
  };
  /**
   * Filters upgrades, returning only those matching client transports.
   *
   * @param {Array} server upgrades
   * @api private
   *
   */


  Socket.prototype.filterUpgrades = function (upgrades) {
    var filteredUpgrades = [];

    for (var i = 0, j = upgrades.length; i < j; i++) {
      if (~indexof(this.transports, upgrades[i])) filteredUpgrades.push(upgrades[i]);
    }

    return filteredUpgrades;
  };

  var lib$1 = socket;
  /**
   * Exports parser
   *
   * @api public
   *
   */

  var parser = browser$2;
  lib$1.parser = parser;

  var toArray_1 = toArray;

  function toArray(list, index) {
    var array = [];
    index = index || 0;

    for (var i = index || 0; i < list.length; i++) {
      array[i - index] = list[i];
    }

    return array;
  }

  /**
   * Module exports.
   */
  var on_1 = on;
  /**
   * Helper for subscriptions.
   *
   * @param {Object|EventEmitter} obj with `Emitter` mixin or `EventEmitter`
   * @param {String} event name
   * @param {Function} callback
   * @api public
   */

  function on(obj, ev, fn) {
    obj.on(ev, fn);
    return {
      destroy: function destroy() {
        obj.removeListener(ev, fn);
      }
    };
  }

  /**
   * Slice reference.
   */
  var slice$1 = [].slice;
  /**
   * Bind `obj` to `fn`.
   *
   * @param {Object} obj
   * @param {Function|String} fn or string
   * @return {Function}
   * @api public
   */

  var componentBind = function componentBind(obj, fn) {
    if ('string' == typeof fn) fn = obj[fn];
    if ('function' != typeof fn) throw new Error('bind() requires a function');
    var args = slice$1.call(arguments, 2);
    return function () {
      return fn.apply(obj, args.concat(slice$1.call(arguments)));
    };
  };

  var socket$1 = createCommonjsModule(function (module, exports) {
    /**
     * Module dependencies.
     */
    var debug = browser('socket.io-client:socket');
    /**
     * Module exports.
     */

    module.exports = exports = Socket;
    /**
     * Internal events (blacklisted).
     * These events can't be emitted by the user.
     *
     * @api private
     */

    var events = {
      connect: 1,
      connect_error: 1,
      connect_timeout: 1,
      connecting: 1,
      disconnect: 1,
      error: 1,
      reconnect: 1,
      reconnect_attempt: 1,
      reconnect_failed: 1,
      reconnect_error: 1,
      reconnecting: 1,
      ping: 1,
      pong: 1
    };
    /**
     * Shortcut to `Emitter#emit`.
     */

    var emit = componentEmitter.prototype.emit;
    /**
     * `Socket` constructor.
     *
     * @api public
     */

    function Socket(io, nsp, opts) {
      this.io = io;
      this.nsp = nsp;
      this.json = this; // compat

      this.ids = 0;
      this.acks = {};
      this.receiveBuffer = [];
      this.sendBuffer = [];
      this.connected = false;
      this.disconnected = true;
      this.flags = {};

      if (opts && opts.query) {
        this.query = opts.query;
      }

      if (this.io.autoConnect) this.open();
    }
    /**
     * Mix in `Emitter`.
     */


    componentEmitter(Socket.prototype);
    /**
     * Subscribe to open, close and packet events
     *
     * @api private
     */

    Socket.prototype.subEvents = function () {
      if (this.subs) return;
      var io = this.io;
      this.subs = [on_1(io, 'open', componentBind(this, 'onopen')), on_1(io, 'packet', componentBind(this, 'onpacket')), on_1(io, 'close', componentBind(this, 'onclose'))];
    };
    /**
     * "Opens" the socket.
     *
     * @api public
     */


    Socket.prototype.open = Socket.prototype.connect = function () {
      if (this.connected) return this;
      this.subEvents();
      this.io.open(); // ensure open

      if ('open' === this.io.readyState) this.onopen();
      this.emit('connecting');
      return this;
    };
    /**
     * Sends a `message` event.
     *
     * @return {Socket} self
     * @api public
     */


    Socket.prototype.send = function () {
      var args = toArray_1(arguments);
      args.unshift('message');
      this.emit.apply(this, args);
      return this;
    };
    /**
     * Override `emit`.
     * If the event is in `events`, it's emitted normally.
     *
     * @param {String} event name
     * @return {Socket} self
     * @api public
     */


    Socket.prototype.emit = function (ev) {
      if (events.hasOwnProperty(ev)) {
        emit.apply(this, arguments);
        return this;
      }

      var args = toArray_1(arguments);
      var packet = {
        type: (this.flags.binary !== undefined ? this.flags.binary : hasBinary2(args)) ? socket_ioParser.BINARY_EVENT : socket_ioParser.EVENT,
        data: args
      };
      packet.options = {};
      packet.options.compress = !this.flags || false !== this.flags.compress; // event ack callback

      if ('function' === typeof args[args.length - 1]) {
        debug('emitting packet with ack id %d', this.ids);
        this.acks[this.ids] = args.pop();
        packet.id = this.ids++;
      }

      if (this.connected) {
        this.packet(packet);
      } else {
        this.sendBuffer.push(packet);
      }

      this.flags = {};
      return this;
    };
    /**
     * Sends a packet.
     *
     * @param {Object} packet
     * @api private
     */


    Socket.prototype.packet = function (packet) {
      packet.nsp = this.nsp;
      this.io.packet(packet);
    };
    /**
     * Called upon engine `open`.
     *
     * @api private
     */


    Socket.prototype.onopen = function () {
      debug('transport is open - connecting'); // write connect packet if necessary

      if ('/' !== this.nsp) {
        if (this.query) {
          var query = _typeof(this.query) === 'object' ? parseqs.encode(this.query) : this.query;
          debug('sending connect packet with query %s', query);
          this.packet({
            type: socket_ioParser.CONNECT,
            query: query
          });
        } else {
          this.packet({
            type: socket_ioParser.CONNECT
          });
        }
      }
    };
    /**
     * Called upon engine `close`.
     *
     * @param {String} reason
     * @api private
     */


    Socket.prototype.onclose = function (reason) {
      debug('close (%s)', reason);
      this.connected = false;
      this.disconnected = true;
      delete this.id;
      this.emit('disconnect', reason);
    };
    /**
     * Called with socket packet.
     *
     * @param {Object} packet
     * @api private
     */


    Socket.prototype.onpacket = function (packet) {
      var sameNamespace = packet.nsp === this.nsp;
      var rootNamespaceError = packet.type === socket_ioParser.ERROR && packet.nsp === '/';
      if (!sameNamespace && !rootNamespaceError) return;

      switch (packet.type) {
        case socket_ioParser.CONNECT:
          this.onconnect();
          break;

        case socket_ioParser.EVENT:
          this.onevent(packet);
          break;

        case socket_ioParser.BINARY_EVENT:
          this.onevent(packet);
          break;

        case socket_ioParser.ACK:
          this.onack(packet);
          break;

        case socket_ioParser.BINARY_ACK:
          this.onack(packet);
          break;

        case socket_ioParser.DISCONNECT:
          this.ondisconnect();
          break;

        case socket_ioParser.ERROR:
          this.emit('error', packet.data);
          break;
      }
    };
    /**
     * Called upon a server event.
     *
     * @param {Object} packet
     * @api private
     */


    Socket.prototype.onevent = function (packet) {
      var args = packet.data || [];
      debug('emitting event %j', args);

      if (null != packet.id) {
        debug('attaching ack callback to event');
        args.push(this.ack(packet.id));
      }

      if (this.connected) {
        emit.apply(this, args);
      } else {
        this.receiveBuffer.push(args);
      }
    };
    /**
     * Produces an ack callback to emit with an event.
     *
     * @api private
     */


    Socket.prototype.ack = function (id) {
      var self = this;
      var sent = false;
      return function () {
        // prevent double callbacks
        if (sent) return;
        sent = true;
        var args = toArray_1(arguments);
        debug('sending ack %j', args);
        self.packet({
          type: hasBinary2(args) ? socket_ioParser.BINARY_ACK : socket_ioParser.ACK,
          id: id,
          data: args
        });
      };
    };
    /**
     * Called upon a server acknowlegement.
     *
     * @param {Object} packet
     * @api private
     */


    Socket.prototype.onack = function (packet) {
      var ack = this.acks[packet.id];

      if ('function' === typeof ack) {
        debug('calling ack %s with %j', packet.id, packet.data);
        ack.apply(this, packet.data);
        delete this.acks[packet.id];
      } else {
        debug('bad ack %s', packet.id);
      }
    };
    /**
     * Called upon server connect.
     *
     * @api private
     */


    Socket.prototype.onconnect = function () {
      this.connected = true;
      this.disconnected = false;
      this.emit('connect');
      this.emitBuffered();
    };
    /**
     * Emit buffered events (received and emitted).
     *
     * @api private
     */


    Socket.prototype.emitBuffered = function () {
      var i;

      for (i = 0; i < this.receiveBuffer.length; i++) {
        emit.apply(this, this.receiveBuffer[i]);
      }

      this.receiveBuffer = [];

      for (i = 0; i < this.sendBuffer.length; i++) {
        this.packet(this.sendBuffer[i]);
      }

      this.sendBuffer = [];
    };
    /**
     * Called upon server disconnect.
     *
     * @api private
     */


    Socket.prototype.ondisconnect = function () {
      debug('server disconnect (%s)', this.nsp);
      this.destroy();
      this.onclose('io server disconnect');
    };
    /**
     * Called upon forced client/server side disconnections,
     * this method ensures the manager stops tracking us and
     * that reconnections don't get triggered for this.
     *
     * @api private.
     */


    Socket.prototype.destroy = function () {
      if (this.subs) {
        // clean subscriptions to avoid reconnections
        for (var i = 0; i < this.subs.length; i++) {
          this.subs[i].destroy();
        }

        this.subs = null;
      }

      this.io.destroy(this);
    };
    /**
     * Disconnects the socket manually.
     *
     * @return {Socket} self
     * @api public
     */


    Socket.prototype.close = Socket.prototype.disconnect = function () {
      if (this.connected) {
        debug('performing disconnect (%s)', this.nsp);
        this.packet({
          type: socket_ioParser.DISCONNECT
        });
      } // remove socket from pool


      this.destroy();

      if (this.connected) {
        // fire events
        this.onclose('io client disconnect');
      }

      return this;
    };
    /**
     * Sets the compress flag.
     *
     * @param {Boolean} if `true`, compresses the sending data
     * @return {Socket} self
     * @api public
     */


    Socket.prototype.compress = function (compress) {
      this.flags.compress = compress;
      return this;
    };
    /**
     * Sets the binary flag
     *
     * @param {Boolean} whether the emitted data contains binary
     * @return {Socket} self
     * @api public
     */


    Socket.prototype.binary = function (binary) {
      this.flags.binary = binary;
      return this;
    };
  });

  /**
   * Expose `Backoff`.
   */
  var backo2 = Backoff;
  /**
   * Initialize backoff timer with `opts`.
   *
   * - `min` initial timeout in milliseconds [100]
   * - `max` max timeout [10000]
   * - `jitter` [0]
   * - `factor` [2]
   *
   * @param {Object} opts
   * @api public
   */

  function Backoff(opts) {
    opts = opts || {};
    this.ms = opts.min || 100;
    this.max = opts.max || 10000;
    this.factor = opts.factor || 2;
    this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
    this.attempts = 0;
  }
  /**
   * Return the backoff duration.
   *
   * @return {Number}
   * @api public
   */


  Backoff.prototype.duration = function () {
    var ms = this.ms * Math.pow(this.factor, this.attempts++);

    if (this.jitter) {
      var rand = Math.random();
      var deviation = Math.floor(rand * this.jitter * ms);
      ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
    }

    return Math.min(ms, this.max) | 0;
  };
  /**
   * Reset the number of attempts.
   *
   * @api public
   */


  Backoff.prototype.reset = function () {
    this.attempts = 0;
  };
  /**
   * Set the minimum duration
   *
   * @api public
   */


  Backoff.prototype.setMin = function (min) {
    this.ms = min;
  };
  /**
   * Set the maximum duration
   *
   * @api public
   */


  Backoff.prototype.setMax = function (max) {
    this.max = max;
  };
  /**
   * Set the jitter
   *
   * @api public
   */


  Backoff.prototype.setJitter = function (jitter) {
    this.jitter = jitter;
  };

  /**
   * Module dependencies.
   */

  var debug$6 = browser('socket.io-client:manager');
  /**
   * IE6+ hasOwnProperty
   */

  var has = Object.prototype.hasOwnProperty;
  /**
   * Module exports
   */

  var manager = Manager;
  /**
   * `Manager` constructor.
   *
   * @param {String} engine instance or engine uri/opts
   * @param {Object} options
   * @api public
   */

  function Manager(uri, opts) {
    if (!(this instanceof Manager)) return new Manager(uri, opts);

    if (uri && 'object' === _typeof(uri)) {
      opts = uri;
      uri = undefined;
    }

    opts = opts || {};
    opts.path = opts.path || '/socket.io';
    this.nsps = {};
    this.subs = [];
    this.opts = opts;
    this.reconnection(opts.reconnection !== false);
    this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
    this.reconnectionDelay(opts.reconnectionDelay || 1000);
    this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
    this.randomizationFactor(opts.randomizationFactor || 0.5);
    this.backoff = new backo2({
      min: this.reconnectionDelay(),
      max: this.reconnectionDelayMax(),
      jitter: this.randomizationFactor()
    });
    this.timeout(null == opts.timeout ? 20000 : opts.timeout);
    this.readyState = 'closed';
    this.uri = uri;
    this.connecting = [];
    this.lastPing = null;
    this.encoding = false;
    this.packetBuffer = [];

    var _parser = opts.parser || socket_ioParser;

    this.encoder = new _parser.Encoder();
    this.decoder = new _parser.Decoder();
    this.autoConnect = opts.autoConnect !== false;
    if (this.autoConnect) this.open();
  }
  /**
   * Propagate given event to sockets and emit on `this`
   *
   * @api private
   */


  Manager.prototype.emitAll = function () {
    this.emit.apply(this, arguments);

    for (var nsp in this.nsps) {
      if (has.call(this.nsps, nsp)) {
        this.nsps[nsp].emit.apply(this.nsps[nsp], arguments);
      }
    }
  };
  /**
   * Update `socket.id` of all sockets
   *
   * @api private
   */


  Manager.prototype.updateSocketIds = function () {
    for (var nsp in this.nsps) {
      if (has.call(this.nsps, nsp)) {
        this.nsps[nsp].id = this.generateId(nsp);
      }
    }
  };
  /**
   * generate `socket.id` for the given `nsp`
   *
   * @param {String} nsp
   * @return {String}
   * @api private
   */


  Manager.prototype.generateId = function (nsp) {
    return (nsp === '/' ? '' : nsp + '#') + this.engine.id;
  };
  /**
   * Mix in `Emitter`.
   */


  componentEmitter(Manager.prototype);
  /**
   * Sets the `reconnection` config.
   *
   * @param {Boolean} true/false if it should automatically reconnect
   * @return {Manager} self or value
   * @api public
   */

  Manager.prototype.reconnection = function (v) {
    if (!arguments.length) return this._reconnection;
    this._reconnection = !!v;
    return this;
  };
  /**
   * Sets the reconnection attempts config.
   *
   * @param {Number} max reconnection attempts before giving up
   * @return {Manager} self or value
   * @api public
   */


  Manager.prototype.reconnectionAttempts = function (v) {
    if (!arguments.length) return this._reconnectionAttempts;
    this._reconnectionAttempts = v;
    return this;
  };
  /**
   * Sets the delay between reconnections.
   *
   * @param {Number} delay
   * @return {Manager} self or value
   * @api public
   */


  Manager.prototype.reconnectionDelay = function (v) {
    if (!arguments.length) return this._reconnectionDelay;
    this._reconnectionDelay = v;
    this.backoff && this.backoff.setMin(v);
    return this;
  };

  Manager.prototype.randomizationFactor = function (v) {
    if (!arguments.length) return this._randomizationFactor;
    this._randomizationFactor = v;
    this.backoff && this.backoff.setJitter(v);
    return this;
  };
  /**
   * Sets the maximum delay between reconnections.
   *
   * @param {Number} delay
   * @return {Manager} self or value
   * @api public
   */


  Manager.prototype.reconnectionDelayMax = function (v) {
    if (!arguments.length) return this._reconnectionDelayMax;
    this._reconnectionDelayMax = v;
    this.backoff && this.backoff.setMax(v);
    return this;
  };
  /**
   * Sets the connection timeout. `false` to disable
   *
   * @return {Manager} self or value
   * @api public
   */


  Manager.prototype.timeout = function (v) {
    if (!arguments.length) return this._timeout;
    this._timeout = v;
    return this;
  };
  /**
   * Starts trying to reconnect if reconnection is enabled and we have not
   * started reconnecting yet
   *
   * @api private
   */


  Manager.prototype.maybeReconnectOnOpen = function () {
    // Only try to reconnect if it's the first time we're connecting
    if (!this.reconnecting && this._reconnection && this.backoff.attempts === 0) {
      // keeps reconnection from firing twice for the same reconnection loop
      this.reconnect();
    }
  };
  /**
   * Sets the current transport `socket`.
   *
   * @param {Function} optional, callback
   * @return {Manager} self
   * @api public
   */


  Manager.prototype.open = Manager.prototype.connect = function (fn, opts) {
    debug$6('readyState %s', this.readyState);
    if (~this.readyState.indexOf('open')) return this;
    debug$6('opening %s', this.uri);
    this.engine = lib$1(this.uri, this.opts);
    var socket = this.engine;
    var self = this;
    this.readyState = 'opening';
    this.skipReconnect = false; // emit `open`

    var openSub = on_1(socket, 'open', function () {
      self.onopen();
      fn && fn();
    }); // emit `connect_error`

    var errorSub = on_1(socket, 'error', function (data) {
      debug$6('connect_error');
      self.cleanup();
      self.readyState = 'closed';
      self.emitAll('connect_error', data);

      if (fn) {
        var err = new Error('Connection error');
        err.data = data;
        fn(err);
      } else {
        // Only do this if there is no fn to handle the error
        self.maybeReconnectOnOpen();
      }
    }); // emit `connect_timeout`

    if (false !== this._timeout) {
      var timeout = this._timeout;
      debug$6('connect attempt will timeout after %d', timeout); // set timer

      var timer = setTimeout(function () {
        debug$6('connect attempt timed out after %d', timeout);
        openSub.destroy();
        socket.close();
        socket.emit('error', 'timeout');
        self.emitAll('connect_timeout', timeout);
      }, timeout);
      this.subs.push({
        destroy: function destroy() {
          clearTimeout(timer);
        }
      });
    }

    this.subs.push(openSub);
    this.subs.push(errorSub);
    return this;
  };
  /**
   * Called upon transport open.
   *
   * @api private
   */


  Manager.prototype.onopen = function () {
    debug$6('open'); // clear old subs

    this.cleanup(); // mark as open

    this.readyState = 'open';
    this.emit('open'); // add new subs

    var socket = this.engine;
    this.subs.push(on_1(socket, 'data', componentBind(this, 'ondata')));
    this.subs.push(on_1(socket, 'ping', componentBind(this, 'onping')));
    this.subs.push(on_1(socket, 'pong', componentBind(this, 'onpong')));
    this.subs.push(on_1(socket, 'error', componentBind(this, 'onerror')));
    this.subs.push(on_1(socket, 'close', componentBind(this, 'onclose')));
    this.subs.push(on_1(this.decoder, 'decoded', componentBind(this, 'ondecoded')));
  };
  /**
   * Called upon a ping.
   *
   * @api private
   */


  Manager.prototype.onping = function () {
    this.lastPing = new Date();
    this.emitAll('ping');
  };
  /**
   * Called upon a packet.
   *
   * @api private
   */


  Manager.prototype.onpong = function () {
    this.emitAll('pong', new Date() - this.lastPing);
  };
  /**
   * Called with data.
   *
   * @api private
   */


  Manager.prototype.ondata = function (data) {
    this.decoder.add(data);
  };
  /**
   * Called when parser fully decodes a packet.
   *
   * @api private
   */


  Manager.prototype.ondecoded = function (packet) {
    this.emit('packet', packet);
  };
  /**
   * Called upon socket error.
   *
   * @api private
   */


  Manager.prototype.onerror = function (err) {
    debug$6('error', err);
    this.emitAll('error', err);
  };
  /**
   * Creates a new socket for the given `nsp`.
   *
   * @return {Socket}
   * @api public
   */


  Manager.prototype.socket = function (nsp, opts) {
    var socket = this.nsps[nsp];

    if (!socket) {
      socket = new socket$1(this, nsp, opts);
      this.nsps[nsp] = socket;
      var self = this;
      socket.on('connecting', onConnecting);
      socket.on('connect', function () {
        socket.id = self.generateId(nsp);
      });

      if (this.autoConnect) {
        // manually call here since connecting event is fired before listening
        onConnecting();
      }
    }

    function onConnecting() {
      if (!~indexof(self.connecting, socket)) {
        self.connecting.push(socket);
      }
    }

    return socket;
  };
  /**
   * Called upon a socket close.
   *
   * @param {Socket} socket
   */


  Manager.prototype.destroy = function (socket) {
    var index = indexof(this.connecting, socket);
    if (~index) this.connecting.splice(index, 1);
    if (this.connecting.length) return;
    this.close();
  };
  /**
   * Writes a packet.
   *
   * @param {Object} packet
   * @api private
   */


  Manager.prototype.packet = function (packet) {
    debug$6('writing packet %j', packet);
    var self = this;
    if (packet.query && packet.type === 0) packet.nsp += '?' + packet.query;

    if (!self.encoding) {
      // encode, then write to engine with result
      self.encoding = true;
      this.encoder.encode(packet, function (encodedPackets) {
        for (var i = 0; i < encodedPackets.length; i++) {
          self.engine.write(encodedPackets[i], packet.options);
        }

        self.encoding = false;
        self.processPacketQueue();
      });
    } else {
      // add packet to the queue
      self.packetBuffer.push(packet);
    }
  };
  /**
   * If packet buffer is non-empty, begins encoding the
   * next packet in line.
   *
   * @api private
   */


  Manager.prototype.processPacketQueue = function () {
    if (this.packetBuffer.length > 0 && !this.encoding) {
      var pack = this.packetBuffer.shift();
      this.packet(pack);
    }
  };
  /**
   * Clean up transport subscriptions and packet buffer.
   *
   * @api private
   */


  Manager.prototype.cleanup = function () {
    debug$6('cleanup');
    var subsLength = this.subs.length;

    for (var i = 0; i < subsLength; i++) {
      var sub = this.subs.shift();
      sub.destroy();
    }

    this.packetBuffer = [];
    this.encoding = false;
    this.lastPing = null;
    this.decoder.destroy();
  };
  /**
   * Close the current socket.
   *
   * @api private
   */


  Manager.prototype.close = Manager.prototype.disconnect = function () {
    debug$6('disconnect');
    this.skipReconnect = true;
    this.reconnecting = false;

    if ('opening' === this.readyState) {
      // `onclose` will not fire because
      // an open event never happened
      this.cleanup();
    }

    this.backoff.reset();
    this.readyState = 'closed';
    if (this.engine) this.engine.close();
  };
  /**
   * Called upon engine close.
   *
   * @api private
   */


  Manager.prototype.onclose = function (reason) {
    debug$6('onclose');
    this.cleanup();
    this.backoff.reset();
    this.readyState = 'closed';
    this.emit('close', reason);

    if (this._reconnection && !this.skipReconnect) {
      this.reconnect();
    }
  };
  /**
   * Attempt a reconnection.
   *
   * @api private
   */


  Manager.prototype.reconnect = function () {
    if (this.reconnecting || this.skipReconnect) return this;
    var self = this;

    if (this.backoff.attempts >= this._reconnectionAttempts) {
      debug$6('reconnect failed');
      this.backoff.reset();
      this.emitAll('reconnect_failed');
      this.reconnecting = false;
    } else {
      var delay = this.backoff.duration();
      debug$6('will wait %dms before reconnect attempt', delay);
      this.reconnecting = true;
      var timer = setTimeout(function () {
        if (self.skipReconnect) return;
        debug$6('attempting reconnect');
        self.emitAll('reconnect_attempt', self.backoff.attempts);
        self.emitAll('reconnecting', self.backoff.attempts); // check again for the case socket closed in above events

        if (self.skipReconnect) return;
        self.open(function (err) {
          if (err) {
            debug$6('reconnect attempt error');
            self.reconnecting = false;
            self.reconnect();
            self.emitAll('reconnect_error', err.data);
          } else {
            debug$6('reconnect success');
            self.onreconnect();
          }
        });
      }, delay);
      this.subs.push({
        destroy: function destroy() {
          clearTimeout(timer);
        }
      });
    }
  };
  /**
   * Called upon successful reconnect.
   *
   * @api private
   */


  Manager.prototype.onreconnect = function () {
    var attempt = this.backoff.attempts;
    this.reconnecting = false;
    this.backoff.reset();
    this.updateSocketIds();
    this.emitAll('reconnect', attempt);
  };

  var lib$2 = createCommonjsModule(function (module, exports) {
    /**
     * Module dependencies.
     */
    var debug = browser('socket.io-client');
    /**
     * Module exports.
     */

    module.exports = exports = lookup;
    /**
     * Managers cache.
     */

    var cache = exports.managers = {};
    /**
     * Looks up an existing `Manager` for multiplexing.
     * If the user summons:
     *
     *   `io('http://localhost/a');`
     *   `io('http://localhost/b');`
     *
     * We reuse the existing instance based on same scheme/port/host,
     * and we initialize sockets for each namespace.
     *
     * @api public
     */

    function lookup(uri, opts) {
      if (_typeof(uri) === 'object') {
        opts = uri;
        uri = undefined;
      }

      opts = opts || {};
      var parsed = url_1(uri);
      var source = parsed.source;
      var id = parsed.id;
      var path = parsed.path;
      var sameNamespace = cache[id] && path in cache[id].nsps;
      var newConnection = opts.forceNew || opts['force new connection'] || false === opts.multiplex || sameNamespace;
      var io;

      if (newConnection) {
        debug('ignoring socket cache for %s', source);
        io = manager(source, opts);
      } else {
        if (!cache[id]) {
          debug('new io instance for %s', source);
          cache[id] = manager(source, opts);
        }

        io = cache[id];
      }

      if (parsed.query && !opts.query) {
        opts.query = parsed.query;
      }

      return io.socket(parsed.path, opts);
    }
    /**
     * Protocol version.
     *
     * @api public
     */


    exports.protocol = socket_ioParser.protocol;
    /**
     * `connect`.
     *
     * @param {String} uri
     * @api public
     */

    exports.connect = lookup;
    /**
     * Expose constructors for standalone build.
     *
     * @api public
     */

    exports.Manager = manager;
    exports.Socket = socket$1;
  });
  var lib_1 = lib$2.managers;
  var lib_2 = lib$2.protocol;
  var lib_3 = lib$2.connect;
  var lib_4 = lib$2.Manager;
  var lib_5 = lib$2.Socket;

  /**
   * Класс для работы с web socket сервером
   * @class
   * @name ChatWss
   * @requires socket.io-client
   */

  var ChatWss =
  /*#__PURE__*/
  function (_Chat) {
    _inherits(ChatWss, _Chat);

    function ChatWss() {
      var _this;

      _classCallCheck(this, ChatWss);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ChatWss).call(this));
      _this.socket = null;

      _this.init();

      return _this;
    }

    _createClass(ChatWss, [{
      key: "init",
      value: function init() {
        this.socket = lib$2(this.baseUrl, {
          socket: {
            transports: ['websocket', 'polling'],
            secure: true,
            reconnect: true,
            rejectUnauthorized: false
          }
        });
        this.bindEvents();
      }
    }, {
      key: "signIn",
      value: function signIn() {
        this.socket.emit('user.auth', this.token);
      }
      /**
       * @function
       * @name reconnect
       * @description выполнить
       */

    }, {
      key: "reconnect",
      value: function reconnect() {
        this.socket.emit('user.authReconnect', this.token);
      }
      /**
       * @function
       * @name send
       * @param {string} text - текстовое сообщение, которое отобразится в чате
       * @param {{string|number|undefined}} value - значение, которое передаётся на сервер, в противном случае передаётся поле text
       * @param {boolean} isEmpty - флаг для указания того, нужно ли отображать отправленное сообщение в чате
       */

    }, {
      key: "send",
      value: function send(_ref) {
        var text = _ref.text,
            value = _ref.value,
            isEmpty = _ref.isEmpty;
        var currentValue = value || text;
        isMessagesLoading.set(true);
        var data = {
          message: currentValue,
          token: this.token,
          locale: this.locale
        };

        if (!isEmpty) {
          this.setMessages({
            text: text
          });
        }

        this.socket.emit('messages.send', data);
        this.messageSendEvent.dispatchEvent(data);

        if (this.isDev) {
          console.group();
          console.log('Сообщение отправлено');
          console.log(data);
          console.groupEnd();
        }
      }
    }, {
      key: "bindEvents",
      value: function bindEvents() {
        var _this2 = this;

        this.socket.on('connect', function () {
          _this2.signIn();

          if (_this2.isDev) {
            console.group();
            console.log('Соединение с веб сокетом установлено');
            console.log("\u0410\u0434\u0440\u0435\u0441: ".concat(_this2.baseUrl));
            console.groupEnd();
          }
        });
        this.socket.on('reconnect', function () {
          _this2.reconnect();

          if (_this2.isDev) {
            console.group();
            console.log('Соединение с веб сокетом восстановлено');
            console.log("\u0410\u0434\u0440\u0435\u0441: ".concat(_this2.baseUrl));
            console.groupEnd();
          }
        });
        this.socket.on('disconnect', function () {
          if (_this2.isDev) {
            console.log('Соединение с веб сокетом отключено');
          }
        });
        this.socket.on('messages.reply', function (responseString) {
          var _JSON$parse = JSON.parse(responseString),
              messages = _JSON$parse.messages;

          _this2.setMessages(messages);

          isMessagesLoading.set(false);

          if (_this2.isDev) {
            console.group();
            console.log('Сообщение получено:');
            console.log(messages);
            console.groupEnd();
          }
        });
        this.socket.on('user.authOK', function (boolean) {
          if (_this2.isDev) {
            if (boolean) {
              console.log('Авторизация с веб сокетом прошла успешно');
            } else {
              console.log('Авторизация с веб сокетом не прошла');
            }
          }

          if (boolean) {
            _this2.send({
              text: '/welcome',
              isEmpty: true
            });

            chatLoading.show();
          }
        });
        this.socket.on('user.authReconnectOK', function (responseString) {
          var response = JSON.parse(responseString);

          if (_this2.isDev) {
            console.group();
            console.log('Авторизация восстановлена');
            console.log(response);
            console.groupEnd();
          }
        });
      }
    }]);

    return ChatWss;
  }(Chat);

  /**
   * Класс для работы с http сервером
   * @class
   * @name ChatHttp
   * @requires axios
   */

  var ChatHttp =
  /*#__PURE__*/
  function (_Chat) {
    _inherits(ChatHttp, _Chat);

    function ChatHttp() {
      var _this;

      _classCallCheck(this, ChatHttp);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ChatHttp).call(this));

      _this.init();

      return _this;
    }

    _createClass(ChatHttp, [{
      key: "init",
      value: function () {
        var _init = _asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee() {
          return regenerator.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return this.signIn();

                case 2:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function init() {
          return _init.apply(this, arguments);
        }

        return init;
      }()
      /**
       * @function
       * @name send
       * @param {string} text - текстовое сообщение, которое отобразится в чате
       * @param {{string|number|undefined}} value - значение, которое передаётся на сервер, в противном случае передаётся поле text
       * @param {boolean} isEmpty - флаг для указания того, нужно ли отображать отправленное сообщение в чате
       */

    }, {
      key: "send",
      value: function () {
        var _send = _asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee2(_ref) {
          var text, value, isEmpty, currentValue, data, _ref2, messages;

          return regenerator.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  text = _ref.text, value = _ref.value, isEmpty = _ref.isEmpty;
                  currentValue = value || text;
                  isMessagesLoading.set(true);
                  data = {
                    message: currentValue,
                    token: this.token,
                    locale: this.locale
                  };

                  if (!isEmpty) {
                    this.setMessages({
                      text: text
                    });
                  }

                  if (this.isDev) {
                    console.group();
                    console.log('Сообщение отправлено');
                    console.log(data);
                    console.groupEnd();
                  }

                  _context2.prev = 6;
                  this.messageSendEvent.dispatchEvent(data);
                  _context2.next = 10;
                  return axios$1.post(this.baseUrl, data);

                case 10:
                  _ref2 = _context2.sent;
                  messages = _ref2.data.messages;
                  this.setMessages(messages);

                  if (this.isDev) {
                    console.group();
                    console.log('Сообщение получено:');
                    console.log(messages);
                    console.groupEnd();
                  }

                  _context2.next = 19;
                  break;

                case 16:
                  _context2.prev = 16;
                  _context2.t0 = _context2["catch"](6);
                  console.log(_context2.t0);

                case 19:
                  _context2.prev = 19;
                  isMessagesLoading.set(false);
                  return _context2.finish(19);

                case 22:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this, [[6, 16, 19, 22]]);
        }));

        function send(_x) {
          return _send.apply(this, arguments);
        }

        return send;
      }()
    }, {
      key: "signIn",
      value: function () {
        var _signIn = _asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee3() {
          return regenerator.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return this.send({
                    text: '/welcome',
                    isEmpty: true
                  });

                case 2:
                  chatLoading.show();

                case 3:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function signIn() {
          return _signIn.apply(this, arguments);
        }

        return signIn;
      }()
    }]);

    return ChatHttp;
  }(Chat);

  function cubicOut(t) {
    var f = t - 1.0;
    return f * f * f + 1.0;
  }

  function fade(node, _ref2) {
    var _ref2$delay = _ref2.delay,
        delay = _ref2$delay === void 0 ? 0 : _ref2$delay,
        _ref2$duration = _ref2.duration,
        duration = _ref2$duration === void 0 ? 400 : _ref2$duration,
        _ref2$easing = _ref2.easing,
        easing = _ref2$easing === void 0 ? identity$1 : _ref2$easing;
    var o = +getComputedStyle(node).opacity;
    return {
      delay: delay,
      duration: duration,
      easing: easing,
      css: function css(t) {
        return "opacity: ".concat(t * o);
      }
    };
  }

  function fly(node, _ref3) {
    var _ref3$delay = _ref3.delay,
        delay = _ref3$delay === void 0 ? 0 : _ref3$delay,
        _ref3$duration = _ref3.duration,
        duration = _ref3$duration === void 0 ? 400 : _ref3$duration,
        _ref3$easing = _ref3.easing,
        easing = _ref3$easing === void 0 ? cubicOut : _ref3$easing,
        _ref3$x = _ref3.x,
        x = _ref3$x === void 0 ? 0 : _ref3$x,
        _ref3$y = _ref3.y,
        y = _ref3$y === void 0 ? 0 : _ref3$y,
        _ref3$opacity = _ref3.opacity,
        opacity = _ref3$opacity === void 0 ? 0 : _ref3$opacity;
    var style = getComputedStyle(node);
    var target_opacity = +style.opacity;
    var transform = style.transform === 'none' ? '' : style.transform;
    var od = target_opacity * (1 - opacity);
    return {
      delay: delay,
      duration: duration,
      easing: easing,
      css: function css(t, u) {
        return "\n\t\t\ttransform: ".concat(transform, " translate(").concat((1 - t) * x, "px, ").concat((1 - t) * y, "px);\n\t\t\topacity: ").concat(target_opacity - od * u);
      }
    };
  }

  function scale(node, _ref5) {
    var _ref5$delay = _ref5.delay,
        delay = _ref5$delay === void 0 ? 0 : _ref5$delay,
        _ref5$duration = _ref5.duration,
        duration = _ref5$duration === void 0 ? 400 : _ref5$duration,
        _ref5$easing = _ref5.easing,
        easing = _ref5$easing === void 0 ? cubicOut : _ref5$easing,
        _ref5$start = _ref5.start,
        start = _ref5$start === void 0 ? 0 : _ref5$start,
        _ref5$opacity = _ref5.opacity,
        opacity = _ref5$opacity === void 0 ? 0 : _ref5$opacity;
    var style = getComputedStyle(node);
    var target_opacity = +style.opacity;
    var transform = style.transform === 'none' ? '' : style.transform;
    var sd = 1 - start;
    var od = target_opacity * (1 - opacity);
    return {
      delay: delay,
      duration: duration,
      easing: easing,
      css: function css(_t, u) {
        return "\n\t\t\ttransform: ".concat(transform, " scale(").concat(1 - sd * u, ");\n\t\t\topacity: ").concat(target_opacity - od * u, "\n\t\t");
      }
    };
  }

  var file = "src\\components\\ChatHeader.svelte"; // (19:2) {#if logoUrl}

  function create_if_block(ctx) {
    var img;
    var img_src_value;
    var img_alt_value;
    var block = {
      c: function create() {
        img = element("img");
        attr_dev(img, "class", "chatBotHeaderLogo svelte-12zcya2");
        if (img.src !== (img_src_value =
        /*logoUrl*/
        ctx[3])) attr_dev(img, "src", img_src_value);
        attr_dev(img, "alt", img_alt_value =
        /*$chatData*/
        ctx[0].title);
        add_location(img, file, 19, 1, 431);
      },
      m: function mount(target, anchor) {
        insert_dev(target, img, anchor);
      },
      p: function update(ctx, dirty) {
        if (dirty &
        /*$chatData*/
        1 && img_alt_value !== (img_alt_value =
        /*$chatData*/
        ctx[0].title)) {
          attr_dev(img, "alt", img_alt_value);
        }
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(img);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_if_block.name,
      type: "if",
      source: "(19:2) {#if logoUrl}",
      ctx: ctx
    });
    return block;
  }

  function create_fragment(ctx) {
    var header;
    var t0;
    var h3;
    var t1_value =
    /*$chatData*/
    ctx[0].title + "";
    var t1;
    var if_block =
    /*logoUrl*/
    ctx[3] && create_if_block(ctx);
    var block = {
      c: function create() {
        header = element("header");
        if (if_block) if_block.c();
        t0 = space$1();
        h3 = element("h3");
        t1 = text(t1_value);
        attr_dev(h3, "class", "chatBotTitle svelte-12zcya2");
        set_style(h3, "color",
        /*$chatTheme*/
        ctx[1].title.color);
        add_location(h3, file, 25, 2, 525);
        attr_dev(header, "class", "chatBotHeader svelte-12zcya2");
        set_style(header, "background-color",
        /*$chatTheme*/
        ctx[1].header.backgroundColor);
        toggle_class(header, "layout-fixed",
        /*$chatLayout*/
        ctx[2] === "fixed");
        toggle_class(header, "layout-static",
        /*$chatLayout*/
        ctx[2] === "static");
        add_location(header, file, 12, 0, 213);
      },
      l: function claim(nodes) {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function mount(target, anchor) {
        insert_dev(target, header, anchor);
        if (if_block) if_block.m(header, null);
        append_dev(header, t0);
        append_dev(header, h3);
        append_dev(h3, t1);
      },
      p: function update(ctx, _ref) {
        var _ref2 = _slicedToArray(_ref, 1),
            dirty = _ref2[0];

        if (
        /*logoUrl*/
        ctx[3]) if_block.p(ctx, dirty);
        if (dirty &
        /*$chatData*/
        1 && t1_value !== (t1_value =
        /*$chatData*/
        ctx[0].title + "")) set_data_dev(t1, t1_value);

        if (dirty &
        /*$chatTheme*/
        2) {
          set_style(h3, "color",
          /*$chatTheme*/
          ctx[1].title.color);
        }

        if (dirty &
        /*$chatTheme*/
        2) {
          set_style(header, "background-color",
          /*$chatTheme*/
          ctx[1].header.backgroundColor);
        }

        if (dirty &
        /*$chatLayout*/
        4) {
          toggle_class(header, "layout-fixed",
          /*$chatLayout*/
          ctx[2] === "fixed");
        }

        if (dirty &
        /*$chatLayout*/
        4) {
          toggle_class(header, "layout-static",
          /*$chatLayout*/
          ctx[2] === "static");
        }
      },
      i: noop,
      o: noop,
      d: function destroy(detaching) {
        if (detaching) detach_dev(header);
        if (if_block) if_block.d();
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_fragment.name,
      type: "component",
      source: "",
      ctx: ctx
    });
    return block;
  }

  function instance($$self, $$props, $$invalidate) {
    var $chatData;
    var $chatAssetsUrl;
    var $chatTheme;
    var $chatLayout;
    validate_store(chatData, "chatData");
    component_subscribe($$self, chatData, function ($$value) {
      return $$invalidate(0, $chatData = $$value);
    });
    validate_store(chatAssetsUrl, "chatAssetsUrl");
    component_subscribe($$self, chatAssetsUrl, function ($$value) {
      return $$invalidate(4, $chatAssetsUrl = $$value);
    });
    validate_store(chatTheme, "chatTheme");
    component_subscribe($$self, chatTheme, function ($$value) {
      return $$invalidate(1, $chatTheme = $$value);
    });
    validate_store(chatLayout, "chatLayout");
    component_subscribe($$self, chatLayout, function ($$value) {
      return $$invalidate(2, $chatLayout = $$value);
    });
    var logoUrl = $chatData.logoUrl || "".concat($chatAssetsUrl, "assets/img/logo_c-bot.png");

    $$self.$capture_state = function () {
      return {};
    };

    $$self.$inject_state = function ($$props) {
      if ("$chatData" in $$props) chatData.set($chatData = $$props.$chatData);
      if ("$chatAssetsUrl" in $$props) chatAssetsUrl.set($chatAssetsUrl = $$props.$chatAssetsUrl);
      if ("$chatTheme" in $$props) chatTheme.set($chatTheme = $$props.$chatTheme);
      if ("$chatLayout" in $$props) chatLayout.set($chatLayout = $$props.$chatLayout);
    };

    return [$chatData, $chatTheme, $chatLayout, logoUrl];
  }

  var ChatHeader =
  /*#__PURE__*/
  function (_SvelteComponentDev) {
    _inherits(ChatHeader, _SvelteComponentDev);

    function ChatHeader(options) {
      var _this;

      _classCallCheck(this, ChatHeader);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ChatHeader).call(this, options));
      init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {});
      dispatch_dev("SvelteRegisterComponent", {
        component: _assertThisInitialized(_this),
        tagName: "ChatHeader",
        options: options,
        id: create_fragment.name
      });
      return _this;
    }

    return ChatHeader;
  }(SvelteComponentDev);

  var file$1 = "src\\components\\ChatImage.svelte"; // (44:0) {:else}

  function create_else_block(ctx) {
    var div;
    var block = {
      c: function create() {
        div = element("div");
        attr_dev(div, "class", "imagePlaceholder svelte-1gh3ffn");
        add_location(div, file$1, 44, 1, 766);
      },
      m: function mount(target, anchor) {
        insert_dev(target, div, anchor);
      },
      p: noop,
      d: function destroy(detaching) {
        if (detaching) detach_dev(div);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_else_block.name,
      type: "else",
      source: "(44:0) {:else}",
      ctx: ctx
    });
    return block;
  } // (37:0) {#if isLoading}


  function create_if_block$1(ctx) {
    var img;
    var img_src_value;
    var block = {
      c: function create() {
        img = element("img");
        attr_dev(img, "class", "image svelte-1gh3ffn");
        attr_dev(img, "bing:this",
        /*imageEl*/
        ctx[3]);
        if (img.src !== (img_src_value =
        /*src*/
        ctx[0])) attr_dev(img, "src", img_src_value);
        attr_dev(img, "alt",
        /*alt*/
        ctx[1]);
        add_location(img, file$1, 37, 2, 669);
      },
      m: function mount(target, anchor) {
        insert_dev(target, img, anchor);
      },
      p: function update(ctx, dirty) {
        if (dirty &
        /*src*/
        1 && img.src !== (img_src_value =
        /*src*/
        ctx[0])) {
          attr_dev(img, "src", img_src_value);
        }

        if (dirty &
        /*alt*/
        2) {
          attr_dev(img, "alt",
          /*alt*/
          ctx[1]);
        }
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(img);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_if_block$1.name,
      type: "if",
      source: "(37:0) {#if isLoading}",
      ctx: ctx
    });
    return block;
  }

  function create_fragment$1(ctx) {
    var if_block_anchor;

    function select_block_type(ctx, dirty) {
      if (
      /*isLoading*/
      ctx[2]) return create_if_block$1;
      return create_else_block;
    }

    var current_block_type = select_block_type(ctx);
    var if_block = current_block_type(ctx);
    var block = {
      c: function create() {
        if_block.c();
        if_block_anchor = empty$1();
      },
      l: function claim(nodes) {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function mount(target, anchor) {
        if_block.m(target, anchor);
        insert_dev(target, if_block_anchor, anchor);
      },
      p: function update(ctx, _ref) {
        var _ref2 = _slicedToArray(_ref, 1),
            dirty = _ref2[0];

        if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block.d(1);
          if_block = current_block_type(ctx);

          if (if_block) {
            if_block.c();
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        }
      },
      i: noop,
      o: noop,
      d: function destroy(detaching) {
        if_block.d(detaching);
        if (detaching) detach_dev(if_block_anchor);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_fragment$1.name,
      type: "component",
      source: "",
      ctx: ctx
    });
    return block;
  }

  function instance$1($$self, $$props, $$invalidate) {
    var _$$props$src = $$props.src,
        src = _$$props$src === void 0 ? "" : _$$props$src;
    var _$$props$alt = $$props.alt,
        alt = _$$props$alt === void 0 ? "" : _$$props$alt;
    var imageEl;
    var error = false;
    var imageWidth = 0;
    var imageHeight = 0;
    var isLoading = false;

    function onLoadImage(src) {
      var img = new Image();
      img.src = src;

      img.onload = function (event) {
        return handleLoad(event, img);
      };

      img.onerror = function (event) {
        return handleError();
      };
    }

    function handleLoad(event, img) {
      imageWidth = img.width;
      imageHeight = img.height;
      $$invalidate(2, isLoading = true);
    }

    function handleError(event) {
      $$invalidate(2, isLoading = false);
      error = true;
    }

    onMount(function () {
      onLoadImage(src);
    });
    var writable_props = ["src", "alt"];
    Object.keys($$props).forEach(function (key) {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<ChatImage> was created with unknown prop '".concat(key, "'"));
    });

    $$self.$set = function ($$props) {
      if ("src" in $$props) $$invalidate(0, src = $$props.src);
      if ("alt" in $$props) $$invalidate(1, alt = $$props.alt);
    };

    $$self.$capture_state = function () {
      return {
        src: src,
        alt: alt,
        imageEl: imageEl,
        error: error,
        imageWidth: imageWidth,
        imageHeight: imageHeight,
        isLoading: isLoading
      };
    };

    $$self.$inject_state = function ($$props) {
      if ("src" in $$props) $$invalidate(0, src = $$props.src);
      if ("alt" in $$props) $$invalidate(1, alt = $$props.alt);
      if ("imageEl" in $$props) $$invalidate(3, imageEl = $$props.imageEl);
      if ("error" in $$props) error = $$props.error;
      if ("imageWidth" in $$props) imageWidth = $$props.imageWidth;
      if ("imageHeight" in $$props) imageHeight = $$props.imageHeight;
      if ("isLoading" in $$props) $$invalidate(2, isLoading = $$props.isLoading);
    };

    return [src, alt, isLoading, imageEl];
  }

  var ChatImage =
  /*#__PURE__*/
  function (_SvelteComponentDev) {
    _inherits(ChatImage, _SvelteComponentDev);

    function ChatImage(options) {
      var _this;

      _classCallCheck(this, ChatImage);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ChatImage).call(this, options));
      init(_assertThisInitialized(_this), options, instance$1, create_fragment$1, safe_not_equal, {
        src: 0,
        alt: 1
      });
      dispatch_dev("SvelteRegisterComponent", {
        component: _assertThisInitialized(_this),
        tagName: "ChatImage",
        options: options,
        id: create_fragment$1.name
      });
      return _this;
    }

    _createClass(ChatImage, [{
      key: "src",
      get: function get() {
        throw new Error("<ChatImage>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function set(value) {
        throw new Error("<ChatImage>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }, {
      key: "alt",
      get: function get() {
        throw new Error("<ChatImage>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function set(value) {
        throw new Error("<ChatImage>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }]);

    return ChatImage;
  }(SvelteComponentDev);

  var file$2 = "src\\components\\ChatActionButtons.svelte";

  function get_each_context(ctx, list, i) {
    var child_ctx = ctx.slice();
    child_ctx[3] = list[i].text;
    child_ctx[4] = list[i].value;
    child_ctx[5] = list[i].disabled;
    return child_ctx;
  } // (10:0) {#each actions as { text, value, disabled }}


  function create_each_block(ctx) {
    var button;
    var t0_value =
    /*text*/
    ctx[3] + "";
    var t0;
    var t1;
    var button_disabled_value;
    var dispose;

    function click_handler() {
      var _ctx;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return (
        /*click_handler*/
        (_ctx = ctx)[2].apply(_ctx, [
        /*text*/
        ctx[3],
        /*value*/
        ctx[4]].concat(args))
      );
    }

    var block = {
      c: function create() {
        button = element("button");
        t0 = text(t0_value);
        t1 = space$1();
        attr_dev(button, "class", "chatActionButton svelte-1un1cfg");
        button.disabled = button_disabled_value =
        /*disabled*/
        ctx[5];
        toggle_class(button, "disabled",
        /*disabled*/
        ctx[5]);
        add_location(button, file$2, 10, 1, 210);
      },
      m: function mount(target, anchor) {
        insert_dev(target, button, anchor);
        append_dev(button, t0);
        append_dev(button, t1);
        dispose = listen_dev(button, "click", click_handler, false, false, false);
      },
      p: function update(new_ctx, dirty) {
        ctx = new_ctx;
        if (dirty &
        /*actions*/
        1 && t0_value !== (t0_value =
        /*text*/
        ctx[3] + "")) set_data_dev(t0, t0_value);

        if (dirty &
        /*actions*/
        1 && button_disabled_value !== (button_disabled_value =
        /*disabled*/
        ctx[5])) {
          prop_dev(button, "disabled", button_disabled_value);
        }

        if (dirty &
        /*actions*/
        1) {
          toggle_class(button, "disabled",
          /*disabled*/
          ctx[5]);
        }
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(button);
        dispose();
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_each_block.name,
      type: "each",
      source: "(10:0) {#each actions as { text, value, disabled }}",
      ctx: ctx
    });
    return block;
  }

  function create_fragment$2(ctx) {
    var each_1_anchor;
    var each_value =
    /*actions*/
    ctx[0];
    var each_blocks = [];

    for (var i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    }

    var block = {
      c: function create() {
        for (var _i = 0; _i < each_blocks.length; _i += 1) {
          each_blocks[_i].c();
        }

        each_1_anchor = empty$1();
      },
      l: function claim(nodes) {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function mount(target, anchor) {
        for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
          each_blocks[_i2].m(target, anchor);
        }

        insert_dev(target, each_1_anchor, anchor);
      },
      p: function update(ctx, _ref) {
        var _ref2 = _slicedToArray(_ref, 1),
            dirty = _ref2[0];

        if (dirty &
        /*actions, chat*/
        3) {
          each_value =
          /*actions*/
          ctx[0];

          var _i3;

          for (_i3 = 0; _i3 < each_value.length; _i3 += 1) {
            var child_ctx = get_each_context(ctx, each_value, _i3);

            if (each_blocks[_i3]) {
              each_blocks[_i3].p(child_ctx, dirty);
            } else {
              each_blocks[_i3] = create_each_block(child_ctx);

              each_blocks[_i3].c();

              each_blocks[_i3].m(each_1_anchor.parentNode, each_1_anchor);
            }
          }

          for (; _i3 < each_blocks.length; _i3 += 1) {
            each_blocks[_i3].d(1);
          }

          each_blocks.length = each_value.length;
        }
      },
      i: noop,
      o: noop,
      d: function destroy(detaching) {
        destroy_each(each_blocks, detaching);
        if (detaching) detach_dev(each_1_anchor);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_fragment$2.name,
      type: "component",
      source: "",
      ctx: ctx
    });
    return block;
  }

  function instance$2($$self, $$props, $$invalidate) {
    var actions = $$props.actions;
    var chat = getContext("chat");
    var writable_props = ["actions"];
    Object.keys($$props).forEach(function (key) {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<ChatActionButtons> was created with unknown prop '".concat(key, "'"));
    });

    var click_handler = function click_handler(text, value) {
      return chat.send({
        text: text,
        value: value
      });
    };

    $$self.$set = function ($$props) {
      if ("actions" in $$props) $$invalidate(0, actions = $$props.actions);
    };

    $$self.$capture_state = function () {
      return {
        actions: actions
      };
    };

    $$self.$inject_state = function ($$props) {
      if ("actions" in $$props) $$invalidate(0, actions = $$props.actions);
    };

    return [actions, chat, click_handler];
  }

  var ChatActionButtons =
  /*#__PURE__*/
  function (_SvelteComponentDev) {
    _inherits(ChatActionButtons, _SvelteComponentDev);

    function ChatActionButtons(options) {
      var _this;

      _classCallCheck(this, ChatActionButtons);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ChatActionButtons).call(this, options));
      init(_assertThisInitialized(_this), options, instance$2, create_fragment$2, safe_not_equal, {
        actions: 0
      });
      dispatch_dev("SvelteRegisterComponent", {
        component: _assertThisInitialized(_this),
        tagName: "ChatActionButtons",
        options: options,
        id: create_fragment$2.name
      });
      var ctx = _this.$$.ctx;
      var props = options.props || {};

      if (
      /*actions*/
      ctx[0] === undefined && !("actions" in props)) {
        console.warn("<ChatActionButtons> was created without expected prop 'actions'");
      }

      return _this;
    }

    _createClass(ChatActionButtons, [{
      key: "actions",
      get: function get() {
        throw new Error("<ChatActionButtons>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function set(value) {
        throw new Error("<ChatActionButtons>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }]);

    return ChatActionButtons;
  }(SvelteComponentDev);

  var file$3 = "src\\components\\ChatMessage.svelte"; // (36:2) {#if type === 'text'}

  function create_if_block_1(ctx) {
    var t0;
    var t1;
    var time_1;
    var t2;
    var current;
    var if_block0 =
    /*text*/
    ctx[0] && create_if_block_4(ctx);
    var if_block1 =
    /*attachment*/
    ctx[4] && create_if_block_2(ctx);
    var block = {
      c: function create() {
        if (if_block0) if_block0.c();
        t0 = space$1();
        if (if_block1) if_block1.c();
        t1 = space$1();
        time_1 = element("time");
        t2 = text(
        /*time*/
        ctx[3]);
        attr_dev(time_1, "class", "chatBotMessageTime svelte-i0j3nd");
        add_location(time_1, file$3, 52, 4, 1243);
      },
      m: function mount(target, anchor) {
        if (if_block0) if_block0.m(target, anchor);
        insert_dev(target, t0, anchor);
        if (if_block1) if_block1.m(target, anchor);
        insert_dev(target, t1, anchor);
        insert_dev(target, time_1, anchor);
        append_dev(time_1, t2);
        current = true;
      },
      p: function update(ctx, dirty) {
        if (
        /*text*/
        ctx[0]) {
          if (if_block0) {
            if_block0.p(ctx, dirty);
          } else {
            if_block0 = create_if_block_4(ctx);
            if_block0.c();
            if_block0.m(t0.parentNode, t0);
          }
        } else if (if_block0) {
          if_block0.d(1);
          if_block0 = null;
        }

        if (
        /*attachment*/
        ctx[4]) {
          if (if_block1) {
            if_block1.p(ctx, dirty);
            transition_in(if_block1, 1);
          } else {
            if_block1 = create_if_block_2(ctx);
            if_block1.c();
            transition_in(if_block1, 1);
            if_block1.m(t1.parentNode, t1);
          }
        } else if (if_block1) {
          group_outros();
          transition_out(if_block1, 1, 1, function () {
            if_block1 = null;
          });
          check_outros();
        }

        if (!current || dirty &
        /*time*/
        8) set_data_dev(t2,
        /*time*/
        ctx[3]);
      },
      i: function intro(local) {
        if (current) return;
        transition_in(if_block1);
        current = true;
      },
      o: function outro(local) {
        transition_out(if_block1);
        current = false;
      },
      d: function destroy(detaching) {
        if (if_block0) if_block0.d(detaching);
        if (detaching) detach_dev(t0);
        if (if_block1) if_block1.d(detaching);
        if (detaching) detach_dev(t1);
        if (detaching) detach_dev(time_1);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_if_block_1.name,
      type: "if",
      source: "(36:2) {#if type === 'text'}",
      ctx: ctx
    });
    return block;
  } // (37:4) {#if text}


  function create_if_block_4(ctx) {
    var div;
    var block = {
      c: function create() {
        div = element("div");
        attr_dev(div, "class", "chatBotMessageText svelte-i0j3nd");
        add_location(div, file$3, 37, 4, 955);
      },
      m: function mount(target, anchor) {
        insert_dev(target, div, anchor);
        div.innerHTML =
        /*text*/
        ctx[0];
      },
      p: function update(ctx, dirty) {
        if (dirty &
        /*text*/
        1) div.innerHTML =
        /*text*/
        ctx[0];
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(div);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_if_block_4.name,
      type: "if",
      source: "(37:4) {#if text}",
      ctx: ctx
    });
    return block;
  } // (43:4) {#if attachment}


  function create_if_block_2(ctx) {
    var div;
    var current;
    var if_block =
    /*attachment*/
    ctx[4].type === "image" && create_if_block_3(ctx);
    var block = {
      c: function create() {
        div = element("div");
        if (if_block) if_block.c();
        attr_dev(div, "class", "chatBotMessageAttachment");
        add_location(div, file$3, 43, 4, 1060);
      },
      m: function mount(target, anchor) {
        insert_dev(target, div, anchor);
        if (if_block) if_block.m(div, null);
        current = true;
      },
      p: function update(ctx, dirty) {
        if (
        /*attachment*/
        ctx[4].type === "image") {
          if (if_block) {
            if_block.p(ctx, dirty);
            transition_in(if_block, 1);
          } else {
            if_block = create_if_block_3(ctx);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(div, null);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, function () {
            if_block = null;
          });
          check_outros();
        }
      },
      i: function intro(local) {
        if (current) return;
        transition_in(if_block);
        current = true;
      },
      o: function outro(local) {
        transition_out(if_block);
        current = false;
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(div);
        if (if_block) if_block.d();
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_if_block_2.name,
      type: "if",
      source: "(43:4) {#if attachment}",
      ctx: ctx
    });
    return block;
  } // (45:6) {#if attachment.type === 'image'}


  function create_if_block_3(ctx) {
    var current;
    var chatimage = new ChatImage({
      props: {
        src:
        /*attachment*/
        ctx[4].url
      },
      $$inline: true
    });
    var block = {
      c: function create() {
        create_component(chatimage.$$.fragment);
      },
      m: function mount(target, anchor) {
        mount_component(chatimage, target, anchor);
        current = true;
      },
      p: function update(ctx, dirty) {
        var chatimage_changes = {};
        if (dirty &
        /*attachment*/
        16) chatimage_changes.src =
        /*attachment*/
        ctx[4].url;
        chatimage.$set(chatimage_changes);
      },
      i: function intro(local) {
        if (current) return;
        transition_in(chatimage.$$.fragment, local);
        current = true;
      },
      o: function outro(local) {
        transition_out(chatimage.$$.fragment, local);
        current = false;
      },
      d: function destroy(detaching) {
        destroy_component(chatimage, detaching);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_if_block_3.name,
      type: "if",
      source: "(45:6) {#if attachment.type === 'image'}",
      ctx: ctx
    });
    return block;
  } // (58:2) {#if type === 'actions'}


  function create_if_block$2(ctx) {
    var current;
    var chatactionbuttons = new ChatActionButtons({
      props: {
        actions:
        /*actions*/
        ctx[5]
      },
      $$inline: true
    });
    var block = {
      c: function create() {
        create_component(chatactionbuttons.$$.fragment);
      },
      m: function mount(target, anchor) {
        mount_component(chatactionbuttons, target, anchor);
        current = true;
      },
      p: function update(ctx, dirty) {
        var chatactionbuttons_changes = {};
        if (dirty &
        /*actions*/
        32) chatactionbuttons_changes.actions =
        /*actions*/
        ctx[5];
        chatactionbuttons.$set(chatactionbuttons_changes);
      },
      i: function intro(local) {
        if (current) return;
        transition_in(chatactionbuttons.$$.fragment, local);
        current = true;
      },
      o: function outro(local) {
        transition_out(chatactionbuttons.$$.fragment, local);
        current = false;
      },
      d: function destroy(detaching) {
        destroy_component(chatactionbuttons, detaching);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_if_block$2.name,
      type: "if",
      source: "(58:2) {#if type === 'actions'}",
      ctx: ctx
    });
    return block;
  }

  function create_fragment$3(ctx) {
    var div;
    var t;
    var div_transition;
    var current;
    var if_block0 =
    /*type*/
    ctx[1] === "text" && create_if_block_1(ctx);
    var if_block1 =
    /*type*/
    ctx[1] === "actions" && create_if_block$2(ctx);
    var block = {
      c: function create() {
        div = element("div");
        if (if_block0) if_block0.c();
        t = space$1();
        if (if_block1) if_block1.c();
        attr_dev(div, "class", "chatBotMessage svelte-i0j3nd");
        toggle_class(div, "isLeft",
        /*direction*/
        ctx[2] === "left");
        toggle_class(div, "isRight",
        /*direction*/
        ctx[2] === "right");
        toggle_class(div, "isTypeText",
        /*type*/
        ctx[1] === "text");
        toggle_class(div, "isTypeActions",
        /*type*/
        ctx[1] === "actions");
        add_location(div, file$3, 23, 0, 606);
      },
      l: function claim(nodes) {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function mount(target, anchor) {
        insert_dev(target, div, anchor);
        if (if_block0) if_block0.m(div, null);
        append_dev(div, t);
        if (if_block1) if_block1.m(div, null);
        /*div_binding*/

        ctx[7](div);
        current = true;
      },
      p: function update(ctx, _ref) {
        var _ref2 = _slicedToArray(_ref, 1),
            dirty = _ref2[0];

        if (
        /*type*/
        ctx[1] === "text") {
          if (if_block0) {
            if_block0.p(ctx, dirty);
            transition_in(if_block0, 1);
          } else {
            if_block0 = create_if_block_1(ctx);
            if_block0.c();
            transition_in(if_block0, 1);
            if_block0.m(div, t);
          }
        } else if (if_block0) {
          group_outros();
          transition_out(if_block0, 1, 1, function () {
            if_block0 = null;
          });
          check_outros();
        }

        if (
        /*type*/
        ctx[1] === "actions") {
          if (if_block1) {
            if_block1.p(ctx, dirty);
            transition_in(if_block1, 1);
          } else {
            if_block1 = create_if_block$2(ctx);
            if_block1.c();
            transition_in(if_block1, 1);
            if_block1.m(div, null);
          }
        } else if (if_block1) {
          group_outros();
          transition_out(if_block1, 1, 1, function () {
            if_block1 = null;
          });
          check_outros();
        }

        if (dirty &
        /*direction*/
        4) {
          toggle_class(div, "isLeft",
          /*direction*/
          ctx[2] === "left");
        }

        if (dirty &
        /*direction*/
        4) {
          toggle_class(div, "isRight",
          /*direction*/
          ctx[2] === "right");
        }

        if (dirty &
        /*type*/
        2) {
          toggle_class(div, "isTypeText",
          /*type*/
          ctx[1] === "text");
        }

        if (dirty &
        /*type*/
        2) {
          toggle_class(div, "isTypeActions",
          /*type*/
          ctx[1] === "actions");
        }
      },
      i: function intro(local) {
        if (current) return;
        transition_in(if_block0);
        transition_in(if_block1);
        add_render_callback(function () {
          if (!div_transition) div_transition = create_bidirectional_transition(div, fly, {
            y: 10,
            duration: TRANSITION_DURATION
          }, true);
          div_transition.run(1);
        });
        current = true;
      },
      o: function outro(local) {
        transition_out(if_block0);
        transition_out(if_block1);
        if (!div_transition) div_transition = create_bidirectional_transition(div, fly, {
          y: 10,
          duration: TRANSITION_DURATION
        }, false);
        div_transition.run(0);
        current = false;
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(div);
        if (if_block0) if_block0.d();
        if (if_block1) if_block1.d();
        /*div_binding*/

        ctx[7](null);
        if (detaching && div_transition) div_transition.end();
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_fragment$3.name,
      type: "component",
      source: "",
      ctx: ctx
    });
    return block;
  }

  function instance$3($$self, $$props, $$invalidate) {
    var _$$props$text = $$props.text,
        text = _$$props$text === void 0 ? null : _$$props$text;
    var _$$props$type = $$props.type,
        type = _$$props$type === void 0 ? "text" : _$$props$type;
    var _$$props$direction = $$props.direction,
        direction = _$$props$direction === void 0 ? "left" : _$$props$direction;
    var _$$props$time = $$props.time,
        time = _$$props$time === void 0 ? null : _$$props$time;
    var _$$props$attachment = $$props.attachment,
        attachment = _$$props$attachment === void 0 ? null : _$$props$attachment;
    var _$$props$actions = $$props.actions,
        actions = _$$props$actions === void 0 ? null : _$$props$actions;
    var chatBotMessage;
    onMount(function () {
      scrollTo(".chatBotBodyScroll", chatBotMessage);
    });
    var writable_props = ["text", "type", "direction", "time", "attachment", "actions"];
    Object.keys($$props).forEach(function (key) {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<ChatMessage> was created with unknown prop '".concat(key, "'"));
    });

    function div_binding($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](function () {
        $$invalidate(6, chatBotMessage = $$value);
      });
    }

    $$self.$set = function ($$props) {
      if ("text" in $$props) $$invalidate(0, text = $$props.text);
      if ("type" in $$props) $$invalidate(1, type = $$props.type);
      if ("direction" in $$props) $$invalidate(2, direction = $$props.direction);
      if ("time" in $$props) $$invalidate(3, time = $$props.time);
      if ("attachment" in $$props) $$invalidate(4, attachment = $$props.attachment);
      if ("actions" in $$props) $$invalidate(5, actions = $$props.actions);
    };

    $$self.$capture_state = function () {
      return {
        text: text,
        type: type,
        direction: direction,
        time: time,
        attachment: attachment,
        actions: actions,
        chatBotMessage: chatBotMessage
      };
    };

    $$self.$inject_state = function ($$props) {
      if ("text" in $$props) $$invalidate(0, text = $$props.text);
      if ("type" in $$props) $$invalidate(1, type = $$props.type);
      if ("direction" in $$props) $$invalidate(2, direction = $$props.direction);
      if ("time" in $$props) $$invalidate(3, time = $$props.time);
      if ("attachment" in $$props) $$invalidate(4, attachment = $$props.attachment);
      if ("actions" in $$props) $$invalidate(5, actions = $$props.actions);
      if ("chatBotMessage" in $$props) $$invalidate(6, chatBotMessage = $$props.chatBotMessage);
    };

    return [text, type, direction, time, attachment, actions, chatBotMessage, div_binding];
  }

  var ChatMessage =
  /*#__PURE__*/
  function (_SvelteComponentDev) {
    _inherits(ChatMessage, _SvelteComponentDev);

    function ChatMessage(options) {
      var _this;

      _classCallCheck(this, ChatMessage);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ChatMessage).call(this, options));
      init(_assertThisInitialized(_this), options, instance$3, create_fragment$3, safe_not_equal, {
        text: 0,
        type: 1,
        direction: 2,
        time: 3,
        attachment: 4,
        actions: 5
      });
      dispatch_dev("SvelteRegisterComponent", {
        component: _assertThisInitialized(_this),
        tagName: "ChatMessage",
        options: options,
        id: create_fragment$3.name
      });
      return _this;
    }

    _createClass(ChatMessage, [{
      key: "text",
      get: function get() {
        throw new Error("<ChatMessage>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function set(value) {
        throw new Error("<ChatMessage>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }, {
      key: "type",
      get: function get() {
        throw new Error("<ChatMessage>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function set(value) {
        throw new Error("<ChatMessage>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }, {
      key: "direction",
      get: function get() {
        throw new Error("<ChatMessage>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function set(value) {
        throw new Error("<ChatMessage>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }, {
      key: "time",
      get: function get() {
        throw new Error("<ChatMessage>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function set(value) {
        throw new Error("<ChatMessage>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }, {
      key: "attachment",
      get: function get() {
        throw new Error("<ChatMessage>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function set(value) {
        throw new Error("<ChatMessage>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }, {
      key: "actions",
      get: function get() {
        throw new Error("<ChatMessage>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function set(value) {
        throw new Error("<ChatMessage>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }]);

    return ChatMessage;
  }(SvelteComponentDev);

  var file$4 = "src\\components\\ChatLoader.svelte";

  function create_fragment$4(ctx) {
    var div;
    var div_transition;
    var current;
    var block = {
      c: function create() {
        div = element("div");
        attr_dev(div, "class", "chatLoader svelte-1ary2dk");
        add_location(div, file$4, 6, 0, 122);
      },
      l: function claim(nodes) {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function mount(target, anchor) {
        insert_dev(target, div, anchor);
        current = true;
      },
      p: noop,
      i: function intro(local) {
        if (current) return;
        add_render_callback(function () {
          if (!div_transition) div_transition = create_bidirectional_transition(div, scale, {
            duration: TRANSITION_DURATION,
            opacity: 0,
            start: 0.8
          }, true);
          div_transition.run(1);
        });
        current = true;
      },
      o: function outro(local) {
        if (!div_transition) div_transition = create_bidirectional_transition(div, scale, {
          duration: TRANSITION_DURATION,
          opacity: 0,
          start: 0.8
        }, false);
        div_transition.run(0);
        current = false;
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(div);
        if (detaching && div_transition) div_transition.end();
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_fragment$4.name,
      type: "component",
      source: "",
      ctx: ctx
    });
    return block;
  }

  var ChatLoader =
  /*#__PURE__*/
  function (_SvelteComponentDev) {
    _inherits(ChatLoader, _SvelteComponentDev);

    function ChatLoader(options) {
      var _this;

      _classCallCheck(this, ChatLoader);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ChatLoader).call(this, options));
      init(_assertThisInitialized(_this), options, null, create_fragment$4, safe_not_equal, {});
      dispatch_dev("SvelteRegisterComponent", {
        component: _assertThisInitialized(_this),
        tagName: "ChatLoader",
        options: options,
        id: create_fragment$4.name
      });
      return _this;
    }

    return ChatLoader;
  }(SvelteComponentDev);

  var file$5 = "src\\components\\ChatBody.svelte";

  function get_each_context$1(ctx, list, i) {
    var child_ctx = ctx.slice();
    child_ctx[6] = list[i].text;
    child_ctx[7] = list[i].type;
    child_ctx[8] = list[i].direction;
    child_ctx[9] = list[i].time;
    child_ctx[10] = list[i].attachment;
    child_ctx[11] = list[i].actions;
    return child_ctx;
  } // (30:6) {#each $chatMessages as { text, type, direction, time, attachment, actions }}


  function create_each_block$1(ctx) {
    var current;
    var chatmessage = new ChatMessage({
      props: {
        text:
        /*text*/
        ctx[6],
        type:
        /*type*/
        ctx[7],
        direction:
        /*direction*/
        ctx[8],
        time:
        /*time*/
        ctx[9],
        attachment:
        /*attachment*/
        ctx[10],
        actions:
        /*actions*/
        ctx[11]
      },
      $$inline: true
    });
    var block = {
      c: function create() {
        create_component(chatmessage.$$.fragment);
      },
      m: function mount(target, anchor) {
        mount_component(chatmessage, target, anchor);
        current = true;
      },
      p: function update(ctx, dirty) {
        var chatmessage_changes = {};
        if (dirty &
        /*$chatMessages*/
        16) chatmessage_changes.text =
        /*text*/
        ctx[6];
        if (dirty &
        /*$chatMessages*/
        16) chatmessage_changes.type =
        /*type*/
        ctx[7];
        if (dirty &
        /*$chatMessages*/
        16) chatmessage_changes.direction =
        /*direction*/
        ctx[8];
        if (dirty &
        /*$chatMessages*/
        16) chatmessage_changes.time =
        /*time*/
        ctx[9];
        if (dirty &
        /*$chatMessages*/
        16) chatmessage_changes.attachment =
        /*attachment*/
        ctx[10];
        if (dirty &
        /*$chatMessages*/
        16) chatmessage_changes.actions =
        /*actions*/
        ctx[11];
        chatmessage.$set(chatmessage_changes);
      },
      i: function intro(local) {
        if (current) return;
        transition_in(chatmessage.$$.fragment, local);
        current = true;
      },
      o: function outro(local) {
        transition_out(chatmessage.$$.fragment, local);
        current = false;
      },
      d: function destroy(detaching) {
        destroy_component(chatmessage, detaching);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_each_block$1.name,
      type: "each",
      source: "(30:6) {#each $chatMessages as { text, type, direction, time, attachment, actions }}",
      ctx: ctx
    });
    return block;
  } // (43:2) {#if $isMessagesLoading}


  function create_if_block$3(ctx) {
    var current;
    var chatloader = new ChatLoader({
      $$inline: true
    });
    var block = {
      c: function create() {
        create_component(chatloader.$$.fragment);
      },
      m: function mount(target, anchor) {
        mount_component(chatloader, target, anchor);
        current = true;
      },
      i: function intro(local) {
        if (current) return;
        transition_in(chatloader.$$.fragment, local);
        current = true;
      },
      o: function outro(local) {
        transition_out(chatloader.$$.fragment, local);
        current = false;
      },
      d: function destroy(detaching) {
        destroy_component(chatloader, detaching);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_if_block$3.name,
      type: "if",
      source: "(43:2) {#if $isMessagesLoading}",
      ctx: ctx
    });
    return block;
  }

  function create_fragment$5(ctx) {
    var div2;
    var div1;
    var div0;
    var t;
    var current;
    var each_value =
    /*$chatMessages*/
    ctx[4];
    var each_blocks = [];

    for (var i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    }

    var out = function out(i) {
      return transition_out(each_blocks[i], 1, 1, function () {
        each_blocks[i] = null;
      });
    };

    var if_block =
    /*$isMessagesLoading*/
    ctx[3] && create_if_block$3(ctx);
    var block = {
      c: function create() {
        div2 = element("div");
        div1 = element("div");
        div0 = element("div");

        for (var _i = 0; _i < each_blocks.length; _i += 1) {
          each_blocks[_i].c();
        }

        t = space$1();
        if (if_block) if_block.c();
        attr_dev(div0, "class", "chatBotMessages svelte-rjlxhf");
        add_location(div0, file$5, 28, 4, 609);
        attr_dev(div1, "class", "chatBotBodyScroll svelte-rjlxhf");
        add_location(div1, file$5, 24, 2, 528);
        attr_dev(div2, "class", "chatBotBody svelte-rjlxhf");
        set_style(div2, "background-color",
        /*$chatTheme*/
        ctx[1].body.backgroundColor);
        toggle_class(div2, "layout-fixed",
        /*$chatLayout*/
        ctx[2] === "fixed");
        toggle_class(div2, "layout-static",
        /*$chatLayout*/
        ctx[2] === "static");
        toggle_class(div2, "isLoading",
        /*$isMessagesLoading*/
        ctx[3]);
        add_location(div2, file$5, 17, 0, 293);
      },
      l: function claim(nodes) {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function mount(target, anchor) {
        insert_dev(target, div2, anchor);
        append_dev(div2, div1);
        append_dev(div1, div0);

        for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
          each_blocks[_i2].m(div0, null);
        }
        /*div1_binding*/


        ctx[5](div1);
        append_dev(div2, t);
        if (if_block) if_block.m(div2, null);
        current = true;
      },
      p: function update(ctx, _ref) {
        var _ref2 = _slicedToArray(_ref, 1),
            dirty = _ref2[0];

        if (dirty &
        /*$chatMessages*/
        16) {
          each_value =
          /*$chatMessages*/
          ctx[4];

          var _i3;

          for (_i3 = 0; _i3 < each_value.length; _i3 += 1) {
            var child_ctx = get_each_context$1(ctx, each_value, _i3);

            if (each_blocks[_i3]) {
              each_blocks[_i3].p(child_ctx, dirty);

              transition_in(each_blocks[_i3], 1);
            } else {
              each_blocks[_i3] = create_each_block$1(child_ctx);

              each_blocks[_i3].c();

              transition_in(each_blocks[_i3], 1);

              each_blocks[_i3].m(div0, null);
            }
          }

          group_outros();

          for (_i3 = each_value.length; _i3 < each_blocks.length; _i3 += 1) {
            out(_i3);
          }

          check_outros();
        }

        if (
        /*$isMessagesLoading*/
        ctx[3]) {
          if (!if_block) {
            if_block = create_if_block$3(ctx);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(div2, null);
          } else {
            transition_in(if_block, 1);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, function () {
            if_block = null;
          });
          check_outros();
        }

        if (!current || dirty &
        /*$chatTheme*/
        2) {
          set_style(div2, "background-color",
          /*$chatTheme*/
          ctx[1].body.backgroundColor);
        }

        if (dirty &
        /*$chatLayout*/
        4) {
          toggle_class(div2, "layout-fixed",
          /*$chatLayout*/
          ctx[2] === "fixed");
        }

        if (dirty &
        /*$chatLayout*/
        4) {
          toggle_class(div2, "layout-static",
          /*$chatLayout*/
          ctx[2] === "static");
        }

        if (dirty &
        /*$isMessagesLoading*/
        8) {
          toggle_class(div2, "isLoading",
          /*$isMessagesLoading*/
          ctx[3]);
        }
      },
      i: function intro(local) {
        if (current) return;

        for (var _i4 = 0; _i4 < each_value.length; _i4 += 1) {
          transition_in(each_blocks[_i4]);
        }

        transition_in(if_block);
        current = true;
      },
      o: function outro(local) {
        each_blocks = each_blocks.filter(Boolean);

        for (var _i5 = 0; _i5 < each_blocks.length; _i5 += 1) {
          transition_out(each_blocks[_i5]);
        }

        transition_out(if_block);
        current = false;
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(div2);
        destroy_each(each_blocks, detaching);
        /*div1_binding*/

        ctx[5](null);
        if (if_block) if_block.d();
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_fragment$5.name,
      type: "component",
      source: "",
      ctx: ctx
    });
    return block;
  }

  function instance$4($$self, $$props, $$invalidate) {
    var $chatTheme;
    var $chatLayout;
    var $isMessagesLoading;
    var $chatMessages;
    validate_store(chatTheme, "chatTheme");
    component_subscribe($$self, chatTheme, function ($$value) {
      return $$invalidate(1, $chatTheme = $$value);
    });
    validate_store(chatLayout, "chatLayout");
    component_subscribe($$self, chatLayout, function ($$value) {
      return $$invalidate(2, $chatLayout = $$value);
    });
    validate_store(isMessagesLoading, "isMessagesLoading");
    component_subscribe($$self, isMessagesLoading, function ($$value) {
      return $$invalidate(3, $isMessagesLoading = $$value);
    });
    validate_store(chatMessages, "chatMessages");
    component_subscribe($$self, chatMessages, function ($$value) {
      return $$invalidate(4, $chatMessages = $$value);
    });
    var chatBotBodyScroll;

    function div1_binding($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](function () {
        $$invalidate(0, chatBotBodyScroll = $$value);
      });
    }

    $$self.$capture_state = function () {
      return {};
    };

    $$self.$inject_state = function ($$props) {
      if ("chatBotBodyScroll" in $$props) $$invalidate(0, chatBotBodyScroll = $$props.chatBotBodyScroll);
      if ("$chatTheme" in $$props) chatTheme.set($chatTheme = $$props.$chatTheme);
      if ("$chatLayout" in $$props) chatLayout.set($chatLayout = $$props.$chatLayout);
      if ("$isMessagesLoading" in $$props) isMessagesLoading.set($isMessagesLoading = $$props.$isMessagesLoading);
      if ("$chatMessages" in $$props) chatMessages.set($chatMessages = $$props.$chatMessages);
    };

    return [chatBotBodyScroll, $chatTheme, $chatLayout, $isMessagesLoading, $chatMessages, div1_binding];
  }

  var ChatBody =
  /*#__PURE__*/
  function (_SvelteComponentDev) {
    _inherits(ChatBody, _SvelteComponentDev);

    function ChatBody(options) {
      var _this;

      _classCallCheck(this, ChatBody);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ChatBody).call(this, options));
      init(_assertThisInitialized(_this), options, instance$4, create_fragment$5, safe_not_equal, {});
      dispatch_dev("SvelteRegisterComponent", {
        component: _assertThisInitialized(_this),
        tagName: "ChatBody",
        options: options,
        id: create_fragment$5.name
      });
      return _this;
    }

    return ChatBody;
  }(SvelteComponentDev);

  var file$6 = "src\\components\\ChatFooter.svelte";

  function create_fragment$6(ctx) {
    var footer;
    var form;
    var input;
    var t0;
    var button;
    var t1;
    var dispose;
    var block = {
      c: function create() {
        footer = element("footer");
        form = element("form");
        input = element("input");
        t0 = space$1();
        button = element("button");
        t1 = text("→");
        attr_dev(input, "class", "chatBotField svelte-1ge4fjc");
        attr_dev(input, "placeholder", "Введите сообщение");
        input.disabled =
        /*$isMessagesLoading*/
        ctx[2];
        add_location(input, file$6, 34, 4, 574);
        attr_dev(button, "type", "submit");
        button.disabled =
        /*$isMessagesLoading*/
        ctx[2];
        attr_dev(button, "class", "chatBotFormButton svelte-1ge4fjc");
        add_location(button, file$6, 41, 4, 725);
        attr_dev(form, "class", "chatBotForm svelte-1ge4fjc");
        add_location(form, file$6, 33, 2, 542);
        attr_dev(footer, "class", "chatBotFooter svelte-1ge4fjc");
        toggle_class(footer, "layout-fixed",
        /*$chatLayout*/
        ctx[1] === "fixed");
        toggle_class(footer, "layout-static",
        /*$chatLayout*/
        ctx[1] === "static");
        add_location(footer, file$6, 28, 0, 405);
      },
      l: function claim(nodes) {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function mount(target, anchor) {
        insert_dev(target, footer, anchor);
        append_dev(footer, form);
        append_dev(form, input);
        set_input_value(input,
        /*text*/
        ctx[0]);
        append_dev(form, t0);
        append_dev(form, button);
        append_dev(button, t1);
        dispose = [listen_dev(input, "input",
        /*input_input_handler*/
        ctx[7]), listen_dev(button, "click", prevent_default(
        /*onSend*/
        ctx[3]), false, true, false)];
      },
      p: function update(ctx, _ref) {
        var _ref2 = _slicedToArray(_ref, 1),
            dirty = _ref2[0];

        if (dirty &
        /*$isMessagesLoading*/
        4) {
          prop_dev(input, "disabled",
          /*$isMessagesLoading*/
          ctx[2]);
        }

        if (dirty &
        /*text*/
        1 && input.value !==
        /*text*/
        ctx[0]) {
          set_input_value(input,
          /*text*/
          ctx[0]);
        }

        if (dirty &
        /*$isMessagesLoading*/
        4) {
          prop_dev(button, "disabled",
          /*$isMessagesLoading*/
          ctx[2]);
        }

        if (dirty &
        /*$chatLayout*/
        2) {
          toggle_class(footer, "layout-fixed",
          /*$chatLayout*/
          ctx[1] === "fixed");
        }

        if (dirty &
        /*$chatLayout*/
        2) {
          toggle_class(footer, "layout-static",
          /*$chatLayout*/
          ctx[1] === "static");
        }
      },
      i: noop,
      o: noop,
      d: function destroy(detaching) {
        if (detaching) detach_dev(footer);
        run_all(dispose);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_fragment$6.name,
      type: "component",
      source: "",
      ctx: ctx
    });
    return block;
  }

  function instance$5($$self, $$props, $$invalidate) {
    var $chatLayout;
    var $isMessagesLoading;
    validate_store(chatLayout, "chatLayout");
    component_subscribe($$self, chatLayout, function ($$value) {
      return $$invalidate(1, $chatLayout = $$value);
    });
    validate_store(isMessagesLoading, "isMessagesLoading");
    component_subscribe($$self, isMessagesLoading, function ($$value) {
      return $$invalidate(2, $isMessagesLoading = $$value);
    });
    var chat = getContext("chat");
    var text = "";

    function onSend() {
      if (!hasText) {
        return;
      }

      chat.send({
        text: text
      });
      onClear();
    }

    function onClear() {
      $$invalidate(0, text = "");
    }

    function input_input_handler() {
      text = this.value;
      $$invalidate(0, text);
    }

    $$self.$capture_state = function () {
      return {};
    };

    $$self.$inject_state = function ($$props) {
      if ("text" in $$props) $$invalidate(0, text = $$props.text);
      if ("hasText" in $$props) hasText = $$props.hasText;
      if ("$chatLayout" in $$props) chatLayout.set($chatLayout = $$props.$chatLayout);
      if ("$isMessagesLoading" in $$props) isMessagesLoading.set($isMessagesLoading = $$props.$isMessagesLoading);
    };

    var hasText;

    $$self.$$.update = function () {
      if ($$self.$$.dirty &
      /*text*/
      1) {
         hasText = !!text.trim();
      }
    };

    return [text, $chatLayout, $isMessagesLoading, onSend, hasText, chat, onClear, input_input_handler];
  }

  var ChatFooter =
  /*#__PURE__*/
  function (_SvelteComponentDev) {
    _inherits(ChatFooter, _SvelteComponentDev);

    function ChatFooter(options) {
      var _this;

      _classCallCheck(this, ChatFooter);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ChatFooter).call(this, options));
      init(_assertThisInitialized(_this), options, instance$5, create_fragment$6, safe_not_equal, {});
      dispatch_dev("SvelteRegisterComponent", {
        component: _assertThisInitialized(_this),
        tagName: "ChatFooter",
        options: options,
        id: create_fragment$6.name
      });
      return _this;
    }

    return ChatFooter;
  }(SvelteComponentDev);

  var file$7 = "src\\components\\Chat.svelte"; // (16:0) {#if $chatVisible}

  function create_if_block$4(ctx) {
    var section;
    var t0;
    var t1;
    var section_transition;
    var current;
    var chatheader = new ChatHeader({
      $$inline: true
    });
    var chatbody = new ChatBody({
      $$inline: true
    });
    var chatfooter = new ChatFooter({
      $$inline: true
    });
    var block = {
      c: function create() {
        section = element("section");
        create_component(chatheader.$$.fragment);
        t0 = space$1();
        create_component(chatbody.$$.fragment);
        t1 = space$1();
        create_component(chatfooter.$$.fragment);
        attr_dev(section, "class", "chatWindow svelte-2dbifz");
        toggle_class(section, "layout-fixed",
        /*$chatLayout*/
        ctx[1] === "fixed");
        toggle_class(section, "layout-static",
        /*$chatLayout*/
        ctx[1] === "static");
        toggle_class(section, "right-bottom",
        /*$chatLayout*/
        ctx[1] === "fixed" &&
        /*$chatPosition*/
        ctx[2] === "right-bottom");
        toggle_class(section, "left-bottom",
        /*$chatLayout*/
        ctx[1] === "fixed" &&
        /*$chatPosition*/
        ctx[2] === "left-bottom");
        add_location(section, file$7, 16, 0, 363);
      },
      m: function mount(target, anchor) {
        insert_dev(target, section, anchor);
        mount_component(chatheader, section, null);
        append_dev(section, t0);
        mount_component(chatbody, section, null);
        append_dev(section, t1);
        mount_component(chatfooter, section, null);
        current = true;
      },
      p: function update(ctx, dirty) {
        if (dirty &
        /*$chatLayout*/
        2) {
          toggle_class(section, "layout-fixed",
          /*$chatLayout*/
          ctx[1] === "fixed");
        }

        if (dirty &
        /*$chatLayout*/
        2) {
          toggle_class(section, "layout-static",
          /*$chatLayout*/
          ctx[1] === "static");
        }

        if (dirty &
        /*$chatLayout, $chatPosition*/
        6) {
          toggle_class(section, "right-bottom",
          /*$chatLayout*/
          ctx[1] === "fixed" &&
          /*$chatPosition*/
          ctx[2] === "right-bottom");
        }

        if (dirty &
        /*$chatLayout, $chatPosition*/
        6) {
          toggle_class(section, "left-bottom",
          /*$chatLayout*/
          ctx[1] === "fixed" &&
          /*$chatPosition*/
          ctx[2] === "left-bottom");
        }
      },
      i: function intro(local) {
        if (current) return;
        transition_in(chatheader.$$.fragment, local);
        transition_in(chatbody.$$.fragment, local);
        transition_in(chatfooter.$$.fragment, local);
        add_render_callback(function () {
          if (!section_transition) section_transition = create_bidirectional_transition(section, fly, {
            y: 50,
            duration: TRANSITION_DURATION
          }, true);
          section_transition.run(1);
        });
        current = true;
      },
      o: function outro(local) {
        transition_out(chatheader.$$.fragment, local);
        transition_out(chatbody.$$.fragment, local);
        transition_out(chatfooter.$$.fragment, local);
        if (!section_transition) section_transition = create_bidirectional_transition(section, fly, {
          y: 50,
          duration: TRANSITION_DURATION
        }, false);
        section_transition.run(0);
        current = false;
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(section);
        destroy_component(chatheader);
        destroy_component(chatbody);
        destroy_component(chatfooter);
        if (detaching && section_transition) section_transition.end();
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_if_block$4.name,
      type: "if",
      source: "(16:0) {#if $chatVisible}",
      ctx: ctx
    });
    return block;
  }

  function create_fragment$7(ctx) {
    var if_block_anchor;
    var current;
    var if_block =
    /*$chatVisible*/
    ctx[0] && create_if_block$4(ctx);
    var block = {
      c: function create() {
        if (if_block) if_block.c();
        if_block_anchor = empty$1();
      },
      l: function claim(nodes) {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function mount(target, anchor) {
        if (if_block) if_block.m(target, anchor);
        insert_dev(target, if_block_anchor, anchor);
        current = true;
      },
      p: function update(ctx, _ref) {
        var _ref2 = _slicedToArray(_ref, 1),
            dirty = _ref2[0];

        if (
        /*$chatVisible*/
        ctx[0]) {
          if (if_block) {
            if_block.p(ctx, dirty);
            transition_in(if_block, 1);
          } else {
            if_block = create_if_block$4(ctx);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, function () {
            if_block = null;
          });
          check_outros();
        }
      },
      i: function intro(local) {
        if (current) return;
        transition_in(if_block);
        current = true;
      },
      o: function outro(local) {
        transition_out(if_block);
        current = false;
      },
      d: function destroy(detaching) {
        if (if_block) if_block.d(detaching);
        if (detaching) detach_dev(if_block_anchor);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_fragment$7.name,
      type: "component",
      source: "",
      ctx: ctx
    });
    return block;
  }

  function instance$6($$self, $$props, $$invalidate) {
    var $chatVisible;
    var $chatLayout;
    var $chatPosition;
    validate_store(chatVisible, "chatVisible");
    component_subscribe($$self, chatVisible, function ($$value) {
      return $$invalidate(0, $chatVisible = $$value);
    });
    validate_store(chatLayout, "chatLayout");
    component_subscribe($$self, chatLayout, function ($$value) {
      return $$invalidate(1, $chatLayout = $$value);
    });
    validate_store(chatPosition, "chatPosition");
    component_subscribe($$self, chatPosition, function ($$value) {
      return $$invalidate(2, $chatPosition = $$value);
    });

    $$self.$capture_state = function () {
      return {};
    };

    $$self.$inject_state = function ($$props) {
      if ("$chatVisible" in $$props) chatVisible.set($chatVisible = $$props.$chatVisible);
      if ("$chatLayout" in $$props) chatLayout.set($chatLayout = $$props.$chatLayout);
      if ("$chatPosition" in $$props) chatPosition.set($chatPosition = $$props.$chatPosition);
    };

    return [$chatVisible, $chatLayout, $chatPosition];
  }

  var Chat$1 =
  /*#__PURE__*/
  function (_SvelteComponentDev) {
    _inherits(Chat, _SvelteComponentDev);

    function Chat(options) {
      var _this;

      _classCallCheck(this, Chat);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Chat).call(this, options));
      init(_assertThisInitialized(_this), options, instance$6, create_fragment$7, safe_not_equal, {});
      dispatch_dev("SvelteRegisterComponent", {
        component: _assertThisInitialized(_this),
        tagName: "Chat",
        options: options,
        id: create_fragment$7.name
      });
      return _this;
    }

    return Chat;
  }(SvelteComponentDev);

  var file$8 = "src\\components\\ChatToggle.svelte"; // (23:2) {:else}

  function create_else_block$1(ctx) {
    var img;
    var img_src_value;
    var block = {
      c: function create() {
        img = element("img");
        if (img.src !== (img_src_value = "" + (
        /*$chatAssetsUrl*/
        ctx[2] + "assets/img/bot-icon.png"))) attr_dev(img, "src", img_src_value);
        attr_dev(img, "width", "40");
        attr_dev(img, "height", "39");
        attr_dev(img, "alt", "Показать чат");
        attr_dev(img, "class", "svelte-1q7w1kd");
        add_location(img, file$8, 23, 4, 499);
      },
      m: function mount(target, anchor) {
        insert_dev(target, img, anchor);
      },
      p: function update(ctx, dirty) {
        if (dirty &
        /*$chatAssetsUrl*/
        4 && img.src !== (img_src_value = "" + (
        /*$chatAssetsUrl*/
        ctx[2] + "assets/img/bot-icon.png"))) {
          attr_dev(img, "src", img_src_value);
        }
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(img);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_else_block$1.name,
      type: "else",
      source: "(23:2) {:else}",
      ctx: ctx
    });
    return block;
  } // (16:2) {#if $chatVisible}


  function create_if_block$5(ctx) {
    var img;
    var img_src_value;
    var block = {
      c: function create() {
        img = element("img");
        if (img.src !== (img_src_value = "" + (
        /*$chatAssetsUrl*/
        ctx[2] + "assets/img/icon-close.svg"))) attr_dev(img, "src", img_src_value);
        attr_dev(img, "width", "14");
        attr_dev(img, "height", "14");
        attr_dev(img, "alt", "Скрыть чат");
        attr_dev(img, "class", "svelte-1q7w1kd");
        add_location(img, file$8, 16, 4, 354);
      },
      m: function mount(target, anchor) {
        insert_dev(target, img, anchor);
      },
      p: function update(ctx, dirty) {
        if (dirty &
        /*$chatAssetsUrl*/
        4 && img.src !== (img_src_value = "" + (
        /*$chatAssetsUrl*/
        ctx[2] + "assets/img/icon-close.svg"))) {
          attr_dev(img, "src", img_src_value);
        }
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(img);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_if_block$5.name,
      type: "if",
      source: "(16:2) {#if $chatVisible}",
      ctx: ctx
    });
    return block;
  }

  function create_fragment$8(ctx) {
    var button;
    var dispose;

    function select_block_type(ctx, dirty) {
      if (
      /*$chatVisible*/
      ctx[0]) return create_if_block$5;
      return create_else_block$1;
    }

    var current_block_type = select_block_type(ctx);
    var if_block = current_block_type(ctx);
    var block = {
      c: function create() {
        button = element("button");
        if_block.c();
        attr_dev(button, "class", "chatBotToggle svelte-1q7w1kd");
        toggle_class(button, "active",
        /*$chatVisible*/
        ctx[0]);
        toggle_class(button, "right-bottom",
        /*$chatPosition*/
        ctx[1] === "right-bottom");
        toggle_class(button, "left-bottom",
        /*$chatPosition*/
        ctx[1] === "left-bottom");
        add_location(button, file$8, 8, 0, 107);
      },
      l: function claim(nodes) {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function mount(target, anchor) {
        insert_dev(target, button, anchor);
        if_block.m(button, null);
        dispose = listen_dev(button, "click", chatVisible.toggle, false, false, false);
      },
      p: function update(ctx, _ref) {
        var _ref2 = _slicedToArray(_ref, 1),
            dirty = _ref2[0];

        if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block.d(1);
          if_block = current_block_type(ctx);

          if (if_block) {
            if_block.c();
            if_block.m(button, null);
          }
        }

        if (dirty &
        /*$chatVisible*/
        1) {
          toggle_class(button, "active",
          /*$chatVisible*/
          ctx[0]);
        }

        if (dirty &
        /*$chatPosition*/
        2) {
          toggle_class(button, "right-bottom",
          /*$chatPosition*/
          ctx[1] === "right-bottom");
        }

        if (dirty &
        /*$chatPosition*/
        2) {
          toggle_class(button, "left-bottom",
          /*$chatPosition*/
          ctx[1] === "left-bottom");
        }
      },
      i: noop,
      o: noop,
      d: function destroy(detaching) {
        if (detaching) detach_dev(button);
        if_block.d();
        dispose();
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_fragment$8.name,
      type: "component",
      source: "",
      ctx: ctx
    });
    return block;
  }

  function instance$7($$self, $$props, $$invalidate) {
    var $chatVisible;
    var $chatPosition;
    var $chatAssetsUrl;
    validate_store(chatVisible, "chatVisible");
    component_subscribe($$self, chatVisible, function ($$value) {
      return $$invalidate(0, $chatVisible = $$value);
    });
    validate_store(chatPosition, "chatPosition");
    component_subscribe($$self, chatPosition, function ($$value) {
      return $$invalidate(1, $chatPosition = $$value);
    });
    validate_store(chatAssetsUrl, "chatAssetsUrl");
    component_subscribe($$self, chatAssetsUrl, function ($$value) {
      return $$invalidate(2, $chatAssetsUrl = $$value);
    });

    $$self.$capture_state = function () {
      return {};
    };

    $$self.$inject_state = function ($$props) {
      if ("$chatVisible" in $$props) chatVisible.set($chatVisible = $$props.$chatVisible);
      if ("$chatPosition" in $$props) chatPosition.set($chatPosition = $$props.$chatPosition);
      if ("$chatAssetsUrl" in $$props) chatAssetsUrl.set($chatAssetsUrl = $$props.$chatAssetsUrl);
    };

    return [$chatVisible, $chatPosition, $chatAssetsUrl];
  }

  var ChatToggle =
  /*#__PURE__*/
  function (_SvelteComponentDev) {
    _inherits(ChatToggle, _SvelteComponentDev);

    function ChatToggle(options) {
      var _this;

      _classCallCheck(this, ChatToggle);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ChatToggle).call(this, options));
      init(_assertThisInitialized(_this), options, instance$7, create_fragment$8, safe_not_equal, {});
      dispatch_dev("SvelteRegisterComponent", {
        component: _assertThisInitialized(_this),
        tagName: "ChatToggle",
        options: options,
        id: create_fragment$8.name
      });
      return _this;
    }

    return ChatToggle;
  }(SvelteComponentDev);

  var file$9 = "src\\App.svelte"; // (65:2) {#if $chatLoading}

  function create_if_block$6(ctx) {
    var div;
    var t;
    var div_transition;
    var current;
    var chat = new Chat$1({
      $$inline: true
    });
    var if_block =
    /*$chatLayout*/
    ctx[1] === "fixed" && create_if_block_1$1(ctx);
    var block = {
      c: function create() {
        div = element("div");
        create_component(chat.$$.fragment);
        t = space$1();
        if (if_block) if_block.c();
        attr_dev(div, "class", "chatBot svelte-1fyncv8");
        toggle_class(div, "right-bottom",
        /*$chatPosition*/
        ctx[3] === "right-bottom");
        toggle_class(div, "left-bottom",
        /*$chatPosition*/
        ctx[3] === "left-bottom");
        add_location(div, file$9, 65, 2, 1482);
      },
      m: function mount(target, anchor) {
        insert_dev(target, div, anchor);
        mount_component(chat, div, null);
        append_dev(div, t);
        if (if_block) if_block.m(div, null);
        /*div_binding*/

        ctx[7](div);
        current = true;
      },
      p: function update(ctx, dirty) {
        if (
        /*$chatLayout*/
        ctx[1] === "fixed") {
          if (!if_block) {
            if_block = create_if_block_1$1(ctx);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(div, null);
          } else {
            transition_in(if_block, 1);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, function () {
            if_block = null;
          });
          check_outros();
        }

        if (dirty &
        /*$chatPosition*/
        8) {
          toggle_class(div, "right-bottom",
          /*$chatPosition*/
          ctx[3] === "right-bottom");
        }

        if (dirty &
        /*$chatPosition*/
        8) {
          toggle_class(div, "left-bottom",
          /*$chatPosition*/
          ctx[3] === "left-bottom");
        }
      },
      i: function intro(local) {
        if (current) return;
        transition_in(chat.$$.fragment, local);
        transition_in(if_block);
        add_render_callback(function () {
          if (!div_transition) div_transition = create_bidirectional_transition(div, fade, {
            duration: TRANSITION_DURATION
          }, true);
          div_transition.run(1);
        });
        current = true;
      },
      o: function outro(local) {
        transition_out(chat.$$.fragment, local);
        transition_out(if_block);
        if (!div_transition) div_transition = create_bidirectional_transition(div, fade, {
          duration: TRANSITION_DURATION
        }, false);
        div_transition.run(0);
        current = false;
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(div);
        destroy_component(chat);
        if (if_block) if_block.d();
        /*div_binding*/

        ctx[7](null);
        if (detaching && div_transition) div_transition.end();
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_if_block$6.name,
      type: "if",
      source: "(65:2) {#if $chatLoading}",
      ctx: ctx
    });
    return block;
  } // (77:4) {#if $chatLayout === 'fixed'}


  function create_if_block_1$1(ctx) {
    var current;
    var chattoggle = new ChatToggle({
      $$inline: true
    });
    var block = {
      c: function create() {
        create_component(chattoggle.$$.fragment);
      },
      m: function mount(target, anchor) {
        mount_component(chattoggle, target, anchor);
        current = true;
      },
      i: function intro(local) {
        if (current) return;
        transition_in(chattoggle.$$.fragment, local);
        current = true;
      },
      o: function outro(local) {
        transition_out(chattoggle.$$.fragment, local);
        current = false;
      },
      d: function destroy(detaching) {
        destroy_component(chattoggle, detaching);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_if_block_1$1.name,
      type: "if",
      source: "(77:4) {#if $chatLayout === 'fixed'}",
      ctx: ctx
    });
    return block;
  }

  function create_fragment$9(ctx) {
    var div;
    var current;
    var if_block =
    /*$chatLoading*/
    ctx[2] && create_if_block$6(ctx);
    var block = {
      c: function create() {
        div = element("div");
        if (if_block) if_block.c();
        attr_dev(div, "class", "chatBotContainer svelte-1fyncv8");
        toggle_class(div, "layout-fixed",
        /*$chatLayout*/
        ctx[1] === "fixed");
        toggle_class(div, "layout-static",
        /*$chatLayout*/
        ctx[1] === "static");
        add_location(div, file$9, 59, 0, 1323);
      },
      l: function claim(nodes) {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function mount(target, anchor) {
        insert_dev(target, div, anchor);
        if (if_block) if_block.m(div, null);
        current = true;
      },
      p: function update(ctx, _ref) {
        var _ref2 = _slicedToArray(_ref, 1),
            dirty = _ref2[0];

        if (
        /*$chatLoading*/
        ctx[2]) {
          if (if_block) {
            if_block.p(ctx, dirty);
            transition_in(if_block, 1);
          } else {
            if_block = create_if_block$6(ctx);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(div, null);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, function () {
            if_block = null;
          });
          check_outros();
        }

        if (dirty &
        /*$chatLayout*/
        2) {
          toggle_class(div, "layout-fixed",
          /*$chatLayout*/
          ctx[1] === "fixed");
        }

        if (dirty &
        /*$chatLayout*/
        2) {
          toggle_class(div, "layout-static",
          /*$chatLayout*/
          ctx[1] === "static");
        }
      },
      i: function intro(local) {
        if (current) return;
        transition_in(if_block);
        current = true;
      },
      o: function outro(local) {
        transition_out(if_block);
        current = false;
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(div);
        if (if_block) if_block.d();
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_fragment$9.name,
      type: "component",
      source: "",
      ctx: ctx
    });
    return block;
  }

  function instance$8($$self, $$props, $$invalidate) {
    var $chatTransportType;
    var $chatLayout;
    var $chatLoading;
    var $chatPosition;
    validate_store(chatTransportType, "chatTransportType");
    component_subscribe($$self, chatTransportType, function ($$value) {
      return $$invalidate(4, $chatTransportType = $$value);
    });
    validate_store(chatLayout, "chatLayout");
    component_subscribe($$self, chatLayout, function ($$value) {
      return $$invalidate(1, $chatLayout = $$value);
    });
    validate_store(chatLoading, "chatLoading");
    component_subscribe($$self, chatLoading, function ($$value) {
      return $$invalidate(2, $chatLoading = $$value);
    });
    validate_store(chatPosition, "chatPosition");
    component_subscribe($$self, chatPosition, function ($$value) {
      return $$invalidate(3, $chatPosition = $$value);
    });

    switch ($chatTransportType) {
      case "wss":
        setContext("chat", new ChatWss());
        break;

      case "http":
        setContext("chat", new ChatHttp());
        break;

      default:
        setContext("chat", new ChatWss());
    }

    var initEvent = new CustomEvent(EVENTS.INIT_NAME);
    var chatBot;

    function clickOutside(_ref3) {
      var target = _ref3.target;
      var isClickInside = chatBot.contains(target);

      if (!isClickInside) {
        chatVisible.hide();
      }
    }

    onMount(function () {
      initEvent.dispatchEvent();

      if (get_store_value(chatOutsideClose) && get_store_value(chatLayout) === "fixed") {
        document.addEventListener("click", clickOutside);
      }
    });

    function div_binding($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](function () {
        $$invalidate(0, chatBot = $$value);
      });
    }

    $$self.$capture_state = function () {
      return {};
    };

    $$self.$inject_state = function ($$props) {
      if ("chatBot" in $$props) $$invalidate(0, chatBot = $$props.chatBot);
      if ("$chatTransportType" in $$props) chatTransportType.set($chatTransportType = $$props.$chatTransportType);
      if ("$chatLayout" in $$props) chatLayout.set($chatLayout = $$props.$chatLayout);
      if ("$chatLoading" in $$props) chatLoading.set($chatLoading = $$props.$chatLoading);
      if ("$chatPosition" in $$props) chatPosition.set($chatPosition = $$props.$chatPosition);
    };

    return [chatBot, $chatLayout, $chatLoading, $chatPosition, $chatTransportType, initEvent, clickOutside, div_binding];
  }

  var App =
  /*#__PURE__*/
  function (_SvelteComponentDev) {
    _inherits(App, _SvelteComponentDev);

    function App(options) {
      var _this;

      _classCallCheck(this, App);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, options));
      init(_assertThisInitialized(_this), options, instance$8, create_fragment$9, safe_not_equal, {});
      dispatch_dev("SvelteRegisterComponent", {
        component: _assertThisInitialized(_this),
        tagName: "App",
        options: options,
        id: create_fragment$9.name
      });
      return _this;
    }

    return App;
  }(SvelteComponentDev);

  var CMGBotWidget =
  /*#__PURE__*/
  function () {
    function CMGBotWidget() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, CMGBotWidget);

      this.app = null;
      this.defaultOptions = {
        target: DEFAULT_TARGET,
        layout: LAYOUT_TYPE,
        position: DEFAULT_POSITION,
        locale: DEFAULT_LOCALE,
        devMode: false,
        visible: false,
        outsideClose: true,
        transportType: TRANSPORT_TYPE,
        assetsUrl:  DEFAULT_ASSETS_URL,
        entryPoint: {
          token: null,
          baseUrl: null
        },
        plugins: [],
        theme: {
          header: {
            backgroundColor: null
          },
          title: {
            color: null
          },
          body: {
            backgroundColor: null
          },
          actionButton: {
            backgroundColor: null,
            borderColor: null
          },
          toggleButton: {
            backgroundColor: null
          }
        },
        data: {
          title: DEFAULT_TITLE,
          logoUrl: null
        }
      };
      this.options = defaultsDeep_1(options, this.defaultOptions);

      this._init();
    }

    _createClass(CMGBotWidget, [{
      key: "_init",
      value: function () {
        var _init2 = _asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee() {
          return regenerator.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (this.options.devMode) {
                    console.group();
                    console.log("\u0422\u0438\u043F \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442\u0430: ".concat(this.options.transportType));
                    console.groupEnd();
                  }

                  this._setSettings();

                  _context.next = 4;
                  return this._getToken();

                case 4:
                  this.app = new App({
                    target: this.options.target
                  });

                case 5:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function _init() {
          return _init2.apply(this, arguments);
        }

        return _init;
      }()
    }, {
      key: "_getToken",
      value: function () {
        var _getToken2 = _asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee2() {
          var localToken, _ref, token;

          return regenerator.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  localToken = sessionStorage.getItem(TOKEN_NAME);

                  if (!localToken) {
                    _context2.next = 5;
                    break;
                  }

                  chatToken.set(localToken);

                  if (this.options.devMode) {
                    console.group();
                    console.log('Токен получен из сессии:');
                    console.log(localToken);
                    console.groupEnd();
                  }

                  return _context2.abrupt("return");

                case 5:
                  _context2.prev = 5;

                  if (this.options.devMode) {
                    console.group();
                    console.log('Получение токена от сервера');
                    console.log("\u0410\u0434\u0440\u0435\u0441: ".concat(this.options.entryPoint.token));
                    console.groupEnd();
                  }

                  _context2.next = 9;
                  return axios$1.get(this.options.entryPoint.token);

                case 9:
                  _ref = _context2.sent;
                  token = _ref.data.token;
                  chatToken.set(token);
                  sessionStorage.setItem(TOKEN_NAME, token);

                  if (this.options.devMode) {
                    console.group();
                    console.log('Токен от сервера получен:');
                    console.log(token);
                    console.groupEnd();
                  }

                  _context2.next = 19;
                  break;

                case 16:
                  _context2.prev = 16;
                  _context2.t0 = _context2["catch"](5);
                  console.log(_context2.t0);

                case 19:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this, [[5, 16]]);
        }));

        function _getToken() {
          return _getToken2.apply(this, arguments);
        }

        return _getToken;
      }()
    }, {
      key: "_setSettings",
      value: function _setSettings() {
        var _this$options = this.options,
            position = _this$options.position,
            baseUrl = _this$options.entryPoint.baseUrl,
            locale = _this$options.locale,
            devMode = _this$options.devMode,
            transportType = _this$options.transportType,
            layout = _this$options.layout,
            data = _this$options.data,
            theme = _this$options.theme,
            visible = _this$options.visible,
            plugins = _this$options.plugins,
            outsideClose = _this$options.outsideClose,
            assetsUrl = _this$options.assetsUrl;
        chatPosition.set(position);
        chatLocale.set(locale);
        chatTransportType.set(transportType);
        isDev.set(devMode);
        chatVisible.set(visible);
        chatOutsideClose.set(outsideClose);
        chatBaseUrl.set(baseUrl);
        chatLayout.set(layout);
        chatData.set(data);
        chatTheme.set(theme);
        chatPlugins.set(plugins);
        chatAssetsUrl.set(assetsUrl);
      }
    }, {
      key: "show",
      value: function show() {
        if (this.options.layout === 'fixed') {
          chatVisible.show();
        }
      }
    }, {
      key: "hide",
      value: function hide() {
        if (this.options.layout === 'fixed') {
          chatVisible.hide();
        }
      }
    }, {
      key: "on",
      value: function on(eventName, callback) {
        document.addEventListener(eventName, callback);
        return this;
      }
    }]);

    return CMGBotWidget;
  }();

  window.CMGBotWidget = CMGBotWidget;

}());
//# sourceMappingURL=bundle.js.map
