import React, { useEffect, useState } from 'react'

export default function TestSon(props) {

    const [items, setItems] = useState();
    console.log('子组件被调用');

    useEffect(() => {
        console.log('items=>', props.items);
        setItems(props.items)
    })
    useEffect(() => {
        //setItems(props.items);
        console.log('use Effect 被调用');
        console.log('effect item', items);
    }, [items])
    return (
        <div>

        </div>
    )
}
