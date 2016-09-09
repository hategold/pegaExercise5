var BrandModel = {

	modelName : 'Brand',
	idProperty : 'brandId',
	associationApi : 'ShoesTableController',
	fields : [ {
		name : 'brandId',
		type : 'int'
	},
		{
			name : 'brandName',
			type : 'string'
		},
		{
			name : 'website',
			type : 'string'
		},
		{
			name : 'country',
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
	}
}

BrandModel.entityBuilder = new entityModelBuilder(BrandModel);

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
