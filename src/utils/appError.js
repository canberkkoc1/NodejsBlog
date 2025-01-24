class AppError extends Error {
    constructor(message, statusCode) {
      //! super means calling the parent class constructor so message will be passed to the Error class constructor
      super(message);
  
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
      this.isOperational = true;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  module.exports = AppError;


  /* 
    AppError sınıfı, özelleştirilmiş hata nesneleri oluşturmak için kullanılır.
    
    super(message) ifadesiyle, hata mesajı, Error sınıfına iletilir.
    
    statusCode ile HTTP yanıt kodu, status ile hata tipi (fail veya error), isOperational ile hata türü belirlenir.
    
    Error.captureStackTrace ile hatanın stack trace'i kaydedilir.
    
    Bu yapılar sayesinde, hatalar daha anlamlı bir şekilde ele alınabilir ve yönetilebilir.
  
  */