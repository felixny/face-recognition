import React, { useState } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import './App.css';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
/* import Particles from "react-tsparticles"; */
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

const App = () => {
  /* const particlesInit = (main) => {
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  };
  const particlesLoaded = (container) => {
    console.log(container);
  }; */

  const [imageURL, setURL] = useState('');

  const [input, setInput] = useState('');

  const [box, setBox] = useState({});

  const [route, setRoute] = useState('signin');

  const [isSignedIn, setSignedIn] = useState(false);

  const [users, setUser] = useState(
    {
      id: '',
      name: '',
      email: '',
      entry: 0,
      joined: ''
    }
  );

  const loadUser = (users) => {
    console.log('users', users)
    setUser({
      id: users.id,
      name: users.name,
      email: users.email,
      entry: users.entry,
      joined: users.joined
    })
  }

  /* const LoadUser = (data) => {
    setUsers({
      ...users,
      id: data.id,
      name: data.name,
      email: data.email,
      entry: data.entry,
      joined: data.joined
    }); */


  console.log('name', users.name);
  console.log('entries', users.entry);
  console.log('email', users.email);

  /*  useEffect(()=>{
     fetch('http://localhost:4000/')
     .then(response=> response.json())
     .then(data => console.log(data))
   }) */



  const onInputChange = (event) => {
    console.log(event.target.value);
    setInput(event.target.value);
  }

  const calculateFaceLocation = (data) => {
    const clarifaiFace = JSON.parse(data, null, 2).outputs[0].data.regions[0]
      .region_info.bounding_box;
    const image = document.getElementById("image");
    const width = Number(image.width);
    const height = Number(image.height);
    console.log('width', width);
    console.log('height', height);
    console.log('leftColl', clarifaiFace.left_col);
    console.log('TopRow', clarifaiFace.top_row);
    console.log('right_col', clarifaiFace.right_col);
    console.log('bottom_row', clarifaiFace.bottom_row);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    };
  }

  const displayFaceBox = (box) => {
    console.log(box);
    setBox(box);

  }

  const onRouteChange = (route) => {
    if (route === 'signout') {
      setSignedIn(false);
    } else if (route === 'home') {
      setSignedIn(true);
    }
    setRoute(route);
  }

  const onSubmit = () => {
    setURL(input);

    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": "1028693",
        "app_id": "bd6ab4db310c42dba83a7791fb6efa3b"
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": input
            }
          }
        }
      ]
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key 2f27d84734af45cf9458d0dbab0c600d'
      },
      body: raw
    };

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    fetch("https://api.clarifai.com/v2/models/a403429f2ddf4b49b307e318f00e528b/outputs", requestOptions)
      .then((response) => response.text())
      .then((response) => {
        if (response) {
          fetch('https://young-tundra-92620.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: users.id
            })
          })
        }
        displayFaceBox(calculateFaceLocation(response))
      })
      .catch(error => console.log('error', error));

    /* .then(result => console.log(JSON.parse(result, null, 2).outputs[0].data.regions[0]
    .region_info.bounding_box)) */

  }

  return (
    <div className="App">
      {/*  <Particles className='particles'
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40,
              },
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outMode: "bounce",
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              random: true,
              value: 5,
            },
          },
          detectRetina: true,
        }}

      /> */}

      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      {route === 'home'
        ? <div> <Logo />
          <Rank name={users.name} entry={users.entry} />
          <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />
          <FaceRecognition box={box} imageURL={imageURL} />
        </div>
        : (
          route === 'signin'
            ? <Signin loadUser={loadUser} onRouteChange={onRouteChange} />
            : (route === 'signout'
              ? <Signin onRouteChange={onRouteChange} />
              : <Register loadUser={loadUser} onRouteChange={onRouteChange} />
            )
        )

      }

    </div>
  );
}

export default App;
