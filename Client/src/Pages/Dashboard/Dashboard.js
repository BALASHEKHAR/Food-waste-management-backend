import React, { useEffect } from 'react';
import './Dashboard.css';
import SearchIcon from '@material-ui/icons/Search';
import Post from '../../components/Post/Post';

function Dashboard(props) {
    const data = [
        {
            images: ["", "", ""],
            items: ["tomato", "alu", "potato"],
            person: "bala",
            date: "23/03/2022",
            expiredDate: "34/33/0000",
            city: "hyderabad",
            place: "yadadri",
            spot: "sadhuvelly",
            availability: "10kgs",
            remained: "3kgs",
            rating: "5"
        },
        {
            images: ["", "", ""],
            items: ["tomato", "alu", "potato"],
            person: "bala",
            date: "23/03/2022",
            expiredDate: "34/33/0000",
            city: "hyderabad",
            place: "yadadri",
            spot: "sadhuvelly",
            availability: "10kgs",
            remained: "3kgs"
        }, {
            images: ["", "", ""],
            items: ["tomato", "alu", "potato"],
            person: "bala",
            date: "23/03/2022",
            expiredDate: "34/33/0000",
            city: "hyderabad",
            place: "yadadri",
            spot: "sadhuvelly",
            availability: "10kgs",
            remained: "3kgs",
            rating: "5"
        }, {
            images: ["", "", ""],
            items: ["tomato", "alu", "potato"],
            person: "bala",
            date: "23/03/2022",
            expiredDate: "34/33/0000",
            city: "hyderabad",
            place: "yadadri",
            spot: "sadhuvelly",
            availability: "10kgs",
            remained: "3kgs",
            rating: "5"
        }

    ]
    useEffect(() => {
        console.log(props);
    }, [])
    return (

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
                    props.posts.posts.map((post, index) => (

                        <Post key={index} post={post} username={props.user.user.name} />
                    ))
                }
            </div>
        </div>
    )
}

export default Dashboard
