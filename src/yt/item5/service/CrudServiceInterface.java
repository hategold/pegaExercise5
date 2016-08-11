package yt.item5.service;

import java.io.Serializable;
import java.util.List;

import yt.item5.bean.EntityInterface;
import yt.item5.dao.GenericDao;

public interface CrudServiceInterface<T extends EntityInterface, PK extends Serializable> {

	public GenericDao<T, PK> getGenericDao();

	public void setGenericDao(GenericDao<T, PK> genericDao);

	public List<T> findAll();

	public void deleteById(PK Id);

	public T getById(PK Id);

	public void insert(T entity);

	public void update(T entity);

	public List<T> findByCondition(String subHQL);

	public T processUpdate(T entity, PK fkId);

	public <FT extends EntityInterface> FT buildFkEntity(PK fkId);

}