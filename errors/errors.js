function NotFound(msg){
	    this.name = 'NotFound';
	    this.message = msg;
	    //Error.call(this, msg);
	    //Error.captureStackTrace(this, arguments.callee);
}
NotFound.prototype.__proto__ = Error.prototype;

module.exports = {
	NotFound : NotFound 
}
