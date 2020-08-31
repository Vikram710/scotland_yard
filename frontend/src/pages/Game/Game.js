import React, { Component } from "react";
import meme from './meme.png';
 
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
 
class Game extends Component {
    showpos(e){
        console.log( "clientX: " + e.clientX +
        " - clientY: " + e.clientY);
    }
  render() {
    return (
    <div style={{height:"500px",width:"500px"}} onClick={this.showpos}>
      <TransformWrapper
        defaultScale={1}
        defaultPositionX={200}
        defaultPositionY={100}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <React.Fragment>
            <div className="tools">
              <button onClick={zoomIn}>+</button>
              <button onClick={zoomOut}>-</button>
              <button onClick={resetTransform}>x</button>
            </div>
            <TransformComponent>
              <img src={meme} alt="test" />
              <div>Example text</div>
            </TransformComponent>
          </React.Fragment>
        )}
      </TransformWrapper>
      </div>
    );
  }
}

export default Game;