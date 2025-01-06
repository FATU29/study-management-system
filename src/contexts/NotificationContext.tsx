import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import { getNotificationsAPI } from "../services/notifications";
import io, { Socket } from "socket.io-client";

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

export const useNotificationContext = () => {
    const context = useContext(NotificationContext);
    if (!context) {
      throw new Error('useNotificationContext must be used within a NotificationProvider');
    }
    return context;
};
const user = {
    _id: "673ff3e1223a09365a7c5673",
};

const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [notifications, setNotifications] = useState<Notification[]>([]);
    type Socket = any;
    const socketRef = useRef<Socket | null>(null);

    // Memoized fetch notifications with improved real-time handling
    const fetchNotifications = useCallback(async () => {
        try {
            const fetchedNotifications = await getNotificationsAPI(user._id);
            setNotifications(fetchedNotifications);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        } 
    }, []);

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
    const baseUrl = "http://localhost:8080";
    useEffect(() => {
        if (user?._id) {
            fetchNotifications();
    
            // Setup socket connection
            const newSocket = io(baseUrl);
    
            // Join user-specific room
            newSocket.on('connect', () => {
                console.log('Socket connected successfully');
                newSocket.emit("join", user._id);
            });
    
            // Listen for new notifications
            newSocket.on("new-notification", (notification: Notification) => {
                console.log("New notification received:", notification);
                setNotifications((prevNotifications) => {
                    const isDuplicate = prevNotifications.some(
                        (existingNotif) => existingNotif.id === notification.id
                    );
                    if (isDuplicate) return prevNotifications;

                    return [notification, ...prevNotifications];
                });
            });
    
            socketRef.current = newSocket;
    
            return () => {
                newSocket.disconnect();
            };
        }
    }, [fetchNotifications]); 
    
    return (
        <NotificationContext.Provider
            value={{notifications, fetchNotifications, markAsRead}}>
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