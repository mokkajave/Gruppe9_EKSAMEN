import "../styles/heading.scss";

/*
    - Gjenbrukbar heading (h1, h2 og h3)
    - Gjør det lettere med felles utforming på tvers av komponenter
*/
export default function Heading({variant, children}) {
    /*
        I tilfeller som dette, klarer ikke React å skille mellom variabler
        og innebygde HTML-tagger. Derfor er variabelen nødt til å ha stor forbokstav.

        Alternativt kunne vi benyttet switch/case for å endre utskrift basert på samme input,
        men gruppen foretrekker det ryddig og presis.
    */
    const Tag = variant;
    
    return (
        <div className="section-heading content-container">
            <Tag>{children}</Tag> 
        </div>
    )
}