import { useState, useEffect } from "react";
import "./styles.css";
import { db } from "./firebase-config";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    doc,
    deleteDoc
} from "@firebase/firestore";
import { ToastContainer, toast } from "react-toastify";

export default function App() {
    const [newName, setNewName] = useState("");
    const [newAge, setNewAge] = useState(0);
    const [users, setUsers] = useState([]);
    const userCollectionRef = collection(db, "users");

    const createUser = async () => {
        await addDoc(userCollectionRef, { name: newName, age: Number(newAge) });
        // alert("added successfully");
        toast.success("🦄 Wow so easy!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
        });
    };

    const updateUser = async (id, age) => {
        const userDoc = doc(db, "users", id);
        const newFields = { age: age + 1 };
        await updateDoc(userDoc, newFields);
        toast.info("Info Notification !", {
            position: toast.POSITION.BOTTOM_CENTER
        });
    };

    const deleteUser = async (id) => {
        const userDoc = doc(db, "users", id);
        await deleteDoc(userDoc);
        toast.error("Error Notification !", {
            position: toast.POSITION.TOP_LEFT
        });
    };

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(userCollectionRef);
            console.log(data);
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getUsers();
    }, []);

    return (
        <>
            <div className="App">
                <input
                    placeholder="Name....."
                    onChange={(event) => {
                        setNewName(event.target.value);
                    }}
                />
                <input
                    type="number"
                    placeholder="Age....."
                    onChange={(event) => {
                        setNewAge(event.target.value);
                    }}
                />

                <button onClick={createUser}>Create User</button>
                {users.map((user) => {
                    return (
                        <div>
                            <h1>Name: {user.name}</h1>
                            <h1>Age: {user.age}</h1>
                            <button
                                onClick={() => {
                                    updateUser(user.id, user.age);
                                }}>
                                {" "}
                                Increase Age{" "}
                            </button>
                            <button
                                onClick={() => {
                                    deleteUser(user.id);
                                }}>
                                {" "}
                                Delete{" "}
                            </button>
                        </div>
                    );
                })}
            </div>
            <ToastContainer />
        </>
    );
}
