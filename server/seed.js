import mongoose from "mongoose";
import PostMessage from "./models/postMessage.js";

const posts = [
  {
    title: "Sunset at the Beach",
    creator: "Emma Johnson",
    message: "One of the most beautiful sunsets I've ever seen.",
    tags: ["travel", "beach", "sunset"],
    selectedFile: "https://picsum.photos/id/10/800/600",
    likeCount: 12,
  },
  {
    title: "Morning Coffee",
    creator: "Noah Smith",
    message: "Nothing beats a hot cup of coffee on a rainy morning.",
    tags: ["coffee", "lifestyle"],
    selectedFile: "https://picsum.photos/id/20/800/600",
    likeCount: 8,
  },
  {
    title: "Mountain Adventure",
    creator: "Sophia Lee",
    message: "Reached the summit after a long hike. Worth every step!",
    tags: ["hiking", "nature", "mountains"],
    selectedFile: "https://picsum.photos/id/30/800/600",
    likeCount: 24,
  },
  {
    title: "City Nights",
    creator: "Liam Brown",
    message: "The skyline looks magical after dark.",
    tags: ["city", "night"],
    selectedFile: "https://picsum.photos/id/40/800/600",
    likeCount: 15,
  },
  {
    title: "Gaming Weekend",
    creator: "Olivia Davis",
    message: "Spent the weekend finishing my favorite RPG!",
    tags: ["gaming", "fun"],
    selectedFile: "https://picsum.photos/id/50/800/600",
    likeCount: 19,
  },
  {
    title: "My Cute Puppy",
    creator: "James Wilson",
    message: "Meet the newest member of our family 🐶",
    tags: ["pets", "dog"],
    selectedFile: "https://picsum.photos/id/60/800/600",
    likeCount: 31,
  },
  {
    title: "Delicious Homemade Pizza",
    creator: "Mia Anderson",
    message: "Tried making pizza from scratch today!",
    tags: ["food", "pizza", "cooking"],
    selectedFile: "https://picsum.photos/id/70/800/600",
    likeCount: 17,
  },
  {
    title: "Cherry Blossoms",
    creator: "Ethan Thomas",
    message: "Spring is finally here and the blossoms are stunning.",
    tags: ["spring", "flowers"],
    selectedFile: "https://picsum.photos/id/80/800/600",
    likeCount: 14,
  },
  {
    title: "Road Trip",
    creator: "Ava Martinez",
    message: "Driving through the countryside with friends.",
    tags: ["travel", "roadtrip"],
    selectedFile: "https://picsum.photos/id/90/800/600",
    likeCount: 20,
  },
  {
    title: "Workspace Goals",
    creator: "Benjamin Taylor",
    message: "Finally organized my desk for maximum productivity.",
    tags: ["workspace", "coding", "setup"],
    selectedFile: "https://picsum.photos/id/100/800/600",
    likeCount: 9,
  },
  {
    title: "Forest Escape",
    creator: "Charlotte White",
    message: "A peaceful walk through the woods clears the mind.",
    tags: ["forest", "nature"],
    selectedFile: "https://picsum.photos/id/110/800/600",
    likeCount: 22,
  },
  {
    title: "Street Photography",
    creator: "Lucas Harris",
    message: "Captured some amazing moments in the city today.",
    tags: ["photography", "street"],
    selectedFile: "https://picsum.photos/id/120/800/600",
    likeCount: 16,
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/memories");

    console.log("✅ Connected to MongoDB");

    await PostMessage.insertMany(posts);
    console.log(`🎉 ${posts.length} posts inserted successfully`);

    mongoose.connection.close();
  } catch (error) {
    console.error(error);
    mongoose.connection.close();
  }
}

seedDatabase();
