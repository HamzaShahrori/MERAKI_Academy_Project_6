import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setHalls} from "../../reducer/halls/index";


const Address = ({num,setNum,place,searchHall})=>{
  const [message,setMessage] = useState("")


  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      halls: state.hallsReducer.halls,
    };
  });

  const dispatch = useDispatch();

  console.log(place);

    const getHallByAddress = async () => {
        try {
          const res = await axios.get(
            `http://localhost:5000/halls/page/hall_address/?page=${num}&hall_address=${place}`,
            { headers: { Authorization: `Bearer ${state.token}` } }
          );
    
          if (!res.data.success) {
            if (num == 0) {
              setNum(num + 1);
            } else {
              setNum(num - 1);
            }
          }
    

          if (res.data.success) {
              console.log(res.data.result);
              console.log(place);
            dispatch(setHalls(res.data.result));
          }
        } catch (error) {
          if (num == 0) {
            setNum(num + 1);
          } else {
            setNum(num - 1);
          }
    
          if (!error) {
            return setMessage(error.response.data.message);
          }
        }
      };

useEffect(()=>{
  getHallByAddress()
},[])

console.log(state.halls);
      return (
          <>
    {state.halls &&
        state.halls
          .filter((hallinfo) => {
            if (searchHall == "") {
              return hallinfo;
            } else if (
              hallinfo.hall_address
                .toLowerCase()
                .includes(searchHall.toLowerCase()) ||
              hallinfo.hall_name
                .toLowerCase()
                .includes(searchHall.toLowerCase())
            ) {
              console.log("after", searchHall); //

              return hallinfo;
            }
          })

          .map((element, i) => (
            <>
              <br />
              <br />
              <div key={i}>
                {/* <img src={element.hall_image}></img>
              <p>{element.hall_name}</p>
              {/* <video src={element.video}></video> */}
                <video width="320" height="240" controls>
                  <source src={element.video} type="video" />
                </video>
                <p>{element.hall_description}</p>
                <p>{element.price}</p>
                <p>{element.discount}%</p>
                <p>{element.PriceBeforeDiscount}</p>
               </div>

               {num == 1 ? (
        <></>
      ) : (
        <a
          onClick={() => {
            setNum(num - 1);
          }}
        >
          <span>BACK</span>
        </a>
      )}

      {num == 1 ? (
        <a
          onClick={() => {
            setNum(num + 1);
          }}
        >
          <span>Next</span>
        </a>
      ) : (
        <> </>
      )}


            </>
          ))}








          </>
      )


}

export default Address;