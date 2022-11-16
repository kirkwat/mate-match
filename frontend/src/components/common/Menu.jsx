import { Link } from "react-router-dom"

export const Menu = ({text, options, optionsSrcList}) => <>
    <button className="btn btn-primary dropdown-toggle" style={{marginLeft: "95%"}} type="button" data-bs-toggle="dropdown">{text}</button>
        <ul className="dropdown-menu">
        {
            options.map((option, index) =>
                <Link to={ optionsSrcList[index] }>
                    <li className="dropdown-item">{option}</li>
                </Link>
            )
        }
        </ul>
</>;