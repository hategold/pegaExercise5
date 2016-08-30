function Shoes() {
	var shoesId, shoesName, series, category, price;

	// var brand = new Brand();

	this.setShoesId = function(param) {
		shoesId = param;
		return this;
	}
	this.setShoesName = function(param) {
		shoesName = param;
		return this;
	}
	this.setSeries = function(param) {
		series = param;
		return this;
	}
	this.setCategory = function(param) {
		category = param;
		return this;
	}
	this.setPrice = function(param) {
		price = param;
		return this;
	}
	this.setAttributeByObj = function(obj) {
		shoesId = obj['shoesId'];
		shoesName = obj['shoesName'];
		series = obj['series'];
		category = obj['category'];
		price = obj['price'];
		return this;
	}
	this.getAttributes = function() {
		return {
			'shoesId' : shoesId,
			'shoesName' : shoesName,
			'series' : series,
			'category' : category,
			'price' : price
		};
	}
	this.getShoesId = function() {
		return shoesId;
	}
	this.getShoesName = function() {
		return shoesName;
	}
	this.getSeries = function() {
		return series;
	}
	this.getCategory = function() {
		return category;
	}
	this.getPrice = function() {
		return price;
	}
};

Shoes.prototype = (function() {

	return {
		colAttribute : ['shoesId', 'shoesName', 'series', 'category', 'price'],
		entityServlet : 'ShoesTableController',
		inputColAttributeMap : {
			shoesId : {
				colTag : 'input',
				colType : 'text',
				otherAttribute : 'readOnly'
			},
			shoesName : {
				colTag : 'input',
				colType : 'text',
				otherAttribute : 'requierd'
			},
			series : {
				colTag : 'input',
				colType : 'text'
			},
			category : {
				colTag : 'input',
				colType : 'text'
			},
			price : {
				colTag : 'input',
				colType : 'number'
			}
		}

	}
}());