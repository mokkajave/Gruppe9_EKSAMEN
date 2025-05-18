import "../styles/heading.scss";

/*
    - Gjenbrukbar heading (h1, h2 og h3)
    - Gjør det lettere med felles utforming på tvers av komponenter
*/
export default function Heading({variant, children}) {
    /*
        Alternativt kunne vi benyttet switch/case for å endre utskrift basert på samme input.
    */
    
    return (
        <div className="section-heading content-container">
            {variant === "h1" && (
                <h1>{children}</h1>
            )}
            
            {variant === "h2" && (
                <h2>{children}</h2>
            )}

            {variant === "h3" && (
                <h3>{children}</h3>
            )}
        </div>
    )
}