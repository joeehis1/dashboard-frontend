export default function ControlButton({
    handleClick,
    disabled = false,
    className,
    title = "",
    children,
    type,
}) {
    return (
        <button
            disabled={disabled}
            className={className}
            type={type}
            title={title}
            onClick={(e) => {
                e.stopPropagation();
                handleClick();
            }}
        >
            {children}
        </button>
    );
}
