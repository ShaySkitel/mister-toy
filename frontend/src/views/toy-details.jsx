import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"
import { removeToy } from "../store/actions/toy.action.js"

export function ToyDetails() {

    const params = useParams()
    const navigate = useNavigate()
    const [toy, setToy] = useState(null)

    useEffect(() => {
        toyService.getById(params.toyId).then(setToy)
    }, [])

    function onRemoveToy() {
        removeToy(toy._id).then(() => navigate('/toy'))
    }

    return (
        toy && (
            <section className="toy-details">
                <h2>{toy.name}</h2>
                <p>{toy.labels.join(', ')}</p>
                <h3>Price {toy.price}</h3>
                <section className="toy-buttons">
                    <button onClick={() => navigate(`/toy/edit/${toy._id}`)}>Edit</button>
                    <button onClick={onRemoveToy}>Remove</button>
                </section>
            </section>
        )
    )
}