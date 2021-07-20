import React, { useEffect } from 'react';
import './Dashboard.css';
import SearchIcon from '@material-ui/icons/Search';
import Post from '../../components/Post/Post';

function Dashboard(props) {



    return (
        <div>

            {
                props.posts?.posts?.length === 0 ? <div style={{ marginTop: "20px", textAlign: "center" }}>No Posts found</div> :
                    <div className="dashboard">


                        <div className="dashboard_search_location">
                            <div className="dashboard_search">
                                <input type="search" required />
                                <SearchIcon />
                            </div>

                            <div className="dashboard_location">
                                <button>location<i className="fa fa-map-marker"></i></button>
                            </div>

                        </div>

                        <div className="dashboard_posts">

                            {
                                props.posts?.posts?.map((post, index) => (
                                    //    { console.log(post)&& 2}

                                    <Post key={index} post={post} />
                                ))
                            }
                        </div>
                    </div>
            }
        </div>

    )
}

export default Dashboard
