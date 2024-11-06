import { Server as ServerIO } from 'socket.io';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

import { Socket } from 'net';

interface ExtendedNextApiResponse extends NextApiResponse {
    socket: Socket & {
        server: {
            io?: ServerIO;
        };
    };
}

interface MessageData {
    planId: string;
    message: string;
}

export async function GET(req: NextApiRequest, res: ExtendedNextApiResponse): Promise<void> {
    // Check if `res.socket` and `res.socket.server` exist
    if (!res.socket || !res.socket.server) {
        return res.status(500).json({ error: 'Server socket is not available' });
    }

    if (!res.socket.server.io) {
        console.log("Initializing Socket.IO server...");
        const io = new ServerIO(res.socket.server as any, {
            path: '/api/socket/io',
        });

        io.on('connection', (socket) => {
            console.log("Client connected:", socket.id);

            socket.on('join-room', (planningId: string) => {
                socket.join(planningId);
            });

            socket.on('send-message', (data: MessageData) => {
                io.to(data.planId).emit('receive-message', data);
            });
        });

        res.socket.server.io = io;
    } else {
        console.log("Socket.IO server already initialized.");
    }

    res.end();
}
