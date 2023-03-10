import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { removeToy } from "../store/actions/toy.action.js"


export function ToyPreview({ toy }) {

    const navigate = useNavigate()
    const user = useSelector(storeState => storeState.userModule.user)

    return (
        <li>
            <article className="toy-preview">
                <h2>{toy.name}</h2>
                <img src={`https://robohash.org/${toy.name}?set=set3`} alt={toy.name} />
                <h3>Price ${toy.price}</h3>
                <p>{toy.labels.join(', ')}</p>
                <p>{toy.inStock ? 'In stock' : 'Out of stock'}</p>
                <section className="toy-buttons">
                    <button className="btn" onClick={() => navigate(`/toy/${toy._id}`)}>Details</button>
                    {user.isAdmin && <button className="btn" onClick={() => navigate(`/toy/edit/${toy._id}`)}>Edit</button>}
                    {user.isAdmin && <button className="btn" onClick={() => removeToy(toy._id)}>Remove</button>}
                </section>
            </article>
        </li>
    )
}