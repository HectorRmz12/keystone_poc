var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Conference Model
 * ==========
 */

var Conference = new keystone.List('Conference', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
});

Conference.add({
	name: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	date: { type: Types.Date, index: true },
	image: { type: Types.CloudinaryImage },
	description: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
});

Conference.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Conference.defaultColumns = 'name, state|20%, author|20%, date|20%';
Conference.register();
