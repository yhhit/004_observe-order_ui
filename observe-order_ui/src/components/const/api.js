const loginUrl=`http://localhost:8080/api/sso/v1/users/login`
const orderListUrl=`http://localhost:8080/api/backend/v1/orders/orders`
const deleteOrdersUrl=`http://localhost:8080/api/backend/v1/orders/orders`
const updateOrdersSuccessfulStatusUrl=`http://localhost:8080/api/backend/v1/orders/success/:status`
const updateOrdersDoneStatusUrl=`http://localhost:8080/api/backend/v1/orders/done/:status`
const registerUrl=`http://localhost:8080/api/sso/v1/users/register`
const modifyProfileUrl=`http://localhost:8080/api/backend/v1/users/profile`
const modifyPasswordUrl=`http://localhost:8080/api/backend/v1/users/profile/password`
const userProfileUrl=`http://localhost:8080/api/backend/v1/users/profile`
const issueOrderUrl=`http://localhost:8080/api/backend/v1/orders/order`
const toWhomOptionsUrl=`http://localhost:8080/api/backend/v1/orders/can_to_whom`
const dataStatisticsUrl=`http://localhost:8080/api/sso/v1/data_statistics/test`
const deleteAccountUrl=`http://localhost:8080/api/backend/v1/users/users`

export{
    loginUrl,
    orderListUrl,
    deleteOrdersUrl,
    updateOrdersSuccessfulStatusUrl,
    updateOrdersDoneStatusUrl,
    registerUrl,
    modifyProfileUrl,
    modifyPasswordUrl,
    userProfileUrl,
    issueOrderUrl,
    toWhomOptionsUrl,
    dataStatisticsUrl,
    deleteAccountUrl,
}