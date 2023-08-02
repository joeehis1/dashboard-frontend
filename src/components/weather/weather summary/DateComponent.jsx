export default function DateComponent({ timeStamp }) {
    if (!timeStamp) {
        return <span>{new Date().toLocaleString()}</span>;
    }
    return <span>{new Date(timeStamp * 1000).toLocaleString()}</span>;
}

//This is responsible for converting the timestamp to a displayed date
