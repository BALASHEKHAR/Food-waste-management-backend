import React, { useState, useEffect } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import RoomIcon from '@material-ui/icons/Room';
import { format } from 'timeago.js';
import { useLocation } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './Maps.css'
export default function Maps(props) {
    const location = useLocation();
    const [viewport, setViewport] = useState({
        width: "100vw",
        height: "100vh",
        latitude: 17.41342,
        longitude: 17.41342,
        zoom: 12
    });
    const [currentState, setcurrentState] = useState(null)
    useEffect(async () => {
        if (location.state?.fromPost === true) {
            setViewport({
                ...viewport,
                latitude: location.state.lat,
                longitude: location.state.lon
            });
            setcurrentState(location.state.id)
        }
        else {
            await navigator.geolocation.getCurrentPosition(
                position => {
                    setViewport({
                        ...viewport,
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                err => console.log(err)
            );
        }




    }, [])
    const handleMarkerClick = (id) => {
        setcurrentState(id);
    }
    return (
        <ReactMapGL
            {...viewport}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxApiAccessToken="pk.eyJ1Ijoia2FtYW5kbGFiYWxhc2hla2hhciIsImEiOiJja3JiZXJ0MWg0YjdpMndueHlzOHFmMmJhIn0.GK_kdlg4xXcqcdSF8gmDow"
            onViewportChange={nextViewport => setViewport(nextViewport)}
        >





            {

                props.data?.posts?.map((post, i) => {
                    return (
                        <div key={i}>
                            <Marker latitude={parseInt(post.lat)} longitude={parseInt(post.lon)} offsetLeft={-20} offsetTop={-10}>
                                <RoomIcon onClick={() => handleMarkerClick(post._id)} style={{ cursor: "pointer", font: viewport.zoom * 10, color: props.id === post.postedBy?._id ? "blue" : "red" }} />
                            </Marker>

                            {post._id === currentState && <Popup
                                latitude={parseInt(post.lat)}
                                longitude={parseInt(post.lon)}
                                closeButton={true}
                                onClose={() => setcurrentState(null)}

                                anchor="left" >
                                <div>
                                    <span className="maptimeago">{format(post.createdAt)}</span>
                                    <div className="mapuser"><img src={post.postedBy.image} /><p>{post.postedBy.name}</p></div>

                                    {/* <ul className="maplist">
                                        {
                                            post.fooditems.map((item, i) => <li key={i}>{item.item_name}</li>)
                                        }
                                    </ul> */}
                                    <div style={{ fontSize: "12px", marginTop: "5px" }}><span style={{ color: "#FF00FF" }}>description :</span>  {post.description}</div>

                                    <div style={{ fontSize: "12px", marginTop: "5px" }}><span style={{ color: "#FF00FF" }}>Address :</span> : {post.address}</div>
                                    <TableContainer style={{ maxWidth: "350px" }}>
                                        <Table aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell size="small" align="center"><b>Items</b></TableCell>
                                                    <TableCell align="center"><b>quantity</b> </TableCell>
                                                    <TableCell align="center"><b>time</b></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {/* {post.fooditems.map((row) => (
                                                    <TableRow key={row.name}>
                                                        <TableCell align="center">{row.item_name}</TableCell>
                                                        <TableCell align="center">{row.availability}</TableCell>
                                                        <TableCell align="center">{row.spoil_in_hrs}</TableCell>
                                                    </TableRow>
                                                ))} */}
                                                {post.fooditems.map((row) => (
                                                    Date.parse(post?.updatedAt) / 1000 + parseInt(row.spoil_in_hrs) * 60 * 60 < (new Date().getTime() / 1000)
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
                                    <div></div>

                                </div>
                            </Popup>}


                        </div>
                    )
                })
            }


        </ReactMapGL>
    )
}
