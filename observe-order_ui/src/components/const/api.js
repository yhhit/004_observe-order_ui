const loginUrl=`/api/sso/v1/users/login`
const orderListUrl=`/api/backend/v1/orders/orders`
const deleteOrdersUrl=`/api/backend/v1/orders/orders`
const updateOrdersSuccessfulStatusUrl=`/api/backend/v1/orders/success/:status`
const updateOrdersDoneStatusUrl=`/api/backend/v1/orders/done/:status`
const registerUrl=`/api/sso/v1/users/register`
const modifyProfileUrl=`/api/backend/v1/users/profile`
const modifyPasswordUrl=`/api/backend/v1/users/profile/password`
const userProfileUrl=`/api/backend/v1/users/profile`
const issueOrderUrl=`/api/backend/v1/orders/order`
const toWhomOptionsUrl=`/api/backend/v1/orders/can_to_whom`
const dataStatisticsUrl=`/api/sso/v1/data_statistics/test`
const deleteAccountUrl=`/api/backend/v1/users/users`

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