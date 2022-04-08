import React from "react";
import './FaceRecognition.css'

const FaceRecognition = ({ imageURL, box }) => {
    /* const data = Array.from(box); */
    /*   console.log('face rec', box); */
    return (
        <div className="center ma">
            <div className="absolute m2">
                <img id='image' alt='' src={imageURL} width='500px' height='auto' />
                {/* <div className='bounding-box' style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div> */}
                {box ? (
                    
                    box.map((item) => (
                        <div
                            key={item.bottomRow}
                            className='bounding-box'
                            style={{
                                top: item.topRow,
                                right: item.rightCol,
                                bottom: item.bottomRow,
                                left: item.leftCol,
                            }}
                        ></div>
                    ))
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
}

export default FaceRecognition;
