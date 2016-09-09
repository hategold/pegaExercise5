// var checkJQ = function() {
// if (!window.jQuery) {
// throw new Error("LikeButtonModule requires jQuery")
// }
// }();

var entityModelBuilder = function(model) {
	this.modelName = model.modelName;

	this.buildEntityByJson = function(json) {
		var entity = {};
		model.fields.forEach(function(element) {
					entity[element.name] = json[element.name];
				})
		return entity;
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
			var listData = this.buildListByJson(json);
			$(document).trigger(this.modelName + 'ListBuilded', [listData]);

		} else {

			var entityData = this.buildEntityByJson(json);
			$(document).trigger(this.modelName + 'Builded', [entityData]);
		}

	}

	this.buildEntityByTr = function(selector, colFields) {
		// colFields
	}
}
