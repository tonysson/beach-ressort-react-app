import React from 'react'
import RoomsFilter from './RoomsFilter'
import RoomsList from './RoomsList'

import Loading from './Loading';
import { withRoomConsumer } from './../Context';


function RoomsContainer ({ context }){

    const { loading, sortedRooms, rooms } = context;

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <RoomsFilter rooms={rooms} />
            <RoomsList rooms={sortedRooms} />
        </>
    )
}

export default withRoomConsumer(RoomsContainer)



// Premiere maniere de faire sans creer le hoc ds le context pour avoir acces au consumer

/*export default function RoomsContainer() {
    return (
        <RoomConsumer>
            { (value) => {
               // console.log(value);
               const { loading, sortedRooms, rooms} = value;

               if(loading ){
                   return <Loading/>
               }

                return(
                    <div>
                        hello from roomscontainer
                        <RoomsFilter rooms = {rooms} />
                        <RoomsList  rooms={sortedRooms}/>
                    </div>
                )
            }}
        </RoomConsumer>
        
    )
}*/
