const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const port = 5001

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "devices",
});


app.get("/getdevices", (req, res) => {

  db.query("SELECT * FROM devices_table", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
  
});


app.post("/newDevice", (req, res) => {
  const name = req.body.name;
  const xcor = req.body.xcor;
  const ycor = req.body.ycor;
  const type = req.body.type;
  

  db.query(
    "INSERT INTO devices_table (name, xcor, ycor, type) VALUES (?,?,?,?)",
    [name, xcor, ycor, type],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
        console.log("values inserted: device");
      }
    }
  );
}); 



app.put("/updateDevices", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;

  console.log(`typeof id: ` + typeof id);
  db.query(
    "UPDATE devices_table SET name = ? WHERE id = ?",
    [name, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
}); 



app.delete("/deletedevice/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM devices_table WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
 

app.listen(port, () => {
  console.log(`Yey, your server is running on port ${port}`);


});
