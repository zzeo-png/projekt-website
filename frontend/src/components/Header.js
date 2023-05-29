import { useEffect, useState } from "react"

function Header(){
    const [data, setData] = useState([])

    useEffect(function(){
        const getData = async function(){
            const res = await fetch('http://node-streznik:3001')
            const data = await res.json()
            setData(data)
        }

        getData()
    }, [])

    return (
        <div className="header">
            <p>Test: {data}</p>
        </div>
    )
}

export default Header