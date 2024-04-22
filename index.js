
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const featureRoute = require('./src/Module/Features/featureRoute.js');
const doctorRoute  = require('./src/Module//Doctors/doctorsRoute.js')
const usersRoute  = require('./src/Module/Users/userRoute')
const blogRoute = require('./src/Module/Blog/blogRoute.js')
const allGalleryRoute = require('./src/Module/Gallery/galleryRoute.js')
const allDoctorRoute = require('./src/Module/allDoctors/allDoctors.route.js')
const appointmentRoute = require('./src/Module/Appointment/appointment.route.js')
const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
// Connect to the database using mongoose  "bdhospital"
mongoose.connect('mongodb+srv://digital-hospital:Jry9oGMfm8TXtHvJ@cluster0.hoc29pv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connection is successful"))
    .catch(err => console.error("Connection failed:", err));


app.use('/bd-fertility', featureRoute); // Use the router directly
app.use('/doctor-route', doctorRoute); // Use the router directly
app.use('/user-route', usersRoute); // Use the router directly
app.use('/blog-route', blogRoute); // Use the router directly
app.use('/Gallery-route', allGalleryRoute); // Use the router directly
app.use('/allDoctors-route', allDoctorRoute )
app.use('/appointment-route', appointmentRoute )

app.get('/', (req, res) => {
  res.send('Hello World! Digital Hospital Server Connected');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

