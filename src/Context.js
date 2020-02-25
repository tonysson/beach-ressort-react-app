import React, { Component } from 'react';
//import items from './data';
import Client from './Contentfull';

Client
  .getEntries()
  .then(response => console.log(response.items))
  .catch(err => console.log(err));




const RoomContext = React.createContext();

 class RoomProvider extends Component {

    state = {
       rooms:[],
       sortedRooms:[],
       featuredRooms:[],
       loading: true,
       type:'all',
       capacity:1,
       price:0,
       minPrice:0,
       maxPrice:0,
       minSize:0,
       maxSize:0,
       breakfast:false,
       pets:false
    }

    // getData from contentful

    getData = async () => {
        try{
           let response = await Client.getEntries({
               content_type: "beachRessortRoom"
           });

            let rooms = this.formatData(response.items);
       // console.log(rooms);
       let featuredRooms = rooms.filter(room => room.featured === true);
       
       let maxPrice = Math.max(...rooms.map(item => item.price));
       //console.log(MaxPrice);
        let maxSize = Math.max(...rooms.map(item => item.size));
        //console.log(maxSize)


       this.setState({
           rooms,
           featuredRooms,
           sortedRooms:rooms,
           loading:false,
           price:maxPrice,
           maxPrice,
           maxSize
       });

        }catch(error){
            console.log(error)
        }
    }

    componentDidMount() {
        this.getData();






         // Get Deta from local machine

         
       /* let rooms = this.formatData(items);
       // console.log(rooms);
       let featuredRooms = rooms.filter(room => room.featured === true);
       
       let maxPrice = Math.max(...rooms.map(item => item.price));
       //console.log(MaxPrice);
        let maxSize = Math.max(...rooms.map(item => item.size));
        //console.log(maxSize)


       this.setState({
           rooms,
           featuredRooms,
           sortedRooms:rooms,
           loading:false,
           price:maxPrice,
           maxPrice,
           maxSize
       });*/

    }

    formatData(items){

     let tempItems = items.map(item => {
         let id = item.sys.id
         let images = item.fields.images.map(image =>{
             return image.fields.file.url
         });

         let room = {...item.fields, images, id}

         return room

        });

        return tempItems

    }

    getRoomSlug = (slug) =>{
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find((room) => {
           return room.slug === slug
        });

        return room
    }

    handleChange = event => {
        const target = event.target;

        // la on verifie si le type est checkbox ou pas et selon qui'l l'est ou pas value differe
        const value = target.type === "checkbox"? target.checked : target.value;

        const name = event.target.name;

        this.setState({
            [name]: value
        }, this.filteredRoom)

       
    }

    filteredRoom = () => {
        let { rooms, type, capacity,price,minSize, maxSize, breakfast, pets} = this.state;
         

        // all the rooms
        let tempRooms = [...rooms];

        // transform value
         capacity = parseInt(capacity);
         price = parseInt(price);
        
        // filter by type 
        if (type !=="all") {
            tempRooms = tempRooms.filter(room => room.type === type);
        };

        // filter by capacity
        if(capacity !==1){
            tempRooms = tempRooms.filter(room => room.capacity >= capacity);
        }

        // filter by price
        tempRooms = tempRooms.filter(room => room.price <= price);

        // filter by size
         tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize);

         // filter by breakfast
         if(breakfast){
             tempRooms = tempRooms.filter(room => room.breakfast === true );
         }

         // filter by pets 
          if(pets){
             tempRooms = tempRooms.filter(room => room.pets === true );
         }
        
        
        // change state
        this.setState({
             sortedRooms: tempRooms,
            
        })
    }


    render() {
        return (
            <RoomContext.Provider
              value={{...this.state,
                        getRoomSlug: this.getRoomSlug,
                        handleChange:this.handleChange
                     }}>
                { this.props.children}
            </RoomContext.Provider>
        )
    }
}

const RoomConsumer = RoomContext.Consumer

/**
 * Pour avoir acces au context dans un stateless component on utilse le contextConsumer
 * 
 * on a creé le withRoomConsumer pour pouvoir l'utilser dans le roomsContainer
 */

 export function withRoomConsumer(Component){
     return function ConsumerWrapper(props){
         return <RoomConsumer>
             { value => <Component {...props} context={value}/>}
         </RoomConsumer>
     }
 }


export { RoomProvider, RoomConsumer, RoomContext}
