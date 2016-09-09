var ShoesModel = {

	modelName : 'Shoes',
	idProperty : 'shoesId',
	associationApi : 'BrandTableController',
	fields : [{
				name : 'shoesId',
				editable : false,
				type : 'int'
			}, {
				name : 'shoesName',
				editable : true,
				type : 'string'
			}, {
				name : 'series',
				editable : true,
				type : 'string'
			}, {
				name : 'category',
				editable : true,
				type : 'string'
			}, {
				name : 'price',
				editable : true,
				type : 'double'
			}],
	validator : {
		presense : ['shoesId']
	},
	api : {
		read : 'ShoesTableController?action=list',
		update : 'ShoesTableController',
		create : 'ShoesTableController',
		destroy : 'ShoesTableController?action=delete'
	},
	actionMethods : {
		read : 'GET',
		update : 'POST',
		create : 'POST',
		destroy : 'GET'
	},
	entityBuilder : entityModelBuilder(ShoesModel)
}
