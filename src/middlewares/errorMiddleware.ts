export const errorMiddleWare = (err:any, req:any, res:any, next:any) => {
    console.log("💛errorMiddleWare::", err.statusCode +' = ' + err.name + " = " + err)
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
  
    if (!err) {
      return next();
    }

    
  // global error response
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    stack: err.stack
  });
}