
import Crypto from 'crypto';
class encryptClass {

    encryptedPass(data) {
        let strdata = data.toString();
        console.log(typeof strdata)
        const hash = Crypto.createHash('sha256');
        hash.update(strdata);
        let encryptedPassword = hash.digest('hex');
        return encryptedPassword;
    }
    
}

export default encryptClass;