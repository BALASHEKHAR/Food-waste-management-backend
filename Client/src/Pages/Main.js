import React, { useEffect } from 'react'
import Header from '../components/Header/Header';
import Home from '../components/Home/Home';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Register from './Register/Register';
import Dashboard from './Dashboard/Dashboard';
import Account from './Account/Account';
import Auth from '../auth';
import Donate from './Donate/Donate';
import { LoadUser } from '../redux/actions/userAction';
import { CreatePosts, LoadPosts } from '../redux/actions/postsAction';
import { connect } from 'react-redux';


function Main(props) {
    const LoadState = () => {
        props.LoadUser();
        props.LoadPosts();
    }
    useEffect(() => {
        LoadState();
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
                        <Auth user={props.user} posts={props.posts} LoadState={LoadState}>
                            <Header />
                            <Dashboard posts={props.posts} user={props.user} />
                        </Auth>
                    </Route>
                    <Route path="/account" exact>
                        <Auth user={props.user} posts={props.posts} LoadState={LoadState}>
                            <Header />
                            <Account posts={props.posts} user={props.user?.user} />
                        </Auth>
                    </Route>

                    <Route path="/donate" exact>
                        <Auth user={props.user} posts={props.posts} LoadState={LoadState}>
                            <Header />
                            <Donate CreatePosts={props.CreatePosts} id={props.user?.user?._id} />
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
        CreatePosts: (images, data, eraserData) => dispatch(CreatePosts(images, data, eraserData)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)