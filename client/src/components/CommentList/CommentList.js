import React, {useState, useEffect} from 'react'
import axios from 'axios';

export default function CommentList() {
  const[comments, setComments] = useState([]);
  const[currentPage, setCurrentPage] = useState(1);


  const getComments = async (page =1, pageSize = 3) => {
    try {
        const res = await axios.get(`http://localhost:3000/api/comments/paging?page=${page}&pageSize=${pageSize}`);

        console.log("the response is ", res);
        if(res.status == 200){
            console.log("it worked out I got the data");
            setComments(res.data)
        }


    } catch (error) {
        console.log("error happened", error)
    }
  }
  //onclick previous page button
  const onPreviousPage = () => {
    const previousPage = currentPage - 1;

    if(previousPage < 1){
        setCurrentPage(1)
    } 
    else {
        setCurrentPage(previousPage);
        getComments(previousPage);
    }
  }
  //onclick next page button
  const onNextPage = () => {
    const nextPage = currentPage + 1;

    setCurrentPage(nextPage);
    getComments(nextPage);
  }

  useEffect(() =>{
    //load the comments when the component renders
    getComments();
  },[])

  return (
    <>
     <div>CommentList</div>
     <div className="row">
        <div class="col">
            <button className="btn btn-primary" onClick={onPreviousPage}>Previous page</button>
            &nbsp;&nbsp;
            <button className="btn btn-primary" onClick={onNextPage}>Next page</button>

        </div>
     </div>

     {comments.map((comment,index) => {
        return (
            <div className="col" key={index}>
                <div className='card'>
                    <div className='card-body'>
                        <h5 className='card-title'>{comment.name}</h5>
                        <p className='card-text'>
                            {comment.text}
                        </p>
                    </div>
                    <a href="#" className='btn btn-primary'>Read message</a>
                </div>
            </div>

        )
     })}
    </>
   
    
  )
}
