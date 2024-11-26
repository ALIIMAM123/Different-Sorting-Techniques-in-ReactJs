

import React, { useState, useEffect ,CSSProperties } from 'react';
import './style.css';
import DummyData from './dummyData.js';
import HashLoader from "react-spinners/ClipLoader";

export default function App() {
  const [products, setProducts] = useState([]);
  const [filteredProduct ,setFilteredProduct] = useState([])
  const [search, setSearch] = useState('');
  const [rating, setRating] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const  [loading, setLoading] = useState(true);
  const  [color, setColor] = useState("#ffffff");
  const [debouncedSearch,setDebouncedSearch] = useState('')
  const [timerID,setTimerID] = useState(null)
  

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "grey",
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    height:'50px',
    width:'70px'

  };

  

// Function to simulate an API call
const fetchProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(DummyData); 
    }, 2000);
  });
};

// Fetch products and set state in useEffect
useEffect(() => {
  const loadData = async () => {
    const data = await fetchProducts(); 
    setProducts(data); 
    setLoading(false)
  };

  loadData();
}, []); 


// debounce search

useEffect(() => {
  // Clear the previous timer (if any) before setting a new one
  if (timerID) {
    clearTimeout(timerID);
  }

  // Set a new timer
  const newTimerId = setTimeout(() => {
    setDebouncedSearch(search);
  }, 1500);

  // Save the new timer ID to be able to clear it next time
  setTimerID(newTimerId);

  // Cleanup the timeout when the effect is run again or when the component unmounts
  return () => {
    clearTimeout(newTimerId);
  };
}, [search]); 


console.log(timerID,'timerIdtimerId')



  const filterProducts = (productList) => {
    // let filteredList = [...productList];    // important - dont mutate state directly give reference ans set in new state filterd state and ten show filtered state in list
    let filteredList = JSON.parse(JSON.stringify(productList))

    if (rating) {
      filteredList = filteredList.filter((item) => {
        if (rating == '3') return item.rating < 3.5;
        if (rating == '3.5') return item.rating >= 3.5 && item.rating < 4;
        if (rating == '4') return item.rating >= 4 && item.rating < 4.2;
        if (rating == '4.2') return item.rating >= 4.2;
        // return true;
        return item.rating
      });
    }

    if (price) {
      filteredList = filteredList.filter((item) => {
        if (price == '20') return item.price >= 20 && item.price <= 100;
        if (price == '150') return item.price > 100 && item.price <= 150;
        if (price == '200') return item.price > 150 && item.price <= 200;
        if (price == '300') return item.price > 300;
        return true;
       
      });
    }

    if (category) {
      filteredList = filteredList.filter((item) =>
        item.category.toLowerCase().replace(/\s/g, '') === category
      );
    }

    // if (search) {
    //   filteredList = filteredList.filter((item) =>
    //     item.name
    //       .toLowerCase()
    //       .replace(/\s/g, '')
    //       .includes(search.toLowerCase().replace(/\s/g, ''))
    //   );
    // }

    if (debouncedSearch) {
      filteredList = filteredList.filter((item) =>
        item.name
          .toLowerCase()
          .replace(/\s/g, '')
          .includes(debouncedSearch.toLowerCase().replace(/\s/g, ''))
      );
    }

    setFilteredProduct(filteredList);
  };

  useEffect(() => {
    if(products && products.length > 0){
      filterProducts(products);
    }
   
  }, [rating, price, category, search,products,debouncedSearch]);


  const handleChangeCategory = (e) => setCategory(e.target.value.toLowerCase().replace(/\s/g, ''));
  const handleChangeRating = (e) => setRating(e.target.value);
  const handleChangePrice = (e) => setPrice(e.target.value);
  const handleSearchInput = (e) => setSearch(e.target.value);


  console.log(rating, price, category, search ,'testtttt')
  return (
    <div className="product-container">
      <div className="sorting-wrapper-container">
        <div className="sorting-container">
          <p>Sort By Category</p>
          <select onChange={handleChangeCategory}>
            <option value="">All</option>
            <option value="electronics">Electronics</option>
            <option value="accessories">Accessories</option>
            <option value="wearables">Wearables</option>
            <option value="home appliances">Home Appliances</option>
            <option value="kitchen">Kitchen</option>
            <option value="furniture">Furniture</option>
            <option value="home decor">Home Decor</option>
          </select>
        </div>
        <div className="sorting-container">
          <p>Sort By Rating</p>
          <select onChange={handleChangeRating}>
            <option value="">All</option>
            <option value="3">Below 3.5</option>
            <option value="3.5">3.5 to 4</option>
            <option value="4">4 to 4.2</option>
            <option value="4.2">4.2 and above</option>
          </select>
        </div>
        <div className="sorting-container">
          <p>Sort By Price</p>
          <select onChange={handleChangePrice}>
            <option value="">All</option>
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
              <th>Id</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
           
          {filteredProduct.length==0  && loading
            
          ? 
          <tr>
            <td colSpan="5" style={{ textAlign: 'center', verticalAlign: 'middle' }}>
          <HashLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={25}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        </td>
        </tr>
        :filteredProduct.length>0 ? 
          filteredProduct.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.price}</td>
              <td>{item.rating}</td>
            </tr>
          ))
          
          : 
          <tr>
            <td colSpan="5" style={{ textAlign: 'center' }}>No Result Found</td>
          </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
