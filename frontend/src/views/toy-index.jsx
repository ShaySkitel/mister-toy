import { useEffect } from "react";
import { ToyFilter } from "../cmps/toy-filter";
import { ToyList } from "../cmps/toy-list";
import { loadToys } from "../store/actions/toy.action";

export function ToyIndex() {

    useEffect(() => {
        loadToys()
    }, [])

    return (
        <section className="toy-index">
            <ToyFilter />
            <ToyList />
        </section>
    )
}