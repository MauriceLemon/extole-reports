//import
//var myModule = require('./myModule');

//export
//var myModule = { x: 1, y: function(){ console.log('This is ES5') }}
//module.exports = myModule;

var form = document.querySelector('.report-form');

form.addEventListener('submit', e => {
  e.preventDefault();
  console.log('form sent');
  form.reset();
  window.open('reports.html','_self',false);
});