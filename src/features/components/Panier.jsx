import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

export default function Panier(props) {
  const [storage, setStorage] = useState(
    JSON.parse(localStorage.getItem("list")) || []
  );
  const [qty, setQty] = useState(1);

  /********************** delete item *****************/

  function remove(x) {
    const removedStorage = [...storage].filter((item, index) => {
      return(
      item._id !== x
    )
  })
    
    setStorage(removedStorage);
    props.setCount(props.count - 1)
   // storage.length > 1
       localStorage.setItem("list", JSON.stringify(removedStorage))
      /*: localStorage.setItem("list", JSON.stringify([]));*/
    
  }
  console.log(storage);
  /********************************** or *****************************/

  const removeProduct = (index) => {
    setStorage([
      ...storage.slice(0, index),
      ...storage.slice(index + 1, storage.length),
    ]);
    props.setCount(props.count - 1)
    storage.length > 1
      ? localStorage.setItem("list", JSON.stringify(storage))
      : localStorage.setItem("list", JSON.stringify([]));
    console.log(storage);
  };

  /************************** clear basket ************************/

  function clear() {
    setStorage([]);
    localStorage.setItem("list", JSON.stringify([]));
  }

  /************************* total *****************************/

  let tot = 0;
  storage.forEach((item) => {
    tot = tot + Number(item.price - (item.sold * item.price) / 100) * qty;
  });
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Qty</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {storage.map((elem, i) => {
            return (
              <tr key={i}>
                <td style={{ width: "26%" }}>
                  <img
                    src={`http://localhost:5000/static/${elem.image}`}
                    alt="image"
                    style={{ width: "10%" }}
                  />
                </td>
                <td style={{ width: "26%" }}>{elem.name}</td>
                <td>{elem.price}$</td>
                <td>{elem.sold}%</td>
                <td style={{ width: "10%" }}>
                
                  <input
                    type="number"
                    name="qty"
                    onChange={(e) => setQty(e.target.value)}
                    style={{ width: "50%" }}
                    value={qty}
                    min="1"
                    max={elem.InStock}
                  ></input>
              
                </td>
                <td>
                  <button onClick={() => remove(elem._id)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </td>
              </tr>
            );
          })}
          <tr>
            <td colSpan={5}>Totale = {tot}$</td>
            <td colSpan={1}>
              <button onClick={() => clear()}>Clear All</button>
            </td>
          </tr>
        </tbody>
      </Table>
      <Button variant="primary" size="lg">
        Confirm
      </Button>
    </div>
  );
}
