import { useEffect, useState } from "react"
import Select from 'react-select'
import { useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"
import { saveToy } from "../store/actions/toy.action.js"

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
        if (!toy.name || !toy.price || !toy.labels.length) return
        saveToy(toy)
            .then(() => {
                navigate('/toy')
            })
            .catch(err => {
                console.log('FAILED TO SAVE TOY: ', err)
            })
    }

    function handleChange({ target, choices }) {
        if (choices) {
            const labels = choices.map(choice => choice.label)
            setToy(prevToy => ({ ...prevToy, labels }))
        } else {
            let { value, name: field, type } = target
            value = type === 'number' ? +value : value
            setToy(prevToy => ({ ...prevToy, [field]: value }))
        }

    }

    // TEMPORARY MANUAL VALIDATION DONT KILL ME FOR NOW IMMA DO IT TOMORROW

    return (
        <section className="toy-edit">
            <form onSubmit={onSaveToy}>
                <label htmlFor="toy-name">Toy name</label>
                <input id="toy-name" required onChange={handleChange} name="name" value={toy.name} type="text" placeholder="Toy name" />
                {!toy.name && <div className="required">Required</div>}

                <label htmlFor="toy-price">Toy price</label>
                <input id="toy-price" required onChange={handleChange} name="price" value={toy.price} type="number" placeholder="Toy price" />
                {!toy.price && <div className="required">Required</div>}

                <label htmlFor="toy-labels">Toy labels</label>
                <Select id="toy-labels" value={toy.labels.map(label => ({ value: label.toLowerCase(), label }))} isSearchable={true} onChange={(choices) => handleChange({ choices })} name="labels" isMulti options={toyService.getLabels(true)} />
                {!toy.labels.length && <div className="required">Required</div>}

                <button className="btn">{toyId ? 'Save' : 'Create toy'}</button>
            </form>
        </section>
    )
}