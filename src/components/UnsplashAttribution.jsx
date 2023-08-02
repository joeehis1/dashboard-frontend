import ControlButton from "./focus_timer_clock/ControlButton";

export default function UnsplashAttribution({ fetchImage, currentImageData }) {
    const { user } = currentImageData;

    return (
        <div className="unsplash-image-attribution text-unsplash hovered-element">
            <p className="image-location child-top">
                {user.location ? user.location : "Unknown"}
            </p>
            <p className="image-author child-bottom">
                {user.first_name} {user.last_name} / Unsplash
                <ControlButton
                    title="Next Image"
                    className={"btn-next-control btn-control"}
                    handleClick={fetchImage}
                >
                    <i className="ri-skip-right-fill"></i>
                </ControlButton>
            </p>
        </div>
    );
}
