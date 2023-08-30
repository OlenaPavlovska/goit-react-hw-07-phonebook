import {createSlice} from '@reduxjs/toolkit'
import { fetchContact,addContact, deleteContact  } from './operations'

const initialState = {
    contacts:{
        items:[],
        isLoading:false,
        error:null
    },filter:''
}

const handlePending=(state)=> {
state.isLoading= true
state.error= ''
}


const handleRejected = (state,action)=>{
    state.isLoading= true
    state.error = action.payload
}

const handleFulfilled = (state)=>{
    state.isLoading = false
}

 const fetchAllContacts= (state,{payload})=>{
    state.isLoading= false
    state.items = payload.items
}

const addContactsFulfilled = (state,{payload})=>{
state.items.push(payload)
}

const deleteContactsFulfilled = (state,{payload})=>{
    state.items = state.items.filter(contact=> contact.id !==payload.id)
}


const contactsSlice = createSlice({
name: 'contacts',

initialState,
reducers: {
   updateFilter:(state,action)=>{
state.filter= action.payload
    }
},

extraReducers: (builder) => {
    builder
      .addCase(fetchContact.fulfilled, fetchAllContacts)
      .addCase(addContact.fulfilled, addContactsFulfilled)
      .addCase(deleteContact.fulfilled, deleteContactsFulfilled)
    .addMatcher(
				(action) => action.type.endsWith('/pending'),
				handlePending
			)
			.addMatcher(
				(action) => action.type.endsWith('/rejected'),
				handleRejected
			)
			.addMatcher(
				(action) => action.type.endsWith('/fulfilled'),
				handleFulfilled
			)
  }
})

export const {updateFilter}= contactsSlice.actions

export default contactsSlice.reducer