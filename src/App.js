import React from "react";
import './App.css';
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";

function App() {
  
  const url = "https://cars-backend-bp.herokuapp.com/cars";

  const [cars, setCars] = React.useState([])

  const emptyCar = {
    name: "",
    img: "",
    price: ""
  }

  const [selectedCar, setSelectedCar] = React.useState(emptyCar);

  // function to get list of Cars
  const getCars = () => {
    // make a get a request to this url
    fetch(url + "/cars/")
    // use .then to take action when the response comes in
    // convert fetched data into js object (since fetch returns the raw data that is not usable)
    .then((response) => response.json())
    // use the data from the response
    .then((data) => {
      setCars(data)
    })
  }

  // useEffect, to get the data right away
  React.useEffect(() => {
    getCars()
  }, [])

  //handleCreate - function for when the create form is submitted
  const handleCreate = (newCar) => {
    fetch(url + "/cars/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCar),
    }).then(() => getCars());
  };

  // handleUpdate - function for when the edit form is submitted
  const handleUpdate = (car) => {
    fetch(url + "/cars/" + car._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    }).then(() => getCars());
  };

  //function to specify which car we are updated
  const selectCar = (car) => {
    setSelectedCar(car);
  };

  // deleteCar to delete individual cars
  const deleteCar = (car) => {
    fetch(url + "/cars/" + car._id, {
      method: "delete"
    })
    .then(() => {
      getCars()
    })
  }

  return (
    <div className="App">
      <h1>Favorite Cars</h1>
      <hr />
      <Link to="/create">
        <button>Add Car</button>
      </Link>
      <main>
      <Switch>
          <Route exact path="/" render={(rp) => (
            <Display 
            {...rp} 
            cars={cars} 
            selectCar={selectCar}
            deleteCar={deleteCar} 
            />
            )} 
          />
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form {...rp} label="create" car={emptyCar} handleSubmit={handleCreate} />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form {...rp} label="update" car={selectedCar} handleSubmit={handleUpdate} />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
