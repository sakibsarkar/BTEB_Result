import "./Nav.css";
import { NavLink } from "react-router-dom";

const Nav = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li><NavLink className={"navLinks"} to={"/"}>Home</NavLink></li>
                    <li><NavLink className={"navLinks"} to={"/groupResult"}>GroupResult</NavLink></li>
                    <li><NavLink className={"navLinks"} to={"/induvitualResult"}>Induvitual Result</NavLink></li>
                    <li><NavLink className={"navLinks"} to={"/"}>Credits</NavLink></li>
                </ul>
            </nav>
        </div>
    );
};

export default Nav;