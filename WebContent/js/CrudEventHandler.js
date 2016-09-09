var dataStore = {};
var tView = tableView(tableViewConfig, domBuilder);
var store = {};// id:model

$(document).on("click", "button[name=\"delete\"]", function(e) {
			e.preventDefault();
			var thisSelector = $(this);
			var url = thisSelector.closest("a").attr("href");

			bootbox.confirm({// 頁面邏輯?
				title : "確認要刪除?",
				message : "Are you sure?",
				callback : function(result) {
					if (result) {
						ajaxUtil.makeAjaxRequest(url, null, {}, function() {
									domBuilder.deleteSelectRow(thisSelector);
								})
					}
				},
				size : "big"
			});

		})

$(document).on("click", "button[name=\"update\"]", function(e) {
	e.preventDefault();
	domBuilder.updateNewRowForm(Brand.prototype.inputColAttributeMap, $(this)
					.closest("tr"));

})
$(document).on("click", "button[name=\"create\"]", function(e) {
			e.preventDefault();
			tView.createNewRowForm();

		})

$(document).ready(function() {
	var url = BrandModel.api.read;

	initReferrenceListener();

	tView.buildTableHead();
	ajaxUtil.makeAjaxRequest(url, null, BrandModel.entityBuilder,
			BrandModel.entityBuilder.buildByJson);

})

function initReferrenceListener() {

	$(document).on(BrandModel.modelName + 'TrBuilded', function(e, eventData) {
				var tbSelector = $('#' + BrandModel.modelName + 'Table tbody');
				$.each(eventData, function(idx) {
							tbSelector.append(eventData[idx]);
						})
			});
	$(document).on(BrandModel.modelName + 'ThBuilded', function(e, eventData) {
				var thSelector = $('#' + BrandModel.modelName + 'Table thead');
				thSelector.children().remove();
				thSelector.append(eventData.tr);
			})

	$(document).on(BrandModel.modelName + 'UpdateRowForm',
			function(e, eventData) {
				var idSelector = eventData.target;
				idSelector.after(eventData.tr);
			})

	$(document).on(BrandModel.modelName + 'CreateRowForm', function(e, trForm) {
				var tbSelector = $('#' + BrandModel.modelName + 'Table tbody');
				tbSelector.append(trForm);
			})
	$(document).on(BrandModel.modelName + 'ListBuilded',
			function(event, eventData) {
				tView.buildTableByArray(eventData);
			});
	// $(document).on(model.name + 'Builded', function(event, eventData) {
	// });
}

$(document).on("click", "button[name=\"inputOk\"]", function(e) {// TODO

			var postModel = {};// = new Brand();
			var trSelector = $(this).closest("tr");
			trSelector.find("input,select").map(function() {
						postModel[$(this).attr("dataindex")] = $(this).val();
					});

			// postModel[domBuilder.superEntityParm['idName']] =
			// domBuilder.superEntityParm['idValue']

			ajaxUtil.makeAjaxRequest(BrandModel.api.update, JSON
							.stringify(postModel), domBuilder, function(
							response) {
//						delete stroe[response['brandId']];
						tView.formToEntity(trSelector, response);
					}, "POST", function(response) {
						tView.deleteSelectRow(trSelector);
					})
		});

$(document).on("click", "button[name=\"inputCancel\"]", function(e) {
			// $("#" + $(this).attr("target")).show();
			tView.deleteSelectRow($(this));
		});