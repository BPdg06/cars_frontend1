import React from "react";

const Display = (props) => {
  // destruct the cars from props
  const { cars } = props

  // Returns the JSX for when you have cars
  const loaded = () => (
    <div style={{textAlign: "center"}}>
      {cars.map((car) => (
        <article key={car._id}>
          <img src={car.img}/>
          <h1>{car.name}</h1>
          <h3>{car.price}</h3>
          <button onClick={() => {
            props.selectCar(car)
            props.history.push("/edit")
          }}>
            edit
          </button>
          <button onClick={() => {
            props.deleteCar(car)
          }}>
            Delete
          </button>
        </article>
      ))}
    </div>
  )

  const loading = () => <h1>Loading</h1>

  return cars.length > 0 ? loaded() : loading()
};

export default Display;