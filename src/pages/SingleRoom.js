import React, { Component } from 'react';
import defaultBcg from '../images/room-1.jpeg';
import { Link } from 'react-router-dom';
import Banner from './../components/Banner';
import { RoomContext} from '../Context';
import StyledHero from './../components/StyledHero';



export default class SingleRoom extends Component {
    constructor(props){
        super(props);
        this.state = {
            slug: this.props.match.params.slug,
            defaultBcg
        }
    }

    static contextType = RoomContext
    render() {

        const {getRoomSlug} = this.context;
        const room = getRoomSlug(this.state.slug);

        if(!room) {
            return(
                <div className="error">
                  <h3>No such room could not be found</h3>
                  <Link className="btn-primary" to ="/rooms">
                      Back to rooms
                  </Link>
                </div>
            )
        }

        const { name, description, price, size, capacity,extras, breakfast, pets, images} = room;
        const [mainImg, ...defaultImg]  = images
        return (
            <React.Fragment>
                <StyledHero img = { mainImg || this.state.defaultBcg }>
                    <Banner title= {`${name} room`}>
                        <Link to="/rooms" className="btn-primary" >
                            Back to rooms
                        </Link>
                    </Banner>
                    
                </StyledHero>
                <section className="single-room">
                    <div className="single-room-images"> 
                        { defaultImg.map((item,index) => {
                          return  <img src={ item } alt= {name} key= {index} />
                        })}
                    </div>
                    <div className="single-room-info">
                        <article className="desc">
                            <h3>details</h3>
                            <p>{description}</p>

                        </article>
                        <article className="info">
                            <h3>
                                info
                            </h3>
                            <h6>price : {price}€</h6>
                            <h6>size : {size} SQFT</h6>
                            <h6> 
                                max-capacity: {capacity > 1 ?`${capacity} people` : `${capacity} person`}
                            </h6>
                            <h6> pets :{pets? " allowed" : "not allowed"}</h6>
                            <h6>{ breakfast && "free breakfast included"}</h6>

                        </article>
                    </div>
                </section>
                <section className="room-extras">
                    <h6>extras</h6>
                    <ul className="extras">
                        {extras.map((item, index) => {
                            return <li key = {index}>- {item}</li>
                        })}
                    </ul>
                </section>
            </React.Fragment>
    )}
    } 


