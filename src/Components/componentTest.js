import React from 'react';
import { useState } from 'react';


const ComponentTest = () => {
    const [arr, setArr] = useState([1,2,3]);
    console.log(arr);

    function updateArray(){
        setArr([4,5,6]);
        console.log(arr);
    }

    updateArray();
  return <div><h2>Component Test</h2></div>;
};

export default ComponentTest;
