export default function CityButtons({cityName, setCity}) {
    return (
        <button
            className="city-buttons" 
            onClick={() => setCity(cityName)}>
            {cityName}
        </button>
    )
}