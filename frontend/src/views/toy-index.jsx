import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { ToyFilter } from "../cmps/toy-filter";
import { ToyList } from "../cmps/toy-list";
import { loadToys } from "../store/actions/toy.action";

export function ToyIndex() {

    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)

    useEffect(() => {
        loadToys(filterBy)
    }, [filterBy])

    return (
        <section className="toy-index">
            <Link className="btn add-toy-btn" to='/toy/edit'>Add toy</Link>
            <ToyFilter />
            <ToyList />
        </section>
    )
}