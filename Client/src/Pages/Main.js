import React, { useEffect } from 'react'
import Header from '../components/Header/Header';
import Home from '../components/Home/Home';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Register from './Register/Register';
import Dashboard from './Dashboard/Dashboard';
import Auth from '../auth';
import Donate from './Donate/Donate';
import { LoadUser } from '../redux/actions/userAction';
import { CreatePosts, LoadPosts } from '../redux/actions/postsAction';
import { connect } from 'react-redux';


function Main(props) {
    useEffect(() => {
        props.LoadUser();
        props.LoadPosts();
    }, [])
    return (

        <div>
            <BrowserRouter>

                <Switch>

                    <Route path="/" exact>
                        <Header />
                        <Home />
                    </Route>

                    <Route path="/login" exact>
                        <Auth login={true}>
                            <Register />
                        </Auth>
                    </Route>

                    <Route path="/dashboard" exact>
                        <Header />
                        <Dashboard posts={props.posts} user={props.user} />
                    </Route>

                    <Route path="/donate" exact>
                        <Auth>
                            <Header />
                            <Donate posts={props.posts} CreatePosts={CreatePosts} />
                        </Auth>
                    </Route>

                </Switch>

            </BrowserRouter>

        </div>

    )
}

const mapStateToProps = (state) => {

    return {
        user: state.user,
        posts: state.posts,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        LoadUser: () => dispatch(LoadUser()),
        LoadPosts: () => dispatch(LoadPosts()),
        CreatePosts: () => dispatch(CreatePosts()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)