module.exports = {
       
    isEmail : function(email){

        const REG_EMAIL = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
        return REG_EMAIL.test(email);
        
    }

}