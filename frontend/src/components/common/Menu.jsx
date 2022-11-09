export const Menu = ({text, options, optionsSrcList}) => <>
    <div className="dropdown">
        <button className="btn btn-primary dropdown-toggle" id="menuButton" type="button" data-bs-toggle="dropdown">{text}</button>
        <ul className="dropdown-menu">
        {
            options.map((option, index) =>
                <li key={index}><a className="dropdown-item" href={optionsSrcList[index]}>{option}</a></li>
            )
        }


            
        </ul>
    </div>


</>