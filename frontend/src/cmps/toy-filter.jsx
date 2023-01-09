import { useState, useRef } from "react"
import { useDispatch } from "react-redux"
import { toyService } from "../services/toy.service.js"
import { utilService } from "../services/util.service.js"
import { SET_FILTER } from "../store/reducers/toy.reducer.js"

export function ToyFilter() {

    const [filterBy, setFilterBy] = useState(toyService.getDefaultFilter())
    const dispatch = useDispatch()
    const setFilter = utilService.debounce(dispatchFilter, 500)
    const dispatchRef = useRef(utilService.debounce(dispatchFilter, 500))

    function handleChange({ target }) {
        const { value, name: field, checked, type } = target
        if (type === 'checkbox') {
            setFilterBy(prevFilterBy => {
                dispatch({ type: SET_FILTER, filterBy: { ...prevFilterBy, [field]: checked } })
                return { ...prevFilterBy, [field]: checked }
            })
        } else if (field === 'labels') {
            setFilterBy(prevFilterBy => {
                dispatch({ type: SET_FILTER, filterBy: { ...prevFilterBy, [field]: [value] } })
                return { ...prevFilterBy, [field]: [value] }
            })
        } else {
            setFilterBy(prevFilterBy => {
                dispatchRef.current({ ...prevFilterBy, [field]: value })
                return { ...prevFilterBy, [field]: value }
            })
        }
    }

    function dispatchFilter(filterBy) {
        dispatch({ type: SET_FILTER, filterBy })
    }

    return (
        <section className="toy-filter">
            <input value={filterBy.searchStr} name="searchStr" onChange={handleChange} type="text" placeholder="Search" aria-label="Search toy" />

            <label htmlFor="in-stock">Only in stock </label>
            <input checked={filterBy.onlyInStock} onChange={handleChange} id="in-stock" type="checkbox" name="onlyInStock" />

            <label htmlFor="label-filter">By label </label>
            <select onChange={handleChange} name="labels" id="label-filter">
                <option value="">All</option>
                {toyService.getLabels().map((label, idx) => (
                    <option key={label + idx} value={label}>{label}</option>
                ))}
            </select>
        </section>
    )
}