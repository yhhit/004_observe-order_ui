import sha256 from 'crypto-js/sha256';
import { secret } from "@/components/const/const";
//转换时间戳为本地时间
function getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
}
function encryptPassword(password){
    return sha256(secret+password).toString();
}
export{
    encryptPassword,
    getLocalTime
}