import { dateFormatter, locationFormatter } from "../Utils/formatters";

function ListView({ user }) {
    return (
        <div id="user-list-template" >
            <div className="d-flex py-1">
                <img className="user-pic" src={user.picture} alt=""/>
                <div className="px-3 flex-grow-1">
                    <div className="d-flex align-items-start justify-content-between">
                        <div>
                            <div className="fw-bold user-title">
                                {user.title + ' ' + user.firstName + ' ' +  user.lastName}
                            </div>
                            <div className="user-email">
                                {user.email}
                            </div>
                            <div className="user-dateOfBirth">
                                {dateFormatter(user.dateOfBirth)}
                            </div>
                            <div className="user-location">
                                {locationFormatter(user.location)}
                            </div>
                        </div>
                    </div>
                    <div className="user-overview pt-3"></div>
                </div>
            </div>
            <hr className="my-1" />
        </div>
    );
}

export default ListView;
