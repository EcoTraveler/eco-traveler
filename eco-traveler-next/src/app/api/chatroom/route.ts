// import { Server } from "socket.io";
// import { NextApiRequest, NextApiResponse } from "next";
// import { database } from "@/db/config"; // Update this path
// import { ObjectId } from "mongodb";

// const ioHandler = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (res.socket && !(res.socket as any).server.io) {
//     console.log("Setting up socket.io");

//     const io = new Server((res.socket as any).server);
//     (res.socket as any).server.io = io;

//     io.on("connection", (socket) => {
//       console.log("A user connected");

//       socket.on("message", async (msg) => {
//         try {
//           const { clerkId, planningId, message } = msg;

//           // Verify user is part of the planning
//           const plannerUser = await database
//             .collection("PlannerUsers")
//             .findOne({
//               clerkId,
//               planningId: new ObjectId(planningId),
//             });

//           if (!plannerUser) {
//             socket.emit("error", "User is not part of this planning");
//             return;
//           }

//           // Save message to database
//           const savedMessage = await database
//             .collection("Discussions")
//             .insertOne({
//               clerkId,
//               planningId: new ObjectId(planningId),
//               message,
//               createdAt: new Date(),
//             });

//           // Emit message to all clients
//           io.emit("message", {
//             _id: savedMessage.insertedId,
//             clerkId,
//             planningId,
//             message,
//             createdAt: new Date(),
//           });
//         } catch (error) {
//           console.error("Error saving message:", error);
//           socket.emit("error", "Failed to save message");
//         }
//       });

//       socket.on("disconnect", () => {
//         console.log("A user disconnected");
//       });
//     });
//   }
//   res.end();
// };

// export default ioHandler;
