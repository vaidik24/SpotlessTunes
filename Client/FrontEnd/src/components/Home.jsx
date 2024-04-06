import RemoveDuplicates from "./RemoveDuplicates.jsx";
import {Link, useLocation} from "react-router-dom";
import {useAccessToken} from "./AccessTokenContext.jsx";


const Home = () => {

    const accessToken =  localStorage.getItem("accessToken");

    if (!accessToken) {
        return null; // or handle unauthorized access
    }

    return (
        <>
            <Link to="/remove-duplicates">
                <button>Remove duplicates</button>
            </Link>
            <Link to="/stats">
                <button>View Statistics</button>
            </Link>
        </>
    )
}

export default Home;
