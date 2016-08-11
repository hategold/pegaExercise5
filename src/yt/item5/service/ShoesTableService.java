package yt.item5.service;

import javax.inject.Inject;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

import yt.item5.bean.Brand;
import yt.item5.bean.Shoes;
import yt.item5.dao.GenericDao;

public class ShoesTableService extends GeneralService<Shoes, Integer> implements ApplicationContextAware {

	@SuppressWarnings("rawtypes")
	GenericDao brandDao;

	@Inject // or @Autowired
	private ApplicationContext ctx;

	private boolean isShoesMapToBrand(Shoes shoes, Brand brand) {
		return shoes.getBrand().getBrandId() == brand.getBrandId();
	}

	@SuppressWarnings("unchecked")
	@Override
	public Brand buildFkEntity(Integer fkId) {
		System.out.println(ctx.containsBean("brandDao"));
		Brand brand = null;
		try {
			brand = (Brand) brandDao.getById(fkId);
			if (null == brand)
				return null;

		} catch (NumberFormatException e) {
			e.printStackTrace();
			return null;
		}
		return brand;
	}

	@Override
	public Shoes processUpdate(Shoes shoes, Integer fkId) {
		Brand brand = buildFkEntity(fkId);

		System.out.println(brand);

		if (brand == null)
			return null;
		if (shoes == null)
			return shoes = new Shoes().setBrand(brand);
		if (shoes != null && !isShoesMapToBrand(shoes, brand))
			return null;
		return shoes;
	}

	public GenericDao getBrandDao() {
		return brandDao;
	}

	public void setBrandDao(GenericDao brandDao) {
		this.brandDao = brandDao;
	}

	@Override
	public void setApplicationContext(ApplicationContext paramApplicationContext) throws BeansException {
		this.ctx = paramApplicationContext;

	}

}
