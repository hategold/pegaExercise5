<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<script src="http://code.jquery.com/jquery-1.12.4.min.js"
	integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ="
	crossorigin="anonymous"></script>
<link href="bootstrap/css/bootstrap.min.css" rel="stylesheet"
	type="text/css" />
<script type="text/javascript" src="bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="jsLib/bootbox.min.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Shoes Records</title>
</head>
<body>

	<div class="container">
		<div class="row" id="up-padding">
			<div class="col-xs-12 col-md-12 col-lg-12 vcenter">
				<div style="height: 4em;"></div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-3 col-md-offset-2">
				<h3>ShoesTable</h3>
				<!-- ${brand.getBrandId()}:${brand.getBrandName()} -->
			</div>
		</div>
		<div class="row">
			<div class="col-md-8 col-md-offset-2">
				<table class="table table-bordered" id="shoesTable"
					servlet="ShoesTableController">
					<thead>
						<!--  <tr>
							<th><div colTag="input" colType="text" colName="shoesId"
									otherAttribute="readonly">ShoesId</div></th>
							<th><div colTag="input" colType="text" colName="shoesName"
									otherAttribute="required">ShoesName</div></th>
							<th><div colTag="input" colType="text" colName="series">Series</div></th>
							<th><div colTag="input" colType="text" colName="category">Category</div></th>
							<th><div colTag="input" colType="number" colName="price">Price</div></th>
							<th colspan="2">Action</th>
						</tr>-->
					</thead>
					<tbody>
						<!-- -->
					</tbody>
				</table>
			</div>
		</div>
		<div class="row">
			<p class="col-md-offset-2 col-md-2">
				<button type="button" class="btn btn-success" name="create">Add
					Shoes to Brand</button>
				<!-- <a
					href="ShoesTableController.do?action=insert&brandId=<c:out value="${brand.getBrandId() }"/>"><button
						type="button" class="btn btn-success">Add Shoes to Brand</button></a> -->
			</p>
			<p class="col-md-2">
				<a href="BrandTableController.do?action=list"><button
						type="button" class="btn btn-primary">Back to Brands List</button></a>
			</p>
		</div>
	</div>


	<script type="text/javascript" src="js/ShoesCrudController.js"></script>
	<script type="text/javascript" src="js/jsModel/Shoes.js"></script>
	<script type="text/javascript" src="js/AjaxUtil.js"></script>
	<script type="text/javascript" src="js/DomBuilder.js"></script>
	<script type="text/javascript" src="js/EntityModelBuilder.js"></script>
	<script type="text/javascript" src="js/jsModel/Brand.js"></script>
</body>
</html>