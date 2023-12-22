import FadeLoader from "react-spinners/FadeLoader";

export default function Loading() {
    return (
        <section className="flex justify-center">
            <FadeLoader
                color={"#706f75"}
                size={30}
            />
        </section>
    )
}