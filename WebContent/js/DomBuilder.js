var domBuilder = {
	name : "domBuilder",
	buildTable : function(responseJson) {
		$.each(responseJson, function(index, record) {
					$("#brandTable tr:last").after("<tr></tr>")

					$("#brandTable tr:last").append("<td>" + record['brandId']
							+ "</td>")
					$("#brandTable tr:last").append("<td>"
							+ record['brandName'] + "</td>")
					$("#brandTable tr:last").append("<td>" + record['website']
							+ "</td>")
					$("#brandTable tr:last").append("<td>" + record['country']
							+ "</td>")

					appendUpdate($("#brandTable tr:last"),
							'BrandTableController.do?action=update&brandId='
									+ record['brandId'])
					appendDelete($("#brandTable tr:last"),
							'BrandTableController.do?action=delete&brandId='
									+ record['brandId'])
				})
	}
}

function appendDelete(element, url) {
	element
			.append('<td><a href='
					+ url
					+ 'class=" confirm"><button type="button" class="btn btn-danger delete" name="delete">Delete</button></a></td>')
}

function appendUpdate(element, url) {
	element
			.append('<td><a href='
					+ url
					+ '><button type="button" class="btn btn-primary" name="update">Update</button></a></td>')
}