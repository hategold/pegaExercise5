var tableViewConfig = {
	model : BrandModel,
	association : 'ShoesModel',
	columns : [{
				name : 'Brand ID',
				dataIndex : 'brandId',
				tag : 'input',
				editable : false,
				type : 'text'
			}, {
				name : 'Brand Name',
				dataIndex : 'brandName',
				tag : 'input',
				editable : true,
				type : 'text',
				presense : true
			}, {
				name : 'Website',
				dataIndex : 'website',
				tag : 'input',
				editable : true,
				type : 'test'
			}, {
				name : 'Country',
				dataIndex : 'country',
				tag : 'select',
				editable : true
			}],
	rowBtns : {
		'delete' : 'Delete',
		update : 'Update',
		association : 'Shoes List'
	},
	btns : {
		create : 'create'
	}
}

var tableView = function(viewConfig, domBuilder) {
	var m = viewConfig.model
	var colsConfig = viewConfig.columns;
	var subTableBtn = domBuilder.packHtml('button', {
				attrs : [{
							name : 'type',
							value : 'button'
						}, {
							name : 'class',
							value : 'btn btn-primary'
						}, {
							name : 'name',
							value : 'ShoesList'
						}],
				text : 'ShoesList'
			});
	return {
		buildTableHead : function() {
			var tRow = domBuilder.buildTag('tr');

			$.each(viewConfig.columns, function(index, columnObj) {
						var tHead = domBuilder.packHtml('th', {
									text : columnObj.name
								})
						domBuilder.appendToHtml(tHead, tRow)
					})
			domBuilder.appendToHtml(domBuilder.packHtml('th', {
						text : 'Action',
						attrs : [{
									name : 'colspan',
									value : Object.keys(viewConfig.rowBtns).length
								}]
					}), tRow)
			$(document).trigger(viewConfig.model.modelName + 'ThBuilded', {
						'tr' : tRow
					})
			console.log(viewConfig.model.modelName + 'ThBuilded');
			console.log(tRow);

		},
		buildTableByArray : function(entityArray) {
			var that = this;

			var returnTrArray = new Array();

			$.each(entityArray, function(index, element) {

						returnTrArray.push(that.buildTableRow(element));
					})
			$(document).trigger(m.modelName + 'TrBuilded', [returnTrArray]);
		},
		buildTableRow : function(element) {
			var returnTr = domBuilder.packHtml('tr', {
						attrs : [{
									name : 'id',
									value : element[m.idProperty]
								}]
					});
			var i;
			for (i = 0; i < colsConfig.length; i++) {

				domBuilder.appendToHtml(domBuilder.packHtml('td', {
									text : element[colsConfig[i].dataIndex],
									attrs : [{
												name : 'dataIndex',
												value : colsConfig[i].dataIndex
											}]
								}), returnTr)
			}// TODO appendButtons
			domBuilder.appendToHtml(domBuilder.packHtml('td', {
								innerElement : domBuilder.deleteButton.clone()
							}), returnTr);
			domBuilder.appendToHtml(domBuilder.packHtml('td', {
								innerElement : domBuilder.updateButton.clone()
							}), returnTr);
			domBuilder.appendToHtml(domBuilder.packHtml('td', {
								innerElement : subTableBtn.clone()
							}), returnTr);

			return returnTr;
		},
		buildColForm : function(element) {
			var attrsArg = [{
						name : 'type',
						value : (element.type ? element.type : "")
					}, {
						name : 'dataIndex',
						value : element.dataIndex
					}, {
						name : 'class',
						value : 'form-control'
					}];

			if (!element.editable) {
				attrsArg.push({
							name : 'readonly',
							value : true
						});
			}

			if (element.presense) {
				attrsArg.push({
							name : 'require',
							value : true
						});
			}

			// TODO import buildOptionsByAjax/buildOptionsByGlobalVar
			if (element.tag == "select") {
				if (!pageVariable[element.dataIndex + 'Map']) {
					buildOptionsByAjax(element.dataIndex, element.tag);
				} else {
					buildOptionsByGlobalVar(element.dataIndex, element.tag);
				}
			}

			var inputTag = domBuilder.packHtml(element.tag, {
						attrs : attrsArg
					})
			console.log(inputTag)
			return inputTag;
		},

		createNewRowForm : function() {

			var tmpTr = domBuilder.packHtml('tr');
			var colsConfig = viewConfig.columns;
			var that = this;
			$.each(colsConfig, function(index, element) {

						domBuilder.appendToHtml(domBuilder.packHtml('td', {
											innerElement : that
													.buildColForm(element)
										}), tmpTr)
					});
			domBuilder.appendToHtml(domBuilder.packHtml('td', {
								innerElement : domBuilder.inputOkButton
							}), tmpTr);
			domBuilder.appendToHtml(domBuilder.packHtml('td', {
								innerElement : domBuilder.inputCancelButton
							}), tmpTr);

			$(document).trigger(viewConfig.model.modelName + 'CreateRowForm',
					tmpTr);

		},
		deleteSelectRow : function(selector) {
			domBuilder.deleteSelectRow(selector);
		},
		updateNewRowForm : function(rowSelector) {
			var colsConfig = viewConfig.columns;
			rowSelector = rowSelector.closest('tr');
			var rmId = rowSelector.attr('id');

			var tmpTr = $("<tr>");
			var i;
			$.each(colsConfig, function(index, element) {
						var tmpTag = buildColForm(element);

						tmpTag.value = rowSelector.find('[dataIndex='
								+ element.dataIndex + ']').text();
						tmpTag.val(tmpTag.value);
						domBuilder.appendToHtml(domBuilder.packHtml('td', {
											innerElement : tmpTag
										}), tmpTr);

					})

			cancelButtonForUpdate = $(this.inputCancelButton)
			cancelButtonForUpdate.children("button").attr("target",
					rowSelector.attr("id"));

			tmpTr.append(this.inputOkButton);
			tmpTr.append(cancelButtonForUpdate);
			// rowSelector.after(targetTr);

			rowSelector.remove()

			$(document).trigger(this.tableName + 'UpdateRowForm', {
						'tr' : tmpTr,
						'target' : rowSelector,
						'rmId' : rmId
					});
		},

		formToEntity : function(selector, responseJson) {
			var thisTr = this.buildTableRow(responseJson);

			// var id = responseJson[this.tableAttributeName[0]];

			// this.tableAttributeName.forEach(function(element) {
			// $("<td>").text(responseJson[element]).appendTo(thisTr);
			// });
			// console.log($('#' + id));
			// $('#' + id).remove();
			thisTr.attr('id', responseJson[viewConfig.model.idProperty]);

			// this.appendButtons(thisTr, this.tableAttributeName[0],
			// responseJson[this.tableAttributeName[0]]);

			selector.replaceWith(thisTr);
		}

	}
}