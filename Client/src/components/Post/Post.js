import React, { useState } from 'react'
import './Post.css'
import { autoPlay } from 'react-swipeable-views-utils';
import { format } from 'timeago.js'
import { useHistory, Link } from 'react-router-dom'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SwipeableViews from 'react-swipeable-views';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function Post(props) {
    const [activeStep, setactiveStep] = useState(0);
    const [Sliderimages, setSliderimages] = useState([]);
    const handleStepChange = (step) => {
        setactiveStep(step);

    }

    const history = useHistory();
    const openMaps = () => {
        history.push('map', { fromPost: true, id: props.post?._id, lat: parseInt(props.post?.lat), lon: parseInt(props.post?.lon) });
    }

    return (
        <div className="post-container">
            <div className="post-container-details">
                <div>
                    <p>posted on - {format(props.post?.createdAt)}</p>
                    <div className="posted_by_user">
                        <img src={props.post?.postedBy?.image} />
                        <h4>{props.post?.postedBy?.name}</h4>

                    </div>

                    <div className="post_availability">
                        <b>Description : </b>{props.post.description}
                    </div>
                    {/* tabel */}

                    <div>
                        <br />
                        <TableContainer className="table" component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center"><b>Food Item</b></TableCell>
                                        <TableCell align="center"><b>Availability</b> </TableCell>
                                        <TableCell align="center"><b>Spoils_in_hrs</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {props.post.fooditems.map((row) => (
                                        Date.parse(props.post?.updatedAt) / 1000 + parseInt(row.spoil_in_hrs) * 60 * 60 < (new Date().getTime() / 1000)
                                            ? <TableRow key={row.name}>
                                                <TableCell align="center">{row.availability}</TableCell>
                                                <TableCell align="center">{row.item_name}</TableCell>
                                                <TableCell align="center" style={{ color: "red" }}>spoiled</TableCell>
                                            </TableRow>
                                            :
                                            <TableRow key={row.name}>
                                                <TableCell align="center">{row.availability}</TableCell>
                                                <TableCell align="center">{row.item_name}</TableCell>
                                                <TableCell align="center">{row.spoil_in_hrs}</TableCell>
                                            </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <br />
                    </div>
                    {/* table */}
                    {/* <div className="post-items">
                        <ul>
                            <li>item1 <span>1kg</span></li>
                            <li>item1<span> 1kg</span></li>
                            <li>item1<span> 1kg</span></li>
                            <li>item1 <span>1kg</span></li>
                        </ul>
                    </div> */}
                    <div className="post_loc">
                        <b>Country : </b>{props.post.country}
                    </div>
                    <div className="post_loc">
                        <b>city : </b>{props.post.city}
                    </div>
                    <div className="post_loc">
                        <b>Address : </b>{props.post.address}
                    </div>
                    <div className="post_remined">

                        <b>Other Details :</b>{props.post.any_other}
                    </div>




                </div>
                <div className="post_button">
                    <button className="req_now_btn">
                        Request</button>
                    <button className="req_now_btn" onClick={openMaps}>
                        show on map</button>
                    <button className="req_now_btn">
                        <a target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${props.post?.address}`}>show directions</a>   </button>

                </div>
            </div>
            <div className="post-container-img">
                {
                    props.post?.images?.length === 1 ?

                        <img
                            className="post-container-img-img"
                            src={props.post?.images[0]}
                            alt="" /> :

                        <AutoPlaySwipeableViews
                            className="ImageGallery"
                            axis={'x'}
                            index={activeStep}
                            onChangeIndex={handleStepChange}
                            enableMouseEvents
                        >
                            {props?.post?.images.map((step, index) => (

                                <div
                                    style={{
                                        overflow: "hidden",
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    key={index}
                                >
                                    {Math.abs(activeStep - index) <= props?.post?.images.length ? (
                                        <img
                                            style={{
                                                overflow: "hidden",
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover"
                                            }}
                                            src={step}
                                            alt="" />
                                    )
                                        :
                                        null
                                    }
                                </div>
                            ))}
                        </AutoPlaySwipeableViews>
                }
            </div>
        </div>
    )
}

export default Post
