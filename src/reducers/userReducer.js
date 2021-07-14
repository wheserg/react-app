
export const userData = (state = [], action) => {

    switch (action.type) {
        case 'FETCH_USUARIO':
            let userData = []
            action.payload.map((val,index) => {
                if(val){
                    userData.push(
                        {
                            bookingId:val.bookingId,
                            firstName:val.tutenUserClient.firstName,
                            lastName:val.tutenUserClient.lastName,
                            bookingTime:val.bookingTime,
                            streetAddress:val.locationId.streetAddress,
                            bookingPrice:val.bookingPrice
    
                        }
                    )
                }
            })
  
            state = {
                ...state,
                data:userData
            }
            return state;
           
        case 'CLEAR_ALL':
                return [];
        default:
            return state;
    }    
};

