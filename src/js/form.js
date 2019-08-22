//import
//var myModule = require('./myModule');

//export
//var myModule = { x: 1, y: function(){ console.log('This is ES5') }}
//module.exports = myModule;
var form = document.querySelector('.report-form');

form.addEventListener('submit', e => {
  e.preventDefault();
  console.log('form sent');
  var username = form.username.value;
  var fullname = form.fullName.value;
  var email = form.email.value;
  var category = form.category.value;
  var report = {
    category: category,
    byUsername: username,
    byFullName: fullname,
    email: email,
    date: new Date().toLocaleString('en-GB')
  };
  console.log(JSON.stringify(report));
  localStorage.setItem('userReport', JSON.stringify(report));
  form.reset();
  window.open('reports.html','_self',false);
});