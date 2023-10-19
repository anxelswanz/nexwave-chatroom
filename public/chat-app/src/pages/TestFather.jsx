import React, { useEffect, useState } from 'react'
import TestSon from './TestSon'

export default function TestFather() {
    const [items, setItems] = useState('');


    function changeItems() {
        setItems('car' + Math.round(Math.random() * 1000));
        setItems(pre => {
            console.log('father ', pre);
            return pre;
        })
        // console.log(items);
    }


    return (

        <div>
            <button onClick={changeItems}>click</button>
            <TestSon items={items} />
        </div>
    )
}
