import UnsplashAttribution from "./UnsplashAttribution";
import Quote from "./Quote";
import ToDo from "./Todo/ToDoApp";

export default function MainAppBottomSection({ fetchImage, currentImageData }) {
    return (
        <section className="app-bottom">
            <div className="container">
                <div className="grid">
                    <UnsplashAttribution
                        fetchImage={fetchImage}
                        currentImageData={currentImageData}
                    />
                    <Quote />
                    <ToDo />
                </div>
            </div>
        </section>
    );
}
