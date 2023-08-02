import { useState, useEffect } from "react";

import ControlButton from "./focus_timer_clock/ControlButton";

export default function Quote() {
    const [quoteObject, setQuoteObject] = useState(null);

    async function getRandomQuote() {
        const response = await fetch(
            `https://dashboard-backend-k56x.onrender.com/random-quote`
        );
        const data = await response.json();
        setQuoteObject(data);
    }

    useEffect(() => {
        getRandomQuote();
    }, []);

    return (
        <figure className="random-quote-display text-quote hovered-element">
            {quoteObject && (
                <>
                    <blockquote className="quote child-top">
                        <p>{quoteObject.q}</p>
                    </blockquote>
                    <figcaption className="author child-bottom">
                        <span>{quoteObject.a}</span>
                        <ControlButton
                            title="View Next Quote"
                            className={"btn-next-control btn-control"}
                            handleClick={getRandomQuote}
                        >
                            <i className="ri-skip-right-fill"></i>
                        </ControlButton>{" "}
                    </figcaption>
                </>
            )}
        </figure>
    );
}
