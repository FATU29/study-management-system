import React, { createContext, useContext, useEffect, useState } from "react";
import { getNotificationsAPI } from "../services/notifications"; // Your API call function
import { useAuth } from "./AuthContext";
import { io, Socket } from "socket.io-client";

interface Notification {
  id: string;
  title: string;
  timestamp: string;
  read: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  fetchNotifications: () => void;
  markAsRead: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  // Fetch notifications
  const fetchNotifications = async () => {
    if (!user) return;
    try {
        if (user._id !== undefined) {
          const response = await getNotificationsAPI(user._id);
          setNotifications(response.data);
        }
    } catch (error) {
        console.error("Error fetching notifications:", error);
    }
  };

  // Mark notification as read
  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    // Optionally, send an API request to update the server
  };

  useEffect(() => {
    if (user) {
      fetchNotifications();

      // Connect to socket.io
      const newSocket = io("http://your-backend-url.com"); // Replace with your backend URL
      newSocket.emit("join", user._id); // Join a specific room or namespace
      setSocket(newSocket);

      // Listen for real-time notifications
      newSocket.on("new-notification", (notification: Notification) => {
        setNotifications((prev) => [notification, ...prev]);
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [user]);

  return (
    <NotificationContext.Provider
      value={{ notifications, fetchNotifications, markAsRead }}
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
