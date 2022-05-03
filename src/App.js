import './App.css';
import React, { useState, useEffect } from 'react';

const App = (props) => {
  const [datas, setDatas] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [totalItemsPerPage, setTotalItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPageNum, setShowPageNum] = useState([1, 2, 3, 4, 5]);
  const [showIndex, setShowIndex] = useState([0, 1, 2, 3, 4]);
  // totalItemsPerPage, showIndex 이것만 바꾸어서 변형시켜주면 된다!

  useEffect(() => {
    const getData = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await res.json();
      setDatas(result);
      setTotalPages(Math.ceil(result.length / totalItemsPerPage));
    };

    getData();
  }, []);

  // const pages = [];
  // for (let i = 1; i <= totalPages; i++) {
  //   pages.push(i);
  // }

  const handleClick = (e) => {
    setCurrentPage(e.target.innerText);

    setShowIndex([
      e.target.innerText * totalItemsPerPage - 3,
      e.target.innerText * totalItemsPerPage - 2,
      e.target.innerText * totalItemsPerPage - 1,
      e.target.innerText * totalItemsPerPage,
    ]);
  };

  console.log(currentPage);

  const handlePrev = () => {
    const newArray = showPageNum.map((num) => num - 5);
    if (newArray.includes(0)) {
      setShowPageNum([1, 2, 3, 4, 5]);
    } else {
      setCurrentPage(newArray[0]);
      setShowIndex([
        newArray[0] * totalItemsPerPage - 3,
        newArray[0] * totalItemsPerPage - 2,
        newArray[0] * totalItemsPerPage - 1,
        newArray[0] * totalItemsPerPage,
      ]);
      setShowPageNum(newArray);
    }
  };

  const handleNext = () => {
    const newArray = showPageNum.map((num) => num + 5);
    if (newArray.includes(totalPages + 1)) {
      return;
    } else {
      setCurrentPage(newArray[0]);
      setShowIndex([
        newArray[0] * totalItemsPerPage - 3,
        newArray[0] * totalItemsPerPage - 2,
        newArray[0] * totalItemsPerPage - 1,
        newArray[0] * totalItemsPerPage,
      ]);
      setShowPageNum(newArray);
    }
  };

  return (
    <div className='paginationBox'>
      {showIndex.map((index) => (
        <span>{datas[index]?.title}</span>
      ))}
      <ul>
        <button onClick={handlePrev}>Prev</button>
        {/* {showPageNum.map((num) => (
          <li onClick={handleClick}>{num}</li>
        ))} */}
        {showPageNum.map((num) => {
          if (parseInt(num) === parseInt(currentPage)) {
            return (
              <li className='active' onClick={handleClick}>
                {num}
              </li>
            );
          } else {
            return <li onClick={handleClick}>{num}</li>;
          }
        })}
        <button onClick={handleNext}>Next</button>
      </ul>
    </div>
  );
};

export default App;
