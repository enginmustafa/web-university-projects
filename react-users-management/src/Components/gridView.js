
import {dateFormatter, locationFormatter} from '../Utils/formatters'

function GridView({ user }) {
    return (
            <div className="col-md-4">
                <div className="grid-user-container img-thumbnail mb-3">
                    <div className="d-flex">
                        <img className="user-image w-50" src={user.picture} alt=""/>
                        <div className="px-2 w">
                            <div className="fw-bold user-title">
                                {user.title}
                            </div>
                            <div>
                                {user.firstName}
                            </div>
                            <div>
                                {user.lastName}
                            </div>
                        </div>
                    </div>
                    <div className="user-overview pt-3">
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
            </div>
    );
}

export default GridView;