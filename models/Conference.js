var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Conference Model
 * ==================
 */

var Conference = new keystone.List('Conference', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
});

Conference.add({
	name: { type: String, required: true },
	place: { type: String, default: '' },
	from: { type: Types.Date, index: true },
	to: { type: Types.Date, index: true },
	image: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
	},
});

Conference.relationship({ ref: 'Post', path: 'posts', refPath: 'conferences' });

Conference.defaultColumns = 'name, place|20%, from|20%, to|20%';

Conference.register();
