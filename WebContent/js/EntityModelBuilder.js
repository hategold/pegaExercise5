var entityModelBuilder = function(model) {
	this.modelName = model.name;
	this.modelConstructor = model;

	this.buildEntityByJson = function(json) {
		entity = new this.modelConstructor();
		return entity.setAttributeByObj(json);
	};
	this.buildListByJson = function(jsonList) {
		var entityList = new Array();
		var i;
		for (i = 0; i < jsonList.length; i++) {
			entityList.push(this.buildEntityByJson(jsonList[i]));
		}

		return entityList;
	};

	this.buildByJson = function(json) {

		if (json.length) {
			var eventData = this.buildListByJson(json);
			$(document).trigger(this.modelName + 'ListBuilded', [eventData]);

		} else {

			var eventData = this.buildEntityByJson(json);
			$(document).trigger(this.modelName + 'Builded', [eventData]);
		}

	}
}
