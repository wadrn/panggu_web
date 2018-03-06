!function(){

       function hasClass(ele,cls) {
         return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
       }

       function addClass(ele,cls) {
         if (!this.hasClass(ele,cls)) ele.className += " "+cls;
       }

       function removeClass(ele,cls) {
         if (hasClass(ele,cls)) {
            var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
            ele.className=ele.className.replace(reg,' ');
          }
       }

      var Event = {

        funcList: {},
        ieFuncList: {},


        on: function(obj, selector, type, fn) {
          if (!obj || !selector) return false;
          var fnNew = Event.delegateHandle(obj, selector, fn);
          Event.addEvent(obj, type, fnNew);
          /* 将绑定的方法存入Event.funcList，以便之后解绑操作 */
          if (!Event.funcList[selector]) {
            Event.funcList[selector] = {};
          }
          if (!Event.funcList[selector][type]) {
            Event.funcList[selector][type] = {};
          }

          Event.funcList[selector][type][fn] = fnNew;
        },

        off: function(obj, selector, type, fn) {
          if (!obj || !selector || !Event.funcList[selector]) {
            return false;
          }
          var fnNew = Event.funcList[selector][type][fn];
          if (!fnNew) {
            return;
          }

          Event.offEvent(obj, type, fnNew);
          Event.funcList[selector][type][fn] = null;
        },

        delegateHandle: function(obj, selector, fn) {
          /* 实现delegate 的转换方法，事件冒泡上升时, 符合条件时才会执行回调函数 */
          var func = function(event) {
            var event = event || window.event;
            var target = event.srcElement || event.target;
            var parent = target;

            function contain(item, elmName) {
              if (elmName.split('#')[1]) { //by id
                if (item.id && item.id === elmName.split('#')[1]) {
                  return true;
                }
              }
              if (elmName.split('.')[1]) { //by class
                if (hasClass(item, elmName.split('.')[1])) {
                  return true;
                }
              }
              if (item.tagName == elmName.toUpperCase()) {
                return true; //by tagname
              }
              return false;
            }
            function hasClass(ele,cls) {
              if(ele.className && ele.className.match){
                  return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
              }

            }

            while (parent) {
              /* 如果触发的元素，属于(selector)元素的子级。 */
              if (obj == parent) {
                return false; //触发元素是自己
              }
              if (contain(parent, selector)) {

                fn.call(obj, event);
                return;
              }
              parent = parent.parentNode;
            }
          };
          return func;
        },
        addEvent: function(target, type, fn) {
          if (!target) return false;
          var add = function(obj) {
            if (obj.addEventListener) {

              obj.addEventListener(type, fn, false);

            } else {
              // for ie
              if (!Event.ieFuncList[obj]) Event.ieFuncList[obj] = {};
              if (!Event.ieFuncList[obj][type]) Event.ieFuncList[obj][type] = {};
              Event.ieFuncList[obj][type][fn] = function() {
                fn.apply(obj, arguments);
              };
              obj.attachEvent("on" + type, Event.ieFuncList[obj][type][fn]);
            }
          }
          if (target.length >= 0 && target !== window && !target.tagName) {
            for (var i = 0, l = target.length; i < l; i++) {
              add(target[i])
            }
          } else {
            add(target);
          }
        },


        offEvent: function(target, type, fn) {
          if (!target) return false;
          var remove = function(obj) {
            if (obj.addEventListener) {
              obj.removeEventListener(type, fn, false);

            } else {
              //for ie
              if (!Event.ieFuncList[obj] || !Event.ieFuncList[obj][type] || !Event.ieFuncList[obj][type][fn]) {
                return;
              }
              obj.detachEvent("on" + type, Event.ieFuncList[obj][type][fn], false);
              Event.ieFuncList[obj][type][fn] = {};
            }
          }
          if (target.length >= 0 && target !== window && !target.tagName) {
            for (var i = 0, l = target.length; i < l; i++) {
              remove(target[i])
            }
          } else {
            remove(target);
          }
        }

      };

      window.Event = Event
      window.Class = {
        hasClass:hasClass,
          addClass:addClass,
          removeClass:removeClass
      }
}()
