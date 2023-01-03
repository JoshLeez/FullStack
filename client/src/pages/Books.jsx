import { useState, useEffect } from "react"
import axios from 'axios';
import { Link } from "react-router-dom";

const Books = () => {
    const [books, setBooks] = useState([])

useEffect(()=>{
    const fetchAllBooks = async()=>{
        try{
            const res = await axios.get("http://localhost:8800/books");
            setBooks(res.data)
           console.log(res.data)
        }catch(err){
            console.log(err)
        }
    }
    fetchAllBooks() 
},[])

const handleDelete = async (id)=>{
    try{
     await axios.delete(`http://localhost:8800/books/${id}`)
     window.location.reload()
    }catch(err){
        console.log(err)
    }
}

  return (
    <div>
        <h1>Josh book Shop</h1>
        <div className="books">
            {books.map(book =>(
             <div className="book" key={book.id}>
                {book.cover && <img src={book.cover} alt=""/>}
                <h2>{book.title}</h2>
                <p>{book.description}</p>
                <span>{book.price}</span>
                <button className="delete" onClick={()=>handleDelete(book.id)}>Delete</button>
                <Link className="update" to={`/update/${book.id}`}>Update</Link>
             </div>
            ))}
        </div>
        <Link to="/add">Add New Book</Link>
    </div>
  )
}

export default Books