import "../styles/stats.css"

import { typeColors } from "../constants/typeColours.js"
import { typeColorsDark } from "../constants/typeColoursDark.js"

function Stats({ detail, pokemon }) {
    const backgroundColor = typeColors[pokemon.types[0]] || "#F9F9F9"
    const backgroundColorDark = typeColorsDark[pokemon.types[0]] || "#555"
    
    return (
        <section className="stats-section">
            <header className="stats-header">
                <h2>Stats</h2>
            </header>

            <main className="stats-info">
                {Object.entries(detail.stats).map(([key, value]) => (
                    key !== "total" && (
                        <div key={key} className="stat-row">
                            <div className="stat-container">
                                <span className="stat-name">{key.replace("_", " ").toUpperCase()}</span>
                                <span className="stat-value">{value}</span>
                            </div>
                            <div className="stat-bar-background">
                                <div 
                                    className="stat-bar-fill"
                                    style={{ width: `${(value / 255) * 100}%`, backgroundColor: backgroundColorDark }}
                                ></div>
                            </div>
                        </div>
                    )
                ))}
                <div className="stat-row total">
                    <span className="stat-name">TOTAL</span>
                    <span className="stat-value">{detail.stats.total}</span>
                </div>
            </main>

            <footer className="stats-footer">
                <div className="abilities">
                    {detail.abilities.map((ability) => (
                        <span key={ability} className="ability" style={{backgroundColor: backgroundColor}}>{ability}</span>
                    ))}
                </div>
            </footer>
        </section>
    )
}

export default Stats