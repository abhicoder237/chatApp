import {create} from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"
import { useAuthStore } from  "../Store/useAuthStore"
 

export const useChatStore = create((set , get) => ({
  messages : [],
    users : [],
    selectedUsers : false ,
    isUserLoading : false,
    isMeaasageLoading : false,
     


    getUsers : async ()=>{
        set({isUserLoading : true})

        try {
            const res = await axiosInstance.get('/messages/users')
            set({users: res.data})
        } catch (error) {
            console.log(error)
            toast.error(error.response.message) 
        }finally{
            isUserLoading : false 
        }
    },

    getMessages : async (userId)=>{
        set({isMeaasageLoading : true})
      try {
        const res = await axiosInstance.get(`/messages/${userId}`)
        set({messages: res.data})
      } catch (error) {
        console.log(error)
      
      }finally{
        isMeaasageLoading : false
      }
    },

    sendMessage: async (messageData) => {
      const { selectedUsers, messages } = get();
      try {
        const res = await axiosInstance.post(`/messages/send/${selectedUsers._id}`, messageData);
        set({ messages: [...messages, res.data] });
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
  
    subscribeToMessages: () => {
      const { selectedUsers } = get();
      if (!selectedUsers) return;
  
       
  
      socket.on("newMessage", (newMessage) => {
        const isMessageSentFromSelectedUser = newMessage.senderId === selectedUsers._id;
        if (!isMessageSentFromSelectedUser) return;
  
        set({
          messages: [...get().messages, newMessage],
        });
      });
    },
  
    unsubscribeFromMessages: () => {
      const socket = useAuthStore.getState().socket;
      socket.off("newMessage");
       
    },
  
    setSelectedUser: (selectedUsers) => set({ selectedUsers }),
}))