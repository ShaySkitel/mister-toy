import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"

export function ToyEdit() {

    const { toyId } = useParams()
    const navigate = useNavigate()
    const [toy, setToy] = useState(toyService.getEmptyToy())

    useEffect(() => {
        if (!toyId) return
        toyService.getById(toyId).then(setToy)
    }, [])

    function onSaveToy(ev) {
        ev.preventDefault()
        toyService.save(toy)
            .then(() => {
                navigate('/toy')
            })
            .catch(err => {
                console.log('FAILED TO SAVE TOY: ', err)
            })
    }

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        setToy(prevToy => ({ ...prevToy, [field]: value }))
    }

    return (
        <section className="toy-edit">
            <form onSubmit={onSaveToy}>
                <input onChange={handleChange} name="name" value={toy.name} type="text" placeholder="Toy name" />
                <input onChange={handleChange} name="price" value={toy.price} type="number" placeholder="Toy price" />
                <button>{toyId ? 'Save' : 'Create toy'}</button>
            </form>
        </section>
    )
}