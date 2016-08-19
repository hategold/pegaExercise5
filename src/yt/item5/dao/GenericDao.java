package yt.item5.dao;

import java.io.Serializable;
import java.util.List;

import yt.item5.bean.EntityInterface;

public interface GenericDao<T extends EntityInterface, PK extends Serializable> {

	public T getById(PK Id);

	public boolean deleteById(PK Id);

	public boolean delete(T t);

	public boolean update(T t);

	public boolean insert(T t);

	public List<T> findAll();

	public List<T> findByCondition(String s);

}
