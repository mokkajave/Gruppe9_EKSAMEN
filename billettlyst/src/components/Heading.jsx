import "../styles/heading.scss";

export default function Heading({variant, children}) {
    const Tag = variant;
    
    return ( 
        <div className="content-container">
            <Tag>{children}</Tag> 
        </div>
    )
}