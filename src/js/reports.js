var Report = Backbone.Model.extend({
  urlRoot: "../api/reports_db"
});

var Reports = Backbone.Collection.extend({
  model: Report,
  url: "../api/reports_db"
});

var ReportView = Backbone.View.extend({
  initialize: function() {
    this.model.on("add", this.onReportAdd, this);
    this.model.on("change", this.render, this);
    this.model.on("remove", this.onReportRemove, this);
  },

  onReportAdd: function(report) {
    var reportView = new ReportView({model: report});
    this.$el.append(reportView.render().$el);
  },

  onReportRemove: function(report) {
    this.$el.find("li#" + report.id).remove();
    localStorage.removeItem('userReport');
    this.remove();
  },

  tagName: "li",
  className: "report-card",

  events: {
    "click .btn-delete": "onDelete"
  },

  onDelete: function() {
    this.$el.find("li#" + reps.id).remove();
    localStorage.removeItem('userReport');
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

// MANUALY CREATED COLLECTION
var reports = new Reports([
  new Report({
    category: 'lolo',
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
  })
]);
//
// var reportsView = new ReportsView({collection: reports});
// $('#reports').html(reportsView.render().$el);

//COLLECTION FROM SERVER
var reps = new Reports();
// console.log(reps);

async function reportsFetch(reps) {
  await reps.fetch({
    success: function() {

      if (localStorage.getItem('userReport')) {
        var data = new Report(JSON.parse(localStorage.getItem('userReport')));
        reps.add(data);
        // console.log(data);
      }

      var repsView = new ReportsView({collection: reps});
      $('#reports').html(repsView.render().$el);

    },
    error: function (errorResponse) {
      console.log(errorResponse);
    }
  });
}
reportsFetch(reps);


//LOADER
var elementStrings = {
  loader: 'loader'
};

var renderLoader = function(parent) {
  var loader = '<div class="' + elementStrings.loader + '">\
            <svg>\
                <use href="img/icons.svg#icon-cw"></use>\
            </svg>\
        </div>';
  parent.parentElement.insertAdjacentHTML('afterbegin', loader);
};
// renderLoader(document.body);