import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';

export function AboutPage() {

    const [center, setCenter] = useState({
        lat: 32.0749831,
        lng: 34.9120554
    })
    const AnyReactComponent = ({ text, lat, lng }) => <div onClick={() => setCenter({ lat, lng })} style={{ width: 'fit-content', padding: '1em', background: 'black', color: 'white' }}>{text}</div>;

    const defaultProps = {
        center: {
            lat: 32.0749831,
            lng: 34.9120554
        },
        zoom: 11
    }
    
    return (
        <section className="about-page">
            <h2>About us</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore quidem fuga voluptatum! Rem sapiente voluptatem consequatur non asperiores quasi, distinctio saepe! Perspiciatis quaerat ex molestiae aspernatur doloremque eum sit corrupti.</p>
            <div style={{ aspectRatio: '2/1', width: '70%', margin: '1em auto' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyBzYOvWP9Fcn5o3hqah4fNiufkLax8i_Hg" }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                    center={center}
                >
                    <AnyReactComponent
                        {...center}
                        text="Store"
                    />
                </GoogleMapReact>
                <p>{JSON.stringify(center)}</p>
            </div>
        </section>
    )
}