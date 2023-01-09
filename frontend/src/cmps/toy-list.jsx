import { useSelector } from "react-redux"
import { ToyPreview } from "./toy-preview.jsx"

export function ToyList() {

    const toys = useSelector(storeState => storeState.toyModule.toys)

    return (
        <section className="toy-list">
            <ul>
                {toys.map(toy => (
                    <ToyPreview key={toy._id} toy={toy} />
                ))}
            </ul>
        </section>
    )
}