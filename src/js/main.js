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





var Report = Backbone.Model.extend({
  urlRoot: "/js/api/reports",
});

var Reports = Backbone.Collection.extend({
  Model: Report
});

var ReportView = Backbone.View.extend({
  initialize: function() {
    this.model.on("change", this.render, this);
    this.model.on("remove", this.onReportRemove, this);
  },

  onReportRemove: function(report) {
    this.$el.find("li#" + report.id).remove();
    this.remove();
  },

  tagName: "li",
  className: "report-card",

  events: {
    "click .btn-delete": "onDelete"
  },

  onDelete: function(e) {
    this.remove();
  },

  render: function() {
    var template = _.template($(reportTemplate).html());
    var html = template(this.model.toJSON());
    this.$el.html(html);
    return this;
  }
});

var ReportsView = Backbone.View.extend({
  tagName: "ul",
  className: "reports-cards",
  render: function() {
    this.collection.each(function (report) {
      var reportView = new ReportView({model: report});
      this.$el.append(reportView.render().$el);
    }, this);
    return this;
  }
});

var reports_db = new Reports([
  new Report({
    category: 'Overall',
    byUsername: 'Infersoul',
    byFullName: 'Maria Semionova',
    email: 'maria@mail.com',
    date: new Date(new Date() - 150000).toLocaleString('en-GB'),
    id: 1
  }),
  new Report({
    category: 'Users Activity',
    byUsername: 'Aosoth',
    byFullName: 'Anastasia Cernova',
    email: 'anastasia@mail.com',
    date: new Date(new Date() - 100000).toLocaleString('en-GB'),
    id: 2
  }),
  new Report({
    category: 'Conversion Rate',
    byUsername: 'Aosoth',
    byFullName: 'Anastasia Cernova',
    email: 'anastasia@mail.com',
    date: new Date().toLocaleString('en-GB'),
    id: 3
  }),
]);
console.log(reports_db);

var reportsView = new ReportsView({collection: reports_db});
$('#reports').html(reportsView.render().$el);