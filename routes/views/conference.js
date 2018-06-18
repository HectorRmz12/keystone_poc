var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'conference';
	locals.filters = {
		conference: req.params.conference,
	};
	locals.data = {
		conferences: [],
	};

	// Load the current conference
	view.on('init', function (next) {

		var q = keystone.list('Conference').model.findOne({
			state: 'published',
			slug: locals.filters.conference,
		}).populate('author categories');

		q.exec(function (err, result) {
			locals.data.conference = result;
			next(err);
		});

	});

	// Load other conference
	view.on('init', function (next) {

		var q = keystone.list('Conference').model.find().where('state', 'published').sort('-date').populate('author').limit('4');

		q.exec(function (err, results) {
			locals.data.conferences = results;
			next(err);
		});

	});

	// Render the view
	view.render('conference');
};
