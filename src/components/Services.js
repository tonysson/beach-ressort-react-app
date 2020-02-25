import React, { Component } from 'react';
import Title from './Title';
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer} from 'react-icons/fa'


export default class Services extends Component {

    state={   

        services:[

            {
                icon: <FaCocktail />,
                title: "free cocktail",
                info: "Lorem Ipsum is a free sany or materials obtained from this site."
            },
            {
                icon: <FaHiking />,
                title: "Endless Hiking",
                info: "Lorem Ipsum is a free sany or materials obtained from this site."
            },
            {
                icon: <FaShuttleVan />,
                title: "free  Shuttlevan",
                info: "Lorem Ipsum is a free sany or materials obtained from this site."
            },
            {
                icon: <FaBeer />,
                title: "Strong Beer",
                info: "Lorem Ipsum is a free sany or materials obtained from this site."
            },

        ]
        
}
    render() {
        return (
            <section className="services">
                <Title title="Services"/>
                <div className="services-center">
                   { this.state.services.map((item, index) => {
                       return(
                           <article key={index} className="service">
                               <span>{item.icon}</span>
                               <h6>{item.title}</h6>
                               <p>{ item.info}</p>
                           </article>
                       )
                   })}
                 </div>
            </section>
        )
    }
}
