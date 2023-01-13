import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"
import { addMsg, removeToy } from "../store/actions/toy.action.js"

export function ToyDetails() {

    const params = useParams()
    const navigate = useNavigate()
    const [toy, setToy] = useState(null)
    const [msg, setMsg] = useState({ txt: '' })
    const user = useSelector(storeState => storeState.userModule.user)

    useEffect(() => {
        toyService.getById(params.toyId).then(setToy)
    }, [toy])

    function onRemoveToy() {
        removeToy(toy._id).then(() => navigate('/toy'))
    }

    function handleChange({ target }) {
        const { value, name: field } = target
        setMsg(prevMsg => ({ ...prevMsg, [field]: value }))
    }

    function onAddMsg(ev) {
        ev.preventDefault()
        addMsg(toy, msg).then(() => {
            setMsg({ txt: '' })
            setToy(prevToy => ({ ...prevToy }))
        })
    }

    return (
        toy && (
            <section className="toy-details">
                <Link className="btn" to="/toy">Go back</Link>
                <div className="toy-img">
                    <img src={`https://robohash.org/${toy.name}?set=set3`} alt={toy.name} />
                </div>

                <div className="toy-info">
                    <h3>Created at {new Date(toy.createdAt).toDateString()}</h3>
                    <h2>{toy.name}</h2>
                    <p>{toy.labels.join(', ')}</p>
                    <h3>Price ${toy.price}</h3>
                    {user.isAdmin && <section className="toy-buttons">
                        <button className="btn" onClick={() => navigate(`/toy/edit/${toy._id}`)}>Edit</button>
                        <button className="btn" onClick={onRemoveToy}>Remove</button>
                    </section>}
                </div>

                {/* Yes, i know im supposed to make seperate components for the whole messages part
            But im kinda exhausted tbh, and i wanna rest for as long as i can :) */}

                {user.id && <section className="add-msg">
                    <h2>Add message</h2>
                    <form onSubmit={onAddMsg}>
                        <input value={msg.txt} name="txt" onChange={handleChange} type="text" placeholder="Message" />
                        <button className="btn">Post</button>
                    </form>
                </section>}

                <section className="toy-msgs">
                    <h2>Messages</h2>
                    {toy.msgs && toy.msgs[0] && toy.msgs.map(msg => (
                        <article key={msg.id}>
                            <p>{msg.txt}</p>
                            <p>By {msg.by.fullname}</p>
                        </article>
                    ))}
                </section>
            </section>
        )
    )
}