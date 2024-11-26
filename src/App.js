import React, { useState, useEffect } from 'react';
import './style.css';
import DummyData from './dummyData.js';

export default function App() {
  const [product, setProducts] = useState(DummyData);
  const [search, setSearch] = useState('');

  const handleChangePrice = (e) => {
    const value = e.target.value;
    const filteredProduct = DummyData.filter((eachProduct) => {
      if (value == '20') {
        return eachProduct.price >= 20 && eachProduct.price <= 100;
      } else if (value == '150') {
        return eachProduct.price >= 101 && eachProduct.price <= 150;
      } else if (value == '200') {
        return eachProduct.price > 150 && eachProduct.price <= 200;
      } else if (value == '300') {
        return eachProduct.price >= 300;
      }
      return eachProduct;
    });
    setProducts(filteredProduct);
  };

  const handleChangeRating = (e) => {
    const value = e.target.value;
    const filterListByRating = DummyData.filter((eachItem) => {
      if (value == '3') {
        return eachItem.rating < 3 && eachItem.rating > 3.5;
      } else if (value == '3.5') {
        return eachItem.rating >= 3.5 && eachItem.rating < 4;
      } else if (value == '4') {
        return eachItem.rating >= 4 && eachItem.rating < 4.2;
      } else if (value == '4.2') {
        return eachItem.rating >= 4.2;
      }
      return eachProduct;
    });
    setProducts(filterListByRating);
  };

  const handleChangeCategory = (e) => {
    const value = e.target.value.toLowerCase().replace(/\s/g, '');
    console.log(value);
    const filterByCategory = DummyData.filter((eachItem) => {
      if (value == 'electronics') {
        return eachItem.category.toLowerCase() == 'electronics';
      } else if (value == 'accessories') {
        return eachItem.category.toLowerCase() == 'accessories';
      } else if (value == 'wearables') {
        return eachItem.category.toLowerCase() == 'wearables';
      } else if (value === 'homeappliances') {
        return (
          eachItem.category.toLowerCase().replace(/\s/g, '') == 'homeappliances'
        );
      } else if (value === 'kitchen') {
        return eachItem.category.toLowerCase().replace(/\s/g, '') == 'Kitchen';
      } else if (value === 'furniture') {
        return (
          eachItem.category.toLowerCase().replace(/\s/g, '') == 'furniture'
        );
      } else if (value === 'homedecor') {
        return (
          eachItem.category.toLowerCase().replace(/\s/g, '') == 'homedecor'
        );
      } else eachItem;
    });
    setProducts(filterByCategory);
  };

  const handleSearchInput = (e) => {
    let value = e.target.value;
    setSearch(value);
    let filteredSearchResult = DummyData.filter((eachItem) =>
      eachItem.name
        .toLowerCase()
        .replace(/\s/g, '')
        .includes(value.toLowerCase().replace(/\s/g, ''))
    );
    setProducts(filteredSearchResult);
  };

  return (
    <div className="product-container">
      <div className="sorting-wrapper-container">
        <div className="sorting-container">
          <p1>Sort By Category</p1>
          <select onChange={handleChangeCategory}>
            <option value="Electronics">Electronics</option>
            <option value="Accessories">Accessories</option>
            <option value="Wearables">Wearables</option>
            <option value="Home Appliances">Home Appliances</option>
            <option value="Kitchen">Kitchen</option>
            <option value="Furniture">Furniture</option>
            <option value="Home Decor">Home Decor</option>
          </select>
        </div>
        <div className="sorting-container">
          <p1>Sort By Rating</p1>
          <select onChange={handleChangeRating}>
            <option value="3">3</option>
            <option value="3.5">3.5</option>
            <option value="4">4</option>
            <option value="4.2">4.2</option>
          </select>
        </div>
        <div className="sorting-container">
          <p1>Sort By Price</p1>
          <select onChange={handleChangePrice}>
            <option value="20">20 to 100</option>
            <option value="150">101 to 150</option>
            <option value="200">151 to 200</option>
            <option value="300">More than 200</option>
          </select>
        </div>
      </div>
      <div>
        <input
          type="text"
          className="search-input"
          placeholder="Search Product Here"
          value={search}
          onChange={handleSearchInput}
        />
      </div>
      <div className="product-listing">
        <h1>Product Container</h1>
        <table className="b">
          <thead>
            <tr>
              <td>Id</td>
              <td>Name</td>
              <td>Category</td>
              <td>Price</td>
              <td>Rating</td>
            </tr>
          </thead>
          <tbody>
            {product.map((eachItem) => (
              <tr>
                <td>{eachItem.id}</td>
                <td>{eachItem.name}</td>
                <td>{eachItem.category}</td>
                <td>{eachItem.price}</td>
                <td>{eachItem.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
