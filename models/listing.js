// // const mongoose = require("mongoose");
// // const Schema = mongoose.Schema;
// // const Review = require("./review.js");

// // const listingSchema = new Schema({
// //     title: {
// //         type: String,
// //         required: true,
// //     },
// //     description: String,
// //     image: { 
// //         type: String,
// //         default: "https://unsplash.com/photos/a-woman-taking-a-picture-of-a-crowded-beach-wqOCvdDimFE",
// //         set: (v) => 
// //             v === ""
// //         ? "https://unsplash.com/photos/a-woman-taking-a-picture-of-a-crowded-beach-wqOCvdDimFE" 
// //         : v,
// //     },
// //     price: Number,
// //     location: String,
// //     country: String,
// //     reviews: [
// //         {
// //          type: Schema.Types.ObjectId,
// //          ref: "Review",   
// //         },
// //     ],
// // });

// // listingSchema.post("findOneAndDelete", async (listing) => {
// //     if (listing) {
// //         await Review.deleteMany({ _id: { $in: listing.reviews } });
// //     } 
// // });

// const Listing = mongoose.model("Listing", listingSchema);
// module.exports = Listing;


// const mongoose = require("mongoose");
// const Listing = require("../models/listing");
// const sampleListings = require("./data").data; // data.js से import

// // MongoDB Connect
// mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
//     .then(() => {
//         console.log("MongoDB Connected");
//     })
//     .catch(err => {
//         console.log("DB Connection Error:", err);
//     });

// // Seed Function
// const initDB = async () => {
//     try {
//         await Listing.deleteMany({});
//         await Listing.insertMany(sampleListings);
//         console.log("✅ Sample Data Inserted Successfully");
//     } catch (err) {
//         console.log("❌ Error inserting data:", err);
//     } finally {
//         mongoose.connection.close();
//     }
// };

// initDB();


const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    image: { 
        type: String,
        default: "https://unsplash.com/photos/a-woman-taking-a-picture-of-a-crowded-beach-wqOCvdDimFE",
        set: (v) => v === "" ? "https://unsplash.com/photos/a-woman-taking-a-picture-of-a-crowded-beach-wqOCvdDimFE" : v,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    } 
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

