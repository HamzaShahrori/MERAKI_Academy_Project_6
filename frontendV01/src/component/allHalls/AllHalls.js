import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setHalls } from "../../reducer/halls/index";
import { useNavigate } from "react-router-dom";

const AllHalls = ({num,setNum,search}) => {

  const [message,setMessage] = useState("")

  const state = useSelector((state) => {
    return {
      halls: state.hallsReducer.halls,
    };
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //
  const getAllHalls = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/page`,
        // { headers: { Authorization: `Bearer ${state.token}` } }
      );

if (!res.data.success){
   if (num == 0 ){
     setNum(num+1)
   } else {
     setNum(num-1)
   }
}

      if (res.data.success) {
        dispatch(setHalls(res.data.result));
      }
    } catch (error) {

if (error){
   if (num ==0){
     setNum(num +1)
   } else {
     setNum(num-1)
   }
}

      if (!error) {
        return setMessage(error.response.data.message);
      }
    }
  };

  const getHallByAddress = async () =>{

    try {
     const res = await axios.get(`http://localhost:5000/halls/page/hall_address/?page=1&hall_address=Amman`, { headers: { Authorization: `Bearer ${state.token}` } }
     )

if (!res.data.success){
if (num == 0){
  setNum(num + 1)
} else {
  setNum(num - 1)
}
}


if (res.data.success){
  dispatch(setHalls(res.data.result))
}

     
    } catch (error) {
      
        if (num == 0){
          setNum (num + 1)
        } else {
          setNum (num - 1)
        }
      

if (!error){
  return setMessage(error.response.data.message)
}

    }
  
  }

useEffect(()=>{

})


useEffect(()=>{
  
})



  return (
    <>
      {state.halls &&
        state.halls.filter((hallinfo)=>{

        if (search = "") {
          return hallinfo
        } else if (hallinfo.hall_address.toLowerCase().includes(search.toLowerCase()) || hallinfo.hall_name.toLowerCase().includes(search.toLowerCase())){

         return hallinfo
        }



        }).map((element, i) => {
          <div key={i}></div>;
        })}

{num == 1 ? <></> 

: 
<a onClick={()=>{
 setNum ( num - 1) 
}}>

<span>BACK</span>
</a>

}

{num == 1 ? <a onClick={()=>{
 setNum( num + 1 )
}}> 
<span>Next</span>

</a> :
<> </>


}


    </>
  );
};
export default AllHalls;
