package yt.item5;

//import java.io.IOException;
import java.util.List;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import yt.item5.bean.Brand;
import yt.item5.bean.Shoes;

/**
 * Servlet implementation class ShoesTableController
 */
@WebServlet("/ShoesTableController")
public class ShoesTableController extends AbstractTableController<Shoes, Integer> {

	private static final long serialVersionUID = 1L;

	@Override
	public Integer parsePkFromReq(HttpServletRequest request) {
		return checkString2Int(request.getParameter("shoesId"));
	}

//	@Override
//	public Shoes buildEntityByReq(HttpServletRequest request) {
//		return super.buildEntityByReq(request).setBrand(generalService.buildFkEntity(Integer.valueOf(request.getParameter("brandId"))));
//
//	}

	@Override
	public Shoes buildEntityByJson(JsonObject jsonData) {
		Shoes entity = super.buildEntityByJson(jsonData).setBrand(generalService.buildFkEntity(Integer.valueOf(jsonData.get("brandId").getAsString())));
		if (entity.getBrand() == null) {
			return null;
		}
		return entity;
	}

//	@Override
//	public String dispatchToUpdate(HttpServletRequest request, Shoes shoes) {
//		shoes = generalService.processUpdate(shoes, Integer.valueOf(request.getParameter("brandId")));
//		if (shoes == null)
//			return buildJsonDataList(request);
//
//		request.setAttribute("brand", shoes.getBrand());
//		return super.dispatchToUpdate(request, shoes);
//	}

	@Override
	public String buildJsonDataList(HttpServletRequest request) {
		Brand brand = generalService.buildFkEntity(Integer.valueOf(request.getParameter("brandId")));
		if (brand == null)
			return null;
		List<Shoes> ShoesList = generalService.findByCondition("brandId =" + String.valueOf(brand.getBrandId()));
		for (Shoes obj : ShoesList) {
			obj.setForeignClassNull();
		}
		return new Gson().toJson(ShoesList);
	}

//	@Override
//	public String buildListUrl(HttpServletRequest request) throws IOException {
//		return super.buildListUrl(request) + "&brandId=" + request.getParameter("brandId");
//	}

}
