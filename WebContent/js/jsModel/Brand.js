function Brand() {
	var brandId, brandName, website, country;
	var shoesGroup = new Array();

	this.setBrandId = function(param) {
		brandId = param;
		return this;
	}
	this.setBrandName = function(param) {
		brandName = param;
		return this;
	}
	this.setWebsite = function(param) {
		website = param;
		return this;
	}
	this.setCountry = function(param) {
		country = param;
		return this;
	}
	this.setAttributeByObj = function(obj) {
		brandId = obj['brandId'];
		brandName = obj['brandName'];
		website = obj['website'];
		country = obj['country'];
		return this;
	}
	this.getAttributes = function() {
		return {
			'brandId' : brandId,
			'brandName' : brandName,
			'website' : website,
			'country' : country
		};
	}
	this.getBrandId = function() {
		return brandId;
	}
	this.getBrandName = function() {
		return brandName;
	}
	this.getWebsite = function() {
		return website;
	}
	this.getCountry = function() {
		return country;
	}
};

Brand.prototype = (function() {

	return {
		colAttribute : [ 'brandId',
			'brandName',
			'website',
			'country' ],
		entityServlet : 'BrandTableController',
		inputColAttributeMap : {
			brandId : {
				colTag : 'input',
				colType : 'text',
				otherAttribute : 'readOnly'
			},
			brandName : {
				colTag : 'input',
				colType : 'text',
				otherAttribute : 'requierd'
			},
			website : {
				colTag : 'input',
				colType : 'text'
			},
			country : {
				colTag : 'select'
			}
		}

	}
}());