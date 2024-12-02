const express = require ("express")
const cors = require ("cors")
const formidable = require("formidable")
const fs = require("fs/promises")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const path = require("path")
const next = require('next')
const passport = require("passport")
const session = require("express-session")
const LocalStrategy = require("passport-local").Strategy

dotenv.config()
const clientDir = path.resolve(__dirname, '../client')
console.log("Next.js directory:", clientDir)
// Environment
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: clientDir })
const handle = app.getRequestHandler()

const server = express()

//DB connection
const connectionURI = String(process.env.MONGO_URI)

try {
    mongoose.connect(connectionURI, {
        useNewUrlParser: true,
        serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
        tlsInsecure: false
    }).then (() => {
        console.log("MongoDB connected successfully")
    }).catch (err => {
        console.log("Error with Mongo connection: ", err)
    })
} catch (error) {
    if (error.name === 'MongooseServerSelectionError') {
        console.error('Server Selection Error:', error.message);
    } else {
        console.error('Connection Error:', error.message);
    }
    process.exit(1) // Exit process or handle it in another way
}

//DB SCHEMAS
const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: { type: String, required: true },
    password: { type: String, required: true },
    tempPassword: { type: Boolean, required: true }
})
const gallerySchema = new mongoose.Schema({
    refObjectID: {
        type: mongoose.Schema.Types.ObjectId, // Refers to the ObjectId of a Property
        required: true,
        ref: "Property" // Reference to the Property model
    },
    gallery: {
        name: { type: String, required: true },             // File name
        type: { type: String, required: true },             // MIME type (e.g., "image/png")
        size: { type: Number, required: true },             // File size in bytes
        content: { type: Buffer, required: true },          // File content as binary data
    }
})
const propertySchema = new mongoose.Schema ({
    objectID: { type: Number },
    status: { type: String },
    creator: { type: String },
    link: { type: String },
    address: { type: String },
    postcode: { type: String },
    letType: { type: String },
    minimumTerm: { type: String },
    propertyType: { type: String },
    shared: { type: Boolean },
    parking: { type: Boolean },
    students: { type: Boolean },
    families: { type: Boolean },
    children: { type: Boolean },
    pets: { type: Boolean },
    bedrooms: { type: Number },
    bathrooms: { type: Number },
    furnishing: { type: String },
    pricePPPW: { type: Number },
    pricePCM: { type: Number },
    deposit: { type: Number },
    bills: { type: Boolean },
    availableDate: { type: Date },
    description: { type: String }
})

//STATIC FILES ROOT
const root = path.join(__dirname, '../client/public')

//DB MODELS
const User = mongoose.model("User", userSchema)
const Gallery = mongoose.model("Gallery", gallerySchema)
const Property = mongoose.model("PropertyDetail", propertySchema)

app.prepare().then(() => {
    
    //GLOBAL MIDDLEWARE
server.use(express.static(root))
server.use(express.urlencoded({ extended: true }))
server.use(cors({
    origin: ['http://localhost:3000', 'https://bloom-management-e3a1f4b07ded.herokuapp.com'],
    credentials: true
}))
server.use(express.json())
server.use(express.static(root))

    //SESSION MIDDLEWARE
server.use(
    session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60,
        },
    })
)
server.use(passport.initialize())
server.use(passport.session())

    //PASSPORT MIDDLEWARE
function authUser (user, password, done) {
    User.findOne({username: user})
        .then( userRecord => {
            if (!userRecord) {
                return done(null, false, { message: "User not found" })
            }
            if ( userRecord?.password === password ) {
                return done(null, { 
                    id: userRecord._id,
                    name: userRecord.name,
                    tempPassword: userRecord.tempPassword })
            } else {
                return done(null, false, { message: "Invalid credentials" })
            }
        })
        .catch (error => {
            console.error("Database error during authentication:", error)
            return done(null, false, { message: "Error when fetching user data from DB" })
        })
}

passport.use(new LocalStrategy(authUser))
passport.serializeUser((user, done) => {
    if (!user || !user.id) {
        console.error("Error: User or user ID missing during serialization")
        return done(new Error("User or user ID missing during serialization"))
    }
    done(null, user.id)
})
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then( userRecord => {
            if (!userRecord) {
                console.error(`Error: User with ID ${id} not found during deserialization`)
                return done(new Error("User not found"), null)
            }
            return done(null, userRecord)
        })
        .catch(error => {
            console.error("Database error during deserialization:", error)
            return done(error, null)
        })
})


//API
server.get("/authCheck", (req, res) => {
    if (req.isAuthenticated()) {
        if (!req.user || !req.user.name) {
            console.error("Error: User or user name is missing during authentication check")
            return res.status(401).json({ user: null, message: "Problem with user authentication"})
        }
        return res.status(200).json({ user: req.user.name })
    } else {
        return res.status(401).json({ user: null, message: "Problem with user authentication" })
    }
})

server.post("/login", passport.authenticate('local'), (req, res) => {
    if (!req.user) {
        console.error("Error: User or temp password data is missing during login")
        return res.status(401).json({message: "Problem occured when login user"})
    }
    if (req.user.tempPassword) {
        return res.status(403).json({ message: "Password change is required" })
    }
    return res.status(200).json({ user: req.user.name })
})

server.post("/change-password", (req, res) => {
    const {username, password} = req.body || {}
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" })
    }
    User.findOneAndUpdate (
        { username: username}, 
        {password: password, tempPassword: false},
        { new: true, runValidators: true })
        .then ( userRecord => {
            if (!userRecord) {
                console.error (`User not found: ${username}`)
                return res.status(404).json({ message: 'User not found' })
            }
            return res.status(200).json({ message: "Password has been changed" })
        })
        .catch(error => {
            console.error ("DB error during password change: ", error)
            return res.status(500).json({ message: 'Problem occured when changing password' })
        })
})

server.post("/logout", (req, res) => {
    req.logout( err => {
        if (err) {
            console.error("Error during logout:", err)
            return res.status(500).json({ message: "Logout failed" })
        }
        req.session.destroy( err => {
            if (err) {
                console.error("Error destroying session:", err)
                return res.status(500).json({ message: "Session destruction failed" })
            }
            res.clearCookie('connect.sid')
            return res.status(200).json({ message: "Logged out successfully" })
        })
    })
})

server.get("/get-data/:status?",(req, res) => {
        const { status } = req.params || {}
        const filterOptions = status ? {status: status} : {}

        Property.find(filterOptions)
            .then( foundData => {
                if (!foundData) {
                    console.error(`Error happened when finding data status ${status}`)
                    return res.status(404).json({message: "Problem occured when fetching data"})
                }
                return res.status(200).json(foundData)
            })
            .catch((err) => {
                console.error("Error fetching data:", err)
                res.status(500).json({message: "Internal Server Error"})
            })
    })

server.get("/get-fulldata/:status?", async (req, res) => {
    const {status} = req.params
    const filterOptions = status ? {status: status} : {}

    try {
        // Fetch properties
        const foundProperties = await Property.find(filterOptions)
        if ( !foundProperties || !Array.isArray(foundProperties) ) {
            console.error(`No properties found for status: ${status}`)
            return res.status(404).json({ message: "Problem occured when fetching data" })
        }
        const responseData = await Promise.all(
            foundProperties.map( async (property) => {
                try {
                    // Fetch galleries
                    const foundGallery = await Gallery.find( {refObjectID: property._id} )
                    if ( !foundGallery || !Array.isArray(foundGallery) ) {
                        console.error(`No gallery found for property: ${property._id}`)
                        throw new Error ("Problem occurred when fetching data")
                    }
                    const preparedGallery = foundGallery.map( item => {
                            const base64File = item?.gallery?.content.toString("base64")
                            const fileForRendering = `data:image/jpeg;base64,${base64File}`
                            return {
                                imageID: item._id,
                                file: fileForRendering
                            }
                        })
                    return {
                        property: property,
                        gallery: preparedGallery
                    }
                } catch (galleryError) {
                    console.error("Error fetching data:", galleryError)
                    return {
                        property: property,
                        gallery: []
                    }
                }
            })
        )
        return res.status(200).json(responseData)
    } catch (error) {
        console.error("Error fetching data:", error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
})

server.patch("/update-property/:id",(req,res) => {
        const objectID = req.params.id
        const objectData = req.body

        if (!objectID || !objectData) {
            console.error("Error: Object id or object data is missing during updating")
            return res.status(400).json({message: "Problem occured when updating object"})
        }

        Property.findOneAndUpdate(
            {objectID: objectID}, 
            {...objectData}, 
            { new: true, runValidators: true }
        )
            .then (updatedObject => {
                return res.status(200).json(updatedObject)
            })
            .catch ( error => {
                console.error(`Error: Database error when updating property ${objectID}: `, error)
                return res.status(500).json({ message: "Internal Server Error" })
            })  
    })

server.get("/get-latest/:id", async (req,res) => {
    const {id} = req.params
    if (!id) {
        console.error("Error: Requested object id is missing")
        return res.status(400).json({message: "Problem occured when fetching data"})
    }
    try {
        const propertyRecord = await Property.findOne({objectID: id})
        if (!propertyRecord) {
            console.error("Error: Requested object id not found")
            return res.status(404).json({message: "Requested object not found"})
        }
        const foundGallery = await Gallery.find({refObjectID: propertyRecord._id})
        if (!foundGallery || !Array.isArray(foundGallery)) {
            console.error(`Error: Gallery for object id ${id} not found`)
            return res.status(200).json({
                propery: propertyRecord,
                gallery: []
            })
        }
        const preparedGallery = foundGallery.map( item => {
            const base64File = item.gallery.content.toString("base64")
            const fileForRendering = `data:image/jpeg;base64,${base64File}`
            return {
                imageID: item._id,
                file: fileForRendering
            }
        })
        const responseData = {
            property: propertyRecord,
            gallery: preparedGallery
        }
        return res.status(200).json(responseData)
    } catch (error) {
        console.error(`Error: Database error when fetching data or gallery for object id ${id}: `, error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
})

server.post ("/upload-image/:id", (req,res) => {
    const {id} = req.params
    if (!id) {
        console.error("Error: Requested object id is missing")
        return res.status(400).json({message: "Problem occured when fetching data"})
    }
    const formData = new formidable.IncomingForm({maxFileSize: 50 * 1024 * 1024})
    formData.parse(req, async (err, fields, files) => {
        if (err) {
            console.error(`Error: Parsing form data failed during file uploading for object id ${id}`, err)
            return res.status(500).json({ error: "Internal server error" })
        }
        if ( !files.file || !Array.isArray(files.file) ) {
            console.error(`Error: File data is missing or invalid during file uploading for object id ${id}`)
            return res.status(500).json({ error: "Internal server error" })
        }
        const {originalFilename, mimetype, size, filepath} = files.file[0]
        const fileContent = await fs.readFile(filepath)
        const bufferContent = Buffer.from(fileContent)
        if (!originalFilename || !mimetype || !size || !filepath) {
            console.error("Error: File data is missing")
            return res.status(400).json({message: "File uploading failed"})
        }
        try {
            const refObject = await Property.findOne({objectID: id})
            if (!refObject) {
                console.error(`Error: Object id ${id} not found`)
                return res.status(404).json({message: "Object not found"})
            }
            const galleryItem = {
                name: originalFilename,
                type: mimetype,
                size: size,
                content: bufferContent, // Binary content
            }
            Gallery.create ({
                refObjectID: refObject._id,
                gallery: galleryItem
            })
                .then( responseData => {
                    return res.status(200).json({imageID: responseData._id})
                })
                .catch (error => {
                    console.error("Problem occured when creating object: ", error)
                    return res.status(500).json({message: "File uploading failed"})
                })
        } catch (error) {
            console.error(`Error: Database error when uploading file for property ${id}: `, error)
            return res.status(500).json({ message: "Internal Server Error" })
        } 
    })
})

server.delete("/remove-image/:id", (req,res) => {           //error handling from this point
    const id = req.params.id
    Gallery.findByIdAndDelete(id)
    .then(() => {
        return res.status(200).json({message: "File was deleted"})
    }).catch(err => {
        return res.status(500).json({message: "File was not deleted due to error"})
    })
})

server.post("/create-object", (req,res) => {
    const formData = new formidable.IncomingForm
    formData.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(500).json({ error: "Data upload failed" })
        } 
        const maxIndex = await Property.aggregate([
            { $group: { _id: null, max: { $max: "$objectID" }}},
            { $project: { _id: 0, max: 1 }}
          ])

        let objectData
        try {
            objectData = Array.isArray(fields.objectData) && fields.objectData?.length === 1
                ? JSON.parse(fields.objectData[0])
                : JSON.parse(fields.objectData)

            Object.keys(objectData).forEach ( key => {
                if ( objectData[key] === "true" ) {
                    objectData[key] = true
                } else if ( objectData[key] === "false" ) {
                    objectData[key] = false
                }
            })
        } catch (parseError) {
            return res.status(400).json({ error: "Invalid JSON in objectData" })
        }
        const nextIndex = maxIndex?.length > 0 ? maxIndex[0].max + 1 : 1
        const newProperty = new Property ({...objectData, objectID: nextIndex})
        newProperty.save().then(() => {
            return res.status(200).json(newProperty)
        })       
    })
})

server.patch("/update-status/:id", (req,res) => {
    const id = req.params.id
    const formData = new formidable.IncomingForm()
    formData.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(500).json({ error: "Status upload failed" })
        }
        const newStatus = fields.newStatus
        Property.findOne( {objectID: id} )
        .then((property) => {
            const newLink = (property.status!=="Active" && newStatus === "Active") ?
                            "https://bloomproperties.co.uk/property-listing/" :              //update with real ones
                            undefined
            Property.findByIdAndUpdate(
                property._id, 
                {status: newStatus,
                link: link},
                { new: true, runValidators: true }
            ).then( (updatedRecord) => {
                if (updatedRecord) {
                    return res.status(200).json(updatedRecord)
                }
            }).catch (err => {})    //make it

        })
    })
})

server.get("/get-property-number/:status?", (req,res) => {
    const {status} = req.params
    const filterOptions = status ? {status: status} : {}

    Property.countDocuments(filterOptions)
        .then( result => {
            if (!result || !(typeof result === 'number')) {
                console.error(`Error: Failed to count records for status: ${status}`)
                return res.status(400).json({ message: "Problem occured when fetching data" })
            }
            return res.status(200).json({propNumber: result})
        })
        .catch (error => {
            return res.status(500).json({ message: "Internal Server Error" })
        })
})

    // Catch-all handler to serve Next.js pages
    server.all('*', (req, res) => {
        return handle(req, res)
    })

    const PORT = process.env.PORT || 3500;
    server.listen(PORT, () => {
        console.log(`> Ready on http://localhost:${PORT}`)
    })
})




  