import { useEffect, useState } from "react"

function Header(){
    const [data, setData] = useState([])

    useEffect(function(){
        const getData = async function(){
            // docker -> host.docker.internal
            // dev -> localhost
            const res = await fetch('http://host.docker.internal:3001')
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