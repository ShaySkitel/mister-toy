import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"

export function ToyDetails() {

    const params = useParams()
    const [toy, setToy] = useState(null)

    useEffect(() => {
        toyService.getById(params.toyId).then(setToy)
    }, [])

    return (
        toy && (
            <section className="toy-details">
                <h2>{toy.name}</h2>
            </section>
        )
    )
}