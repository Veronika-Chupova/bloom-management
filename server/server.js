const express = require ("express")
const cors = require ("cors")
const formidable = require("formidable")
const fs = require("fs/promises")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const path = require("path")
const next = require('next')

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
            useUnifiedTopology: true,
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
    objectID: Number,
    status: String,
    link: String,
    address: String,
    postcode: String,
    letType: String,
    minimumTerm: String,
    propertyType: String,
    shared: String,
    parking: String,
    students: String,
    families: String,
    children: String,
    pets: String,
    bedrooms: Number,
    bathrooms: Number,
    furnishing: String,
    pricePPPW: Number,
    pricePCM: Number,
    deposit: Number,
    bills: String,
    availableDate: Date,
    description: String
})

//STATIC FILES ROOT
const root = path.join(__dirname, '../client/public')

//DB MODELS
const Gallery = mongoose.model("Gallery", gallerySchema)
const Property = mongoose.model("PropertyDetail", propertySchema)

app.prepare().then(() => {
    
    //GLOBAL MIDDLEWARE
server.use(express.static(root))
server.use(express.urlencoded({ extended: true }))
server.use(cors({
    origin: ['http://localhost:3000', 'https://bloom-management-e3a1f4b07ded.herokuapp.com'],            //modify
    credentials: true
}))
server.use(express.json())
server.use(express.static(root));

//API
server.get("/",(req, res) => {
        const preparedData = Property.find({})
        Property.find({})
            .then((preparedData) => {
                res.status(200).json(preparedData)
            })
            .catch((err) => {
                console.error("Error fetching data:", err)
                res.status(500).json({message: "Internal Server Error"})
            });
    })
server.patch("/update-property/:id",(req,res) => {
        const objectID = req.params.id
        const objectData = req.body

        Property.findOneAndUpdate({objectID: objectID}, {...objectData}, { new: true, runValidators: true })
            .then ((updatedObject) => {
                return res.status(200).json(updatedObject)
            })
            .catch ()   //make it
    })

server.get("/get-latest/:id", (req,res) => {
    const id = req.params.id
    Property.findOne({objectID: id})
    .then ((propertyRecord) => {
        if (propertyRecord) {
            Gallery.find({refObjectID: propertyRecord._id})
            .then ((galleryRecord) => {
                const preparedGallery = galleryRecord.map( item => {
                    const base64File = item.gallery.content.toString('base64')
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
            }). catch (err => {})    // make proper handling
        } else {
            return res.status(500).json("Object is not found")
        }
    }).catch (err => {})    // make proper handling
})

server.post ("/upload-image/:id", (req,res) => {
    const id = req.params.id
    const formData = new formidable.IncomingForm({maxFileSize: 50 * 1024 * 1024})
    formData.onPart = function (part) {
        const allowedTypes = ['image/png', 'image/jpeg']
    
        if (part.mime && !allowedTypes.includes(part.mime)) {
            console.error(`Unsupported file type: ${part.mime}`)
            return // Skip unsupported files
        }
    
        this.handlePart(part);
    };
    formData.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(500).json({ error: "File upload failed" })
        }
        form.onPart = function (part) {
            if (part.mime && !['image/png', 'image/jpeg', 'image/jpg', 'image/gif'].includes(part.mime)) {
                return this._error(new Error('Unsupported file type'));
            }
            this.handlePart(part);
        };
        const {originalFilename, mimetype, size, filepath} = files.file[0] // Extract first file
        const fileContent = await fs.readFile(filepath) // Read binary content
        const bufferContent = Buffer.from(fileContent)
        const refObject = await Property.findOne({objectID: id})
        const galleryItem = {
            name: originalFilename,
            type: mimetype,
            size: size,
            content: bufferContent, // Binary content
        }
        Gallery.create ({
            refObjectID: refObject._id,
            gallery: galleryItem
        }).then((responseData) => {
            return res.status(200).json({imageID: responseData._id})
        })
    })
})

server.delete("/remove-image/:id", (req,res) => {
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

    // Catch-all handler to serve Next.js pages
    server.all('*', (req, res) => {
        return handle(req, res)
    })

    const PORT = process.env.PORT || 3500;
    server.listen(PORT, () => {
        console.log(`> Ready on http://localhost:${PORT}`)
    })
})

// Deployment path
// const __dirname = path.dirname(fileURLToPath(import.meta.url))
// const root = path.join(__dirname, '..', 'client', 'build')
// const PORT = process.env.PORT || 3500
// dotenv.config()




// server.listen(PORT, () => {
//     console.log(`Example app listening on port ${PORT}`)
//   })


  