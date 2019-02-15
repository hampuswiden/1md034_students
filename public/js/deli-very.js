/*jslint es5:true, indent: 2 */
/*global Vue, io */
/* exported vm */
'use strict';
var socket = io();

var vm = new Vue({
  el: '#op',
  data: {
    order: {},
    counter: 0,
    showOrderInfo: false,
    gender: null,
    name: null,
    email: null,
    address: null,
    house: null,
    paymentMethod: null,
    burger: null
  },
  methods: {
    sendOrder: function() {
      console.log('Button Clicked!');
      //var burgers = this.readValues();
      //console.log(burgers);
      this.writeToBottom();
    },
    readValues: function() {
      var myValues = new Array();

      var radios = document.getElementsByName('gender');
      for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
          myValues.push(radios[i].value);
          break;
        }
      }


      var fieldValues = document.getElementsByClassName('formValue');
      for (var number in fieldValues) {
        if (fieldValues[number].value != undefined) {
          myValues.push(fieldValues[number].value);
        }
      }
        
      var localBurgers = document.getElementsByName('burger');
      for (var i = 0, length = localBurgers.length; i < length; i++) {
        if (localBurgers[i].checked) {
          myValues.push(localBurgers[i].value);
        }
      }
      return myValues;
    },
    showBurgers: function() {
      var burgers = new Array();
      var readValues = this.readValues();
      for (var i=0; i<readValues.length; i++) {
        if (i > 3) {
          burgers.push(readValues[i]);
        }
      }
      console.log(readValues.length);
      return burgers;
    },
    writeToBottom: function() {
      this.showOrderInfo = false; // Forces vue to re-read values with readValues() (no optimizing happning, could be implemented in other ways)
      this.showOrderInfo = true;
    },
    addOrder: function (event) {
      var offset = {x: event.currentTarget.getBoundingClientRect().left,
                    y: event.currentTarget.getBoundingClientRect().top};
      socket.emit("addOrder", { orderId: this.counter,
                                details: { x: this.order.details.x,
                                           y: this.order.details.y },
                                orderItems: this.order.orderItems,
                                personalInfo: this.order.personalInfo
                              });
    },
    displayOrder: function (event) {
      var offset = {x: event.currentTarget.getBoundingClientRect().left,
                    y: event.currentTarget.getBoundingClientRect().top};
      this.order = {
        orderId: this.counter,
        details: { x: event.clientX - 10 - offset.x,
                  y: event.clientY - 10 - offset.y },
        orderItems: this.showBurgers(),
        personalInfo: this.readValues().slice(0,4)
      }
      this.counter += 1;
    },
    opFunction: function (event) {
      this.addOrder(event);
      this.sendOrder();
    }
  }
});
