import { db } from "./firebase.js";
import { collection, addDoc, onSnapshot, Timestamp, query, where, orderBy } from "firebase/firestore";

export function Chatroom(room,username){

    let curroom = room;
    let curuser = username;
    const dbRef = collection(db,'chats');
    let unsubscribe = null;

    const addChat = async (message)=>{
        const now = new Date();

        const chatdata = {
            username:curuser,
            room:curroom,
            message,
            created_at:Timestamp.fromDate(now)
        };

        try{
            const response = await addDoc(dbRef,chatdata);
            return response;
        }catch(err){
             console.log("Error addchat =",err);
             throw err;
        }
    }

    const getChats =  (callback)=>{

        // console.log(callback);

        if(unsubscribe){
            unsubscribe();
        }

        unsubscribe = onSnapshot(
            query(dbRef,where('room',"==",curroom),orderBy('created_at'))
            ,(docSnap)=>{

            docSnap.docChanges().forEach(item=>{
                // console.log(item.doc.data());

                if(item.type === "added"){
                    callback(item.doc.data());
                }

            });
        });

    }

    const updateChatroom = (newroom)=>{
        curroom = newroom;

        console.log(`room changed to ${curroom}`);
    }

    const updateUsername =  (newusername)=>{
        curuser = newusername;
        localStorage.setItem('username',curuser); 

        console.log(`username changed to ${curuser}`);

    }

    return {addChat,updateChatroom,getChats,updateUsername};
}