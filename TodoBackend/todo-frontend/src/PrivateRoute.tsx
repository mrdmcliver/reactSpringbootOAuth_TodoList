import { useSelector } from "react-redux";
import { Route, Navigate} from "react-router-dom";

const PrivateRoute = ({children}: any) => {

    const userDetails = useSelector((state:any) => state.loggedInUser.userDetails);
    if(userDetails.name)
        return children;

    return (<Navigate to="/login" />);                    
};

export default PrivateRoute;
