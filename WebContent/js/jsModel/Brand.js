var BrandModel = {

	modelName : 'Brand',
	idProperty : 'brandId',
	fields : [ {
		name : 'brandId',
		editable : false,
		type : 'int'
	},
		{
			name : 'brandName',
			editable : true,
			type : 'string'
		},
		{
			name : 'website',
			editable : true,
			type : 'string'
		},
		{
			name : 'country',
			editable : true,
			type : 'string'
		} ],
	validator : {
		presense : [ 'brandId' ]
	},
	api : {
		read : 'BrandTableController?action=list',
		update : 'BrandTableController',
		create : 'BrandTableController',
		destroy : 'BrandTableController?action=delete'
	},
	actionMethods : {
		read : 'GET',
		update : 'POST',
		create : 'POST',
		destroy : 'GET'
	},

	entityBuilder : entityModelBuilder(BrandModel)
}

// Brand.prototype = (function() {
//
// return {
//		
// inputColAttributeMap : {
// brandId : {
// colTag : 'input',
// colType : 'text',
// otherAttribute : 'readOnly'
// },
// brandName : {
// colTag : 'input',
// colType : 'text',
// otherAttribute : 'requierd'
// },
// website : {
// colTag : 'input',
// colType : 'text'
// },
// country : {
// colTag : 'select'
// }
// }
//
// }
// }());
