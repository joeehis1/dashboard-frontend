import { useEffect, useState } from "react";

import MainAppTopSection from "./components/MainAppTopSection";
import MainAppMiddleSection from "./components/MainAppMiddleSection";
import MainAppBottomSection from "./components/MainAppBottomSection";

function App() {
    const [currentImageData, setCurrentImageData] = useState(null);

    async function fetchImage() {
        const response = await fetch(
            "https://dashboard-backend-k56x.onrender.com/random-image"
        );
        const data = await response.json();
        const url = data.urls.full;
        setCurrentImageData(data);
        document.body.style.backgroundImage = `url(${url})`;
    }

    useEffect(() => {
        async function getRandomImage() {
            fetchImage();
        }
        getRandomImage();
    }, []);
    return (
        <>
            <main>
                <MainAppTopSection />
                <MainAppMiddleSection />
                {currentImageData && (
                    <MainAppBottomSection
                        fetchImage={fetchImage}
                        currentImageData={currentImageData}
                    />
                )}
            </main>
        </>
    );
}

export default App;
