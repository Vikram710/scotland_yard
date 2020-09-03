import React, { Component } from "react";
import {Button} from 'react-bootstrap';
import mapimage from "./map-min.png";
import Panzoom from '@panzoom/panzoom';


 
class Game extends Component {
    constructor(props){
        super(props);
        this.state= {
            panzoom : null
        }
        this.showpos = this.showpos.bind(this);
    }
    showpos(e){
        
        const ele = document.getElementById("map");
        var scale = this.state.panzoom.getScale();
        var s_x = ele.getBoundingClientRect().x;
        var s_y = ele.getBoundingClientRect().y;
        var p = this.state.panzoom.getPan();
        const orig_x = (e.clientX - s_x)/scale; 
        const orig_y = (e.clientY - s_y)/scale;
        //console.log("client_x: " + e.pageX + " client_y: " + e.pageY);
        //console.log("orig_x: " + orig_x + " orig_y: " + orig_y);

        const canvas = document.getElementById("map");
        let ctx = canvas.getContext('2d');
        var bounds = ele.getBoundingClientRect();
        // get the mouse coordinates, subtract the canvas top left and any scrolling
        console.log(bounds.left,window.scrollX);
        var mx = e.pageX - bounds.left - window.scrollX;
        var my = e.pageY - bounds.top - window.scrollY;
        mx /=  bounds.width; 
        my /=  bounds.height; 

        mx *= canvas.width;
        my *= canvas.height;
        //ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.beginPath();
        console.log("mx: " + mx + " my: " + my);
        ctx.fillRect(mx,my,15,15);
        ctx.closePath();
    }
    componentDidMount(){
        const canvas = document.getElementById("map");
        let ctx = canvas.getContext('2d');
        let img = new Image();
        img.src = mapimage;
        img.onload = function(e) {
            canvas.width = img.width;
            canvas.height = img.height;
            // get the scale
            var sc = Math.min(canvas.width / img.width, canvas.height / img.height);
            // get the top left position of the image
            var x = (canvas.width / 2) - (img.width / 2) * sc;
            var y = (canvas.height / 2) - (img.height / 2) * sc;
            ctx.drawImage(img, 0, 0, img.width*sc , img.height*sc );
            
        };
        
        const elem = document.getElementById('map');
        this.state.panzoom = Panzoom(elem, {
        maxScale: 10,
        canvas:true,
        //overflow:'scroll'
        contain:"outside"
        });
        this.state.panzoom.pan(10, 10);
        //panzoom.zoom(1, { animate: true });
        elem.parentElement.addEventListener('wheel', this.state.panzoom.zoomWithWheel);
    }
  render() {
    return (
            <>
            <Button variant="primary" >open sidebar</Button>{' '}
            <div style={{width:"100%",height:"100%"}}>
            <canvas style={{width:"100%",height:"100%"}} onClick={this.showpos} id="map">  
            </canvas>
            </div>
            </>
           
        
    );
  }
}

export default Game;