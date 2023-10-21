import './Cards.css'

function Cards() {
    return (
        <div className="Cards">
            <div className="Card">
                <h2 className="stat">New York</h2>
                <h3>New York, USA</h3>
            </div>
            <div className="Card">
                <h2 className="stat">some stat</h2>
                <h3>second summary stat</h3>
            </div>
            <div className="Card">
                <h2 className="stat">some stat</h2>
                <h3>third summary stat</h3>
            </div>
            <div className="Card">
                <h2 className="stat">some stat</h2>
                <h3>fourth summary stat</h3>
            </div>
        </div>
    )
}

export default Cards