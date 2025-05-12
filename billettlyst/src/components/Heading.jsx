import "../styles/heading.scss";

export default function Heading({variant, children}) {
    const Tag = variant;
    
    return ( 
        <div className="section-heading content-container">
            <Tag>{children}</Tag> 
        </div>
    )
}