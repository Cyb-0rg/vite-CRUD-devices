import ".././App.css";
import { useState } from "react";
import Axios from "axios";
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function Main() {

  const [name, setName] = useState(""); //device parameters
  const [xcor, setxcor] = useState("");
  const [ycor, setycor] = useState("");
  const [type, setType] = useState("");

  const [newName, setNewName] = useState("");

  const [deviceList, setdeviceList] = useState([]); //new device 

  const [nameErr, setNameErr] = useState(""); //Errors
  const [xcorErr, setxcorErr] = useState("");
  const [ycorErr, setycorErr] = useState("");
  const [typeErr, setTypeErr] = useState("");

 

  const [isValid, setIsValid] = useState(true);
  const validateSubmission = () => { 

     if (name === "") {
        setNameErr("name is required");
        setIsValid(false);
         return false;
     } 
     
     if (xcor === "") {
      setxcorErr("xcor is required");
      setIsValid(false);
       return false;
   }
     

    if (ycor === "") {
      setycorErr("ycor is required");
      setIsValid(false);
       return false;
    }

    if (type === "") {
      setTypeErr("type is required");
      setIsValid(false);
       return false;
    }


    //toast('SUCCESSFULLY ADDED', {position: toast.POSITION.TOP_LEFT} )
    
      
      setIsValid(true);
      setNameErr("");
      setxcorErr("");
      setycorErr("");
      setTypeErr("");

      //maybe here?

      
      return true;
     

  }


  const handleSubmission = () => { 


      if (validateSubmission()){

        console.log("valid submission");
        newDevice();
        successToast();

      }else{

        console.log("invalid submission");
        errorToast();

      }

 

  }



 //new device
  const newDevice = () => {
    Axios.post("http://localhost:5001/newDevice", {
      name: name,
      xcor: xcor,
      ycor: ycor,
      type: type
    }).then(() => {

      setdeviceList([
        ...deviceList,
        {
          name: name,
          xcor: xcor,
          ycor: ycor,
          type: type
        },
      ]);


    });


    //successToast();


  };



  const getDevices = () => {

    messegeToast();

    Axios.get("http://localhost:5001/getdevices").then((response) => {
      setdeviceList(response.data);
      console.log(response.data);
    });
  };

  


  const updateDeviceName = (id) => {
    successToast();
    Axios.put("http://localhost:5001/updateDevices", { name: newName, id: id }).then(
      (response) => {
        setdeviceList(
          deviceList.map((val) => {
            return val.id === id
              ? {
                  id: val.id,
                  name: newName,
                  xcor: val.xcor,
                  ycor: val.ycor,
                  type: val.type
                }
              : val;
          })
        );
      }
    );
  }; 




  const deleteDevice = (id) => {
    deleteSuccessToast();
    Axios.delete(`http://localhost:5001/deletedevice/${id}`).then((response) => {
      setdeviceList(
        deviceList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };



  const successToast = () => {
    toast.success("successfully added", {
      position: toast.POSITION.TOP_RIGHT,
      className: "toastBox"
    })
  } ;

  const errorToast = () => {
    toast.error("invalid attempt !", {
      position: toast.POSITION.TOP_RIGHT,
      className: "toastBox"
    })
  } ;


  const messegeToast = () => {
    toast.info("scroll down to see the list", {
      position: toast.POSITION.TOP_RIGHT,
      className: "toastBox"
    })
  } ;

  const deleteSuccessToast = () => {
    toast.error("employee deleted", {
      position: toast.POSITION.TOP_RIGHT,
      className: "toastBox"
    })
  } ;

  //add more toasts here.

  return (

    <div className="App">

    <>
      <ToastContainer/>
    </>




      <div className="information">
        <label className="info-label">Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />

              <div className="errorMessege">
                <p> {nameErr}</p>
              </div>
            

        <label className="info-label">X-Coordinate:</label>
        <input
          type="text"
          onChange={(event) => {
            setxcor(event.target.value);
          }}
        />

              <div className="errorMessege">
                <p> {xcorErr}</p>
              </div>

        <label className="info-label">Y-Coordinate:</label>
        <input
          type="text"
          onChange={(event) => {
            setycor(event.target.value);
          }}
        />


              <div className="errorMessege">
                <p> {ycorErr}</p>
              </div>



              <label className="info-label">Type:</label>
          <div className="radios">

              
            <input type="radio" value="4:3" name="chooseType"  onChange={(event) => {
                setType(event.target.value);
              }} /> 4:3
            <input type="radio" value="16:9" name="chooseType" onChange={(event) => {
                setType(event.target.value);
              }}/> 16:9

                  <div className="errorMessege">
                    <p> {typeErr}</p>
                  </div>

          </div>
        



        <button className={ isValid ? "successButton" : "invalidButton"}  onClick={ handleSubmission  }>Add device</button>
        <button onClick={getDevices}>Show Devices</button>
      </div>



      <div className="employees">

        {deviceList.map((val, key) => {
          return (
            <div className="employee">
                <div>
                  <h3> Name: {val.name} </h3>
                  <h3>xcor: {val.xcor}</h3>
                  <h3>ycor: {val.ycor}</h3>
                  <h3>type: {val.type}</h3>
                </div>
              <div>


                <input
                  type="text"
                  placeholder="new name"
                  onChange={(event) => {
                    setNewName(event.target.value);
                  }}
                />


                <button
                  onClick={() => {
                    updateDeviceName(val.id);
                  }}
                >
                  {" "}
                  Update
                </button>

                <button className="deleteButton"
                  onClick={() => {
                    deleteDevice(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>


    </div> 
  );
}

export default Main;
