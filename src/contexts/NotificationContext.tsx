import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import { getNotificationsAPI } from "../services/notifications";
import { io, Socket } from "socket.io-client";

interface Notification {
  id: string;
  title: string;
  content: string;
  userId: string;
  read: boolean;
  time: Date;
}

interface NotificationContextType {
  notifications: Notification[];
  fetchNotifications: () => void;
  markAsRead: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Simulated user - replace with actual authentication
    const user = {
        _id: "673ff3e1223a09365a7c5673",
        lastName: "teacher@gmail.com",
        firstName: "hello",
        avatar: "haha",
        email: "aa",
        role: "aa",
    };
    
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const socketRef = useRef<Socket | null>(null);
    const hasFetchedRef = useRef(false);

    // Memoized fetch notifications with improved real-time handling
    const fetchNotifications = useCallback(async () => {
        if (hasFetchedRef.current || !user?._id) return;
        
        try {
            hasFetchedRef.current = true;
            const fetchedNotifications = await getNotificationsAPI(user._id);
            setNotifications(fetchedNotifications);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        } finally {
            // Allow future fetches after a delay
            setTimeout(() => {
                hasFetchedRef.current = false;
            }, 5 * 60 * 1000); // 5 minutes cooldown
        }
    }, [user?._id]);

    // Setup socket connection
    const setupSocketConnection = useCallback(() => {
        // Disconnect existing socket if any
        if (socketRef.current) {
            socketRef.current.disconnect();
        }

        // Create new socket connection
        const newSocket = io("http://localhost:8080");
        
        // Join user-specific room
        newSocket.emit("join", user._id);

        // Listen for new notifications
        newSocket.on("new-notification", (notification: Notification) => {
            setNotifications((prevNotifications) => {
                // Prevent duplicate notifications
                const isDuplicate = prevNotifications.some(
                    (existingNotif) => existingNotif.id === notification.id
                );

                if (isDuplicate) return prevNotifications;

                // Add new notification to the beginning of the list
                return [notification, ...prevNotifications];
            });
        });

        // Store socket reference
        socketRef.current = newSocket;

        return () => {
            newSocket.disconnect();
        };
    }, [user._id]);

    // Mark notification as read
    const markAsRead = useCallback((id: string) => {
        setNotifications((prev) =>
            prev.map((notif) =>
                notif.id === id ? { ...notif, read: true } : notif
            )
        );
        // TODO: Implement API call to mark notification as read
    }, []);

    // Initial setup and socket connection
    useEffect(() => {
        if (user?._id) {
            // Fetch initial notifications
            fetchNotifications();

            // Setup socket connection
            const cleanup = setupSocketConnection();

            // Cleanup socket on component unmount
            return () => {
                cleanup();
            };
        }
    }, [user?._id, fetchNotifications, setupSocketConnection]);

    return (
        <NotificationContext.Provider
            value={{ 
                notifications, 
                fetchNotifications, 
                markAsRead 
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotification must be used within a NotificationProvider");
    }
    return context;
};

export default NotificationProvider;