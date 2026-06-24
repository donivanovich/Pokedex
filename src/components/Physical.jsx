import "../styles/physical.css";

import { typeColors } from "../constants/typeColours.js"
import { typeColorsDark } from "../constants/typeColoursDark.js"

function Physical({ detail, pokemon }) {
    const backgroundColor = typeColors[pokemon.types[0]] || "#F9F9F9"
    const backgroundColorDark = typeColorsDark[pokemon.types[0]] || "#555"

    return (
        <section className="physical-section">
            <header className="physical-header">
                <h2>Physical</h2>
            </header>

            <main className="physical-info">
                <div className="physical-row" style={{backgroundColor: backgroundColor}}>
                    <span className="physical-name">Height:</span>
                    <span className="physical-value">{detail.physical.height_m} m</span>
                </div>
                <div className="physical-row" style={{backgroundColor: backgroundColor}}>
                    <span className="physical-name">Weight:</span>
                    <span className="physical-value">{detail.physical.weight_kg} kg</span>
                </div>
                <div className="physical-row" style={{backgroundColor: backgroundColor}}>
                    <span className="physical-name">Ratio Male:</span>
                    <span className="physical-value">{detail.gender_ratio.male} %</span>
                </div>
                <div className="physical-row" style={{backgroundColor: backgroundColor}}>
                    <span className="physical-name">Ratio Female:</span>
                    <span className="physical-value">{detail.gender_ratio.female} %</span>
                </div>
                <div className="physical-row" style={{backgroundColor: backgroundColorDark}}>
                    <span className="physical-name">Habitat:</span>
                    <span className="physical-value">{detail.physical.habitat}</span>
                </div>
            </main>
        </section>
    )
}

export default Physical;