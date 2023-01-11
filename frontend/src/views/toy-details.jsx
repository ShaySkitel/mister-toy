import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
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
                <Link className="btn" to="/toy">Go back</Link>
                <div className="toy-img">
                    <img src={`https://robohash.org/${toy.name}?set=set3`} alt={toy.name} />
                </div>

                <div className="toy-info">
                    <h2>{toy.name}</h2>
                    <p>{toy.labels.join(', ')}</p>
                    <h3>Price ${toy.price}</h3>
                    <section className="toy-buttons">
                        <button className="btn" onClick={() => navigate(`/toy/edit/${toy._id}`)}>Edit</button>
                        <button className="btn" onClick={onRemoveToy}>Remove</button>
                    </section>
                </div>

                <h3>Created at {new Date(toy.createdAt).toDateString()}</h3>

            </section>
        )
    )
}