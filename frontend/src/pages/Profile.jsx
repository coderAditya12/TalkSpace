import React, { useState, useEffect } from "react";
import styles from "./Profile.module.css";
import Swal from "sweetalert2";

const mockData = {
    user: {
        name: "John Doe",
        email: "john.doe@example.com",
        createdAt: "2023-01-15T08:00:00.000Z",
        avatar: "https://api.dicebear.com/7.x/personas/svg?seed=john&backgroundColor=b6e3f4&radius=50",
    },
    meetings: [
        {
            id: 1,
            title: "Project Kickoff Meeting",
            date: "2024-01-10T10:00:00.000Z",
            description: "Initial meeting to discuss project scope and timeline with the development team."
        },
        {
            id: 2,
            title: "Sprint Planning",
            date: "2024-01-15T14:30:00.000Z",
            description: "Quarterly sprint planning session with stakeholders and team members."
        },
        {
            id: 3,
            title: "Client Presentation",
            date: "2024-01-20T09:00:00.000Z",
            description: "Final presentation of the new feature set to the client."
        }
    ]
};

const Profile = () => {
    const [user, setUser] = useState(null);
    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
        // Show loading immediately
        Swal.fire({
            title: 'Loading...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });

        // Simulate API call with setTimeout
        const fetchProfileData = () => {
            setTimeout(() => {
                try {
                    setUser(mockData.user);
                    setMeetings(mockData.meetings);
                    Swal.close(); // Close loading dialog on success
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Failed to load profile data.",
                        confirmButtonColor: "#3085d6",
                    });
                }
            }, 1000); // Simulate 1 second loading time
        };

        fetchProfileData();
    }, []);

    if (!user) {
        return null;
    }

    return (
        <div className="root">
            <div className={styles.container}>
                <div className={styles.profileCard}>
                    <div className={styles.profileHeader}>
                        <div className={styles.avatarContainer}>
                            <img
                                src={user.avatar}
                                alt="Profile"
                                className={styles.avatar}
                                onError={(e) => {
                                    e.target.src = 'https://api.dicebear.com/7.x/personas/svg?seed=fallback&backgroundColor=b6e3f4&radius=50';
                                }}
                            />
                        </div>
                        <h1 className={styles.userName}>{user.name}</h1>
                        <p className={styles.userEmail}>{user.email}</p>
                        <p className={styles.joinDate}>
                            Member since {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <div className={styles.meetingsCard}>
                    <h2 className={styles.meetingsTitle}>Meetings History</h2>
                    {meetings.length > 0 ? (
                        <div className={styles.meetingsList}>
                            {meetings.map((meeting) => (
                                <div key={meeting.id} className={styles.meetingItem}>
                                    <div className={styles.meetingHeader}>
                                        <h3 className={styles.meetingTitle}>{meeting.title}</h3>
                                        <span className={styles.meetingDate}>
                                            {new Date(meeting.date).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className={styles.meetingDescription}>{meeting.description}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.noMeetings}>
                            <p>No meetings attended yet</p>
                        </div>
                    )}
                </div>
            </div></div>
    );
};

export default Profile;