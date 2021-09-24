import { Avatar, IconButton, Button } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';
import * as EmailValidator from 'email-validator';
import { auth, db } from '../firebase';
import { signOut } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, doc, addDoc, getDoc, query, where } from "firebase/firestore";


function Sidebar() {
    const [user] = useAuthState(auth);
    // console.log(collection)

    // https://cloud.google.com/firestore/docs/query-data/get-data
    const docRef = doc(db, "users", "chats");
    const docSnap = getDoc(docRef);
    console.log(docSnap)

    // const q = query(collection(db, "chats"), where('users', 'array-contains', 'user.email'));
    // console.log('.....', q)
    // const querySnapshot = getDocs(q);
    // console.log('//////', querySnapshot);
    // const [chatsSnapshot] = useCollection(querySnapshot)
    // querySnapshot.forEach((doc) => {
    //     // doc.data() is never undefined for query doc snapshots
    //     console.log(doc.id, " => ", doc.data());
    // });




    // const usersChatRef = collection(db, 'users');
    // const q = query(usersChatRef, where('users', 'array-contains', 'user.email'));
    // console.log('>>>>', q);

    // const querySnapshot = getDocs(q);
    // console.log('++++++', querySnapshot);
    // // querySnapshot.forEach((doc) => {
    // //     // doc.data() is never undefined for query doc snapshots
    // //     console.log(doc.id, " => ", doc.data());
    // // });





    // const [chatsSnapshot] = useCollection(q)
    // console.log('>>>>>',chatsSnapshot)

    // const usersCollectionRef = collection(db, 'users');
    // console.log(usersCollectionRef)
    // const docRef = doc(db, "chats", user.email);
    // const docSnap = getDoc(docRef);
    // console.lo(docSnap)

    // const userChatRef = collection('chats').where('users', 'array-contains', user.email);
    // console.log(userChatRef);

    const createChat = () => {
        const input = prompt('Please enter an email address for the user you wish to chat with');

        if (!input) return null;

        const isNotMyEmail = input !== user.email;
        if (EmailValidator.validate(input) && isNotMyEmail) {
            //we need to add the chat into the DB 'chat' collection 
            addDoc(collection(db, "chats"), {
                users: [user.email, input]
            });
            // db.collection('chats').add({
            //     users: [user.email, input],
            // })
        }

    }

    // const chatAlreadyExists = (recipientEmail) => {
    //     chatsSnapshot?.docs.find
    // }


    return (
        <Container>
            <Header>
                <UserAvatar onClick={() => signOut(auth)} />
                <IconContainer>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </IconContainer>
            </Header>
            <Search>
                <SearchIcon />
                <SerachInput placeholder="Search in chats" />
            </Search>
            <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>
        </Container>
    )
}

export default Sidebar

const Container = styled.div``;

const Header = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height:80px;
    border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
    cursor: pointer;

    :hover{
        opacity:0.8;
    }
`;

const IconContainer = styled.div``;

const Search = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 2px;
`;
const SerachInput = styled.input`
    outline-width: 0;
    border: none;
    flex: 1;
`;

const SidebarButton = styled(Button)`
width:100%;

&&&{
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
}
`;