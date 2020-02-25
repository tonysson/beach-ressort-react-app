import React from 'react';
import { useContext} from 'react';
import {RoomContext} from '../Context';
import Title from './Title';

// pour avoir acces au context ds le stateless fonction on utilise le useContext()

/**
 * Fonction qui nous permet d'avoir une seule valeur de type, capacity, .... ( single, family) dans les selects
 */
 const getUnique = (items,value) => {
     return[...new Set(items.map(item => item[value]))]
 }

export default function RoomsFilter({ rooms }) {

 const context = useContext(RoomContext);
 //console.log(context);
 const { handleChange,type,capacity, minPrice, maxPrice, minSize, maxSize,price,breakfast,pets} = context;


 
 // permet d'voir les types non repetés dans le select
 let types = getUnique(rooms, 'type');
 // la je rajoute all aux types uniques
 types = ['all', ...types];
 //console.log(types)

 // on map a travers le types pour afficher la value dans le <option></option>
 types = types.map((item, index) => {
 return <option key = { index} value= { item}>{item}</option>
 });


 let people = getUnique(rooms, 'capacity');

 people = people.map((item, index) => {
 return <option key={index} value= {item}>{item}</option>
 })



    return (
        <section className="filter-container">
            <Title title = "search rooms"/>
            <form className="filter-form">

               { /* select type */}
                 <div className="form-group">
                 <label htmlFor = "type">room type</label>
                 <select name="type" id = "type" value={type} className="form-control" onChange={handleChange}>
                   {types}
                 </select>
                 </div>
                { /* end of selected type */}

                { /* guests type */}
                <div className="form-group">
                    <label htmlFor="capacity">Guests</label>
                    <select name="capacity" id="capacity" value={capacity} className="form-control" onChange={handleChange}>
                        {people}
                    </select>
                </div>
                { /* end of guests type */}


                { /* room price  */}
                <div className="form-group">
               <label htmlFor="price">room price ${price}</label>
               <input type="range" name="price" min = {minPrice} max = {maxPrice} id="price" value = {price} onChange={handleChange} className="form-control"/>    
                </div>

                { /* size  */}
                <div className="form-group">
                    <label htmlFor="size">room size</label>
                    <div className="size-inputs">
                      <input type="number" name="minSize"  id="size" value={minSize} onChange={handleChange} className="form-control" />
                       <input type="number" name="maxSize"  id="size" value={maxSize} onChange={handleChange} className="form-control" />
                    </div>
                </div>
                { /* end  of size  */}

                 { /* extras */}
                  <div className="form-group">
                     <div className="single-extra">
                        <input type="checkbox" name="breakfast" id="breakfast" checked = {breakfast} onChange={handleChange} />
                        <label htmlFor="breakfast">breakfast</label>
                     </div>

                     <div className="single-extra">
                        <input type="checkbox" name="pets" id="pets" checked = {pets} onChange={handleChange} />
                        <label htmlFor="pets"> pets</label>
                     </div>
                 </div>    
                { /* end  of extras  */}

            </form>
        </section>
    )
}
